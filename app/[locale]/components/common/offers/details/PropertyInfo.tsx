'use client';

import { MapPin, Home } from 'lucide-react';

interface PropertyInfoProps {
  title: string;
  location: string;
  area?: string;
  bedrooms?: number;
  bathrooms?: number;
  yearBuilt?: string;
  price: string | number;
  description?: string;
}

const PropertyInfo: React.FC<PropertyInfoProps> = ({
  title,
  location,
  area,
  bedrooms,
  bathrooms,
  yearBuilt,
  price,
  description,
}) => {
  return (
    <div className="flex flex-col gap-6 mb-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{title}</h1>
          <p className="flex items-center text-zinc-600 dark:text-zinc-300 text-lg mb-2">
            <MapPin size={18} className="mr-1" />
            {location}
          </p>
          <div className="flex flex-wrap gap-4 text-zinc-700 dark:text-zinc-300">
            {area && (
              <span className="flex items-center">
                <Home size={16} className="mr-1" />
                {area}
              </span>
            )}
            {bedrooms && <span>{bedrooms} Beds</span>}
            {bathrooms && <span>{bathrooms} Baths</span>}
            {yearBuilt && <span>Built {yearBuilt}</span>}
          </div>
        </div>

        <div className="text-3xl font-semibold text-blue-600 dark:text-blue-400">
          {typeof price === 'number' ? `$${price.toLocaleString()}` : price}
        </div>
      </div>

      {/* ✅ Property Description */}
      {description && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
            {description}
          </p>
        </div>
      )}
    </div>
  );
};

export default PropertyInfo;
