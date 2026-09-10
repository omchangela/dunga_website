import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    // Default Super Admin Credentials
    const defaultEmail = 'admin@dungatechnologies.com';
    const defaultPassword = 'admin123';

    if (process.env.DATABASE_URL) {
      const adminUser = await prisma.adminUser.findUnique({
        where: { email },
      });

      if (adminUser) {
        // Verify password
        if (adminUser.passwordHash === password) {
          await prisma.adminUser.update({
            where: { id: adminUser.id },
            data: { lastLoginAt: new Date() },
          });

          return NextResponse.json({
            success: true,
            user: {
              name: adminUser.name,
              email: adminUser.email,
              role: adminUser.role,
            },
            token: `dunga_admin_session_${Date.now()}`,
          });
        }
      }
    }

    // Default Demo Login Fallback
    if (email.toLowerCase() === defaultEmail && password === defaultPassword) {
      return NextResponse.json({
        success: true,
        user: {
          name: 'Om Changela',
          email: 'admin@dungatechnologies.com',
          role: 'Super Administrator & Founder',
        },
        token: `dunga_admin_session_${Date.now()}`,
      });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid admin credentials.' },
      { status: 401 }
    );
  } catch (error: any) {
    console.error('Error in admin login:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Authentication error.' },
      { status: 500 }
    );
  }
}
