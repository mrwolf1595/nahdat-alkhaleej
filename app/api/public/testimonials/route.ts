import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Testimonial from '@/models/Testimonial';

export const dynamic = 'force-dynamic'; // لو عايزها دايمًا fresh

export async function GET() {
  try {
    await connectDB();

    const testimonials = await Testimonial.find()
    .sort({ createdAt: -1 })
    .limit(20)
    .select('name role message avatarUrl satisfaction recommendation'); // ✅ أضف الحقول دي
  

    return NextResponse.json(testimonials);
  } catch (error) {
    console.error('[GET_TESTIMONIALS_ERROR]', error);
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}
