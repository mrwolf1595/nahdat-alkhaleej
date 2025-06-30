'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageSliderProps {
  images: string[];
  onImageClick: () => void;
  onSlideChange: (index: number) => void;
}

const ImageSlider = ({ images, onImageClick, onSlideChange }: ImageSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Auto-rotate slides
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000);
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [images.length]);
  
  // Reset timer on manual navigation
  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000);
  };
  
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    resetTimer();
  };
  
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    resetTimer();
  };
  
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    resetTimer();
  };
  
  // Notify parent component when slide changes
  useEffect(() => {
    onSlideChange(currentIndex);
  }, [currentIndex, onSlideChange]);
  
  return (
    <div 
      ref={sliderRef} 
      className="relative h-[40vh] sm:h-[50vh] md:h-[65vh] overflow-hidden bg-gray-100 dark:bg-zinc-800 w-full"
      // Added explicit width control
    >
      {/* Main slide */}
      <motion.div 
        key={currentIndex}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full h-full cursor-pointer"
        onClick={onImageClick}
      >
        <div className="relative w-full h-full">
          <Image
            src={images[currentIndex]}
            alt={`Property image ${currentIndex + 1}`}
            className="w-full h-full object-cover"
            fill
            priority
          />
          {/* Gradient overlay for better text visibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20" />
        </div>
      </motion.div>
      
      {/* Navigation arrows - Made slightly larger for better tap targets */}
      <div className="absolute inset-0 flex items-center justify-between px-2 sm:px-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            goToPrevious();
          }}
          className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white/80 dark:bg-zinc-800/80 flex items-center justify-center text-zinc-700 dark:text-zinc-200 shadow-md backdrop-blur-sm z-10"
          // Added z-10 to ensure buttons are clickable
          aria-label="Previous image"
        >
          <ChevronLeft size={18} className="sm:hidden" />
          <ChevronLeft size={24} className="hidden sm:block" />
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            goToNext();
          }}
          className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white/80 dark:bg-zinc-800/80 flex items-center justify-center text-zinc-700 dark:text-zinc-200 shadow-md backdrop-blur-sm z-10"
          // Added z-10 to ensure buttons are clickable
          aria-label="Next image"
        >
          <ChevronRight size={18} className="sm:hidden" />
          <ChevronRight size={24} className="hidden sm:block" />
        </motion.button>
      </div>
      
      {/* Slide indicators - Made easier to tap */}
      <div className="absolute bottom-3 sm:bottom-4 left-0 right-0 flex justify-center gap-2 sm:gap-2 z-10">
        {/* Added z-10 to ensure indicators are clickable */}
        {images.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              goToSlide(index);
            }}
            className={`w-2 h-2 sm:w-2 sm:h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
              currentIndex === index 
                ? 'bg-white scale-110' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Slide counter */}
      <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-black/50 text-white text-xs md:text-sm px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md backdrop-blur-sm">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};

export default ImageSlider;
