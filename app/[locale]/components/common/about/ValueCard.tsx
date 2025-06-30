'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ValueCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  index: number;
}

const ValueCard: React.FC<ValueCardProps> = ({ 
  title, 
  description, 
  icon, 
  index
}) => {
  // Card animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        type: "spring",
        stiffness: 100
      }
    },
    hover: { 
      y: -15,
      boxShadow: "0px 25px 50px -12px rgba(0, 0, 0, 0.15)",
      transition: { 
        duration: 0.3, 
        type: "spring", 
        stiffness: 300 
      }
    }
  };

  // Icon animation variants
  const iconVariants = {
    hidden: { scale: 0.8, opacity: 0.5 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.4, delay: 0.2 }
    },
    hover: { 
      scale: 1.15, 
      rotate: 5,
      transition: { duration: 0.3, type: "spring", stiffness: 300 }
    }
  };

  // Determine the gradient based on the index
  const gradients = [
    "from-blue-500 to-cyan-400",
    "from-indigo-500 to-purple-400",
    "from-teal-500 to-emerald-400"
  ];

  const gradient = gradients[index % gradients.length];

  return (
    <motion.div 
      variants={cardVariants}
      whileHover="hover"
      className="bg-white p-10 rounded-xl shadow-lg transition-all duration-300 border border-gray-100"
    >
      <motion.div 
        variants={iconVariants}
        className={`mb-8 bg-gradient-to-tr ${gradient} w-16 h-16 rounded-2xl flex items-center justify-center text-white`}
      >
        {icon}
      </motion.div>
      
      <h3 className="text-2xl font-bold mb-4 text-gray-800">{title}</h3>
      
      <motion.p 
        initial={{ opacity: 0.8 }}
        whileHover={{ opacity: 1 }}
        className="text-gray-600 leading-relaxed"
      >
        {description}
      </motion.p>
    </motion.div>
  );
};

export default ValueCard;