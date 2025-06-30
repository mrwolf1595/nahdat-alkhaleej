'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Offer } from '@/types/offer';
import { Heart } from 'lucide-react';
import toast from 'react-hot-toast';
import { useTranslations } from 'next-intl';
import RatingSummary from '../../../components/common/reviews/RatingSummary';

interface PropertyCardProps {
  offer: Offer;
  index: number;
}

const PropertyCard = ({ offer, index }: PropertyCardProps) => {
  const t = useTranslations('offers.propertyCard');
  const isForRent = offer.offerType === 'rent';
  const [likes, setLikes] = useState(offer.likes || 0);
  const [liked, setLiked] = useState(false);

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const likedBefore = localStorage.getItem(`liked_offer_${offer._id}`);
    if (likedBefore) setLiked(true);
  }, [offer._id]);

  const handleLike = async (e: { stopPropagation: () => void; }) => {
    // Prevent click from propagating to parent elements
    e.stopPropagation();
    
    if (liked) {
      toast.error(t('alreadyLiked'));
      return;
    }

    try {
      const res = await fetch(`/api/offers/${offer._id}/like`, {
        method: 'PATCH',
      });
      const data = await res.json();

      if (res.ok) {
        setLikes(data.likes);
        setLiked(true);
        localStorage.setItem(`liked_offer_${offer._id}`, 'true');
        toast.success(t('thankYouLike'));
      } else {
        toast.error(data.message || 'Like failed');
      }
    } catch (err) {
      console.error(err);
      toast.error(t('somethingWentWrong'));
    }
  };

  const formatPrice = () => {
    if (!offer.price) return t('priceUponRequest');
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    return isForRent
      ? `${formatter.format(Number(offer.price))}/mo`
      : formatter.format(Number(offer.price));
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
      },
    },
    hover: {
      y: -10,
      boxShadow:
        '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      transition: {
        type: 'spring',
        stiffness: 500,
        damping: 30,
      },
    },
  };

  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
      className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300"
    >
      <div className="relative overflow-hidden h-52">
        <motion.div variants={imageVariants} className="h-full w-full">
          <Image
            src={offer.mainImage || '/images/property-placeholder.jpg'}
            alt={offer.title || 'Property'}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300"
          />
        </motion.div>

        {/* Badge */}
        <div className="absolute top-4 ltr:left-4 rtl:right-4">
          <div
            className={`px-4 py-1.5 rounded-full text-white text-sm font-medium shadow-md ${
              isForRent
                ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                : 'bg-gradient-to-r from-blue-500 to-indigo-600'
            }`}
          >
            {isForRent ? t('forRent') : t('forSale')}
          </div>
        </div>

        {/* Featured badge */}
        {offer.featured && (
          <div className="absolute top-4 ltr:left-32 rtl:right-32">
            <div className="px-3 py-1 rounded-full bg-amber-500 text-white text-xs font-medium shadow-md">
              {t('featured')}
            </div>
          </div>
        )}

        {/* Like button - now in top right corner */}
        <button
          onClick={handleLike}
          className="absolute top-3 ltr:right-3 rtl:left-3 bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-all z-10 group"
        >
          <Heart
            size={28}
            className={`transition-colors ${
              liked && isHovering
                ? 'fill-red-500 text-red-500' 
                : 'fill-transparent text-gray-500 group-hover:text-red-500'
            }`}
          />
          {likes > 0 && (
            <span className="absolute -top-2 ltr:-right-2 rtl:-left-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-md">
              {likes}
            </span>
          )}
        </button>
      </div>
      <RatingSummary targetId={offer._id} />
      <div className="p-5">
        <div className="mb-3">
          <h3 className="text-xl font-bold text-gray-800 mb-1 line-clamp-1">
            {offer.title || t('untitledProperty')}
          </h3>
          <p className="text-gray-600 flex items-center text-sm mb-1">
            <svg
              className="w-4 h-4 ltr:mr-1 rtl:ml-1 text-gray-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            {offer.location || t('locationUnavailable')}
          </p>
        </div>

        <div className="mb-4">
          <div className="text-2xl font-bold text-blue-600">
            {formatPrice()}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4 text-xs text-center">
          <div className="bg-gray-50 rounded-lg p-2">
            <p className="font-semibold text-gray-800">{offer.bedrooms || '0'}</p>
            <p className="text-gray-600">{t('beds')}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-2">
            <p className="font-semibold text-gray-800">{offer.bathrooms || '0'}</p>
            <p className="text-gray-600">{t('baths')}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-2">
            <p className="font-semibold text-gray-800">{offer.sqft || '0'}</p>
            <p className="text-gray-600">{t('sqft')}</p>
          </div>
        </div>

        <Link href={`/offers/${offer._id}`}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium transition-all transform hover:shadow-lg"
          >
            {t('viewProperty')}
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

export default PropertyCard;