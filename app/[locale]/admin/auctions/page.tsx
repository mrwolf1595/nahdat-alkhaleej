'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Calendar, MapPin, Loader2, Trash2, Pencil, Gavel, DollarSign, ClipboardList, Plus, AlertTriangle, X, Check, Clock, ArrowRight, Star, Bookmark, Eye } from 'lucide-react';
import { IUpcomingAuction } from '@/models/UpcomingAuction';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function AdminAuctionsPage() {
  const [auctions, setAuctions] = useState<IUpcomingAuction[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Add a touch detection hook
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if device supports touch
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const res = await fetch('/api/admin/upcoming-auctions');
        const data = await res.json();
        setAuctions(data);
      } catch (err) {
        console.error('Error fetching auctions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAuctions();
  }, []);

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const openDeleteDialog = (id: string) => {
    setDeleteId(id);
    setShowDeleteDialog(true);
  };

  const closeDeleteDialog = () => {
    setShowDeleteDialog(false);
    setDeleteId(null);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    
    try {
      const res = await fetch(`/api/admin/upcoming-auctions/${deleteId}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error();

      toast.success('Auction deleted successfully');
      setAuctions(prev => prev.filter(auction => auction._id !== deleteId));
      closeDeleteDialog();
    } catch {
      toast.error('Failed to delete auction');
      closeDeleteDialog();
    }
  };

  // Enhanced animation variants for list and items - mobile optimized
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 10
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 bg-gradient-to-br from-indigo-50 via-slate-50 to-purple-50 min-h-screen rounded-xl">
      {/* Header with enhanced gradient and animation - improved for mobile */}
      <motion.div 
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 50 }}
        className="flex flex-col sm:flex-row justify-between items-center gap-5 sm:gap-0 mb-6 sm:mb-10"
      >
        <div className="flex items-center space-x-3">
          <motion.div 
            initial={{ rotate: -10, scale: 0.9 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-3 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl shadow-md"
          >
            <Gavel className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
          </motion.div>
          <div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-2xl sm:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600"
            >
              Upcoming Auctions
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-indigo-400 text-xs sm:text-sm mt-1"
            >
              Manage your upcoming auction events
            </motion.p>
          </div>
        </div>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full sm:w-auto"
        >
          <Link
            href="/admin/auctions/create"
            className="group relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-medium shadow-lg transition-all duration-300 flex items-center justify-center sm:justify-start gap-2 w-full sm:w-auto"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            <motion.span className="absolute top-0 left-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
            <Plus className="h-4 w-4 sm:h-5 sm:w-5 relative z-10" />
            <span className="relative z-10 text-sm sm:text-base">Add New Auction</span>
          </Link>
        </motion.div>
      </motion.div>

      {/* Loading state with enhanced animation - mobile optimized */}
      {loading ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-20 sm:py-32 text-gray-500"
        >
          <div className="relative">
            <motion.div
              animate={{ 
                rotate: 360,
                transition: { duration: 2, repeat: Infinity, ease: "linear" } 
              }}
            >
              <Loader2 className="h-12 w-12 sm:h-16 sm:w-16 text-indigo-600" />
            </motion.div>
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
                transition: { duration: 2, repeat: Infinity, ease: "easeInOut" } 
              }}
              className="absolute inset-0 bg-indigo-200 rounded-full filter blur-xl z-[-1]"
            />
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-base sm:text-lg mt-4 sm:mt-6 text-indigo-700 font-medium"
          >
            Loading your auctions...
          </motion.p>
        </motion.div>
      ) : auctions.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", damping: 20 }}
          className="text-center py-16 sm:py-32 bg-white rounded-2xl shadow-lg border border-purple-100 px-4"
        >
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative mx-auto w-16 h-16 sm:w-24 sm:h-24 mb-6"
          >
            <ClipboardList className="h-16 w-16 sm:h-24 sm:w-24 mx-auto text-indigo-200" />
            <motion.div 
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.8, 0.5],
                transition: { duration: 3, repeat: Infinity, ease: "easeInOut" } 
              }}
              className="absolute inset-0 bg-purple-100 rounded-full filter blur-xl z-[-1]"
            />
          </motion.div>
          <motion.p 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600"
          >
            No auctions found
          </motion.p>
          <motion.p 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-indigo-400 mt-3 text-sm sm:text-base"
          >
            Create your first auction to get started!
          </motion.p>
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8"
          >
            <Link
              href="/admin/auctions/create"
              className="inline-flex items-center px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 gap-2 group text-sm sm:text-base"
            >
              <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Create Auction</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 ml-1 group-hover:translate-x-1 transition-transform" />
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      ) : (
        <AnimatePresence>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
          >
            {auctions.map((auction) => (
              <motion.div
                key={String(auction._id)}
                variants={itemVariants}
                layout
                exit={{ opacity: 0, y: 20, scale: 0.9 }}
                whileHover={!isTouchDevice ? {
                  y: [-8, -4],
                  scale: [1.03, 1.02],
                  transition: { 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 10
                  }
                } : undefined}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 relative"
              >
                {/* Card glow effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-indigo-200/30 via-purple-200/30 to-pink-200/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl z-0"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
                
                {/* Top badge */}
                <div className="absolute top-4 right-4 z-20">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="bg-gradient-to-r from-amber-400 to-amber-500 text-white text-xs px-3 py-1 rounded-full shadow-md flex items-center gap-1"
                  >
                    <Clock className="h-3 w-3" />
                    <span>Upcoming</span>
                  </motion.div>
                </div>
                
                {/* Image container with enhanced gradient - improved for mobile */}
                <div className="relative w-full h-40 sm:h-48 md:h-52 overflow-hidden">
                  <Image
                    src={auction.mainImage}
                    alt={auction.title}
                    fill
                    className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-violet-900/70 via-indigo-900/40 to-transparent rounded-t-2xl" />
                  
                  {/* Bookmark button */}
                  <motion.button
                    className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-white/20 backdrop-blur-md p-1.5 sm:p-2 rounded-full text-white hover:bg-white/40 transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Bookmark className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </motion.button>
                </div>

                {/* Card content with enhanced styling - improved for mobile */}
                <div className="px-4 sm:px-6 pt-4 sm:pt-5 pb-5 sm:pb-6 space-y-3 sm:space-y-4 relative z-10">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex items-center gap-1 sm:gap-2 bg-indigo-50 text-indigo-600 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium"
                    >
                      <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="truncate max-w-[130px] sm:max-w-full">{auction.auctionDate} • {auction.auctionTime}</span>
                    </motion.div>
                    
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="text-purple-400"
                    >
                      <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                    </motion.div>
                  </div>

                  <h2 className="text-lg sm:text-xl font-bold text-gray-800 group-hover:text-indigo-700 transition-colors duration-300 line-clamp-2">
                    {auction.title}
                  </h2>

                  <div className="flex items-center text-gray-600 text-xs sm:text-sm gap-2">
                    <div className="bg-purple-50 p-1 rounded-full flex-shrink-0">
                      <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-purple-500" />
                    </div>
                    <span className="truncate">{auction.location}</span>
                  </div>

                  <div className="flex flex-wrap justify-between items-center gap-2 sm:gap-0">
                    <div className="text-xs sm:text-sm flex items-center bg-green-50 px-2 sm:px-3 py-1 rounded-full">
                      <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 mr-1" />
                      <span className="text-gray-700">Starting:</span>
                      <span className="font-bold text-green-600 ml-1">{auction.startingBid}</span>
                    </div>
                    
                    <div className="flex items-center text-xs bg-indigo-50 px-2 sm:px-3 py-1 rounded-full">
                      <ClipboardList className="h-3 w-3 text-indigo-500 mr-1" />
                      <span className="text-indigo-600 font-medium">{auction.properties.length} properties</span>
                    </div>
                  </div>

                  {/* Divider with subtle gradient */}
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-100 to-transparent my-1 sm:my-2"></div>

                  <div className="flex justify-between items-center gap-2 sm:gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => router.push(`/admin/auctions/edit/${auction._id}`)}
                      className="text-xs sm:text-sm w-1/2 py-2 sm:py-2.5 rounded-lg sm:rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-white shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center gap-1 overflow-hidden relative group"
                    >
                      <motion.span 
                        className="absolute inset-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" 
                      />
                      <Pencil className="h-3 w-3 sm:h-4 sm:w-4 relative z-10" /> 
                      <span className="relative z-10">Edit</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => openDeleteDialog(String(auction._id))}
                      className="text-xs sm:text-sm w-1/2 py-2 sm:py-2.5 rounded-lg sm:rounded-xl bg-gradient-to-r from-red-400 to-pink-500 text-white shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center gap-1 overflow-hidden relative group"
                    >
                      <motion.span 
                        className="absolute inset-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" 
                      />
                      <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 relative z-10" /> 
                      <span className="relative z-10">Delete</span>
                    </motion.button>
                  </div>
                </div>

                {/* Visual effect in corner */}
                <motion.div
                  className="absolute bottom-3 right-3 z-10"
                  initial={{ opacity: 0, scale: 0 }}
                  whileHover={{ opacity: 1, scale: 1, rotate: 180 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <div className="relative">
                    <Star className="h-6 w-6 text-amber-300" />
                    <motion.div 
                      animate={{ 
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-0 bg-amber-200 rounded-full filter blur-sm z-[-1]"
                    />
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}

      {/* Enhanced Delete Dialog */}
      <AnimatePresence>
        {showDeleteDialog && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-indigo-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeDeleteDialog}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md overflow-hidden relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Decorative background elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-100 rounded-full filter blur-xl opacity-60 -mr-10 -mt-10"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-100 rounded-full filter blur-xl opacity-60 -ml-10 -mb-10"></div>
              
              <div className="relative">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-red-50 rounded-xl mr-3">
                    <AlertTriangle className="h-6 w-6 text-red-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Confirm Deletion</h3>
                </div>

                <div className="h-px w-full bg-gradient-to-r from-red-100 via-red-200 to-red-100 my-4"></div>
                
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete this auction? This action cannot be undone.
                </p>
                
                <div className="flex justify-end gap-3">
                  <motion.button
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={closeDeleteDialog}
                    className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-medium flex items-center gap-1.5 hover:bg-gray-50 transition-colors"
                  >
                    <X className="h-4 w-4" />
                    Cancel
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleDelete}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-pink-600 text-white font-medium flex items-center gap-1.5 shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
                  >
                    <motion.span 
                      className="absolute inset-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" 
                    />
                    <Check className="h-4 w-4 relative z-10" />
                    <span className="relative z-10">Delete</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}