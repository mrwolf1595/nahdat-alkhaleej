'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PlusIcon, Loader2Icon } from 'lucide-react';
import OfferCard from '../../components/admin/offers/OfferCard';
import EmptyState from '../../components/admin/offers/EmptyState';

type Offer = {
  _id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  mainImage: string;
};

export default function AdminOffersPage() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await fetch('/api/admin/offers');
        const data = await res.json();
        setOffers(data);
      } catch (err) {
        console.error('Error fetching offers:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  const handleDelete = (id: string) => {
    const confirmed = confirm('Are you sure you want to delete this offer?');
    if (confirmed) {
      setOffers(prev => prev.filter(offer => offer._id !== id));
      // Later: Delete from MongoDB after adding DELETE API
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Manage Offers</h1>
        <Link
          href="/admin/offers/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all flex items-center shadow-sm"
        >
          <PlusIcon size={18} className="mr-1" />
          <span>Add New Offer</span>
        </Link>
      </motion.div>

      {loading ? (
        <div className="flex justify-center items-center h-60">
          <Loader2Icon size={40} className="text-blue-500 animate-spin" />
        </div>
      ) : offers.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {offers.map((offer) => (
            <OfferCard key={offer._id} offer={offer} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}