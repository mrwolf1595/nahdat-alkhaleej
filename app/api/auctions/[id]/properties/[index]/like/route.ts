import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Like from '@/models/Like';


export async function PATCH(
  req: NextRequest, 
  { params }: { params: Promise<{ id: string; index: string }> }
) {
  await connectDB();

  try {
    // Await the params object to access its properties
    const { id, index } = await params;
    
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';

    const propertyId = `${id}_property_${index}`;

    // Check if user already liked this property
    const existingLike = await Like.findOne({ auctionId: propertyId, ipAddress: ip });
    if (existingLike) {
      return NextResponse.json({ message: 'You already liked this property.' }, { status: 400 });
    }

    const newLike = new Like({
      auctionId: propertyId,
      ipAddress: ip,
    });

    await newLike.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Like property error:', error);
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}