'use client';

import { ChangeEvent } from 'react';

interface RecordFilterProps {
  filters: {
    propertyType: string;
    location: string;
    priceRange: string;
    date: string;
  };
  setFilters: (filters: RecordFilterProps['filters']) => void;
}

export function RecordFilter({ filters, setFilters }: RecordFilterProps) {
  const handleChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div className="grid md:grid-cols-4 gap-4 mb-8">
      {/* نوع العقار */}
      <div>
        <label className="block text-sm font-medium mb-1">Property Type</label>
        <select
          name="propertyType"
          value={filters.propertyType}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded bg-white dark:bg-zinc-800"
        >
          <option value="">All</option>
          <option value="land">Land</option>
          <option value="apartment">Apartment</option>
          <option value="villa">Villa</option>
          <option value="building">Building</option>
        </select>
      </div>

      {/* الموقع */}
      <div>
        <label className="block text-sm font-medium mb-1">Location</label>
        <select
          name="location"
          value={filters.location}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded bg-white dark:bg-zinc-800"
        >
          <option value="">All</option>
          <option value="Jeddah">Jeddah</option>
          <option value="Riyadh">Riyadh</option>
          <option value="Dammam">Dammam</option>
        </select>
      </div>

      {/* السعر */}
      <div>
        <label className="block text-sm font-medium mb-1">Price Range</label>
        <select
          name="priceRange"
          value={filters.priceRange}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded bg-white dark:bg-zinc-800"
        >
          <option value="">All</option>
          <option value="< 1M">&lt; 1M</option>
          <option value="1M - 3M">1M - 3M</option>
          <option value="> 3M">&gt; 3M</option>
        </select>
      </div>

      {/* التاريخ */}
      <div>
        <label className="block text-sm font-medium mb-1">Date</label>
        <input
          type="date"
          name="date"
          value={filters.date}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded bg-white dark:bg-zinc-800"
        />
      </div>
    </div>
  );
}
