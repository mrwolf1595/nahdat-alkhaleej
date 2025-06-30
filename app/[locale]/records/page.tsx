'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import HeroRecords from '../components/common/records/HeroRecords';
import RecordsTabs from '../components/common/records/RecordsTabs';
import RecordsFilter from '../components/common/records/RecordsFilter';
import RecordsList from '../components/common/records/RecordsList';
import MarketTrends from '../components/common/records/MarketTrends';
import CallToAction from '../components/common/records/CallToAction';
import { AuctionRecord, EvaluationRecord, NewRecord, RecordType, SalesRecord } from '@/types/records';

export default function RecordsPage() {
  const [activeTab, setActiveTab] = useState<RecordType>('sales');
  const [filters, setFilters] = useState({
    propertyType: '',
    location: '',
    priceRange: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [allRecords, setAllRecords] = useState<NewRecord[]>([]);

  useEffect(() => {
    const fetchRecords = async () => {
      setIsLoading(true);
      try {
        const res = await fetch('/api/admin/records', { cache: 'no-store' });
        const data = await res.json();
        setAllRecords(data);
      } catch (err) {
        console.error('Error loading records:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecords();
  }, []);

  const getRecordsForTab = (tab: RecordType): NewRecord[] => {
    return allRecords.filter((record) => record.type === tab);
  };

  const isPriceInRange = (priceValue: string | undefined, range: string): boolean => {
    const price = parseInt(priceValue?.replace(/[^0-9]/g, '') || '0');
    switch (range) {
      case '< 1M':
        return price < 1_000_000;
      case '1M - 3M':
        return price >= 1_000_000 && price <= 3_000_000;
      case '> 3M':
        return price > 3_000_000;
      default:
        return true;
    }
  };

  const filteredRecords = getRecordsForTab(activeTab).filter((record) => {
    let priceValue: string | undefined;

    if (activeTab === 'sales') priceValue = (record as SalesRecord).soldPrice;
    if (activeTab === 'evaluations') priceValue = (record as EvaluationRecord).estimatedValue;
    if (activeTab === 'auctions') priceValue = (record as AuctionRecord).startingBid;

    return (
      (!filters.propertyType || record.propertyType === filters.propertyType) &&
      (!filters.location || record.location === filters.location) &&
      (!filters.priceRange || isPriceInRange(priceValue, filters.priceRange))
    );
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <HeroRecords />
      <motion.section 
        className="px-4 md:px-8 lg:px-16 py-10 space-y-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <RecordsTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <RecordsFilter filters={filters} setFilters={setFilters} />
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
          </div>
        ) : (
          <RecordsList records={filteredRecords} />
        )}
        <MarketTrends />
        <CallToAction />
      </motion.section>
    </div>
  );
}