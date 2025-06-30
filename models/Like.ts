import mongoose, { Schema, Document } from 'mongoose';

export interface ILike extends Document {
  offerId?: string;
  auctionId?: string;
  ipAddress: string;
  createdAt: Date;
}

const LikeSchema = new Schema<ILike>(
  {
    offerId: { type: String, required: false },
    auctionId: { type: String, required: false },
    ipAddress: { type: String, required: true },
  },
  { timestamps: true }
);

const Like = mongoose.models.Like || mongoose.model<ILike>('Like', LikeSchema);

export default Like;
