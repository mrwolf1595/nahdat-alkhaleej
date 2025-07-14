'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Head from 'next/head';
import Testimonials from '../components/common/auction/Testimonials';

export default function ContactPage() {
  const t = useTranslations('contact');
  const tTestimonials = useTranslations('testimonials');

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  // Success message state
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Loading state for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Scroll animation trigger
  const [scrollY, setScrollY] = useState(0);
  
  // Handle scroll events for animation
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Office locations
  const officeLocations = [
    {
      name: t('info.mainOffice'),
      address: t('info.address'),
      phone: t('info.phone'),
      email: t('info.email'),
      hours: t('info.hours'),
    },
  ];

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      setShowSuccess(true);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // JSON-LD structured data for local business
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstate",
    "name": "شركة العقارات المتميزة",
    "description": "شركة عقارية متخصصة في بيع وشراء وإيجار العقارات في جدة والمملكة العربية السعودية",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "جدة، حي الصفا، شارع صالح الشرتوني 8280، الأمير متعب فرعي 2970",
      "addressLocality": "جدة",
      "addressRegion": "المنطقة الغربية",
      "postalCode": "23442",
      "addressCountry": "SA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "21.60015924568876",
      "longitude": "39.20115826962789"
    },
    "telephone": "+966599001723",
    "email": "nhdhalkhlyj@gmail.com",
    "openingHours": "Su-Th 09:00-18:00",
    "priceRange": "$$",
    "serviceArea": {
      "@type": "City",
      "name": "جدة"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "خدمات العقارات",
      "itemListElement": [
        {
          "@type": "Offer",
          "name": "بيع العقارات",
          "description": "خدمات بيع العقارات السكنية والتجارية"
        },
        {
          "@type": "Offer", 
          "name": "شراء العقارات",
          "description": "مساعدة في شراء العقارات المناسبة"
        },
        {
          "@type": "Offer",
          "name": "إيجار العقارات", 
          "description": "خدمات إيجار الشقق والفيلات"
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127"
    },
    "sameAs": [
      "https://www.facebook.com/realestate",
      "https://www.twitter.com/realestate",
      "https://www.instagram.com/realestate"
    ]
  };

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>تواصل معنا | شركة العقارات المتميزة في جدة | بيع وشراء العقارات</title>
        <meta name="title" content="تواصل معنا | شركة العقارات المتميزة في جدة | بيع وشراء العقارات" />
        <meta name="description" content="تواصل مع أفضل شركة عقارات في جدة. خدمات بيع وشراء وإيجار العقارات، شقق للبيع، فيلات للإيجار، أراضي تجارية. استشارة مجانية 966599001723" />
        <meta name="keywords" content="عقارات جدة، شقق للبيع جدة، فيلات للإيجار، أراضي تجارية، عقارات السعودية، بيع عقارات، شراء عقارات، إيجار عقارات، وسيط عقاري، استثمار عقاري، عقارات حي الصفا" />
        <meta name="author" content="شركة العقارات المتميزة" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="Arabic" />
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="web" />
        <meta name="rating" content="general" />
        
        {/* Geo Tags */}
        <meta name="geo.region" content="SA-02" />
        <meta name="geo.placename" content="جدة" />
        <meta name="geo.position" content="21.60015924568876;39.20115826962789" />
        <meta name="ICBM" content="21.60015924568876, 39.20115826962789" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://realestate.com/contact" />
        <meta property="og:title" content="تواصل معنا | أفضل شركة عقارات في جدة" />
        <meta property="og:description" content="تواصل مع خبراء العقارات في جدة. بيع وشراء وإيجار العقارات بأفضل الأسعار. استشارة مجانية الآن!" />
        <meta property="og:image" content="https://realestate.com/images/contact-hero.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="مكتب شركة العقارات في جدة" />
        <meta property="og:site_name" content="شركة العقارات المتميزة" />
        <meta property="og:locale" content="ar_SA" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://realestate.com/contact" />
        <meta property="twitter:title" content="تواصل معنا | أفضل شركة عقارات في جدة" />
        <meta property="twitter:description" content="تواصل مع خبراء العقارات في جدة. بيع وشراء وإيجار العقارات بأفضل الأسعار." />
        <meta property="twitter:image" content="https://realestate.com/images/contact-hero.jpg" />
        <meta property="twitter:image:alt" content="مكتب شركة العقارات في جدة" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="theme-color" content="#4F46E5" />
        <meta name="msapplication-TileColor" content="#4F46E5" />
        <meta name="application-name" content="شركة العقارات المتميزة" />
        <meta name="apple-mobile-web-app-title" content="العقارات المتميزة" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=966599001723" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://realestate.com/contact" />
        
        {/* Alternate Languages */}
        <link rel="alternate" hrefLang="ar" href="https://realestate.com/ar/contact" />
        <link rel="alternate" hrefLang="en" href="https://realestate.com/en/contact" />
        <link rel="alternate" hrefLang="x-default" href="https://realestate.com/contact" />
        
        {/* Structured Data */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        
        {/* Additional Business Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "صفحة التواصل - شركة العقارات المتميزة",
            "description": "تواصل مع فريق الخبراء لدينا للحصول على استشارة مجانية حول العقارات في جدة",
            "mainEntity": {
              "@type": "Organization",
              "name": "شركة العقارات المتميزة",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+966599001723",
                "contactType": "customer service",
                "areaServed": "SA",
                "availableLanguage": ["Arabic", "English"]
              }
            }
          })}
        </script>
      </Head>

      <div className="">
        {/* Hero Section with animated gradient background */}
        <section className="relative overflow-hidden py-24">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-90"></div>

          {/* Animated circles */}
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white opacity-10 animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 rounded-full bg-white opacity-10 animate-pulse"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 rounded-full bg-white opacity-10 animate-pulse"></div>

          <div className="container relative mx-auto px-4 text-center z-10">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
              {t('hero.title')} - شركة العقارات المتميزة في جدة
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-100 mb-8">
              خبراء العقارات في جدة | بيع وشراء وإيجار العقارات بأفضل الأسعار | استشارة مجانية
            </p>
            <div className="mt-8">
              <a 
                href="#contact-form" 
                className="inline-flex items-center px-8 py-4 bg-white font-medium rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300"
                aria-label="تواصل معنا للحصول على استشارة عقارية مجانية"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
                {t('hero.getInTouch')}
              </a>
            </div>
          </div>
        </section>

        {/* Contact Form and Info */}
        <section className="py-20" id="contact-form">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-gray-900">
                تواصل مع خبراء العقارات في جدة
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                نحن هنا لمساعدتك في العثور على العقار المثالي أو بيع عقارك بأفضل سعر في السوق
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-white p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <h3 className="text-2xl font-bold mb-8 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  {t('form.title')} - استشارة عقارية مجانية
                </h3>

                {/* Success Message */}
                {showSuccess && (
                  <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg mb-8" role="alert">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm text-green-700 font-medium">
                          {t('form.success')}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} itemScope itemType="https://schema.org/ContactForm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <label htmlFor="name" className="block font-medium mb-3">{t('form.name')}</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                          placeholder={t('form.namePlaceholder')}
                          autoComplete="name"
                          itemProp="name"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block font-medium mb-3">{t('form.email')}</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                          placeholder={t('form.emailPlaceholder')}
                          autoComplete="email"
                          itemProp="email"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <label htmlFor="phone" className="block font-medium mb-3">{t('form.phone')}</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                        placeholder={t('form.phonePlaceholder')}
                        autoComplete="tel"
                        itemProp="telephone"
                      />
                    </div>
                  </div>

                  <div className="mb-8">
                    <label htmlFor="subject" className="block font-medium mb-3">{t('form.subject')}</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                        </svg>
                      </div>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                        itemProp="subject"
                      >
                        <option value="">اختر نوع الاستفسار</option>
                        <option value="بيع عقار">بيع عقار</option>
                        <option value="شراء عقار">شراء عقار</option>
                        <option value="إيجار عقار">إيجار عقار</option>
                        <option value="استثمار عقاري">استثمار عقاري</option>
                        <option value="تقييم عقار">تقييم عقار</option>
                        <option value="استشارة عقارية">استشارة عقارية</option>
                        <option value="أخرى">أخرى</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-8">
                    <label htmlFor="message" className="block font-medium mb-3">{t('form.message')}</label>
                    <div className="relative">
                      <div className="absolute top-4 left-4 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </div>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="5"
                        className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                        placeholder="اكتب تفاصيل طلبك العقاري هنا..."
                        itemProp="message"
                      ></textarea>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-lg transition duration-300 flex justify-center items-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    aria-label="إرسال طلب الاستشارة العقارية"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {t('form.sending')}
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        {t('form.submit')} - احصل على استشارة مجانية
                      </>
                    )}
                  </button>
                </form>

                {/* Map Section */}
                <div className="mt-10 pt-8 border-t border-gray-200">
                  <h3 className="text-xl font-bold mb-6 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    {t('map.title')} - مكتبنا في جدة
                  </h3>
                  <div className="rounded-lg overflow-hidden shadow-lg h-64 bg-gray-200 mb-4">
                    <iframe
                      className="w-full h-full"
                      frameBorder="0"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3710.6947892345!2d39.20115826962789!3d21.60015924568876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDM2JzAwLjYiTiAzOcKwMTInMDYuNSJF!5e0!3m2!1sen!2ssa!4v1745360234218!5m2!1sen!2ssa"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      aria-hidden="false"
                      tabIndex="0"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="موقع مكتب شركة العقارات في جدة - حي الصفا"
                    ></iframe>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed">
                    {t('map.description')} - نحن في قلب جدة لخدمتك بأفضل الخدمات العقارية
                  </p>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-bold mb-8 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {t('info.title')} - شركة العقارات المتميزة
                </h2>

                {/* Service Highlights */}
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg mb-8">
                  <h3 className="text-lg font-semibold mb-4 text-indigo-800">خدماتنا العقارية المتميزة</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm">بيع وشراء العقارات</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm">إيجار الشقق والفيلات</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm">استثمار عقاري</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm">تقييم العقارات</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-indigo-100 p-3 rounded-full mr-4 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">عنوان المكتب الرئيسي</h4>
                      <span className="leading-relaxed text-gray-700">{t('info.address')}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-indigo-100 p-3 rounded-full mr-4 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">اتصل بنا الآن</h4>
                      <a href={`tel:+${t('info.phone')}`} className="text-indigo-600 hover:text-indigo-800 font-medium">
                        +{t('info.phone')}
                      </a>
                      <p className="text-sm text-gray-600 mt-1">خط مجاني - متاح 24/7</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-indigo-100 p-3 rounded-full mr-4 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">البريد الإلكتروني</h4>
                      <a href={`mailto:${t('info.email')}`} className="text-indigo-600 hover:text-indigo-800 font-medium">
                        {t('info.email')}
                      </a>
                      <p className="text-sm text-gray-600 mt-1">للاستفسارات والاستشارات المجانية</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-indigo-100 p-3 rounded-full mr-4 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">ساعات العمل</h4>
                      <span className="text-gray-700">{t('info.hours')}</span>
                      <p className="text-sm text-gray-600 mt-1">أيام الجمعة والسبت: بموعد مسبق</p>
                    </div>
                  </div>
                </div>

                {/* Why Choose Us Section */}
                <div className="mt-10 bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-4 text-gray-900">لماذا تختار شركة العقارات المتميزة؟</h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-700">خبرة تزيد عن 10 سنوات في السوق العقاري السعودي</span>
                    </div>
                    <div className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-700">فريق من الخبراء المعتمدين في العقارات</span>
                    </div>
                    <div className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-700">أسعار تنافسية وشفافية تامة في التعامل</span>
                    </div>
                    <div className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-700">خدمة عملاء متميزة ومتابعة مستمرة</span>
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <h3 className="text-xl font-bold mb-6 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    {t('social.title')} - تابعنا على وسائل التواصل
                  </h3>
                  <div className="flex space-x-6">
                    <a 
                      href="#" 
                      className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-4 rounded-full transition duration-300 hover:scale-110 shadow-lg"
                      aria-label="تابعنا على فيسبوك"
                    >
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a 
                      href="#" 
                      className="bg-gradient-to-r from-blue-400 to-blue-500 text-white p-4 rounded-full transition duration-300 hover:scale-110 shadow-lg"
                      aria-label="تابعنا على تويتر"
                    >
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                    <a 
                      href="#" 
                      className="bg-gradient-to-r from-pink-500 to-purple-500 text-white p-4 rounded-full transition duration-300 hover:scale-110 shadow-lg"
                      aria-label="تابعنا على إنستغرام"
                    >
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a 
                      href={`https://wa.me/${t('info.phone')}`}
                      className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-full transition duration-300 hover:scale-110 shadow-lg"
                      aria-label="تواصل معنا عبر الواتساب"
                    >
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* FAQ Section */}
                <div className="mt-10 bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-xl font-bold mb-4 text-gray-900">الأسئلة الشائعة</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">كيف يمكنني تقييم عقاري؟</h4>
                      <p className="text-sm text-gray-600">نقدم خدمة تقييم مجانية لعقارك من قبل خبراء معتمدين. اتصل بنا للحصول على تقييم دقيق وعادل.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">ما هي رسوم الوساطة العقارية؟</h4>
                      <p className="text-sm text-gray-600">نقدم أسعار تنافسية وشفافة. الرسوم تختلف حسب نوع العقار وقيمته. تواصل معنا للحصول على عرض سعر مخصص.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">هل تقدمون استشارات استثمارية؟</h4>
                      <p className="text-sm text-gray-600">نعم، لدينا فريق من الخبراء المتخصصين في الاستثمار العقاري لمساعدتك في اتخاذ القرارات الصحيحة.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Additional SEO Content Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                شركة العقارات الرائدة في جدة والمملكة العربية السعودية
              </h2>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                مع أكثر من عشر سنوات من الخبرة في السوق العقاري السعودي، نقدم خدمات شاملة في بيع وشراء وإيجار العقارات. 
                نحن نتخصص في العقارات السكنية والتجارية في جدة وجميع أنحاء المملكة، مع التركيز على تقديم أفضل الخدمات لعملائنا.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">شقق للبيع والإيجار</h3>
                  <p className="text-gray-600">شقق حديثة في أفضل الأحياء بجدة بأسعار مناسبة وتسهيلات دفع مرنة</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">فيلات وقصور فاخرة</h3>
                  <p className="text-gray-600">فيلات وقصور راقية في أرقى الأحياء مع جميع الخدمات والمرافق</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">عقارات تجارية</h3>
                  <p className="text-gray-600">محلات تجارية ومكاتب ومستودعات في المواقع الاستراتيجية</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Areas We Serve Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
                المناطق التي نخدمها في جدة
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
                  <h3 className="font-semibold text-gray-800 mb-2">حي الصفا</h3>
                  <p className="text-sm text-gray-600">عقارات راقية ومواقع متميزة</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
                  <h3 className="font-semibold text-gray-800 mb-2">حي الروضة</h3>
                  <p className="text-sm text-gray-600">شقق وفيلات حديثة</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
                  <h3 className="font-semibold text-gray-800 mb-2">حي المرجان</h3>
                  <p className="text-sm text-gray-600">عقارات استثمارية مميزة</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
                  <h3 className="font-semibold text-gray-800 mb-2">حي الزهراء</h3>
                  <p className="text-sm text-gray-600">أسعار تنافسية ومواقع جيدة</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
                  <h3 className="font-semibold text-gray-800 mb-2">حي البوادي</h3>
                  <p className="text-sm text-gray-600">عقارات للعائلات الكبيرة</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
                  <h3 className="font-semibold text-gray-800 mb-2">حي الواحة</h3>
                  <p className="text-sm text-gray-600">شقق وفيلات فاخرة</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
                  <h3 className="font-semibold text-gray-800 mb-2">حي الشاطئ</h3>
                  <p className="text-sm text-gray-600">إطلالات بحرية رائعة</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
                  <h3 className="font-semibold text-gray-800 mb-2">وسط البلد</h3>
                  <p className="text-sm text-gray-600">عقارات تجارية وسكنية</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                هل تبحث عن عقار مثالي في جدة؟
              </h2>
              <p className="text-xl text-gray-100 mb-8">
                تواصل معنا الآن للحصول على استشارة مجانية من خبراء العقارات لدينا
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href={`tel:+${t('info.phone')}`}
                  className="inline-flex items-center px-8 py-4 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  اتصل بنا الآن
                </a>
                <a 
                  href={`https://wa.me/${t('info.phone')}`}
                  className="inline-flex items-center px-8 py-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
                >
                  <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                  </svg>
                  واتساب
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      <Testimonials sectionTitle={tTestimonials('title')} />
    </>
  );
}