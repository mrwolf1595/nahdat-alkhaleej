import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendarAlt, FaClock, FaTag, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { IoLocationOutline } from 'react-icons/io5';
import { BsInfoCircleFill } from 'react-icons/bs';
import { useTranslations } from 'next-intl';

interface AuctionImageGalleryProps {
  gallery: string[];
  title: string;
  location: string;
  auctionDate: string;
  auctionTime: string;
  startingBid: string;
}

export default function AuctionImageGallery({
  gallery,
  title,
  location,
  auctionDate,
  auctionTime,
  startingBid
}: AuctionImageGalleryProps) {
  const t = useTranslations('auctionId.detail.imageGallery');
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isInfoExpanded, setIsInfoExpanded] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);

  // Auto slider every 5 seconds
  useEffect(() => {
    if (!gallery || gallery.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) =>
        prev === gallery.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [gallery]);

  const nextImage = useCallback(() => {
    if (!gallery) return;
    setCurrentImageIndex((prev) =>
      prev === gallery.length - 1 ? 0 : prev + 1
    );
  }, [gallery]);

  const prevImage = useCallback(() => {
    if (!gallery) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? gallery.length - 1 : prev - 1
    );
  }, [gallery]);

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const setIsImageLoaded = (isLoaded: boolean) => {
    console.log(`Image loaded: ${isLoaded}`);
  };

  // Handle swipe gestures for mobile
  useEffect(() => {
    const element = galleryRef.current;
    if (!element) return;

    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    };

    const handleSwipe = () => {
      // Swipe left (next)
      if (touchEndX < touchStartX - 50) {
        nextImage();
      }
      // Swipe right (previous)
      if (touchEndX > touchStartX + 50) {
        prevImage();
      }
    };

    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [nextImage, prevImage]);

  return (
    <div ref={galleryRef} className="relative h-[70vh] md:h-[80vh] overflow-hidden">
      {/* Navigation buttons */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 0.8, x: 0 }}
        whileHover={{ opacity: 1, scale: 1.1, x: -5 }}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-gradient-to-r from-indigo-600/80 to-blue-600/80 backdrop-blur-sm hover:from-indigo-600 hover:to-blue-600 rounded-full p-3 text-white shadow-lg hidden sm:block"
        onClick={prevImage}
      >
        <FaChevronLeft className="w-6 h-6" />
      </motion.button>
      
      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 0.8, x: 0 }}
        whileHover={{ opacity: 1, scale: 1.1, x: 5 }}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-gradient-to-l from-indigo-600/80 to-blue-600/80 backdrop-blur-sm hover:from-indigo-600 hover:to-blue-600 rounded-full p-3 text-white shadow-lg hidden sm:block"
        onClick={nextImage}
      >
        <FaChevronRight className="w-6 h-6" />
      </motion.button>

      {/* Overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>

      {/* Slideshow images */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentImageIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 z-0 w-full h-full"
        >
          {gallery?.[currentImageIndex] && (
            <Image
              src={gallery[currentImageIndex]}
              alt={`Gallery Image ${currentImageIndex + 1}`}
              fill
              className="object-cover"
              priority
              onLoad={() => setIsImageLoaded(true)}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Indicators */}
      <div className="absolute bottom-28 sm:bottom-32 left-0 right-0 z-20 flex justify-center gap-2 px-4">
        {gallery?.map((_, idx) => (
          <motion.button
            key={idx}
            onClick={() => goToImage(idx)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className={`h-2 rounded-full transition-all duration-500 ${
              idx === currentImageIndex 
                ? 'w-10 bg-gradient-to-r from-indigo-500 to-blue-500 shadow-md shadow-indigo-500/50' 
                : 'w-2 bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Floating info card */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ 
          y: 0, 
          opacity: 1,
          height: isInfoExpanded ? 'auto' : 'auto'
        }}
        transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
        className={`absolute ${isInfoExpanded ? 'bottom-4 sm:bottom-8' : 'bottom-4 sm:bottom-8'} left-1/2 transform -translate-x-1/2 z-20 w-full max-w-3xl px-4`}
      >
        <motion.div 
          className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-indigo-100 dark:border-indigo-900"
          whileHover={{ boxShadow: "0 25px 50px -12px rgba(79, 70, 229, 0.25)" }}
          layout
        >
          <div className="p-4 sm:p-6">
            {/* Title and expand button */}
            <div className="flex justify-between items-start mb-2">
              <motion.h1 
                className="text-2xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                {title}
              </motion.h1>
              <motion.button
                onClick={() => setIsInfoExpanded(!isInfoExpanded)}
                whileHover={{ scale: 1.1, rotate: isInfoExpanded ? 0 : 180 }}
                whileTap={{ scale: 0.9 }}
                className="bg-indigo-100 dark:bg-indigo-800 text-indigo-600 dark:text-indigo-200 p-2 rounded-full"
              >
                <BsInfoCircleFill className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Location */}
            <motion.div 
              className="flex items-center text-indigo-600 dark:text-indigo-300 mb-3"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <IoLocationOutline className="mr-1 text-xl" />
              <p className="text-lg">{location}</p>
            </motion.div>

            {/* Info cards */}
            <motion.div 
              className="flex flex-wrap gap-3 mt-4"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.9
                  }
                }
              }}
              initial="hidden"
              animate="show"
            >
              <motion.div 
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  show: { y: 0, opacity: 1 }
                }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 15px -3px rgba(79, 70, 229, 0.1), 0 4px 6px -2px rgba(79, 70, 229, 0.05)"
                }}
                className="flex items-center bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/40 dark:to-blue-900/40 text-indigo-700 dark:text-indigo-300 px-4 py-2 rounded-xl shadow-sm border border-indigo-100 dark:border-indigo-800"
              >
                <FaCalendarAlt className="mr-2 text-indigo-500 dark:text-indigo-400" />
                <span>{auctionDate}</span>
              </motion.div>
              
              <motion.div 
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  show: { y: 0, opacity: 1 }
                }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 15px -3px rgba(79, 70, 229, 0.1), 0 4px 6px -2px rgba(79, 70, 229, 0.05)"
                }}
                className="flex items-center bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/40 dark:to-blue-900/40 text-indigo-700 dark:text-indigo-300 px-4 py-2 rounded-xl shadow-sm border border-indigo-100 dark:border-indigo-800"
              >
                <FaClock className="mr-2 text-indigo-500 dark:text-indigo-400" />
                <span>{auctionTime}</span>
              </motion.div>
              
              <motion.div 
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  show: { y: 0, opacity: 1 }
                }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 15px -3px rgba(22, 163, 74, 0.1), 0 4px 6px -2px rgba(22, 163, 74, 0.05)"
                }}
                className="flex items-center bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/40 dark:to-emerald-900/40 text-green-700 dark:text-green-300 px-4 py-2 rounded-xl shadow-sm border border-green-100 dark:border-green-800"
              >
                <FaTag className="mr-2 text-green-500 dark:text-green-400" />
                <span>{t('startingBid')}: <span className="font-semibold">{startingBid}</span></span>
              </motion.div>
            </motion.div>

            {/* Expanded content */}
            <AnimatePresence>
              {isInfoExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 pt-4 border-t border-indigo-100 dark:border-indigo-800"
                >
                  <p className="text-gray-600 dark:text-gray-300">
                    {t('auctionDesc')}
                  </p>
                  <div className="mt-4 flex justify-end">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-6 py-2 rounded-lg shadow-md shadow-indigo-500/20"
                    >
                      {t('registerInterest')}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>

      {/* Mobile swipe indicator - only visible on small screens */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 text-white text-center sm:hidden"
      >
        <div className="flex items-center space-x-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
          <FaChevronLeft className="w-4 h-4" />
          <span className="text-sm">{t('swipe')}</span>
          <FaChevronRight className="w-4 h-4" />
        </div>
      </motion.div>
    </div>
  );
}