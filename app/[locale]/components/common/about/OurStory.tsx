'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from './SectionTitle';

const OurStory: React.FC = () => {
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
            Our Story
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
              Founded in 2010, Estate Pro has grown from a small local agency to one of the region&apos;s leading real estate companies. 
              Our journey began with a simple mission: to provide honest, transparent, and professional real estate services that 
              put client needs first.
            </motion.p>
            
            <motion.p
              variants={paragraphVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              custom={1}
              className="leading-relaxed text-lg"
            >
              Over the years, we&apos;ve helped thousands of clients find their dream homes, make smart investments, and navigate the 
              complex world of real estate. Our success is built on a foundation of trust, expertise, and a deep understanding of the 
              local market.
            </motion.p>
            
            <motion.p
              variants={paragraphVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              custom={2}
              className="leading-relaxed text-lg"
            >
              Today, Estate Pro continues to innovate and grow, embracing new technologies and approaches while staying true to our 
              core values. We&apos;re proud of our history and excited about the future as we continue to expand our services and help 
              more clients achieve their real estate goals.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;