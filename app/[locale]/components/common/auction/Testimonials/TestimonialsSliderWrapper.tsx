'use client';

import { useEffect, useState } from 'react';
import TestimonialsSlider from './TestimonialsSlider';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

interface Testimonial {
  _id: string;
  name: string;
  role?: string;
  message: string;
  avatarUrl?: string;
  satisfaction?: 'Satisfied' | 'Not Satisfied';
  recommendation?: number;
}

export default function TestimonialsSliderWrapper() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const t = useTranslations('testimonials.slider');

  
  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const res = await fetch('/api/public/testimonials', {
          next: { revalidate: 60 }, // optional ISR
        });
        
        if (!res.ok) {
          throw new Error('Failed to fetch testimonials');
        }
        
        const data = await res.json();
        setTestimonials(data);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        setError(t('error'));
      } finally {
        setLoading(false);
      }
    }

    fetchTestimonials();
  }, [t]);

  if (loading) {
    return (
      <motion.div 
        className="flex flex-col items-center justify-center py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Loader2 className="h-10 w-10 text-blue-500 animate-spin mb-4" />
        <p className="text-gray-600 dark:text-gray-300 font-medium">
          {t('loading')}
        </p>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div 
        className="text-center py-12 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-lg p-6 max-w-lg mx-auto">
          <p className="text-red-600 dark:text-red-400">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-red-100 dark:bg-red-800 hover:bg-red-200 dark:hover:bg-red-700 text-red-600 dark:text-red-300 rounded-md transition-colors duration-200"
          >
            {t('tryAgain')}
          </button>
        </div>
      </motion.div>
    );
  }

  if (!testimonials.length) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <TestimonialsSlider testimonials={testimonials} />
    </motion.div>
  );
}