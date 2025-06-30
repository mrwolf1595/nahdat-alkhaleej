import { connectDB } from '@/lib/mongodb';
import UpcomingAuction from '@/models/UpcomingAuction';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();
    const auctions = await UpcomingAuction.find().sort({ auctionDate: 1 });
    return NextResponse.json(auctions, { status: 200 });
  } catch (error) {
    console.error('Error fetching upcoming auctions:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
