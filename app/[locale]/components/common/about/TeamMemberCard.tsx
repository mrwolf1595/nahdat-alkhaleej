'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaEnvelope, FaTwitter } from 'react-icons/fa';
import Image from 'next/image';

interface TeamMemberCardProps {
  name: string;
  role: string;
  bio: string;
  image: string;
  index: number;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  name,
  role,
  bio,
  image,
}) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        type: 'spring',
        stiffness: 100,
      },
    },
    hover: {
      y: -15,
      transition: {
        duration: 0.3,
        type: 'spring',
        stiffness: 300,
      },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    hover: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  const socialIconVariants = {
    hidden: { y: 20, opacity: 0 },
    hover: (custom: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        delay: 0.1 * custom,
      },
    }),
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, margin: '-100px' }}
      className="bg-white rounded-xl shadow-lg overflow-hidden group"
    >
      <div className="h-64 bg-gradient-to-br from-blue-100 to-indigo-100 relative overflow-hidden">
        {/* Overlay */}
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/80 z-10 flex items-end justify-center"
        >
          <div className="p-6 w-full flex justify-center space-x-4">
            {[FaLinkedin, FaEnvelope, FaTwitter].map((Icon, i) => (
              <motion.a
                key={i}
                variants={socialIconVariants}
                custom={i}
                whileHover={{ y: -5 }}
                href="#"
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-md"
                aria-label={`${Icon.name} for ${name}`}
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* عرض الصورة أو رمز 👤 */}
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center text-gray-400"
          >
            <div className="text-7xl">👤</div>
          </motion.div>
        )}
      </div>

      <div className="p-6">
        <motion.h3
          initial={{ opacity: 0.9 }}
          whileHover={{ opacity: 1 }}
          className="text-xl font-bold mb-1 text-gray-800"
        >
          {name}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0.9 }}
          whileHover={{ opacity: 1 }}
          className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-4 font-medium"
        >
          {role}
        </motion.p>
        <motion.p
          initial={{ opacity: 0.8 }}
          whileHover={{ opacity: 1 }}
          className="text-gray-600"
        >
          {bio}
        </motion.p>
      </div>
    </motion.div>
  );
};

export default TeamMemberCard;
