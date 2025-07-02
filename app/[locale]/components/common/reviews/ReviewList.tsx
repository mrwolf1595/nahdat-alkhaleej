'use client';

import { useCallback, useEffect, useState } from 'react';
import { Star, Calendar, MessageSquare, Loader2, UserCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

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
        <span className="ml-2 text-zinc-600 dark:text-gray-400">{sectionsT('loadingReviews')}</span>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg border border-red-200 dark:border-red-800"
      >
        <p>{t('failedToLoad')} {error}</p>
        <button 
          onClick={fetchReviews}
          className="mt-2 text-sm underline hover:text-red-700 dark:hover:text-red-300 transition-colors"
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
        className="p-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800/50 text-center"
      >
        <MessageSquare className="w-12 h-12 mx-auto text-zinc-400 dark:text-gray-500 mb-3" />
        <h3 className="text-lg font-medium text-zinc-700 dark:text-gray-300 mb-1">{sectionsT('noReviews')}</h3>
        <p className="text-sm text-zinc-500 dark:text-gray-400">{sectionsT('noReviewsMessage')}</p>
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
        className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-200 dark:border-blue-800 shadow-sm"
      >
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-white dark:bg-gray-800 p-4 shadow-md border border-zinc-200 dark:border-gray-700">
            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
              {averageRating}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-zinc-800 dark:text-gray-200 mb-1">{t('averageRating')}</h3>
            <div className="flex items-center">
              {Array(5).fill(null).map((_, i) => {
                const fill = Math.min(Math.max(Number(averageRating) - i, 0), 1);
                return (
                  <div key={i} className="relative w-5 h-5">
                    <Star 
                      size={20}
                      className="text-zinc-200 dark:text-gray-600 absolute top-0 left-0"
                    />
                    {fill > 0 && (
                      <div style={{ width: `${fill * 100}%` }} className="overflow-hidden absolute top-0 left-0 h-full">
                        <Star 
                          size={20}
                          fill="#F59E0B"
                          className="text-amber-500"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
              <span className="ml-2 text-sm text-zinc-600 dark:text-gray-400">
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
        {sortedReviews.map((review) => (
          <motion.div 
            key={review._id}
            variants={item}
            className="p-5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-200"
          >
           <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-blue-900/50 dark:to-indigo-900/50 flex items-center justify-center border border-indigo-200 dark:border-blue-800">
                  <UserCircle2 className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    {Array(5).fill(null).map((_, i) => (
                      <Star 
                        key={i}
                        size={16}
                        fill={i < review.rating ? '#FBBF24' : 'transparent'}
                        stroke={i < review.rating ? '#FBBF24' : '#D1D5DB'}
                        strokeWidth={1.5}
                        className={i < review.rating ? 'text-amber-500' : 'text-zinc-300 dark:text-gray-500'}
                      />
                    ))}
                  </div>
                  <p className="text-xs flex items-center gap-1 text-gray-500 dark:text-gray-400">
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
                  className="mt-4 pl-13"
                >
                  <div className="relative">
                    <div className="absolute top-0 bottom-0 left-0 w-1 bg-indigo-100 dark:bg-indigo-900/50 rounded-full" />
                    <p className="pl-4 text-sm text-zinc-700 dark:text-gray-300 leading-relaxed">{review.comment}</p>
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