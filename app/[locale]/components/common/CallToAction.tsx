'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function CallToAction() {
  const [isVisible, setIsVisible] = useState(false);
  const t = useTranslations('callToAction');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const element = document.getElementById('cta-section');
      if (element) {
        const elementPosition = element.offsetTop;
        if (scrollPosition > elementPosition) {
          setIsVisible(true);
        }
      }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      id="cta-section"
      className="relative py-24 overflow-hidden rounded-3xl mx-4 my-8"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-blue-100 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gray-300 rounded-full blur-3xl transform translate-x-1/3 translate-y-1/3"></div>
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            {t('title')}
          </h2>
          
          <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto font-light">
            {t('description')}
          </p>
          
          <div className="flex flex-wrap justify-center gap-5">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/offers"
                className="inline-flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 font-semibold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                </svg>
                {t('viewOffers')}
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-transparent font-semibold py-3 px-8 border-2 border-gray-400 rounded-lg shadow-lg transition-all duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M14.243 5.757a6 6 0 10-8.486 8.486L9 16.5l3.243-2.257a6 6 0 001-8.486zm-4.708 8.486L9 16.5l-3.243-2.257a6 6 0 1110.486-4.486 6 6 0 01-6.708 4.486z" clipRule="evenodd" />
                  <path d="M12 7a1 1 0 100 2 1 1 0 000-2zM9 9a1 1 0 012 0v.01a1 1 0 01-2 0V9zm-3 1a1 1 0 100 2 1 1 0 000-2z" />
                </svg>
                {t('contactUs')}
              </Link>
            </motion.div>
          </div>
          
          <div className="mt-14 flex flex-col md:flex-row justify-center items-center gap-4">
            <div className="flex -space-x-2">
              <div className="relative w-10 h-10 rounded-full border-2 border-gray-300 overflow-hidden">
                <Image 
                  src="/logo.png" 
                  alt="Satisfied client" 
                  fill
                  sizes="40px"
                  className="object-cover"
                  priority={false}
                />
              </div>
              <div className="relative w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                <Image 
                  src="/1.jpg" 
                  alt="Satisfied client" 
                  fill
                  sizes="40px"
                  className="object-cover"
                  priority={false}
                />
              </div>
              <div className="relative w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                <Image 
                  src="/2.jpg" 
                  alt="Satisfied client" 
                  fill
                  sizes="40px"
                  className="object-cover"
                  priority={false}
                />
              </div>
            </div>
            <p className="text-sm font-medium">{t('clientsJoined')}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}