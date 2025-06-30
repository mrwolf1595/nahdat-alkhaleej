// lib/getOfferById.ts
import { connectDB } from '../lib/mongodb';
import Offer from '../models/Offer';

export const getOfferById = async (id: string) => {
  try {
    await connectDB();
    const offer = await Offer.findById(id).lean();
    return JSON.parse(JSON.stringify(offer)); // عشان Next.js يتعامل مع ObjectId
  } catch (error) {
    console.error('Error fetching offer:', error);
    return null;
  }
};
