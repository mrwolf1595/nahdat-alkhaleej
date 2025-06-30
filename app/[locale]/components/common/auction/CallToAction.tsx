'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { PhoneCall } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function CallToAction() {
  const t = useTranslations('auctions.cta');

  return (
    <section className="py-20 bg-gradient-to-r from-blue-900 to-purple-900 text-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4">{t('title')}</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Link
            href="/contact"
            className="bg-transparent hover:bg-white/10 text-white font-semibold py-3 px-8 border border-white rounded-lg transition duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <PhoneCall size={18} className="mr-2" />
            {t('contactTeam')}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}