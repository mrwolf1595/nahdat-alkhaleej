import { connectDB } from '@/lib/mongodb';
import TeamMember from '@/models/TeamMember';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // دا بيخلي الـ API دايمًا يجيب أحدث بيانات

export async function GET() {
  try {
    await connectDB();

    const team = await TeamMember.find().sort({ createdAt: -1 });

    return NextResponse.json(team);
  } catch (error) {
    console.error('[GET_TEAM_ERROR]', error);
    return NextResponse.json({ error: 'Failed to fetch team members' }, { status: 500 });
  }
}
