'use client';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export const LoadingState = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50 dark:from-zinc-900 dark:to-zinc-950">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-3 sm:border-4 border-t-blue-500 border-r-transparent border-b-blue-500 border-l-transparent animate-spin"
      ></motion.div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-3 sm:mt-4 text-sm sm:text-base text-zinc-600 dark:text-zinc-300 font-medium"
      >
        Loading property details...
      </motion.p>
    </div>
  );
};

interface NotFoundStateProps {
  onBackClick: () => void;
}

export const NotFoundState = ({ onBackClick }: NotFoundStateProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50 dark:from-zinc-900 dark:to-zinc-950">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-4xl sm:text-6xl mb-3 sm:mb-4"
      >
        😕
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-lg sm:text-xl text-red-500 font-semibold"
      >
        Property not found
      </motion.p>
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        onClick={onBackClick}
        className="mt-3 sm:mt-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-all duration-300 flex items-center text-sm sm:text-base"
      >
        <ArrowLeft size={16} className="mr-1.5 sm:hidden" />
        <ArrowLeft size={18} className="mr-2 hidden sm:block" />
        Back to all properties
      </motion.button>
    </div>
  );
};