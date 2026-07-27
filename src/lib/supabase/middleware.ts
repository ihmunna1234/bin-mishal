import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { Database } from '@/types/database';
import { AuthUserContext, UserProfile } from '@/types';
import { checkRateLimit } from '@/lib/rateLimit';

export async function updateSession(request: NextRequest) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    '127.0.0.1';

  const pathname = request.nextUrl.pathname;

  // 1. Rate Limiting Check for Authentication Endpoints (login)
  if (pathname.startsWith('/login') && request.method === 'POST') {
    const rateLimit = checkRateLimit(`login_${ip}`, 5, 60000); // 5 attempts per minute per IP
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `Too many login attempts. Please wait ${rateLimit.resetSeconds} seconds before trying again.`,
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(rateLimit.resetSeconds),
            'X-RateLimit-Limit': String(rateLimit.limit),
            'X-RateLimit-Remaining': '0',
          },
        }
      );
    }
  }

  // Rate Limiting Check for Public API Endpoints
  if (pathname.startsWith('/api/inquiries/public-create') || pathname.startsWith('/api/ai/chat')) {
    const rateLimit = checkRateLimit(`api_${ip}`, 10, 60000); // 10 attempts per minute per IP
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `Rate limit exceeded. Please wait ${rateLimit.resetSeconds} seconds.`,
        },
        { status: 429, headers: { 'Retry-After': String(rateLimit.resetSeconds) } }
      );
    }
  }

  let supabaseResponse = NextResponse.next({
    request,
  });

  // 2. CORS Handling for API endpoints
  if (pathname.startsWith('/api/')) {
    const origin = request.headers.get('origin');
    const allowedOrigin = process.env.NEXT_PUBLIC_APP_URL || request.nextUrl.origin;

    if (origin && origin !== allowedOrigin && process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { success: false, error: 'CORS forbidden: Origin not allowed.' },
        { status: 403 }
      );
    }
    
    if (origin) {
      supabaseResponse.headers.set('Access-Control-Allow-Origin', origin);
      supabaseResponse.headers.set('Access-Control-Allow-Credentials', 'true');
      supabaseResponse.headers.set(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, OPTIONS'
      );
      supabaseResponse.headers.set(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization, X-Requested-With'
      );
    }
  }

  // 3. Security Headers
  supabaseResponse.headers.set('X-Content-Type-Options', 'nosniff');
  supabaseResponse.headers.set('X-Frame-Options', 'DENY');
  supabaseResponse.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  supabaseResponse.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: Array<{ name: string; value: string; options?: any }>) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 4. Production RBAC & Admin Authentication (Strictly No Demo Cookie Backdoor)
  if (pathname.startsWith('/admin')) {
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      url.searchParams.set('redirectTo', pathname);
      return NextResponse.redirect(url);
    }

    // Fetch user profile to check role and branch mapping
    const { data } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    const profile = data as UserProfile | null;

    if (!profile || !profile.active_status) {
      const url = request.nextUrl.clone();
      url.pathname = '/unauthorized';
      return NextResponse.redirect(url);
    }

    const authContext: AuthUserContext = {
      id: profile.id,
      email: profile.email,
      role: profile.role,
      branch_id: profile.branch_id,
      full_name: profile.full_name,
      avatar_url: profile.avatar_url,
    };

    const superAdminOnlyRoutes = ['/admin/branches', '/admin/settings'];

    if (
      superAdminOnlyRoutes.some((route) => pathname.startsWith(route)) &&
      authContext.role !== 'super_admin'
    ) {
      const url = request.nextUrl.clone();
      url.pathname = '/unauthorized';
      return NextResponse.redirect(url);
    }

    supabaseResponse.headers.set('x-user-id', authContext.id);
    supabaseResponse.headers.set('x-user-role', authContext.role);
    supabaseResponse.headers.set('x-user-branch-id', authContext.branch_id || '');
  }

  return supabaseResponse;
}

