'use client';

import { useState, useEffect, useCallback } from 'react';
import { pastAuctions } from '@/data/pastAuctions';
import InfiniteScroll from 'react-infinite-scroll-component';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

type Auction = typeof pastAuctions[0];
const ITEMS_PER_LOAD = 6;

export default function PastAuctionsPage() {
  const [visibleAuctions, setVisibleAuctions] = useState<Auction[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [sortBy, setSortBy] = useState('date-desc');

  const parsePrice = (price: string) => parseInt(price.replace(/\$|,/g, '')) || 0;

  const sortAuctions = useCallback((auctions: Auction[], sort: string): Auction[] => {
    const copied = [...auctions];
    if (sort === 'date-asc') return copied.sort((a, b) => new Date(a.auctionDate).getTime() - new Date(b.auctionDate).getTime());
    if (sort === 'date-desc') return copied.sort((a, b) => new Date(b.auctionDate).getTime() - new Date(a.auctionDate).getTime());
    if (sort === 'price-asc') return copied.sort((a, b) => parsePrice(a.soldPrice) - parsePrice(b.soldPrice));
    if (sort === 'price-desc') return copied.sort((a, b) => parsePrice(b.soldPrice) - parsePrice(a.soldPrice));
    return copied;
  }, []);

  useEffect(() => {
    const sorted = sortAuctions(pastAuctions, sortBy);
    setVisibleAuctions(sorted.slice(0, ITEMS_PER_LOAD));
    setHasMore(sorted.length > ITEMS_PER_LOAD);
  }, [sortBy, sortAuctions]);

  const fetchMoreData = () => {
    const sorted = sortAuctions(pastAuctions, sortBy);
    const nextItems = sorted.slice(visibleAuctions.length, visibleAuctions.length + ITEMS_PER_LOAD);
    setVisibleAuctions((prev) => [...prev, ...nextItems]);
    if (visibleAuctions.length + ITEMS_PER_LOAD >= sorted.length) {
      setHasMore(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Past Auctions</h1>

      <div className="mb-6 flex flex-wrap gap-4 justify-center">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-md shadow-sm"
        >
          <option value="date-desc">Newest First</option>
          <option value="date-asc">Oldest First</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="price-asc">Price: Low to High</option>
        </select>
      </div>

      <InfiniteScroll
        dataLength={visibleAuctions.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, idx) => (
              <Skeleton key={idx} height={320} className="rounded-md" />
            ))}
          </div>
        }
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {visibleAuctions.map((auction) => (
          <motion.div
            key={auction.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="relative h-64 w-full bg-gray-100">
              <div className="absolute top-0 left-0 bg-green-600 text-white px-3 py-1 m-2 rounded z-10">
                Sold
              </div>
              <Image
                src={auction.image}
                alt={auction.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{auction.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-2">{auction.description}</p>
              <div className="flex justify-between items-center mb-2">
                <p className="text-green-600 font-bold">{auction.soldPrice}</p>
                <p className="text-gray-500 text-sm">{auction.auctionDate}</p>
              </div>
              <Link
                href={`/auctions/past/${auction.id}`}
                className="block w-full mt-3 bg-green-600 hover:bg-green-700 text-white text-center font-semibold py-2 rounded-md transition"
              >
                View Details
              </Link>
            </div>
          </motion.div>
        ))}
      </InfiniteScroll>
    </div>
  );
}
