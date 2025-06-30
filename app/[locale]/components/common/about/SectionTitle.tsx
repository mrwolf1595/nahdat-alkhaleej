'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionTitleProps {
  children: ReactNode;
  className?: string;
  gradient?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ 
  children, 
  className = '', 
  gradient = 'from-blue-600 to-teal-500'
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      className={`text-center mb-16 ${className}`}
    >
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold relative inline-block"
      >
        <span className="relative z-10">
          {children}
        </span>
        <motion.span 
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: '100%', opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className={`absolute -bottom-3 left-0 h-1.5 bg-gradient-to-r ${gradient} rounded-full z-0`}
        />
      </motion.h2>
      
      {/* Decorative elements */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="w-2 h-2 rounded-full bg-blue-500 absolute left-1/2 -ml-1 mt-4"
      />
    </motion.div>
  );
};

export default SectionTitle;