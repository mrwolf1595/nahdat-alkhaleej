'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, BarChart4, Home, MapPin } from 'lucide-react';

const HeroRecords = () => {
  const [shapes, setShapes] = useState<
    { width: number; height: number; left: number; top: number; duration: number }[]
  >([]);

  useEffect(() => {
    const generated = [...Array(5)].map(() => ({
      width: Math.random() * 300 + 100,
      height: Math.random() * 300 + 100,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: Math.random() * 10 + 10,
    }));
    setShapes(generated);
  }, []);

  return (
    <section className="relative overflow-hidden rounded-4xl">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-700 via-blue-600 to-sky-500 opacity-90 z-0">
<div className="absolute inset-0 bg-gradient-to-br from-white/10">
</div>
      </div>

      {/* Animated shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {shapes.map((shape, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10 backdrop-blur-sm"
            style={{
              width: `${shape.width}px`,
              height: `${shape.height}px`,
              left: `${shape.left}%`,
              top: `${shape.top}%`,
            }}
            animate={{
              x: [0, Math.random() * 40 - 20],
              y: [0, Math.random() * 40 - 20],
            }}
            transition={{
              repeat: Infinity,
              repeatType: 'reverse',
              duration: shape.duration,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-28 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white drop-shadow-md">
            Property Records
          </h1>
        </motion.div>

        <motion.p
          className="text-xl max-w-3xl mx-auto text-white/90"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Browse our comprehensive database of property sales, evaluations, and auction records.
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-8 mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center text-white/90 hover:text-white transition-colors">
            <Search className="mr-2" size={24} />
            <span>Advanced Search</span>
          </div>
          <div className="flex items-center text-white/90 hover:text-white transition-colors">
            <BarChart4 className="mr-2" size={24} />
            <span>Market Analytics</span>
          </div>
          <div className="flex items-center text-white/90 hover:text-white transition-colors">
            <Home className="mr-2" size={24} />
            <span>Property Details</span>
          </div>
          <div className="flex items-center text-white/90 hover:text-white transition-colors">
            <MapPin className="mr-2" size={24} />
            <span>Location Insights</span>
          </div>
        </motion.div>
      </div>

      {/* Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-16 text-gray-50"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroRecords;
