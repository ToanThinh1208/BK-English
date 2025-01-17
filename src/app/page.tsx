'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { LoginForm } from '@/components/auth/LoginForm'

export default function Home() {
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        router.push('/dashboard')
      }
    }
    
    checkAuth()
  }, [router, supabase])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <LoginForm 
          supabase={supabase}
          onSuccess={() => router.push('/dashboard')}
        />
        <div className="text-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
          </span>
          <button
            onClick={() => router.push('/auth')}
            className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Sign up
          </button>
        </div>
      </div>
    </main>
  )
}
