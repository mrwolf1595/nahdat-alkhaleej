'use client';

import { FaMapMarkerAlt, FaExternalLinkAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface Props {
  mapLink?: string;
}

export default function LocationButton({ mapLink }: Props) {
  const handleOpenMap = () => {
    if (mapLink && typeof window !== 'undefined') {
      window.open(mapLink, '_blank');
    }
  };

  return (
    <motion.button
      onClick={handleOpenMap}
      className="flex items-center gap-3 bg-gradient-to-r from-blue-500 to-violet-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
      aria-label="View on map"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          color: ["#ffffff", "#ffcc00", "#ffffff"]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <FaMapMarkerAlt className="text-xl" />
      </motion.div>
      <span className="font-medium tracking-wide">View on Map</span>
      <FaExternalLinkAlt className="text-sm opacity-70" />
    </motion.button>
  );
}