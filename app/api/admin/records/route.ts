import { connectDB } from '@/lib/mongodb';
import { RecordModel } from '@/models/Record';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();
    const records = await RecordModel.find().sort({ createdAt: -1 });
    return NextResponse.json(records, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching records', error }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    // Debug: تطبع البيانات المرسلة
    console.log('[📦 CREATE RECORD]', body);

    const newRecord = new RecordModel({
      ...body, // ← ده مهم: ياخد كل الحقول زي image, gallery, mapLink ...
    });

    await newRecord.save();

    return NextResponse.json(
      { message: 'Record created successfully', record: newRecord },
      { status: 201 }
    );
  } catch (error) {
    console.error('[❌ ERROR CREATING RECORD]', error);
    return NextResponse.json(
      { message: 'Error creating record', error },
      { status: 500 }
    );
  }
}
