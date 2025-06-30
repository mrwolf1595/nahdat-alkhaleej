'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TeamMember } from '@/types/about';
import SectionTitle from './SectionTitle';
import TeamMemberCard from './TeamMemberCard';

interface TeamSectionProps {
  teamMembers: TeamMember[];
}

const TeamSection: React.FC<TeamSectionProps> = ({ teamMembers }) => {
  // Container variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  // Item variants - this is for the child elements
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="team" className="py-24 bg-gradient-to-b from-slate-50 via-indigo-50 to-slate-100 relative overflow-hidden">
      {/* Decorative elements */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 0.03, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="absolute top-0 left-0 w-96 h-96 rounded-full bg-blue-600 blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 0.03, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-indigo-600 blur-3xl"
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle gradient="from-blue-600 to-indigo-600">Meet Our Team</SectionTitle>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {teamMembers.map((member) => (
            <motion.div 
              key={member.id}
              variants={itemVariants}
            >
              <TeamMemberCard 
                name={member.name} 
                role={member.role} 
                bio={member.bio} 
                image={member.image}
                index={0} // You can remove this prop if not needed
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;