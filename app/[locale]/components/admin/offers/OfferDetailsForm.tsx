'use client'
import React from 'react'

type Props = {
  title: string
  description: string
  price: string
  location: string
  setTitle: (value: string) => void
  setDescription: (value: string) => void
  setPrice: (value: string) => void
  setLocation: (value: string) => void
}

export default function OfferDetailsForm({
  title,
  description,
  price,
  location,
  setTitle,
  setDescription,
  setPrice,
  setLocation,
}: Props) {
  return (
    <>
      <div>
        <label className="block font-semibold mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2"
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2"
          rows={4}
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2"
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Location</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2"
          required
        />
      </div>
    </>
  )
}
