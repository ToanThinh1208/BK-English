"use client"

import Link from "next/link"
import { Session } from "@supabase/supabase-js"
import { Button } from "../ui/button"
import { supabase } from "@/lib/supabaseClient"

interface HeaderProps {
  session: Session | null
}

export function Header({ session }: HeaderProps) {
  const isLoggedIn = !!session
  const user = session?.user

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = "/"
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              BK English
            </Link>
          </div>
          <nav className="flex space-x-4 items-center">
            {isLoggedIn ? (
              <>
                <div className="flex items-center gap-4">
                  <div className="text-sm text-gray-700">
                    {user?.email || 'Welcome'}
                  </div>
                  <Button 
                    variant="ghost"
                    onClick={handleLogout}
                    className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Logout
                  </Button>
                </div>
              </>
            ) : null}
          </nav>
        </div>
      </div>
    </header>
  )
}
