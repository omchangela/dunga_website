export interface DeveloperRole {
  id: string;
  role: string;
  category: 'Frontend' | 'Backend' | 'Full-Stack' | 'Mobile' | 'AI & ML' | 'DevOps' | 'CMS & Scripts';
  experience: string;
  hourlyRateINR: number;
  hourlyRateUSD: number;
  monthlyRateINR: number;
  monthlyRateUSD: number;
  skills: string[];
  availability: 'Immediate (24-48h)' | 'Available Next Week' | 'Available in 2 Weeks';
  rating: number;
  completedProjects: number;
  description: string;
  popularFor: string;
}

export const DEVELOPER_ROLES: DeveloperRole[] = [
  {
    id: 'dev-nextjs-react',
    role: 'Senior Next.js & React Frontend Engineer',
    category: 'Frontend',
    experience: '5+ Years',
    hourlyRateINR: 999,
    hourlyRateUSD: 15,
    monthlyRateINR: 120000,
    monthlyRateUSD: 1600,
    skills: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Framer Motion', 'Redux / Zustand'],
    availability: 'Immediate (24-48h)',
    rating: 4.98,
    completedProjects: 48,
    description: 'Expert in building pixel-perfect, sub-second web applications, interactive dashboards, and design systems.',
    popularFor: 'SaaS Frontends, Performance Optimization & UI Redesigns',
  },
  {
    id: 'dev-fullstack-node',
    role: 'Full-Stack Node.js & Next.js Architect',
    category: 'Full-Stack',
    experience: '6+ Years',
    hourlyRateINR: 1299,
    hourlyRateUSD: 18,
    monthlyRateINR: 150000,
    monthlyRateUSD: 2000,
    skills: ['Node.js', 'Next.js', 'FastAPI', 'PostgreSQL', 'Prisma / Drizzle', 'Redis', 'Docker', 'REST / GraphQL'],
    availability: 'Immediate (24-48h)',
    rating: 4.99,
    completedProjects: 62,
    description: 'End-to-end full-stack engineers who design robust database schemas, secure APIs, and scalable web apps.',
    popularFor: 'Custom SaaS Platforms, CRM Systems & Payment Integrations',
  },
  {
    id: 'dev-mobile-flutter',
    role: 'Cross-Platform Flutter & React Native Developer',
    category: 'Mobile',
    experience: '4+ Years',
    hourlyRateINR: 1199,
    hourlyRateUSD: 16,
    monthlyRateINR: 140000,
    monthlyRateUSD: 1850,
    skills: ['Flutter', 'Dart', 'React Native', 'Firebase', 'State Management (Bloc/Riverpod)', 'App Store & Play Store CI'],
    availability: 'Immediate (24-48h)',
    rating: 4.96,
    completedProjects: 39,
    description: 'Specialist in 60FPS fluid mobile applications with offline caching, push notifications, and hardware integrations.',
    popularFor: 'E-Commerce, Booking Apps, Telecaller Mobile Apps & Field Staff Portals',
  },
  {
    id: 'dev-ai-rag',
    role: 'Generative AI, Python & RAG Knowledge Engineer',
    category: 'AI & ML',
    experience: '5+ Years',
    hourlyRateINR: 1599,
    hourlyRateUSD: 22,
    monthlyRateINR: 185000,
    monthlyRateUSD: 2450,
    skills: ['Python', 'FastAPI', 'LangChain', 'LlamaIndex', 'OpenAI / Anthropic APIs', 'pgvector / Pinecone', 'Autonomous Agents'],
    availability: 'Available Next Week',
    rating: 4.97,
    completedProjects: 27,
    description: 'Engineers specializing in document search RAG agents, autonomous CRM bots, and custom model fine-tuning.',
    popularFor: 'AI Customer Support Agents, Intelligent Document Parsing & Semantic Search',
  },
  {
    id: 'dev-devops-cloud',
    role: 'Senior DevOps, Docker & Cloud Infrastructure Specialist',
    category: 'DevOps',
    experience: '7+ Years',
    hourlyRateINR: 1499,
    hourlyRateUSD: 20,
    monthlyRateINR: 175000,
    monthlyRateUSD: 2300,
    skills: ['Docker', 'Kubernetes', 'AWS (EC2, S3, RDS)', 'DigitalOcean', 'Nginx Hardening', 'SSL / CDN', 'CI/CD Automation'],
    availability: 'Immediate (24-48h)',
    rating: 5.0,
    completedProjects: 74,
    description: 'DevOps professionals who deploy, harden, auto-scale, and optimize cloud server environments with 99.99% uptime.',
    popularFor: 'VPS Server Setup, Database Clustering, Cost Optimization & Security Audits',
  },
  {
    id: 'dev-php-codecanyon',
    role: 'PHP, Laravel & CodeCanyon Customization Specialist',
    category: 'CMS & Scripts',
    experience: '5+ Years',
    hourlyRateINR: 899,
    hourlyRateUSD: 12,
    monthlyRateINR: 110000,
    monthlyRateUSD: 1450,
    skills: ['PHP 8.x', 'Laravel', 'MySQL', 'cPanel / WHM', 'CodeCanyon Scripts', 'Payment Gateway Plugins', 'Bug Fixing'],
    availability: 'Immediate (24-48h)',
    rating: 4.95,
    completedProjects: 85,
    description: 'Expert in setting up, debugging, and heavily customizing CodeCanyon PHP/Laravel scripts, themes, and plugins.',
    popularFor: 'CodeCanyon Installation, Third-Party Script Debugging & Custom Modules',
  },
];
