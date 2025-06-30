'use client';
import { Ruler, Bed, Bath, Calendar, MapPin } from 'lucide-react';
import { Offer } from '@/types/offer';
import { useLocale, useTranslations } from 'next-intl';
import RiyalIcon from '../../../common/Riyal Icon';

interface PropertyDetailsProps {
  offer: Offer;
}

const PropertyDetails = ({ offer }: PropertyDetailsProps) => {
  const t = useTranslations('offerId.propertyDetails');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  
  return (
    <div className="bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-800 dark:to-indigo-900 rounded-3xl shadow-lg p-4 sm:p-6 md:p-8 overflow-hidden border border-sky-100/50 dark:border-sky-700/40 w-full max-w-full mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start mb-4 sm:mb-6 gap-4">
        <div className="w-full sm:w-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-sky-700 dark:text-sky-100 mb-2 sm:mb-3 break-words leading-tight">
            {offer.title}
          </h1>
        </div>
        <div className="text-left sm:text-right mt-2 sm:mt-0 w-full sm:w-auto bg-white/70 dark:bg-sky-800/40 p-3 sm:p-4 rounded-2xl backdrop-blur-sm">
          <div className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-emerald-500 dark:text-emerald-300 flex items-center gap-1 ${isRTL ? 'justify-end' : 'justify-start'}`}>
            {isRTL ? (
              <>
                <span>{offer.price.toLocaleString('ar-SA')}</span>
                <RiyalIcon size={24} />
              </>
            ) : (
              <>
                <RiyalIcon size={24} />
                <span>{offer.price.toLocaleString('en-US')}</span>
              </>
            )}
          </div>
          <div className={`text-xs sm:text-sm md:text-base text-emerald-600 dark:text-emerald-200 mt-1 flex items-center gap-1 ${isRTL ? 'justify-end' : 'justify-start'}`}>
            {offer.sqft && !isNaN(Number(offer.sqft)) && Number(offer.sqft) > 0
              ? (
                  <>
                    {isRTL ? (
                      <>
                        <span>{t('perSqft')}</span>
                        <span>{Math.round(Number(offer.price) / Number(offer.sqft)).toLocaleString('ar-SA')}</span>
                        <RiyalIcon size={12} />
                      </>
                    ) : (
                      <>
                        <RiyalIcon size={12} />
                        <span>{Math.round(Number(offer.price) / Number(offer.sqft)).toLocaleString('en-US')}</span>
                        <span>{t('perSqft')}</span>
                      </>
                    )}
                  </>
                )
              : t('pricePerSqftUnavailable')}
          </div>
        </div>
      </div>
      
      <div className="flex flex-col items-start mb-6 sm:mb-8">
        <div className="flex items-center text-sky-600 dark:text-sky-200 mb-4 sm:mb-6 mx-auto">
          <MapPin size={20} className="sm:hidden mr-2 text-indigo-500 flex-shrink-0" />
          <MapPin size={28} className="hidden sm:block mr-3 text-indigo-500 flex-shrink-0" />
          <p className="text-lg sm:text-xl font-medium">
            {offer.location}
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 w-full mt-2">
          <div className="flex flex-col items-center p-3 sm:p-4 bg-white dark:bg-sky-900 rounded-xl sm:rounded-2xl backdrop-blur-sm border-2 border-sky-200 dark:border-sky-600 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-sky-400 dark:hover:border-sky-300">
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full bg-teal-100 dark:bg-teal-700/30 flex items-center justify-center text-teal-500 mb-2 sm:mb-3">
              <Ruler size={16} className="sm:hidden" />
              <Ruler size={28} className="hidden sm:block" />
            </div>
            <span className="text-base sm:text-xl md:text-2xl font-semibold text-sky-700 dark:text-sky-100">{offer.sqft} {t('sqft')}</span>
          </div>
          
          <div className="flex flex-col items-center p-3 sm:p-4 bg-white dark:bg-sky-900 rounded-xl sm:rounded-2xl backdrop-blur-sm border-2 border-sky-200 dark:border-sky-600 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-sky-400 dark:hover:border-sky-300">
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full bg-blue-100 dark:bg-blue-700/30 flex items-center justify-center text-blue-500 mb-2 sm:mb-3">
              <MapPin size={16} className="sm:hidden" />
              <MapPin size={28} className="hidden sm:block" />
            </div>
            <span className="text-base sm:text-xl md:text-2xl font-semibold text-sky-700 dark:text-sky-100">
              {offer.area}
            </span>
            <span className="text-xs sm:text-sm md:text-base text-sky-600 dark:text-sky-200 mt-0.5 sm:mt-1">{t('area')}</span>
          </div>
          
          <div className="flex flex-col items-center p-3 sm:p-4 bg-white dark:bg-sky-900 rounded-xl sm:rounded-2xl backdrop-blur-sm border-2 border-sky-200 dark:border-sky-600 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-sky-400 dark:hover:border-sky-300">
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full bg-amber-100 dark:bg-amber-700/30 flex items-center justify-center text-amber-500 mb-2 sm:mb-3">
              <Bed size={16} className="sm:hidden" />
              <Bed size={28} className="hidden sm:block" />
            </div>
            <span className="text-base sm:text-xl md:text-2xl font-semibold text-sky-700 dark:text-sky-100">{offer.bedrooms}</span>
            <span className="text-xs sm:text-sm md:text-base text-sky-600 dark:text-sky-200 mt-0.5 sm:mt-1">{t('bedrooms')}</span>
          </div>
          
          <div className="flex flex-col items-center p-3 sm:p-4 bg-white dark:bg-sky-900 rounded-xl sm:rounded-2xl backdrop-blur-sm border-2 border-sky-200 dark:border-sky-600 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-sky-400 dark:hover:border-sky-300">
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full bg-rose-100 dark:bg-rose-700/30 flex items-center justify-center text-rose-500 mb-2 sm:mb-3">
              <Bath size={16} className="sm:hidden" />
              <Bath size={28} className="hidden sm:block" />
            </div>
            <span className="text-base sm:text-xl md:text-2xl font-semibold text-sky-700 dark:text-sky-100">{offer.bathrooms}</span>
            <span className="text-xs sm:text-sm md:text-base text-sky-600 dark:text-sky-200 mt-0.5 sm:mt-1">{t('bathrooms')}</span>
          </div>
          
          <div className="flex flex-col items-center p-3 sm:p-4 bg-white dark:bg-sky-900 rounded-xl sm:rounded-2xl backdrop-blur-sm border-2 border-sky-200 dark:border-sky-600 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-sky-400 dark:hover:border-sky-300">
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full bg-green-100 dark:bg-green-700/30 flex items-center justify-center text-green-500 mb-2 sm:mb-3">
              <Calendar size={16} className="sm:hidden" />
              <Calendar size={28} className="hidden sm:block" />
            </div>
            <span className="text-base sm:text-xl md:text-2xl font-semibold text-sky-700 dark:text-sky-100">{offer.yearBuilt}</span>
            <span className="text-xs sm:text-sm md:text-base text-sky-600 dark:text-sky-200 mt-0.5 sm:mt-1">{t('yearBuilt')}</span>
          </div>
        </div>
      </div>
      
      <div className="bg-white/80 dark:bg-sky-800/20 p-4 sm:p-6 rounded-xl sm:rounded-2xl backdrop-blur-sm border-2 border-sky-100 dark:border-sky-700 transform transition duration-300 hover:shadow-xl">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-sky-700 dark:text-sky-100 text-center">{t('description')}</h2>
        <div className="w-24 sm:w-32 md:w-40 h-1 bg-gradient-to-r from-sky-300 to-indigo-500 rounded-full mx-auto mb-4 sm:mb-6"></div>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-sky-600 dark:text-sky-200 leading-relaxed break-words text-center max-w-4xl mx-auto font-medium">
          {offer.description}
        </p>
      </div>
    </div>
  );
};

export default PropertyDetails;