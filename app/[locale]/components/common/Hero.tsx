'use client';
import { useTheme } from '../../context/ThemeContext';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';

const VideoHero = dynamic(() => import('./VideoHero'), { ssr: false });

const Hero = () => {
  useTheme(); // just to initialize if needed
  const t = useTranslations('hero');

  return (
    <section className="relative w-full h-[85vh] overflow-hidden rounded-3xl shadow-lg border border-zinc-200 dark:border-zinc-800 my-6">
      <VideoHero />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 text-white">
        <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg mb-4">
          {t('title')}
        </h1>
        <p className="text-lg md:text-xl max-w-xl drop-shadow-md">
          {t('description')}
        </p>

        <button
          className="mt-6 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition"
          onClick={() => {
            document.getElementById('latest-offers')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          {t('browseButton')}
        </button>

        <button
          onClick={() => {
            document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="mt-10 text-white opacity-80 hover:opacity-100"
        >
          <svg className="w-8 h-8 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default Hero;