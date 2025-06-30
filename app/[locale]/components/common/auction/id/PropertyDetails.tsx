import { motion } from 'framer-motion';
import { FaBed, FaBath, FaDollarSign, FaMapMarkerAlt, FaRegLightbulb, FaRegCompass } from 'react-icons/fa';
import { BsBuilding, BsArrowsFullscreen } from 'react-icons/bs';
import { TbMapPin } from 'react-icons/tb';
import { HiSparkles } from 'react-icons/hi';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

import { AuctionProperty } from '@/types/auction';

interface PropertyDetailsProps {
  property?: AuctionProperty;
}

export default function PropertyDetails({ property }: PropertyDetailsProps) {
  const t = useTranslations('property.details');
  const { locale } = useParams() as { locale: string };
  const isRTL = locale === 'ar';
  
  if (!property) return null;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial={{ x: isRTL ? -30 : 30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.4 }}
      className="relative"
    >
      {/* Decorative background elements */}
      <div className={`absolute ${isRTL ? '-left-20' : '-right-20'} -top-20 w-40 h-40 bg-blue-50/50 rounded-full blur-3xl -z-10`}></div>
      <div className={`absolute ${isRTL ? '-right-20' : '-left-20'} -bottom-20 w-40 h-40 bg-indigo-50/50 rounded-full blur-3xl -z-10`}></div>
      
      <motion.div 
        className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-blue-100 hover:shadow-xl transition-all duration-500 relative overflow-hidden"
        whileHover={{ 
          boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.1), 0 10px 10px -5px rgba(59, 130, 246, 0.05)"
        }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Background pattern */}
        <div className={`absolute top-0 ${isRTL ? 'left-0' : 'right-0'} w-32 h-32 bg-gradient-to-bl from-blue-50 to-transparent opacity-70`}></div>
        
        <motion.h3 
          className="text-xl font-bold mb-6 text-gray-800 flex items-center pb-3 border-b border-gray-100"
          variants={itemVariants}
        >
          <motion.span 
            className={`bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 p-3 rounded-xl ${isRTL ? 'ml-3' : 'mr-3'} shadow-sm`}
            whileHover={{ scale: 1.05, rotate: isRTL ? -5 : 5 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <BsBuilding className="w-5 h-5" />
          </motion.span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700">
            {t('title')}
          </span>
        </motion.h3>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-gray-600 mb-8"
          variants={itemVariants}
        >
          {property.bedrooms && (
            <motion.div 
              className="flex items-center p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 shadow-md"
              whileHover={{ scale: 1.05, y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <div className={`bg-blue-100 text-blue-600 p-3 rounded-lg ${isRTL ? 'ml-4' : 'mr-4'} shadow-sm`}>
                <FaBed className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">{t('amenities.bedrooms')}</p>
                <p className="font-extrabold text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700">{property.bedrooms}</p>
              </div>
            </motion.div>
          )}
          
          {property.bathrooms && (
            <motion.div 
              className="flex items-center p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 shadow-md"
              whileHover={{ scale: 1.05, y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <div className={`bg-blue-100 text-blue-600 p-3 rounded-lg ${isRTL ? 'ml-4' : 'mr-4'} shadow-sm`}>
                <FaBath className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">{t('amenities.bathrooms')}</p>
                <p className="font-extrabold text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700">{property.bathrooms}</p>
              </div>
            </motion.div>
          )}
          
          {property.area && (
            <motion.div 
              className="flex items-center p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 shadow-md"
              whileHover={{ scale: 1.05, y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <div className={`bg-blue-100 text-blue-600 p-3 rounded-lg ${isRTL ? 'ml-4' : 'mr-4'} shadow-sm`}>
                <BsArrowsFullscreen className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">{t('area')}</p>
                <p className="font-extrabold text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700">{property.area}</p>
              </div>
            </motion.div>
          )}
          
          {property.price && (
            <motion.div 
              className="flex items-center p-4 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 shadow-md"
              whileHover={{ scale: 1.05, y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <div className={`bg-green-100 text-green-600 p-3 rounded-lg ${isRTL ? 'ml-4' : 'mr-4'} shadow-sm`}>
                <FaDollarSign className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-green-400">{t('price')}</p>
                <p className="font-extrabold text-xl bg-clip-text text-transparent bg-gradient-to-r from-green-700 to-emerald-700">{property.price}</p>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Map Link if available */}
        {property.mapLink && (
          <motion.a 
            href={property.mapLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl transition-all duration-300 mb-8 shadow-md hover:shadow-lg shadow-blue-200/50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            variants={itemVariants}
          >
            <TbMapPin className={isRTL ? 'ml-2' : 'mr-2'} style={{height: '1.25rem', width: '1.25rem'}} />
            {t('nearbyPlaces.viewOnMap')}
          </motion.a>
        )}
        
        {/* Map iframe if available */}
        {property.iframeLink && (
          <motion.div 
            variants={itemVariants}
            className="mb-8 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
          >
            <h4 className="text-lg font-semibold mb-3 text-gray-800 flex items-center">
              <motion.span 
                className={`bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 p-2 rounded-lg ${isRTL ? 'ml-3' : 'mr-3'} shadow-sm`}
                whileHover={{ scale: 1.05, rotate: isRTL ? 5 : -5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <TbMapPin className="w-4 h-4" />
              </motion.span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700">
                {t('nearbyPlaces.locationMap')}
              </span>
            </h4>
            <iframe 
              src={property.iframeLink} 
              width="100%" 
              height="450" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-xl"
            ></iframe>
          </motion.div>
        )}

        {(property.featuredAmenities?.length ?? 0) > 0 && (
          <motion.div
            variants={itemVariants}
            className="mb-6"
          >
            <h4 className="text-xl font-bold mb-5 text-gray-800 flex items-center">
              <motion.span 
                className={`bg-gradient-to-r from-purple-100 to-fuchsia-100 text-purple-700 p-3 rounded-xl ${isRTL ? 'ml-4' : 'mr-4'} shadow-sm`}
                whileHover={{ scale: 1.05, rotate: isRTL ? 5 : -5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <FaRegLightbulb className="w-5 h-5" />
              </motion.span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-700 via-fuchsia-600 to-pink-600 text-2xl tracking-wide">
                {t('amenities.title')}
              </span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {property.featuredAmenities?.map((item, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ scale: 1.05, x: isRTL ? -8 : 8 }}
                  className="flex items-center text-gray-800 bg-gradient-to-r from-purple-50 to-fuchsia-50 rounded-2xl p-5 border border-purple-200 shadow-md transition-all duration-300"
                  variants={itemVariants}
                >
                  <HiSparkles className={isRTL ? 'ml-4' : 'mr-4'} style={{height: '1.75rem', width: '1.75rem', color: 'rgb(168, 85, 247)', flexShrink: 0, filter: 'drop-shadow(0 1px 2px rgb(0 0 0 / 0.1))'}} />
                  <span className="text-xl font-extrabold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-purple-700 via-fuchsia-600 to-pink-600">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {Array.isArray(property.nearbyPlaces) && property.nearbyPlaces.length > 0 && (
          <motion.div
            variants={itemVariants}
          >
            <h4 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
              <motion.span 
                className={`bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-700 p-2 rounded-lg ${isRTL ? 'ml-3' : 'mr-3'} shadow-sm`}
                whileHover={{ scale: 1.05, rotate: isRTL ? 5 : -5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <FaRegCompass className="w-4 h-4" />
              </motion.span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-700 to-cyan-600">
                {t('nearbyPlaces.title')}
              </span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {property.nearbyPlaces.map((item, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ scale: 1.03, x: isRTL ? -6 : 6 }}
                  className="flex items-center text-gray-800 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl p-4 border border-teal-100 shadow"
                  variants={itemVariants}
                >
                  <FaMapMarkerAlt className={isRTL ? 'ml-3' : 'mr-3'} style={{height: '1.5rem', width: '1.5rem', color: 'rgb(20, 184, 166)', flexShrink: 0}} />
                  <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-700 to-cyan-600">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}