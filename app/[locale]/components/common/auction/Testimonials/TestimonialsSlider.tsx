'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import { useState } from 'react';
import { 
  MessageSquareQuote, 
  Smile, 
  Frown, 
  Star, 
  User, 
  Award, 
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

interface Testimonial {
  _id: string;
  name: string;
  role?: string;
  message: string;
  satisfaction?: 'Satisfied' | 'Not Satisfied';
  recommendation?: number;
}

interface Props {
  testimonials: Testimonial[];
}

export default function TestimonialsSlider({ testimonials }: Props) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const t = useTranslations('testimonials.slider');

  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50 dark:from-gray-950 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-3">
            <Sparkles className="text-blue-500 w-6 h-6 mr-2" />
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t('title')}
            </h2>
            <Sparkles className="text-blue-500 w-6 h-6 ml-2" />
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            {t('subtitle')}
          </p>
        </motion.div>

        <Swiper
          modules={[Pagination, Autoplay, EffectCoverflow]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 1.5,
              centeredSlides: true,
            },
            1024: {
              slidesPerView: 1.8,
              centeredSlides: true,
            },
          }}
          loop={true}
          effect="coverflow"
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
            slideShadows: false,
          }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ 
            clickable: true,
            bulletActiveClass: 'swiper-pagination-bullet-active bg-blue-500',
            bulletClass: 'swiper-pagination-bullet bg-gray-300 dark:bg-gray-600'
          }}
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial._id}>
              <motion.div 
                className="relative overflow-hidden bg-white dark:bg-gray-800 p-8 md:p-10 rounded-2xl shadow-lg backdrop-blur-sm border border-gray-100 dark:border-gray-700 max-w-3xl mx-auto"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                onMouseEnter={() => setHoveredCard(testimonial._id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-blue-400 dark:bg-blue-600 rounded-full opacity-10 -mr-20 -mt-20" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-400 dark:bg-purple-600 rounded-full opacity-10 -ml-10 -mb-10" />

                {/* Name and Role */}
                <div className="mb-6 flex items-center">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl shadow-md mr-4">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <motion.h4 
                      className="text-xl font-bold text-gray-800 dark:text-white"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {testimonial.name}
                    </motion.h4>
                    {testimonial.role && (
                      <motion.p 
                        className="text-sm text-gray-500 dark:text-gray-400 flex items-center"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <Award className="w-3 h-3 mr-1 text-blue-500" />
                        {testimonial.role}
                      </motion.p>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div className="relative">
                  <MessageSquareQuote className="absolute top-0 left-0 w-12 h-12 text-blue-200 dark:text-blue-900 opacity-50 transform -translate-x-4 -translate-y-4" />
                  <motion.p 
                    className="text-gray-700 dark:text-gray-300 italic text-lg relative z-10 pl-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {testimonial.message}
                  </motion.p>
                </div>

                {/* Satisfaction */}
                {testimonial.satisfaction && (
                  <motion.div 
                    className="mt-6 flex items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <span className="font-medium text-gray-600 dark:text-gray-400 mr-2">
                      {t('satisfaction')}
                    </span>
                    {testimonial.satisfaction === 'Satisfied' ? (
                      <div className="flex items-center bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full">
                        <Smile className="w-4 h-4 text-green-500 mr-1" />
                        <span className="text-green-600 dark:text-green-400 font-medium">
                          Satisfied
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center bg-red-100 dark:bg-red-900/30 px-3 py-1 rounded-full">
                        <Frown className="w-4 h-4 text-red-500 mr-1" />
                        <span className="text-red-600 dark:text-red-400 font-medium">
                          Not Satisfied
                        </span>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Recommendation Rating */}
                {typeof testimonial.recommendation === 'number' && (
                  <motion.div 
                    className="mt-4 flex items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400 mr-2">
                      {t('rating')}
                    </span>
                    <div className="flex items-center gap-1">
                      {[...Array(10)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.6 + i * 0.05 }}
                        >
                          <Star
                            className={`w-5 h-5 ${
                              i < (testimonial.recommendation ?? 0)
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-300 dark:text-gray-600'
                            } ${hoveredCard === testimonial._id && i < (testimonial.recommendation ?? 0) ? 'animate-pulse' : ''}`}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}