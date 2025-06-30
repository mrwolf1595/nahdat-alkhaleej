'use client';

import { PastAuctionProperty } from '@/types/PastAuction';
import Link from 'next/link';
import { FaMapMarkerAlt, FaBed, FaBath } from 'react-icons/fa';
import { BsArrowsFullscreen } from 'react-icons/bs';
import Image from 'next/image';
interface Props {
  properties: PastAuctionProperty[];
  auctionId: string;
}

export default function PastPropertyCards({ properties, auctionId }: Props) {
  if (!properties || properties.length === 0) return null;

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-indigo-100 space-y-10 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-indigo-800">Properties in this Auction</h2>

      {properties.map((property, index) => (
        <div
          key={index}
          className="rounded-xl border border-gray-200 p-6 shadow-md bg-gradient-to-br from-gray-50 to-indigo-50 space-y-4"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-white bg-indigo-600 px-3 py-1 rounded">
              {property.type.toUpperCase()}
            </span>
            {property.price && (
              <span className="text-indigo-700 font-bold">{property.price} SAR</span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
            <p className="flex items-center gap-2"><BsArrowsFullscreen className="text-blue-500" /> Area: {property.area} m²</p>
            <p className="flex items-center gap-2"><FaMapMarkerAlt className="text-blue-500" /> {property.location}</p>
            {property.bedrooms !== undefined && (
              <p className="flex items-center gap-2"><FaBed className="text-blue-500" /> Bedrooms: {property.bedrooms}</p>
            )}
            {property.bathrooms !== undefined && (
              <p className="flex items-center gap-2"><FaBath className="text-blue-500" /> Bathrooms: {property.bathrooms}</p>
            )}
          </div>

          {/* Featured Amenities */}
          {property.featuredAmenities && property.featuredAmenities.length > 0 && (
            <div>
              <h4 className="text-indigo-600 font-semibold mt-4">Amenities</h4>
              <div className="flex flex-wrap gap-2 mt-2">
                {property.featuredAmenities.filter(Boolean).map((item, i) => (
                  <span key={i} className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Nearby Places */}
          {property.nearbyPlaces && property.nearbyPlaces.length > 0 && (
            <div>
              <h4 className="text-indigo-600 font-semibold mt-4">Nearby</h4>
              <div className="flex flex-wrap gap-2 mt-2">
                {property.nearbyPlaces.filter(Boolean).map((item, i) => (
                  <span key={i} className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Embedded Map */}
          {property.iframeLink && (
            <div className="mt-4 rounded-lg overflow-hidden shadow">
              <iframe
                src={property.iframeLink}
                className="w-full"
                height={300}
                loading="lazy"
                allowFullScreen
              />
            </div>
          )}

          {/* Property Images */}
          {property.images && property.images.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
              {property.images.map((img, j) => (
                <Image
                  key={j}
                  src={img.url}
                  alt={`Property ${index + 1} image ${j + 1}`}
                  className="rounded-lg object-cover"
                  width={200}
                  height={112}
                />
              ))}
            </div>
          )}

          {/* More Details Button */}
          <div className="text-right pt-4">
            <Link
              href={`/auctions/past/${auctionId}/property/${index}`}
              className="inline-flex items-center text-indigo-600 text-sm font-medium hover:underline"
            >
              → More Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
