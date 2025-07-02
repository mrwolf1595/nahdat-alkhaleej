'use client';

import { useCallback, useEffect, useState } from 'react';
import { Star, Calendar, MessageSquare, Loader2, UserCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import useTheme from '../../../context/ThemeContext';

type Props = {
  targetId: string;
};

type Review = {
  _id: string;
  rating: number;
  comment?: string;
  createdAt: string;
};

export default function ReviewList({ targetId }: Props) {
  const { theme } = useTheme();
  const t = useTranslations('auctionId.reviews.list');
  const sectionsT = useTranslations('auctionId.detail.sections');
  const commonT = useTranslations('auctionId');
  
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const res = await fetch(`/api/public/reviews?targetId=${targetId}`);
      if (!res.ok) {
        throw new Error('Failed to fetch reviews');
      }
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, [targetId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  // Calculate average rating
  const averageRating = reviews.length 
    ? (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1)
    : 0;

  // Sort reviews by date (newest first)
  const sortedReviews = [...reviews].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  // Animations
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-6 h-6 text-indigo-500 animate-spin" />
        <span className={`ml-2 ${
          theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
        }`}>
          {sectionsT('loadingReviews')}
        </span>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`p-4 rounded-lg ${
          theme === 'dark' 
            ? 'bg-red-900/20 text-red-400' 
            : 'bg-red-50 text-red-600'
        }`}
      >
        <p>{t('failedToLoad')} {error}</p>
        <button 
          onClick={fetchReviews}
          className={`mt-2 text-sm underline ${
            theme === 'dark' 
              ? 'hover:text-red-300' 
              : 'hover:text-red-700'
          }`}
        >
          {commonT('tryAgain')}
        </button>
      </motion.div>
    );
  }

  // Empty state
  if (!reviews.length) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`p-6 border border-dashed rounded-xl text-center transition-colors duration-300 ${
          theme === 'dark'
            ? 'border-zinc-700 bg-zinc-800/50'
            : 'border-zinc-300 bg-zinc-50'
        }`}
      >
        <MessageSquare className={`w-10 h-10 mx-auto mb-2 ${
          theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'
        }`} />
        <h3 className={`text-lg font-medium ${
          theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'
        }`}>
          {sectionsT('noReviews')}
        </h3>
        <p className={`text-sm mt-1 ${
          theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'
        }`}>
          {sectionsT('noReviewsMessage')}
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Average rating card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`p-5 rounded-xl border shadow-sm transition-colors duration-300 ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-indigo-950/40 to-purple-950/40 border-indigo-900/50'
            : 'bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-100'
        }`}
      >
        <div className="flex items-center gap-4">
          <div className={`rounded-full p-3 shadow-md ${
            theme === 'dark' ? 'bg-zinc-800' : 'bg-white'
          }`}>
            <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              {averageRating}
            </div>
          </div>
          <div>
            <h3 className={`font-medium ${
              theme === 'dark' ? 'text-zinc-200' : 'text-zinc-800'
            }`}>
              {t('averageRating')}
            </h3>
            <div className="flex items-center mt-1">
              {Array(5).fill(null).map((_, i) => {
                // Calculate partial fill for the last star
                const fill = Math.min(Math.max(Number(averageRating) - i, 0), 1);
                return (
                  <div key={i} className="relative w-5 h-5">
                    <Star 
                      size={20}
                      className={theme === 'dark' ? 'text-zinc-700' : 'text-zinc-300'}
                    />
                    {fill > 0 && (
                      <div style={{ width: `${fill * 100}%` }} className="overflow-hidden absolute top-0 left-0 h-full">
                        <Star 
                          size={20}
                          fill="#FBBF24"
                          className="text-yellow-400"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
              <span className={`ml-2 text-sm ${
                theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
              }`}>
                ({reviews.length} {reviews.length === 1 ? t('review') : t('reviews')})
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Review list */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-4"
      >
        {sortedReviews.map((review, index) => (
          <motion.div 
            key={review._id}
            variants={item}
            className={`p-5 border rounded-xl backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-200 ${
              theme === 'dark'
                ? 'border-zinc-700 bg-zinc-800/80'
                : 'border-zinc-200 bg-white'
            }`}
            style={{ 
              transitionDelay: `${index * 50}ms`,
            }}
          >
           <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  theme === 'dark'
                    ? 'bg-gradient-to-br from-indigo-900 to-purple-900'
                    : 'bg-gradient-to-br from-indigo-100 to-purple-100'
                }`}>
                  <UserCircle2 className={`w-6 h-6 ${
                    theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'
                  }`} />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {Array(5).fill(null).map((_, i) => (
                      <Star 
                        key={i}
                        size={16}
                        fill={i < review.rating ? '#FBBF24' : 'transparent'}
                        stroke={i < review.rating ? '#FBBF24' : theme === 'dark' ? '#4B5563' : '#94A3B8'}
                        strokeWidth={1.5}
                        className={i < review.rating ? 'text-yellow-400' : theme === 'dark' ? 'text-zinc-600' : 'text-zinc-300'}
                      />
                    ))}
                  </div>
                  <p className={`text-xs flex items-center gap-1 mt-1 ${
                    theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'
                  }`}>
                    <Calendar size={12} />
                    <span>{new Date(review.createdAt).toLocaleDateString(undefined, { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}</span>
                  </p>
                </div>
              </div>
            </div>
            
            <AnimatePresence>
              {review.comment && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-3 pl-11"
                >
                  <div className="relative">
                    <div className={`absolute top-0 bottom-0 left-0 w-1 rounded-full ${
                      theme === 'dark' ? 'bg-indigo-900/50' : 'bg-indigo-100'
                    }`} />
                    <p className={`pl-4 text-sm leading-relaxed ${
                      theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'
                    }`}>
                      {review.comment}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}