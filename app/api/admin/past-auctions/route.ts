import { connectDB } from '@/lib/mongodb';
import PastAuction from '@/models/PastAuction';
import { NextResponse } from 'next/server';

// ✅ POST: إنشاء مزاد سابق
export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const {
      title,
      description,
      auctionDate,
      auctionTime,
      location,
      mapLink,
      mainImage,
      gallery,
      featured,
      properties,
    } = body;

    if (
      !title ||
      !description ||
      !auctionDate ||
      !auctionTime ||
      !location ||
      !mainImage ||
      !Array.isArray(properties)
    ) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    for (const [index, prop] of properties.entries()) {
      if (!prop.type || !prop.area || typeof prop.sold !== 'boolean') {
        return NextResponse.json(
          { message: `Missing required property fields in item ${index + 1}` },
          { status: 400 }
        );
      }
    }

    const newAuction = await PastAuction.create({
      title,
      description,
      auctionDate,
      auctionTime,
      location,
      mapLink,
      mainImage,
      gallery: gallery || [],
      featured: featured || false,
      properties,
    });

    return NextResponse.json({ message: 'Past auction created', auction: newAuction }, { status: 201 });
  } catch (error) {
    console.error('Error creating past auction:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

// ✅ GET: استرجاع كل المزادات السابقة
export async function GET() {
  try {
    await connectDB();
    const auctions = await PastAuction.find().sort({ createdAt: -1 });
    return NextResponse.json(auctions, { status: 200 });
  } catch (error) {
    console.error('Error fetching past auctions:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
