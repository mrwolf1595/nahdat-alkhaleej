'use client';

import { motion } from 'framer-motion';

interface FilterHeaderProps {
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
}

export const FilterHeader = ({ isExpanded, setIsExpanded }: FilterHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <motion.h2 
        className="text-2xl font-bold text-blue-600"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        Find Your Dream Property
      </motion.h2>
      <motion.button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-blue-600 font-medium flex items-center md:hidden"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isExpanded ? 'Less Filters' : 'More Filters'}
        <motion.svg 
          className="ml-1 w-5 h-5"
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </motion.button>
    </div>
  );
};