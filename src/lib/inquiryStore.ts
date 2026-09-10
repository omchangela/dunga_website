export type InquiryStatus = 'New' | 'In Review' | 'Contacted' | 'Converted' | 'Archived';
export type InquiryType = 'Developer Hire' | 'Custom Software' | 'Source Code License' | 'Script Installation' | 'Tech Consultancy' | 'Project Estimation' | 'General';
export type InquiryPriority = 'High' | 'Medium' | 'Low';

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  type: InquiryType;
  serviceOrProduct: string;
  budget?: string;
  message: string;
  status: InquiryStatus;
  priority: InquiryPriority;
  createdAt: string;
  sourcePage: string;
  notes?: string[];
  assignedTo?: string;
}

const STORAGE_KEY = 'dunga_admin_inquiries_v1';

// Initial pre-seeded realistic inquiries so the admin dashboard is immediately rich
const INITIAL_INQUIRIES: Inquiry[] = [
  {
    id: 'INQ-9081',
    name: 'Rajiv Malhotra',
    email: 'rajiv@fintechpulse.io',
    phone: '+91 98201 44552',
    company: 'FinTech Pulse Solutions',
    type: 'Developer Hire',
    serviceOrProduct: 'Senior Backend & Cloud Architect (#DEV-103)',
    budget: '₹1,65,000 / month (Dedicated)',
    message: 'We are scaling our multi-gateway payment engine and need a full-time senior Node.js and PostgreSQL backend architect for a 6-month dedicated sprint. Overlap with IST/EST required.',
    status: 'New',
    priority: 'High',
    createdAt: new Date(Date.now() - 1000 * 60 * 18).toISOString(), // 18 mins ago
    sourcePage: '/hire-developers',
    notes: ['Client mentioned they need kickoff by next Monday. Needs NDA signed.'],
    assignedTo: 'Technical Onboarding Desk'
  },
  {
    id: 'INQ-9080',
    name: 'Aarav Singhania',
    email: 'aarav@realtysmart.in',
    phone: '+91 98765 12340',
    company: 'RealtySmart India',
    type: 'Source Code License',
    serviceOrProduct: 'OmniFlow AI CRM & Telecaller Suite (Extended License)',
    budget: '₹18,499 ($249)',
    message: 'Looking to purchase the full source code package with custom Indian payment gateway and multi-agent WhatsApp broadcast integration.',
    status: 'In Review',
    priority: 'High',
    createdAt: new Date(Date.now() - 1000 * 60 * 55).toISOString(), // 55 mins ago
    sourcePage: '/products/omniflow-ai-crm-telecaller-suite',
    notes: ['Inquired about VPS server setup addon.'],
    assignedTo: 'Sales Desk'
  },
  {
    id: 'INQ-9079',
    name: 'Sophia Davis',
    email: 'sophia.davis@meditechlabs.co.uk',
    phone: '+44 7700 900142',
    company: 'MediTech Labs UK',
    type: 'Custom Software',
    serviceOrProduct: 'Custom Application & Enterprise Software Development',
    budget: '₹2,50,000+ ($3,000+)',
    message: 'Need a custom patient diagnostic dashboard built with Next.js 15, FastAPI, and HL7 medical data integration. Looking for milestone-based delivery.',
    status: 'Contacted',
    priority: 'High',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
    sourcePage: '/contact',
    notes: ['Sent technical scoping questionnaire via email on Sept 10.'],
    assignedTo: 'Principal Architect'
  },
  {
    id: 'INQ-9078',
    name: 'Vikramaditya Joshi',
    email: 'vikram@quicklogistics.net',
    phone: '+91 98112 88764',
    company: 'Quick Logistics Hub',
    type: 'Developer Hire',
    serviceOrProduct: 'Senior Flutter & Mobile Developer (#DEV-104)',
    budget: 'Hourly Flex (₹1,199 / hr)',
    message: 'Need 40 hours of mobile app debugging and BLE printer integration for our courier tracking application.',
    status: 'In Review',
    priority: 'Medium',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(), // 6 hours ago
    sourcePage: '/hire-developers',
    notes: ['Reviewed APK logs, developer DEV-104 is a perfect fit.'],
    assignedTo: 'Technical Onboarding Desk'
  },
  {
    id: 'INQ-9077',
    name: 'Karan Mehra',
    email: 'karan@apexacademy.in',
    phone: '+91 99004 55667',
    company: 'Apex Learning EdTech',
    type: 'Script Installation',
    serviceOrProduct: 'CodeCanyon LMS Script Setup on AWS EC2 & RDS',
    budget: '₹999 ($15)',
    message: 'Purchased an LMS script on CodeCanyon. Facing 500 server error on cPanel. Need installation on AWS Ubuntu instance with SSL and SMTP setup.',
    status: 'Converted',
    priority: 'Medium',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(), // 18 hours ago
    sourcePage: '/services/codecanyon-script-installation',
    notes: ['Server credentials received. Harish deployed script in 3 hours. Client satisfied.'],
    assignedTo: 'DevOps Desk'
  },
  {
    id: 'INQ-9076',
    name: 'Elena Rostova',
    email: 'elena@cybershield.de',
    phone: '+49 151 23456789',
    company: 'CyberShield GmbH',
    type: 'Tech Consultancy',
    serviceOrProduct: 'Strategic Tech Consultancy & Architecture Advisory',
    budget: '₹25,000 ($349)',
    message: 'We require a deep-dive security audit and database indexing review for our PostgreSQL cluster before launching in EU markets.',
    status: 'Converted',
    priority: 'High',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString(), // 1 day ago
    sourcePage: '/services/tech-consultancy',
    notes: ['Audit completed. Delivered 18-page FinOps & security architecture report.'],
    assignedTo: 'Principal Architect'
  },
  {
    id: 'INQ-9075',
    name: 'Pooja Patel',
    email: 'pooja@surattextiles.com',
    phone: '+91 97234 56789',
    company: 'Surat Textiles B2B',
    type: 'Project Estimation',
    serviceOrProduct: 'B2B Inventory Management & WhatsApp Invoicing Engine',
    budget: '₹1,00,000 - ₹2,00,000',
    message: 'Submitted project estimation request for automated GST invoice generation and order status triggers via WhatsApp Cloud API.',
    status: 'Contacted',
    priority: 'Medium',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 42).toISOString(), // 1.5 days ago
    sourcePage: '/project-estimation',
    notes: ['Sent estimated milestone roadmap with 4 sprints.'],
    assignedTo: 'Sales Desk'
  },
  {
    id: 'INQ-9074',
    name: 'Amitabh Sen',
    email: 'amitabh@senholdings.com',
    phone: '+91 94330 11223',
    company: 'Sen Holdings',
    type: 'General',
    serviceOrProduct: 'General Inquiries & Enterprise Retainer',
    budget: 'Annual Retainer (₹15,000 / mo)',
    message: 'Looking for 24/7 server monitoring and monthly technical maintenance for our 4 corporate WordPress and Laravel portals.',
    status: 'Archived',
    priority: 'Low',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // 3 days ago
    sourcePage: '/contact',
    notes: ['Signed 1-year AMC contract.'],
    assignedTo: 'Support Desk'
  }
];

