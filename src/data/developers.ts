export interface SkillProficiency {
  name: string;
  level: 'Expert' | 'Advanced' | 'Intermediate';
  percentage: number;
}

export interface DeveloperProfile {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  role: string;
  primaryCategory: 'Full-Stack' | 'Frontend' | 'Backend' | 'Mobile' | 'AI & ML' | 'DevOps' | 'CMS & PHP' | 'QA & Testing';
  experienceYears: number;
  experienceLabel: string;
  avatarUrl: string;
  isVerified: boolean;
  isSkillsAssessed: boolean;
  availability: 'Available Now' | 'Available Soon' | 'In Project';
  availabilityTimeline: string;
  hourlyRateINR: number;
  hourlyRateUSD: number;
  monthlyRateINR: number;
  monthlyRateUSD: number;
  engagementModels: ('Hourly' | 'Dedicated' | 'Project-Based' | 'Part-Time' | 'Full-Time')[];
  keyTechnologies: string[];
  specializations: string[];
  languages: string[];
  location: string;
  timeZone: string;
  rating: number;
  completedProjectsCount: number;
  bio: string;
  technicalSkills: {
    frontend: SkillProficiency[];
    backend: SkillProficiency[];
    database: SkillProficiency[];
    cloudAndDevOps: SkillProficiency[];
  };
  featuredProjects: {
    title: string;
    description: string;
    techStack: string[];
    role: string;
  }[];
  educationAndCerts: string[];
}

