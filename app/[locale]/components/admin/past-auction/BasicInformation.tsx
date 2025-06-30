'use client';

import { ChangeEvent } from 'react';

interface Props {
  formData: {
    title: string;
    description: string;
    auctionDate: string;
    auctionTime: string;
    location: string;
    mapLink?: string;
  };  
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  nextStep: () => void;
}

export default function BasicInformation({ formData, handleChange, nextStep }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-gray-700 font-medium mb-1">Auction Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
          placeholder="Enter auction title"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={5}
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
          placeholder="Enter auction description"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Auction Date</label>
          <input
            type="date"
            name="auctionDate"
            value={formData.auctionDate}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Auction Time</label>
          <input
            type="time"
            name="auctionTime"
            value={formData.auctionTime}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-1">Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
          placeholder="Enter location"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-1">Map Link (Optional)</label>
        <input
          type="text"
          name="mapLink"
          value={formData.mapLink}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
          placeholder="Google Maps iframe link"
        />
      </div>

      <div className="text-right">
        <button
          type="button"
          onClick={nextStep}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium"
        >
          Next
        </button>
      </div>
    </div>
  );
}
