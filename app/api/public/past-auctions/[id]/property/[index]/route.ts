import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import PastAuction from '@/models/PastAuction';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string; index: string }> }
) {
  try {
    await connectDB();

    const { id, index: indexStr } = await params;
    const index = parseInt(indexStr, 10);
    
    const auction = await PastAuction.findById(id);
    if (!auction) {
      return NextResponse.json({ message: 'Auction not found' }, { status: 404 });
    }

    const property = auction.properties[index];

    if (!property) {
      return NextResponse.json({ message: 'Property not found' }, { status: 404 });
    }

    return NextResponse.json(property);
  } catch (error) {
    console.error('Error fetching property:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}