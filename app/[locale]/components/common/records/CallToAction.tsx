'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BadgeCheck, ChevronRight, Clock, ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';

const CallToAction = () => {
  const [shapes, setShapes] = useState<
    { width: number; height: number; left: number; top: number; duration: number }[]
  >([]);

  useEffect(() => {
    const generated = [...Array(6)].map(() => ({
      width: Math.random() * 200 + 100,
      height: Math.random() * 200 + 100,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: Math.random() * 10 + 15,
    }));
    setShapes(generated);
  }, []);

  return (
    <section className="relative py-20 overflow-hidden rounded-4xl">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700">
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#smallGrid)" />
          </svg>
        </div>
      </div>

      {/* Floating shapes (fixed) */}
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
            initial={{ scale: 0.8, opacity: 0.3 }}
            animate={{
              scale: [0.8, 1.2, 0.8],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              repeat: Infinity,
              duration: shape.duration,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-xl border border-white/20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Need a Professional Property Evaluation?
              </motion.h2>
              
              <motion.p 
                className="text-xl text-white/80 mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Our expert team provides accurate, market-based property evaluations to help you make informed decisions.
              </motion.p>
              
              <motion.div
                className="space-y-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex items-center text-white">
                  <BadgeCheck className="mr-3 text-green-300" size={24} />
                  <span>Expert assessors with local knowledge</span>
                </div>
                <div className="flex items-center text-white">
                  <Clock className="mr-3 text-green-300" size={24} />
                  <span>Fast turnaround time - often within 48 hours</span>
                </div>
                <div className="flex items-center text-white">
                  <ShieldCheck className="mr-3 text-green-300" size={24} />
                  <span>Trusted by banks and financial institutions</span>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Link 
                  href="/contact"
                  className="group inline-flex items-center bg-white hover:bg-gray-50 text-blue-600 font-semibold py-3 px-8 rounded-xl transition duration-300 shadow-lg hover:shadow-xl"
                >
                  Request an Evaluation
                  <ChevronRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" size={20} />
                </Link>
              </motion.div>
            </div>
            
            <motion.div
              className="hidden md:block"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="relative">
                {/* Stylized house icon */}
                <div className="absolute w-full h-full flex items-center justify-center">
                  <svg width="260" height="260" viewBox="0 0 260 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-80">
                    <path d="M130 30L30 100V230H230V100L130 30Z" stroke="white" strokeWidth="8" strokeLinejoin="round"/>
                    <path d="M100 230V130H160V230" stroke="white" strokeWidth="8" strokeLinejoin="round"/>
                    <path d="M90 100H170" stroke="white" strokeWidth="8" strokeLinecap="round"/>
                  </svg>
                </div>
                
                {/* Animated circular background */}
                <svg width="300" height="300" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="150" cy="150" r="120" fill="none" stroke="white" strokeWidth="2" strokeDasharray="10 10" className="animate-spin-slow" style={{ animationDuration: '30s' }} />
                  <circle cx="150" cy="150" r="80" fill="none" stroke="white" strokeWidth="2" strokeDasharray="15 15" className="animate-spin-slow" style={{ animationDuration: '20s', animationDirection: 'reverse' }} />
                </svg>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;