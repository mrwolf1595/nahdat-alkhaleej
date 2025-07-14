'use client';

import { useTranslations } from 'next-intl';

import CallToAction from './components/common/CallToAction';
import Hero from './components/common/Hero';
import HowItWorks from './components/common/HowItWorks';
import LatestHighlights from './components/common/LatestHighlights';
import LatestOffers from './components/common/LatestOffers';
import MapSection from './components/common/MapSection';
import Services from './components/common/Services';

export default function HomePage() {
  // Specify 'common' namespace to access the welcome message
  const t = useTranslations('common');

  return (
    <>
      {/* Welcome text */}
      <meta name="google-site-verification" content="Ov3AmkBq-_t4CuKCZILQd68aBglvRNIIKv0ihxjHG34" />
      <div className="text-center mt-10">
        <h1 className="text-3xl font-bold">{t('welcome')}</h1>
      </div>

      {/* Page content */}
      <Hero />
      <Services />
      <LatestOffers />
      <HowItWorks />
      <CallToAction />
      <LatestHighlights />
      <MapSection />
    </>
  );
} 