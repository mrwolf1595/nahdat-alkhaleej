'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  BuildingOffice2Icon,
  ClipboardDocumentListIcon,
  HomeModernIcon,
  ArchiveBoxIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';

const adminCards = [
  {
    title: 'Manage Offers',
    icon: HomeModernIcon,
    href: '/admin/offers',
    color: 'bg-gradient-to-br from-blue-500 to-blue-700',
    delay: 0.1,
  },
  {
    title: 'Manage Auctions',
    icon: BuildingOffice2Icon,
    href: '/admin/auctions',
    color: 'bg-gradient-to-br from-orange-500 to-orange-700',
    delay: 0.2,
  },
  {
    title: 'Manage Past Auctions',
    icon: ArchiveBoxIcon,
    href: '/admin/past-auctions',
    color: 'bg-gradient-to-br from-green-500 to-green-700',
    delay: 0.3,
  },
  {
    title: 'Manage Records',
    icon: ClipboardDocumentListIcon,
    href: '/admin/records',
    color: 'bg-gradient-to-br from-gray-700 to-gray-900',
    delay: 0.4,
  },
  {
    title: 'Manage Team',
    icon: UsersIcon,
    href: '/admin/team',
    color: 'bg-gradient-to-br from-purple-500 to-purple-700',
    delay: 0.5,
  },
];

export default function AdminHomePage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen">
      <div className="max-w-5xl mx-auto py-8">
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Welcome, Admin 👋</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">Manage your real estate content using the dashboard below.</p>
        </motion.div>

        <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {adminCards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div key={card.href} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: card.delay, duration: 0.5 }} whileHover={{ y: -5, transition: { duration: 0.2 } }} className="h-full">
                <Link href={card.href} className={`flex flex-col justify-center items-center h-full text-white p-8 rounded-xl shadow-lg ${card.color} transition-transform`}>
                  <div className="bg-white/20 p-4 rounded-full mb-4">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h2 className="text-xl font-semibold text-center">{card.title}</h2>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.div>
  );
}
