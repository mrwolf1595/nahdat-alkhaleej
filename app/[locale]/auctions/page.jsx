'use client';

import dynamic from 'next/dynamic';
import HeroAuctions from '../components/common/auction/HeroAuctions';
import AboutAuctions from '../components/common/auction/AboutAuctions';
import FeaturedAuctionsList from '../components/common/auction/FeaturedAuctionsList';
import AllUpcomingAuctionsList from '../components/common/auction/AllUpcomingAuctionsList';
import PastAuctionsList from '../components/common/auction/PastAuctionsList';
import CallToAction from '../components/common/auction/CallToAction';
import Testimonials from '../components/common/auction/Testimonials';
import { motion } from 'framer-motion';
import { Suspense } from 'react';
import Loading from '../components/common/auction/loading';

// Create the AuctionCard component for your auction listing components
const AuctionCard = dynamic(() => import('../components/common/auction/AuctionCard'), { ssr: false });

export default function AuctionsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <HeroAuctions />
        <AboutAuctions />
        <FeaturedAuctionsList /> 
        <AllUpcomingAuctionsList />
        <PastAuctionsList />
        <Testimonials sectionTitle="Say Something About Us" />
        <CallToAction />
      </motion.div>
    </Suspense>
  );
}