import { deleteFromCloudinary } from '@/lib/cloudinary';
import { connectDB } from '@/lib/mongodb';
import { RecordModel } from '@/models/Record';
import { NextResponse } from 'next/server';

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();

    const updated = await RecordModel.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return NextResponse.json({ message: 'Record not found' }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (err) {
    console.error('Update Error:', err);
    return NextResponse.json({ message: 'Update failed', error: err }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const record = await RecordModel.findById(id);
    if (!record) {
      return NextResponse.json({ message: 'Record not found' }, { status: 404 });
    }

    // حذف الصورة من Cloudinary
    if (record.image) {
      await deleteFromCloudinary(record.image); // هذا موجود في ملف cloudinary.ts
    }

    await RecordModel.findByIdAndDelete(id);

    return NextResponse.json({ message: 'Record deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting record', error }, { status: 500 });
  }
}