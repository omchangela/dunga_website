export interface BranchLocation {
  id: string;
  city: string;
  country: string;
  type: 'Headquarters' | 'Tech Hub' | 'Innovation Hub' | 'Global Desk' | 'Regional Office';
  address: string;
  phone: string;
  email: string;
  hours: string;
  isMain?: boolean;
}

export const BRANCH_LOCATIONS: BranchLocation[] = [
  {
    id: 'branch-surat',
    city: 'Surat',
    country: 'India',
    type: 'Headquarters',
    address: 'Dunga Tech Park, Ring Road, Vesu, Surat, Gujarat 395007',
    phone: '+91 98765 43210',
    email: 'surat@dungatechnologies.com',
    hours: 'Mon - Sat: 9:30 AM - 7:30 PM IST',
    isMain: true,
  },
  {
    id: 'branch-ahmedabad',
    city: 'Ahmedabad',
    country: 'India',
    type: 'Innovation Hub',
    address: 'SG Highway Tech Corridor, Prahlad Nagar, Ahmedabad, Gujarat 380015',
    phone: '+91 98765 43211',
    email: 'ahmedabad@dungatechnologies.com',
    hours: 'Mon - Sat: 9:30 AM - 7:30 PM IST',
  },
  {
    id: 'branch-bengaluru',
    city: 'Bengaluru',
    country: 'India',
    type: 'Tech Hub',
    address: 'Outer Ring Road, Bellandur, Bengaluru, Karnataka 560103',
    phone: '+91 80 4567 8900',
    email: 'bengaluru@dungatechnologies.com',
    hours: 'Mon - Fri: 9:00 AM - 7:00 PM IST',
  },
  {
    id: 'branch-mumbai',
    city: 'Mumbai',
    country: 'India',
    type: 'Regional Office',
    address: 'Bandra Kurla Complex (BKC), Mumbai, Maharashtra 400051',
    phone: '+91 22 6789 0123',
    email: 'mumbai@dungatechnologies.com',
    hours: 'Mon - Fri: 9:30 AM - 6:30 PM IST',
  },
  {
    id: 'branch-dubai',
    city: 'Dubai',
    country: 'UAE',
    type: 'Global Desk',
    address: 'Dubai Silicon Oasis, DTEC Hub, Dubai, United Arab Emirates',
    phone: '+971 4 392 7800',
    email: 'dubai@dungatechnologies.com',
    hours: 'Mon - Fri: 9:00 AM - 6:00 PM GST',
  },
];
