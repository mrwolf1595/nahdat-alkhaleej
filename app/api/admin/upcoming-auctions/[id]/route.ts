import { connectDB } from '@/lib/mongodb';
import UpcomingAuction from '@/models/UpcomingAuction';
import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// إعداد Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// GET auction by ID
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

    return NextResponse.json(auction, { status: 200 });
  } catch (error) {
    console.error('Error fetching auction by ID:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

// PATCH auction by ID
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();

    const updated = await UpcomingAuction.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updated) {
      return NextResponse.json({ message: 'Auction not found' }, { status: 404 });
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error('Error updating auction:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(
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

    // استخراج public_id من روابط Cloudinary
    const extractPublicId = (url: string) => {
      const parts = url.split('/');
      const filename = parts[parts.length - 1].split('.')[0];
      return `auctions/upcoming/${filename}`;
    };

    const publicIds = [
      extractPublicId(auction.mainImage),
      ...auction.gallery.map((url: string) => extractPublicId(url)),
    ];

    // حذف الصور من Cloudinary
    await Promise.all(publicIds.map((publicId) => cloudinary.uploader.destroy(publicId)));

    // حذف من قاعدة البيانات
    await auction.deleteOne();

    return NextResponse.json({ message: 'Auction deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting auction:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}