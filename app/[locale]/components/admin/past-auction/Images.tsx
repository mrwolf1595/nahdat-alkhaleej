'use client';

import { ChangeEvent, RefObject } from 'react';
import Image from 'next/image';
import { ImagePlus, Trash2 } from 'lucide-react';

interface Props {
  fileInputRef: RefObject<HTMLInputElement | null>;
  galleryInputRef: RefObject<HTMLInputElement | null>;
  mainImagePreview: string | null;
  galleryPreviews: string[];
  handleMainImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleGalleryChange: (e: ChangeEvent<HTMLInputElement>) => void;
  removeGalleryImage: (index: number) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export default function Images({
  fileInputRef,
  galleryInputRef,
  mainImagePreview,
  galleryPreviews,
  handleMainImageChange,
  handleGalleryChange,
  removeGalleryImage,
  nextStep,
  prevStep,
}: Props) {
  return (
    <div className="space-y-6">
      {/* Main Image */}
      <div>
        <label className="flex items-center gap-2 font-medium text-gray-700 mb-2">
          <ImagePlus className="h-5 w-5 text-blue-600" />
          Upload Main Image
        </label>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleMainImageChange}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="bg-indigo-600 text-white px-5 py-2 rounded-lg"
        >
          Choose Main Image
        </button>

        {mainImagePreview && (
          <div className="mt-4 relative w-72 h-40 rounded-lg overflow-hidden border">
            <Image
              src={mainImagePreview}
              alt="Main Image Preview"
              fill
              className="object-cover"
            />
          </div>
        )}
      </div>

      {/* Gallery Images */}
      <div>
        <label className="flex items-center gap-2 font-medium text-gray-700 mb-2">
          <ImagePlus className="h-5 w-5 text-blue-600" />
          Upload Gallery Images
        </label>

        <input
          type="file"
          accept="image/*"
          multiple
          ref={galleryInputRef}
          onChange={handleGalleryChange}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => galleryInputRef.current?.click()}
          className="bg-blue-500 text-white px-5 py-2 rounded-lg"
        >
          Choose Gallery Images
        </button>

        {galleryPreviews.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
            {galleryPreviews.map((src, index) => (
              <div key={index} className="relative w-full h-32 rounded-md overflow-hidden">
                <Image
                  src={src}
                  alt={`Gallery Preview ${index}`}
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeGalleryImage(index)}
                  className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6">
        <button
          type="button"
          onClick={prevStep}
          className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg"
        >
          Previous
        </button>

        <button
          type="button"
          onClick={nextStep}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
}
