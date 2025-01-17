import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req: request, res })

  console.log('Middleware running for:', request.nextUrl.pathname)
  
  try {
    const { data: { session }, error } = await supabase.auth.getSession()
    
    if (error) {
      console.error('Supabase session error:', error)
      if (request.nextUrl.pathname === '/') {
        return res
      }
      return NextResponse.redirect(new URL('/auth', request.url))
    }

    const isAuthPage = request.nextUrl.pathname.startsWith('/auth')

    // Redirect authenticated users away from auth pages
    if (session && isAuthPage) {
      console.log('Redirecting authenticated user from auth page to dashboard')
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    // Only redirect unauthenticated users if they're trying to access protected routes
    if (!session && !isAuthPage && !['/', '/about', '/contact'].includes(request.nextUrl.pathname)) {
      console.log('Redirecting unauthenticated user to auth page')
      return NextResponse.redirect(new URL('/auth', request.url))
    }

    console.log('Session status:', session ? 'authenticated' : 'unauthenticated')
  } catch (error) {
    console.error('Middleware error:', error)
    if (request.nextUrl.pathname === '/') {
      return res
    }
    return NextResponse.redirect(new URL('/auth', request.url))
  }

  return res
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
