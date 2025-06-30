'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const CallToAction: React.FC = () => {
  const t = useTranslations('about.cta');

  // Animation variants for the section
  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.7, 
        type: "spring", 
        stiffness: 100 
      }
    }
  };
  
  const paragraphVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.7, 
        delay: 0.2, 
        type: "spring", 
        stiffness: 100 
      }
    }
  };
  
  const buttonContainerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        delayChildren: 0.4,
        staggerChildren: 0.2
      }
    }
  };
  
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        type: "spring",
        stiffness: 200
      }
    },
    hover: (custom: boolean) => ({
      scale: 1.05, 
      y: -5,
      boxShadow: custom 
        ? "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)" 
        : "none",
      transition: { 
        duration: 0.2,
        type: "spring",
        stiffness: 400
      }
    })
  };

  // Animation for background shapes
  const shapeAnimationProps = {
    animate: { 
      scale: [1, 1.1, 1],
      opacity: [0.1, 0.2, 0.1]
    },
    transition: { 
      duration: 8, 
      repeat: Infinity, 
      ease: "easeInOut" 
    }
  };

  return (
    <section className="relative overflow-hidden">
      {/* Background with gradient and animated shapes */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 z-0">
        <motion.div 
          {...shapeAnimationProps}
          className="absolute top-0 right-0 w-96 h-96 rounded-full bg-blue-500 opacity-10 blur-3xl"
        />
        <motion.div 
          animate={{ 
            x: [0, -20, 0], 
            y: [0, -10, 0],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute bottom-0 left-0 w-full h-96 bg-indigo-400 opacity-10 blur-3xl"
        />
      </div>
      
      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 py-24 text-center">
        <motion.h2 
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-4xl md:text-5xl font-bold mb-8 text-white"
        >
          {t('title')}
        </motion.h2>
        
        <motion.p 
          variants={paragraphVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto text-white/90"
        >
          {t('subtitle')}
        </motion.p>
        
        <motion.div 
          variants={buttonContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-wrap justify-center gap-6"
        >
          <motion.a 
            variants={buttonVariants}
            whileHover="hover"
            custom={true}
            href="/contact"
            className="bg-white text-blue-700 font-bold py-4 px-10 rounded-lg transition duration-200"
          >
            {t('contactUs')}
          </motion.a>
          
          <motion.a 
            variants={buttonVariants}
            whileHover="hover"
            custom={false}
            href="/offers"
            className="bg-transparent text-white font-bold py-4 px-10 border-2 border-white/80 rounded-lg transition duration-200"
          >
            {t('viewProperties')}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;