'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ValueCard as ValueCardType } from '@/types/about';
import SectionTitle from './SectionTitle';
import ValueCard from './ValueCard';
import { FaLightbulb, FaShieldAlt, FaUsers } from 'react-icons/fa';

const OurValues: React.FC = () => {
  const t = useTranslations('about.values');

  const values: ValueCardType[] = [
    {
      title: t('excellence.title'),
      description: t('excellence.description'),
      icon: <FaLightbulb className="h-8 w-8" />
    },
    {
      title: t('integrity.title'),
      description: t('integrity.description'),
      icon: <FaShieldAlt className="h-8 w-8" />
    },
    {
      title: t('clientFocused.title'),
      description: t('clientFocused.description'),
      icon: <FaUsers className="h-8 w-8" />
    }
  ];

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Decorative elements */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.03 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="absolute top-40 right-20 w-96 h-96 rounded-full bg-indigo-600"
      />
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.03 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute bottom-20 left-20 w-64 h-64 rounded-full bg-blue-600"
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle gradient="from-indigo-600 to-blue-600">{t('title')}</SectionTitle>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          {values.map((value, index) => (
            <ValueCard 
              key={index} 
              title={value.title} 
              description={value.description} 
              icon={value.icon} 
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default OurValues;