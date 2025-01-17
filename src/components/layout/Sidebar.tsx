"use client"

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Menu, ChevronDown, User, BookOpen, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useSession } from '@/lib/supabaseClient'

export function Sidebar() {
  const [showIntro, setShowIntro] = useState(false)
  const { session, loading } = useSession()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px]">
        {/* User Profile Section */}
        <div className="p-4 border-b">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-muted rounded-full">
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <User className="h-5 w-5" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium">
                {loading ? 'Loading...' : session?.user?.email || 'Guest'}
              </p>
              {!loading && (
                <button className="text-xs text-muted-foreground hover:text-primary">
                  View Profile
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Introduction Section */}
        <div className="p-4 border-b">
          <button
            onClick={() => setShowIntro(!showIntro)}
            className="flex items-center justify-between w-full text-sm font-medium"
          >
            <span className="flex items-center">
              <BookOpen className="h-4 w-4 mr-2" />
              Introduction
            </span>
            <ChevronDown className={`h-4 w-4 transition-transform ${showIntro ? 'rotate-180' : ''}`} />
          </button>
          
          {showIntro && (
            <div className="mt-2 pl-6">
              <Link href="/introduction/overview" className="text-sm text-muted-foreground hover:text-primary block py-1">
                Overview
              </Link>
              <Link href="/introduction/features" className="text-sm text-muted-foreground hover:text-primary block py-1">
                Features
              </Link>
              <Link href="/introduction/guide" className="text-sm text-muted-foreground hover:text-primary block py-1">
                User Guide
              </Link>
            </div>
          )}
        </div>

        {/* Main Navigation */}
        <nav className="flex flex-col space-y-1 p-4">
          <Link href="/dashboard" className="text-sm font-medium hover:bg-accent p-2 rounded">
            Dashboard
          </Link>
          <Link href="/reading" className="text-sm font-medium hover:bg-accent p-2 rounded">
            Reading
          </Link>
          <Link href="/listening" className="text-sm font-medium hover:bg-accent p-2 rounded">
            Listening
          </Link>
          <Link href="/writing" className="text-sm font-medium hover:bg-accent p-2 rounded">
            Writing
          </Link>
          <Link href="/speaking" className="text-sm font-medium hover:bg-accent p-2 rounded">
            Speaking
          </Link>
          <Link href="/progress" className="text-sm font-medium hover:bg-accent p-2 rounded">
            Progress
          </Link>
          <Link href="/settings" className="text-sm font-medium hover:bg-accent p-2 rounded">
            Settings
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
