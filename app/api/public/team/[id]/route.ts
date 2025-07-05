import { connectDB } from '@/lib/mongodb';
import TeamMember from '@/models/TeamMember';
import { NextResponse } from 'next/server';

// GET: Get a single team member by id
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

// يمكنك لاحقًا إضافة DELETE أو PUT هنا
