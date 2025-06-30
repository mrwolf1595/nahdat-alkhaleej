'use client';
import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, ExternalLink, Loader } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function MapSection() {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10% 0px" });
  const t = useTranslations('mapSection');
  
  // Motion variants for consistent animations
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section
      id="map-section"
      ref={sectionRef}
      className="relative py-24 px-6 sm:px-10 rounded-3xl mx-auto my-8 max-w-7xl overflow-hidden"
            aria-labelledby="location-heading"
    >
      {/* Enhanced gradient background with modern blur effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div 
          className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200/30 dark:bg-blue-600/20 
                   rounded-full blur-3xl" 
        />
        <div 
          className="absolute -bottom-20 -left-20 w-72 h-72 bg-purple-200/30 dark:bg-purple-600/10 
                   rounded-full blur-3xl" 
        />
        <div 
          className="absolute top-1/3 left-1/4 w-60 h-60 bg-emerald-200/20 dark:bg-emerald-600/10 
                   rounded-full blur-3xl" 
        />
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          className="text-center mb-12"
        >
<div className="inline-flex items-center justify-center gap-3 mb-6 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:shadow-xl transition-all duration-300">
  <MapPin size={22} className="text-white" />
  <span className="text-lg font-semibold">{t('location')}</span>
</div>

          
          <h2 
            id="location-heading" 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400"
          >
            {t('title')}
          </h2>
          
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            {t('description')}
          </p>
        </motion.div>

        {/* Map container with loading state */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0, scale: 0.95 },
            visible: { 
              opacity: 1,
              scale: 1,
              transition: { 
                duration: 0.6, 
                ease: [0.22, 1, 0.36, 1],
                delay: 0.2 
              }
            }
          }}
          className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/50"
        >
          {!isMapLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-zinc-800/80 z-10">
              <div className="flex flex-col items-center gap-3">
                <Loader size={32} className="text-blue-600 dark:text-blue-400 animate-spin" />
                <p className="text-gray-600 dark:text-gray-300">{t('loadingMap')}</p>
              </div>
            </div>
          )}
          
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d287.7024557947544!2d39.201692774667!3d21.59993595188693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2ssa!4v1743741949673!5m2!1sen!2ssa"
            width="100%"
            height="500"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-[500px] rounded-xl"
            onLoad={() => setIsMapLoaded(true)}
            title="Our office location on Google Maps"
            aria-label="Interactive map showing our office location"
          />
        </motion.div>

        {/* Enhanced CTA section */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { 
                duration: 0.5, 
                delay: 0.4 
              }
            }
          }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="https://maps.app.goo.gl/XPzmM53mzFNkASVe6"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all shadow-lg hover:shadow-blue-200/50 dark:hover:shadow-blue-900/40"
            aria-label="Get directions to our office via Google Maps"
          >
            <ExternalLink size={18} />
            {t('getDirections')}
          </a>
        </motion.div>
      </div>
    </section>
  );
}