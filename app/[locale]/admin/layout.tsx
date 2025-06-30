'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import {
  HomeModernIcon,
  BuildingOffice2Icon,
  ArchiveBoxIcon,
  ClipboardDocumentListIcon,
  UsersIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const navItems = [
  { href: '/admin/offers', label: 'Offers', icon: HomeModernIcon },
  { href: '/admin/auctions', label: 'Auctions', icon: BuildingOffice2Icon },
  { href: '/admin/past-auctions', label: 'Past Auctions', icon: ArchiveBoxIcon },
  { href: '/admin/records', label: 'Records', icon: ClipboardDocumentListIcon },
  { href: '/admin/team', label: 'Team', icon: UsersIcon },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  if (isLoginPage) return <>{children}</>;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="md:hidden bg-gray-900 text-white p-4 flex justify-between items-center">
        <h2 className="font-bold">Admin Dashboard</h2>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle Menu">
          {isMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-14 left-0 right-0 bottom-0 z-50 bg-gray-900 text-white p-6 space-y-4 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg">Menu</h2>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-full hover:bg-gray-800 transition-colors"
                aria-label="Close menu"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            <nav className="space-y-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                      isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-800'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.aside
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="hidden md:block w-64 bg-gray-900 text-white p-6 space-y-6 shrink-0"
      >
        <motion.h2
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl font-bold mb-8"
        >
          Admin Dashboard
        </motion.h2>
        <nav className="space-y-2">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <motion.div
                key={item.href}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 * (index + 1) }}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                    isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-800'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              </motion.div>
            );
          })}
        </nav>
      </motion.aside>

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-1"
      >
        <div className="p-4 md:p-8 max-w-6xl mx-auto">
          <Toaster position="top-right" reverseOrder={false} />
          {children}
        </div>
      </motion.main>
    </div>
  );
}
