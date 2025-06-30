'use client';

import { motion } from 'framer-motion';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaExternalLinkAlt, FaRegCompass } from 'react-icons/fa';

interface Props {
  date: string;
  time: string;
  location: string;
  mapLink?: string;
}

export default function PastAuctionInformation({ date, time, location, mapLink }: Props) {
  const infoItems = [
    { 
      icon: <FaCalendarAlt className="text-blue-600" />, 
      label: "Date", 
      value: date,
      bgColor: "from-blue-50 to-blue-100/50"
    },
    { 
      icon: <FaClock className="text-violet-600" />, 
      label: "Time", 
      value: time,
      bgColor: "from-violet-50 to-violet-100/50"
    },
    { 
      icon: <FaMapMarkerAlt className="text-purple-600" />, 
      label: "Location", 
      value: location,
      bgColor: "from-purple-50 to-purple-100/50"
    },
  ];

  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-indigo-50/80 via-white to-violet-50/80 p-8 md:p-10 rounded-2xl shadow-xl border border-indigo-100/40 max-w-4xl mx-auto overflow-hidden relative"
    >
      {/* Enhanced decorative elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-100/60 rounded-full -mr-40 -mt-40 opacity-30 blur-2xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-violet-100/60 rounded-full -ml-24 -mb-24 opacity-30 blur-2xl" />
      <div className="absolute top-1/3 left-1/3 w-32 h-32 bg-blue-100/40 rounded-full opacity-40 blur-xl" />
      
      <div className="relative z-10">
        <div className="flex items-center mb-8">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-full mr-4 shadow-lg shadow-indigo-200/50">
            <FaRegCompass className="text-white text-lg" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-700 via-violet-700 to-purple-700 bg-clip-text text-transparent">
            Auction Information
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {infoItems.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className={`flex items-center bg-gradient-to-br ${item.bgColor} p-5 rounded-xl shadow-md border border-white hover:shadow-lg transition-all duration-300`}
            >
              <div className="bg-white/80 backdrop-blur-sm p-3.5 rounded-full mr-4 shadow-md">
                {item.icon}
              </div>
              <div>
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">{item.label}</p>
                <p className="text-gray-800 font-semibold">{item.value}</p>
              </div>
            </motion.div>
          ))}
          
          {mapLink && (
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="md:col-span-3 mt-2"
            >
              <motion.a
                whileHover={{ scale: 1.03, y: -3 }}
                whileTap={{ scale: 0.98 }}
                href={mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <FaExternalLinkAlt className="mr-3 group-hover:rotate-12 transition-transform duration-300" />
                <span className="font-medium">View on Google Maps</span>
              </motion.a>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}