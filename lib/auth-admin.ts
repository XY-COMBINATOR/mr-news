import { cookies } from 'next/headers';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

/**
 * Checks whether the current request is coming from the authorized administrator (mrnewsbrief@gmail.com).
 * Supports:
 * 1. Google OAuth session via NextAuth matching ADMIN_EMAIL
 * 2. Admin Passkey cookie (mr_admin_token) matching ADMIN_SECRET or EMAIL_PASS
 * 3. Direct API x-admin-key or Authorization Bearer header
 */
export async function isAuthorizedAdmin(req?: Request): Promise<{
  authorized: boolean;
  reason?: string;
  email?: string;
}> {
  const adminEmail = (process.env.ADMIN_EMAIL || 'mrnewsbrief@gmail.com').toLowerCase().trim();
  const adminSecret = process.env.ADMIN_SECRET || 'MRNEWS@68485#';
  const emailPass = process.env.EMAIL_PASS?.trim() || '';

  // 1. Direct API headers (x-admin-key or Bearer token)
  if (req) {
    const adminKey = req.headers.get('x-admin-key');
    const authHeader = req.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
    const candidate = adminKey || authHeader;
    if (candidate && (candidate === adminSecret || candidate === process.env.CRON_SECRET || (emailPass && candidate === emailPass))) {
      return { authorized: true, email: adminEmail };
    }
  }

  // 2. Cookie session check
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('mr_admin_token')?.value;
    if (token && (token === adminSecret || token === 'MRNEWS@68485#' || (emailPass && token === emailPass))) {
      return { authorized: true, email: adminEmail };
    }
  } catch {
    // Ignore when cookies are not available
  }

  // 3. NextAuth Google session check
  try {
    const session = await getServerSession(authOptions);
    if (session?.user?.email) {
      const userEmail = session.user.email.toLowerCase().trim();
      if (userEmail === adminEmail) {
        return { authorized: true, email: userEmail };
      }
      return {
        authorized: false,
        reason: `Logged in as ${userEmail}. Only ${adminEmail} is authorized to access the control desk.`,
      };
    }
  } catch {
    // Ignore session errors
  }

  return {
    authorized: false,
    reason: `Authentication required. Only ${adminEmail} can access this control desk.`,
  };
}
// MR NEWS — Executive Morning Intelligence Platform
