'use client';

import { PastAuctionProperty } from '@/types/PastAuction';
import { FaBed, FaBath, FaMapMarkerAlt, FaRulerCombined, FaMoneyBillWave, FaStar, FaCheck } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface Props {
  property: PastAuctionProperty;
}

export default function PastPropertyDetails({ property }: Props) {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  const iconVariants = {
    hidden: { scale: 0.6, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.4 } }
  };

  return (
    <motion.div 
      className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-indigo-200 space-y-7"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      whileHover={{ boxShadow: "0 15px 30px -10px rgba(79, 70, 229, 0.3)" }}
      transition={{ duration: 0.4 }}
    >
      {/* Property Type and Price - Centered with enhanced gradient */}
      <motion.div 
        className="flex flex-col sm:flex-row justify-center items-center gap-5"
        variants={itemVariants}
      >
        <motion.div
          className="relative"
          whileHover={{ scale: 1.08 }}
        >
          <motion.span 
            className="text-md font-bold bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-5 py-2.5 rounded-xl text-center shadow-lg shadow-blue-200/50 z-10 relative"
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {property.type.toUpperCase()}
          </motion.span>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-xl blur-md opacity-30 -z-10"></div>
        </motion.div>
        
        {property.price && (
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.08 }}
          >
            <motion.span 
              className="text-emerald-700 text-xl font-extrabold bg-gradient-to-r from-emerald-50 to-teal-100 px-5 py-2.5 rounded-xl flex items-center justify-center gap-3 shadow-lg shadow-emerald-100/50 z-10 relative border border-emerald-200"
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <motion.div
                animate={{ 
                  rotate: [0, -10, 0, 10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <FaMoneyBillWave className="text-emerald-500 text-xl" />
              </motion.div>
              {property.price} SAR
            </motion.span>
            <div className="absolute inset-0 rounded-xl blur-md opacity-30 bg-gradient-to-r from-emerald-200 to-teal-200 -z-10"></div>
          </motion.div>
        )}
      </motion.div>

      {/* Basic Info - Enhanced with gradients and hover effects */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-base text-gray-700"
        variants={itemVariants}
      >
        <motion.div 
          className="flex items-center justify-center gap-4 bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-2xl shadow-md"
          whileHover={{ scale: 1.03, y: -5, backgroundColor: "#dbeafe" }}
          transition={{ type: "spring", stiffness: 300, damping: 17 }}
        >
          <motion.div
            className="bg-blue-200 p-2.5 rounded-full"
            variants={iconVariants}
            whileHover={{ rotate: 15, scale: 1.2 }}
          >
            <FaRulerCombined className="text-blue-700 text-xl" />
          </motion.div>
          <span className="font-medium"><strong className="text-blue-800 font-bold">Area:</strong> {property.area} m²</span>
        </motion.div>
        
        <motion.div 
          className="flex items-center justify-center gap-4 bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 rounded-2xl shadow-md"
          whileHover={{ scale: 1.03, y: -5, backgroundColor: "#e0e7ff" }}
          transition={{ type: "spring", stiffness: 300, damping: 17 }}
        >
          <motion.div
            className="bg-indigo-200 p-2.5 rounded-full"
            variants={iconVariants}
            whileHover={{ rotate: 15, scale: 1.2 }}
          >
            <FaMapMarkerAlt className="text-indigo-700 text-xl" />
          </motion.div>
          <span className="font-medium"><strong className="text-indigo-800 font-bold">Location:</strong> {property.location}</span>
        </motion.div>
        
        {property.bedrooms !== undefined && (
          <motion.div 
            className="flex items-center justify-center gap-4 bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-2xl shadow-md"
            whileHover={{ scale: 1.03, y: -5, backgroundColor: "#f3e8ff" }}
            transition={{ type: "spring", stiffness: 300, damping: 17 }}
          >
            <motion.div
              className="bg-purple-200 p-2.5 rounded-full"
              variants={iconVariants}
              whileHover={{ rotate: 15, scale: 1.2 }}
            >
              <FaBed className="text-purple-700 text-xl" />
            </motion.div>
            <span className="font-medium"><strong className="text-purple-800 font-bold">Bedrooms:</strong> {property.bedrooms}</span>
          </motion.div>
        )}
        
        {property.bathrooms !== undefined && (
          <motion.div 
            className="flex items-center justify-center gap-4 bg-gradient-to-br from-violet-50 to-violet-100 p-4 rounded-2xl shadow-md"
            whileHover={{ scale: 1.03, y: -5, backgroundColor: "#ede9fe" }}
            transition={{ type: "spring", stiffness: 300, damping: 17 }}
          >
            <motion.div
              className="bg-violet-200 p-2.5 rounded-full"
              variants={iconVariants}
              whileHover={{ rotate: 15, scale: 1.2 }}
            >
              <FaBath className="text-violet-700 text-xl" />
            </motion.div>
            <span className="font-medium"><strong className="text-violet-800 font-bold">Bathrooms:</strong> {property.bathrooms}</span>
          </motion.div>
        )}
      </motion.div>

      {/* Amenities - Enhanced animation and hover effects */}
      {property.featuredAmenities && property.featuredAmenities.length > 0 && (
        <motion.div variants={itemVariants}>
          <h4 className="text-indigo-700 font-bold text-xl mb-4 flex items-center justify-center gap-3">
            <motion.div
              animate={{ 
                rotate: [0, 10, 0, -10, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <FaStar className="text-amber-500 text-xl" /> 
            </motion.div>
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
              Featured Amenities
            </span>
          </h4>
          <motion.div 
            className="flex flex-wrap justify-center gap-2.5"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {property.featuredAmenities.filter(Boolean).map((item, i) => (
              <motion.span 
                key={i} 
                className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 px-4 py-2.5 rounded-xl text-sm font-medium shadow-md flex items-center gap-2"
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.07, 
                  boxShadow: "0 8px 15px -3px rgba(99, 102, 241, 0.15)",
                  background: "linear-gradient(to right, #e0e7ff, #ede9fe)"
                }}
              >
                <FaCheck className="text-green-500" />
                {item}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      )}

      {/* Nearby Places - Enhanced with icons and effects */}
      {property.nearbyPlaces && property.nearbyPlaces.length > 0 && (
        <motion.div variants={itemVariants}>
          <h4 className="text-indigo-700 font-bold text-xl mb-4 flex items-center justify-center gap-3">
            <motion.div
              animate={{ 
                y: [0, -5, 0, -5, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <FaMapMarkerAlt className="text-red-500 text-xl" />
            </motion.div>
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
              Nearby Attractions
            </span>
          </h4>
          <motion.div 
            className="flex flex-wrap justify-center gap-2.5"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {property.nearbyPlaces.filter(Boolean).map((item, i) => (
              <motion.span 
                key={i} 
                className="bg-gradient-to-r from-blue-50 to-indigo-100 text-indigo-800 px-4 py-2.5 rounded-xl text-sm font-medium shadow-md"
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.07, 
                  boxShadow: "0 8px 15px -3px rgba(59, 130, 246, 0.15)",
                  background: "linear-gradient(to right, #dbeafe, #e0e7ff)"
                }}
              >
                <FaMapMarkerAlt className="text-blue-500 inline mr-2 text-xs" />
                {item}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      )}

      {/* Sold Status - Enhanced with animation */}
      {property.sold && (
        <motion.div 
          className="flex justify-center" 
          variants={itemVariants}
        >
          <motion.span 
            className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold px-5 py-3 rounded-xl uppercase text-md shadow-lg shadow-red-200/50"
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
            animate={{ 
              boxShadow: ["0 10px 15px -3px rgba(220, 38, 38, 0.2)", "0 10px 20px -3px rgba(220, 38, 38, 0.4)", "0 10px 15px -3px rgba(220, 38, 38, 0.2)"]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Sold
          </motion.span>
        </motion.div>
      )}
    </motion.div>
  );
}