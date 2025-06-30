import { connectDB } from '@/lib/mongodb';
import PastAuction from '@/models/PastAuction';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();
    const auctions = await PastAuction.find().sort({ auctionDate: -1 });
    return NextResponse.json(auctions, { status: 200 });
  } catch (error) {
    console.error('Error loading past auctions:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
