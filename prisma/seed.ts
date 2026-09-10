import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding initial data into Neon PostgreSQL...');

  // 1. Initial Admin User
  const admin = await prisma.adminUser.upsert({
    where: { email: 'admin@dunga.in' },
    update: {
      name: 'Super Admin',
    },
    create: {
      name: 'Super Admin',
      email: 'admin@dunga.in',
      passwordHash: 'admin123',
      role: 'Super Administrator',
    },
  });

  // 3. Featured Products
  const prod1 = await prisma.product.upsert({
    where: { slug: 'omniflow-ai-crm-telecaller-suite' },
    update: {},
    create: {
      slug: 'omniflow-ai-crm-telecaller-suite',
      title: 'OmniFlow AI CRM & Telecaller Suite',
      category: 'AI CRM',
      shortDescription: 'Enterprise VoIP telecalling CRM with AI sentiment analysis and automated disposition workflows.',
      fullDescription: 'Production-ready AI telecalling suite built for high-volume outbound sales and enterprise support teams.',
      regularPriceINR: 24999,
      regularPriceUSD: 299,
      extendedPriceINR: 79999,
      extendedPriceUSD: 999,
      salesCount: 142,
      rating: 4.95,
      thumbnailUrl: '/images/products/omniflow.jpg',
      liveDemoUrl: 'https://demo.dunga.in/omniflow',
      techStack: ['Next.js 16', 'WebRTC', 'FastAPI', 'PostgreSQL', 'Tailwind CSS'],
    },
  });

  const prod2 = await prisma.product.upsert({
    where: { slug: 'dungapay-payment-gateway-subscription-engine' },
    update: {},
    create: {
      slug: 'dungapay-payment-gateway-subscription-engine',
      title: 'DungaPay Payment Gateway & Subscription Engine',
      category: 'Fintech',
      shortDescription: 'Multi-provider payment orchestration with automated recurring billing, webhooks, and invoice generation.',
      fullDescription: 'Zero-downtime payment engine supporting Stripe, Razorpay, LemonSqueezy, and crypto settlements.',
      regularPriceINR: 19999,
      regularPriceUSD: 249,
      extendedPriceINR: 64999,
      extendedPriceUSD: 799,
      salesCount: 218,
      rating: 4.98,
      thumbnailUrl: '/images/products/dungapay.jpg',
      liveDemoUrl: 'https://demo.dunga.in/dungapay',
      techStack: ['React 19', 'Node.js', 'PostgreSQL', 'Redis', 'Docker'],
    },
  });

  console.log('Neon Database successfully seeded with Admin, Inquiries, and Products!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
