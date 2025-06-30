'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import SectionTitle from './SectionTitle';

const OurStory: React.FC = () => {
  const t = useTranslations('about.story');

  // Animation variants for paragraphs
  const paragraphVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.7,
        ease: "easeOut",
        delay: 0.2 * custom
      }
    })
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <SectionTitle 
            gradient="from-purple-600 to-blue-600"
            className="mb-12"
          >
            {t('title')}
          </SectionTitle>
          
          <div className="prose prose-lg mx-auto space-y-8 text-gray-700">
            <motion.p
              variants={paragraphVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              custom={0}
              className="leading-relaxed text-lg"
            >
              {t('paragraphs.founding')}
            </motion.p>
            
            <motion.p
              variants={paragraphVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              custom={1}
              className="leading-relaxed text-lg"
            >
              {t('paragraphs.growth')}
            </motion.p>
            
            <motion.p
              variants={paragraphVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              custom={2}
              className="leading-relaxed text-lg"
            >
              {t('paragraphs.future')}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;