import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBed, FaBath, FaMapMarkerAlt, FaBuilding, FaChevronDown } from 'react-icons/fa';
import { BsArrowsFullscreen, BsBuilding } from 'react-icons/bs';
import PropertyDetails from './PropertyDetails';
import { AuctionProperty as PropertyProps } from '@/types/auction';


interface PropertyCardsProps {
  properties: PropertyProps[];
}

export default function PropertyCards({ properties }: PropertyCardsProps) {
  const [expandedPropertyIndex, setExpandedPropertyIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!properties || properties.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 text-center text-gray-500">
        No property details available
      </div>
    );
  }

  const togglePropertyDetails = (index: number) => {
    setExpandedPropertyIndex(expandedPropertyIndex === index ? null : index);
  };

  return (
    <div className="space-y-8">
      <motion.h3 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-xl font-bold mb-6 text-gray-800 flex items-center"
      >
        <span className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 p-3 rounded-lg mr-3 shadow-sm">
          <FaBuilding className="w-5 h-5" />
        </span>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
          Properties ({properties.length})
        </span>
      </motion.h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {properties.map((property, index) => (
          <motion.div 
            key={index} 
            className="space-y-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
          >
            <motion.div
              whileHover={{ 
                y: -5,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 relative"
            >
              {/* Decorative elements */}
              <div className="absolute -right-10 -top-10 w-20 h-20 bg-blue-100/30 rounded-full blur-xl"></div>
              <div className="absolute -left-10 -bottom-10 w-20 h-20 bg-indigo-100/30 rounded-full blur-xl"></div>
              
              <div className="p-6 relative z-10">
                <div className="flex justify-between items-start mb-5">
                  <div className="flex items-center">
                    <motion.div 
                      initial={{ rotate: 0 }}
                      animate={{ rotate: hoveredIndex === index ? 5 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-gradient-to-r from-blue-100 to-indigo-100 p-2 rounded-lg mr-3"
                    >
                      <BsBuilding className="text-indigo-600 w-5 h-5" />
                    </motion.div>
                    <h4 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
                      {property.type || 'Property'} {index + 1}
                    </h4>
                  </div>
                  
                  {property.price && (
                    <motion.span 
                      whileHover={{ scale: 1.05 }}
                      className="bg-gradient-to-r from-green-100 to-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-medium shadow-sm border border-green-200"
                    >
                      {property.price}
                    </motion.span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-5">
                  {property.bedrooms && (
                    <motion.div 
                      whileHover={{ x: 3 }}
                      className="flex items-center text-gray-600 bg-gray-50 p-2 rounded-lg"
                    >
                      <div className="bg-blue-100 p-1.5 rounded-md mr-2">
                        <FaBed className="text-blue-600 h-4 w-4" />
                      </div>
                      <span className="text-sm">{property.bedrooms} Bedrooms</span>
                    </motion.div>
                  )}
                  
                  {property.bathrooms && (
                    <motion.div 
                      whileHover={{ x: 3 }}
                      className="flex items-center text-gray-600 bg-gray-50 p-2 rounded-lg"
                    >
                      <div className="bg-blue-100 p-1.5 rounded-md mr-2">
                        <FaBath className="text-blue-600 h-4 w-4" />
                      </div>
                      <span className="text-sm">{property.bathrooms} Bathrooms</span>
                    </motion.div>
                  )}
                  
                  {property.area && (
                    <motion.div 
                      whileHover={{ x: 3 }}
                      className="flex items-center text-gray-600 bg-gray-50 p-2 rounded-lg"
                    >
                      <div className="bg-blue-100 p-1.5 rounded-md mr-2">
                        <BsArrowsFullscreen className="text-blue-600 h-4 w-4" />
                      </div>
                      <span className="text-sm">{property.area}</span>
                    </motion.div>
                  )}
                  
                  {property.mapLink && (
                    <motion.div 
                      whileHover={{ x: 3 }}
                      className="flex items-center text-gray-600 bg-gray-50 p-2 rounded-lg"
                    >
                      <div className="bg-blue-100 p-1.5 rounded-md mr-2">
                        <FaMapMarkerAlt className="text-blue-600 h-4 w-4" />
                      </div>
                      <span className="text-sm">Map Available</span>
                    </motion.div>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => togglePropertyDetails(index)}
                  className="w-full mt-3 flex items-center justify-center bg-gradient-to-r from-indigo-50 to-blue-50 hover:from-indigo-100 hover:to-blue-100 text-indigo-700 py-3 px-4 rounded-xl transition-all duration-300 border border-indigo-100 shadow-sm"
                >
                  <span>{expandedPropertyIndex === index ? 'Show Less' : 'View Details'}</span>
                  <motion.div
                    animate={{ rotate: expandedPropertyIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="ml-2"
                  >
                    <FaChevronDown className="h-4 w-4" />
                  </motion.div>
                </motion.button>
              </div>
            </motion.div>

            <AnimatePresence>
              {expandedPropertyIndex === index && (
                <motion.div
                  initial={{ opacity: 0, y: -20, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -20, height: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <PropertyDetails property={property} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}