'use client';

import { motion } from 'framer-motion';
import { Home, MapPin, DollarSign, Search, X } from 'lucide-react';
import { useState } from 'react';

type RecordsFilterProps = {
  filters: {
    propertyType: string;
    location: string;
    priceRange: string;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      propertyType: string;
      location: string;
      priceRange: string;
    }>
  >;
};

const RecordsFilter = ({ filters, setFilters }: RecordsFilterProps) => {
  const propertyTypes = ['land', 'apartment', 'villa', 'building'];
  const priceRanges = ['< 1M', '1M - 3M', '> 3M'];
  const locations = ['Riyadh', 'Jeddah', 'Mecca', 'Dammam'];
  
  const [isExpanded, setIsExpanded] = useState(false);

  const resetFilters = () => {
    setFilters({
      propertyType: '',
      location: '',
      priceRange: '',
    });
  };
  
  const hasActiveFilters = filters.propertyType || filters.location || filters.priceRange;

  return (
    <motion.section 
      className="py-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="container mx-auto px-4">
        <motion.div 
          className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 overflow-hidden"
          animate={{ height: isExpanded ? "auto" : "min-content" }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Search size={20} className="text-blue-600" />
              <h2 className="text-xl font-bold text-gray-800">Filter Records</h2>
              
              {/* Active filters indicator */}
              {hasActiveFilters && (
                <div className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                  Active Filters
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              {hasActiveFilters && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={resetFilters}
                  className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-500 transition-colors"
                >
                  <X size={16} /> Reset Filters
                </motion.button>
              )}
              
              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                {isExpanded ? 'Collapse' : 'Expand'}
              </button>
            </div>
          </div>
          
          <motion.div
            initial={false}
            animate={{ opacity: isExpanded ? 1 : 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <form className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Property Type Filter */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-gray-700 font-medium">
                  <Home size={18} className="text-blue-600" />
                  Property Type
                </label>
                <div className="relative">
                  <select
                    value={filters.propertyType}
                    onChange={(e) => setFilters((prev) => ({ ...prev, propertyType: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none"
                  >
                    <option value="">All Property Types</option>
                    {propertyTypes.map((type, index) => (
                      <option key={index} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Location Filter */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-gray-700 font-medium">
                  <MapPin size={18} className="text-blue-600" />
                  Location
                </label>
                <div className="relative">
                  <select
                    value={filters.location}
                    onChange={(e) => setFilters((prev) => ({ ...prev, location: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none"
                  >
                    <option value="">All Locations</option>
                    {locations.map((loc, index) => (
                      <option key={index} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-gray-700 font-medium">
                  <DollarSign size={18} className="text-blue-600" />
                  Price Range
                </label>
                <div className="relative">
                  <select
                    value={filters.priceRange}
                    onChange={(e) => setFilters((prev) => ({ ...prev, priceRange: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none"
                  >
                    <option value="">All Price Ranges</option>
                    {priceRanges.map((range, index) => (
                      <option key={index} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default RecordsFilter;