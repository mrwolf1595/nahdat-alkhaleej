'use client';

import { PastAuctionProperty, PropertyType } from '@/types/PastAuction';
import { Plus, Trash2, ImagePlus } from 'lucide-react';
import Image from 'next/image';

interface Props {
  properties: PastAuctionProperty[];
  handleAddProperty: () => void;
  handleRemoveProperty: (index: number) => void;
  handlePropertyChange: <K extends keyof PastAuctionProperty>(
    index: number,
    field: K,
    value: PastAuctionProperty[K]
  ) => void;
  handlePropertyImageUpdate: (index: number, files: File[]) => void;
  nextStep: () => void;
  prevStep: () => void;
  auctionTitle: string;
}

export default function AuctionPropertiesSection({
  properties,
  handleAddProperty,
  handleRemoveProperty,
  handlePropertyChange,
  handlePropertyImageUpdate,
  nextStep,
  prevStep,
}: Props) {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-800">Properties ({properties.length})</h3>
        <button
          type="button"
          onClick={handleAddProperty}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          <Plus size={18} />
          Add Property
        </button>
      </div>

      {properties.map((property, index) => (
        <div
          key={index}
          className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm space-y-4"
        >
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-lg font-semibold text-gray-700">
              Property #{index + 1} - {property.type}
            </h4>
            <button
              type="button"
              onClick={() => handleRemoveProperty(index)}
              className="text-red-500 hover:text-red-600"
            >
              <Trash2 size={18} />
            </button>
          </div>

          {/* النوع والمساحة */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              value={property.type}
              onChange={(e) =>
                handlePropertyChange(index, 'type', e.target.value as PropertyType)
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            >
              <option value="land">Land</option>
              <option value="apartment">Apartment</option>
              <option value="villa">Villa</option>
              <option value="building">Building</option>
            </select>

            <input
              type="text"
              placeholder="Area"
              value={property.area}
              onChange={(e) => handlePropertyChange(index, 'area', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          {/* السعر - الغرف - الحمامات */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Price"
              value={property.price || ''}
              onChange={(e) => handlePropertyChange(index, 'price', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />

            {property.type !== 'land' && (
              <>
                <input
                  type="number"
                  placeholder="Bedrooms"
                  value={property.bedrooms || ''}
                  onChange={(e) =>
                    handlePropertyChange(index, 'bedrooms', parseInt(e.target.value))
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
                <input
                  type="number"
                  placeholder="Bathrooms"
                  value={property.bathrooms || ''}
                  onChange={(e) =>
                    handlePropertyChange(index, 'bathrooms', parseInt(e.target.value))
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </>
            )}
          </div>
          <input
  type="text"
  placeholder="Location"
  value={property.location}
  onChange={(e) => handlePropertyChange(index, 'location', e.target.value)}
  className="w-full border border-gray-300 rounded-lg px-4 py-2"
/>


          {/* Map / iframe */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Map Link"
              value={property.mapLink || ''}
              onChange={(e) => handlePropertyChange(index, 'mapLink', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
            <input
              type="text"
              placeholder="Iframe Link"
              value={property.iframeLink || ''}
              onChange={(e) => handlePropertyChange(index, 'iframeLink', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {/* Featured Amenities */}
  <div>
    <label className="block text-gray-700 text-sm font-medium mb-1">Featured Amenities</label>
    <textarea
      rows={3}
      placeholder="Each feature on a new line"
      value={property.featuredAmenities?.join('\n') || ''}
      onChange={(e) =>
        handlePropertyChange(index, 'featuredAmenities', e.target.value.split('\n'))
      }
      className="w-full border border-gray-300 rounded-lg px-4 py-2"
    />
  </div>

  {/* Nearby Places */}
  <div>
    <label className="block text-gray-700 text-sm font-medium mb-1">Nearby Places</label>
    <textarea
      rows={3}
      placeholder="Each place on a new line"
      value={property.nearbyPlaces?.join('\n') || ''}
      onChange={(e) =>
        handlePropertyChange(index, 'nearbyPlaces', e.target.value.split('\n'))
      }
      className="w-full border border-gray-300 rounded-lg px-4 py-2"
    />
  </div>
</div>


          {/* sold ✅ */}
          <div>
            <label className="flex items-center gap-3 text-gray-700">
              <input
                type="checkbox"
                checked={property.sold}
                onChange={(e) =>
                  handlePropertyChange(index, 'sold', e.target.checked)
                }
                className="w-5 h-5 text-indigo-600"
              />
              Mark as Sold
            </label>
          </div>

          {/* الصور */}
          <div>
            <label className="flex items-center gap-2 font-medium text-gray-700 mb-2">
              <ImagePlus className="h-5 w-5 text-blue-600" />
              Upload Property Images
            </label>

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) =>
                handlePropertyImageUpdate(index, Array.from(e.target.files || []))
              }
              className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg file:bg-indigo-600 file:text-white file:px-4 file:py-2 file:rounded-md"
            />

{Array.isArray(property.images) && property.images.length > 0 && (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-3">
    {property.images.map((img, i) => (
      <Image
        key={i}
        src={img.url}
        alt={`Property ${index} Image ${i}`}
        width={120}
        height={120}
        className="rounded-lg object-cover"
      />
    ))}
  </div>
)}
          </div>
        </div>
      ))}

      {/* أزرار التنقل */}
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