export const inquiryStore = {
  getInquiries(): Inquiry[] {
    if (typeof window === 'undefined') return INITIAL_INQUIRIES;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_INQUIRIES));
        return INITIAL_INQUIRIES;
      }
      return JSON.parse(stored);
    } catch {
      return INITIAL_INQUIRIES;
    }
  },

  addInquiry(inquiryData: Omit<Inquiry, 'id' | 'createdAt' | 'status'> & { status?: InquiryStatus }): Inquiry {
    const inquiries = this.getInquiries();
    const newId = `INQ-${Math.floor(1000 + Math.random() * 9000)}`;
    const newInquiry: Inquiry = {
      ...inquiryData,
      id: newId,
      status: inquiryData.status || 'New',
      createdAt: new Date().toISOString(),
      notes: inquiryData.notes || []
    };

    const updated = [newInquiry, ...inquiries];
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        window.dispatchEvent(new Event('dunga_inquiries_updated'));
      } catch (err) {
        console.error('Failed to save inquiry:', err);
      }
    }
    return newInquiry;
  },

  updateInquiryStatus(id: string, status: InquiryStatus): void {
    const inquiries = this.getInquiries();
    const updated = inquiries.map((inq) => (inq.id === id ? { ...inq, status } : inq));
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        window.dispatchEvent(new Event('dunga_inquiries_updated'));
      } catch (err) {
        console.error('Failed to update inquiry status:', err);
      }
    }
  },

  addInquiryNote(id: string, note: string): void {
    const inquiries = this.getInquiries();
    const updated = inquiries.map((inq) => {
      if (inq.id === id) {
        return { ...inq, notes: [...(inq.notes || []), note] };
      }
      return inq;
    });
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        window.dispatchEvent(new Event('dunga_inquiries_updated'));
      } catch (err) {
        console.error('Failed to add note:', err);
      }
    }
  },

  deleteInquiry(id: string): void {
    const inquiries = this.getInquiries();
    const updated = inquiries.filter((inq) => inq.id !== id);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        window.dispatchEvent(new Event('dunga_inquiries_updated'));
      } catch (err) {
        console.error('Failed to delete inquiry:', err);
      }
    }
  },

  resetToDefault(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_INQUIRIES));
      window.dispatchEvent(new Event('dunga_inquiries_updated'));
    }
  }
};
