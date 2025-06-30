'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface MilestoneCardProps {
  year: string;
  title: string;
  description: string;
  icon?: ReactNode;
  isLast?: boolean;
  index: number;
}

const MilestoneCard: React.FC<MilestoneCardProps> = ({ 
  year, 
  title, 
  description, 
  icon, 
  index
}) => {
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.6, 
        delay: 0.2 * index,
        type: "spring",
        stiffness: 100
      }
    },
    hover: {
      y: -5,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { duration: 0.3 }
    }
  };

  const yearVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.6, 
        delay: 0.1 * index
      }
    },
    hover: {
      scale: 1.1,
      transition: { duration: 0.2 }
    }
  };

  const dotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: 0.5, 
        delay: 0.3 * index,
        type: "spring"
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row mb-16 last:mb-0 relative">
      <div className="md:w-1/4 flex-shrink-0 mb-4 md:mb-0 relative">
        <motion.div 
          variants={yearVariants}
          initial="hidden"
          whileInView="visible"
          whileHover="hover"
          viewport={{ once: true, margin: "-100px" }}
          className="text-3xl font-bold"
        >
          {/* Fixed: Use span with normal text instead of text with background clip */}
          <span className="text-blue-600">{year}</span>
        </motion.div>
        
        {/* Timeline dot (visible on desktop) */}
        <motion.div
          variants={dotVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="hidden md:block absolute left-0 top-4 w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 z-10 transform translate-x-[-8px]"
        />
      </div>
      
      <motion.div 
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        whileHover="hover"
        viewport={{ once: true, margin: "-100px" }}
        className="md:w-3/4 bg-white p-8 rounded-xl shadow-md transition-all duration-300 border border-gray-100"
      >
        <div className="flex items-center mb-4">
          <motion.div 
            whileHover={{ rotate: 15, scale: 1.2 }}
            transition={{ duration: 0.3 }}
            className="mr-4 text-blue-600 text-xl"
          >
            {icon}
          </motion.div>
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        </div>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </motion.div>
    </div>
  );
};

export default MilestoneCard;