'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Gavel, BadgeDollarSign, Clock, TrendingUp } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function LatestHighlights() {
  const [isVisible, setIsVisible] = useState(false);
  const t = useTranslations('latestHighlights');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight;
      const section = document.getElementById('highlights-section');
      if (section && scrollY > section.offsetTop) {
        setIsVisible(true);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="highlights-section"
      className="py-24 px-6 rounded-3xl mx-4 my-8"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/4 h-1/4 bg-blue-100 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gray-300 rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4"></div>
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          {t('title')}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-gray-600 max-w-2xl mx-auto mb-12"
        >
          {t('description')}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Auction Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            whileHover={{ y: -5 }}
            className="p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-orange-100 p-3 rounded-lg">
                <Gavel size={28} className="text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold">{t('upcomingAuctions.title')}</h3>
            </div>
            
            <p className="mb-6 flex-grow">
              {t('upcomingAuctions.description')}
            </p>
            
            <div className="mt-4 space-y-3 mb-8">
              <div className="flex items-center gap-3 text-sm">
                <Clock size={16} className="text-orange-500" />
                <span>{t('upcomingAuctions.nextAuction')}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <TrendingUp size={16} className="text-orange-500" />
                <span>{t('upcomingAuctions.propertiesAvailable')}</span>
              </div>
            </div>
            
            <Link
              href="/auctions"
              className="inline-flex items-center justify-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 font-medium transition-colors duration-300 w-full md:w-auto"
            >
              <Gavel size={18} />
              {t('upcomingAuctions.viewAuctions')}
            </Link>
          </motion.div>

          {/* Evaluation Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            whileHover={{ y: -5 }}
            className="p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-green-100 p-3 rounded-lg">
                <BadgeDollarSign size={28} className="text-green-600" />
              </div>
              <h3 className="text-xl font-semibold">{t('recentEvaluations.title')}</h3>
            </div>
            
            <p className="mb-6 flex-grow">
              {t('recentEvaluations.description')}
            </p>
            
            <div className="mt-4 space-y-3 mb-8">
              <div className="flex items-center gap-3 text-sm">
                <Clock size={16} className="text-green-500" />
                <span>{t('recentEvaluations.lastUpdated')}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <TrendingUp size={16} className="text-green-500" />
                <span>{t('recentEvaluations.newEvaluations')}</span>
              </div>
            </div>
            
            <Link
              href="/records"
              className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-medium transition-colors duration-300 w-full md:w-auto"
            >
              <BadgeDollarSign size={18} />
              {t('recentEvaluations.viewEvaluations')}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}