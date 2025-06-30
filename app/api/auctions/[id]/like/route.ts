import { connectDB } from '@/lib/mongodb';
import LikeModel from '@/models/Like';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const ipAddress = req.headers.get('x-forwarded-for') || 'unknown';
    const { id } = await params;

    const [liked, totalLikes] = await Promise.all([
      LikeModel.findOne({ auctionId: id, ipAddress }), // ✅ عدلنا لـ auctionId
      LikeModel.countDocuments({ auctionId: id }),     // ✅ عدلنا لـ auctionId
    ]);

    return NextResponse.json({
      liked: !!liked,
      totalLikes,
    });
  } catch (err) {
    console.error('GET Like Error:', err);
    return NextResponse.json({ message: 'Failed to fetch likes' }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const ipAddress = req.headers.get('x-forwarded-for') || 'unknown';
    const { id } = await params;

    const existing = await LikeModel.findOne({
      auctionId: id,  // ✅ عدلنا لـ auctionId
      ipAddress,
    });

    if (existing) {
      return NextResponse.json({ message: 'Already liked' }, { status: 400 });
    }

    const like = new LikeModel({
      auctionId: id,  // ✅ عدلنا لـ auctionId
      ipAddress,
    });

    await like.save();

    const totalLikes = await LikeModel.countDocuments({
      auctionId: id,  // ✅ عدلنا لـ auctionId
    });

    return NextResponse.json({ liked: true, totalLikes });
  } catch {
    return NextResponse.json({ message: 'Failed to like' }, { status: 500 });
  }
}