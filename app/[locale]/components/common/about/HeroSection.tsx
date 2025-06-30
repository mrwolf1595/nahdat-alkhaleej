'use client';

import React from 'react';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background with gradient and animated shapes */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 z-0">
        {/* These motion.div elements use framer-motion's animate prop for continuous animations */}
        <motion.div 
          initial={{ opacity: 0.1 }}
          animate={{ 
            rotate: 360,
            x: [0, 20, 0],
            y: [0, 15, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ 
            rotate: { duration: 40, repeat: Infinity, ease: "linear" },
            x: { duration: 20, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 15, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute top-0 right-0 w-96 h-96 rounded-full bg-blue-500 opacity-10 blur-3xl"
        />
        <motion.div 
          initial={{ opacity: 0.1 }}
          animate={{ 
            rotate: -360,
            x: [0, -30, 0],
            y: [0, 20, 0],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ 
            rotate: { duration: 50, repeat: Infinity, ease: "linear" },
            x: { duration: 25, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 18, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 10, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-indigo-500 opacity-10 blur-3xl"
        />
      </div>
      
      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 py-28 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-6xl font-bold mb-6 text-white"
        >
          About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-teal-300">Nahdat Al-Khaleej</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="text-xl md:text-2xl max-w-3xl mx-auto text-white/90 font-light"
        >
          We&apos;re a dedicated team of real estate professionals committed to helping you find the perfect property.
        </motion.p>
      </div>
    </section>
  );
};

export default HeroSection;