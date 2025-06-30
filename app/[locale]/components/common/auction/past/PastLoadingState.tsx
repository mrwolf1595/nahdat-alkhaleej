'use client';

import { motion } from 'framer-motion';

export default function PastLoadingState() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-gray-50 to-indigo-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <div className="relative w-20 h-20">
          {/* Outer spinner */}
          <motion.div 
            className="absolute inset-0 rounded-full border-4 border-indigo-300 border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Inner spinner */}
          <motion.div 
            className="absolute inset-2 rounded-full border-4 border-purple-400 border-b-transparent"
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Center dot */}
          <motion.div 
            className="absolute inset-0 m-auto w-3 h-3 bg-indigo-600 rounded-full"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-6 text-indigo-700 font-medium"
        >
          Loading auction details...
        </motion.p>
      </motion.div>
    </div>
  );
}