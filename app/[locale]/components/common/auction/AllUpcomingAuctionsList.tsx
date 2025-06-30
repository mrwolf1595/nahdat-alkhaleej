'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AuctionCard from './AuctionCard';
import { useTranslations } from 'next-intl';

interface AuctionFromDB {
  _id: string;
  title: string;
  description: string;
  startingBid: string;
  auctionDate: string;
  auctionTime: string;
  location: string;
  area: string;
  mainImage: string;
  gallery: string[];
  bedrooms?: number;
  bathrooms?: number;
  estimatedValue?: string;
  featured?: boolean;
}

export default function AllUpcomingAuctionsList() {
  const [auctions, setAuctions] = useState<AuctionFromDB[]>([]);
  const t = useTranslations('auctions.upcoming');

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const res = await fetch('/api/public/upcoming-auctions');
        const data = await res.json();
        setAuctions(data);
      } catch (error) {
        console.error('Error fetching auctions', error);
      }
    };

    fetchAuctions();
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 id='upcoming-auctions' className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
            {t('title')}
          </h2>
          <p className="text-gray-600">{t('subtitle')}</p>
          <div className="w-32 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mt-2 rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {auctions.map((auction, index) => (
            <motion.div
              key={auction._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
             <AuctionCard
                type="upcoming"
                auction={{
                  id: auction._id,
                  title: auction.title,
                  description: auction.description,
                  location: auction.location,
                  startingBid: auction.startingBid,
                  estimatedValue: auction.estimatedValue || 'N/A',
                  auctionDate: auction.auctionDate,
                  auctionTime: auction.auctionTime,
                  bedrooms: auction.bedrooms,
                  bathrooms: auction.bathrooms,
                  area: auction.area,
                  mainImage: auction.mainImage,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}