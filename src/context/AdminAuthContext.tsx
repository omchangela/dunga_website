'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface AdminUser {
  name: string;
  email: string;
  role: string;
  avatarUrl: string;
  lastLogin: string;
}

interface AdminAuthContextType {
  isAuthenticated: boolean;
  adminUser: AdminUser | null;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

const ADMIN_STORAGE_KEY = 'dunga_admin_auth_session';

const DEFAULT_ADMIN: AdminUser = {
  name: 'Om Changela',
  email: 'admin@dungatechnologies.com',
  role: 'Super Administrator & Founder',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
  lastLogin: new Date().toISOString()
};

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    try {
      const stored = localStorage.getItem(ADMIN_STORAGE_KEY);
      if (stored) {
        setAdminUser(JSON.parse(stored));
      }
    } catch {
      // ignore
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    const trimmedEmail = email.toLowerCase().trim();
    
    // Accept primary admin credentials or demo credentials
    if (
      (trimmedEmail === 'admin@dungatechnologies.com' && pass === 'admin123') ||
      (trimmedEmail === 'admin@dunga.com' && pass === 'admin123') ||
      (trimmedEmail.includes('@') && pass.length >= 6) // flexible for owner testing
    ) {
      const user: AdminUser = {
        ...DEFAULT_ADMIN,
        email: trimmedEmail,
        name: trimmedEmail === 'admin@dungatechnologies.com' ? 'Om Changela' : trimmedEmail.split('@')[0],
        lastLogin: new Date().toISOString()
      };
      
      setAdminUser(user);
      if (typeof window !== 'undefined') {
        localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(user));
        // Set document cookie for middleware/SSR if needed
        document.cookie = `dunga_admin_token=active_session_${Date.now()}; path=/; max-age=86400; SameSite=Lax`;
      }
      return { success: true };
    }

    return { 
      success: false, 
      error: 'Invalid admin credentials. Please use admin@dungatechnologies.com / admin123' 
    };
  };

  const logout = () => {
    setAdminUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(ADMIN_STORAGE_KEY);
      document.cookie = 'dunga_admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
    router.push('/admin/login');
  };

  return (
    <AdminAuthContext.Provider
      value={{
        isAuthenticated: !!adminUser,
        adminUser,
        isLoading,
        login,
        logout
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
