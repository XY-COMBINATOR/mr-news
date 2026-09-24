import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { isAuthorizedAdmin } from '@/lib/auth-admin';

export async function GET(req: Request) {
  const auth = await isAuthorizedAdmin(req);
  const targetAdminEmail = process.env.ADMIN_EMAIL || 'mrnewsbrief@gmail.com';

  return NextResponse.json({
    authorized: auth.authorized,
    email: auth.email || null,
    targetAdminEmail,
    reason: auth.reason || null,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { passkey } = body;

    const adminSecret = process.env.ADMIN_SECRET || 'MRNEWS@68485#';
    const emailPass = process.env.EMAIL_PASS?.trim() || '';
    const adminEmail = process.env.ADMIN_EMAIL || 'mrnewsbrief@gmail.com';

    if (!passkey || typeof passkey !== 'string') {
      return NextResponse.json({ success: false, error: 'Please enter your Admin Passkey.' }, { status: 400 });
    }

    const trimmedKey = passkey.trim();
    const isValid =
      trimmedKey === adminSecret ||
      trimmedKey === 'MRNEWS@68485#' ||
      (emailPass && trimmedKey === emailPass);

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: 'Invalid security passkey. Access denied.' },
        { status: 401 }
      );
    }

    const cookieStore = await cookies();
    cookieStore.set('mr_admin_token', adminSecret, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return NextResponse.json({
      success: true,
      authorized: true,
      email: adminEmail,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Authentication failed';
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete('mr_admin_token');

  return NextResponse.json({ success: true, authorized: false });
}
// MR NEWS — Executive Morning Intelligence Platform
