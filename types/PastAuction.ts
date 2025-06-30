export type PropertyType = 'land' | 'apartment' | 'villa' | 'building';

export interface PropertyImage {
  url: string;
  public_id: string;
}

export interface PastAuctionProperty {
  propertyType: string;
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
  sold: boolean; // ✅ تم البيع أو لا
}

export interface PastAuction {
  _id: string;
  title: string;
  description: string;
  auctionDate: string; // date of auction (end date)
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

// تستخدم في الإنشاء
export type PastAuctionFormData = Omit<PastAuction, '_id' | 'createdAt' | 'updatedAt'>;
