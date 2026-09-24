import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { PRODUCTS, getProductBySlug } from '@/data/products';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (process.env.DATABASE_URL) {
      try {
        const dbProduct = await prisma.product.findFirst({
          where: { OR: [{ id }, { slug: id }] },
        });
        if (dbProduct) {
          return NextResponse.json({ success: true, data: dbProduct });
        }
      } catch (dbErr) {
        console.warn('DB fetch warning:', dbErr);
      }
    }

    const fallback = getProductBySlug(id) || PRODUCTS.find((p) => p.id === id);
    if (fallback) {
      return NextResponse.json({ success: true, data: fallback });
    }

    return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (process.env.DATABASE_URL) {
      try {
        await prisma.product.deleteMany({
          where: { OR: [{ id }, { slug: id }] },
        });
      } catch (dbErr) {
        console.warn('DB delete warning:', dbErr);
      }
    }

    return NextResponse.json({ success: true, message: 'Product deleted' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message }, { status: 500 });
  }
}
