"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoginForm } from "@/components/auth/LoginForm"
import { SignupForm } from "@/components/auth/SignupForm"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export default function AuthPage() {
  const [tab, setTab] = useState("login")
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleAuthSuccess = () => {
    router.push("/dashboard")
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginForm 
              supabase={supabase}
              onSuccess={handleAuthSuccess}
            />
          </TabsContent>
          <TabsContent value="signup">
            <SignupForm 
              supabase={supabase}
              onSuccess={handleAuthSuccess}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
