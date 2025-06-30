'use client';

import { motion } from 'framer-motion';
import { FaExclamationTriangle, FaArrowLeft, FaSearch } from 'react-icons/fa';

export default function PastNotFoundState() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-b from-gray-100 to-indigo-100 text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-md w-full bg-white/90 backdrop-blur-sm p-10 rounded-3xl shadow-2xl border border-indigo-200"
      >
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7, type: "spring", bounce: 0.4 }}
          className="mb-8 relative mx-auto"
        >
          <div className="w-28 h-28 mx-auto bg-red-50 rounded-full flex items-center justify-center">
            <FaExclamationTriangle className="text-red-500 text-5xl" />
          </div>
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.7, 0.9, 0.7]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-red-100 rounded-full -z-10"
          />
          <motion.div 
            animate={{ 
              scale: [1.1, 1.5, 1.1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute inset-0 bg-red-50 rounded-full -z-20"
          />
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-3xl font-bold mb-4 bg-gradient-to-r from-red-600 to-pink-600 inline-block text-transparent bg-clip-text"
        >
          Auction Not Found
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-gray-600 mb-10 text-lg"
        >
          We couldn&apos;t find the past auction you&apos;re looking for. It may have been removed or never existed.
        </motion.p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.a
            href="/#past-auctions"
            whileHover={{ scale: 1.05, backgroundColor: "#4338ca" }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 py-4 rounded-xl font-medium shadow-lg hover:shadow-indigo-200 transition duration-300"
          >
            <FaArrowLeft />
            <span>Back to Auctions</span>
          </motion.a>
          
          <motion.a
            href="/search"
            whileHover={{ scale: 1.05, backgroundColor: "#eef2ff" }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="inline-flex items-center justify-center gap-3 bg-white text-indigo-700 border-2 border-indigo-300 px-6 py-4 rounded-xl font-medium hover:bg-indigo-50 transition duration-300 shadow-md"
          >
            <FaSearch className="text-indigo-500" />
            <span>Search Auctions</span>
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
}