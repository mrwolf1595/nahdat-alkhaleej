'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Award, Search, Sparkles, Shield } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function AboutAuctions() {
  const t = useTranslations('auctions.about');

  // Animation variants for consistent effects
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
  };
  
  const cardHover = {
    rest: { scale: 1, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" },
    hover: { 
      scale: 1.02, 
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  };
  
  const iconAnimation = {
    rest: { rotate: 0 },
    hover: { rotate: 5, scale: 1.1, transition: { duration: 0.3, type: "spring", stiffness: 300 } }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-4">
            {t('badge')}
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-5 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600">
            {t('title')}
          </h2>
          <div className="w-36 h-2 bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 mx-auto mb-7 rounded-full"></div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto font-light">
            {t('subtitle')}
          </p>
        </motion.div>
        
        <div className="max-w-5xl mx-auto grid gap-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            whileHover="hover"
            animate="rest"
            className="flex flex-col items-center text-center bg-gradient-to-br from-white to-blue-50 p-10 rounded-3xl shadow-lg border border-blue-100/50 transition-all"
          >
            <motion.div 
              className="bg-blue-100 p-5 rounded-2xl mb-6 relative overflow-hidden"
              variants={cardHover}
            >
              <motion.div variants={iconAnimation}>
                <Award className="text-blue-600" size={32} />
              </motion.div>
              <div className="absolute inset-0 bg-blue-200 rounded-2xl mix-blend-multiply filter blur-md opacity-30"></div>
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              {t('premiumOpportunities.title')}
              <Sparkles size={18} className="text-blue-500" />
            </h3>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              {t('premiumOpportunities.description')}
            </p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            whileHover="hover"
            animate="rest"
            className="flex flex-col items-center text-center bg-gradient-to-br from-white to-amber-50 p-10 rounded-3xl shadow-lg border border-amber-100/50 transition-all"
          >
            <motion.div 
              className="bg-amber-100 p-5 rounded-2xl mb-6 relative overflow-hidden"
              variants={cardHover}
            >
              <motion.div variants={iconAnimation}>
                <Shield className="text-amber-600" size={32} />
              </motion.div>
              <div className="absolute inset-0 bg-amber-200 rounded-2xl mix-blend-multiply filter blur-md opacity-30"></div>
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              {t('rigorousDueDiligence.title')}
              <CheckCircle size={18} className="text-amber-500" />
            </h3>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              {t('rigorousDueDiligence.description')}
            </p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            whileHover="hover"
            animate="rest"
            className="flex flex-col items-center text-center bg-gradient-to-br from-white to-purple-50 p-10 rounded-3xl shadow-lg border border-purple-100/50 transition-all"
          >
            <motion.div 
              className="bg-purple-100 p-5 rounded-2xl mb-6 relative overflow-hidden"
              variants={cardHover}
            >
              <motion.div variants={iconAnimation}>
                <Search className="text-purple-600" size={32} /> 
              </motion.div>
              <div className="absolute inset-0 bg-purple-200 rounded-2xl mix-blend-multiply filter blur-md opacity-30"></div>
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              {t('discoverOpportunities.title')}
              <Sparkles size={18} className="text-purple-500" />
            </h3>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              {t('discoverOpportunities.description')}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}