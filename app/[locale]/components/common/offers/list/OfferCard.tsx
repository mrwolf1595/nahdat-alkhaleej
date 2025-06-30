'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface Offer {
  _id: string;
  title: string;
  description: string;
  price: number | string;
  location: string;
  type?: string;
  mainImage: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: string;
  likes?: number;
}

interface OfferCardProps {
  offer: Offer;
  onLike: (id: string) => void;
  isLiked: boolean;
  isLiking: boolean;
  likeCount: number;
  hoveredItem: string | null;
  setHoveredItem: (id: string | null) => void;
}

const OfferCard = ({
  offer,
  onLike,
  isLiked,
  isLiking,
  likeCount,
  hoveredItem,
  setHoveredItem,
}: OfferCardProps) => {
  return (
    <motion.div
      key={offer._id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setHoveredItem(offer._id)}
      onMouseLeave={() => setHoveredItem(null)}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:-translate-y-2 transition-all duration-300 hover:shadow-xl group relative"
    >
      {/* Badge */}
      <div className="absolute top-0 left-0 z-10 m-4">
        <div
          className={`
            px-4 py-1.5 rounded-full text-white text-sm font-medium shadow-md
            ${offer.type === 'For Rent'
              ? 'bg-gradient-to-r from-teal-500 to-teal-600'
              : 'bg-gradient-to-r from-blue-600 to-indigo-600'
            }
          `}
        >
          {offer.type || 'For Sale'}
        </div>
      </div>

      {/* Like Button */}
      <button
        className={`absolute top-0 right-0 z-10 m-4 p-2 rounded-full shadow-md backdrop-blur-sm transition-all duration-300 ${
          isLiking
            ? 'bg-gray-100 cursor-wait'
            : isLiked
              ? 'bg-red-50'
              : 'bg-white/80 hover:bg-white'
        }`}
        aria-label="Save to favorites"
        onClick={() => onLike(offer._id)}
        disabled={isLiking || isLiked}
      >
        <svg
          className={`w-5 h-5 transition-colors duration-300 ${
            isLiked || hoveredItem === offer._id
              ? 'text-red-500'
              : 'text-gray-500'
          }`}
          fill={isLiked || hoveredItem === offer._id ? 'currentColor' : 'none'}
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={isLiked ? 0 : 2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>

      {/* Likes count */}
      {(likeCount ?? 0) > 0 && (
        <div className="absolute top-0 right-0 z-10 mt-4 mr-14">
          <div className="bg-white/80 backdrop-blur-sm py-1 px-2 rounded-full text-xs font-medium text-gray-600 shadow-sm">
            {likeCount}
          </div>
        </div>
      )}

      {/* Main Image */}
      <div className="relative h-60 w-full overflow-hidden bg-gray-200">
        {offer.mainImage ? (
          <Image
            src={offer.mainImage}
            alt={offer.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-gray-400">
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content */}
      <div className="p-6 relative">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
            <Link href={`/offers/${offer._id}`} className="hover:underline">
              {offer.title || 'Untitled Property'}
            </Link>
          </h3>
          <span className="text-xl font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">
            {typeof offer.price === 'number'
              ? `$${offer.price.toLocaleString()}`
              : offer.price || 'Price on request'}
          </span>
        </div>

        <div className="flex items-center mb-3 text-gray-500 text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          {offer.location || 'Location not specified'}
        </div>

        <p className="text-gray-600 mb-5 line-clamp-2">
          {offer.description || 'No description available'}
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-4 text-gray-600 mb-6 pt-4 border-t border-gray-100">
          {offer.bedrooms && (
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>{offer.bedrooms} Beds</span>
            </div>
          )}
          {offer.bathrooms && (
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              <span>{offer.bathrooms} Baths</span>
            </div>
          )}
          {offer.area && (
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
              <span>{offer.area}</span>
            </div>
          )}
        </div>

        <Link
          href={`/offers/${offer._id}`}
          className="group-hover:bg-blue-700 block w-full bg-blue-600 text-white text-center font-semibold py-3 rounded-lg transition-all duration-300 hover:shadow-lg relative overflow-hidden"
        >
          <span className="relative z-10 flex items-center justify-center">
            <span>View Details</span>
            <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
          <span className="absolute left-0 right-0 bottom-0 h-0 group-hover:h-full bg-gradient-to-r from-blue-800 to-indigo-600 z-0 transition-all duration-300 ease-out"></span>
        </Link>
      </div>
    </motion.div>
  );
};

export default OfferCard;
