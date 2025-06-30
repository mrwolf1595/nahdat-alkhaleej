import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Offer from '@/models/Offer';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      title,
      description,
      price,
      location,
      offerType,
      featured,
      mainImage,
      gallery,
      featuredAmenities,
      nearbyPlaces,
      sqft,
      area,
      bedrooms,
      bathrooms,
      yearBuilt,
      youtubeLink,     // ✅ أضف هنا
      videoUrl,        // ✅ وأضف هنا
    } = body;

    if (!offerType || !['sale', 'rent'].includes(offerType)) {
      return NextResponse.json({ message: 'Invalid or missing offer type' }, { status: 400 });
    }

    if (!title || !price || !location || !mainImage || !offerType) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    await connectDB();

    const newOffer = await Offer.create({
      title,
      description,
      price,
      location,
      offerType,
      featured,
      mainImage,
      gallery: gallery || [],
      featuredAmenities: featuredAmenities || [],
      nearbyPlaces: nearbyPlaces || [],
      sqft,
      area,
      bedrooms,
      bathrooms,
      yearBuilt,
      youtubeLink,     // ✅ إضافة الحقل هنا
      videoUrl: videoUrl || '', // ✅ حتى لو فاضي
    });

    return NextResponse.json({ message: 'Offer created', offer: newOffer }, { status: 201 });
  } catch (error) {
    console.error('Error creating offer:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}



// ✅ GET method لعرض كل العروض
export async function GET() {
  try {
    await connectDB();
    const offers = await Offer.find().sort({ createdAt: -1 });

    return NextResponse.json(offers);
  } catch (error) {
    console.error('Error fetching offers:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
