export type PropertyType = 'land' | 'apartment' | 'villa' | 'building';

export interface AuctionProperty {
  title: string;
  location: string;
  type: PropertyType;
  iframeLink?: string; 
  area: string;
  bedrooms?: number;
  bathrooms?: number;
  price?: string;
  mapLink?: string;
  featuredAmenities?: string[];
  nearbyPlaces?: string[];
  images?: { url: string }[];
}

export interface Auction {
  _id: string;
  title: string;
  auctionDate: string;
  auctionTime: string;
  startingBid: string;
  description: string;
  mainImage: string;
  gallery: string[];
  featured: boolean;
  properties: AuctionProperty[];
  createdAt: Date;
  updatedAt: Date;
}

// 📦 تستخدمه في الفورم والإنشاء
export type AuctionFormData = Omit<Auction, '_id' | 'createdAt' | 'updatedAt'>;
// Define and export the AuctionDetail type
export interface AuctionDetail {
  createdAt: string;
  id: string;
  name: string;
  date: string;
  properties?: Array<{
    location: string;
    mapLink: string;
    title: string;
    price: string;
    area: string;
    type: string;
    images?: Array<{ url: string }>;
  }>;
}
export interface AuctionDetail {
  _id: string;
  title: string;
  auctionDate: string;
  auctionTime: string;
  startingBid: string;
  description: string;
  mainImage: string;
  gallery: string[]; // ✅ gallery موجودة على المزاد مش على العقار
  featured: boolean;
  location: string;
  estimatedValue?: number;
}
