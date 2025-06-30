'use client';

import { useEffect, useState } from 'react';
import { Star, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Props = {
  targetId: string;
};

export default function RatingSummary({ targetId }: Props) {
  const [average, setAverage] = useState<number | null>(null);
  const [count, setCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/public/reviews?targetId=${targetId}`);
        const reviews = await res.json();

        console.log('✅ Reviews:', reviews); // راقب الكونسول

        if (Array.isArray(reviews) && reviews.length > 0) {
          const total = reviews.reduce((sum, r) => sum + r.rating, 0);
          const avg = total / reviews.length;
          setAverage(avg);
          setCount(reviews.length);
        } else {
          setAverage(0);
          setCount(0);
        }
      } catch (err) {
        console.error('❌ Failed to load reviews:', err);
        setAverage(0);
        setCount(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [targetId]);

  if (isLoading) {
    return (
      <div className="flex items-center gap-1 text-sm text-zinc-400 animate-pulse">
        <Loader2 size={14} className="animate-spin opacity-70" />
        <span className="text-xs">Loading ratings...</span>
      </div>
    );
  }

  if (average === null) return null;

  // For hover animations
  const starVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.2, rotate: [0, 15, 0, -15, 0], transition: { duration: 0.3 } },
  };

  // Format average to one decimal place when needed
  const formattedAverage = average % 1 === 0 ? average : average.toFixed(1);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center gap-1"
    >
      <div className="flex">
        {[1, 2, 3, 4, 5].map((i) => {
          // Calculate partial fill for each star
          const fill = Math.min(Math.max(average - (i - 1), 0), 1);
          return (
            <motion.div 
              key={i} 
              className="relative w-5 h-5 inline-flex items-center justify-center"
              variants={starVariants}
              initial="initial"
              whileHover="hover"
            >
              {/* Background star (empty) */}
              <Star 
                size={18} 
                className="absolute text-zinc-300 dark:text-zinc-700" 
                strokeWidth={1.5} 
              />
              
              {/* Foreground star (filled partially or fully) */}
              {fill > 0 && (
                <div style={{ width: `${fill * 100}%` }} className="overflow-hidden absolute h-full">
                  <Star 
                    size={18} 
                    fill="#FBBF24" 
                    stroke="#FBBF24" 
                    className="text-yellow-400" 
                    strokeWidth={1.5} 
                  />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
      
      <AnimatePresence>
        <motion.div 
          key={`${formattedAverage}-${count}`}
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-1"
        >
          <span className="ml-1 font-medium text-sm text-zinc-700 dark:text-zinc-300">{formattedAverage}</span>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">({count})</span>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}