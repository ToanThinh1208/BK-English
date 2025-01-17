"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { Session } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabaseClient"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Sidebar } from "@/components/layout/Sidebar"

export default function LayoutClient({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [session, setSession] = useState<Session | null>(null)
  const pathname = usePathname()
  const isAuthPage = pathname === "/auth"

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Header session={session} />
      <div className="flex flex-1 relative">
        {session && !isAuthPage && (
          <div className="w-64 border-r sticky top-16 h-[calc(100vh-4rem)]">
            <Sidebar />
          </div>
        )}
        <main className="flex-1 container mx-auto px-4 py-8 mt-16">
          {children}
        </main>
      </div>
      {!isAuthPage && <Footer />}
    </div>
  )
}
