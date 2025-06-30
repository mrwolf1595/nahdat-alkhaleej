'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import AuctionCard from './AuctionCard';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface PastAuction {
  _id: string;
  title: string;
  description: string;
  auctionDate: string;
  location: string;
  soldPrice?: string;
  estimatedValue?: string;
  bedrooms?: number;
  bathrooms?: number;
  area: string;
  mainImage: string;
}

export default function PastAuctionsList() {
  const [auctions, setAuctions] = useState<PastAuction[]>([]);
  const t = useTranslations('auctions.past');

  useEffect(() => {
    const fetchPastAuctions = async () => {
      try {
        const res = await fetch('/api/public/past-auctions');
        const data = await res.json();
        setAuctions(data);
      } catch (error) {
        console.error('Error fetching past auctions:', error);
      }
    };

    fetchPastAuctions();
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-green-600">
            {t('title')}
          </h2>
          <p className="text-gray-600">{t('subtitle')}</p>
          <div className="w-32 h-1 bg-gradient-to-r from-emerald-600 to-green-600 mt-2 rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {auctions.map((auction, index) => (
            <motion.div
              key={auction._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <AuctionCard
                type="past"
                auction={{
                  id: auction._id,
                  title: auction.title,
                  description: auction.description,
                  location: auction.location,
                  soldPrice: auction.soldPrice || 'N/A',
                  estimatedValue: auction.estimatedValue || 'N/A',
                  auctionDate: auction.auctionDate,
                  bedrooms: auction.bedrooms,
                  bathrooms: auction.bathrooms,
                  area: auction.area,
                  mainImage: auction.mainImage,
                }}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <Link
            href="/past-auctions"
            className="inline-flex items-center bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            {t('viewAll')}
            <ArrowRight size={18} className="ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}