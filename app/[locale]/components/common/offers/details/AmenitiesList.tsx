'use client';
import { useTranslations } from 'next-intl';

import { motion } from 'framer-motion';
import { Sparkles, Shield, Wifi, Coffee, Utensils, Snowflake, Briefcase, Dumbbell, Baby, Car, Wind, Map } from 'lucide-react';
import { useState, useEffect } from 'react';

interface AmenitiesListProps {
amenities: string[];
}

const AmenitiesList = ({ amenities }: AmenitiesListProps) => {
const tOfferId = useTranslations('offerId');

// Add responsive sizing hooks
const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 0);

useEffect(() => {
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  // Set initial width
  if (typeof window !== 'undefined') {
    setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
  }

  return () => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', handleResize);
    }
  };
}, []);

// Check if it's mobile view
const isMobile = windowWidth < 640;

// Animation variants for staggered loading of items
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 }
  }
};

// Gentler animation for items - reduced bounce effect to be more comfortable
const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 180,
      damping: 25
    }
  }
};

// Map to associate amenities with appropriate icons
const getIconForAmenity = (amenity: string) => {
  const amenityLower = amenity.toLowerCase();
  let size = 22;
  
  if (typeof window !== 'undefined') {
    // Responsive icon sizing
    size = windowWidth < 640 ? 22 : windowWidth < 1024 ? 26 : 30;
  }
  
  if (amenityLower.includes('wifi') || amenityLower.includes('internet')) return <Wifi size={size} />;
  if (amenityLower.includes('security') || amenityLower.includes('safe')) return <Shield size={size} />;
  if (amenityLower.includes('coffee') || amenityLower.includes('tea')) return <Coffee size={size} />;
  if (amenityLower.includes('kitchen') || amenityLower.includes('dining')) return <Utensils size={size} />;
  if (amenityLower.includes('air') || amenityLower.includes('cooling')) return <Wind size={size} />;
  if (amenityLower.includes('parking') || amenityLower.includes('garage')) return <Car size={size} />;
  if (amenityLower.includes('gym') || amenityLower.includes('fitness')) return <Dumbbell size={size} />;
  if (amenityLower.includes('business') || amenityLower.includes('work')) return <Briefcase size={size} />;
  if (amenityLower.includes('baby') || amenityLower.includes('child')) return <Baby size={size} />;
  if (amenityLower.includes('location') || amenityLower.includes('nearby')) return <Map size={size} />;
  if (amenityLower.includes('ac') || amenityLower.includes('conditioning')) return <Snowflake size={size} />;
  
  // Default icon for any other amenity
  return <Sparkles size={size} />;
};

// Fixed gradients for icons
const getGradientForAmenity = (amenity: string, index: number) => {
  const gradients = [
    'from-blue-400 to-indigo-400',
    'from-emerald-400 to-green-400',
    'from-amber-400 to-yellow-400',
    'from-sky-400 to-blue-400',
    'from-rose-400 to-red-400',
    'from-teal-400 to-cyan-400',
  ];
  
  return gradients[index % gradients.length];
};

return (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 w-full mx-auto"
  >
    <motion.h2 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.5 }}
      className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 md:mb-8 flex items-center break-words text-gray-900 dark:text-gray-900"
    >
      <div className="relative ms-0 me-8 sm:me-10 flex-shrink-0">
        <motion.div 
          animate={{ 
            scale: [1, 1.05, 1],
            rotate: [0, 3, 0, -3, 0] 
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            repeatDelay: 7
          }}
          className="bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg sm:rounded-xl p-2 sm:p-2.5 shadow-md"
        >
          <Sparkles size={22} className="sm:hidden relative z-10 text-white" />
          <Sparkles size={28} className="hidden sm:block relative z-10 text-white" />
        </motion.div>
      </div>
      {tOfferId('property.premiumAmenities')}
    </motion.h2>
    
    <motion.div  
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`flex flex-wrap ${isMobile ? 'flex-col items-start' : 'justify-center'} gap-2 sm:gap-4`}
    >
      {amenities.map((amenity, index) => (
        <motion.div 
          key={index}
          variants={itemVariants}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className={`flex ${isMobile ? 'w-full' : 'items-center'} rounded-xl p-3 sm:p-4 transition-all duration-200 
            ${isMobile ? 'my-1' : 'm-1 sm:m-2'}`}
        >
          <div className={`${isMobile ? 'w-12 h-12' : 'w-12 h-12 sm:w-16 sm:h-16 md:w-18 md:h-18'} rounded-xl bg-gradient-to-br ${getGradientForAmenity(amenity, index)} 
            flex items-center justify-center text-white ms-0 me-8 sm:me-10 md:me-12 flex-shrink-0 shadow-sm
            transition-all duration-300`}>
            <div className="">
              {getIconForAmenity(amenity)}
            </div>
          </div>
          <div className="pt-1 flex-1 ps-2">
            <p className={`${isMobile ? 'text-lg' : 'text-lg sm:text-xl md:text-2xl'} font-medium text-gray-800 dark:text-gray-900
              ${isMobile ? 'break-words' : 'whitespace-nowrap'} transition-colors duration-200 relative`}>
              {amenity}
            </p>
          </div>
        </motion.div>
      ))}
    </motion.div>
    
    {amenities.length === 0 && (
      <div className="text-center py-6">
        <p className="">No amenities available</p>
      </div>
    )}
  </motion.div>
);
};

export default AmenitiesList;