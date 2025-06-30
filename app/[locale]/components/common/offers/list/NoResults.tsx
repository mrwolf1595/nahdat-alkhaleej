'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const NoResults = () => {
  return (
    <motion.div
      className="text-center py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6 bg-blue-50 text-blue-700 rounded-full inline-flex p-4">
        <svg
          className="w-10 h-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
      </div>
      <h3 className="text-2xl font-bold text-gray-700 mb-3">
        No properties found
      </h3>
      <p className="text-gray-500 mb-6">
        Try adjusting your search filters or explore our featured listings
      </p>
      <Link
        href="/offers"
        className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-md"
      >
        View All Properties
      </Link>
    </motion.div>
  );
};

export default NoResults;
