'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaTimes as CloseIcon, FaChevronLeft as PrevIcon, FaChevronRight as NextIcon } from 'react-icons/fa';

interface FullscreenGalleryProps {
  images: string[];
  activeIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const FullscreenGallery = ({
  images,
  activeIndex,
  isOpen,
  onClose,
  onPrev,
  onNext,
}: FullscreenGalleryProps) => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, onNext, onPrev]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-auto"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition-colors"
        aria-label="Close gallery"
      >
        <CloseIcon size={24} />
      </button>

      <button
        onClick={onPrev}
        className="absolute left-4 z-40 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition-colors"
        aria-label="Previous image"
      >
        <PrevIcon size={24} />
      </button>

      <button
        onClick={onNext}
        className="absolute right-4 z-40 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition-colors"
        aria-label="Next image"
      >
        <NextIcon size={24} />
      </button>

      <div className="w-full h-full flex items-center justify-center p-4 bg-black overflow-auto">
        <div className="relative w-auto h-auto flex items-center justify-center">
          <Image
            src={images[activeIndex] || '/images/placeholder-property.jpg'}
            alt={`Gallery image ${activeIndex + 1}`}
            fill
            style={{ objectFit: 'contain' }}
            className="max-w-none max-h-none"
            onLoadingComplete={() => setLoading(false)}
            sizes="100vw"
            priority
          />
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
        <div className="flex space-x-2 overflow-x-auto p-2 bg-black/40 rounded-lg max-w-full">
          {images.map((image, index) => (
            <div
              key={index}
              className={`w-16 h-16 relative flex-shrink-0 rounded-md overflow-hidden border-2 cursor-pointer ${
                index === activeIndex
                  ? 'border-blue-500'
                  : 'border-transparent'
              }`}
              onClick={() => {
                // Direct index setting by using the existing onNext/onPrev functions
                const steps = index - activeIndex;
                if (steps > 0) {
                  for (let i = 0; i < steps; i++) onNext();
                } else if (steps < 0) {
                  for (let i = 0; i < Math.abs(steps); i++) onPrev();
                }
              }}
            >
              <Image
                src={image || '/images/placeholder-property.jpg'}
                alt={`Thumbnail ${index + 1}`}
                fill
                style={{ objectFit: 'cover' }}
                sizes="64px"
              />
              {index === activeIndex && (
                <div className="absolute inset-0 bg-blue-500/20" />
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};



export default FullscreenGallery;