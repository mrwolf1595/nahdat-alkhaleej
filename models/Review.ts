import {Schema, Document, models, model } from 'mongoose';

export interface IReview extends Document {
  targetId: string; // العرض أو المزاد
  targetType: 'offer' | 'auction';
  rating: number;   // عدد النجوم
  comment?: string; // تعليق نصي اختياري
  createdAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    targetId: { type: String, required: true },
    targetType: { type: String, enum: ['offer', 'auction'], required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

export const ReviewModel =
  models.Review || model<IReview>('Review', ReviewSchema);
