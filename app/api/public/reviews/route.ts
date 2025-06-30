import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { ReviewModel } from '@/models/Review';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const targetId = req.nextUrl.searchParams.get('targetId');
    if (!targetId) {
      return NextResponse.json({ message: 'targetId is required' }, { status: 400 });
    }

    const reviews = await ReviewModel.find({ targetId }).sort({ createdAt: -1 });
    return NextResponse.json(reviews);
  } catch (err) {
    console.error('GET /reviews error:', err);
    return NextResponse.json({ message: 'Failed to fetch reviews' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    const { targetId, targetType, rating, comment } = body;

    if (!targetId || !targetType || !rating) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const review = new ReviewModel({ targetId, targetType, rating, comment });
    await review.save();

    return NextResponse.json({ message: 'Review added successfully', review }, { status: 201 });
  } catch (err) {
    console.error('POST /reviews error:', err);
    return NextResponse.json({ message: 'Failed to add review' }, { status: 500 });
  }
}
