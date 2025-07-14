'use client';

import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import Head from 'next/head';

import CallToAction from './components/common/CallToAction';
import Hero from './components/common/Hero';
import HowItWorks from './components/common/HowItWorks';
import LatestHighlights from './components/common/LatestHighlights';
import LatestOffers from './components/common/LatestOffers';
import MapSection from './components/common/MapSection';
import Services from './components/common/Services';

export default function HomePage() {
  const t = useTranslations('common');

  useEffect(() => {
    // Add dynamic structured data for the homepage
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "نهضة الخليج للاستثمار العقاري",
      "alternateName": "Nahdat Al Khaleej Real Estate",
      "url": "https://nahdatalkhaleej.com",
      "logo": "https://nahdatalkhaleej.com/logo.png",
      "description": "الشركة الرائدة في مجال العقارات في السعودية. نقدم خدمات شاملة في بيع وإيجار العقارات، المزادات العقارية، والاستثمار العقاري.",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+966-XX-XXX-XXXX",
        "contactType": "customer service",
        "areaServed": "SA",
        "availableLanguage": ["Arabic", "English"]
      },
      "sameAs": [
        "https://facebook.com/nahdatalkhaleej",
        "https://twitter.com/nahdatalkhaleej",
        "https://instagram.com/nahdatalkhaleej"
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "عقارات متنوعة",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "RealEstateListing",
              "name": "فلل فاخرة للبيع",
              "description": "فلل فاخرة في أفضل الأحياء السكنية"
            }
          },
          {
            "@type": "Offer", 
            "itemOffered": {
              "@type": "RealEstateListing",
              "name": "شقق عصرية للإيجار",
              "description": "شقق مفروشة وغير مفروشة في مواقع مميزة"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "RealEstateListing", 
              "name": "أراضي استثمارية",
              "description": "أراضي في مواقع استراتيجية للاستثمار"
            }
          }
        ]
      }
    };

    // Remove existing structured data script if any
    const existingScript = document.querySelector('#homepage-structured-data');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new structured data
    const script = document.createElement('script');
    script.id = 'homepage-structured-data';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      const scriptToRemove = document.querySelector('#homepage-structured-data');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, []);

  return (
    <>
      <Head>
        {/* Additional meta tags for homepage */}
        <title>نهضة الخليج - أفضل شركة عقارية في السعودية | فلل وشقق للبيع والإيجار</title>
        <meta 
          name="description" 
          content="اكتشف أفضل العقارات في السعودية مع نهضة الخليج. فلل فاخرة، شقق عصرية، أراضي استثمارية، ومزادات عقارية. خدمات عقارية متكاملة بأفضل الأسعار في الرياض، جدة، الدمام، مكة والمدينة." 
        />
        <meta 
          name="keywords" 
          content="عقارات السعودية, فلل للبيع, شقق للإيجار, أراضي استثمارية, مزادات عقارية, عقارات الرياض, عقارات جدة, عقارات الدمام, شركة عقارات, استثمار عقاري, تقييم عقاري, وسيط عقاري"
        />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://nahdatalkhaleej.com" />
        
        {/* Hreflang tags */}
        <link rel="alternate" hrefLang="ar" href="https://nahdatalkhaleej.com/ar" />
        <link rel="alternate" hrefLang="en" href="https://nahdatalkhaleej.com/en" />
        <link rel="alternate" hrefLang="x-default" href="https://nahdatalkhaleej.com" />
        
        {/* Open Graph tags */}
        <meta property="og:title" content="نهضة الخليج - أفضل العقارات في السعودية" />
        <meta property="og:description" content="اكتشف أفضل العقارات في السعودية. فلل، شقق، أراضي، ومزادات عقارية بأفضل الأسعار." />
        <meta property="og:image" content="https://nahdatalkhaleej.com/images/homepage-banner.jpg" />
        <meta property="og:url" content="https://nahdatalkhaleej.com" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ar_SA" />
        <meta property="og:site_name" content="نهضة الخليج" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="نهضة الخليج - أفضل العقارات في السعودية" />
        <meta name="twitter:description" content="اكتشف أفضل العقارات في السعودية. فلل، شقق، أراضي، ومزادات عقارية." />
        <meta name="twitter:image" content="https://nahdatalkhaleej.com/images/homepage-banner.jpg" />
        
        {/* Schema.org markup for rich snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "نهضة الخليج - الصفحة الرئيسية",
              "description": "الشركة الرائدة في مجال العقارات في السعودية",
              "url": "https://nahdatalkhaleej.com",
              "mainEntity": {
                "@type": "RealEstateAgent",
                "name": "نهضة الخليج للاستثمار العقاري",
                "serviceArea": "Saudi Arabia",
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": "خدمات عقارية شاملة",
                  "itemListElement": [
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "بيع العقارات",
                        "description": "خدمات بيع الفلل والشقق والأراضي"
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service", 
                        "name": "إيجار العقارات",
                        "description": "خدمات إيجار الشقق والفلل والمكاتب"
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "المزادات العقارية",
                        "description": "مزادات عقارية موثوقة ومضمونة"
                      }
                    }
                  ]
                }
              }
            })
          }}
        />
      </Head>

      {/* SEO-optimized content structure */}
      <article itemScope itemType="https://schema.org/WebPage">
        {/* Welcome text with SEO optimization */}
        <header className="text-center mt-10">
          <h1 
            className="text-3xl font-bold"
            itemProp="name"
          >
            {t('welcome')}
          </h1>
          <meta itemProp="description" content="مرحباً بكم في نهضة الخليج - الشركة الرائدة في مجال العقارات" />
        </header>

        {/* Main content sections with semantic HTML */}
        <main itemProp="mainContentOfPage">
          <section aria-label="قسم البطل الرئيسي">
            <Hero />
          </section>

          <section aria-label="خدماتنا العقارية" itemScope itemType="https://schema.org/Service">
            <Services />
          </section>

          <section aria-label="أحدث العروض العقارية" itemScope itemType="https://schema.org/ItemList">
            <LatestOffers />
          </section>

          <section aria-label="كيف نعمل">
            <HowItWorks />
          </section>

          <section aria-label="دعوة للعمل">
            <CallToAction />
          </section>

          <section aria-label="أبرز المشاريع">
            <LatestHighlights />
          </section>

          <section aria-label="خريطة مواقعنا" itemScope itemType="https://schema.org/Place">
            <MapSection />
          </section>
        </main>
      </article>

      {/* Hidden SEO content for better indexing */}
      <div className="sr-only">
        <h2>عقارات للبيع في السعودية</h2>
        <p>نهضة الخليج تقدم أفضل العقارات للبيع في المملكة العربية السعودية. فلل فاخرة، شقق عصرية، أراضي استثمارية في الرياض، جدة، الدمام، مكة المكرمة، والمدينة المنورة.</p>
        
        <h2>عقارات للإيجار</h2>
        <p>استكشف مجموعة واسعة من العقارات للإيجار. شقق مفروشة وغير مفروشة، فلل عائلية، مكاتب تجارية، ومحلات في أفضل المواقع.</p>
        
        <h2>مزادات عقارية</h2>
        <p>شارك في مزاداتنا العقارية الموثوقة واحصل على أفضل العروض. مزادات شفافة ومضمونة لجميع أنواع العقارات.</p>
        
        <h2>خدمات عقارية متكاملة</h2>
        <p>نقدم خدمات شاملة تشمل التقييم العقاري، الاستشارات العقارية، إدارة الممتلكات، والاستثمار العقاري.</p>
      </div>
    </>
  );
}