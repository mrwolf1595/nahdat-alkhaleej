'use client';

import { ChangeEvent, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

interface OffersFilterProps {
  location: string;
  propertyType: string;
  priceRange: string;
  onLocationChange: (value: string) => void;
  onPropertyTypeChange: (value: string) => void;
  onPriceRangeChange: (value: string) => void;
}

const OffersFilter = ({
  location,
  propertyType,
  priceRange,
  onLocationChange,
  onPropertyTypeChange,
  onPriceRangeChange,
}: OffersFilterProps) => {
  const t = useTranslations('offers');
  const [isExpanded, setIsExpanded] = useState(false);

  const locations = [
    t('locations.allLocations'),
    t('locations.riyadh'),
    t('locations.jeddah'),
    t('locations.dammam'),
    t('locations.mecca'),
    t('locations.medina'),
    t('locations.taif'),
    t('locations.abha'),
    t('locations.alUla'),
    t('locations.tabuk'),
    t('locations.jazan'),
    t('locations.najran')
  ];
  
  const propertyTypes = [
    { label: t('propertyTypes.allTypes'), value: 'All Types' },
    { label: t('propertyTypes.forSale'), value: 'sale' },
    { label: t('propertyTypes.forRent'), value: 'rent' },
    { label: t('propertyTypes.featured'), value: 'featured' }
  ];
  
  const priceRanges = [
    t('priceRanges.anyPrice'),
    t('priceRanges.under500k'),
    t('priceRanges.500kTo750k'),
    t('priceRanges.750kTo1m'),
    t('priceRanges.over1m')
  ];

  const SelectArrow = () => (
    <svg
      className="h-5 w-5 text-gray-500 pointer-events-none absolute ltr:right-3 rtl:left-3 top-1/2 transform -translate-y-1/2"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 transition-all duration-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{t('findYourProperty')}</h2>
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-600 hover:text-blue-800 font-medium flex items-center md:hidden"
        >
          {isExpanded ? t('filters.lessFilters') : t('filters.moreFilters')}
          <svg 
            className={`ltr:ml-1 rtl:mr-1 w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      <motion.div 
        className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${isExpanded ? 'block' : 'hidden md:grid'}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Location */}
        <div className="space-y-2">
          <label className="block text-gray-700 font-medium text-sm mb-1">{t('location')}</label>
          <div className="relative">
            <select
              value={location}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => onLocationChange(e.target.value)}
              className="w-full px-4 py-3 ltr:pr-10 rtl:pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-gray-700 text-base"
            >
              {locations.map((loc, idx) => (
                <option key={idx} value={loc}>{loc}</option>
              ))}
            </select>
            <SelectArrow />
          </div>
        </div>

        {/* Property Type */}
        <div className="space-y-2">
          <label className="block text-gray-700 font-medium text-sm mb-1">{t('propertyType')}</label>
          <div className="relative">
            <select
              value={propertyType}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => onPropertyTypeChange(e.target.value)}
              className="w-full px-4 py-3 ltr:pr-10 rtl:pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-gray-700 text-base"
            >
              {propertyTypes.map((type, idx) => (
                <option key={idx} value={type.value}>{type.label}</option>
              ))}
            </select>
            <SelectArrow />
          </div>
        </div>

        {/* Price Range */}
        <div className="space-y-2">
          <label className="block text-gray-700 font-medium text-sm mb-1">{t('priceRange')}</label>
          <div className="relative">
            <select
              value={priceRange}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => onPriceRangeChange(e.target.value)}
              className="w-full px-4 py-3 ltr:pr-10 rtl:pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-gray-700 text-base"
            >
              {priceRanges.map((range, idx) => (
                <option key={idx} value={range}>{range}</option>
              ))}
            </select>
            <SelectArrow />
          </div>
        </div>
      </motion.div>
      
      {/* Mobile View - Show Filter Button */}
      {!isExpanded && (
        <button 
          onClick={() => setIsExpanded(true)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg md:hidden mt-4 flex items-center justify-center"
        >
          <svg className="w-5 h-5 ltr:mr-2 rtl:ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          {t('filters.showFilters')}
        </button>
      )}
    </div>
  );
};

export default OffersFilter;