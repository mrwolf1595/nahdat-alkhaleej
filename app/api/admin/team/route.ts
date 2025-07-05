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
      image: body.image, // حاليًا هنستخدم URL، لاحقًا ندمج Cloudinary
    });

    return NextResponse.json({ success: true, member: newMember }, { status: 201 });
  } catch (error) {
    console.error('[POST_TEAM_ERROR]', error);
    return NextResponse.json({ success: false, error: 'Failed to add team member' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const body = await req.json();
  const { id } = params;

  try {
    const updated = await TeamMember.findByIdAndUpdate(id, body, { new: true });
    if (!updated) return NextResponse.json({ success: false }, { status: 404 });

    return NextResponse.json({ success: true, member: updated });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
