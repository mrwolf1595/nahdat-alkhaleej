'use client';

import { PastAuctionProperty } from '@/types/PastAuction';
import { motion } from 'framer-motion';
import { FaHome, FaBuilding, FaLandmark, FaWarehouse, FaMapMarkerAlt } from 'react-icons/fa';

interface Props {
  property: PastAuctionProperty;
}

export default function PastPropertyDescription({ property }: Props) {
  // Select icon based on property type
  const getPropertyIcon = () => {
    const type = property.type.toLowerCase();
    if (type.includes('house') || type.includes('villa')) return <FaHome size={24} />;
    if (type.includes('apartment') || type.includes('condo')) return <FaBuilding size={24} />;
    if (type.includes('land')) return <FaLandmark size={24} />;
    if (type.includes('commercial')) return <FaWarehouse size={24} />;
    return <FaHome size={24} />;
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const iconVariants = {
    hover: {
      rotate: [0, -10, 10, -5, 0],
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div 
      className="mb-6 bg-gradient-to-r from-blue-50 via-indigo-50 to-violet-50 p-6 rounded-2xl shadow-lg border border-indigo-100"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.4)" }}
    >
      <motion.div
        className="flex flex-col items-center"
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.h3 
          className="text-2xl font-bold bg-gradient-to-r from-indigo-700 to-purple-700 text-transparent bg-clip-text flex items-center justify-center gap-3 mb-2"
          whileHover="hover"
        >
          <motion.span 
            className="text-indigo-600"
            variants={iconVariants}
          >
            {getPropertyIcon()}
          </motion.span>
          {property.type.toUpperCase()}
        </motion.h3>
        <div className="flex items-center justify-center gap-2 text-gray-700 font-medium text-lg mt-1">
          <FaMapMarkerAlt className="text-indigo-500" />
          <p className="text-gray-700 font-medium">
            {property.location}
          </p>
        </div>
        
        {/* Sold Badge - Enhanced styling */}
        {property.sold && (
          <motion.div 
            className="mt-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <motion.span 
              className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold text-sm px-4 py-1.5 rounded-full uppercase shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{ 
                boxShadow: ["0 4px 6px -1px rgba(220, 38, 38, 0.2)", "0 4px 10px -1px rgba(220, 38, 38, 0.4)", "0 4px 6px -1px rgba(220, 38, 38, 0.2)"]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Sold
            </motion.span>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}