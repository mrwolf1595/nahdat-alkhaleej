import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Offer from '@/models/Offer';

export const dynamic = 'force-dynamic';

// ✅ GET Offer by ID
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    
    // Properly await params before accessing properties
    const { id } = await params;
    const offer = await Offer.findById(id);

    if (!offer) {
      return NextResponse.json({ message: 'Offer not found' }, { status: 404 });
    }

    return NextResponse.json({
      ...offer.toObject(),
      nearbyPlaces: (offer.nearbyPlaces || []).map((place: { name?: string }) => ({
        name: place?.name || place
      }))
    });
  } catch (error) {
    console.error('Error fetching offer:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

// ✅ Create New Offer (POST to /api/offers)
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      title,
      description,
      price,
      location,
      mainImage,
      gallery,
      featuredAmenities,
      nearbyPlaces,
      sqft,
      area,
      bedrooms,
      bathrooms,
      yearBuilt,
      youtubeLink,
      videoUrl,
      offerType,
      featured,
    } = body;

    if (!title || !price || !location || !mainImage) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    await connectDB();

    const newOffer = await Offer.create({
      title,
      description,
      price,
      location,
      mainImage,
      gallery: gallery || [],
      featuredAmenities: featuredAmenities || [],
      nearbyPlaces: nearbyPlaces || [],
      sqft,
      area,
      bedrooms,
      bathrooms,
      yearBuilt,
      youtubeLink,
      videoUrl,
      offerType,
      featured,
    });

    return NextResponse.json({ message: 'Offer created', offer: newOffer }, { status: 201 });
  } catch (error) {
    console.error('Error creating offer:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
