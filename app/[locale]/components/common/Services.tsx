'use client';

import { Building2, Hammer, BadgeDollarSign } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function Services() {
  const t = useTranslations('services');
  
  const services = [
    {
      icon: <Building2 className="w-8 h-8 text-orange-600 dark:text-orange-400" />,
      title: t('propertyListings.title'),
      description: t('propertyListings.description'),
    },
    {
      icon: <BadgeDollarSign className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
      title: t('valuationServices.title'),
      description: t('valuationServices.description'),
    },
    {
      icon: <Hammer className="w-8 h-8 text-green-600 dark:text-green-400" />,
      title: t('propertyAuctions.title'),
      description: t('propertyAuctions.description'),
    },
  ];

  return (
    <section id="services" className="py-16 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">{t('title')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="border border-gray-200 dark:border-zinc-700 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 text-center"
            >
              <div className="mb-4 flex justify-center">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}