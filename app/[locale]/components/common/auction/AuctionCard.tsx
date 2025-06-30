'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Calendar,
  MapPin,
  Home,
  Bath,

  DollarSign,
  Award,
  CheckCircle,
  XCircle,
  LandPlot,
} from 'lucide-react';
import CountdownTimer from './CountdownTimer';
import ElapsedTimer from '../../admin/auctions/ElapsedTimer';
import RatingSummary from '../reviews/RatingSummary';
import AuctionLikeButton from '../likes/AuctionLikeButton';
import { useTranslations } from 'next-intl';

export interface AuctionType {
  id: string;
  title: string;
  description: string;
  soldPrice?: string;
  startingBid?: string;
  estimatedValue: string;
  auctionDate: string;
  auctionTime?: string;
  location: string;
  bedrooms?: number;
  bathrooms?: number;
  area: string;
  mainImage: string;
  featured?: boolean;
}

interface AuctionCardProps {
  auction: AuctionType;
  type?: 'upcoming' | 'past' | 'sold';
}

export default function AuctionCard({ auction, type = 'upcoming' }: AuctionCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const t = useTranslations('auctions.auctionCard');
  
  const isSold = type === 'sold' || (type === 'past' && auction.soldPrice && auction.soldPrice !== 'N/A');
  
  // Determine badge and button styling based on auction type
  const getBadgeColors = () => {
    if (type === 'upcoming') return 'from-blue-600 to-indigo-600';
    if (isSold) return 'from-emerald-500 to-emerald-600';
    return 'from-gray-500 to-gray-600'; // For past auctions that weren't sold
  };
  
  const getButtonColors = () => {
    if (type === 'upcoming') return 'from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700';
    if (isSold) return 'from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700';
    return 'from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800';
  };
  
  const getPriceColor = () => {
    if (type === 'upcoming') return 'text-blue-700 dark:text-blue-400';
    if (isSold) return 'text-emerald-600 dark:text-emerald-400';
    return 'text-gray-700 dark:text-gray-300';
  };
  
  const getBadgeIcon = () => {
    if (type === 'upcoming') return <Calendar size={14} className="flex-shrink-0" />;
    if (isSold) return <CheckCircle size={14} className="flex-shrink-0" />;
    return <XCircle size={14} className="flex-shrink-0" />;
  };
  
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }).format(date);
    } catch {
      return dateString;
    }
  };

  const getBadgeText = () => {
    if (type === 'upcoming') return t('badges.upcoming');
    if (isSold) return t('badges.sold');
    return t('badges.notSold');
  };

  return (
    <motion.div 
      className="h-full overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col"
      whileHover={{ y: -8, scale: 1.01 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="relative h-64 w-full">
        <AuctionLikeButton auctionId={auction.id} />
        <div className={`absolute inset-0 bg-gray-200 dark:bg-gray-700 ${imageLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
          <div className="animate-pulse h-full w-full bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800"></div>
        </div>
        
        <motion.div 
          className={`${imageLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        >
          <Image
            src={imageError ? '/images/placeholder.jpg' : auction.mainImage}
            alt={auction.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setImageError(true);
              setImageLoaded(true);
            }}
            priority={type === 'upcoming' && auction.featured}
          />
        </motion.div>
        
        <div className={`absolute top-4 left-4 z-10 flex flex-col gap-2`}>
          <span className={`px-3 py-1.5 bg-gradient-to-r ${getBadgeColors()} text-white text-xs font-medium rounded-full shadow-md flex items-center gap-1.5`}>
            {getBadgeIcon()}
            {getBadgeText()}
          </span>
          
          {auction.featured && (
            <span className="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs font-medium rounded-full shadow-md flex items-center gap-1.5">
              <Award size={14} className="flex-shrink-0" />
              {t('badges.featured')}
            </span>
          )}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-1 text-gray-800 dark:text-white leading-tight line-clamp-1">{auction.title}</h3>
        <RatingSummary targetId={auction.id} />
        <div className="flex items-center text-gray-600 dark:text-gray-400 mb-3 text-sm">
          <MapPin size={16} className="mr-1.5 flex-shrink-0" />
          <span className="line-clamp-1">{auction.location}</span>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 text-sm">{auction.description}</p>

        <div className="flex justify-between items-center mb-4 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl shadow-sm">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-medium flex items-center gap-1.5">
              <DollarSign size={14} className="flex-shrink-0" />
              {type === 'upcoming' ? t('startingBid') : t('soldFor')}
            </p>
            <p className={`text-xl font-bold ${getPriceColor()}`}>
              {type === 'upcoming' ? auction.startingBid : auction.soldPrice || t('badges.notSold')}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-medium flex items-center justify-end gap-1.5">
              <Award size={14} className="flex-shrink-0" />
              {t('estValue')}
            </p>
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">{auction.estimatedValue}</p>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center mb-2 text-gray-700 dark:text-gray-300 text-sm">
            <Calendar size={16} className="mr-2 text-gray-500 dark:text-gray-400 flex-shrink-0" />
            <span>
              {type === 'upcoming' 
                ? `${t('auctionDate')} ${formatDate(auction.auctionDate)}${auction.auctionTime ? ` at ${auction.auctionTime}` : ''}`
                : `${isSold ? t('soldDate') : t('auctionedDate')} ${formatDate(auction.auctionDate)}`
              }
            </span>
          </div>
        </div>

        {/* Timer components */}
        {type === 'upcoming' ? (
          <div className="mb-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 shadow-sm">
            <CountdownTimer 
              auctionDate={auction.auctionDate}
              auctionTime={auction.auctionTime || '00:00'}
              title={t('countdown.startsIn')}
            />
          </div>
        ) : (
          <div className="mb-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3 shadow-sm">
            <ElapsedTimer 
              auctionDate={auction.auctionDate}
              auctionTime={auction.auctionTime || '00:00'}
              title={t('elapsedTime.timeSince')}
            />
          </div>
        )}

        {/* Property details */}
        {(auction.bedrooms || auction.bathrooms || auction.area) && (
          <div className="flex flex-wrap gap-4 text-gray-600 dark:text-gray-400 mb-5 text-sm border-t border-gray-100 dark:border-gray-700 pt-4">
            {auction.bedrooms !== undefined && (
              <div className="flex items-center">
                <Home size={16} className="mr-1.5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                <span>{auction.bedrooms} {auction.bedrooms === 1 ? t('bed') : t('beds')}</span>
              </div>
            )}
            {auction.bathrooms !== undefined && (
              <div className="flex items-center">
                <Bath size={16} className="mr-1.5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                <span>{auction.bathrooms} {auction.bathrooms === 1 ? t('bath') : t('baths')}</span>
              </div>
            )}
{auction.area && (
  <div className="flex items-center">
    <LandPlot size={16} className="text-gray-500 dark:text-gray-400 flex-shrink-0" />
    <span className="pl-3">{auction.area}</span>
  </div>
)}
          </div>
        )}

        {/* Action button */}
        <div className="mt-auto">
          <Link
            href={type === 'upcoming' ? `/auctions/${auction.id}` : `/auctions/past/${auction.id}`}
            className={`inline-flex items-center justify-center w-full bg-gradient-to-r ${getButtonColors()} text-white font-medium py-3 px-4 rounded-xl transition duration-300 shadow-md hover:shadow-lg`}
            aria-label={`${t('viewDetails')} - ${auction.title}`}
          >
            {t('viewDetails')}
          </Link>
        </div>
      </div>
    </motion.div>
  );
}