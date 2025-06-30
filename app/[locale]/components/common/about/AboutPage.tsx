'use client';

import React, { useEffect, useState } from 'react';
import { TeamMember } from '@/types/about';
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

  return (
    <div className="about-page">
      <HeroSection />
      <OurStory />
      <OurValues />
      <CompanyMilestones />
      {!loading && <TeamSection teamMembers={teamMembers} />}
      <CallToAction />
    </div>
  );
};

export default AboutPage;