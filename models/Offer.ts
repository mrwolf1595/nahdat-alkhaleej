import mongoose, { Schema, Document } from 'mongoose';

export interface IOffer extends Document {
  title: string;
  description?: string;
  price: number;
  location: string;
  mainImage: string;
  gallery?: string[];
  youtubeLink?: string;
videoUrl?: string;
  likes?: number;
  featuredAmenities?: string[];
  nearbyPlaces?: string[];
  sqft?: string;
  videoLinks?: string[];
  area?: string;
  bedrooms?: number;
  bathrooms?: number;
  yearBuilt?: string;
  offerType: 'sale' | 'rent'; // ✅
  featured: boolean; // ✅
  createdAt?: Date;
  updatedAt?: Date;
}

const OfferSchema = new Schema<IOffer>(
  {
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    mainImage: { type: String, required: true },
    gallery: [{ type: String }],
    youtubeLink: { type: String },
videoUrl: { type: String },
videoLinks: { type: [String], default: [] }, // ✅ هنا المفتاح
    likes: { type: Number, default: 0 },
    featuredAmenities: { type: [String], default: [] },
    nearbyPlaces: { type: [String], default: [] },
    sqft: { type: String },
    area: { type: String },
    bedrooms: { type: Number },
    bathrooms: { type: Number },
    yearBuilt: { type: String },
    featured: { type: Boolean, default: false }, // ✅
    offerType: { type: String, enum: ['sale', 'rent'], required: true }, // ✅
  },
  {
    timestamps: true,
  }
);

const Offer = mongoose.models.Offer || mongoose.model<IOffer>('Offer', OfferSchema);
export default Offer;
