'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaUserPlus } from 'react-icons/fa';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

interface TeamMember {
  _id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

export default function AdminTeamPage() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/public/team')
      .then(res => res.json())
      .then(data => setTeam(data))
      .catch(() => toast.error('Failed to fetch team members'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Team Members</h1>
        <Link
          href="/admin/team/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <FaUserPlus /> Add Member
        </Link>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member) => (
            <motion.div
              key={member._id}
              whileHover={{ scale: 1.02 }}
              className="p-4 border rounded-lg bg-white shadow flex flex-col items-center text-center"
            >
              {member.image ? (
                <Image
                  src={member.image}
                  alt={member.name}
                  width={120}
                  height={120}
                  className="rounded-full object-cover mb-4"
                />
              ) : (
                <div className="w-24 h-24 bg-gray-200 rounded-full mb-4 flex items-center justify-center text-2xl text-gray-500">
                  👤
                </div>
              )}
              <h3 className="text-lg font-semibold text-blue-700">{member.name}</h3>
              <p className="text-sm text-gray-600">{member.role}</p>
              <p className="text-gray-500 mt-2">{member.bio}</p>

              {/* EDIT BUTTON - here inside the map */}
              <Link
                href={`/admin/team/edit/${member._id}`}
                className="mt-3 px-4 py-1 bg-yellow-500 text-white rounded-lg text-sm hover:bg-yellow-600"
              >
                Edit
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
