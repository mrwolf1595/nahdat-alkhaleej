// app/api/public/upcoming-auctions/[id]/route.ts
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import UpcomingAuction from '@/models/UpcomingAuction';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    
    const auction = await UpcomingAuction.findById(id);
    if (!auction) {
      return NextResponse.json({ message: 'Auction not found' }, { status: 404 });
    }
    
    // Check if auction is expired (safety check)
    const now = new Date();
    const auctionDateTime = new Date(`${auction.auctionDate}T${auction.auctionTime}`);
    
    if (auctionDateTime < now) {
      return NextResponse.json({ message: 'Auction has ended' }, { status: 404 });
    }
    
    return NextResponse.json(auction);
  } catch (error) {
    console.error('Error fetching auction:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}