export const DEVELOPERS_DATA: DeveloperProfile[] = [
  {
    id: 'dev-arun-kumar',
    slug: 'arun-kumar-fullstack-developer',
    name: 'Arun Kumar',
    shortName: 'Arun K.',
    role: 'Senior Full Stack Developer',
    primaryCategory: 'Full-Stack',
    experienceYears: 5,
    experienceLabel: '5+ Years Experience',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
    isVerified: true,
    isSkillsAssessed: true,
    availability: 'Available Now',
    availabilityTimeline: 'Immediate (24-48h)',
    hourlyRateINR: 1199,
    hourlyRateUSD: 16,
    monthlyRateINR: 140000,
    monthlyRateUSD: 1850,
    engagementModels: ['Hourly', 'Dedicated', 'Project-Based', 'Full-Time'],
    keyTechnologies: ['React.js', 'Next.js 15', 'Node.js', 'MongoDB', 'PostgreSQL', 'TypeScript'],
    specializations: ['Web Applications', 'SaaS Platforms', 'REST & GraphQL APIs', 'Payment Gateways'],
    languages: ['English', 'Hindi', 'Telugu'],
    location: 'Remote (Surat / Bengaluru Hub)',
    timeZone: 'IST (UTC+5:30) • Flexible for EST / PST',
    rating: 4.98,
    completedProjectsCount: 34,
    bio: 'Full-stack software engineer experienced in building scalable multi-tenant web applications, high-converting SaaS platforms, API microservices, and automated CRM workflows using modern Next.js and Node.js architectures.',
    technicalSkills: {
      frontend: [
        { name: 'React.js', level: 'Expert', percentage: 95 },
        { name: 'Next.js 15 (App Router)', level: 'Expert', percentage: 94 },
        { name: 'TypeScript', level: 'Advanced', percentage: 90 },
        { name: 'Tailwind CSS & Vanilla CSS', level: 'Expert', percentage: 96 },
        { name: 'Redux / Zustand', level: 'Advanced', percentage: 88 },
      ],
      backend: [
        { name: 'Node.js & Express.js', level: 'Expert', percentage: 92 },
        { name: 'REST & GraphQL APIs', level: 'Expert', percentage: 95 },
        { name: 'Python (FastAPI)', level: 'Intermediate', percentage: 80 },
        { name: 'Authentication (JWT / OAuth / NextAuth)', level: 'Expert', percentage: 94 },
      ],
      database: [
        { name: 'MongoDB', level: 'Expert', percentage: 92 },
        { name: 'PostgreSQL & Prisma ORM', level: 'Advanced', percentage: 89 },
        { name: 'Redis Caching', level: 'Advanced', percentage: 85 },
        { name: 'MySQL', level: 'Advanced', percentage: 86 },
      ],
      cloudAndDevOps: [
        { name: 'Docker & Containerization', level: 'Advanced', percentage: 88 },
        { name: 'AWS (EC2, S3, RDS)', level: 'Advanced', percentage: 85 },
        { name: 'GitHub Actions & CI/CD', level: 'Advanced', percentage: 89 },
        { name: 'Vercel & DigitalOcean', level: 'Expert', percentage: 95 },
      ],
    },
    featuredProjects: [
      {
        title: 'OmniFlow AI Telecalling CRM',
        description: 'Architected full-stack lead routing, automated WhatsApp brochure triggers, and telecaller analytics for real estate agencies.',
        techStack: ['Next.js 15', 'Node.js', 'PostgreSQL', 'Redis', 'WhatsApp API'],
        role: 'Lead Full-Stack Architect',
      },
      {
        title: 'Multi-Gateway Billing Engine (DungaPay)',
        description: 'Engineered failover payment orchestrator auto-switching between Razorpay, Stripe, and Cashfree with automated GST invoices.',
        techStack: ['Node.js', 'TypeScript', 'PostgreSQL', 'Docker', 'Stripe API'],
        role: 'Backend & Payment Engineer',
      },
    ],
    educationAndCerts: [
      'B.Tech in Computer Science Engineering (First Class with Distinction)',
      'AWS Certified Developer – Associate',
      'Meta Certified Full-Stack Developer',
    ],
  },
  {
    id: 'dev-priya-sharma',
    slug: 'priya-sharma-frontend-engineer',
    name: 'Priya Sharma',
    shortName: 'Priya S.',
    role: 'Senior Frontend & UI/UX Engineer',
    primaryCategory: 'Frontend',
    experienceYears: 6,
    experienceLabel: '6+ Years Experience',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
    isVerified: true,
    isSkillsAssessed: true,
    availability: 'Available Now',
    availabilityTimeline: 'Immediate (24-48h)',
    hourlyRateINR: 1099,
    hourlyRateUSD: 15,
    monthlyRateINR: 130000,
    monthlyRateUSD: 1700,
    engagementModels: ['Hourly', 'Dedicated', 'Project-Based'],
    keyTechnologies: ['Next.js 15', 'React.js', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Framer Motion'],
    specializations: ['Interactive Web Apps', 'Design Systems', 'Sub-Second Page Performance', 'SaaS Dashboards'],
    languages: ['English', 'Hindi', 'Gujarati'],
    location: 'Remote (Ahmedabad / Surat Hub)',
    timeZone: 'IST (UTC+5:30) • Flexible GMT / EST',
    rating: 4.99,
    completedProjectsCount: 42,
    bio: 'Specialist in building pixel-perfect, sub-second web applications, design systems, and responsive dashboards with smooth 60FPS GSAP animations and 100/100 Core Web Vitals.',
    technicalSkills: {
      frontend: [
        { name: 'React.js 19', level: 'Expert', percentage: 98 },
        { name: 'Next.js 15 (SSR / SSG / ISR)', level: 'Expert', percentage: 96 },
        { name: 'GSAP Animation Platform', level: 'Expert', percentage: 95 },
        { name: 'Tailwind CSS v4 & Vanilla CSS', level: 'Expert', percentage: 98 },
        { name: 'TypeScript', level: 'Expert', percentage: 93 },
      ],
      backend: [
        { name: 'REST API Integration', level: 'Expert', percentage: 94 },
        { name: 'Node.js (BFF Pattern)', level: 'Advanced', percentage: 84 },
        { name: 'Next.js Server Actions', level: 'Expert', percentage: 92 },
      ],
      database: [
        { name: 'Supabase / Firebase', level: 'Advanced', percentage: 88 },
        { name: 'PostgreSQL Basic', level: 'Intermediate', percentage: 78 },
      ],
      cloudAndDevOps: [
        { name: 'Vercel Deployment', level: 'Expert', percentage: 98 },
        { name: 'Lighthouse / Web Vitals Optimization', level: 'Expert', percentage: 98 },
      ],
    },
    featuredProjects: [
      {
        title: 'Enterprise Fintech Dashboard',
        description: 'Built high-throughput transaction analytics dashboard with real-time charting, dark mode tokens, and accessible WCAG 2.1 UI.',
        techStack: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Recharts'],
        role: 'Principal Frontend Engineer',
      },
    ],
    educationAndCerts: [
      'B.E. in Information Technology',
      'Google Certified UX Professional',
    ],
  },
  {
    id: 'dev-vikram-mehta',
    slug: 'vikram-mehta-backend-architect',
    name: 'Vikram Mehta',
    shortName: 'Vikram M.',
    role: 'Senior Backend & Cloud Architect',
    primaryCategory: 'Backend',
    experienceYears: 7,
    experienceLabel: '7+ Years Experience',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    isVerified: true,
    isSkillsAssessed: true,
    availability: 'Available Now',
    availabilityTimeline: 'Immediate (24-48h)',
    hourlyRateINR: 1399,
    hourlyRateUSD: 19,
    monthlyRateINR: 165000,
    monthlyRateUSD: 2200,
    engagementModels: ['Hourly', 'Dedicated', 'Project-Based', 'Full-Time'],
    keyTechnologies: ['Node.js', 'Python / FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
    specializations: ['High-Concurrency Systems', 'Database Indexing', 'Microservices', 'API Security'],
    languages: ['English', 'Hindi', 'Marathi'],
    location: 'Remote (Mumbai / Bengaluru Hub)',
    timeZone: 'IST (UTC+5:30) • Flexible for Global Sprints',
    rating: 5.0,
    completedProjectsCount: 58,
    bio: 'Backend architect specializing in high-concurrency microservices, distributed transaction locks, PostgreSQL query optimization, and cost-effective AWS/Docker infrastructure.',
    technicalSkills: {
      frontend: [
        { name: 'Next.js Integration', level: 'Advanced', percentage: 86 },
      ],
      backend: [
        { name: 'Node.js & NestJS', level: 'Expert', percentage: 96 },
        { name: 'Python (FastAPI & Django)', level: 'Expert', percentage: 94 },
        { name: 'Microservices & gRPC', level: 'Expert', percentage: 92 },
        { name: 'WebSockets & Real-time Telemetry', level: 'Expert', percentage: 95 },
      ],
      database: [
        { name: 'PostgreSQL & PostGIS', level: 'Expert', percentage: 96 },
        { name: 'Redis & BullMQ Job Queues', level: 'Expert', percentage: 95 },
        { name: 'MySQL & Query Indexing', level: 'Expert', percentage: 92 },
      ],
      cloudAndDevOps: [
        { name: 'AWS (ECS, RDS, S3, CloudFront)', level: 'Expert', percentage: 95 },
        { name: 'Docker & Kubernetes', level: 'Expert', percentage: 92 },
        { name: 'Nginx Hardening & Zero-Downtime CI/CD', level: 'Expert', percentage: 94 },
      ],
    },
    featuredProjects: [
      {
        title: 'Nexus Retail High-Volume Payment Engine',
        description: 'Engineered auto-routing payment backend handling ₹4.2 Cr monthly GMV with 98.4% success rate and zero downtime during flash sales.',
        techStack: ['Node.js', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
        role: 'Chief Backend Architect',
      },
    ],
    educationAndCerts: [
      'M.Tech in Distributed Computing',
      'AWS Certified Solutions Architect – Professional',
    ],
  },
  {
    id: 'dev-rajesh-patel',
    slug: 'rajesh-patel-mobile-developer',
    name: 'Rajesh Patel',
    shortName: 'Rajesh P.',
    role: 'Cross-Platform Flutter & React Native Developer',
    primaryCategory: 'Mobile',
    experienceYears: 5,
    experienceLabel: '5+ Years Experience',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
    isVerified: true,
    isSkillsAssessed: true,
    availability: 'Available Now',
    availabilityTimeline: 'Immediate (24-48h)',
    hourlyRateINR: 1199,
    hourlyRateUSD: 16,
    monthlyRateINR: 140000,
    monthlyRateUSD: 1850,
    engagementModels: ['Hourly', 'Dedicated', 'Project-Based'],
    keyTechnologies: ['Flutter', 'Dart', 'React Native', 'Firebase', 'REST APIs', 'App Store / Play Store CI'],
    specializations: ['Cross-Platform Mobile', 'Offline Caching', 'Real-Time GPS Tracking', 'Push Notifications'],
    languages: ['English', 'Hindi', 'Gujarati'],
    location: 'Remote (Surat / Ahmedabad Hub)',
    timeZone: 'IST (UTC+5:30)',
    rating: 4.96,
    completedProjectsCount: 39,
    bio: 'Mobile software developer with 39+ shipped iOS and Android apps. Expert in Flutter, Riverpod state management, offline-first SQLite databases, and Google Play / Apple App Store approval workflows.',
    technicalSkills: {
      frontend: [
        { name: 'Flutter & Dart', level: 'Expert', percentage: 96 },
        { name: 'React Native', level: 'Advanced', percentage: 89 },
        { name: 'Mobile UI/UX Material 3 & Cupertino', level: 'Expert', percentage: 94 },
      ],
      backend: [
        { name: 'Firebase & Cloud Functions', level: 'Expert', percentage: 92 },
        { name: 'REST API & WebSockets Integration', level: 'Expert', percentage: 95 },
      ],
      database: [
        { name: 'SQLite / Hive / Isar Local Storage', level: 'Expert', percentage: 94 },
        { name: 'Firestore', level: 'Advanced', percentage: 90 },
      ],
      cloudAndDevOps: [
        { name: 'Fastlane & App Store CI/CD', level: 'Expert', percentage: 92 },
        { name: 'Google Play & Apple Developer Consoles', level: 'Expert', percentage: 96 },
      ],
    },
    featuredProjects: [
      {
        title: 'FleetPulse Cold-Chain GPS Tracking App',
        description: 'Built 60FPS Flutter mobile app for 400+ refrigerated trucks with offline map caching, Bluetooth temperature logging, and live GPS sync.',
        techStack: ['Flutter', 'Dart', 'FastAPI', 'PostGIS', 'WebSockets'],
        role: 'Lead Mobile Developer',
      },
    ],
    educationAndCerts: [
      'B.Tech in Computer Science',
      'Google Certified Associate Android Developer',
    ],
  },
  {
    id: 'dev-sneha-reddy',
    slug: 'sneha-reddy-ai-llm-engineer',
    name: 'Sneha Reddy',
    shortName: 'Sneha R.',
    role: 'Generative AI, Python & RAG Knowledge Engineer',
    primaryCategory: 'AI & ML',
    experienceYears: 4,
    experienceLabel: '4+ Years Experience',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop',
    isVerified: true,
    isSkillsAssessed: true,
    availability: 'Available Now',
    availabilityTimeline: 'Immediate (24-48h)',
    hourlyRateINR: 1599,
    hourlyRateUSD: 22,
    monthlyRateINR: 185000,
    monthlyRateUSD: 2450,
    engagementModels: ['Hourly', 'Dedicated', 'Project-Based'],
    keyTechnologies: ['Python', 'FastAPI', 'LangChain', 'pgvector', 'OpenAI API', 'LlamaIndex', 'Claude API'],
    specializations: ['Autonomous AI Agents', 'Document RAG Retrieval', 'Semantic Search', 'Zero-Hallucination Bots'],
    languages: ['English', 'Hindi', 'Telugu'],
    location: 'Remote (Bengaluru / Hyderabad Hub)',
    timeZone: 'IST (UTC+5:30) • Flexible for Global Remote',
    rating: 4.97,
    completedProjectsCount: 28,
    bio: 'AI solutions architect engineering autonomous customer support bots, multi-tenant document RAG search engines, and automated voice/text workflow agents with rigorous hallucination guardrails.',
    technicalSkills: {
      frontend: [
        { name: 'Next.js AI SDK & Vercel AI', level: 'Advanced', percentage: 90 },
      ],
      backend: [
        { name: 'Python 3.12 & FastAPI', level: 'Expert', percentage: 96 },
        { name: 'LangChain & LlamaIndex', level: 'Expert', percentage: 94 },
        { name: 'Prompt Engineering & Guardrails', level: 'Expert', percentage: 95 },
      ],
      database: [
        { name: 'pgvector (PostgreSQL)', level: 'Expert', percentage: 95 },
        { name: 'Pinecone & Qdrant Vector DBs', level: 'Advanced', percentage: 90 },
        { name: 'Redis Cache for Embeddings', level: 'Advanced', percentage: 88 },
      ],
      cloudAndDevOps: [
        { name: 'Docker & GPU Cloud Instances', level: 'Advanced', percentage: 87 },
        { name: 'HuggingFace & Model Quantization', level: 'Advanced', percentage: 85 },
      ],
    },
    featuredProjects: [
      {
        title: 'AetherBot AI Autonomous Student Support',
        description: 'Deployed RAG knowledge assistant handling 1,500+ daily student queries with 76% autonomous resolution and zero hallucinations.',
        techStack: ['Python', 'FastAPI', 'Claude 3.5 Sonnet', 'pgvector', 'Next.js 15'],
        role: 'AI & Knowledge Architect',
      },
    ],
    educationAndCerts: [
      'M.S. in Artificial Intelligence & Data Science',
      'DeepLearning.AI LangChain Specialist Certificate',
    ],
  },
  {
    id: 'dev-harish-nair',
    slug: 'harish-nair-devops-cloud-architect',
    name: 'Harish Nair',
    shortName: 'Harish N.',
    role: 'Senior DevOps, Docker & Cloud Infrastructure Specialist',
    primaryCategory: 'DevOps',
    experienceYears: 8,
    experienceLabel: '8+ Years Experience',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop',
    isVerified: true,
    isSkillsAssessed: true,
    availability: 'Available Now',
    availabilityTimeline: 'Immediate (24-48h)',
    hourlyRateINR: 1499,
    hourlyRateUSD: 20,
    monthlyRateINR: 175000,
    monthlyRateUSD: 2300,
    engagementModels: ['Hourly', 'Dedicated', 'Project-Based', 'Full-Time'],
    keyTechnologies: ['AWS', 'Docker', 'Kubernetes', 'DigitalOcean', 'Nginx', 'GitHub Actions', 'Terraform'],
    specializations: ['VPS & Server Hardening', '99.99% Uptime Architecture', 'Cloud Bill Reduction', 'Database Clustering'],
    languages: ['English', 'Hindi', 'Malayalam'],
    location: 'Remote (Bengaluru / Dubai Hub)',
    timeZone: 'IST / GST • Flexible Worldwide',
    rating: 5.0,
    completedProjectsCount: 78,
    bio: 'Senior DevOps engineer with 8+ years experience managing multi-cloud AWS, DigitalOcean, and Contabo infrastructure. Expert in containerized Docker setups, SSL hardening, automated backup pipelines, and cutting hosting bills by up to 40%.',
    technicalSkills: {
      frontend: [],
      backend: [
        { name: 'Bash Scripting & Automation', level: 'Expert', percentage: 98 },
        { name: 'Nginx / Apache Reverse Proxies', level: 'Expert', percentage: 98 },
        { name: 'SSL Certificate & HTTPS Redirection', level: 'Expert', percentage: 99 },
      ],
      database: [
        { name: 'PostgreSQL Multi-Region Replication', level: 'Expert', percentage: 94 },
        { name: 'MySQL Master-Slave Clustering', level: 'Advanced', percentage: 90 },
        { name: 'Automated Backup & Point-in-Time Recovery', level: 'Expert', percentage: 96 },
      ],
      cloudAndDevOps: [
        { name: 'Docker & Docker Compose', level: 'Expert', percentage: 98 },
        { name: 'AWS (EC2, RDS, S3, Route53, IAM)', level: 'Expert', percentage: 96 },
        { name: 'DigitalOcean, Contabo, Hetzner, cPanel', level: 'Expert', percentage: 98 },
        { name: 'GitHub Actions Automated CI/CD', level: 'Expert', percentage: 95 },
      ],
    },
    featuredProjects: [
      {
        title: 'CodeCanyon 24-48h Server Deployment Fleet',
        description: 'Successfully deployed and hardened 150+ third-party PHP/Node scripts on AWS and DigitalOcean VPS with zero configuration errors.',
        techStack: ['Ubuntu Linux', 'Nginx', 'Docker', 'PHP-FPM', 'MySQL', 'Let’s Encrypt'],
        role: 'Lead Infrastructure Engineer',
      },
    ],
    educationAndCerts: [
      'B.Tech in Computer Engineering',
      'Certified Kubernetes Administrator (CKA)',
      'AWS Certified DevOps Engineer – Professional',
    ],
  },
  {
    id: 'dev-ananya-joshi',
    slug: 'ananya-joshi-php-laravel-developer',
    name: 'Ananya Joshi',
    shortName: 'Ananya J.',
    role: 'PHP, Laravel & CodeCanyon Customization Specialist',
    primaryCategory: 'CMS & PHP',
    experienceYears: 5,
    experienceLabel: '5+ Years Experience',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop',
    isVerified: true,
    isSkillsAssessed: true,
    availability: 'Available Now',
    availabilityTimeline: 'Immediate (24-48h)',
    hourlyRateINR: 899,
    hourlyRateUSD: 12,
    monthlyRateINR: 110000,
    monthlyRateUSD: 1450,
    engagementModels: ['Hourly', 'Dedicated', 'Project-Based'],
    keyTechnologies: ['PHP 8.x', 'Laravel 11', 'MySQL', 'cPanel / WHM', 'CodeCanyon Scripts', 'WordPress'],
    specializations: ['CodeCanyon Installation', 'Custom Laravel Modules', 'Third-Party Script Debugging', 'Payment Plugins'],
    languages: ['English', 'Hindi', 'Marathi'],
    location: 'Remote (Surat / Mumbai Hub)',
    timeZone: 'IST (UTC+5:30)',
    rating: 4.95,
    completedProjectsCount: 85,
    bio: 'Specialist in setting up, heavily modifying, and debugging CodeCanyon PHP/Laravel scripts, payment gateway plugins, REST APIs, and custom CRM modules with fast 24-48h turnaround.',
    technicalSkills: {
      frontend: [
        { name: 'Blade Templates & Bootstrap / Tailwind', level: 'Expert', percentage: 95 },
        { name: 'Vue.js (Inertia.js)', level: 'Advanced', percentage: 88 },
      ],
      backend: [
        { name: 'PHP 8.x & Laravel 10/11', level: 'Expert', percentage: 96 },
        { name: 'REST APIs & Webhooks', level: 'Expert', percentage: 94 },
        { name: 'CodeCanyon Script Customization', level: 'Expert', percentage: 98 },
      ],
      database: [
        { name: 'MySQL & Query Optimization', level: 'Expert', percentage: 94 },
      ],
      cloudAndDevOps: [
        { name: 'cPanel, WHM & VPS Hosting', level: 'Expert', percentage: 96 },
        { name: 'SMTP & Cron Job Configuration', level: 'Expert', percentage: 95 },
      ],
    },
    featuredProjects: [
      {
        title: 'Multi-Vendor E-Commerce Customization',
        description: 'Customized CodeCanyon marketplace script with custom Indian payment gateways, delivery pin code validation, and GST billing.',
        techStack: ['PHP 8.2', 'Laravel', 'MySQL', 'Razorpay', 'cPanel'],
        role: 'Senior Laravel Developer',
      },
    ],
    educationAndCerts: [
      'B.E. in Computer Science',
      'Zend Certified PHP Engineer',
    ],
  },
  {
    id: 'dev-rohan-verma',
    slug: 'rohan-verma-qa-automation-engineer',
    name: 'Rohan Verma',
    shortName: 'Rohan V.',
    role: 'QA & Test Automation Engineer',
    primaryCategory: 'QA & Testing',
    experienceYears: 4,
    experienceLabel: '4+ Years Experience',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop',
    isVerified: true,
    isSkillsAssessed: true,
    availability: 'Available Now',
    availabilityTimeline: 'Immediate (24-48h)',
    hourlyRateINR: 899,
    hourlyRateUSD: 12,
    monthlyRateINR: 105000,
    monthlyRateUSD: 1400,
    engagementModels: ['Hourly', 'Dedicated', 'Project-Based'],
    keyTechnologies: ['Playwright', 'Cypress', 'Jest', 'Postman', 'API Load Testing', 'Jira'],
    specializations: ['End-to-End Test Automation', 'API Testing', 'Cross-Browser QA', 'Performance Benchmarking'],
    languages: ['English', 'Hindi'],
    location: 'Remote (Bengaluru Hub)',
    timeZone: 'IST (UTC+5:30)',
    rating: 4.95,
    completedProjectsCount: 36,
    bio: 'Software QA engineer creating robust automated test suites with Playwright, Cypress, and Postman to ensure zero regression bugs and seamless user checkouts.',
    technicalSkills: {
      frontend: [
        { name: 'Playwright & Cypress Automation', level: 'Expert', percentage: 95 },
        { name: 'Cross-Browser & Mobile Viewport QA', level: 'Expert', percentage: 96 },
      ],
      backend: [
        { name: 'Postman & REST API Test Collections', level: 'Expert', percentage: 96 },
        { name: 'JMeter Load & Stress Testing', level: 'Advanced', percentage: 88 },
      ],
      database: [
        { name: 'SQL Query Verification', level: 'Advanced', percentage: 85 },
      ],
      cloudAndDevOps: [
        { name: 'CI/CD Automated Test Pipelines', level: 'Advanced', percentage: 89 },
      ],
    },
    featuredProjects: [
      {
        title: 'Fintech Payment Regression Suite',
        description: 'Created 200+ automated end-to-end tests for multi-currency checkout, webhook handling, and discount validation.',
        techStack: ['Playwright', 'TypeScript', 'GitHub Actions', 'Postman'],
        role: 'Lead QA Engineer',
      },
    ],
    educationAndCerts: [
      'B.Tech in Information Technology',
      'ISTQB Certified Tester',
    ],
  },
];

export interface DeveloperRole {
  id: string;
  name?: string;
  title: string;
  role: string;
  category: string;
  experience: string;
  hourlyRateINR: number;
  hourlyRateUSD: number;
  skills: string[];
  avatar: string;
  availability: string;
  badge?: string;
  rating?: number;
  projectsCount?: number;
  completedProjects?: number;
  description?: string;
}

export const DEVELOPER_ROLES: DeveloperRole[] = DEVELOPERS_DATA.map((dev) => ({
  id: dev.id,
  name: dev.name,
  title: `${dev.name} (${dev.role})`,
  role: dev.role,
  category: dev.primaryCategory === 'CMS & PHP' ? 'CMS & Scripts' : dev.primaryCategory,
  experience: dev.experienceLabel,
  hourlyRateINR: dev.hourlyRateINR,
  hourlyRateUSD: dev.hourlyRateUSD,
  skills: dev.keyTechnologies,
  avatar: dev.avatarUrl,
  availability: dev.availability,
  badge: dev.isVerified ? 'Verified Pro' : undefined,
  rating: dev.rating,
  projectsCount: dev.completedProjectsCount,
  completedProjects: dev.completedProjectsCount,
  description: dev.bio,
}));


