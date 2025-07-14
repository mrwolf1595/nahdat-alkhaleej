import { Metadata } from 'next';
import AboutPage from '../components/common/about/AboutPage';

export const metadata = {
  title: 'من نحن - نهضة الخليج | شركة عقارية رائدة في السعودية منذ 2020',
  description: 'تعرف على نهضة الخليج، الشركة الرائدة في مجال العقارات في السعودية منذ 2010. فريق محترف، خبرة واسعة، وخدمات عقارية متكاملة في جميع أنحاء المملكة.',
  keywords: [
    'نهضة الخليج',
    'شركة عقارات السعودية',
    'من نحن',
    'تاريخ الشركة',
    'خبرة عقارية',
    'فريق عقاري محترف',
    'مؤسسة عقارية',
    'شركة عقارية موثوقة',
    'خدمات عقارية متكاملة',
    'استثمار عقاري السعودية',
    'وسيط عقاري معتمد',
    'سمسار عقارات محترف',
    'About Nahdat Al Khaleej',
    'Real estate company Saudi',
    'Professional real estate team',
    'Trusted real estate services'
  ].join(', '),
  openGraph: {
    title: 'من نحن - نهضة الخليج | رواد العقارات في السعودية',
    description: 'اكتشف قصة نجاح نهضة الخليج في مجال العقارات. أكثر من 10 سنوات من الخبرة والتميز في خدمة عملائنا.',
    url: 'https://nahdatalkhaleej.com/about',
    siteName: 'نهضة الخليج',
    images: [
      {
        url: '/images/about-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'فريق نهضة الخليج العقاري',
      }
    ],
    locale: 'ar_SA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'من نحن - نهضة الخليج | رواد العقارات في السعودية',
    description: 'اكتشف قصة نجاح نهضة الخليج في مجال العقارات. أكثر من 10 سنوات من الخبرة والتميز.',
    images: ['/images/about-twitter-image.jpg'],
  },
  alternates: {
    canonical: 'https://nahdatalkhaleej.com/about',
    languages: {
      'ar-SA': 'https://nahdatalkhaleej.com/ar/about',
      'en-US': 'https://nahdatalkhaleej.com/en/about',
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function Page() {
  return (
    <>
      {/* Structured Data for About Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "mainEntity": {
              "@type": "Organization",
              "name": "نهضة الخليج للاستثمار العقاري",
              "alternateName": "Nahdat Al Khaleej Real Estate",
              "foundingDate": "2010",
              "description": "شركة رائدة في مجال العقارات في المملكة العربية السعودية، تقدم خدمات شاملة في بيع وإيجار العقارات والمزادات العقارية والاستثمار العقاري.",
              "url": "https://nahdatalkhaleej.com",
              "logo": "https://nahdatalkhaleej.com/logo.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+966-XX-XXX-XXXX",
                "contactType": "customer service",
                "areaServed": "SA",
                "availableLanguage": ["Arabic", "English"]
              },
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "شارع الملك عبدالعزيز",
                "addressLocality": "جدة",
                "addressRegion": "منطقة مكة المكرمة",
                "postalCode": "21589",
                "addressCountry": "SA"
              },
              "serviceArea": {
                "@type": "Country",
                "name": "Saudi Arabia"
              },
              "knowsAbout": [
                "بيع العقارات",
                "إيجار العقارات", 
                "المزادات العقارية",
                "الاستثمار العقاري",
                "التقييم العقاري",
                "إدارة الممتلكات",
                "الاستشارات العقارية"
              ],
              "slogan": "شريكك الموثوق في عالم العقارات",
              "foundingLocation": {
                "@type": "Place",
                "name": "جدة، المملكة العربية السعودية"
              },
              "numberOfEmployees": {
                "@type": "QuantitativeValue",
                "value": "50+"
              },
              "award": [
                "أفضل شركة عقارية في المنطقة الغربية 2022",
                "جائزة التميز في خدمة العملاء 2021",
                "شهادة الجودة العقارية 2020"
              ]
            }
          })
        }}
      />

      {/* Company Timeline Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "تاريخ نهضة الخليج",
            "description": "المعالم المهمة في مسيرة شركة نهضة الخليج العقارية",
            "itemListElement": [
              {
                "@type": "Event",
                "position": 1,
                "name": "تأسيس الشركة",
                "startDate": "2010",
                "description": "تأسيس شركة نهضة الخليج للاستثمار العقاري في جدة"
              },
              {
                "@type": "Event", 
                "position": 2,
                "name": "التوسع الأول",
                "startDate": "2015",
                "description": "افتتاح فروع جديدة في الرياض والدمام"
              },
              {
                "@type": "Event",
                "position": 3, 
                "name": "دخول المزادات العقارية",
                "startDate": "2018",
                "description": "بداية خدمات المزادات العقارية المتخصصة"
              },
              {
                "@type": "Event",
                "position": 4,
                "name": "التحول الرقمي",
                "startDate": "2020", 
                "description": "إطلاق المنصة الإلكترونية الشاملة للخدمات العقارية"
              }
            ]
          })
        }}
      />

      {/* Team Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "فريق نهضة الخليج",
            "member": [
              {
                "@type": "Person",
                "name": "المدير التنفيذي",
                "jobTitle": "الرئيس التنفيذي",
                "knowsAbout": ["إدارة الشركات", "الاستثمار العقاري", "التطوير العقاري"],
                "memberOf": {
                  "@type": "Organization",
                  "name": "نهضة الخليج للاستثمار العقاري"
                }
              },
              {
                "@type": "Person", 
                "name": "فريق المبيعات",
                "jobTitle": "مختصو المبيعات العقارية",
                "knowsAbout": ["بيع العقارات", "التسويق العقاري", "خدمة العملاء"],
                "memberOf": {
                  "@type": "Organization",
                  "name": "نهضة الخليج للاستثمار العقاري"
                }
              },
              {
                "@type": "Person",
                "name": "فريق التقييم",
                "jobTitle": "مقيمو عقاريون معتمدون", 
                "knowsAbout": ["التقييم العقاري", "تحليل السوق", "دراسة الجدوى"],
                "memberOf": {
                  "@type": "Organization",
                  "name": "نهضة الخليج للاستثمار العقاري"
                }
              }
            ]
          })
        }}
      />

      <AboutPage />
    </>
  );
}