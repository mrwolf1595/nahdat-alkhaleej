'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroSlider from '../components/common/offers/HeroSlider';
import OffersFilter from '../components/common/offers/OffersFilter';
import StatsSection from '../components/common/offers/StatsSection';
import CallToAction from '../components/common/offers/CallToAction';
import Newsletter from '../components/common/offers/Newsletter';
import PropertyCard from '../components/common/offers/PropertyCard';
import FilterTabs from '../components/common/offers/FilterTabs';
import Testimonials from '../components/common/auction/Testimonials';
import { useTranslations } from 'next-intl';

export default function OffersPage() {
  const t = useTranslations('offers');
  const [offers, setOffers] = useState({
    all: [],
    featured: [],
    forSale: [],
    forRent: [],
  });
  const [filtered, setFiltered] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter state
  const [location, setLocation] = useState(t('filters.allLocations'));
  const [propertyType, setPropertyType] = useState(t('filters.allTypes'));
  const [priceRange, setPriceRange] = useState(t('filters.anyPrice'));
  const [sortBy, setSortBy] = useState(t('filters.newest'));
  
  useEffect(() => {
    const fetchOffers = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const res = await fetch('/api/public/offers', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch offers');
        
        const data = await res.json();
        
        setOffers({
          all: data.all || [],
          featured: data.featured || [],
          forSale: data.forSale || [],
          forRent: data.forRent || [],
        });
        setFiltered(data.all || []);
      } catch (err) {
        console.error('Error fetching offers:', err);
        setError(t('errorMessage'));
      } finally {
        setTimeout(() => setLoading(false), 800);
      }
    };

    fetchOffers();
  }, []);

  // Apply all filters
  useEffect(() => {
    let result = [];
  
    // Select base list based on active filter
    if (activeFilter === 'featured') {
      result = [...offers.featured];
    } else if (activeFilter === 'forsale') {
      result = [...offers.forSale];
    } else if (activeFilter === 'forrent') {
      result = [...offers.forRent];
    } else {
      result = [...offers.all];
    }
  
    // Apply additional filters
    if (location !== t('filters.allLocations')) {
      result = result.filter((o) => o.location && o.location.includes(location));
    }
    
    if (propertyType !== t('filters.allTypes')) {
      if (propertyType === 'featured') {
        result = result.filter((o) => o.featured === true);
      } else if (propertyType === 'sale' || propertyType === 'rent') {
        result = result.filter((o) => o.offerType === propertyType);
      }
    }
    
    if (priceRange !== t('filters.anyPrice')) {
      if (priceRange === t('priceRanges.under500k')) {
        result = result.filter((o) => typeof o.price === 'number' && o.price < 500000);
      } else if (priceRange === t('priceRanges.500kTo750k')) {
        result = result.filter((o) => typeof o.price === 'number' && o.price >= 500000 && o.price <= 750000);
      } else if (priceRange === t('priceRanges.750kTo1m')) {
        result = result.filter((o) => typeof o.price === 'number' && o.price >= 750000 && o.price <= 1000000);
      } else if (priceRange === t('priceRanges.over1m')) {
        result = result.filter((o) => typeof o.price === 'number' && o.price > 1000000);
      }
    }
  
    // Apply sorting
    result = applySorting(result, sortBy);
    setFiltered(result);
  }, [activeFilter, location, propertyType, priceRange, sortBy, offers]);
  
  // Handle search submission - ADD THIS FUNCTION
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSlider />
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{t('discoverYourPerfectProperty')}</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-3xl mx-auto">
              {t('browseExtensiveCollection')}
            </p>
          </motion.div>
          
          <FilterTabs activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
          
          <OffersFilter
            location={location}
            propertyType={propertyType}
            priceRange={priceRange}
            onLocationChange={setLocation}
            onPropertyTypeChange={setPropertyType}
            onPriceRangeChange={setPriceRange}
            onSearchSubmit={handleSearchSubmit}
          />
          
          <ErrorMessage error={error} />
          
          <div id="results-section" className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <span className="text-gray-600 text-sm">{t('sortBy')}:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-1 text-sm bg-white"
              >
                <option value="Newest">{t('filters.newest')}</option>
                <option value="PriceLowToHigh">{t('filters.priceLowToHigh')}</option>
                <option value="PriceHighToLow">{t('filters.priceHighToLow')}</option>
                <option value="MostPopular">{t('filters.mostPopular')}</option>
              </select>
            </div>
          </div>
          
          <OffersList offers={filtered} loading={loading}/>
        </div>
      </section>
      
      <StatsSection className="rounded-4xl mb-12"/>
      <CallToAction  className="rounded-4xl mb-12"/>
      <Newsletter />
      <Testimonials sectionTitle={t('testimonials.title')} />
    </div>
  );
}

// Helper function for sorting
const applySorting = (items, sortBy) => {
  if (sortBy === 'Newest') {
    return [...items].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
  } else if (sortBy === 'PriceLowToHigh') {
    return [...items].sort((a, b) => (a.price || 0) - (b.price || 0));
  } else if (sortBy === 'PriceHighToLow') {
    return [...items].sort((a, b) => (b.price || 0) - (a.price || 0));
  }
  return items;
};

// Error message component
const ErrorMessage = ({ error }) => {
  const t = useTranslations('offers');
  
  if (!error) return null;
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-8 text-center"
      >
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-2 text-sm font-medium text-red-700 hover:text-red-900 underline"
        >
          {t('tryAgain')}
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

// Offers List component
const OffersList = ({ offers, loading }) => {
  const t = useTranslations('offers');
  
  if (loading) {
    return <LoadingState />;
  }
  
  if (!offers || offers.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">{t('noPropertiesFound')}</p>
      </div>
    );
  }
  
  return (
    <div id='offerList' className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {offers.map((offer, index) => (
        <PropertyCard key={offer.id || index} offer={offer} index={index} />
      ))}
    </div>
  );
};

// Loading state component
const LoadingState = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden h-96 animate-pulse">
        <div className="bg-gray-300 h-52 w-full"></div>
        <div className="p-4">
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-3"></div>
          <div className="h-4 bg-gray-300 rounded w-full mb-3"></div>
          <div className="h-10 bg-gray-300 rounded w-full mt-4"></div>
        </div>
      </div>
    ))}
  </div>
);