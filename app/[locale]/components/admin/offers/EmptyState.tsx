'use client';

import { Package2Icon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-12 px-4"
    >
      <div className="bg-gray-100 p-6 rounded-full mb-4">
        <Package2Icon size={48} className="text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-1">No offers available</h3>
      <p className="text-sm text-gray-500 text-center max-w-sm">
        Add your first offer by clicking the &quot;Add New Offer&quot; button above.
      </p>
    </motion.div>
  );
}