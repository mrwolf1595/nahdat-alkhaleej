import { connectDB } from '@/lib/mongodb';
import Offer from '@/models/Offer';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
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
      offerType,
      featured,
      videoLinks, // Added video links field
    } = body;

    const updatedOffer = await Offer.findByIdAndUpdate(
      id,
      {
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
        offerType,
        featured,
        videoLinks, // Added video links field
      },
      { new: true }
    );

    if (!updatedOffer) {
      return NextResponse.json({ message: 'Offer not found' }, { status: 404 });
    }

    return NextResponse.json({
      message: 'Offer updated successfully',
      offer: updatedOffer,
    });
  } catch (error) {
    console.error('Error updating offer:', error);
    return NextResponse.json({ message: 'Failed to update offer' }, { status: 500 });
  }
}