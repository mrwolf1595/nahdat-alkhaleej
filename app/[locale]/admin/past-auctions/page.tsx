'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ElapsedTimer from '../../components/admin/past-auction/ElapsedTimer';
import { toast } from 'react-hot-toast';

interface PastAuction {
  _id: string;
  title: string;
  mainImage: string;
  auctionDate: string;
  auctionTime: string;
  properties: { id: string; name: string; value: string }[];
}

export default function AdminPastAuctionsPage() {
  const [auctions, setAuctions] = useState<PastAuction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const res = await fetch('/api/admin/past-auctions');
        const data = await res.json();
        setAuctions(data);
      } catch (err) {
        console.error('Failed to fetch past auctions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAuctions();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this auction?');
    if (!confirmed) return;
  
    try {
      const res = await fetch(`/api/admin/past-auctions/${id}`, {
        method: 'DELETE',
      });
  
      const result = await res.json();
  
      if (!res.ok) {
        console.error(result.message || 'Failed to delete auction');
        toast.error(result.message || 'Failed to delete auction');
        return;
      }
  
      // Remove from UI
      setAuctions((prev) => prev.filter((a) => a._id !== id));
      toast.success('Auction deleted successfully!'); // ✅ Toast instead of alert
    } catch (err) {
      console.error(err);
      toast.error('An unexpected error occurred while deleting the auction.');
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex justify-between items-center mb-10 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800">Past Auctions</h1>
        <Link
          href="/admin/past-auctions/create"
          className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
        >
          + Add New Auction
        </Link>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading past auctions...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {auctions.map((auction) => (
            <div
              key={auction._id}
              className="bg-white rounded-xl shadow-md overflow-hidden border hover:shadow-lg transition"
            >
              {/* Cover Image */}
              <div className="relative h-48 w-full">
                <Image
                  src={auction.mainImage}
                  alt={auction.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Auction Info */}
              <div className="p-5 space-y-2">
                <h2 className="text-lg font-semibold text-gray-800">{auction.title}</h2>
                <p className="text-sm text-gray-500">
                  Ended on: {auction.auctionDate} at {auction.auctionTime}
                </p>
                <p className="text-sm text-gray-500">
                  Properties: {auction.properties?.length || 0}
                </p>

                {/* Live elapsed timer */}
                <ElapsedTimer
                  auctionDate={auction.auctionDate}
                  auctionTime={auction.auctionTime}
                />

                {/* Action buttons */}
                <div className="flex justify-between pt-4">
                  <Link
                    href={`/admin/past-auctions/edit/${auction._id}`}
                    className="text-sm px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(auction._id)}
                    className="text-sm px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
