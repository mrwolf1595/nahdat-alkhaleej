import { connectDB } from '@/lib/mongodb';
import UpcomingAuction from '@/models/UpcomingAuction';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const {
      title,
      description,
      auctionDate,
      auctionTime,
      startingBid,
      mainImage,
      gallery,
      featured,
      location,
      mapLink,
      properties,
    } = body;

    if (
      !title ||
      !description ||
      !auctionDate ||
      !auctionTime ||
      !startingBid ||
      !mainImage ||
      !Array.isArray(gallery) ||
      !Array.isArray(properties)
    ) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // التحقق من كل عقار
    for (const [index, prop] of properties.entries()) {
      if (!prop.type || !prop.area) {
        return NextResponse.json(
          { message: `Missing type or area in property #${index + 1}` },
          { status: 400 }
        );
      }

      if (!Array.isArray(prop.images) || prop.images.length === 0) {
        return NextResponse.json(
          { message: `Property #${index + 1} must have at least one image.` },
          { status: 400 }
        );
      }
    }

    const newAuction = await UpcomingAuction.create({
      title,
      description,
      auctionDate,
      auctionTime,
      startingBid,
      mainImage,
      gallery,
      featured,
      location: location || '',
      mapLink: mapLink || '',
      properties,
    });

    return NextResponse.json(
      { message: 'Auction created successfully', auction: newAuction },
      { status: 201 }
    );
  } catch (err) {
    console.error('Error creating upcoming auction:', err);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const auctions = await UpcomingAuction.find().sort({ createdAt: -1 });
    return NextResponse.json(auctions, { status: 200 });
  } catch (error) {
    console.error('Error fetching auctions:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

