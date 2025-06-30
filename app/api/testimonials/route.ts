import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Testimonial from '@/models/Testimonial';

// ✅ POST Request (لإضافة Testimonial جديد)
export const POST = async (req: Request) => {
  await connectDB();

  try {
    const form = await req.formData();

    const data: Record<string, string | number | undefined> = {};
    form.forEach((value, key) => {
      data[key] = value instanceof File ? undefined : value;
    });

    const testimonial = await Testimonial.create({
      name: data.name,
      phone: data.phone,
      role: data.role,
      satisfaction: data.satisfaction,
      recommendation: Number(data.recommendation),
      message: data.message,
      useCase: data.useCase || '',
      returning: data.returning || '',
      improvement: data.improvement || '',
      avatarUrl: data.avatarUrl || '',
    });

    return NextResponse.json({ success: true, testimonial }, { status: 201 });
  } catch (error) {
    console.error('[TESTIMONIAL_POST_ERROR]', error);
    return NextResponse.json({ success: false, error: 'Something went wrong.' }, { status: 500 });
  }
};

// ✅ GET Request (لجلب كل الـ Testimonials)
export const GET = async () => {
  await connectDB();

  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    return NextResponse.json(testimonials, { status: 200 });
  } catch (error) {
    console.error('[TESTIMONIAL_GET_ERROR]', error);
    return NextResponse.json([], { status: 200 }); // حتى لو حصل Error رجع Array فاضية عشان الموقع ما يقعش
  }
};
