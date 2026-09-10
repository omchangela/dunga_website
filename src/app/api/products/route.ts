import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { PRODUCTS } from '@/data/products';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    if (process.env.DATABASE_URL) {
      const whereClause: any = { isActive: true };
      if (category && category !== 'All') {
        whereClause.category = category;
      }

      const dbProducts = await prisma.product.findMany({
        where: whereClause,
        orderBy: { salesCount: 'desc' },
      });

      if (dbProducts.length > 0) {
        return NextResponse.json({ success: true, data: dbProducts });
      }
    }

    let prods = PRODUCTS;
    if (category && category !== 'All') {
      prods = prods.filter((p) => p.category === category);
    }

    return NextResponse.json({ success: true, data: prods });
  } catch (error: any) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ success: true, data: PRODUCTS });
  }
}
