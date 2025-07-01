'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import AuctionCard from './AuctionCard';
import { Loader2, ArrowRight, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

// Type from AuctionCard
type AuctionType = Parameters<typeof AuctionCard>[0]['auction'];

export default function FeaturedAuctionsList() {
  const [featuredAuctions, setFeaturedAuctions] = useState<AuctionType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const t = useTranslations('auctions.featured');

  useEffect(() => {
    const controller = new AbortController();
    
    async function fetchAuctions() {
      try {
        const res = await fetch('/api/public/auctions/featured', {
          signal: controller.signal,
          next: { revalidate: 3600 } // Cache for 1 hour
        });
        
        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }
        
        const data = await res.json();

        type ApiAuctionType = {
          _id: string;
          title: string;
          description: string;
          startingBid?: string;
          estimatedValue?: string;
          auctionDate: string;
          auctionTime?: string;
          location?: string;
          properties?: { bedrooms?: number; bathrooms?: number; area?: string }[];
          mainImage?: string;
          featured?: boolean;
        };

        const mapped = data.map((auction: ApiAuctionType): AuctionType => ({
          id: auction._id,
          title: auction.title,
          description: auction.description,
          startingBid: auction.startingBid ?? 'N/A',
          estimatedValue: auction.estimatedValue ?? 'N/A',
          auctionDate: auction.auctionDate,
          auctionTime: auction.auctionTime ?? '',
          location: auction.location ?? 'غير محدد',
          bedrooms: auction.properties?.[0]?.bedrooms,
          bathrooms: auction.properties?.[0]?.bathrooms,
          area: auction.properties?.[0]?.area ?? 'N/A',
          mainImage: auction.mainImage ?? '/images/placeholder.jpg',
          featured: auction.featured ?? false,
        }));

        setFeaturedAuctions(mapped);
        setError(null);
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Error fetching featured auctions:', error);
          setError('Failed to load auctions. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchAuctions();
    
    return () => controller.abort();
  }, []);
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5  text-blue-700  font-medium rounded-full text-sm mb-4">
            {t('badge')}
          </span>
          <h2 
            className="font-sans text-4xl font-bold tracking-tight sm:text-5xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-600"
            aria-label={t('title')}
          >
            {t('title')}
          </h2>
          <p className="text-lg font-medium max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mt-6 rounded-full"></div>
        </motion.div>

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center h-64"
            >
              <div className="flex flex-col items-center">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin" aria-label="Loading auctions" />
                <p className="mt-4">{t('loading')}</p>
              </div>
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center p-8 max-w-md mx-auto bg-red-50"
            >
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <p className="text-red-600  mb-3">{error}</p>
              <button 
                onClick={() => {setLoading(true); setError(null);}} 
                className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 "
                aria-label="Retry loading auctions"
              >
                Retry
              </button>
            </motion.div>
          ) : featuredAuctions.length === 0 ? (
            <motion.div
              key="no-auctions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16"
            >
              <div className=" p-8 rounded-xl max-w-lg mx-auto">
                <p className="text-xl font-medium mb-4">{t('noAuctions')}</p>
                <p className="mb-6">{t('checkBack')}</p>
                <Link 
                  href="/auctions" 
                  className="inline-flex items-center px-5 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  {t('browseAll')}
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="auctions"
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
            >
              {featuredAuctions.map((auction) => (
                <motion.div
                  key={auction.id}
                  className="h-full"
                >
                  <AuctionCard auction={auction} type="upcoming" />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        
        {!loading && !error && featuredAuctions.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-16 text-center"
          >
            <Link 
              href="/auctions" 
              className="inline-flex items-center px-6 py-3 rounded-full text-base font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all shadow-md hover:shadow-lg"
              aria-label={t('viewAll')}
            >
              {t('viewAll')}
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}