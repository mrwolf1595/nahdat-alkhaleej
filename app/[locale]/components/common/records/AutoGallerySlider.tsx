'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon } from 'lucide-react';

interface AutoGallerySliderProps {
  images: string[];
  propertyName: string;
}

export default function AutoGallerySlider({ images, propertyName }: AutoGallerySliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto rotate images
  useEffect(() => {
    if (images.length <= 1) return;
    
    const startTimer = () => {
      timerRef.current = setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000); // Change slide every 5 seconds
    };
    
    startTimer();
    
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [currentIndex, images.length]);

  const goToSlide = (index: number) => {
    // Reset the timer when manually changing slides
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  };

  const goToNext = () => {
    const newIndex = (currentIndex + 1) % images.length;
    goToSlide(newIndex);
  };

  if (images.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-b-3xl">
      {/* Main image */}
      <div className="w-full h-full relative">
        <Image
          src={images[currentIndex]}
          alt={`${propertyName} - Image ${currentIndex + 1}`}
          fill
          priority
          sizes="100vw"
          className="object-cover transition-opacity duration-500"
        />
        {/* Overlay gradient for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40" />
      </div>

      {/* Navigation arrows */}
      {images.length > 1 && (
        <>
          <button 
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 backdrop-blur-sm transition-all duration-300 z-10"
            aria-label="Previous image"
          >
            <ChevronLeftIcon size={24} />
          </button>
          <button 
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 backdrop-blur-sm transition-all duration-300 z-10"
            aria-label="Next image"
          >
            <ChevronRightIcon size={24} />
          </button>
        </>
      )}

      {/* Image counter */}
      <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm z-10">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Indicator dots */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-white w-6' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}