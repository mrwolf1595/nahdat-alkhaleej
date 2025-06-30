import './globals.css';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import { ThemeProvider } from './context/ThemeContext';
import TestimonialsSliderWrapper from './components/common/auction/Testimonials/TestimonialsSliderWrapper';
import ChatButton from './components/common/chat/ChatButton';
import WhatsAppButton from './components/common/WhatsAppButton';
import { NextIntlClientProvider } from 'next-intl';

export const metadata = {
  title: 'RealEstatePro',
  description: 'Latest real estate offers and auctions',
};

export const locales = ['en', 'ar'];

async function loadMessages(locale: string) {
  try {
    return {
      common: (await import(`../../locales/${locale}/common.json`)).default,
      callToAction: (await import(`../../locales/${locale}/callToAction.json`)).default,
      hero: (await import(`../../locales/${locale}/hero.json`)).default,
      services: (await import(`../../locales/${locale}/services.json`)).default,
      howItWorks: (await import(`../../locales/${locale}/howItWorks.json`)).default,
      latestOffers: (await import(`../../locales/${locale}/latestOffers.json`)).default,
      latestHighlights: (await import(`../../locales/${locale}/latestHighlights.json`)).default,
      mapSection: (await import(`../../locales/${locale}/mapSection.json`)).default,
      footer: (await import(`../../locales/${locale}/footer.json`)).default,
      offers: (await import(`../../locales/${locale}/offers.json`)).default,
      offerId: (await import(`../../locales/${locale}/offerId.json`)).default,
      auctions: (await import(`../../locales/${locale}/auctions.json`)).default,
      auctionId: (await import(`../../locales/${locale}/auctionId.json`)).default,
      records: (await import(`../../locales/${locale}/records.json`)).default,
      about: (await import(`../../locales/${locale}/about.json`)).default,
      contact: (await import(`../../locales/${locale}/contact.json`)).default,
      property: (await import(`../../locales/${locale}/property.json`)).default
    };
  } catch (error) {
    console.error(`Failed to load translations for ${locale}:`, error);
    return {};
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;
  const messages = await loadMessages(locale);

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Navbar />
            <main className="min-h-screen px-4 py-8">{children}</main>
            <Toaster position="top-center" reverseOrder={false} />
            <TestimonialsSliderWrapper />
            <ChatButton />
            <WhatsAppButton phoneNumber="YOUR_PHONE_NUMBER" />
            <Footer />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}