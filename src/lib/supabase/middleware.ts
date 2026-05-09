import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet: any[]) {
          cookiesToSet.forEach(({ name, value, options }) => {
            // @ts-ignore
            request.cookies.set(name, value)
          })
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) => {
            // @ts-ignore
            supabaseResponse.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  const url = request.nextUrl.clone()
  const isDashboardRoute = url.pathname.startsWith('/dashboard') || url.pathname.startsWith('/profile')
  const isAuthRoute = url.pathname.startsWith('/login') || url.pathname.startsWith('/signup') || url.pathname.startsWith('/register')
  const isHomeRoute = url.pathname === '/'
  const isApiRoute = url.pathname.startsWith('/api')
  const isStaticRoute = url.pathname.includes('.') || url.pathname.startsWith('/_next')

  // Skip auth check for static assets and non-auth API routes to speed up performance
  if (isStaticRoute && !url.pathname.startsWith('/_next/data')) {
    return supabaseResponse
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    if (isHomeRoute || isAuthRoute) {
      const role = user.user_metadata?.role || 'freelancer'
      url.pathname = `/dashboard/${role}`
      return NextResponse.redirect(url)
    }
  } else {
    if (isDashboardRoute) {
      url.pathname = '/'
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}
