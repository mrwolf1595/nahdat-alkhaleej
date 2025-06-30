import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaImages, FaExpand, FaTimes } from 'react-icons/fa';
import { useTranslations } from 'next-intl';

interface AuctionInfoCardProps {
  title: string;
  gallery: string[];
}

export default function AuctionInfoCard({ title, gallery }: AuctionInfoCardProps) {
  const t = useTranslations('auctionId.detail.imageGallery');
  
  const galleryRef = useRef<HTMLDivElement>(null);
  const [expandedImage, setExpandedImage] = useState<number | null>(null);
  
  const goToImage = (index: number) => {
    // This function can be extended if needed
    console.log(`Navigate to image: ${index}`);
    setExpandedImage(index);
  };

  const closeExpandedImage = () => {
    setExpandedImage(null);
  };

  return (
    <motion.div
      initial={{ x: -30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.4 }}
      className="mb-8"
    >
      <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
        <span className="bg-gradient-to-r from-purple-100 to-indigo-100 text-indigo-700 p-2 rounded-lg mr-3 shadow-sm">
          <FaImages className="w-5 h-5" />
        </span>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          {title}
        </span>
      </h3>
      
      <div 
        ref={galleryRef}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6 overflow-x-auto"
      >
        {gallery?.map((image, idx) => (
          <motion.div
            key={idx}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.2), 0 8px 10px -6px rgba(79, 70, 229, 0.1)"
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="relative rounded-xl overflow-hidden cursor-pointer h-24 sm:h-28 group"
            onClick={() => goToImage(idx)}
          >
            <Image
              src={image}
              alt={`Thumbnail ${idx + 1}`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-2">
              <motion.div 
                initial={{ y: 10, opacity: 0 }}
                whileHover={{ y: 0, opacity: 1 }}
                className="text-white text-xs font-medium bg-indigo-600/80 backdrop-blur-sm px-2 py-1 rounded-full"
              >
                <FaExpand className="inline-block mr-1" size={10} />
                {t('expandImage')}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Expanded image modal */}
      <AnimatePresence>
        {expandedImage !== null && gallery && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={closeExpandedImage}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-w-4xl w-full max-h-[80vh] rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[70vh]">
                <Image
                  src={gallery[expandedImage]}
                  alt={`Gallery Image ${expandedImage + 1}`}
                  fill
                  className="object-contain"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: "rgba(239, 68, 68, 1)" }}
                className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full"
                onClick={closeExpandedImage}
              >
                <FaTimes />
              </motion.button>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent py-4 px-6 text-white">
                <p className="text-lg font-medium">
                  {t('imageCounter').replace('{current}', String(expandedImage + 1)).replace('{total}', String(gallery.length))}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}