'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { PastAuction } from '@/types/PastAuction';
import PastPropertyImageSlider from '../../../../../components/common/auction/past/PastPropertyImageSlider';
import PastPropertyDescription from '../../../../../components/common/auction/past/PastPropertyDescription';
import PastPropertyDetails from '../../../../../components/common/auction/past/PastPropertyDetails';
import LocationButton from '../../../../../components/common/auction/past/LocationButton';
import PastNotFoundState from '../../../../../components/common/auction/past/PastNotFoundState';
import PastLoadingState from '../../../../../components/common/auction/past/PastLoadingState';
import { FaArrowLeft, FaExternalLinkAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function PastPropertyPage() {
  const { id, index } = useParams() as { id: string; index: string };
  const [auction, setAuction] = useState<PastAuction | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuction = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
        const res = await fetch(`${baseUrl}/api/public/past-auctions/${id}`);
        if (!res.ok) throw new Error('Failed to fetch auction data');
        const data = await res.json();
        setAuction(Array.isArray(data) ? data[0] : data);
      } catch (error) {
        console.error(error);
        setAuction(null);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchAuction();
  }, [id]);

  if (loading) return <PastLoadingState />;
  if (!auction) return <PastNotFoundState />;

  const propertyIndex = parseInt(index, 10);
  const property = auction.properties[propertyIndex];
  if (!property) return <PastNotFoundState />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 py-12 px-4 md:px-8">
      {/* Back to Auction Button - Top position with enhanced styling */}
      <motion.div 
        className="max-w-7xl mx-auto mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.a
          href={`/auctions/past/${id}`}
          className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl font-bold text-md shadow-lg hover:shadow-blue-200 transition-all duration-300"
          whileHover={{ scale: 1.05, boxShadow: "0 15px 25px -5px rgba(37, 99, 235, 0.2)" }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{ x: [0, -5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <FaArrowLeft />
          </motion.div>
          <span>Back to Auction</span>
        </motion.a>
      </motion.div>

      <motion.div 
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Main content with responsive grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Image Slider */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Image Slider */}
            <div className="w-full rounded-3xl overflow-hidden bg-white p-3 shadow-xl hover:shadow-2xl transition-all duration-500 border border-indigo-100">
              <PastPropertyImageSlider images={property.images || []} />
            </div>

            {/* Location Button between slider and map */}
            {property.mapLink && (
              <div className="flex justify-center my-4">
                <LocationButton mapLink={property.mapLink} />
              </div>
            )}

            {/* Map below slider and location button */}
            {property.iframeLink && (
              <motion.div 
                className="w-full rounded-2xl overflow-hidden shadow-xl border border-indigo-200 relative hover:shadow-2xl hover:border-indigo-300 transition-all duration-500 bg-white p-2"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {/* Map Button - Uses mapLink with enhanced styling */}
                {property.mapLink && (
                  <div className="absolute top-5 left-5 z-10">
                    <motion.a
                      href={property.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 bg-white/90 backdrop-blur-md border-2 border-indigo-500 text-indigo-700 font-bold py-2.5 px-5 rounded-xl shadow-lg hover:bg-indigo-600 hover:text-white transition-all duration-300"
                      whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.3)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <span>View Large Map</span>
                      <FaExternalLinkAlt className="text-sm opacity-80" />
                    </motion.a>
                  </div>
                )}
                <iframe
                  src={property.iframeLink}
                  className="w-full rounded-xl"
                  height={300}
                  loading="lazy"
                  allowFullScreen
                />
              </motion.div>
            )}
          </motion.div>

          {/* Right Column - Property Details */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div>
              <PastPropertyDescription property={property} />
            </div>
            
            <div className="w-full">
              <PastPropertyDetails property={property} />
            </div>
          </motion.div>
        </div>

        {/* Mobile-only Back to Auction Button - Bottom position with enhanced styling */}
        <motion.div 
          className="lg:hidden text-center pt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <motion.a
            href={`/auctions/past/${id}`}
            className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 px-8 rounded-xl font-bold text-lg shadow-xl hover:shadow-blue-200 transition-all duration-300"
            whileHover={{ scale: 1.05, boxShadow: "0 15px 25px -5px rgba(37, 99, 235, 0.3)" }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ x: [0, -5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <FaArrowLeft />
            </motion.div>
            <span>Back to Auction</span>
          </motion.a>
        </motion.div>
      </motion.div>
    </div>
  );
}