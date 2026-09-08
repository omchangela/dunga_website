export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatarUrl: string;
  rating: number;
  productOrService: string;
  content: string;
  verifiedBuyer: boolean;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Vikram Mehta',
    role: 'Founder & CEO',
    company: 'LeadScale Agency',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    productOrService: 'OmniFlow AI CRM Source Code',
    content: 'Buying the source code from Dunga Technologies saved our development team at least 4 months of hard engineering. The Next.js and FastAPI architecture is remarkably clean and well-documented.',
    verifiedBuyer: true,
  },
  {
    id: 'test-2',
    name: 'Sarah Jenkins',
    role: 'Product Manager',
    company: 'FinSync Global',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    productOrService: 'DungaPay Multi-Gateway Engine',
    content: 'We opted for the Extended License + Server Installation add-on. Dunga’s engineers set up our AWS infrastructure and configured Razorpay & Stripe in less than 36 hours. Superb service!',
    verifiedBuyer: true,
  },
  {
    id: 'test-3',
    name: 'Harish Ranganathan',
    role: 'Managing Director',
    company: 'Kavita Logistics',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    productOrService: 'FleetPulse Dispatch Suite',
    content: 'The Flutter mobile app and real-time GPS map tracking worked right out of the box. Our dispatch team is handling 300+ truck routes seamlessly every day.',
    verifiedBuyer: true,
  },
  {
    id: 'test-4',
    name: 'Neha Kapoor',
    role: 'Head of Operations',
    company: 'BrightSteps EdTech',
    avatarUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    productOrService: 'AetherBot AI SaaS Script',
    content: 'The multi-tenant architecture allowed us to deploy white-labeled AI bots for 12 of our partner institutes. The RAG knowledge retrieval is accurate with zero hallucinations.',
    verifiedBuyer: true,
  },
];

export interface FAQ {
  id: string;
  category: 'General' | 'Licensing & Source Code' | 'Installation & Support' | 'Payments & Invoicing';
  question: string;
  answer: string;
}

export const FAQS: FAQ[] = [
  {
    id: 'faq-1',
    category: 'Licensing & Source Code',
    question: 'What is the difference between a Regular License and an Extended License?',
    answer: 'The Regular License permits you or your single client to use the software on one commercial domain or project where end-users are not charged directly for access. The Extended License allows you to use the software in a project where end-users pay for access (such as a SaaS offering or paid subscription model) or for multiple client domains.',
  },
  {
    id: 'faq-2',
    category: 'Installation & Support',
    question: 'How does the Server Setup & Installation Add-on work?',
    answer: 'When you purchase a product with the Server Setup add-on, you will immediately receive a secure form in your Customer Dashboard to submit your VPS (e.g., Ubuntu, DigitalOcean, AWS) or cPanel details. Our senior engineers deploy the code, configure databases, setup SSL certificates, and hand over the live system within 24 to 48 hours.',
  },
  {
    id: 'faq-3',
    category: 'Licensing & Source Code',
    question: 'Do I get complete source code and lifetime updates?',
    answer: 'Yes! All source code purchases include 100% unencrypted frontend, backend, and database migration files. You receive lifetime access to future minor version updates and bug fixes via your Dunga customer account dashboard.',
  },
  {
    id: 'faq-4',
    category: 'Payments & Invoicing',
    question: 'Can I pay in INR or USD? Do you provide GST tax invoices?',
    answer: 'Yes, we accept payments in both Indian Rupees (INR via UPI, Netbanking, Cards, Razorpay) and International Currencies (USD via Stripe and PayPal). Every purchase automatically generates a downloadable GST/tax compliant invoice.',
  },
  {
    id: 'faq-5',
    category: 'General',
    question: 'Can Dunga Technologies customize or build new features for my business?',
    answer: 'Absolutely. We offer custom software engineering, white-label branding, and dedicated engineering sprints. You can request a custom quote directly from our Services or Contact page.',
  },
];
