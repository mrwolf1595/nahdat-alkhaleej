'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight, FaExpand, FaCompress } from 'react-icons/fa';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

interface PropertyImageSliderProps {
  images: string[];
}

export default function PropertyImageSlider({ images }: PropertyImageSliderProps) {
  const t = useTranslations('property.details.images');
  const { locale } = useParams() as { locale: string };
  const isRTL = locale === 'ar';
  
  const [current, setCurrent] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovering) {
        setCurrent((prev) => (prev + 1) % images.length);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length, isHovering]);

  const goNext = () => setCurrent((prev) => (prev + 1) % images.length);
  const goPrev = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);
  const goTo = (index: number) => setCurrent(index);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      sliderRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    
    // If the swipe is significant enough (more than 50px)
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swipe left, go next
        if (isRTL) {
          goPrev();
        } else {
          goNext();
        }
      } else {
        // Swipe right, go previous
        if (isRTL) {
          goNext();
        } else {
          goPrev();
        }
      }
    }
  };

  // Adjust button positions for RTL layout
  const prevButton = isRTL ? (
    <motion.button
      initial={{ opacity: 0, x: 10 }}
      animate={{ 
        opacity: isHovering ? 0.9 : 0, 
        x: isHovering ? 0 : 10 
      }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.1, opacity: 1 }}
      className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-gradient-to-l from-indigo-600/80 to-blue-600/80 backdrop-blur-sm text-white p-3 rounded-full shadow-lg hidden sm:flex items-center justify-center"
      onClick={goPrev}
    >
      <FaChevronRight className="w-5 h-5" />
    </motion.button>
  ) : (
    <motion.button
      initial={{ opacity: 0, x: -10 }}
      animate={{ 
        opacity: isHovering ? 0.9 : 0, 
        x: isHovering ? 0 : -10 
      }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.1, opacity: 1 }}
      className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-gradient-to-r from-indigo-600/80 to-blue-600/80 backdrop-blur-sm text-white p-3 rounded-full shadow-lg hidden sm:flex items-center justify-center"
      onClick={goPrev}
    >
      <FaChevronLeft className="w-5 h-5" />
    </motion.button>
  );

  const nextButton = isRTL ? (
    <motion.button
      initial={{ opacity: 0, x: -10 }}
      animate={{ 
        opacity: isHovering ? 0.9 : 0, 
        x: isHovering ? 0 : -10 
      }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.1, opacity: 1 }}
      className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-gradient-to-r from-indigo-600/80 to-blue-600/80 backdrop-blur-sm text-white p-3 rounded-full shadow-lg hidden sm:flex items-center justify-center"
      onClick={goNext}
    >
      <FaChevronLeft className="w-5 h-5" />
    </motion.button>
  ) : (
    <motion.button
      initial={{ opacity: 0, x: 10 }}
      animate={{ 
        opacity: isHovering ? 0.9 : 0, 
        x: isHovering ? 0 : 10 
      }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.1, opacity: 1 }}
      className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-gradient-to-l from-indigo-600/80 to-blue-600/80 backdrop-blur-sm text-white p-3 rounded-full shadow-lg hidden sm:flex items-center justify-center"
      onClick={goNext}
    >
      <FaChevronRight className="w-5 h-5" />
    </motion.button>
  );

  return (
    <section 
      ref={sliderRef}
      className="relative h-[50vh] sm:h-[65vh] overflow-hidden rounded-2xl shadow-2xl"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Prev Button */}
      {prevButton}

      {/* Next Button */}
      {nextButton}

      {/* Fullscreen Toggle Button */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ 
          opacity: isHovering ? 0.9 : 0, 
          y: isHovering ? 0 : 10 
        }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.1, opacity: 1 }}
        className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} z-20 bg-black/50 backdrop-blur-sm text-white p-2 rounded-full shadow-lg`}
        onClick={toggleFullscreen}
      >
        {isFullscreen ? <FaCompress className="w-4 h-4" /> : <FaExpand className="w-4 h-4" />}
      </motion.button>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10" />

      {/* Image Counter */}
      <div className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'} z-20 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium`}>
        {isRTL ? `${images.length} / ${current + 1}` : `${current + 1} / ${images.length}`}
      </div>

      {/* Main Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full z-0"
        >
          <Image
            src={images[current]}
            alt={`Property image ${current + 1}`}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 80vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* Mobile swipe indicator - only visible on small screens */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 text-white text-center sm:hidden"
      >
        <div className="flex items-center space-x-2 rtl:space-x-reverse bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
          {isRTL ? <FaChevronRight className="w-4 h-4" /> : <FaChevronLeft className="w-4 h-4" />}
          <span className="text-sm mx-2">{t('swipe')}</span>
          {isRTL ? <FaChevronLeft className="w-4 h-4" /> : <FaChevronRight className="w-4 h-4" />}
        </div>
      </motion.div>

      {/* Indicators */}
      <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center gap-2 px-4">
        {images.map((_, idx) => (
          <motion.button
            key={idx}
            onClick={() => goTo(idx)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className={`h-2 rounded-full transition-all duration-500 ${
              idx === current 
                ? 'w-10 bg-gradient-to-r from-indigo-500 to-blue-500 shadow-md shadow-indigo-500/50' 
                : 'w-2 bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </section>
  );
}