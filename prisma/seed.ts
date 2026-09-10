import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding initial data into Neon PostgreSQL...');

  // 1. Initial Admin User
  const admin = await prisma.adminUser.upsert({
    where: { email: 'admin@dunga.in' },
    update: {},
    create: {
      name: 'Om Changela',
      email: 'admin@dunga.in',
      passwordHash: 'admin123',
      role: 'Super Administrator',
    },
  });

  // 2. Initial Sample Inquiries
  const inq1 = await prisma.inquiry.upsert({
    where: { inquiryCode: 'INQ-3530' },
    update: {},
    create: {
      inquiryCode: 'INQ-3530',
      name: 'Aditya Birla Group',
      email: 'tech.leads@adityabirla.com',
      phone: '+91 98200 12345',
      company: 'Aditya Birla Financial',
      type: 'Developer Hire',
      serviceOrProduct: 'Senior Next.js & AI Architect',
      budget: '$5,000 - $10,000/mo',
      message: 'Looking for 2 dedicated full-stack engineers for AI CRM integration.',
      priority: 'Urgent',
      sourcePage: '/services/hire-developers',
      status: 'New',
      notes: ['Client requested initial discovery call for Friday.'],
    },
  });

  const inq2 = await prisma.inquiry.upsert({
    where: { inquiryCode: 'INQ-3529' },
    update: {},
    create: {
      inquiryCode: 'INQ-3529',
      name: 'Siddharth Rao',
      email: 'siddharth@fintechpulse.io',
      phone: '+91 99887 76655',
      company: 'Fintech Pulse Inc.',
      type: 'Source Code License',
      serviceOrProduct: 'DungaPay Enterprise Suite',
      budget: '$2,500 One-time',
      message: 'Interested in purchasing extended license for DungaPay with customization.',
      priority: 'High',
      sourcePage: '/products/dungapay-payment-gateway-subscription-engine',
      status: 'In Review',
      notes: ['Requested custom settlement webhook module.'],
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
