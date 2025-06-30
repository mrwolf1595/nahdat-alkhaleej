import { connectDB } from '@/lib/mongodb';
import PastAuction from '@/models/PastAuction';
import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// GET past auction by ID
export async function GET(
  req: Request,
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
  } catch (error) {
    console.error('Error fetching past auction:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

// PATCH past auction by ID
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();

    const updated = await PastAuction.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updated) {
      return NextResponse.json({ message: 'Auction not found' }, { status: 404 });
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error('Error updating past auction:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

// DELETE past auction by ID
export async function DELETE(
  req: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    
    const { id } = await params;
    const deletedAuction = await PastAuction.findByIdAndDelete(id);
    
    if (!deletedAuction) {
      return NextResponse.json({ message: 'Auction not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Auction deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting auction:', error);
    return NextResponse.json({ message: 'Server error while deleting auction' }, { status: 500 });
  }
}