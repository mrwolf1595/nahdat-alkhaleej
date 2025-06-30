'use client';
import { motion } from 'framer-motion';
import { Map, Grid } from 'lucide-react';
import { Offer } from '@/types/offer';
import ImageSlider from './ImageSlider';

interface PropertyViewProps {
  offer: Offer;
  viewMode: string;
  setViewMode: (mode: string) => void;
  onImageClick: () => void;
  onSlideChange: (index: number) => void;
}

const PropertyView = ({ offer, viewMode, setViewMode, onImageClick, onSlideChange }: PropertyViewProps) => {
  return (
    <div className="relative">
      <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10 flex space-x-1 sm:space-x-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setViewMode('gallery')}
          className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full flex items-center ${
            viewMode === 'gallery'
              ? 'bg-blue-500 text-white'
              : 'bg-white/80 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300'
          } backdrop-blur-md transition-colors`}
        >
          <Grid size={12} className="mr-1 sm:hidden" />
          <Grid size={14} className="mr-1 hidden sm:block" />
          <span className="text-[10px] sm:text-xs">Gallery</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setViewMode('map')}
          className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full flex items-center ${
            viewMode === 'map'
              ? 'bg-blue-500 text-white'
              : 'bg-white/80 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300'
          } backdrop-blur-md transition-colors`}
        >
          <Map size={12} className="mr-1 sm:hidden" />
          <Map size={14} className="mr-1 hidden sm:block" />
          <span className="text-[10px] sm:text-xs">Map</span>
        </motion.button>
      </div>

      {viewMode === 'gallery' ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="w-full"
        >
          <ImageSlider
            images={offer.gallery || []}
            onImageClick={onImageClick}
            onSlideChange={onSlideChange}
          />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="w-full h-[40vh] sm:h-[50vh] bg-gray-200 dark:bg-zinc-800 flex items-center justify-center"
        >
          <div className="text-center px-4">
            <Map size={24} className="mx-auto mb-2 text-blue-500 opacity-50 sm:hidden" />
            <Map size={32} className="mx-auto mb-2 text-blue-500 opacity-50 hidden sm:block" />
            <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400">Interactive map would be displayed here</p>
            <p className="text-xs sm:text-sm text-zinc-400 dark:text-zinc-500">{offer.location}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default PropertyView;