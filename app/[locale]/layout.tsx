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
  title: {
    template: '%s | نهضة الخليج - أفضل شركة عقارية في السعودية',
    default: 'نهضة الخليج - عقارات للبيع والإيجار - مزادات عقارية - أفضل العروض العقارية',
  },
  description: 'نهضة الخليج - الشركة الرائدة في مجال العقارات في السعودية. عقارات للبيع والإيجار، مزادات عقارية، فلل، شقق، أراضي، مكاتب تجارية. خدمات عقارية متكاملة بأفضل الأسعار.',
  keywords: [
    'عقارات',
    'عقارات السعودية',
    'عقارات للبيع',
    'عقارات للإيجار',
    'فلل للبيع',
    'شقق للإيجار',
    'أراضي للبيع',
    'مزادات عقارية',
    'شركة عقارات',
    'عقارات جدة',
    'عقارات الرياض',
    'عقارات الدمام',
    'عقارات مكة',
    'عقارات المدينة',
    'مكاتب تجارية',
    'محلات للإيجار',
    'استثمار عقاري',
    'تقييم عقاري',
    'وسيط عقاري',
    'سمسار عقارات',
    'بيع وشراء عقارات',
    'نهضة الخليج',
    'Nahdat Al Khaleej',
    'real estate Saudi',
    'properties for sale',
    'real estate auction',
    'Saudi properties',
    'Jeddah real estate',
    'Riyadh properties',
    'property investment'
  ].join(', '),
  authors: [{ name: 'نهضة الخليج للاستثمار العقاري' }],
  creator: 'نهضة الخليج',
  publisher: 'نهضة الخليج',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'ar_SA',
    url: 'https://nahdatalkhaleej.com',
    siteName: 'نهضة الخليج',
    title: 'نهضة الخليج - أفضل شركة عقارية في السعودية',
    description: 'اكتشف أفضل العقارات في السعودية مع نهضة الخليج. فلل، شقق، أراضي، مكاتب تجارية، ومزادات عقارية بأفضل الأسعار والمواقع.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'نهضة الخليج - عقارات السعودية',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'نهضة الخليج - أفضل العقارات في السعودية',
    description: 'اكتشف أفضل العقارات في السعودية مع نهضة الخليج. فلل، شقق، أراضي، مكاتب تجارية، ومزادات عقارية.',
    images: ['/images/twitter-image.jpg'],
    creator: '@nahdatalkhaleej',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    bing: 'your-bing-verification-code',
  },
  alternates: {
    canonical: 'https://nahdatalkhaleej.com',
    languages: {
      'ar-SA': 'https://nahdatalkhaleej.com/ar',
      'en-US': 'https://nahdatalkhaleej.com/en',
    },
  },
  category: 'Real Estate',
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
      testimonials: (await import(`../../locales/${locale}/testimonials.json`)).default,
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

  const isArabic = locale === 'ar';

  return (
    <html 
      lang={locale} 
      dir={locale === 'ar' ? 'rtl' : 'ltr'} 
      suppressHydrationWarning
    >
      <head>
        {/* Enhanced SEO Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Geo Tags for Local SEO */}
        <meta name="geo.region" content="SA" />
        <meta name="geo.placename" content="Saudi Arabia" />
        <meta name="geo.position" content="24.7136;46.6753" />
        <meta name="ICBM" content="24.7136, 46.6753" />
        
        {/* Local Business Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              "name": isArabic ? "نهضة الخليج للاستثمار العقاري" : "Nahdat Al Khaleej Real Estate",
              "description": isArabic 
                ? "الشركة الرائدة في مجال العقارات في السعودية. عقارات للبيع والإيجار، مزادات عقارية، خدمات عقارية متكاملة."
                : "Leading real estate company in Saudi Arabia. Properties for sale and rent, real estate auctions, comprehensive real estate services.",
              "url": "https://nahdatalkhaleej.com",
              "telephone": "+966-XX-XXX-XXXX",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "شارع الملك عبدالعزيز",
                "addressLocality": "جدة",
                "addressRegion": "منطقة مكة المكرمة",
                "postalCode": "21589",
                "addressCountry": "SA"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "21.485811",
                "longitude": "39.192505"
              },
              "openingHours": "Mo-Su 08:00-22:00",
              "priceRange": "$$",
              "serviceArea": {
                "@type": "Country",
                "name": "Saudi Arabia"
              },
              "areaServed": [
                "Riyadh", "Jeddah", "Dammam", "Mecca", "Medina", 
                "الرياض", "جدة", "الدمام", "مكة", "المدينة"
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": isArabic ? "كتالوج العقارات" : "Property Catalog",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Product",
                      "name": isArabic ? "فلل للبيع" : "Villas for Sale",
                      "category": "Real Estate"
                    }
                  },
                  {
                    "@type": "Offer", 
                    "itemOffered": {
                      "@type": "Product",
                      "name": isArabic ? "شقق للإيجار" : "Apartments for Rent",
                      "category": "Real Estate"
                    }
                  }
                ]
              }
            })
          }}
        />

        {/* Website Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": isArabic ? "نهضة الخليج" : "Nahdat Al Khaleej",
              "url": "https://nahdatalkhaleej.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://nahdatalkhaleej.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              },
              "sameAs": [
                "https://facebook.com/nahdatalkhaleej",
                "https://twitter.com/nahdatalkhaleej",
                "https://instagram.com/nahdatalkhaleej",
                "https://linkedin.com/company/nahdatalkhaleej"
              ]
            })
          }}
        />

        {/* Breadcrumb Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": isArabic ? "الرئيسية" : "Home",
                  "item": "https://nahdatalkhaleej.com"
                }
              ]
            })
          }}
        />

        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        
        {/* PWA */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3B82F6" />
        
        {/* Apple specific */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* Microsoft specific */}
        <meta name="msapplication-TileColor" content="#3B82F6" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      
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