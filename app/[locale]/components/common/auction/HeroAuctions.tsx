'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building, Home, Award, Calendar, X, CheckCircle, Clock, CreditCard, BookOpen } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function HeroAuctionsWithPopup() {
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const t = useTranslations('auctions.hero');

  const openHowItWorks = () => {
    setIsHowItWorksOpen(true);
  };

  const closeHowItWorks = () => {
    setIsHowItWorksOpen(false);
  };

  return (
    <section className="relative text-white py-24 overflow-hidden min-h-[80vh] flex items-center">
      {/* Background Image - Now filling width with rounded corners */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gray-900"></div>
          <Image 
            src="/auctionhero.png"
            alt="Property Auction" 
            fill
            priority
            className="object-cover object-center brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/85 to-blue-900/75 rounded-2xl"></div>
        </div>
        
        {/* Decorative elements that enhance the design */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-orange-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 drop-shadow-lg">
            {t('title')} <span className="text-orange-400">{t('titleHighlight')}</span>
          </h1>
          <p className="text-xl max-w-3xl mx-auto mb-8 drop-shadow-md text-gray-100">
            {t('subtitle')}
          </p>
          
          <div className="flex gap-4 justify-center flex-wrap">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-orange-600 hover:bg-orange-700 transition-colors text-white px-8 py-3 rounded-md font-medium text-lg mt-4"
            >
              <a href="#upcoming-auctions">{t('viewUpcomingAuctions')}</a>
            </motion.button>
            
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-transparent hover:bg-white/10 border border-white/30 transition-colors text-white px-8 py-3 rounded-md font-medium text-lg mt-4"
              onClick={openHowItWorks}
            >
              {t('howItWorks')}
            </motion.button>
          </div>
        </motion.div>

        <div className="flex justify-center gap-8 md:gap-16 mt-16 flex-wrap">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <div className="bg-blue-600/30 p-4 rounded-full mb-3 backdrop-blur-sm">
              <Building size={30} className="text-blue-200" />
            </div>
            <p className="font-medium">{t('categories.commercial')}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-center"
          >
            <div className="bg-orange-600/30 p-4 rounded-full mb-3 backdrop-blur-sm">
              <Home size={30} className="text-orange-200" />
            </div>
            <p className="font-medium">{t('categories.residential')}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col items-center"
          >
            <div className="bg-emerald-600/30 p-4 rounded-full mb-3 backdrop-blur-sm">
              <Award size={30} className="text-emerald-200" />
            </div>
            <p className="font-medium">{t('categories.premium')}</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col items-center"
          >
            <div className="bg-purple-600/30 p-4 rounded-full mb-3 backdrop-blur-sm">
              <Calendar size={30} className="text-purple-200" />
            </div>
            <p className="font-medium">{t('categories.events')}</p>
          </motion.div>
        </div>
        
        {/* Trust indicators section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 pt-10 border-t border-white/10"
        >
          <p className="text-sm uppercase tracking-wider mb-4 text-gray-300">{t('trustIndicators.heading')}</p>
          <div className="flex justify-center items-center gap-8 flex-wrap">
            <div className="text-gray-300 font-semibold">{t('trustIndicators.annualAuctions')}</div>
            <div className="text-gray-300 font-semibold">{t('trustIndicators.propertiesSold')}</div>
            <div className="text-gray-300 font-semibold">{t('trustIndicators.satisfaction')}</div>
          </div>
        </motion.div>
      </div>

      {/* How It Works Modal */}
      <AnimatePresence>
        {isHowItWorksOpen && (
          <motion.div 
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeHowItWorks}
          >
            <motion.div 
              className="bg-white text-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 15 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-blue-800">{t('howItWorksModal.title')}</h2>
                <button 
                  onClick={closeHowItWorks}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X size={24} className="text-gray-500" />
                </button>
              </div>
              
              <div className="p-6 space-y-8">
                {/* Step 1 */}
                <motion.div 
                  className="flex gap-6"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="bg-blue-100 p-4 rounded-full h-16 w-16 flex items-center justify-center flex-shrink-0">
                    <BookOpen size={28} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('howItWorksModal.steps.register.title')}</h3>
                    <p className="text-gray-600">
                      {t('howItWorksModal.steps.register.description')}
                    </p>
                  </div>
                </motion.div>
                
                {/* Step 2 */}
                <motion.div 
                  className="flex gap-6"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="bg-orange-100 p-4 rounded-full h-16 w-16 flex items-center justify-center flex-shrink-0">
                    <CheckCircle size={28} className="text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('howItWorksModal.steps.getApproved.title')}</h3>
                    <p className="text-gray-600">
                      {t('howItWorksModal.steps.getApproved.description')}
                    </p>
                  </div>
                </motion.div>
                
                {/* Step 3 */}
                <motion.div 
                  className="flex gap-6"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="bg-purple-100 p-4 rounded-full h-16 w-16 flex items-center justify-center flex-shrink-0">
                    <Clock size={28} className="text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('howItWorksModal.steps.attendAuction.title')}</h3>
                    <p className="text-gray-600">
                      {t('howItWorksModal.steps.attendAuction.description')}
                    </p>
                  </div>
                </motion.div>
                
                {/* Step 4 */}
                <motion.div 
                  className="flex gap-6"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="bg-green-100 p-4 rounded-full h-16 w-16 flex items-center justify-center flex-shrink-0">
                    <CreditCard size={28} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('howItWorksModal.steps.completePurchase.title')}</h3>
                    <p className="text-gray-600">
                      {t('howItWorksModal.steps.completePurchase.description')}
                    </p>
                  </div>
                </motion.div>
              </div>
              
              <div className="p-6 bg-gray-50 border-t border-gray-200">
                <div className="flex justify-between items-center flex-wrap gap-4">
                  <div className="text-gray-600">
                    <p className="font-medium">{t('howItWorksModal.assistance.needHelp')}</p>
                    <p className="text-sm">{t('howItWorksModal.assistance.contact')}</p>
                  </div>
                  <motion.button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded font-medium transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={closeHowItWorks}
                  >
                    {t('howItWorksModal.gotIt')}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}