'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Camera, Image as ImageIcon, Trash2 } from 'lucide-react';

interface Props {
  mainImagePreview: string | null;
  galleryPreviews: string[];
  handleMainImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleGalleryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeGalleryImage: (index: number) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  galleryInputRef: React.RefObject<HTMLInputElement | null>;
  nextStep: () => void;
  prevStep: () => void;
}

export default function ImagesSection({
  mainImagePreview,
  galleryPreviews,
  handleMainImageChange,
  handleGalleryChange,
  removeGalleryImage,
  fileInputRef,
  galleryInputRef,
  nextStep,
  prevStep
}: Props) {
  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Image Gallery</h2>

      <div className="space-y-6">
        {/* Main Image Upload */}
        <motion.div
          whileHover={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="bg-indigo-100 p-3 rounded-full mb-3">
            <Camera className="h-8 w-8 text-indigo-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-1">Upload Main Image</h3>
          <p className="text-gray-500 text-center mb-4">Click to browse or drag and drop</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleMainImageChange}
            className="hidden"
          />
          {mainImagePreview && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mt-4 relative">
              <Image
                src={mainImagePreview}
                alt="Main Preview"
                width={300}
                height={200}
                className="rounded-lg shadow-md object-cover"
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <motion.div
                whileHover={{ backgroundColor: 'rgba(255, 0, 0, 0.8)' }}
                className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleMainImageChange({ target: { files: null } } as React.ChangeEvent<HTMLInputElement>);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </motion.div>
            </motion.div>
          )}
        </motion.div>

        {/* Gallery Upload */}
        <motion.div
          whileHover={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer"
          onClick={() => galleryInputRef?.current?.click()}        >
          <div className="bg-purple-100 p-3 rounded-full mb-3">
            <ImageIcon className="h-8 w-8 text-purple-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-1">Upload Gallery Images</h3>
          <p className="text-gray-500 text-center mb-4">Select multiple images for the gallery</p>
          <input
            ref={galleryInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleGalleryChange}
            className="hidden"
          />
        </motion.div>

        {/* Preview Gallery */}
        {galleryPreviews.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
            <h3 className="text-md font-medium text-gray-700 mb-3">Gallery Preview ({galleryPreviews.length} images)</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {galleryPreviews.map((src, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05, zIndex: 10 }}
                  className="relative rounded-lg overflow-hidden shadow-sm group"
                >
                  <Image src={src} alt={`Gallery ${i}`} width={120} height={120} className="w-full h-24 object-cover" />
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeGalleryImage(i)}
                      className="bg-red-500 text-white p-2 rounded-full"
                    >
                      <Trash2 className="h-4 w-4" />
                    </motion.button>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <div className="flex justify-between pt-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={prevStep}
          className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium flex items-center gap-2 shadow-md hover:bg-gray-300 transition-all duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={nextStep}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 shadow-md hover:bg-indigo-700 transition-all duration-200"
        >
          Next Step
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
}
