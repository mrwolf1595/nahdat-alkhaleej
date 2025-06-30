// app/api/public/offers/route.ts
import { connectDB } from '@/lib/mongodb'
import Offer from '@/models/Offer'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    await connectDB();
    const allOffers = await Offer.find().sort({ createdAt: -1 });

    const featured = allOffers.filter(offer => offer.featured === true);
    const forSale = allOffers.filter(offer => offer.offerType === 'sale');
    const forRent = allOffers.filter(offer => offer.offerType === 'rent');

    return NextResponse.json({
      all: allOffers,
      featured,
      forSale,
      forRent,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Error fetching offers' }, { status: 500 });
  }
}

