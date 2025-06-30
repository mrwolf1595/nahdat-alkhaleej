'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Pencil, Trash2, MapPin, Calendar, Home } from 'lucide-react';
import { NewRecord } from '@/types/records';

interface RecordCardsProps {
  records: NewRecord[];
  onEdit: (record: NewRecord) => void;
  onDelete: (id: number | string) => void;
}

export function RecordCards({ records, onEdit, onDelete }: RecordCardsProps) {
  if (records.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-zinc-400 mt-10">
        No records found for the selected filters.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {records.map((record) => {
        const displayPrice =
          record.type === 'sales'
            ? record.soldPrice
            : record.type === 'evaluations'
            ? record.estimatedValue
            : record.type === 'auctions'
            ? record.startingBid
            : '';

        return (
          <motion.div
            key={record._id ?? record.id}
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden shadow-md bg-white dark:bg-zinc-900"
          >
            {/* الصورة */}
            {record.image ? (
              <div className="h-40 relative">
                <Image
                  src={record.image}
                  alt={record.property}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="h-40 flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 text-zinc-400 text-sm">
                No Image
              </div>
            )}

            {/* المعلومات */}
            <div className="p-4 space-y-2">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold text-sm">
                <Home className="w-4 h-4" />
                {record.property}
              </div>

              <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300 text-sm">
                <MapPin className="w-4 h-4" />
                {record.location}
              </div>

              <div className="text-sm text-zinc-500 dark:text-zinc-400">{record.propertyType}</div>

              <div className="font-bold text-lg text-green-600 dark:text-green-400">{displayPrice}</div>

              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <Calendar className="w-4 h-4" />
                {record.date}
              </div>

              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => onEdit(record)}
                  className="text-blue-600 hover:underline text-sm flex items-center gap-1"
                >
                  <Pencil size={14} />
                  Edit
                </button>
                <button
                  onClick={() => record._id && onDelete(record._id)}
                  className="text-red-600 hover:underline text-sm flex items-center gap-1"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
