'use client';

import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Image from 'next/image'; // Import the Image component

interface ImageProps {
  url: string;
}

interface Props {
  images: ImageProps[];
}

export default function PastPropertyImageSlider({ images }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto rounded-lg overflow-hidden shadow-lg mt-6">
      <div className="relative h-64 md:h-80">
        <Image
          src={images[currentIndex].url}
          alt={`Property image ${currentIndex + 1}`}
          layout="fill" // Ensures the image covers the container
          objectFit="cover" // Mimics the "object-cover" class
          className="transition-all duration-500"
        />
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/80 text-gray-700 p-2 rounded-full hover:bg-white shadow-md"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/80 text-gray-700 p-2 rounded-full hover:bg-white shadow-md"
        >
          <FaChevronRight />
        </button>
      </div>
      <div className="flex justify-center mt-3 gap-2">
        {images.map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              i === currentIndex ? 'bg-indigo-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
