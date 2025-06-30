'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

interface Offer {
  _id: string;
  title: string;
  price: number;
  location: string;
  mainImage: string;
}

export default function LatestOffers() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const t = useTranslations('latestOffers');

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await fetch('/api/public/offers', { cache: 'no-store' });
        const data = await res.json();
        setOffers(data.all.slice(0, 6)); // Display only first 6 offers
      } catch (err) {
        console.error('Failed to load offers:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  return (
    <section id="latest-offers" className="py-16 border-t">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">{t('title')}</h2>
        <p className="text-center text-zinc-600 dark:text-zinc-400 mb-10">
          {t('description')}
        </p>

        {loading ? (
          <p className="text-center text-zinc-500">{t('loading')}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {offers.map((offer) => (
              <div
                key={offer._id}
                className="rounded-xl shadow hover:shadow-lg transition overflow-hidden"
              >
                <div className="relative h-56 w-full">
                  <Image
                    src={offer.mainImage}
                    alt={offer.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{offer.title}</h3>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-2">
                    {offer.location}
                  </p>
                  <p className="text-lg font-bold text-orange-600 mb-4">
                    ${offer.price.toLocaleString()}
                  </p>
                  <Link
                    href={`/offers/${offer._id}`}
                    className="inline-block text-sm font-medium text-blue-600 hover:underline"
                  >
                    {t('viewDetails')}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            href="/offers"
            className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
          >
            {t('viewAllOffers')}
          </Link>
        </div>
      </div>
    </section>
  );
}