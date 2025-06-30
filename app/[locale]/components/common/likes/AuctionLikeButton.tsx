'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

interface AuctionLikeButtonProps {
  auctionId: string;
}

export default function AuctionLikeButton({ auctionId }: AuctionLikeButtonProps) {
  const [liked, setLiked] = useState(false);
  const [totalLikes, setTotalLikes] = useState(0);

  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        const res = await fetch(`/api/auctions/${auctionId}/like`, { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          setLiked(data.liked);
          setTotalLikes(data.totalLikes);
        }
      } catch (error) {
        console.error('Failed to fetch like status:', error);
      }
    };

    fetchLikeStatus();
  }, [auctionId]);

  const handleLike = async () => {
    if (liked) {
      toast.error('You have already liked this auction.');
      return;
    }

    try {
      const res = await fetch(`/api/auctions/${auctionId}/like`, { method: 'PATCH' });

      if (res.ok) {
        toast.success('Thanks for liking this auction! ❤️');
        setLiked(true);
        const data = await res.json();
        setTotalLikes(data.totalLikes);
      } else {
        const data = await res.json();
        toast.error(data.message || 'Failed to like.');
      }
    } catch (error) {
      console.error('Error liking auction:', error);
      toast.error('Something went wrong.');
    }
  };

  return (
    <div className="absolute top-4 right-4 z-10">
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={handleLike}
        className="flex items-center gap-1 text-gray-400 hover:text-red-500 transition-colors duration-300"
      >
        <Heart 
          size={28} 
          className={liked ? 'fill-red-500 text-red-500' : ''}
        />
        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{totalLikes}</span>
      </motion.button>
    </div>
  );
}
