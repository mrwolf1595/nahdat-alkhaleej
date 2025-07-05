import { connectDB } from '@/lib/mongodb';
import TeamMember from '@/models/TeamMember';
import { NextResponse } from 'next/server';

// GET: Get single team member
export async function GET(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const { id } = params;

  try {
    const member = await TeamMember.findById(id);
    if (!member) {
      return NextResponse.json(
        { success: false, message: 'Member not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(member);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Error fetching member', error: error instanceof Error ? error.message : error },
      { status: 500 }
    );
  }
}

// PUT: Update single team member
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const body = await req.json();
  const { id } = params;

  try {
    const updated = await TeamMember.findByIdAndUpdate(id, body, { new: true });
    if (!updated) {
      return NextResponse.json(
        { success: false, message: 'Member not found' },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, member: updated });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
