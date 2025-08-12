"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import type { ReactNode } from "react"
import Cookies from "js-cookie" // Import js-cookie for client-side cookie management

interface AuthContextType {
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // On mount, check if user was previously logged in via cookie
    const storedAuth = Cookies.get("isAuthenticated")
    if (storedAuth === "true") {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    if (email === "abicconsuntancy@gmail.com" && password === "abicconsultancy@2025") {
      setIsAuthenticated(true)
      Cookies.set("isAuthenticated", "true", { expires: 7 }) // Set cookie for 7 days
      return true
    }
    setIsAuthenticated(false)
    Cookies.remove("isAuthenticated") // Remove cookie on failed login
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
    Cookies.remove("isAuthenticated") // Remove cookie on logout
    router.push("/login")
  }

  return <AuthContext.Provider value={{ isAuthenticated, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
