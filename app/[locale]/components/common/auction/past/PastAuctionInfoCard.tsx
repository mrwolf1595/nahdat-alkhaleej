'use client';

import { PastAuction } from '@/types/PastAuction';
import { motion } from 'framer-motion';
import {  FaStar, FaCheckCircle, FaBuilding, FaRegLightbulb } from 'react-icons/fa';

interface Props {
  auction: PastAuction;
}

export default function PastAuctionInfoCard({ auction }: Props) {
  // Calculate sold properties percentage
  const totalProperties = auction.properties?.length || 0;
  const soldProperties = auction.properties?.filter(p => p.sold).length || 0;
  const soldPercentage = totalProperties > 0 ? Math.round((soldProperties / totalProperties) * 100) : 0;
  
  const chartVariants = {
    hidden: { pathLength: 0 },
    visible: { 
      pathLength: soldPercentage / 100,
      transition: { duration: 2, ease: "easeInOut", delay: 0.3 }
    }
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border-t-4 border-t-indigo-600 border-r border-b border-l border-gray-100 max-w-4xl mx-auto relative overflow-hidden"
    >
      {/* Enhanced decorative elements */}
      <div className="absolute top-0 right-0 w-full h-48 bg-gradient-to-b from-indigo-50/40 to-transparent" />
      <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-indigo-50/60 rounded-full blur-2xl" />
      
      <div className="relative z-10">
        <div className="flex items-center mb-8">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-full mr-4 shadow-lg shadow-indigo-200/50">
            <FaRegLightbulb className="text-white text-lg" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-700 via-violet-700 to-purple-700 bg-clip-text text-transparent">
            Auction Overview
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-6">
          {/* Property Count Card */}
          <motion.div 
            whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(79, 70, 229, 0.15)" }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-indigo-50 to-indigo-100/50 rounded-xl shadow-md border border-indigo-100/70"
          >
            <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 p-4 rounded-full mb-4 shadow-md shadow-indigo-200/70">
              <FaBuilding className="text-white text-xl" />
            </div>
            <h3 className="text-indigo-900/70 text-sm font-medium mb-2">Total Properties</h3>
            <p className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent">
              {auction.properties?.length || 0}
            </p>
          </motion.div>

          {/* Sold Status Card */}
          <motion.div 
            whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(72, 187, 120, 0.15)" }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-green-50 to-emerald-100/40 rounded-xl shadow-md border border-green-100/70"
          >
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-full mb-4 shadow-md shadow-green-200/70">
              <FaCheckCircle className="text-white text-xl" />
            </div>
            <h3 className="text-green-900/70 text-sm font-medium mb-2">Sold Status</h3>
            <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">
              {soldProperties > 0 ? `${soldProperties} Sold` : 'Not Sold'}
            </p>
          </motion.div>

          {/* Chart Card with enhanced visualization */}
          <motion.div 
            whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(99, 102, 241, 0.15)" }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-violet-50 to-purple-100/40 rounded-xl shadow-md border border-violet-100/70 relative"
          >
            <div className="w-28 h-28 relative">
              <svg width="100%" height="100%" viewBox="0 0 100 100" className="transform -rotate-90">
                {/* Background circle with softer color */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#e0e7ff"
                  strokeWidth="12"
                />
                {/* Progress circle with gradient */}
                <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4f46e5" />
                  <stop offset="100%" stopColor="#7c3aed" />
                </linearGradient>
                <motion.circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="url(#circleGradient)"
                  strokeWidth="12"
                  strokeLinecap="round"
                  variants={chartVariants}
                  initial="hidden"
                  animate="visible"
                  strokeDasharray="251.2"
                  strokeDashoffset="0"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-violet-700 bg-clip-text text-transparent">
                  {soldPercentage}%
                </p>
              </div>
            </div>
            <p className="text-violet-900/70 text-sm font-medium mt-3">Sold Rate</p>
          </motion.div>
        </div>

        {auction.featured && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex items-center p-4 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl shadow-sm"
          >
            <div className="bg-amber-100 p-2 rounded-full mr-3">
              <FaStar className="text-amber-500" />
            </div>
            <span className="text-amber-800 font-medium">This was a featured auction</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}