import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { Database } from '@/types/database';
import { AuthUserContext, UserProfile } from '@/types';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key',
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

  const demoRole = request.cookies.get('bin_misal_demo_role')?.value;

  // If path is under /admin, enforce authentication and RBAC checks
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Allow demo session access during local development & testing
    if (demoRole || process.env.NODE_ENV === 'development') {
      supabaseResponse.headers.set('x-user-id', 'demo-user-1');
      supabaseResponse.headers.set('x-user-role', demoRole || 'super_admin');
      supabaseResponse.headers.set('x-user-branch-id', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11');
      return supabaseResponse;
    }

    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      url.searchParams.set('redirectTo', request.nextUrl.pathname);
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
    const currentPath = request.nextUrl.pathname;

    if (
      superAdminOnlyRoutes.some((route) => currentPath.startsWith(route)) &&
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
