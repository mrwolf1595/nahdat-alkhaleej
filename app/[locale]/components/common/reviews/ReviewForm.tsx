'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { Star, Send, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

type Props = {
  targetId: string;
  targetType: 'offer' | 'auction';
  onReviewAdded?: () => void;
};

export default function ReviewForm({ targetId, targetType, onReviewAdded }: Props) {
  const t = useTranslations('auctionId.reviews.form');
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessConfetti, setShowSuccessConfetti] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!rating) {
      toast.error(t('ratingRequired'), {
        style: {
          borderRadius: '10px',
          background: '#1F2937',
          color: '#fff',
        },
        icon: '⚠️',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/public/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetId, targetType, rating, comment }),
      });

      if (res.ok) {
        setShowSuccessConfetti(true);
        toast.success(t('submitSuccess'), {
          style: {
            borderRadius: '10px',
            background: '#059669',
            color: '#fff',
          },
          icon: '🎉',
          duration: 4000,
        });
        
        setTimeout(() => {
          setRating(0);
          setComment('');
          setShowSuccessConfetti(false);
          onReviewAdded?.();
        }, 1000);
      } else {
        toast.error(t('submitError'), {
          style: {
            borderRadius: '10px',
            background: '#DC2626',
            color: '#fff',
          },
          icon: '❌',
        });
      }
    } catch {
      toast.error(t('generalError'), {
        style: {
          borderRadius: '10px',
          background: '#DC2626',
          color: '#fff',
        },
        icon: '❌',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Confetti animation component
  const Confetti = () => {
    return (
      <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50">
        {Array.from({ length: 30 }).map((_, index) => (
          <motion.div
            key={index}
            className="absolute w-2 h-2 rounded-full"
            initial={{ 
              top: '50%', 
              left: '50%',
              scale: 0
            }}
            animate={{ 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%`,
              scale: Math.random() * 1.5 + 0.5,
              opacity: 0
            }}
            transition={{ 
              duration: 1.2, 
              ease: 'easeOut',
              delay: Math.random() * 0.2
            }}
            style={{
              backgroundColor: ['#F59E0B', '#10B981', '#3B82F6', '#8B5CF6'][Math.floor(Math.random() * 4)]
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit} className="space-y-6 rounded-xl bg-white dark:bg-gray-800 p-6 shadow-lg border border-zinc-200 dark:border-gray-700">
        <div className="flex flex-col gap-3">
          <label className="text-sm font-medium text-zinc-700 dark:text-gray-300">{t('yourRating')}</label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <motion.button
                key={i}
                type="button"
                onClick={() => setRating(i)}
                onMouseEnter={() => setHoveredRating(i)}
                onMouseLeave={() => setHoveredRating(0)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 rounded-full transition-all duration-200"
              >
                <Star 
                  size={28} 
                  fill={i <= (hoveredRating || rating) ? '#FBBF24' : 'transparent'} 
                  stroke={i <= (hoveredRating || rating) ? '#FBBF24' : '#D1D5DB'}
                  strokeWidth={1.5}
                  className={`transition-all duration-200 ${
                    i <= (hoveredRating || rating) 
                      ? 'text-amber-500' 
                      : 'text-zinc-300 dark:text-gray-500'
                  }`}
                />
              </motion.button>
            ))}
            <motion.span 
              key={rating}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="ml-3 text-sm font-medium text-gray-600 dark:text-gray-400"
            >
              {rating ? t(`ratingLabels.${rating}`) : ''}
            </motion.span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-sm font-medium text-zinc-700 dark:text-gray-300">{t('yourComment')}</label>
          <motion.div
            whileFocus={{ scale: 1.005 }}
            className="relative overflow-hidden rounded-lg"
          >
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={t('commentPlaceholder')}
              rows={4}
              className="w-full p-4 border border-zinc-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-zinc-900 dark:text-gray-100 placeholder-zinc-500 dark:placeholder-gray-400 transition-all duration-200 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 dark:focus:ring-indigo-400/20 focus:outline-none resize-none"
            />
            <motion.div 
              className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500"
              initial={{ width: '0%' }}
              animate={{ width: `${Math.min(100, comment.length / 3)}%` }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
          <AnimatePresence>
            {comment.length > 0 && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-xs text-right text-gray-500 dark:text-gray-400"
              >
                {comment.length} {t('characters')}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className="flex justify-end">
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium shadow-lg shadow-indigo-500/25 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isSubmitting ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Send size={18} />
            )}
            <span>{t('sendButton')}</span>
          </motion.button>
        </div>
      </form>

      <AnimatePresence>
        {showSuccessConfetti && <Confetti />}
      </AnimatePresence>
    </motion.div>
  );
}