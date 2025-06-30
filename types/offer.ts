export interface Offer {
  amenities: never[];
  nearBy: never[];
  _id: string;
  title: string;
  description: string;
  price: string | number;
  location: string;
  type?: string;
  mainImage: string;
  likes?: number;
  gallery?: string[];
  images: string[];
  bedrooms?: number;
  videoLinks?: string[];
  bathrooms?: number;
  youtubeLink?: string;
videoUrl?: string;
  area?: string;
  sqft?:number
  yearBuilt?: string;
  featuredAmenities?: string[];
  nearbyPlaces?: (string | { name: string })[];
  offerType?: 'sale' | 'rent';
  featured?: boolean;
  agentInfo?: {
    name: string;
    phone: string;
    email: string;
    photo: string;
  };
}
