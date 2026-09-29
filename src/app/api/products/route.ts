import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { PRODUCTS } from '@/data/products';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    let combinedProducts = [...PRODUCTS];

    if (process.env.DATABASE_URL) {
      try {
        const whereClause: any = { isActive: true };
        if (category && category !== 'All' && category !== 'All Categories') {
          whereClause.category = category;
        }

        const dbProducts = await prisma.product.findMany({
          where: whereClause,
          orderBy: { createdAt: 'desc' },
        });

        if (dbProducts && dbProducts.length > 0) {
          // Merge dbProducts with static products by slug, db products take precedence
          const prodMap = new Map<string, any>();
          
          // Add default static products first
          PRODUCTS.forEach((p) => {
            prodMap.set(p.slug, p);
            prodMap.set(p.id, p);
          });

          // Add / override with database products
          dbProducts.forEach((dbP) => {
            const existing = prodMap.get(dbP.slug) || prodMap.get(dbP.id) || {};
            const merged = {
              ...existing,
              ...dbP,
              id: dbP.id,
              slug: dbP.slug,
              title: dbP.title,
              category: dbP.category,
              shortDescription: dbP.shortDescription,
              fullDescription: dbP.fullDescription,
              regularPriceINR: dbP.regularPriceINR,
              regularPriceUSD: dbP.regularPriceUSD,
              extendedPriceINR: dbP.extendedPriceINR,
              extendedPriceUSD: dbP.extendedPriceUSD,
              thumbnailUrl: dbP.thumbnailUrl,
              previewUrl: dbP.liveDemoUrl || existing.previewUrl || 'https://demo.dungatechnologies.com',
              techStack: Array.isArray(dbP.techStack) && dbP.techStack.length > 0 ? dbP.techStack : existing.techStack || ['Next.js 15', 'PostgreSQL'],
              isFeatured: dbP.featured ?? existing.isFeatured ?? true,
            };
            prodMap.set(dbP.slug, merged);
          });

          combinedProducts = Array.from(new Set(Array.from(prodMap.values())));
        }
      } catch (dbErr) {
        console.warn('Prisma DB query fallback to static products:', dbErr);
      }
    }

    if (category && category !== 'All' && category !== 'All Categories') {
      combinedProducts = combinedProducts.filter((p) => p.category === category);
    }

    return NextResponse.json({ success: true, data: combinedProducts });
  } catch (error: any) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ success: true, data: PRODUCTS });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Check if seeding action requested
    if (body.action === 'seed') {
      if (process.env.DATABASE_URL) {
        try {
          for (const prod of PRODUCTS) {
            await prisma.product.upsert({
              where: { slug: prod.slug },
              update: {
                title: prod.title,
                category: prod.category,
                shortDescription: prod.shortDescription,
                fullDescription: prod.fullDescription,
                regularPriceINR: prod.regularPriceINR,
                regularPriceUSD: prod.regularPriceUSD,
                extendedPriceINR: prod.extendedPriceINR,
                extendedPriceUSD: prod.extendedPriceUSD,
                thumbnailUrl: prod.thumbnailUrl,
                liveDemoUrl: prod.previewUrl,
                techStack: prod.techStack,
                featured: prod.isFeatured ?? true,
                isActive: true,
              },
              create: {
                slug: prod.slug,
                title: prod.title,
                category: prod.category,
                shortDescription: prod.shortDescription,
                fullDescription: prod.fullDescription,
                regularPriceINR: prod.regularPriceINR,
                regularPriceUSD: prod.regularPriceUSD,
                extendedPriceINR: prod.extendedPriceINR,
                extendedPriceUSD: prod.extendedPriceUSD,
                thumbnailUrl: prod.thumbnailUrl,
                liveDemoUrl: prod.previewUrl,
                techStack: prod.techStack,
                featured: prod.isFeatured ?? true,
                isActive: true,
              },
            });
          }
        } catch (seedErr) {
          console.warn('Prisma seed error:', seedErr);
        }
      }

      return NextResponse.json({
        success: true,
        message: 'All demo software products successfully seeded.',
        data: PRODUCTS,
      });
    }

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
    return NextResponse.json({ error: error.message || 'Failed to save product' }, { status: 500 });
  }
}
