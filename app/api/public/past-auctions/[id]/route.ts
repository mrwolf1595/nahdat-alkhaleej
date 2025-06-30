import { connectDB } from '@/lib/mongodb';
import PastAuction from '@/models/PastAuction';
import { NextResponse } from 'next/server';

export async function GET(
  _req: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    const auction = await PastAuction.findById(id);

    if (!auction) {
      return NextResponse.json({ message: 'Auction not found' }, { status: 404 });
    }

    return NextResponse.json(auction, { status: 200 });
  } catch (err) {
    console.error('Error fetching past auction by ID:', err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}