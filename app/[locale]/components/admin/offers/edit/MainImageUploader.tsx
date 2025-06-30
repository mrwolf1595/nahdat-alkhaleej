'use client';

import { FC, ChangeEvent, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

interface MainImageUploaderProps {
  mainImage: File | null;
  existingMainImage: string;
  onChange: (file: File) => void;
}

const MainImageUploader: FC<MainImageUploaderProps> = ({
  mainImage,
  existingMainImage,
  onChange,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Create and manage preview URL
  useEffect(() => {
    let url: string | null = null;
    
    if (mainImage) {
      url = URL.createObjectURL(mainImage);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }

    return () => {
      if (url) {
        URL.revokeObjectURL(url);
      }
    };
  }, [mainImage]);

  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file);
    }
  }, [onChange]);

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
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        onChange(file);
      }
    }
  }, [onChange]);

  const handleRemoveImage = useCallback(() => {
    onChange(new File([], '', { type: 'image/png' }));
  }, [onChange]);

  const hasImage = Boolean(previewUrl || existingMainImage);
  const imageToDisplay = previewUrl || existingMainImage;

  return (
    <div className="space-y-4">
      <label className="flex items-center gap-2 font-medium text-gray-700 mb-1.5">
        <ImageIcon size={16} className="text-blue-600" />
        <span>Main Image</span>
      </label>

      {!hasImage ? (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-all cursor-pointer h-48
          ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById('main-image-upload')?.click()}
        >
          <input
            id="main-image-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <Upload className="mx-auto h-10 w-10 text-gray-400 mb-2" />
          <p className="text-sm font-medium text-gray-700">
            {isDragging ? 'Drop image here' : 'Drag and drop main image here'}
          </p>
          <p className="text-xs text-gray-500 mt-1">or click to browse files</p>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="relative rounded-lg overflow-hidden shadow-md border border-gray-200 group"
        >
          <div className="aspect-[16/9] relative">
            <Image
              src={imageToDisplay}
              alt="Main Image Preview"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority={true}
            />
          </div>
          
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-200" />
          
          <div className="absolute bottom-0 left-0 right-0 p-3 flex justify-between items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              className="text-xs bg-white py-1 px-3 rounded-full shadow-md text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => document.getElementById('main-image-upload')?.click()}
            >
              Change Image
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              className="bg-white text-red-600 rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={handleRemoveImage}
            >
              <X size={16} />
            </motion.button>
          </div>
          
          <input
            id="main-image-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </motion.div>
      )}
    </div>
  );
};

export default MainImageUploader;