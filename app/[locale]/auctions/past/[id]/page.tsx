'use client';
import { useParams } from 'next/navigation';
import { PastAuction } from '@/types/PastAuction';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaLayerGroup } from 'react-icons/fa';

import PastAuctionImageGallery from '../../../components/common/auction/past/PastAuctionImageGallery';
import PastAuctionDescription from '../../../components/common/auction/past/PastAuctionDescription';
import PastAuctionInformation from '../../../components/common/auction/past/PastAuctionInformation';
import PastAuctionInfoCard from '../../../components/common/auction/past/PastAuctionInfoCard';
import PastNotFoundState from '../../../components/common/auction/past/PastNotFoundState';
import PastLoadingState from '../../../components/common/auction/past/PastLoadingState';
import ElapsedTimer from '../../../components/admin/auctions/ElapsedTimer';

// Enhanced animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] // Custom cubic bezier for smoother animation
    }
  }
};

export default function PastAuctionDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [auction, setAuction] = useState<PastAuction | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuction = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
        const res = await fetch(`${baseUrl}/api/public/past-auctions/${id}`);
        if (!res.ok) return setAuction(null);
        const data = await res.json();
        setAuction(Array.isArray(data) ? data[0] : data);
      } catch (err) {
        console.error(err);
        setAuction(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchAuction();
  }, [id]);

  if (loading) return <PastLoadingState />;
  if (!auction) return <PastNotFoundState />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-indigo-50/30 to-violet-50/40">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="space-y-16 pb-16"
      >
        <motion.div variants={itemVariants} className="w-full">
          <PastAuctionImageGallery title={auction.title} images={[auction.mainImage, ...auction.gallery]} />
        </motion.div>
        
        {/* Content container for centered elements */}
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          {/* Title below the gallery */}
          <motion.div variants={itemVariants} className="text-center">
            <motion.h1
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-3"
            >
              {auction.title}
            </motion.h1>
            <div className="w-32 h-1.5 bg-gradient-to-r from-violet-500 via-indigo-500 to-blue-500 mx-auto rounded-full mb-8 shadow-sm" />
          </motion.div>

          <motion.div variants={itemVariants} className="mb-12">
            <PastAuctionDescription title="Auction Description" content={auction.description} />
          </motion.div>

          <motion.div variants={itemVariants} className="mb-12">
            <PastAuctionInformation
              date={auction.auctionDate}
              time={auction.auctionTime}
              location={auction.location}
              mapLink={auction.mapLink}
            />
          </motion.div>

          <motion.div variants={itemVariants} className="mb-12">
            <ElapsedTimer 
              auctionDate={auction.auctionDate}
              auctionTime={auction.auctionTime}
              title="Time Since Auction Ended"
            />
          </motion.div>

          <motion.div variants={itemVariants} className="mb-14">
            <PastAuctionInfoCard auction={auction} />
          </motion.div>

          {/* Property Cards with More Details Button */}
          <motion.div variants={itemVariants} className="space-y-10">
            <h2 className="text-2xl font-bold text-indigo-900 mb-8 flex items-center">
              <FaLayerGroup className="mr-3 text-indigo-600" />
              Available Properties
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {auction.properties.map((property, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -8, boxShadow: "0 20px 30px -10px rgba(79, 70, 229, 0.2)" }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border-t border-l border-r border-b border-indigo-100/50 relative overflow-hidden group"
                >
                  {/* Enhanced gradient background */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-500/10 to-violet-500/5 rounded-bl-full -z-10 transition-all duration-500 ease-out 
                    group-hover:w-full group-hover:h-full group-hover:rounded-none group-hover:opacity-30" />
                  
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-indigo-800 flex items-center">
                      <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1.5 rounded-full mr-2">
                        {property.type.toUpperCase()}
                      </span>
                      <span>{property.area} m²</span>
                    </h3>
                    {property.price && (
                      <p className="text-indigo-700 font-bold bg-gradient-to-r from-indigo-50 to-violet-50 px-4 py-1.5 rounded-full shadow-sm">
                        {property.price} SAR
                      </p>
                    )}
                  </div>

                  <p className="text-sm text-gray-600 flex items-center mb-5">
                    <span className="w-7 h-7 bg-gradient-to-br from-indigo-100 to-violet-100 rounded-full flex items-center justify-center mr-2.5 text-indigo-600 shadow-sm">📍</span>
                    {property.location}
                  </p>

                  <Link
                    href={`/auctions/past/${auction._id}/property/${index}`}
                    className="inline-flex items-center gap-2 text-indigo-600 hover:text-violet-700 text-sm font-medium transition-all duration-300 
                    group-hover:translate-x-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-violet-500 
                    after:transition-all after:duration-300 group-hover:after:w-full"
                  >
                    <span>More Details</span>
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="text-center pt-16 pb-8">
            <motion.a
              href="/#past-auctions"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-700 text-white py-3.5 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <FaArrowLeft />
              <span>Back to Auctions</span>
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}