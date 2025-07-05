import { connectDB } from '@/lib/mongodb';
import TeamMember from '@/models/TeamMember';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const newMember = await TeamMember.create({
      name: body.name,
      role: body.role,
      bio: body.bio,
      image: body.image,
    });

    return NextResponse.json({ success: true, member: newMember }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Failed to add team member' }, { status: 500 });
  }
}
