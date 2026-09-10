import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { DEVELOPERS_DATA } from '@/data/developers';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const availability = searchParams.get('availability');

    if (process.env.DATABASE_URL) {
      const whereClause: any = { isActive: true };
      if (availability && availability !== 'all') {
        whereClause.availability = availability;
      }

      const devs = await prisma.developer.findMany({
        where: whereClause,
        orderBy: { rating: 'desc' },
      });

      if (devs.length > 0) {
        return NextResponse.json({ success: true, data: devs });
      }
    }

    // Static fallback
    let devs = DEVELOPERS_DATA;
    if (availability && availability !== 'all') {
      devs = devs.filter((d) => d.availability === availability);
    }

    return NextResponse.json({ success: true, data: devs });
  } catch (error: any) {
    console.error('Error fetching developers:', error);
    return NextResponse.json({ success: true, data: DEVELOPERS_DATA });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { id, availability, liveStatusText } = await request.json();

    if (!id || !availability) {
      return NextResponse.json(
        { success: false, error: 'Developer ID and availability are required.' },
        { status: 400 }
      );
    }

    if (process.env.DATABASE_URL) {
      const updated = await prisma.developer.update({
        where: { id },
        data: {
          availability,
          liveStatusText: liveStatusText || (availability === 'Available Now' ? 'Available for Immediate Onboarding' : 'In Client Sprint'),
        },
      });
      return NextResponse.json({ success: true, developer: updated });
    }

    return NextResponse.json({ success: true, message: 'Developer status updated.' });
  } catch (error: any) {
    console.error('Error updating developer:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to update developer.' },
      { status: 500 }
    );
  }
}
