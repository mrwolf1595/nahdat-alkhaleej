'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import {  FaChevronDown, FaChevronUp, FaQuoteLeft } from 'react-icons/fa';

interface Props {
  title?: string;
  content: string;
}

export default function PastAuctionDescription({ title = 'Auction Description', content }: Props) {
  const [expanded, setExpanded] = useState(false);
  const shortContent = content.length > 300 && !expanded ? content.slice(0, 300) + '...' : content;
  
  const paragraphs = shortContent.split('\n').filter(p => p.trim() !== '');
  
  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }} 
      className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-indigo-100/50 max-w-4xl mx-auto relative overflow-hidden group"
    >
      {/* Decorative accent elements */}
      <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-indigo-500 via-violet-500 to-purple-500 rounded-r" />
      <div className="absolute -top-16 -right-16 w-40 h-40 bg-indigo-100/20 rounded-full blur-2xl" />
      <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-violet-100/30 rounded-full blur-3xl" />
      
      <div className="relative z-10">
        <div className="flex items-center mb-7">
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-full mr-4 shadow-md shadow-indigo-200">
            <FaQuoteLeft className="text-white text-sm" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-700 to-violet-700 bg-clip-text text-transparent">
            {title}
          </h2>
        </div>
        
        <div className="text-gray-700 leading-relaxed pl-2">
          {paragraphs.map((paragraph, index) => (
            <motion.p 
              key={index}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="mb-5 last:mb-0 relative hover:text-gray-800 transition-colors duration-300"
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
        
        {content.length > 300 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setExpanded(!expanded)}
            className="mt-5 flex items-center gap-2 bg-gradient-to-r from-indigo-50 to-violet-50 hover:from-indigo-100 hover:to-violet-100 text-indigo-700 hover:text-indigo-800 font-medium text-sm transition-all px-5 py-2 rounded-full shadow-sm border border-indigo-100/50"
          >
            {expanded ? (
              <>
                <span>Read Less</span>
                <FaChevronUp className="text-xs" />
              </>
            ) : (
              <>
                <span>Read More</span>
                <FaChevronDown className="text-xs" />
              </>
            )}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}