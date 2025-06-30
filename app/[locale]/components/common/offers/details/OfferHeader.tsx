'use client';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Share2 } from 'lucide-react';
import { Offer } from '@/types/offer';

interface OfferHeaderProps {
  offer: Offer;
  isScrolled: boolean;
  favorited: boolean;
  setFavorited: (value: boolean) => void;
  onBackClick: () => void;
  onLike: () => void;
}

const OfferHeader = ({
  offer,
  isScrolled,
  favorited,
  onBackClick,
  onLike,
}: OfferHeaderProps) => {
  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`sticky top-0 z-50 backdrop-blur-md transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 dark:bg-zinc-900/90 shadow-md py-1.5 sm:py-2'
          : 'bg-white/70 dark:bg-zinc-950/70 py-2 sm:py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 flex justify-between items-center">
        {/* Back Button */}
        <button
          onClick={onBackClick}
          className="flex items-center text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <ArrowLeft size={16} className="sm:hidden mr-1" />
          <ArrowLeft size={18} className="hidden sm:inline mr-1" />
          <span className="hidden sm:inline">Back to listings</span>
          <span className="sm:hidden">Back</span>
        </button>

        {/* Title when scrolled */}
        {isScrolled && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-base sm:text-lg font-semibold text-zinc-800 dark:text-white truncate max-w-[150px] sm:max-w-xs"
          >
            {offer.title}
          </motion.div>
        )}

        {/* Like & Share buttons */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <motion.button
            whileHover={{ scale: favorited ? 1 : 1.05 }}
            whileTap={{ scale: favorited ? 1 : 0.95 }}
            onClick={() => {
              if (!favorited) onLike();
            }}
            disabled={favorited}
            className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full transition-colors ${
              favorited
                ? 'bg-red-50 dark:bg-red-900/30 text-red-500 cursor-not-allowed'
                : 'bg-gray-100 dark:bg-zinc-800 text-zinc-500 hover:text-red-500'
            }`}
            aria-label="Like this offer"
          >
            <Heart
              size={16}
              className={`sm:hidden ${favorited ? 'fill-red-500' : ''}`}
            />
            <Heart
              size={20}
              className={`hidden sm:block ${favorited ? 'fill-red-500' : ''}`}
            />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-100 dark:bg-zinc-800 text-zinc-500 hover:text-blue-500 transition-colors"
            aria-label="Share property"
          >
            <Share2 size={16} className="sm:hidden" />
            <Share2 size={20} className="hidden sm:block" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default OfferHeader;
