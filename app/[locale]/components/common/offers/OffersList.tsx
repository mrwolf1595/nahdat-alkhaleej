'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import OfferCard from './list/OfferCard';
import LoadingSkeleton from './list/LoadingSkeleton';
import NoResults from './list/NoResults';
import Popup from './list/Popup';

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

interface OffersListProps {
  offers: Offer[];
  loading?: boolean;
}

const OffersList = ({ offers, loading = false }: OffersListProps) => {
  const [offersState, setOffersState] = useState<Offer[]>([]);
  const [popup, setPopup] = useState<{
    message: string;
    visible: boolean;
    type?: 'success' | 'error';
  }>({
    message: '',
    visible: false,
    type: 'success',
  });

  const [likedItems, setLikedItems] = useState<Record<string, boolean>>({});
  const [likesCount, setLikesCount] = useState<Record<string, number>>({});
  const [isLiking, setIsLiking] = useState<Record<string, boolean>>({});
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [hasError] = useState(false);

  useEffect(() => {
    setOffersState(offers);
  }, [offers]);

  useEffect(() => {
    if (popup.visible) {
      const timer = setTimeout(() => {
        setPopup((prev) => ({ ...prev, visible: false }));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [popup.visible]);

  const handleLike = async (offerId: string) => {
    if (isLiking[offerId] || likedItems[offerId]) return;
    setIsLiking((prev) => ({ ...prev, [offerId]: true }));

    try {
      const res = await fetch(`/api/offers/${offerId}/like`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();

      if (res.status === 409) {
        setPopup({
          message: 'You already liked this offer!',
          visible: true,
          type: 'error',
        });
        setLikedItems((prev) => ({ ...prev, [offerId]: true }));
        return;
      }

      if (!res.ok) {
        console.error('Failed to like offer');
        setPopup({
          message: 'Failed to like offer. Try again.',
          visible: true,
          type: 'error',
        });
        return;
      }

      setLikedItems((prev) => ({ ...prev, [offerId]: true }));
      setLikesCount((prev) => ({ ...prev, [offerId]: data.likes }));
      setOffersState((prev) =>
        prev.map((offer) =>
          offer._id === offerId ? { ...offer, likes: data.likes } : offer
        )
      );

      setPopup({
        message: 'Thanks for your like!',
        visible: true,
        type: 'success',
      });
    } catch (err) {
      console.error('Error liking offer:', err);
      setPopup({
        message: 'Something went wrong.',
        visible: true,
        type: 'error',
      });
    } finally {
      setIsLiking((prev) => ({ ...prev, [offerId]: false }));
    }
  };

  if (loading) return <LoadingSkeleton />;

  if (hasError) {
    return (
      <div className="p-6 bg-red-50 rounded-lg border border-red-200 text-red-700">
        <h3 className="text-xl font-bold mb-2">Error displaying properties</h3>
        <p>There was a problem displaying the properties. Please try refreshing the page.</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg"
        >
          Refresh Page
        </button>
      </div>
    );
  }

  if (offersState.length === 0) return <NoResults />;

  return (
    <>
      <Popup popup={popup} setPopup={setPopup} />
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {offersState.map((offer) => (
          <OfferCard
            key={offer._id}
            offer={offer}
            onLike={handleLike}
            isLiked={likedItems[offer._id]}
            isLiking={isLiking[offer._id]}
            likeCount={likesCount[offer._id] ?? offer.likes ?? 0}
            hoveredItem={hoveredItem}
            setHoveredItem={setHoveredItem}
          />
        ))}
      </motion.div>
    </>
  );
};

export default OffersList;
