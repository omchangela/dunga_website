export type InquiryStatus = 'New' | 'In Review' | 'Contacted' | 'Converted' | 'Archived';
export type InquiryType = 'Developer Hire' | 'Custom Software' | 'Source Code License' | 'Script Installation' | 'Tech Consultancy' | 'Project Estimation' | 'General';
export type InquiryPriority = 'High' | 'Medium' | 'Low';

export interface Inquiry {
  id: string;
  inquiryCode?: string;
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

const STORAGE_KEY = 'dunga_admin_inquiries_real_v2';
const FAKE_IDS = ['INQ-9081', 'INQ-9080', 'INQ-9079', 'INQ-9078', 'INQ-9077', 'INQ-9076', 'INQ-9075', 'INQ-9074', 'INQ-3530', 'INQ-3529'];
const FAKE_NAMES = ['Rajiv Malhotra', 'Aarav Singhania', 'Sophia Davis', 'Vikramaditya Joshi', 'Karan Mehra', 'Elena Rostova', 'Pooja Patel', 'Amitabh Sen', 'Aditya Birla Group', 'Siddharth Rao'];

export const inquiryStore = {
  getInquiries(): Inquiry[] {
    if (typeof window === 'undefined') return [];
    try {
      // Clean up old legacy key with fake data if present
      localStorage.removeItem('dunga_admin_inquiries_v1');

      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return [];

      const parsed: Inquiry[] = JSON.parse(stored);
      // Filter out any mock/dummy leads
      const realInquiries = parsed.filter(
        (inq) => !FAKE_IDS.includes(inq.id) && !FAKE_NAMES.includes(inq.name)
      );

      if (realInquiries.length !== parsed.length) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(realInquiries));
      }

      return realInquiries;
    } catch {
      return [];
    }
  },

  async fetchFromApi(): Promise<Inquiry[]> {
    try {
      const res = await fetch('/api/inquiries');
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        const mapped: Inquiry[] = json.data
          .filter((inq: any) => !FAKE_IDS.includes(inq.inquiryCode) && !FAKE_NAMES.includes(inq.name))
          .map((inq: any) => ({
            id: inq.id || inq.inquiryCode,
            inquiryCode: inq.inquiryCode || inq.id,
            name: inq.name,
            email: inq.email,
            phone: inq.phone,
            company: inq.company || undefined,
            type: inq.type as InquiryType,
            serviceOrProduct: inq.serviceOrProduct,
            budget: inq.budget || undefined,
            message: inq.message,
            status: inq.status as InquiryStatus,
            priority: (inq.priority || 'High') as InquiryPriority,
            createdAt: inq.createdAt,
            sourcePage: inq.sourcePage || 'Website Form',
            notes: inq.notes || []
          }));

        if (typeof window !== 'undefined') {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(mapped));
          window.dispatchEvent(new Event('dunga_inquiries_updated'));
        }
        return mapped;
      }
    } catch (err) {
      console.warn('Could not fetch inquiries from database API, using local cache:', err);
    }
    return this.getInquiries();
  },

  addInquiry(inquiryData: Omit<Inquiry, 'id' | 'createdAt' | 'status'> & { status?: InquiryStatus }): Inquiry {
    const inquiries = this.getInquiries();
    const newId = `INQ-${Math.floor(1000 + Math.random() * 9000)}`;
    const newInquiry: Inquiry = {
      ...inquiryData,
      id: newId,
      inquiryCode: newId,
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
        console.error('Failed to save inquiry locally:', err);
      }
    }

    // Persist to PostgreSQL database via API route
    if (typeof window !== 'undefined') {
      fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: inquiryData.name,
          email: inquiryData.email,
          phone: inquiryData.phone,
          company: inquiryData.company,
          type: inquiryData.type,
          serviceOrProduct: inquiryData.serviceOrProduct,
          budget: inquiryData.budget,
          message: inquiryData.message,
          priority: inquiryData.priority,
          sourcePage: inquiryData.sourcePage,
        })
      }).catch((err) => console.error('Error syncing inquiry to database API:', err));
    }

    return newInquiry;
  },

  updateInquiryStatus(id: string, status: InquiryStatus): void {
    const inquiries = this.getInquiries();
    const updated = inquiries.map((inq) => (inq.id === id || inq.inquiryCode === id ? { ...inq, status } : inq));
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        window.dispatchEvent(new Event('dunga_inquiries_updated'));
      } catch (err) {
        console.error('Failed to update inquiry status:', err);
      }

      fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      }).catch(() => {});
    }
  },

  addInquiryNote(id: string, note: string): void {
    const inquiries = this.getInquiries();
    const updated = inquiries.map((inq) => {
      if (inq.id === id || inq.inquiryCode === id) {
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

      fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note })
      }).catch(() => {});
    }
  },

  deleteInquiry(id: string): void {
    const inquiries = this.getInquiries();
    const updated = inquiries.filter((inq) => inq.id !== id && inq.inquiryCode !== id);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        window.dispatchEvent(new Event('dunga_inquiries_updated'));
      } catch (err) {
        console.error('Failed to delete inquiry:', err);
      }

      fetch(`/api/inquiries/${id}`, {
        method: 'DELETE'
      }).catch(() => {});
    }
  },

  resetToDefault(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
      window.dispatchEvent(new Event('dunga_inquiries_updated'));
    }
  }
};
