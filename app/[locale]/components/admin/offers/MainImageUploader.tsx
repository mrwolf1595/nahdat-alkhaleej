'use client'
import Image from 'next/image'
import React, { ChangeEvent } from 'react'

type Props = {
  mainImage: File | null
  existingImage?: string
  onChange: (file: File) => void
}

export default function MainImageUploader({ mainImage, onChange }: Props) {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onChange(e.target.files[0])
    }
  }

  return (
    <div>
      <label className="block font-semibold mb-1">Main Image</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-md file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100"
      />

      {mainImage && (
        <div className="mt-4 relative w-48 h-32">
          <Image
            src={URL.createObjectURL(mainImage)}
            alt="Main Preview"
            fill
            className="object-cover rounded shadow"
          />
        </div>
      )}
    </div>
  )
}
