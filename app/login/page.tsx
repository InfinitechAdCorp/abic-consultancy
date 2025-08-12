"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image" // Import Image component
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react" // Import Loader2 icon

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false) // Loading state for button
  const { isAuthenticated, login } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/admin") // Redirect to admin dashboard if already authenticated
    }
  }, [isAuthenticated, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("") // Clear previous errors
    setIsLoading(true) // Start loading

    const success = await login(email, password)
    if (success) {
      // Redirection handled by useEffect
    } else {
      setError("Invalid email or password.")
    }
    setIsLoading(false) // End loading
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-4">
      <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm border border-emerald-200 shadow-xl shadow-emerald-500/10 rounded-lg">
        <CardHeader className="text-center pb-6">
          <div className="flex justify-center mb-4">
            <Image
              src="/images/abic-logo.png"
              alt="ABIC Consultancy Logo"
              width={150}
              height={60}
              className="object-contain"
            />
          </div>
          <CardTitle className="text-3xl font-bold text-gray-800">Welcome Back!</CardTitle>
          <CardDescription className="text-gray-600">Sign in to your ABIC Consultancy admin dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                // placeholder="abicconsuntancy@gmail.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/70 border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                // placeholder="abicconsultancy@2025"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/70 border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500 transition-colors"
              />
            </div>
            {error && <p className="text-sm text-red-500 text-center">{error}</p>}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold py-2 rounded-lg shadow-md hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
