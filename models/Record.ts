import { Schema, Document, model, models } from 'mongoose';

export type RecordType = 'sales' | 'evaluations' | 'auctions';

export interface IRecord extends Document {
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
  area?: string; // ✅ جديد
  description?: string; // ✅ جديد
  units?: string; // ✅ جديد
  listedPrice?: string;       // ✅ جديد
  listedDate?: string;        // ✅ جديد
  soldPrice?: string;         // for sales
  estimatedValue?: string;    // for evaluations
  startingBid?: string;       // for auctions
  sold?: boolean;             // for auctions
}
const RecordSchema = new Schema<IRecord>(
  {
    property: { type: String, required: true },
    propertyType: { type: String, required: true },
    location: { type: String, required: true },
    area: { type: String }, // ✅ جديد
    description: { type: String }, // ✅ جديد
    date: { type: String, required: true },
    type: { type: String, enum: ['sales', 'evaluations', 'auctions'], required: true },

    image: { type: String },
    gallery: [{ type: String }],
    mapLink: { type: String },
    iframeLink: { type: String },
    yearBuilt: { type: String },
    bedrooms: { type: String },
    bathrooms: { type: String },
    units: { type: String }, // ✅ جديد
    listedPrice: { type: String },
listedDate: { type: String },

    soldPrice: { type: String },        // ✅ للمبيعات
    estimatedValue: { type: String },   // ✅ للتقييم
    startingBid: { type: String },      // ✅ للمزادات
    sold: { type: Boolean },            // ✅ لو العقار اتباع ف المزاد
  },
  { timestamps: true }
);


export const RecordModel = models.Record || model<IRecord>('Record', RecordSchema);
