'use client';

import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

interface NearbyPlacesProps {
  places: string[];
}

const NearbyPlaces = ({ places }: NearbyPlacesProps) => {
  return (
    <div className="space-y-3 sm:space-y-5">
      {places.map((place, index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 + index * 0.05 }}
          className="flex items-start hover:bg-white/50 dark:hover:bg-slate-700/50 p-2 rounded-lg transition-colors duration-200"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white dark:bg-slate-700 flex items-center justify-center text-sky-500 dark:text-sky-400 ms-0 me-8 sm:me-10 flex-shrink-0 shadow-sm">
            <MapPin size={18} />
          </div>
          <div className="flex-1 min-w-0 py-1 ps-2">
            <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-400 break-words font-semibold hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-200">
              {place}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default NearbyPlaces;