// app/api/offers/[id]/delete/route.ts
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Offer from '@/models/Offer';
import { deleteFromCloudinary } from '@/lib/cloudinary'; // نفترض وجود دالة مساعدة

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const offer = await Offer.findById(id);

    if (!offer) {
      return NextResponse.json({ message: 'Offer not found' }, { status: 404 });
    }

    // حذف الصور من Cloudinary
    if (offer.mainImage) await deleteFromCloudinary(offer.mainImage);
    if (offer.gallery && Array.isArray(offer.gallery)) {
      await Promise.all(offer.gallery.map((img: string) => deleteFromCloudinary(img)));
    }

    // حذف العرض من MongoDB
    await Offer.findByIdAndDelete(id);

    return NextResponse.json({ message: 'Offer deleted' }, { status: 200 });
  } catch (err) {
    console.error('Error deleting offer:', err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}