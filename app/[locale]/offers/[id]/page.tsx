'use client';
import { useEffect, useState } from 'react'; 
import { FaClock as Clock, FaYoutube as YoutubeIcon } from 'react-icons/fa';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Offer } from '@/types/offer';
import { useTranslations } from 'next-intl';

import OfferHeader from '../../components/common/offers/details/OfferHeader';
import PropertyView from '../../components/common/offers/details/PropertyView';
import PropertyDetails from '../../components/common/offers/details/PropertyDetails';
import AmenitiesList from '../../components/common/offers/details/AmenitiesList';
import NearbyPlaces from '../../components/common/offers/details/NearbyPlaces';
import ContactAgent from '../../components/common/offers/details/ContactAgent';
import PropertySummary from '../../components/common/offers/details/PropertySummary';
import FullscreenGallery from '../../components/common/offers/details/FullscreenGallery';
import { MobileBottomBar } from '../../components/common/offers/details/FooterActions';
import { LoadingState, NotFoundState } from '../../components/common/offers/details/LoadingNotFound';
import Testimonials from '../../components/common/auction/Testimonials';
import ReviewForm from '../../components/common/reviews/ReviewForm';
import ReviewList from '../../components/common/reviews/ReviewList';
import YouTubePlayer from '../../components/common/offers/CustomYouTubePlayer';

import toast from 'react-hot-toast';
import useTheme from '../../context/ThemeContext';

