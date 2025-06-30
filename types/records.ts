export type RecordType = 'sales' | 'evaluations' | 'auctions';

export interface BaseRecord {
  id: number | string;
  property: string;
  propertyType: string;
  location: string;
  date: string;
  type: RecordType;
  image?: string;
  gallery?: string[];
  mapLink?: string;
  iframeLink?: string;
  yearBuilt?: string;
  bedrooms?: string;
  bathrooms?: string;
  area?: string; // ✅ مضافة
  description?: string; // ✅ مضافة
  units?: string; // ✅ مضافة
  listedPrice?: string;
  listedDate?: string;
}

export interface SalesRecord extends BaseRecord {
  type: 'sales';
  soldPrice: string;
  soldDate: string;
}

export interface EvaluationRecord extends BaseRecord {
  type: 'evaluations';
  estimatedValue: string;
}

export interface AuctionRecord extends BaseRecord {
  type: 'auctions';
  startingBid: string;
  sold?: boolean;
}

export type NewRecord = (SalesRecord | EvaluationRecord | AuctionRecord) & {
  _id?: string; // ✅ مهم للتعديل والعرض
};

export type RecordTab = 'sales' | 'evaluations' | 'auctions';

// Add the missing FilterOptions type
export interface FilterOptions {
  propertyType?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: string;
  bathrooms?: string;
  yearBuilt?: string;
}