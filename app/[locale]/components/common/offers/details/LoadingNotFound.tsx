'use client';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

// Loading component
export const LoadingState = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50 dark:from-zinc-900 dark:to-zinc-950">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        className="w-16 h-16 rounded-full border-4 border-t-blue-500 border-r-transparent border-b-blue-500 border-l-transparent animate-spin"
      ></motion.div>
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-4 text-zinc-600 dark:text-zinc-300 font-medium"
      >
        Loading property details...
      </motion.p>
    </div>
  );
};

// Not Found component
interface NotFoundStateProps {
  onBackClick: () => void;
}

export const NotFoundState = ({ onBackClick }: NotFoundStateProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50 dark:from-zinc-900 dark:to-zinc-950">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-red-500 text-6xl mb-4"
      >
        😕
      </motion.div>
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-red-500 text-xl font-semibold"
      >
        Property not found
      </motion.p>
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        onClick={onBackClick}
        className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-all duration-300 flex items-center"
      >
        <ArrowLeft size={18} className="mr-2" />
        Back to all properties
      </motion.button>
    </div>
  );
};