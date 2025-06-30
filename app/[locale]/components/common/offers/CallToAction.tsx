'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function CallToAction({ className = '' }: { className?: string }) {
  const t = useTranslations('offers.callToAction');
  
  return (
    <section className={`py-20 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-800 text-white relative overflow-hidden ${className}`}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute ltr:-left-40 rtl:-right-40 -top-40 w-80 h-80 rounded-full bg-white"></div>
        <div className="absolute ltr:right-0 rtl:left-0 top-1/2 w-64 h-64 rounded-full bg-white"></div>
        <div className="absolute ltr:left-1/4 rtl:right-1/4 bottom-0 w-40 h-40 rounded-full bg-white"></div>
      </div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.h2 
          className="text-4xl font-bold mb-6 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {t('cantFind')}
        </motion.h2>

        <motion.p 
          className="text-xl mb-10 max-w-2xl mx-auto text-blue-100 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
        >
          {t('contactTeam')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        >
          <Link 
            href="/contact"
            className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-4 px-10 rounded-full shadow-lg transition-all duration-300 hover:shadow-blue-400/30 hover:scale-105 inline-flex items-center group"
          >
            <span>{t('contactUsToday')}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ltr:ml-2 rtl:mr-2 transform group-hover:translate-x-1 ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-300 rtl:rotate-180" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}