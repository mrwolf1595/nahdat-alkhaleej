'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Milestone } from '@/types/about';
import SectionTitle from './SectionTitle';
import { FaBuilding, FaGlobeAmericas, FaAward, FaDigitalTachograph } from 'react-icons/fa';

interface CompanyMilestonesProps {
  milestones: Milestone[];
}

const CompanyMilestones: React.FC<CompanyMilestonesProps> = ({ milestones }) => {
  // Add icons to milestones
  const milestonesWithIcons = milestones.map((milestone, index) => {
    const icons = [
      <FaBuilding key="building" />,
      <FaGlobeAmericas key="globe" />,
      <FaAward key="award" />,
      <FaDigitalTachograph key="digital" />
    ];
    
    return {
      ...milestone,
      icon: icons[index % icons.length]
    };
  });

  // Timeline variants for animation
  const timelineVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { 
      height: '100%', 
      opacity: 1,
      transition: { 
        duration: 1.5, 
        ease: "easeOut" 
      }
    }
  };

  return (
    <section className="py-24 relative">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle gradient="from-blue-600 to-sky-500">Our Journey</SectionTitle>
        
        <div className="max-w-4xl mx-auto relative">
          {/* Timeline line (visible on desktop) - using a gradient line instead of dots */}
          <motion.div 
            variants={timelineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="hidden md:block absolute left-[calc(25%-1px)] top-14 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-teal-500 z-0"
          />
          
          {milestonesWithIcons.map((milestone, index) => (
            <div key={index} className="flex flex-col md:flex-row mb-16 last:mb-0 relative">
              <div className="md:w-1/4 flex-shrink-0 mb-4 md:mb-0 relative">
                <motion.span 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  whileHover={{ scale: 1.1 }}
                  className="text-3xl font-bold text-blue-600 block"
                >
                  {milestone.year}
                </motion.span>
                
                {/* Removed the timeline dots that were causing issues */}
              </div>
              
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 * index, type: "spring", stiffness: 100 }}
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                className="md:w-3/4 bg-white p-8 rounded-xl shadow-md transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  <motion.div 
                    whileHover={{ rotate: 15, scale: 1.2 }}
                    transition={{ duration: 0.3 }}
                    className="mr-4 text-blue-600 text-xl"
                  >
                    {milestone.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-800">{milestone.title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyMilestones;