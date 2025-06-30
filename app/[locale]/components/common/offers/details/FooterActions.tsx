'use client';
import { motion } from 'framer-motion';
import { Heart, Phone } from 'lucide-react';
import { Offer } from '@/types/offer';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import RiyalIcon from '../../../common/Riyal Icon';

interface FloatingActionsProps {
  favorited: boolean;
  onFavoriteToggle?: () => void;
}

export const FloatingActions = ({ onFavoriteToggle, favorited }: FloatingActionsProps) => {
  const t = useTranslations('auctionId.footerActions');
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLikeClick = () => {
    if (favorited) {
      setMessage(t('alreadyLiked'));
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
      return;
    }
    
    if (onFavoriteToggle) {
      onFavoriteToggle();
    }
    
    setMessage(t('thankYouLike'));
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6 }}
      className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 flex flex-col space-y-2 sm:space-y-3 z-40 xs:hidden sm:flex"
    >
      <motion.button
        whileHover={{ scale: favorited ? 1 : 1.1 }}
        whileTap={{ scale: favorited ? 1 : 0.9 }}
        onClick={handleLikeClick}
        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${
          favorited 
            ? 'bg-red-50 dark:bg-red-900/30 text-red-500' 
            : 'bg-white dark:bg-zinc-800 text-zinc-500'
        } shadow-lg flex items-center justify-center border border-gray-200 dark:border-zinc-700`}
        aria-label={favorited ? "Already favorited" : "Add to favorites"}
      >
        <Heart 
          size={isMobile ? 16 : 20} className={`${favorited ? 'fill-red-500' : ''}`}
        />
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white dark:bg-zinc-800 shadow-lg flex items-center justify-center text-blue-500 border border-gray-200 dark:border-zinc-700"
        aria-label="Share property"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width={isMobile ? "18" : "22"} height={isMobile ? "18" : "22"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="5" r="3"></circle>
          <circle cx="6" cy="12" r="3"></circle>
          <circle cx="18" cy="19" r="3"></circle>
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
        </svg>
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg flex items-center justify-center text-white"
        aria-label="Contact agent"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width={isMobile ? "20" : "24"} height={isMobile ? "20" : "24"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
      </motion.button>
      
      {showMessage && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className={`absolute right-full top-0 transform -translate-y-1/2 mr-3 px-4 py-2 rounded-lg text-white text-sm ${
            message === t('thankYouLike') ? 'bg-green-500' : 'bg-amber-500'
          } shadow-lg z-50 whitespace-nowrap max-w-xs sm:max-w-none`}
        >
          {message}
        </motion.div>
      )}
    </motion.div>
  );
};

interface MobileBottomBarProps {
  offer: Offer;
  favorited: boolean;
  setFavorited: (value: boolean) => void;
  onLike?: () => void;
}

export const MobileBottomBar = ({ offer, favorited, setFavorited, onLike }: MobileBottomBarProps) => {
  const t = useTranslations('auctionId.footerActions');
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');

  const handleLikeClick = () => {
    if (favorited) {
      setMessage(t('alreadyLiked'));
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
      return;
    }
    
    if (onLike) {
      onLike();
    } else {
      setFavorited(true);
    }
    
    setMessage(t('thankYouLike'));
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.6 }}
      className="block md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800 px-3 sm:px-4 py-2 sm:py-3 z-30"
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1" dir="rtl">
            <span>{offer.price.toLocaleString('ar-SA')}</span>
            <RiyalIcon size={20} />
          </div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1" dir="rtl">
            <span>{Math.round(Number(offer.price) / Number(offer.area)).toLocaleString('ar-SA')}</span>
            <RiyalIcon size={12} />
            <span className="ml-1">{t('perSqft')}</span>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: favorited ? 1 : 1.05 }}
            whileTap={{ scale: favorited ? 1 : 0.95 }}
            onClick={handleLikeClick}
            className={`flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full transition-colors ${
              favorited 
                ? 'bg-red-50 dark:bg-red-900/30 text-red-500' 
                : 'bg-gray-100 dark:bg-zinc-800 text-zinc-500'
            }`}
          >
            <Heart 
              size={18} className={favorited ? 'fill-red-500' : ''}
            />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center px-4 sm:px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transition-colors shadow-sm text-sm sm:text-base"
          >
            <Phone size={16} className="mr-2" />
            <span>{t('contact')}</span>
          </motion.button>
        </div>
      </div>
      
      {showMessage && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-4 py-2 rounded-lg text-white text-xs sm:text-sm ${
            message === t('thankYouLike') ? 'bg-green-500' : 'bg-amber-500'
          } shadow-lg z-50 max-w-xs text-center`}
        >
          {message}
        </motion.div>
      )}
    </motion.div>
  );
}