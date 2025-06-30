'use client';

import React, { useEffect, useState } from 'react';
import { TeamMember, Milestone } from '@/types/about';
import HeroSection from './HeroSection';
import OurStory from './OurStory';
import OurValues from './OurValues';
import CompanyMilestones from './CompanyMilestones';
import TeamSection from './TeamSection';
import CallToAction from './CallToAction';

const AboutPage: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/public/team')
      .then((res) => res.json())
      .then((data) => setTeamMembers(data))
      .catch((err) => console.error('Failed to load team members:', err))
      .finally(() => setLoading(false));
  }, []);

  const milestones: Milestone[] = [
    {
      year: '2010',
      title: 'Company Founded',
      description: 'Estate Pro was established with a vision to provide exceptional real estate services.',
    },
    {
      year: '2015',
      title: 'Expansion to Multiple Cities',
      description: 'After our initial success, we expanded operations to five major cities across the country.',
    },
    {
      year: '2018',
      title: 'Launch of Auction Platform',
      description: 'We introduced our innovative property auction platform, revolutionizing the local market.',
    },
    {
      year: '2022',
      title: 'Digital Transformation',
      description: 'Implementation of advanced digital tools to enhance customer experience and streamline operations.',
    },
  ];

  return (
    <div className="about-page">
      <HeroSection />
      <OurStory />
      <OurValues />
      <CompanyMilestones milestones={milestones} />
      {!loading && <TeamSection teamMembers={teamMembers} />}
      <CallToAction />
    </div>
  );
};

export default AboutPage;
