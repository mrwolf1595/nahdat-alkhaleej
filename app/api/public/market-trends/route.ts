import { connectDB } from '@/lib/mongodb';
import { RecordModel } from '@/models/Record';
import { NextResponse } from 'next/server';
import dayjs from 'dayjs'; // لو مش مثبّت: npm install dayjs

export async function GET() {
  try {
    await connectDB();

    const sales = await RecordModel.find({ type: 'sales' });

    if (!sales.length) {
      return NextResponse.json({
        averageSalePrice: 0,
        averageDaysOnMarket: 0,
        saleToListRatio: 0,
      });
    }

    // 1. حساب متوسط سعر البيع
    const totalSold = sales.reduce((acc, r) => {
      const sold = parseFloat(r.soldPrice?.replace(/[^0-9.]/g, '') || '0');
      return acc + sold;
    }, 0);
    const averageSalePrice = totalSold / sales.length;

    // 2. حساب متوسط المدة على السوق
    const validDays = sales.filter((r) => r.listedDate && r.date);
    const totalDays = validDays.reduce((acc, r) => {
      const start = dayjs(r.listedDate);
      const end = dayjs(r.date);
      const days = end.diff(start, 'day');
      return acc + (days > 0 ? days : 0);
    }, 0);
    const averageDaysOnMarket = validDays.length > 0
      ? Math.round(totalDays / validDays.length)
      : 0;

    // 3. حساب نسبة البيع مقابل السعر المعروض
    const validRatios = sales.filter((r) => r.listedPrice && r.soldPrice);
    const totalRatio = validRatios.reduce((acc, r) => {
      const listed = parseFloat(r.listedPrice.replace(/[^0-9.]/g, '') || '0');
      const sold = parseFloat(r.soldPrice.replace(/[^0-9.]/g, '') || '0');
      const ratio = listed > 0 ? (sold / listed) * 100 : 0;
      return acc + ratio;
    }, 0);
    const saleToListRatio = validRatios.length > 0
      ? parseFloat((totalRatio / validRatios.length).toFixed(2))
      : 0;

    return NextResponse.json({
      averageSalePrice: Math.round(averageSalePrice),
      averageDaysOnMarket,
      saleToListRatio,
    });
  } catch (err) {
    console.error('Error loading market trends:', err);
    return NextResponse.json({ message: 'Error fetching market trends', error: err }, { status: 500 });
  }
}
