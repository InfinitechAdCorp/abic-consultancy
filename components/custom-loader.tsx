"use client"

import { useEffect, useState } from "react"

export default function CustomLoader() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="relative flex items-center justify-center">
        {/* Main ABIC Text Animation */}
        <div className="relative">
          {/* Background flowing animation */}
          <div className="absolute inset-0 -m-8">
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-green-400/20 to-blue-500/20 animate-pulse"></div>
          </div>
          
          {/* Animated letters */}
          <div className="relative flex items-center space-x-2">
            <div className="text-6xl font-bold bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent animate-bounce">
              A
            </div>
            <div className="text-6xl font-bold bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent animate-bounce animation-delay-100">
              B
            </div>
            <div className="text-6xl font-bold bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent animate-bounce animation-delay-200">
              I
            </div>
            <div className="text-6xl font-bold bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent animate-bounce animation-delay-300">
              C
            </div>
          </div>
          
          {/* Flowing lines animation */}
          <div className="absolute -top-4 -left-4 w-20 h-1 bg-gradient-to-r from-green-500 to-blue-600 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-4 -right-4 w-16 h-1 bg-gradient-to-r from-blue-600 to-green-500 rounded-full animate-pulse animation-delay-200"></div>
        </div>
        
        {/* Loading text and dots */}
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-blue-600 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-blue-600 rounded-full animate-bounce animation-delay-100"></div>
            <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-blue-600 rounded-full animate-bounce animation-delay-200"></div>
          </div>
          <p className="text-lg font-semibold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent text-center">
            Loading Excellence
          </p>
        </div>
      </div>
    </div>
  )
}
