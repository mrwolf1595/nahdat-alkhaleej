import { Schema, model, models, Document } from 'mongoose';
export interface ITestimonial extends Document {
  name: string;
  phone: string;
  role?: string;
  satisfaction: 'Satisfied' | 'Not Satisfied';
  recommendation?: number;
  message: string;
  useCase?: 'Buy' | 'Sell' | 'Auction' | 'Browsing';
  returning?: 'Yes' | 'Maybe' | 'No';
  improvement?: string;
  avatarUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String },
    satisfaction: {
      type: String,
      required: true,
      enum: ['Satisfied', 'Not Satisfied'],
    },
    recommendation: {
      type: Number,
      min: 1,
      max: 10,
    },
    message: { type: String, required: true },
    useCase: {
      type: String,
      enum: ['Buy', 'Sell', 'Auction', 'Browsing'],
    },
    returning: {
      type: String,
      enum: ['Yes', 'Maybe', 'No'],
    },
    improvement: { type: String },
    avatarUrl: { type: String },
  },
  {
    timestamps: true,
  }
);

export default models.Testimonial || model<ITestimonial>('Testimonial', TestimonialSchema);
