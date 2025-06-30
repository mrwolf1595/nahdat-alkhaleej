'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PencilIcon, TrashIcon } from 'lucide-react';

type OfferCardProps = {
  offer: {
    _id: string;
    title: string;
    description: string;
    price: number;
    location: string;
    mainImage: string;
  };
  onDelete: (id: string) => void;
};

export default function OfferCard({ offer, onDelete }: OfferCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col h-full"
    >
      <div className="relative w-full h-48">
        <Image
          src={offer.mainImage}
          alt={offer.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-2 left-2 flex items-center text-white">
          <span className="text-sm font-medium">{offer.location}</span>
        </div>
        <div className="absolute bottom-2 right-2 flex items-center text-white">
          <span className="text-sm font-bold">${offer.price}</span>
        </div>
      </div>

      <div className="p-4 flex-grow">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">{offer.title}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{offer.description}</p>

        <div className="flex justify-between mt-auto">
          <Link
            href={`/admin/offers/edit/${offer._id}`}
            className="flex items-center text-blue-600 hover:text-blue-800 transition"
          >
            <PencilIcon size={16} className="mr-1" />
            <span>Edit</span>
          </Link>
          <button
            onClick={() => onDelete(offer._id)}
            className="flex items-center text-red-600 hover:text-red-800 transition"
          >
            <TrashIcon size={16} className="mr-1" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}