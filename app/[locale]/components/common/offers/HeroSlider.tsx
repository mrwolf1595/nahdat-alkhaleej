'use client';

import { useEffect, useState, lazy, Suspense, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

const HeroSlider = () => {
  const t = useTranslations('offers.hero');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // State for tracking which slides have been loaded
  const [loadedSlides, setLoadedSlides] = useState<Record<number, boolean>>({
    0: true, // Preload the first slide immediately
  });

  const heroSlides = useMemo(() => [
    {
      title: t('findYourDreamHome'),
      subtitle: t('discoverProperties'),
      gradient: "from-indigo-900 via-blue-800 to-blue-900",
      shape: "circle-top-right",
      icon: "home"
    },
    {
      title: t('premiumLocations'),
      subtitle: t('exploreSelection'),
      gradient: "from-purple-900 via-violet-800 to-indigo-900",
      shape: "diagonal-waves",
      icon: "map"
    },
    {
      title: t('investmentOpportunities'),
      subtitle: t('secureYourFuture'),
      gradient: "from-blue-900 via-indigo-800 to-violet-900",
      shape: "hex-pattern",
      icon: "chart"
    }
  ], [t]);

  // Function to mark a slide as loaded
  const markSlideAsLoaded = (index: number) => {
    setLoadedSlides(prev => ({
      ...prev,
      [index]: true
    }));
  };

  // Preload next slide to ensure smooth transitions
  useEffect(() => {
    // Preload all slides immediately for faster navigation
    heroSlides.forEach((_, index) => {
      markSlideAsLoaded(index);
    });
  }, [heroSlides]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, heroSlides.length]);

  const handleSlideChange = (index: number) => {
    // Ensure the requested slide is marked as loaded
    markSlideAsLoaded(index);
    
    setCurrentSlide(index);
    // Temporarily pause autoplay when manually changing slides
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 2000);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  // LazyImage component for optimized image loading - تم إزالة الدوائر البيضاء

  // Lazy-loaded icon component
  const SlideIcon = lazy(() => {
    return Promise.resolve({
      default: ({ iconName }: { iconName: string }) => {
        switch(iconName) {
          case 'home':
            return (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-3" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            );
          case 'map':
            return (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            );
          case 'chart':
            return (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-3" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
            );
          default:
            return null;
        }
      }
    });
  });

  return (
    <section className="relative h-[80vh] overflow-hidden group rounded-xl md:rounded-2xl shadow-2xl shadow-blue-900/30">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-10"></div>

      <div className="relative h-full">
        <AnimatePresence mode="sync">
          {heroSlides.map((slide, index) => (
            // Only render slides that are current or have been preloaded
            (index === currentSlide || loadedSlides[index]) && (
              <motion.div
                key={index}
                className={`absolute inset-0 h-full w-full ${index === currentSlide ? 'z-10' : 'z-0'}`}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={index === currentSlide ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.02 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div
                  className={`h-full w-full bg-gradient-to-r ${slide.gradient} relative`}
                  style={{ 
                    visibility: index === currentSlide ? 'visible' : 'hidden' 
                  }}
                >
                  {/* تم إزالة عرض الدوائر البيضاء تماماً */}
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>

        {/* Enhanced Navigation Arrows - RTL support */}
        <div className="absolute top-1/2 transform -translate-y-1/2 ltr:left-6 rtl:right-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <motion.button
            onClick={handlePrev}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-white/15 hover:bg-white/30 backdrop-blur-md text-white p-4 rounded-full transition-all duration-300 shadow-lg shadow-black/20"
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
        </div>
        
        <div className="absolute top-1/2 transform -translate-y-1/2 ltr:right-6 rtl:left-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <motion.button
            onClick={handleNext}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-white/15 hover:bg-white/30 backdrop-blur-md text-white p-4 rounded-full transition-all duration-300 shadow-lg shadow-black/20"
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>

        {/* Enhanced Navigation Dots */}
        <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center space-x-3 rtl:space-x-reverse">
          {heroSlides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => handleSlideChange(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={`h-2 transition-all duration-500 rounded-full ${
                index === currentSlide ? 'w-12 bg-white shadow-md shadow-white/30' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Enhanced Slide Content */}
      <div className="absolute inset-0 z-20 flex items-center justify-center text-center px-6">
        <motion.div 
          className="max-w-4xl bg-gradient-to-b from-black/0 via-black/20 to-black/40 backdrop-blur-sm rounded-3xl p-10 shadow-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <AnimatePresence mode="sync">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <motion.div 
                className="flex justify-center"
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 10, delay: 0 }}
              >
                <div className="bg-white/20 backdrop-blur-md text-white p-4 rounded-full mb-4 shadow-lg shadow-black/20">
                  <Suspense fallback={
                    <div className="bg-white/20 backdrop-blur-md text-white p-4 rounded-full mb-4 shadow-lg shadow-black/20 animate-pulse">
                      <div className="h-8 w-8 mb-3 bg-white/30 rounded" />
                    </div>
                  }>
                    <SlideIcon iconName={heroSlides[currentSlide].icon} />
                  </Suspense>
                </div>
              </motion.div>
              
              <motion.h1
                className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight drop-shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15, delay: 0.05 }}
              >
                {heroSlides[currentSlide].title}
              </motion.h1>
              
              <motion.p
                className="text-xl text-white/90 mb-8 drop-shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15, delay: 0.1 }}
              >
                {heroSlides[currentSlide].subtitle}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15, delay: 0.15 }}
              >
                <motion.a
                  href="#offerList"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-200 hover:shadow-blue-500/40 inline-flex items-center group relative overflow-hidden"
                >
                  <span className="absolute inset-0 w-0 group-hover:w-full h-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-500 ease-out z-0"></span>
                  <span className="flex items-center relative z-10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 ltr:mr-2 rtl:ml-2 group-hover:rotate-12 transition-transform duration-300"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{t('startYourSearch')}</span>
                  </span>
                </motion.a>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSlider;