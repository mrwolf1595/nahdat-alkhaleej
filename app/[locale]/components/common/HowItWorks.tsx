'use client';

import { Search, Gavel, Handshake } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function HowItWorks() {
  const t = useTranslations('howItWorks');

  const steps = [
    {
      icon: <Search size={32} className="text-orange-600" />,
      title: t('steps.step1.title'),
      desc: t('steps.step1.description'),
    },
    {
      icon: <Gavel size={32} className="text-orange-600" />,
      title: t('steps.step2.title'),
      desc: t('steps.step2.description'),
    },
    {
      icon: <Handshake size={32} className="text-orange-600" />,
      title: t('steps.step3.title'),
      desc: t('steps.step3.description'),
    },
  ];

  return (
    <section className="py-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {t('title')}
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-12 max-w-2xl mx-auto">
          {t('description')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="rounded-xl p-6 shadow hover:shadow-lg transition"
            >
              <div className="flex justify-center mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-zinc-600 dark:text-zinc-400">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}