"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaMoneyBillWave,
  FaRulerCombined,
  FaChevronRight,
  FaBuilding,
  FaImages,
} from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import AuctionImageGallery from "../../components/common/auction/id/AuctionImageGallery";
import AuctionInfoCard from "../../components/common/auction/id/AuctionInfoCard";
import PropertyDescription from "../../components/common/auction/id/PropertyDescription";
import AuctionInformation from "../../components/common/auction/id/AuctionInformation";
import LoadingState from "../../components/common/auction/id/LoadingState";
import NotFoundState from "../../components/common/auction/id/NotFoundState";
import { AuctionDetail } from "@/types/auction";
import ReviewForm from "../../components/common/reviews/ReviewForm";
import ReviewList from "../../components/common/reviews/ReviewList";
import toast from "react-hot-toast";
import { FloatingActions } from "../../components/common/offers/details";
import { useTranslations } from "next-intl";

export default function AuctionDetailPage() {
  const t = useTranslations('auctionId');
  
  const { id } = useParams();
  const [auction, setAuction] = useState<AuctionDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [propertyLikes, setPropertyLikes] = useState<{ [key: string]: number }>(
    {}
  );
  const [propertyLiked, setPropertyLiked] = useState<{
    [key: string]: boolean;
  }>({});

  const [liked, setLiked] = useState(false);
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    const fetchPropertyLikes = async () => {
      if (!auction) return;

      try {
        const likesMap: { [key: string]: number } = {};
        const likedMap: { [key: string]: boolean } = {};

        for (
          let index = 0;
          index < (auction.properties?.length ?? 0);
          index++
        ) {
          const propertyId = `${auction._id}_property_${index}`;

          // fetch عدد اللايكات لكل عقار
          const res = await fetch(`/api/likes/count?propertyId=${propertyId}`);
          const data = await res.json();

          likesMap[propertyId] = data.count || 0;

          if (
            typeof window !== "undefined" &&
            localStorage.getItem(`liked_property_${auction._id}_${index}`)
          ) {
            likedMap[propertyId] = true;
          }
        }

        setPropertyLikes(likesMap);
        setPropertyLiked(likedMap);
      } catch (error) {
        console.error("Error fetching property likes:", error);
      }
    };

    fetchPropertyLikes();
  }, [auction]);

  const handlePropertyLike = async (auctionId: string, propertyIndex: number) => {
    const key = `liked_property_${auctionId}_${propertyIndex}`;
  
    if (typeof window !== 'undefined' && localStorage.getItem(key)) {
      toast.error(t('propertyAlreadyLiked'));
      return;
    }
  
    try {
      const res = await fetch(`/api/auctions/${auctionId}/properties/${propertyIndex}/like`, {
        method: 'PATCH',
      });
  
      const data = await res.json();
  
      if (res.ok) {
        // Store in localStorage to prevent repeats
        localStorage.setItem(key, 'true');
  
        // Show thank you toast
        toast.success(t('thanksForLikingProperty'));
  
        // Update UI immediately
        setPropertyLiked((prev) => ({
          ...prev,
          [`${auctionId}_property_${propertyIndex}`]: true
        }));
  
        setPropertyLikes((prev) => ({
          ...prev,
          [`${auctionId}_property_${propertyIndex}`]: (prev[`${auctionId}_property_${propertyIndex}`] || 0) + 1
        }));
  
      } else {
        toast.error(data.message || t('failedToLike'));
      }
    } catch (err) {
      console.error(err);
      toast.error(t('somethingWentWrong'));
    }
  };
  

  useEffect(() => {
    const fetchLikeStatus = async () => {
      if (!id) return;

      try {
        const localLiked = localStorage.getItem(`liked_auction_${id}`);
        if (localLiked) {
          setLiked(true);
        } else {
          const res = await fetch(`/api/auctions/${id}/like`);
          const data = await res.json();
          if (data.liked) {
            setLiked(true);
            localStorage.setItem(`liked_auction_${id}`, "true");
          }
        }
      } catch (err) {
        console.error("Failed to fetch like status:", err);
      }
    };

    fetchLikeStatus();
  }, [id]);

  const handleLike = async () => {
    if (favorited) {
      toast.error(t('auctionAlreadyLiked'));
      return;
    }

    try {
      const res = await fetch(`/api/auctions/${id}/like`, { method: "PATCH" });
      const data = await res.json();

      if (res.ok) {
        const likedAuctions = JSON.parse(
          localStorage.getItem("likedAuctions") || "[]"
        );
        if (!likedAuctions.includes(id)) {
          likedAuctions.push(id);
          localStorage.setItem("likedAuctions", JSON.stringify(likedAuctions));
        }

        setFavorited(true);
        setAuction((prev) => (prev ? { ...prev, likes: data.likes } : prev));
        toast.success(t('thanksForLikingAuction'));
      } else {
        toast.error(data.message || t('auctionAlreadyLiked'));
      }
    } catch (err) {
      console.error("Like failed:", err);
      toast.error(t('somethingWentWrong'));
    }
  };

  useEffect(() => {
    const fetchAuction = async () => {
      try {
        if (!id) return;
        setIsLoading(true);

        const res = await fetch(`/api/public/upcoming-auctions/${id}`);
        if (!res.ok) {
          console.error("Auction not found:", res.status);
          return;
        }

        const data = await res.json();
        setAuction(data);
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to load auction:", err);
        setIsLoading(false);
      }
    };

    fetchAuction();
  }, [id]);

  if (isLoading) return <LoadingState />;
  if (!auction) return <NotFoundState />;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-100/30 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl"></div>
      <FloatingActions
        favorited={liked}
        onFavoriteToggle={liked ? undefined : handleLike}
      />

      {/* Hero Slider */}
      <AuctionImageGallery
        gallery={auction.gallery}
        title={auction.title}
        location={auction.location}
        auctionDate={auction.auctionDate}
        auctionTime={auction.auctionTime}
        startingBid={auction.startingBid}
      />

      {/* Details Section - Added more vertical padding */}
      <section className="py-20 px-4 max-w-6xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 gap-12"
        >
          {/* Left Column - Increased spacing between sections */}
          <motion.div variants={itemVariants} className="space-y-10">
            <PropertyDescription description={auction.description} />
            <AuctionInformation
              auctionDate={auction.auctionDate}
              auctionTime={auction.auctionTime}
              startingBid={auction.startingBid}
              estimatedValue={auction.estimatedValue?.toString()}
            />
            <AuctionInfoCard title={t('detail.sections.gallery')} gallery={auction.gallery} />
          </motion.div>

          {/* Right Column - Properties List */}
          <motion.div variants={itemVariants} className="space-y-10">
            <motion.div
              className="flex items-center space-x-4"
              whileInView={{ y: [10, 0], opacity: [0, 1] }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="bg-gradient-to-r from-indigo-100 to-blue-100 text-indigo-700 p-3 rounded-xl shadow-sm"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <FaBuilding className="text-2xl" />
              </motion.div>
              <h3 className="text-xl font-bold mb-0 bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
                {t('detail.sections.properties')} ({auction.properties?.length || 0})
              </h3>
            </motion.div>

            {/* Added more spacing between property cards */}
            <div className="space-y-8">
              {auction.properties?.map((property, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{
                    y: -5,
                    boxShadow:
                      "0 20px 25px -5px rgba(59, 130, 246, 0.1), 0 10px 10px -5px rgba(59, 130, 246, 0.1)",
                  }}
                  className="bg-white rounded-2xl shadow-md p-6 border border-indigo-100 transition-all duration-300 backdrop-blur-sm bg-opacity-90 relative overflow-hidden"
                >
                  {/* Like button - Increased spacing from top */}
                  <div className="absolute top-5 right-5 z-20 flex items-center space-x-3">
                    <motion.button
                      whileTap={{ scale: 0.8 }}
                      onClick={() => {
                        const key = `${auction._id}_property_${index}`;

                        if (propertyLiked[key]) {
                          toast.error(t('propertyAlreadyLiked'));
                          return;
                        }

                        handlePropertyLike(auction._id, index);
                      }}
                      className={`transition-colors duration-300 text-2xl ${
                        propertyLiked[`${auction._id}_property_${index}`] || (propertyLikes[`${auction._id}_property_${index}`] ?? 0) > 0
                          ? 'text-red-500'
                          : 'text-gray-400 hover:text-red-500'
                      }`}
                      aria-label="Like Property"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill={
                          propertyLiked[`${auction._id}_property_${index}`] || (propertyLikes[`${auction._id}_property_${index}`] ?? 0) > 0
                            ? 'currentColor'
                            : 'none'
                        }
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-7 h-7"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 8.25c0-2.485-2.015-4.5-4.5-4.5S12 5.765 12 8.25c0-2.485-2.015-4.5-4.5-4.5S3 5.765 3 8.25c0 6.75 9 12 9 12s9-5.25 9-12z"
                        />
                      </svg>
                    </motion.button>

                    {/* Like count */}
                    <span className="text-sm text-gray-500">
                      {propertyLikes[`${auction._id}_property_${index}`] || 0}
                    </span>
                  </div>

                  {/* Decorative corner */}
                  <div className="absolute -right-10 -top-10 w-20 h-20 bg-gradient-to-bl from-indigo-100/40 to-transparent rounded-full"></div>

                  {/* Improved spacing for property title */}
                  <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center mt-2">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-blue-600">
                      {property.title?.toUpperCase() ||
                        `${t('detail.propertyInfo.property')} #${index + 1}`}
                    </span>
                  </h4>

                  {property.images?.[0] && (
                    <div className="relative w-full h-52 mb-6 rounded-xl overflow-hidden group shadow-md">
                      <Image
                        src={property.images[0].url}
                        alt={`${t('detail.propertyInfo.property')} ${index + 1} ${t('image')}`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <div className="p-4 w-full">
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileHover={{ opacity: 1, y: 0 }}
                            className="flex justify-between items-center"
                          >
                            <span className="text-white font-medium flex items-center">
                              <FaImages className="mr-2" /> {t('propertyCard.moreImages')}
                            </span>
                            <span className="bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs">
                              {property.images.length} {t('propertyCard.photos')}
                            </span>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Improved grid spacing and responsiveness for Arabic format */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <motion.div
                      whileHover={{ scale: 1.03, x: 3 }}
                      className="flex items-center p-3 rounded-xl bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100"
                    >
                      <div className="bg-indigo-100 text-indigo-600 p-2 rounded-lg mr-3 shadow-sm">
                        <FaRulerCombined className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-indigo-400">
                          {t('detail.propertyInfo.area')}
                        </p>
                        <p className="font-semibold text-indigo-700">
                          {property.area} m²
                        </p>
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.03, x: 3 }}
                      className="flex items-center p-3 rounded-xl bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-100"
                    >
                      <div className="bg-emerald-100 text-emerald-600 p-2 rounded-lg mr-3 shadow-sm">
                        <FaMoneyBillWave className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-emerald-400">
                          {t('detail.propertyInfo.price')}
                        </p>
                        <p className="font-semibold text-emerald-700">
                          {property.price} SAR
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Improved spacing for location and view details button */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6 gap-4">
                    {property.location && (
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center text-indigo-600 text-sm"
                      >
                        <MdLocationOn className="mr-1 flex-shrink-0" />
                        <span className="truncate max-w-[200px]">
                          {property.location}
                        </span>
                      </motion.div>
                    )}

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full sm:w-auto"
                    >
                      <Link
                        href={`/auctions/${auction._id}/property/${index}`}
                        className="inline-flex items-center justify-center w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-medium text-sm hover:from-indigo-700 hover:to-blue-600 transition-all duration-300 shadow-md hover:shadow-lg relative overflow-hidden group"
                      >
                        <span className="relative z-10">{t('detail.propertyInfo.viewDetails')}</span>
                        <motion.span
                          className="absolute right-3 z-10 flex items-center justify-center"
                          initial={{ x: -5, opacity: 0 }}
                          whileHover={{ x: 0, opacity: 1 }}
                        >
                          <FaChevronRight className="ml-2" />
                        </motion.span>
                        {/* Button shine effect */}
                        <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>
      
      {/* Reviews section - Improved spacing */}
      <section className="py-12 px-4 max-w-6xl mx-auto mt-8 border-t pt-10">
        <h2 className="text-2xl font-bold mb-6">{t('detail.sections.customerReviews')}</h2>

        {/* Show reviews */}
        <ReviewList targetId={auction._id.toString()} />

        {/* Review submission form - Added more spacing */}
        <div className="mt-10">
          <ReviewForm
            targetId={auction._id.toString()}
            targetType="auction"
            onReviewAdded={() => {
              // Auto refresh after adding a review
              // by reloading reviews from ReviewList
            }}
          />
        </div>
      </section>
    </div>
  );
}