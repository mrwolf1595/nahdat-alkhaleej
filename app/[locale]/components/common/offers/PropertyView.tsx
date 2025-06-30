'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaThList as ListIcon, FaTh as GridIcon } from 'react-icons/fa';
import { useTranslations } from 'next-intl';
import { Offer } from '@/types/offer';

interface PropertyViewProps {
  offer: Offer;
  viewMode: string;
  setViewMode: (mode: string) => void;
  onImageClick: () => void;
  onSlideChange: (index: number) => void;
}

const PropertyView = ({
  offer,
  viewMode,
  setViewMode,
  onImageClick,
  onSlideChange,
}: PropertyViewProps) => {
  const t = useTranslations('offerId');
  const images = [offer.mainImage, ...(offer.images || [])].filter(Boolean);
  const [, setActiveSlide] = useState(0);

  const handleSlideChange = (index: number) => {
    setActiveSlide(index);
    onSlideChange(index);
  };

  return (
    <div className="mt-4 mb-6">
      <div className="flex justify-end mb-2 px-4">
        <div className="flex items-center space-x-2 bg-white dark:bg-zinc-800 p-1 rounded-lg shadow-sm">
          <button
            onClick={() => setViewMode('gallery')}
            className={`p-2 rounded-md transition-colors ${
              viewMode === 'gallery'
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-700'
            }`}
            aria-label={t('viewModes.gallery')}
          >
            <GridIcon size={18} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md transition-colors ${
              viewMode === 'list'
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-700'
            }`}
            aria-label={t('viewModes.list')}
          >
            <ListIcon size={18} />
          </button>
        </div>
      </div>

      {viewMode === 'gallery' ? (
        <div className="grid grid-cols-12 gap-2 px-4">
          {/* Main large image */}
          <div 
            className="col-span-12 md:col-span-6 h-[300px] sm:h-[400px] md:h-[500px] rounded-lg overflow-hidden cursor-pointer relative"
            onClick={() => {
              handleSlideChange(0);
              onImageClick();
            }}
          >
            <div className="w-full h-full relative">
              <Image
                src={images[0] || '/images/placeholder-property.jpg'}
                alt={offer.title}
                fill
                style={{ objectFit: 'contain' }} // Changed to contain to show full image
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                className="transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none" />
            </div>
          </div>

          {/* Grid of smaller images */}
          <div className="col-span-12 md:col-span-6 grid grid-cols-2 gap-2 h-[300px] sm:h-[400px] md:h-[500px]">
            {images.slice(1, 5).map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-lg overflow-hidden cursor-pointer relative"
                onClick={() => {
                  handleSlideChange(index + 1);
                  onImageClick();
                }}
              >
                <div className="w-full h-full relative">
                  <Image
                    src={image || '/images/placeholder-property.jpg'}
                    alt={`${offer.title} - Image ${index + 2}`}
                    fill
                    style={{ objectFit: 'contain' }} // Changed to contain to show full image
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="transition-transform duration-500 hover:scale-105"
                  />
                  {index === 3 && images.length > 5 && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="text-white text-xl font-semibold">
                        +{images.length - 5} {t('gallery.more')}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <div className="px-4 space-y-2">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="rounded-lg overflow-hidden cursor-pointer"
              onClick={() => {
                handleSlideChange(index);
                onImageClick();
              }}
            >
              <div className="relative w-full h-[300px]">
                <Image
                  src={image || '/images/placeholder-property.jpg'}
                  alt={`${offer.title} - Image ${index + 1}`}
                  fill
                  style={{ objectFit: 'contain' }} // Changed to contain to show full image
                  sizes="100vw"
                  className="transition-transform duration-500 hover:scale-105"
                />
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyView;