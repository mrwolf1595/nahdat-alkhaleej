'use client';

import { FC, ChangeEvent, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, ImagePlus } from 'lucide-react';
import Image from 'next/image';

interface GalleryUploaderProps {
  existingGallery: string[];
  newGallery: File[];
  onAddImages: (files: File[]) => void;
  onRemoveExisting: (index: number) => void;
  onRemoveNew: (index: number) => void;
}

const GalleryUploader: FC<GalleryUploaderProps> = ({
  existingGallery,
  newGallery,
  onAddImages,
  onRemoveExisting,
  onRemoveNew,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [newImageUrls, setNewImageUrls] = useState<string[]>([]);
  const [imageLoadErrors, setImageLoadErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const urls = newGallery.map((file) => URL.createObjectURL(file));
    setNewImageUrls(urls);
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [newGallery]);

  const handleGalleryChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    onAddImages(files);
  }, [onAddImages]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files).filter((file) => file.type.startsWith('image/'));
    onAddImages(files);
  }, [onAddImages]);

  const handleImageError = useCallback((key: string) => {
    setImageLoadErrors((prev) => ({ ...prev, [key]: true }));
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: 'spring', stiffness: 200, damping: 15 },
    },
    exit: { scale: 0.8, opacity: 0, transition: { duration: 0.2 } },
  };

  return (
    <div className="space-y-4">
      <label className="flex items-center gap-2 font-medium text-gray-700 mb-1.5">
        <ImagePlus size={16} className="text-blue-600" />
        <span>Gallery Images</span>
      </label>

      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-all cursor-pointer ${
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById('gallery-upload')?.click()}
      >
        <input
          id="gallery-upload"
          type="file"
          multiple
          accept="image/*"
          onChange={handleGalleryChange}
          className="hidden"
        />
        <Upload className="mx-auto h-10 w-10 text-gray-400 mb-2" />
        <p className="text-sm font-medium text-gray-700">
          {isDragging ? 'Drop images here' : 'Drag and drop images here'}
        </p>
        <p className="text-xs text-gray-500 mt-1">or click to browse files</p>
      </div>

      <AnimatePresence>
        {(existingGallery.length > 0 || newGallery.length > 0) && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
          >
            {existingGallery.map((img, idx) => (
              <motion.div
                key={`existing-${idx}`}
                variants={itemVariants}
                exit="exit"
                layout
                className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 group"
              >
                <div className="relative w-full h-full min-h-[120px]">
                  {imageLoadErrors[`existing-${idx}`] ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500 text-xs">
                      Image error
                    </div>
                  ) : (
                    <Image
                      src={img}
                      alt={`Gallery ${idx}`}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                      className="object-cover transition-transform group-hover:scale-105"
                      onError={() => handleImageError(`existing-${idx}`)}
                      priority={idx < 4}
                    />
                  )}
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={() => onRemoveExisting(idx)}
                  className="absolute top-2 right-2 bg-white text-red-600 rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={16} />
                </motion.button>
              </motion.div>
            ))}

            {newGallery.map((file, idx) => (
              <motion.div
                key={`new-${idx}`}
                variants={itemVariants}
                exit="exit"
                layout
                className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 group"
              >
                <div className="relative w-full h-full min-h-[120px]">
                  {newImageUrls[idx] && !imageLoadErrors[`new-${idx}`] ? (
                    <Image
                      src={newImageUrls[idx]}
                      alt={`New ${idx}`}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                      className="object-cover transition-transform group-hover:scale-105"
                      onError={() => handleImageError(`new-${idx}`)}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500 text-xs">
                      Image error
                    </div>
                  )}
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={() => onRemoveNew(idx)}
                  className="absolute top-2 right-2 bg-white text-red-600 rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={16} />
                </motion.button>
                <div className="absolute bottom-0 left-0 right-0 bg-blue-600 py-1 px-2 text-xs text-white text-center">
                  New
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryUploader;
