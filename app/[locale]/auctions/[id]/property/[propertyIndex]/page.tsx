'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AuctionDetail, PropertyType } from '@/types/auction';
import PropertyDetails from '../../../../components/common/auction/id/PropertyDetails';
import LoadingState from '../../../../components/common/auction/id/LoadingState';
import NotFoundState from '../../../../components/common/auction/id/NotFoundState';
import { motion } from 'framer-motion';
import PropertyImageSlider from '../../../../components/common/auction/id/PropertyImageSlider';
import { FaArrowLeft, FaArrowRight, FaMapMarkedAlt, FaBuilding, FaRegCalendarAlt } from 'react-icons/fa';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import toast from 'react-hot-toast';
import { useTranslations } from 'next-intl';

export default function PropertyDetailPage() {
  const t = useTranslations('property.details');
  const params = useParams();
  const router = useRouter();
  const { id, propertyIndex, locale } = params as { id: string; propertyIndex: string; locale: string };
  const isRTL = locale === 'ar';
  
  const [liked, setLiked] = useState(false);
  const [auction, setAuction] = useState<AuctionDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [propertyImages, setPropertyImages] = useState<string[]>([]);
  const [likesCount, setLikesCount] = useState(0);
  const [isLikesLoading, setIsLikesLoading] = useState(true);

  // Get the consistent property ID
  const propertyId = `${id}_property_${propertyIndex}`;

  // Fetch auction data
  useEffect(() => {
    // Removed duplicate fetchAuction declaration
    const fetchAuction = async () => {
      try {
        const res = await fetch(`/api/public/upcoming-auctions/${id}`);
        if (!res.ok) {
          setIsLoading(false);
          return;
        }

        const data = await res.json();
        setAuction(data);

        const selectedProperty = data.properties?.[+propertyIndex];
        if (selectedProperty?.images?.length) {
          setPropertyImages(selectedProperty.images.map((img: { url: string }) => img.url));
        }

        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchAuction();
  }, [id, propertyIndex]);

  // Check like status and fetch likes count after auction loads
  useEffect(() => {
    if (!auction) return;

    const checkLikeStatus = async () => {
      try {
        // Check local storage for like status
        if (typeof window !== 'undefined' && localStorage.getItem(`liked_${propertyId}`)) {
          setLiked(true);
        }

        // Fetch likes count from server
        const res = await fetch(`/api/likes/count?propertyId=${propertyId}`);
        if (res.ok) {
          const data = await res.json();
          setLikesCount(data.count || 0);
        }
      } catch (error) {
        console.error('Error fetching likes:', error);
      } finally {
        setIsLikesLoading(false);
      }
    };

    checkLikeStatus();
  }, [auction, propertyId]);

  const handlePropertyLike = async () => {
    // Prevent duplicate likes
    if (liked) {
      toast.error(t('propertyLiking.alreadyLiked'));
      return;
    }

    setIsLikesLoading(true);
    try {
      const res = await fetch(`/api/auctions/${id}/properties/${propertyIndex}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        toast.success(t('propertyLiking.thanksForLiking'));
        localStorage.setItem(`liked_${propertyId}`, 'true');
        setLiked(true);
        setLikesCount(prev => prev + 1); // Optimistic update
        
        // Verify with server
        const verifyRes = await fetch(`/api/likes/count?propertyId=${propertyId}`);
        if (verifyRes.ok) {
          const data = await verifyRes.json();
          setLikesCount(data.count);
        }
      } else {
        const data = await res.json();
        toast.error(data.message || t('propertyLiking.failedToLike'));
      }
    } catch (error) {
      console.error('Failed to like property:', error);
      toast.error(t('propertyLiking.somethingWentWrong'));
    } finally {
      setIsLikesLoading(false);
    }
  };

  if (isLoading) return <LoadingState />;
  if (!auction || !auction.properties?.[+propertyIndex]) return <NotFoundState />;

  const property = auction.properties[+propertyIndex];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  // Arrow icon for back button based on RTL
  const BackArrow = isRTL ? FaArrowRight : FaArrowLeft;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className={`absolute -top-40 ${isRTL ? '-left-40' : '-right-40'} w-80 h-80 bg-indigo-100/30 rounded-full blur-3xl`}></div>
      <div className={`absolute -bottom-40 ${isRTL ? '-right-40' : '-left-40'} w-80 h-80 bg-blue-100/30 rounded-full blur-3xl`}></div>
      
      {/* Enhanced Slider Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        {propertyImages.length > 0 ? (
          <>
            <div className="relative overflow-hidden rounded-b-3xl shadow-2xl">
              <PropertyImageSlider images={propertyImages} />
              {/* Property quick info overlay */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-4 py-6 z-20"
              >
                <div className="max-w-5xl mx-auto flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <h2 className="text-white text-xl sm:text-2xl font-bold mb-2 drop-shadow-md">
                      {property.title || `${property.type?.toUpperCase()}`}
                    </h2>
                    {property.location && (
                      <div className="flex items-center text-white/90 text-sm">
                        <FaMapMarkedAlt className={isRTL ? 'ml-2' : 'mr-2'} style={{color: 'rgb(147, 197, 253)'}} />
                        <span>{property.location}</span>
                      </div>
                    )}
                  </div>
                  
                  {property.price && (
                    <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                      <span className="text-white/80 text-sm">{t('price')}:</span>
                      <span className={`text-white font-bold ${isRTL ? 'mr-1' : 'ml-1'}`}>{property.price}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
            
            {/* Like button and count */}
            <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} z-20 flex items-center gap-2`}>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handlePropertyLike}
                disabled={isLikesLoading}
                className="flex items-center text-gray-400 hover:text-red-500 transition-colors duration-300 disabled:opacity-50"
              >
                <Heart
                  size={28}
                  className={likesCount > 0 ? 'fill-red-500 text-red-500' : ''}
                />
              </motion.button>
              <span className="text-sm text-white bg-black/30 px-2 py-1 rounded-full">
                {isLikesLoading ? '...' : likesCount}
              </span>
            </div>
            
            {/* Image counter badge */}
            <div className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'} sm:top-6 ${isRTL ? 'sm:right-6' : 'sm:left-6'} bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium z-30`}>
              {propertyImages.length} {t('images.count')}
            </div>
          </>
        ) : (
          <div className="h-[40vh] bg-gradient-to-r from-blue-100 to-indigo-100 rounded-b-3xl flex items-center justify-center">
            <div className="text-center p-8">
              <FaBuilding className="mx-auto text-4xl text-indigo-400 mb-4" />
              <p className="text-indigo-700 font-medium">{t('images.noImages')}</p>
            </div>
          </div>
        )}
      </motion.div>
      
      {/* Details */}
      <section className="max-w-5xl mx-auto px-4 py-12 sm:py-16 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Back button and title row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <motion.div
              variants={itemVariants}
              className="flex items-center"
            >
              <motion.button
                onClick={() => router.back()}
                whileHover={{ scale: 1.05, x: isRTL ? 5 : -5 }}
                whileTap={{ scale: 0.95 }}
                className={`${isRTL ? 'ml-4' : 'mr-4'} bg-white p-3 rounded-full shadow-md text-indigo-600 hover:text-indigo-800 transition-colors duration-300`}
                aria-label={t('actions.backToAuction')}
              >
                <BackArrow />
              </motion.button>
              
              <motion.h1
                variants={itemVariants}
                className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-blue-600"
              >
                {property.title || `${t('propertyNumber')}${+propertyIndex + 1} - ${property.type?.toUpperCase()}`}
              </motion.h1>
            </motion.div>
            
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="flex items-center bg-gradient-to-r from-indigo-50 to-blue-50 px-4 py-2 rounded-full border border-indigo-100 shadow-sm"
            >
              <FaRegCalendarAlt className={isRTL ? 'ml-2' : 'mr-2'} style={{color: 'rgb(99, 102, 241)'}} />
              <span className="text-sm font-medium text-indigo-700">
                {t('auction')}: {auction.auctionDate}
              </span>
            </motion.div>
          </div>
          
          {/* Property meta info */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
          >
            {property.location && (
              <motion.div
                whileHover={{ scale: 1.03, y: -5 }}
                className="flex items-center p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 shadow-sm"
              >
                <div className={`bg-blue-100 text-blue-600 p-2 rounded-lg ${isRTL ? 'ml-3' : 'mr-3'} shadow-sm`}>
                  <FaMapMarkedAlt className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-blue-400">{t('location')}</p>
                  <p className="font-semibold text-blue-700">{property.location}</p>
                </div>
              </motion.div>
            )}
            
            {property.type && (
              <motion.div
                whileHover={{ scale: 1.03, y: -5 }}
                className="flex items-center p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 shadow-sm"
              >
                <div className={`bg-blue-100 text-blue-600 p-2 rounded-lg ${isRTL ? 'ml-3' : 'mr-3'} shadow-sm`}>
                  <FaBuilding className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-blue-400">{t('propertyType')}</p>
                  <p className="font-semibold text-blue-700">{property.type}</p>
                </div>
              </motion.div>
            )}
            
            {property.price && (
              <motion.div
                whileHover={{ scale: 1.03, y: -5 }}
                className="flex items-center p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 shadow-sm"
              >
                <div className={`bg-green-100 text-green-600 p-2 rounded-lg ${isRTL ? 'ml-3' : 'mr-3'} shadow-sm`}>
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-green-400">{t('price')}</p>
                  <p className="font-semibold text-green-700">{property.price}</p>
                </div>
              </motion.div>
            )}
          </motion.div>
          
          {/* Property details component */}
          <motion.div variants={itemVariants}>
            <PropertyDetails property={{...property, type: property.type as PropertyType}} />
          </motion.div>
          
          {/* Action buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 pt-6"
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex-1 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white py-4 px-6 rounded-xl font-medium shadow-lg shadow-indigo-200/50 transition-all duration-300 flex items-center justify-center group"
            >
              <span>{t('actions.registerInterest')}</span>
              <span className={`${isRTL ? 'mr-2 group-hover:-translate-x-1' : 'ml-2 group-hover:translate-x-1'} transition-transform duration-300`}>
                {isRTL ? '←' : '→'}
              </span>
            </motion.button>
            
            <Link href={`/auctions/${id}`} passHref>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex-1 bg-white border border-indigo-200 text-indigo-700 py-4 px-6 rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
              >
                {t('actions.viewAllProperties')}
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}