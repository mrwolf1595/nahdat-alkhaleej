
'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import { MessageSquareQuote } from 'lucide-react';
import Image from 'next/image';

interface Testimonial {
  _id: string;
  name: string;
  role?: string;
  message: string;
  avatarUrl?: string;
  satisfaction?: 'Satisfied' | 'Not Satisfied';
  recommendation?: number;
}

interface Props {
  testimonials: Testimonial[];
}

export default function TestimonialsSlider({ testimonials }: Props) {
  return (
    <section className="py-16 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            What People Are Saying
          </h2>
          <p className="text-gray-500 dark:text-gray-400">Real feedback from our valued users</p>
        </div>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 4000 }}
          pagination={{ clickable: true }}
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial._id}>
              <div className="bg-gray-50 dark:bg-gray-900 p-6 md:p-10 rounded-xl shadow-md max-w-3xl mx-auto">
                <div className="flex items-center mb-4 gap-4">
                  {testimonial.avatarUrl ? (
                    <Image
                      src={testimonial.avatarUrl}
                      alt={testimonial.name}
                      width={56}
                      height={56}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white flex items-center justify-center font-bold text-xl">
                      {testimonial.name.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white">{testimonial.name}</h4>
                    {testimonial.role && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                    )}
                  </div>
                </div>

                <p className="text-gray-700 dark:text-gray-300 italic">
                  <MessageSquareQuote className="inline-block w-5 h-5 mr-2 text-blue-500" />
                  {testimonial.message}
                </p>

                <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-semibold">Satisfaction:</span>{' '}
                  {testimonial.satisfaction === 'Satisfied' ? '✅ Satisfied' : '❌ Not Satisfied'}
                </p>

                {testimonial.recommendation && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-semibold">Recommendation:</span>{' '}
                    {testimonial.recommendation}/10
                  </p>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
