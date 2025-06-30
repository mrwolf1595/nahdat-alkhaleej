'use client';
import { motion } from 'framer-motion';
import { Offer } from '@/types/offer';
import { useTranslations } from 'next-intl';

interface PropertySummaryProps {
  offer: Offer;
}

const PropertySummary = ({ offer }: PropertySummaryProps) => {
  const t = useTranslations('offerId.propertySummary');
  const tProperty = useTranslations('offerId.propertyDetails');
  
  return (
    <div className="rounded-2xl shadow-lg overflow-hidden border border-gray-100 w-full transition-all duration-300 p-4 sm:p-6"> 
      <h3 className="text-base sm:text-lg font-semibold text-zinc-500 dark:text-zinc-400 mb-3 sm:mb-4">
        {t('title')}
      </h3>
      
      <div className="space-y-2 sm:space-y-3"> 
        <div className="flex justify-between text-xs sm:text-sm"> 
          <span className="text-zinc-500 dark:text-zinc-400">{t('propertyId')}</span>
          <span className="font-medium text-zinc-500 dark:text-zinc-400">{offer._id.substring(0, 8)}</span>
        </div>
        
        <div className="flex justify-between text-xs sm:text-sm"> 
          <span className="text-zinc-500 dark:text-zinc-400">{t('propertyType')}</span>
          <span className="font-medium text-zinc-500 dark:text-zinc-400">{offer.type || t('apartment')}</span>
        </div>
        
        <div className="flex justify-between text-xs sm:text-sm"> 
          <span className="text-zinc-500 dark:text-zinc-400">{tProperty('area')}</span>
          <span className="font-medium text-zinc-500 dark:text-zinc-400">{offer.area} {tProperty('sqft')}</span>
        </div>
        
        <div className="flex justify-between text-xs sm:text-sm"> 
          <span className="text-zinc-500 dark:text-zinc-400">{tProperty('bedrooms')}</span>
          <span className="font-medium text-zinc-500 dark:text-zinc-400">{offer.bedrooms}</span>
        </div>
        
        <div className="flex justify-between text-xs sm:text-sm"> 
          <span className="text-zinc-500 dark:text-zinc-400">{tProperty('bathrooms')}</span>
          <span className="font-medium text-zinc-500 dark:text-zinc-400">{offer.bathrooms}</span>
        </div>
        
        <div className="flex justify-between text-xs sm:text-sm">
          <span className="text-zinc-500 dark:text-zinc-400">{tProperty('yearBuilt')}</span>
          <span className="font-medium text-zinc-500 dark:text-zinc-400">{offer.yearBuilt}</span>
        </div>
      </div>
      
      <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-gray-100 dark:border-zinc-700"> 
        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 py-1.5 sm:py-2 px-2 sm:px-3 bg-gray-100 hover:bg-gray-200 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-zinc-700 dark:text-zinc-300 text-xs sm:text-sm rounded-lg transition-colors"
          >
            {t('viewDocuments')}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 py-1.5 sm:py-2 px-2 sm:px-3 bg-gray-100 hover:bg-gray-200 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-zinc-700 dark:text-zinc-300 text-xs sm:text-sm rounded-lg transition-colors"
          >
            {t('propertyHistory')}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default PropertySummary;