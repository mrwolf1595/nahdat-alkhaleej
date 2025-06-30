export interface PublicAuction {
    id: string; // ← mapped from _id
    title: string;
    description: string;
    auctionDate: string;
    auctionTime: string;
    startingBid: string;
    location: string;
    mainImage: string;
    featured: boolean;
    bedrooms?: number;
    bathrooms?: number;
    area?: string;
    estimatedValue?: string;
  }
  