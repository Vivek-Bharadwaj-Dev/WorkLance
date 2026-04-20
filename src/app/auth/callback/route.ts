import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return [] // We're simply verifying the code to exchange for a session, middleware handles actual cookie setting
          },
          setAll() {
            // we leave the session setting entirely to middleware.ts
          },
        },
      }
    )
    
    // Exchange the code for a session
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      const role = data.session?.user?.user_metadata?.role || 'student';
      const actualNext = next === '/' ? `/dashboard/${role}` : next;
      return NextResponse.redirect(`${origin}${actualNext}`)
    }
  }

  // Return the user to an error page with some instructions
  return NextResponse.redirect(`${origin}/login?error=auth-code-error`)
}
