// ✅ Ensure normal runtime is active
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Offer from '@/models/Offer';
import Like from '@/models/Like';

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();

    // Properly await params before destructuring
    const { id } = await params;
    const ip = req.headers.get('x-forwarded-for') || 'unknown';

    const offer = await Offer.findById(id);
    if (!offer) {
      return NextResponse.json({ message: 'Offer not found' }, { status: 404 });
    }

    const existingLike = await Like.findOne({ offerId: id, ipAddress: ip });
    if (existingLike) {
      return NextResponse.json({ message: 'Already liked' }, { status: 409 });
    }

    await Like.create({ offerId: id, ipAddress: ip });
    offer.likes = (offer.likes || 0) + 1;
    await offer.save();

    return NextResponse.json({ message: 'Liked', likes: offer.likes }, { status: 200 });
  } catch (err) {
    console.error('Error updating like:', err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();

    // Properly await params before destructuring
    const { id } = await params;
    const ip = req.headers.get('x-forwarded-for') || 'unknown';

    const existingLike = await Like.findOne({ offerId: id, ipAddress: ip });

    return NextResponse.json({
      liked: !!existingLike,
    });
  } catch (err) {
    console.error('Error checking like:', err);
    return NextResponse.json({ liked: false }, { status: 200 }); // Return false instead of breaking
  }
}