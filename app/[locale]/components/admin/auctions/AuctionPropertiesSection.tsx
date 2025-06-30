'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { AuctionProperty, PropertyType } from '@/types/auction';
import {
  PlusCircle,
  Trash2,
  Award,
  Coffee,
  DollarSign,
  Map,
  MapPin,
  ImagePlus,
} from 'lucide-react';
import Image from 'next/image';

interface Props {
  properties: AuctionProperty[];
  handleAddProperty: () => void;
  handleRemoveProperty: (index: number) => void;
  handlePropertyChange: <K extends keyof AuctionProperty>(
    index: number,
    field: K,
    value: AuctionProperty[K]
  ) => void;
  handlePropertyImageUpdate: (index: number, files: File[]) => Promise<void>;
  getPropertyIcon: (type: PropertyType) => React.ReactNode;
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
  getPropertyIcon,
  nextStep,
  prevStep,
}: Props) {
  return (
    <motion.div
      key="step3"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Properties</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={handleAddProperty}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 shadow-md hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
        >
          <PlusCircle className="h-5 w-5" />
          Add Property
        </motion.button>
      </div>

      <AnimatePresence>
        {properties.map((property, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            transition={{ duration: 0.3 }}
            className="border rounded-lg overflow-hidden bg-white shadow-md"
          >
            <div className="flex items-center justify-between bg-gradient-to-r from-gray-50 to-gray-100 p-4 border-b">
              <div className="flex items-center gap-2">
                {getPropertyIcon(property.type)}
                <h3 className="font-medium text-gray-800">
                  Property {index + 1}: {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
                </h3>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="button"
                onClick={() => handleRemoveProperty(index)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <Trash2 className="h-5 w-5" />
              </motion.button>
            </div>

            <div className="p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <select
                    value={property.type}
                    onChange={(e) =>
                      handlePropertyChange(index, 'type', e.target.value as PropertyType)
                    }
                    className="pl-4 w-full py-3 border border-gray-300 rounded-lg"
                  >
                    <option value="land">Land</option>
                    <option value="apartment">Apartment</option>
                    <option value="villa">Villa</option>
                    <option value="building">Building</option>
                  </select>
                </div>

                <div className="relative">
                  <div className="absolute left-3 top-3 pointer-events-none">
                    <Map className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    placeholder="Area"
                    value={property.area}
                    onChange={(e) => handlePropertyChange(index, 'area', e.target.value)}
                    className="pl-10 w-full py-3 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              {property.type !== 'land' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <div className="absolute left-3 top-3 pointer-events-none">
                      <Award className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      placeholder="Bedrooms"
                      value={property.bedrooms || ''}
                      onChange={(e) =>
                        handlePropertyChange(index, 'bedrooms', parseInt(e.target.value))
                      }
                      className="pl-10 w-full py-3 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div className="relative">
                    <div className="absolute left-3 top-3 pointer-events-none">
                      <Coffee className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      placeholder="Bathrooms"
                      value={property.bathrooms || ''}
                      onChange={(e) =>
                        handlePropertyChange(index, 'bathrooms', parseInt(e.target.value))
                      }
                      className="pl-10 w-full py-3 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              )}

              <div className="relative">
                <div className="absolute left-3 top-3 pointer-events-none">
                  <Award className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  placeholder="Title"
                  value={property.title || ''}
                  onChange={(e) => handlePropertyChange(index, 'title', e.target.value)}
                  className="pl-10 w-full py-3 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="relative">
                <div className="absolute left-3 top-3 pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  placeholder="Map Link"
                  value={property.mapLink || ''}
                  onChange={(e) => handlePropertyChange(index, 'mapLink', e.target.value)}
                  className="pl-10 w-full py-3 border border-gray-300 rounded-lg"
                />
              </div>
              <input
                placeholder="Iframe Link"
                value={property.iframeLink || ''}
                onChange={(e) => handlePropertyChange(index, 'iframeLink', e.target.value)}
                className="pl-4 w-full py-3 border border-gray-300 rounded-lg"
              />


              <div className="relative">
                <div className="absolute left-3 top-3 pointer-events-none">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  placeholder="Price"
                  value={property.price || ''}
                  onChange={(e) => handlePropertyChange(index, 'price', e.target.value)}
                  className="pl-10 w-full py-3 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="relative">
                <div className="absolute top-3 left-3 pointer-events-none">
                  <Award className="h-5 w-5 text-gray-400" />
                </div>
                <textarea
                  placeholder="Featured Amenities (one per line)"
                  value={property.featuredAmenities?.join('\n') || ''}
                  onChange={(e) =>
                    handlePropertyChange(index, 'featuredAmenities', e.target.value.split('\n'))
                  }
                  className="pl-10 w-full py-3 border border-gray-300 rounded-lg"
                  rows={3}
                />
              </div>

              <div className="relative">
                <div className="absolute top-3 left-3 pointer-events-none">
                  <Coffee className="h-5 w-5 text-gray-400" />
                </div>
                <textarea
                  placeholder="Nearby Places (one per line)"
                  value={property.nearbyPlaces?.join('\n') || ''}
                  onChange={(e) =>
                    handlePropertyChange(index, 'nearbyPlaces', e.target.value.split('\n'))
                  }
                  className="pl-10 w-full py-3 border border-gray-300 rounded-lg"
                  rows={3}
                />
              </div>

              {/* ✅ صور العقار */}
              <div>
                <label className="flex items-center gap-2 font-medium text-gray-700 mb-1.5">
                  <ImagePlus className="h-5 w-5 text-blue-600" />
                  Upload Property Images
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    if (files.length) handlePropertyImageUpdate(index, files);
                  }}
                  className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg file:bg-indigo-600 file:text-white file:px-4 file:py-2 file:rounded-md"
                />
                {(property.images ?? []).length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-3">
                    {(property.images ?? []).map((img, i) => (
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
          </motion.div>
        ))}
      </AnimatePresence>

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
          type="button"
          onClick={nextStep}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium"
        >
          Review
        </motion.button>
      </div>
    </motion.div>
  );
}
