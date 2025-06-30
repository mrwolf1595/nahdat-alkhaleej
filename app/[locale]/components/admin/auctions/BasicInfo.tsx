'use client';

import { Award, Calendar, Clock, DollarSign, FileText, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { AuctionFormData } from '@/types/auction';

interface Props {
  formData: AuctionFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  nextStep: () => void;
}

export default function BasicInfo({ formData, handleChange, nextStep }: Props) {
  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Basic Information</h2>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Award className="h-5 w-5 text-gray-400" />
        </div>
        <input
          name="title"
          placeholder="Enter auction title"
          value={formData.title}
          onChange={handleChange}
          className="pl-10 w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
          required
        />
      </div>

    

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="date"
            name="auctionDate"
            value={formData.auctionDate}
            onChange={handleChange}
            className="pl-10 w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            required
          />
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Clock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="time"
            name="auctionTime"
            value={formData.auctionTime}
            onChange={handleChange}
            className="pl-10 w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            required
          />
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <DollarSign className="h-5 w-5 text-gray-400" />
        </div>
        <input
          name="startingBid"
          placeholder="Starting Bid"
          value={formData.startingBid}
          onChange={handleChange}
          className="pl-10 w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
          required
        />
      </div>

      <div className="relative">
        <div className="absolute top-3 left-3 pointer-events-none">
          <FileText className="h-5 w-5 text-gray-400" />
        </div>
        <textarea
          name="description"
          placeholder="Enter a detailed description of the auction"
          value={formData.description}
          onChange={handleChange}
          className="pl-10 w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
          rows={4}
          required
        />
      </div>

      <motion.label
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 bg-gray-50 cursor-pointer"
      >
        <div className={`w-12 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out ${formData.featured ? 'bg-indigo-600' : 'bg-gray-300'}`}>
          <motion.div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${formData.featured ? 'translate-x-6' : ''}`}
            layout
          />
        </div>
        <div className="flex items-center gap-2">
          <Star className={`h-5 w-5 ${formData.featured ? 'text-indigo-600' : 'text-gray-400'}`} />
          <span className={`font-medium ${formData.featured ? 'text-indigo-600' : 'text-gray-600'}`}>Featured Auction</span>
        </div>
        <input
          type="checkbox"
          name="featured"
          checked={formData.featured}
          onChange={handleChange}
          className="hidden"
        />
      </motion.label>

      <div className="flex justify-end pt-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={nextStep}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 shadow-md hover:bg-indigo-700 transition-all duration-200"
        >
          Next Step
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
}
