import { connectDB } from '@/lib/mongodb';
import Like from '@/models/Like';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const propertyId = searchParams.get('propertyId'); // ✅ خد بالك هنا

    if (!propertyId) {
      return NextResponse.json({ count: 0 });
    }

    const count = await Like.countDocuments({ auctionId: propertyId }); // ✅ لاحظ بندور بـ auctionId هنا
    return NextResponse.json({ count });
  } catch (error) {
    console.error('Failed to fetch likes count:', error);
    return NextResponse.json({ count: 0 });
  }
}
