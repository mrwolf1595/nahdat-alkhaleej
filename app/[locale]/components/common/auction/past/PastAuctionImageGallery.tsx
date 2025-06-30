'use client';


import Image from 'next/image';
import { motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { FaImages, FaChevronLeft, FaChevronRight, FaRegCircle, FaCircle } from 'react-icons/fa';

interface Props {
  title: string;
  images: string[];
}

export default function PastAuctionImageGallery({  images }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const mainImage = images?.[activeIndex] || images?.[0];


  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };


  // Auto-slide effect
  useEffect(() => {
    if (images.length <= 1) return;
    
    const interval = setInterval(() => {
      handleNext();
    }, 6000); // Change slide every 6 seconds - slightly longer for better UX
    
    return () => clearInterval(interval);
  }, [handleNext, images.length]);

  // Enhanced animation variants
  const imageVariants = {
    hidden: { opacity: 0, scale: 1.05 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    },
    exit: { opacity: 0, scale: 0.98 }
  };

  return (
    <section className="relative w-full">
      <motion.div 
        className="relative w-full h-[450px] md:h-[550px] lg:h-[680px] overflow-hidden"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9 }}
      >
        <motion.div
          key={activeIndex}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={imageVariants}
          className="absolute inset-0 rounded-b-3xl"
        >
          <Image
            src={mainImage}
            alt="Featured auction image"
            fill
            className="object-contain"
            priority
          />
        </motion.div>
        
        {/* Navigation buttons with improved styling */}
        {images.length > 1 && (
          <>
            <button 
              onClick={handlePrev}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-30 bg-black/15 hover:bg-indigo-600/80 text-white w-16 h-16 rounded-xl flex items-center justify-center backdrop-blur-sm transition-all duration-300 border border-white/20 shadow-lg"
              aria-label="Previous image"
            >
              <FaChevronLeft className="text-xl" />
            </button>
            <button 
              onClick={handleNext}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-30 bg-black/15 hover:bg-indigo-600/80 text-white w-16 h-16 rounded-xl flex items-center justify-center backdrop-blur-sm transition-all duration-300 border border-white/20 shadow-lg"
              aria-label="Next image"
            >
              <FaChevronRight className="text-xl" />
            </button>
            
            {/* Adding dot indicators for better navigation */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 bg-black/20 backdrop-blur-sm py-2 px-4 rounded-full">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className="focus:outline-none"
                  aria-label={`Go to slide ${idx + 1}`}
                >
                  {idx === activeIndex ? (
                    <FaCircle className="text-white text-sm" />
                  ) : (
                    <FaRegCircle className="text-white/80 text-sm hover:text-white transition-colors duration-200" />
                  )}
                </button>
              ))}
            </div>
          </>
        )}
        
        {/* Enhanced image counter */}
        <div className="absolute bottom-10 right-8 z-30 bg-black/25 text-white px-6 py-3 rounded-xl backdrop-blur-md text-sm flex items-center gap-3 border border-white/10 shadow-lg">
          <FaImages className="text-indigo-200" />
          <span className="font-medium">{activeIndex + 1} / {images.length}</span>
        </div>
      </motion.div>


    </section>
  );
}