'use client'
import Image from 'next/image'
import React, { ChangeEvent } from 'react'

type Props = {
  galleryImages: File[]
  onAddImages: (images: File[]) => void
  onRemoveImage: (index: number) => void
  existingGallery?: string[]
  onRemoveExistingImage?: (idx: number) => void
}

export default function GalleryUploader({
  galleryImages,
  onAddImages,
  onRemoveImage,
}: Props) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files)
      onAddImages(newImages)
    }
  }

  return (
    <div>
      <label className="block font-semibold mb-1">Gallery Images</label>
      <div className="flex items-center gap-2 mb-2">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleChange}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
        <span className="text-sm text-gray-500">
          Select multiple images by holding Ctrl/Cmd
        </span>
      </div>

      {galleryImages.length > 0 && (
        <>
          <p className="text-sm text-gray-600 mb-2">
            {galleryImages.length} {galleryImages.length === 1 ? 'image' : 'images'} selected
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {galleryImages.map((img, idx) => (
              <div key={idx} className="relative w-full h-32 group">
                <Image
                  src={URL.createObjectURL(img)}
                  alt={`Gallery Preview ${idx}`}
                  fill
                  className="object-cover rounded shadow"
                />
                <button
                  type="button"
                  onClick={() => onRemoveImage(idx)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Remove image"
                >
                  ×
                </button>
                <span className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                  {img.name.length > 15 ? img.name.substring(0, 12) + '...' : img.name}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
