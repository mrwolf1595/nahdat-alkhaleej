import mongoose, { Schema, Document } from 'mongoose';

export type PropertyType = 'land' | 'apartment' | 'villa' | 'building';

export interface PropertyImage {
  url: string;
  public_id: string;
}

export interface AuctionProperty {
  type: PropertyType;
  area: string;
  price?: string;
  bedrooms?: number;
  bathrooms?: number;
  title?: string;
  mapLink?: string;
  iframeLink: { type: String },
  featuredAmenities?: string[];
  nearbyPlaces?: string[];
  images?: PropertyImage[];
  location: string;
}

export interface IUpcomingAuction extends Document {
  title: string;
  description: string;
  location: string;
  mapLink: string;
  auctionDate: string;
  auctionTime: string;
  startingBid: string;
  mainImage: string;
  gallery: string[];
  featured: boolean;
  properties: AuctionProperty[];
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

const AuctionPropertySchema = new Schema<AuctionProperty>(
  {
    type: { type: String, enum: ['land', 'apartment', 'villa', 'building'], required: true },
    area: { type: String, required: true },
    price: { type: String },
    bedrooms: { type: Number },
    bathrooms: { type: Number },
    title: { type: String },
    mapLink: { type: String },
    iframeLink: { type: String },
    featuredAmenities: [{ type: String }],
    nearbyPlaces: [{ type: String }],
    images: [PropertyImageSchema], // ✅ صور خاصة بكل عقار
    location: { type: String, default: '' }
  },
  { _id: false }
);

const UpcomingAuctionSchema = new Schema<IUpcomingAuction>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, default: '' },
    mapLink: { type: String, default: '' },
    auctionDate: { type: String, required: true },
    auctionTime: { type: String, required: true },
    startingBid: { type: String, required: true },
    mainImage: { type: String, required: true },
    gallery: [{ type: String }],
    featured: { type: Boolean, default: false },
    properties: [AuctionPropertySchema], // ✅ كل عقار جوه المزاد
  },
  { timestamps: true }
);

delete mongoose.models.UpcomingAuction; // 🔥 force reload schema
export default mongoose.model<IUpcomingAuction>('UpcomingAuction', UpcomingAuctionSchema);
