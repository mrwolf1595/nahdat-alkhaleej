'use client';

import { useRef, useState, useMemo, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { Home, Users, MapPin, Clock } from 'lucide-react';
import { useTranslations } from 'next-intl';

// Extracted animation variants to prevent re-creation on each render
const backgroundVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 0.3 },
};

const meshBackgroundVariants = {
  animate: { 
    backgroundPosition: ['0% 0%', '100% 100%'],
  }
};

const titleVariants = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
};

const statItemVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const dividerVariants = {
  initial: { width: 0 },
  animate: { width: 48 },
};

const plusSignVariants = {
  animate: { 
    y: [0, -2, 0, -2, 0],
    scale: [1, 1.1, 1, 1.1, 1],
  }
};

export default function StatsSection({ className = '' }: { className?: string }) {
  const t = useTranslations('offers.stats');
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    amount: 0.1, 
  });
  
  // Stats data with translations
  const STATS_DATA = [
    { 
      label: t('propertiesListed'), 
      value: '1,500+', 
      target: 1500,
      icon: <Home className="w-8 h-8" strokeWidth={1.5} />
    },
    { 
      label: t('happyClients'), 
      value: '950+', 
      target: 950,
      icon: <Users className="w-8 h-8" strokeWidth={1.5} />
    },
    { 
      label: t('citiesCovered'), 
      value: '30+', 
      target: 30,
      icon: <MapPin className="w-8 h-8" strokeWidth={1.5} />
    },
    { 
      label: t('yearsExperience'), 
      value: '15+', 
      target: 15,
      icon: <Clock className="w-8 h-8" strokeWidth={1.5} />
    },
  ];
  
  // Always show the final numbers instead of animating them
  const [counters] = useState(STATS_DATA.map(stat => stat.target));
  
  // Memoize the StatItem to prevent unnecessary re-renders
  const StatItem = useCallback(({ stat, index }: { stat: typeof STATS_DATA[number]; index: number }) => (
    <motion.div 
      key={index} 
      className="relative group"
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      variants={statItemVariants}
      transition={{ duration: 0.5, delay: index * 0.15 }}
    >
      {/* Completely square - no rounded corners */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 blur-xl group-hover:blur-2xl transition-all duration-300 opacity-80 group-hover:opacity-100 scale-[0.98] group-hover:scale-105"></div>
      
      {/* Completely square card with no rounded corners */}
      <div className="relative p-8 backdrop-blur-md bg-white/10 border border-white/10 hover:border-white/20 shadow-xl overflow-hidden transition-all duration-300 h-full flex flex-col items-center justify-center group-hover:transform group-hover:scale-[1.02]">
        <div className="absolute ltr:-right-8 rtl:-left-8 -top-8 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-lg"></div>
        
        {/* Icon with animated background - kept circle for icon */}
        <div className="relative mb-4">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-md opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
          <motion.div 
            className="relative p-4 bg-gradient-to-br from-blue-500/30 to-indigo-600/30 rounded-full border border-white/20"
            whileHover={{ rotate: [0, -5, 5, -5, 0] }}
            transition={{ duration: 0.5 }}
          >
            {stat.icon}
          </motion.div>
        </div>
        
        {/* Counter value - always showing final value */}
        <div className="relative">
          <h3 className="text-4xl md:text-5xl font-bold mb-2 flex justify-center items-baseline text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-white to-purple-200">
            <span className="text-white">
              {counters[index].toLocaleString()}
            </span>

            <motion.span 
              className="text-blue-300 ltr:ml-1 rtl:mr-1"
              variants={plusSignVariants}
              animate="animate"
              transition={{ 
                duration: 1.2, 
                repeat: Infinity,
                repeatDelay: 3,
              }}
            >
              +
            </motion.span>
          </h3>
          
          {/* Flat divider with no rounded corners */}
          <motion.div 
            className="h-1 w-12 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-3"
            variants={dividerVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ delay: 0.3 + (index * 0.1), duration: 0.6 }}
          />
          
          {/* Label */}
          <p className="text-blue-100 font-medium text-lg">
            {stat.label}
          </p>
        </div>
      </div>
    </motion.div>
  ), [counters, isInView]);

  // Background pattern URL - memoized to prevent recreation
  const patternUrl = useMemo(() => {
    return 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23ffffff\' fill-opacity=\'0.05\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")';
  }, []);

  return (
    <section 
      ref={ref} 
      className={`py-20 bg-gradient-to-br from-indigo-900 via-blue-800 to-purple-900 text-white relative overflow-hidden ${className}`}
    >
      {/* Modern mesh gradient background with animation - optimized */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute w-full h-full opacity-30"
          variants={backgroundVariants}
          initial="initial"
          animate="animate"
          transition={{ duration: 2 }}
        >
          <div className="absolute w-[120%] h-[120%] -top-[10%] ltr:-left-[10%] rtl:-right-[10%] bg-gradient-radial from-blue-400/20 to-transparent rounded-full"></div>
          <div className="absolute w-[100%] h-[100%] top-[20%] ltr:left-[30%] rtl:right-[30%] bg-gradient-radial from-purple-500/20 to-transparent rounded-full"></div>
          <div className="absolute w-[80%] h-[80%] top-[50%] ltr:-left-[20%] rtl:-right-[20%] bg-gradient-radial from-indigo-400/20 to-transparent rounded-full"></div>
          <motion.div 
            className="absolute w-full h-full"
            variants={meshBackgroundVariants}
            animate="animate"
            transition={{ 
              duration: 30,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
            style={{
              backgroundImage: patternUrl,
              backgroundSize: '180px 180px',
              willChange: 'background-position'
            }}
          />
        </motion.div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200"
          variants={titleVariants}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          transition={{ duration: 0.6 }}
        >
          {t('trackRecord')}
        </motion.h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {STATS_DATA.map((stat, index) => (
            <StatItem key={stat.label} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}