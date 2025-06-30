'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { AuctionFormData, PropertyType } from '@/types/auction';
import { FileText, Image as ImageIcon, Building, CheckCircle } from 'lucide-react';

interface Props {
  formData: AuctionFormData;
  mainImagePreview: string | null;
  galleryPreviews: string[];
  getPropertyIcon: (type: PropertyType) => React.ReactNode;
  prevStep: () => void;
  isSubmitting: boolean;
}

export default function ReviewSubmit({
  formData,
  mainImagePreview,
  galleryPreviews,
  getPropertyIcon,
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
      className="space-y-6"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Review Your Auction</h2>

      {/* Basic Info */}
      <motion.div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
        <h3 className="font-medium text-indigo-600 mb-2 flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Basic Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <div><p className="text-sm text-gray-500">Title</p><p className="font-medium">{formData.title || '—'}</p></div>
          <div><p className="text-sm text-gray-500">Auction Date</p><p className="font-medium">{formData.auctionDate || '—'}</p></div>
          <div><p className="text-sm text-gray-500">Auction Time</p><p className="font-medium">{formData.auctionTime || '—'}</p></div>
          <div><p className="text-sm text-gray-500">Starting Bid</p><p className="font-medium">{formData.startingBid || '—'}</p></div>
          <div><p className="text-sm text-gray-500">Featured</p><p className="font-medium">{formData.featured ? 'Yes' : 'No'}</p></div>
        </div>
        <div className="mt-3">
          <p className="text-sm text-gray-500">Description</p>
          <p className="text-gray-700">{formData.description || 'No description provided'}</p>
        </div>
      </motion.div>

      {/* Images */}
      <motion.div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
        <h3 className="font-medium text-purple-600 mb-2 flex items-center gap-2">
          <ImageIcon className="h-5 w-5" />
          Images
        </h3>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-500 mb-2">Main Image</p>
            {mainImagePreview ? (
              <Image src={mainImagePreview} alt="Main Preview" width={200} height={120} className="rounded-lg shadow-sm object-cover" />
            ) : (
              <p className="text-gray-500 italic">No main image uploaded</p>
            )}
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-2">Gallery Images ({galleryPreviews.length})</p>
            {galleryPreviews.length > 0 ? (
              <div className="flex gap-3 flex-wrap">
                {galleryPreviews.map((src, i) => (
                  <Image
                    key={i}
                    src={src}
                    alt={`Gallery ${i}`}
                    width={80}
                    height={80}
                    className="rounded-lg shadow-sm object-cover"
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No gallery images uploaded</p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Properties */}
      <motion.div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
        <h3 className="font-medium text-emerald-600 mb-2 flex items-center gap-2">
          <Building className="h-5 w-5" />
          Properties ({formData.properties.length})
        </h3>
        {formData.properties.length > 0 ? (
          <div className="space-y-6">
            {formData.properties.map((property, index) => (
              <div key={index} className="p-4 rounded-lg bg-gray-50 border border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  {getPropertyIcon(property.type)}
                  <h4 className="font-medium text-gray-800">
                    Property {index + 1}: {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
                  </h4>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                  <div><span className="text-gray-500">Area:</span> {property.area || '—'}</div>
                  <div><span className="text-gray-500">Price:</span> {property.price || '—'}</div>
                  {property.type !== 'land' && (
                    <>
                      <div><span className="text-gray-500">Bedrooms:</span> {property.bedrooms || '—'}</div>
                      <div><span className="text-gray-500">Bathrooms:</span> {property.bathrooms || '—'}</div>
                    </>
                  )}
                  <div><span className="text-gray-500">Map Link:</span> {property.mapLink || '—'}</div>
                </div>

                {/* ✅ عرض صور العقار */}
                {(property.images ?? []).length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-500 mb-1">Property Images ({(property.images ?? []).length})</p>
                    <div className="flex flex-wrap gap-2">
                      {(property.images ?? []).map((img, i) => (
                        <Image
                          key={i}
                          src={img.url}
                          alt={`Property ${index} Image ${i}`}
                          width={80}
                          height={80}
                          className="rounded-md object-cover"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">No properties added</p>
        )}
      </motion.div>

      {/* Buttons */}
      <div className="flex justify-between pt-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={prevStep}
          className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium"
        >
          Previous
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isSubmitting}
          className={`bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-lg font-medium flex items-center gap-2 shadow-md ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:from-green-600 hover:to-emerald-700'
          } transition-all duration-200`}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            <>
              Submit Auction
              <CheckCircle className="h-5 w-5" />
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}
