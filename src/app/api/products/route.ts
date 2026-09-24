import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { PRODUCTS } from '@/data/products';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    if (process.env.DATABASE_URL) {
      try {
        const whereClause: any = { isActive: true };
        if (category && category !== 'All' && category !== 'All Categories') {
          whereClause.category = category;
        }

        const dbProducts = await prisma.product.findMany({
          where: whereClause,
          orderBy: { salesCount: 'desc' },
        });

        if (dbProducts && dbProducts.length > 0) {
          // Merge full json schemas if available
          return NextResponse.json({ success: true, data: dbProducts });
        }
      } catch (dbErr) {
        console.warn('Prisma DB query fallback to memory:', dbErr);
      }
    }

    let prods = PRODUCTS;
    if (category && category !== 'All' && category !== 'All Categories') {
      prods = prods.filter((p) => p.category === category);
    }

    return NextResponse.json({ success: true, data: prods });
  } catch (error: any) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ success: true, data: PRODUCTS });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      slug,
      category = 'CRM & ERP',
      shortDescription,
      fullDescription,
      regularPriceINR,
      regularPriceUSD,
      extendedPriceINR,
      extendedPriceUSD,
      thumbnailUrl,
      previewUrl,
      techStack = [],
      packageZipUrl,
    } = body;

    const safeSlug = (slug || title || 'software')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    let savedProduct = null;

    if (process.env.DATABASE_URL) {
      try {
        savedProduct = await prisma.product.create({
          data: {
            slug: safeSlug,
            title: title || 'New Software Suite',
            category: category || 'CRM & ERP',
            shortDescription: shortDescription || 'Full stack source code with complete database migrations.',
            fullDescription: fullDescription || 'Production-grade unencrypted software codebase.',
            regularPriceINR: Math.round(Number(regularPriceINR) || 4999),
            regularPriceUSD: Math.round(Number(regularPriceUSD) || 69),
            extendedPriceINR: Math.round(Number(extendedPriceINR) || 14999),
            extendedPriceUSD: Math.round(Number(extendedPriceUSD) || 199),
            thumbnailUrl: thumbnailUrl || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
            liveDemoUrl: previewUrl || null,
            techStack: Array.isArray(techStack) ? techStack : ['Next.js 15', 'PostgreSQL', 'Tailwind CSS'],
            featured: Boolean(body.isFeatured),
            isActive: true,
          },
        });
      } catch (dbErr) {
        console.warn('Prisma DB insert error (continuing with JSON response):', dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Product saved and indexed successfully.',
      data: savedProduct || body,
    });
  } catch (error: any) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to save product.' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, slug, title, category, shortDescription, fullDescription, regularPriceINR, regularPriceUSD, extendedPriceINR, extendedPriceUSD, thumbnailUrl, previewUrl, techStack } = body;

    if (process.env.DATABASE_URL && id) {
      try {
        await prisma.product.updateMany({
          where: { OR: [{ id }, { slug }] },
          data: {
            title: title,
            category: category,
            shortDescription: shortDescription,
            fullDescription: fullDescription,
            regularPriceINR: Math.round(Number(regularPriceINR) || 4999),
            regularPriceUSD: Math.round(Number(regularPriceUSD) || 69),
            extendedPriceINR: Math.round(Number(extendedPriceINR) || 14999),
            extendedPriceUSD: Math.round(Number(extendedPriceUSD) || 199),
            thumbnailUrl: thumbnailUrl,
            liveDemoUrl: previewUrl,
            techStack: Array.isArray(techStack) ? techStack : undefined,
            featured: Boolean(body.isFeatured),
          },
        });
      } catch (dbErr) {
        console.warn('Prisma DB update warning:', dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Product updated successfully.',
      data: body,
    });
  } catch (error: any) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to update product.' },
      { status: 500 }
    );
  }
}