const OfferDetailsPage = () => {
  const { theme } = useTheme();
  const { id } = useParams();
  const router = useRouter();
  const t = useTranslations('offers');
  const tOfferId = useTranslations('offerId');
  const [offer, setOffer] = useState<Offer | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [favorited, setFavorited] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [viewMode, setViewMode] = useState('gallery');

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const res = await fetch(`/api/offers/${id}`);
        if (!res.ok) throw new Error('Failed to fetch offer');
        const data = await res.json();
        setOffer(data);

        const localLike = localStorage.getItem(`liked_offer_${id}`);
        if (localLike) {
          setFavorited(true);
        } else {
          const resLike = await fetch(`/api/offers/${id}/like`);
          const dataLike = await resLike.json();
          if (dataLike.liked) {
            setFavorited(true);
            localStorage.setItem(`liked_offer_${id}`, 'true');
          }
        }
      } catch (error) {
        console.error('Failed to fetch offer:', error);
        toast.error('فشل في تحميل العرض');
      } finally {
        setLoading(false);
      }
    };

    fetchOffer();

    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [id]);

  if (loading) return <LoadingState />;
  if (!offer) return <NotFoundState onBackClick={() => router.push('/offers')} />;

  const isScrolled = scrollPosition > 100;

  const handleLike = async () => {
    if (favorited) {
      toast.error(t('propertyCard.alreadyLiked'));
      return;
    }
  
    try {
      const res = await fetch(`/api/offers/${id}/like`, { method: 'PATCH' });
      const data = await res.json();
  
      if (res.ok) {
        const favoritedOffers = JSON.parse(localStorage.getItem('favoritedOffers') || '[]');
        if (!favoritedOffers.includes(id)) {
          favoritedOffers.push(id);
          localStorage.setItem('favoritedOffers', JSON.stringify(favoritedOffers));
        }
  
        setFavorited(true);
        setOffer((prev) => prev ? { ...prev, likes: data.likes } : prev);
        toast.success(t('propertyCard.thankYouLike'));
      } else {
        toast.error(data.message || t('propertyCard.alreadyLiked'));
      }
    } catch (err) {
      console.error('Like failed:', err);
      toast.error(t('propertyCard.somethingWentWrong'));
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gray-900 text-white' 
        : 'bg-white text-gray-900'
    }`}>
      <OfferHeader
        offer={offer}
        isScrolled={isScrolled}
        favorited={favorited}
        setFavorited={setFavorited}
        onBackClick={() => router.back()}
        onLike={handleLike}
      />

      <PropertyView
        offer={offer}
        viewMode={viewMode}
        setViewMode={setViewMode}
        onImageClick={() => setIsFullscreen(true)}
        onSlideChange={(index) => setActiveSlide(index)}
      />
      
      {/* Video Tour Section - Only show if videoUrl exists in offer data */}
      {offer.videoLinks && offer.videoLinks.length > 0 && (
        <div className="max-w-full mx-auto px-6 py-6 space-y-6">
          <div className="flex items-center mb-2">
            <YoutubeIcon className="text-red-600 mr-2" size={24} />
            <h2 className={`text-xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {tOfferId?.('property.videoTour') || 'Video Tour'}
            </h2>
          </div>

          {offer.videoLinks.map((link, index) => (
            <YouTubePlayer key={index} videoId={link} autoplay={true} />
          ))}
        </div>
      )}

      <div className="max-w-full mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 space-y-10"
        >
          <PropertyDetails offer={offer} />
          <AmenitiesList amenities={offer.featuredAmenities || []} />
          <NearbyPlaces
            places={
              Array.isArray(offer.nearbyPlaces)
                ? offer.nearbyPlaces.map((p) =>
                    typeof p === "string" ? p : p.name
                  )
                : []
            }
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-1"
        >
          <div className="sticky top-24 space-y-6">
            <ContactAgent
              agentInfo={offer.agentInfo}
              propertyTitle={offer.title}
            />
            <PropertySummary offer={offer} />
            
            <div className="rounded-xl p-5 border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30 shadow-sm hover:shadow-md transition-all duration-300 group">
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-4 group-hover:scale-110 transition-transform duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-blue-200 dark:bg-blue-800/30 scale-0 group-hover:scale-100 rounded-full transition-transform duration-500 origin-bottom"></div>
                  <Clock
                    size={22}
                    className="relative z-10 transition-colors duration-300"
                  />
                </div>
                <div>
                  <div className="flex items-center mb-2">
                    <h4 className={`font-semibold ${
                      theme === 'dark' ? 'text-white' : 'text-gray-800'
                    }`}>
                      {tOfferId('limitedTimeOffer.title')}
                    </h4>
                    <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 rounded-full">
                      {tOfferId('limitedTimeOffer.expiresSoon')}
                    </span>
                  </div>
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {tOfferId('limitedTimeOffer.description')}
                  </p>
                  <button className="mt-3 text-sm text-blue-600 dark:text-blue-400 font-medium flex items-center hover:underline transition-colors">
                    {tOfferId('limitedTimeOffer.claimOffer')} <span className="ml-1">→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isFullscreen && (
          <FullscreenGallery
            images={offer.images}
            activeIndex={activeSlide}
            isOpen={isFullscreen}
            onClose={() => setIsFullscreen(false)}
            onPrev={() =>
              setActiveSlide((prev) =>
                prev === 0 ? offer.images.length - 1 : prev - 1
              )
            }
            onNext={() =>
              setActiveSlide((prev) => (prev + 1) % offer.images.length)
            }
          />
        )}
      </AnimatePresence>


      <MobileBottomBar
        offer={offer}
        favorited={favorited}
        setFavorited={setFavorited}
        onLike={handleLike}
      />
      
      {/* Reviews Section */}
      <section className={`max-w-full mx-auto px-6 py-12 border-t transition-colors duration-300 ${
        theme === 'dark' 
          ? 'border-gray-700 bg-gray-800' 
          : 'border-gray-200 bg-gray-50'
      }`}>
        <div className="max-w-4xl mx-auto">
          <h2 className={`text-2xl font-bold mb-8 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {tOfferId('reviews.customerReviews')}
          </h2>

          <div className="space-y-8">
            <ReviewList targetId={offer._id.toString()} />

            <div className={`border-t pt-8 ${
              theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <h3 className={`text-lg font-semibold mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Leave a Review
              </h3>
              <ReviewForm
                targetId={offer._id.toString()}
                targetType="offer"
                onReviewAdded={() => {
                  // Refresh after adding review
                  window.location.reload();
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <Testimonials sectionTitle={t('testimonials.title')} />
    </div>
  );
};

export default OfferDetailsPage;