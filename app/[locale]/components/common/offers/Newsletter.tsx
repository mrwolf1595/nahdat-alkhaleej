'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function Newsletter() {
  const t = useTranslations('offers.newsletter');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    
    // Simulate form submission
    setTimeout(() => {
      if (email && email.includes('@')) {
        setIsSuccess(true);
        setEmail('');
      } else {
        setErrorMessage(t('enterValidEmail'));
      }
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section className="py-16 bg-gray-50 relative">
      {/* تم إزالة جميع الدوائر الزرقاء من الخلفية */}
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto bg-white p-10 rounded-2xl shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </motion.div>
            <motion.h3 
              className="text-3xl font-bold text-gray-800 mb-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {t('subscribeTitle')}
            </motion.h3>
            <motion.p 
              className="text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {t('subscribeDescription')}
            </motion.p>
          </div>
          
          {isSuccess ? (
            <motion.div 
              className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-6 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <svg className="w-12 h-12 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h4 className="text-xl font-semibold mb-2">{t('thankYou')}</h4>
              <p>{t('firstToKnow')}</p>
              <button 
                onClick={() => setIsSuccess(false)}
                className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
              >
                {t('subscribeAnother')}
              </button>
            </motion.div>
          ) : (
            <motion.form 
              className="space-y-4 md:space-y-0 md:flex md:gap-4"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex-grow relative">
                <input
                  type="email"
                  placeholder={t('enterEmail')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-5 py-4 rounded-lg border ${errorMessage ? 'border-red-300 bg-red-50' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700`}
                  required
                />
                {errorMessage && (
                  <p className="text-red-600 text-sm mt-1 ltr:ml-1 rtl:mr-1 absolute">{errorMessage}</p>
                )}
              </div>
              
              <button 
                type="submit"
                disabled={isSubmitting}
                className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-blue-500/20 relative overflow-hidden ${isSubmitting ? 'opacity-80' : ''}`}
              >
                <span className={`transition-all duration-300 ${isSubmitting ? 'opacity-0' : 'opacity-100'}`}>
                  {t('subscribe')}
                </span>
                {isSubmitting && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </span>
                )}
              </button>
            </motion.form>
          )}
        </motion.div>
      </div>
      
      {/* Subtle wave pattern at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 opacity-70"></div>
    </section>
  );
}