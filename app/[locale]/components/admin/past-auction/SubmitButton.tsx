'use client';

import { PastAuctionFormData } from '@/types/PastAuction';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Props {
  formData: PastAuctionFormData;
  mainImagePreview: string | null;
  galleryPreviews: string[];
  prevStep: () => void;
  isSubmitting: boolean;
}

export default function ReviewSubmit({
  formData,
  mainImagePreview,
  galleryPreviews,
  prevStep,
  isSubmitting,
}: Props) {
  return (
    <motion.div
      key="step4"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <h2 className="text-2xl font-bold text-gray-800">Review Your Auction</h2>

      {/* Basic Info */}
      <div className="bg-white p-6 rounded-lg border shadow-sm space-y-3">
        <h3 className="text-lg font-semibold text-gray-700">Basic Information</h3>
        <p><strong>Title:</strong> {formData.title}</p>
        <p><strong>Description:</strong> {formData.description}</p>
        <p><strong>Date:</strong> {formData.auctionDate}</p>
        <p><strong>Time:</strong> {formData.auctionTime}</p>
        <p><strong>Location:</strong> {formData.location}</p>
        {formData.mapLink && (
          <p><strong>Map Link:</strong> {formData.mapLink}</p>
        )}
      </div>

      {/* Main Image & Gallery */}
      <div className="bg-white p-6 rounded-lg border shadow-sm space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Images</h3>

        <div>
          <p className="font-medium text-sm text-gray-600 mb-1">Main Image</p>
          {mainImagePreview && (
            <Image
              src={mainImagePreview}
              alt="Main Image"
              width={300}
              height={180}
              className="rounded-lg object-cover border"
            />
          )}
        </div>

        <div>
          <p className="font-medium text-sm text-gray-600 mb-1">Gallery ({galleryPreviews.length})</p>
          <div className="flex flex-wrap gap-2">
            {galleryPreviews.map((img, i) => (
              <Image
                key={i}
                src={img}
                alt={`Gallery ${i}`}
                width={100}
                height={100}
                className="rounded-md object-cover border"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Properties */}
      <div className="bg-white p-6 rounded-lg border shadow-sm space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Properties</h3>

        {formData.properties.map((property, index) => (
          <div key={index} className="border p-4 rounded-md space-y-2 bg-gray-50">
            <p><strong>Type:</strong> {property.type}</p>
            <p><strong>Area:</strong> {property.area}</p>
            <p><strong>Price:</strong> {property.price || '—'}</p>
            {property.bedrooms !== undefined && (
              <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
            )}
            {property.bathrooms !== undefined && (
              <p><strong>Bathrooms:</strong> {property.bathrooms}</p>
            )}
            <p><strong>Sold:</strong> {property.sold ? '✅ Yes' : '❌ No'}</p>
            {property.mapLink && <p><strong>Map Link:</strong> {property.mapLink}</p>}
            {property.iframeLink && <p><strong>Iframe Link:</strong> {property.iframeLink}</p>}

            {/* صور العقار */}
            {Array.isArray(property.images) && property.images.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {property.images.map((img, i) => (
                  <Image
                    key={i}
                    src={img.url}
                    alt={`Property ${index} Image ${i}`}
                    width={80}
                    height={80}
                    className="rounded-md object-cover border"
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex justify-between pt-6">
        <button
          type="button"
          onClick={prevStep}
          className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg"
        >
          Previous
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`bg-green-600 text-white px-8 py-3 rounded-lg font-medium ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-green-700'
          } transition`}
        >
          {isSubmitting ? 'Submitting...' : 'Create Auction'}
        </button>
      </div>
    </motion.div>
  );
}
