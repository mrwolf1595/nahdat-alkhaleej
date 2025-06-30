'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, MapPin, DollarSign, AlignLeft } from 'lucide-react';

interface TextFieldsProps {
  title: string;
  description: string;
  price: string;
  location: string;
  sqft: string;
  area: string;
  bedrooms: string;
  bathrooms: string;
  yearBuilt: string;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onPriceChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onSqftChange: (value: string) => void;
  onAreaChange: (value: string) => void;
  onBedroomsChange: (value: string) => void;
  onBathroomsChange: (value: string) => void;
  onYearBuiltChange: (value: string) => void;
}

const TextFields: FC<TextFieldsProps> = ({
  title,
  description,
  price,
  location,
  sqft,
  area,
  bedrooms,
  bathrooms,
  yearBuilt,
  onTitleChange,
  onDescriptionChange,
  onPriceChange,
  onLocationChange,
  onSqftChange,
  onAreaChange,
  onBedroomsChange,
  onBathroomsChange,
  onYearBuiltChange,
}) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100 },
    },
  };

  return (
    <div className="space-y-5">
      <motion.div variants={itemVariants} className="group relative">
        <label className="flex items-center gap-2 font-medium text-gray-700 mb-1.5">
          <BookOpen size={16} className="text-blue-600" />
          <span>Title</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
          placeholder="Enter property title"
        />
      </motion.div>

      <motion.div variants={itemVariants} className="group relative">
        <label className="flex items-center gap-2 font-medium text-gray-700 mb-1.5">
          <AlignLeft size={16} className="text-blue-600" />
          <span>Description</span>
        </label>
        <textarea
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
          rows={4}
          placeholder="Describe the property"
        />
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <motion.div variants={itemVariants} className="group relative">
          <label className="flex items-center gap-2 font-medium text-gray-700 mb-1.5">
            <DollarSign size={16} className="text-blue-600" />
            <span>Price</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              value={price}
              onChange={(e) => onPriceChange(e.target.value)}
              className="w-full border border-gray-300 pl-8 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
              placeholder="0.00"
            />
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="group relative">
          <label className="flex items-center gap-2 font-medium text-gray-700 mb-1.5">
            <MapPin size={16} className="text-blue-600" />
            <span>Location</span>
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => onLocationChange(e.target.value)}
            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
            placeholder="Enter location"
          />
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="group relative">
        <label className="font-medium text-gray-700 mb-1.5">Square Footage (sqft)</label>
        <input
          type="text"
          value={sqft}
          onChange={(e) => onSqftChange(e.target.value)}
          className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200 outline-none"
          placeholder="e.g. 1200"
        />
      </motion.div>

      <motion.div variants={itemVariants} className="group relative">
        <label className="font-medium text-gray-700 mb-1.5">Area</label>
        <input
          type="text"
          value={area}
          onChange={(e) => onAreaChange(e.target.value)}
          className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200 outline-none"
          placeholder="e.g. Al Zahra District"
        />
      </motion.div>

      <div className="grid grid-cols-2 gap-5">
        <motion.div variants={itemVariants} className="group relative">
          <label className="font-medium text-gray-700 mb-1.5">Bedrooms</label>
          <input
            type="number"
            value={bedrooms}
            onChange={(e) => onBedroomsChange(e.target.value)}
            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200 outline-none"
          />
        </motion.div>

        <motion.div variants={itemVariants} className="group relative">
          <label className="font-medium text-gray-700 mb-1.5">Bathrooms</label>
          <input
            type="number"
            value={bathrooms}
            onChange={(e) => onBathroomsChange(e.target.value)}
            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200 outline-none"
          />
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="group relative">
        <label className="font-medium text-gray-700 mb-1.5">Year Built</label>
        <input
          type="text"
          value={yearBuilt}
          onChange={(e) => onYearBuiltChange(e.target.value)}
          className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200 outline-none"
          placeholder="e.g. 2020"
        />
      </motion.div>
    </div>
  );
};

export default TextFields;
