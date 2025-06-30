// app/api/public/upcoming-auctions/route.ts
import { connectDB } from '@/lib/mongodb';
import UpcomingAuction from '@/models/UpcomingAuction';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();
    
    // Get current date for filtering
    const now = new Date();
    
    // Find all auctions and filter out expired ones
    const auctions = await UpcomingAuction.find().sort({ auctionDate: 1 });
    
    // Filter out expired auctions (safety check)
    const upcomingAuctions = auctions.filter(auction => {
      const auctionDateTime = new Date(`${auction.auctionDate}T${auction.auctionTime}`);
      return auctionDateTime >= now;
    });
    
    return NextResponse.json(upcomingAuctions, { status: 200 });
  } catch (error) {
    console.error('Error fetching upcoming auctions:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}