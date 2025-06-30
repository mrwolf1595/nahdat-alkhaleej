import mongoose, { Schema, Document } from 'mongoose';

export type PropertyType = 'land' | 'apartment' | 'villa' | 'building';

export interface PropertyImage {
  url: string;
  public_id: string;
}

export interface PastAuctionProperty {
  type: PropertyType;
  location: string;
  area: string;
  bedrooms?: number;
  bathrooms?: number;
  price?: string;
  mapLink?: string;
  iframeLink?: string;
  featuredAmenities?: string[];
  nearbyPlaces?: string[];
  images?: PropertyImage[];
  sold: boolean;
}

export interface IPastAuction extends Document {
  title: string;
  description: string;
  auctionDate: string;
  auctionTime: string;
  location: string;
  mapLink?: string;
  mainImage: string;
  gallery: string[];
  featured: boolean;
  properties: PastAuctionProperty[];
  createdAt: Date;
  updatedAt: Date;
}

const PropertyImageSchema = new Schema<PropertyImage>(
  {
    url: { type: String, required: true },
    public_id: { type: String, required: true },
  },
  { _id: false }
);

const PastAuctionPropertySchema = new Schema<PastAuctionProperty>(
  {
    type: { type: String, enum: ['land', 'apartment', 'villa', 'building'], required: true },
    location: { type: String, required: true },
    area: { type: String, required: true },
    bedrooms: { type: Number },
    bathrooms: { type: Number },
    price: { type: String },
    mapLink: { type: String },
    iframeLink: { type: String },
    featuredAmenities: [{ type: String }],
    nearbyPlaces: [{ type: String }],
    images: [PropertyImageSchema],
    sold: { type: Boolean, required: true },
  },
  { _id: false }
);

const PastAuctionSchema = new Schema<IPastAuction>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    auctionDate: { type: String, required: true },
    auctionTime: { type: String, required: true },
    location: { type: String, required: true },
    mapLink: { type: String },
    mainImage: { type: String, required: true },
    gallery: [{ type: String }],
    featured: { type: Boolean, default: false },
    properties: [PastAuctionPropertySchema],
  },
  { timestamps: true }
);

// ✅ ضمان تحديث الموديل
delete mongoose.models.PastAuction;
export default mongoose.model<IPastAuction>('PastAuction', PastAuctionSchema);
