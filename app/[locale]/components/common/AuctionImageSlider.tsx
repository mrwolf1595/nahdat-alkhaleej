'use client';

import Image from 'next/image';
import { useState } from 'react';

interface Props {
  images: string[];
}

export default function AuctionImageSlider({ images }: Props) {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((current - 1 + images.length) % images.length);
  const next = () => setCurrent((current + 1) % images.length);

  return (
    <div className="relative mb-6">
      <div className="relative h-96 w-full rounded-lg overflow-hidden">
        <Image
          src={images[current]}
          alt={`Property Image ${current + 1}`}
          fill
          className="object-cover"
        />
      </div>

      <button
        onClick={prev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
      >
        ◀
      </button>

      <button
        onClick={next}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
      >
        ▶
      </button>

      <div className="mt-3 flex justify-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full ${
              index === current ? 'bg-orange-600' : 'bg-gray-300'
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}
