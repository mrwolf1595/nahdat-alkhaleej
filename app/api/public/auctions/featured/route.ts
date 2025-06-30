import { connectDB } from '@/lib/mongodb';
import UpcomingAuction from '@/models/UpcomingAuction';

export const dynamic = 'force-dynamic';

export async function GET() {
  await connectDB();

  try {
    const auctions = await UpcomingAuction.find({ featured: true }).sort({ auctionDate: 1 });
    return Response.json(auctions);
  } catch (error) {
    console.error('[GET_FEATURED_AUCTIONS]', error);
    return new Response('Error fetching featured auctions', { status: 500 });
  }
}
