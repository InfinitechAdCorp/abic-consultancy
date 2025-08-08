"use client"

import { useEffect, useState } from 'react'
import { motion } from "framer-motion" // Ensure this import is present

export default function ABICLoader({ loadingText = "Loading Excellence" }: { loadingText?: string }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 0 // Reset progress for continuous animation
        return prev + 1 // Increment progress
      })
    }, 25) // Adjust speed of progress bar

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center p-8 min-h-screen bg-white">
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Main SVG Container */}
        <svg
          className="w-full h-full"
          viewBox="0 0 160 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Building Base - Now with a subtle scale-in and pulse */}
          <rect
            x="40"
            y="80"
            width="80"
            height="50"
            rx="4"
            fill="url(#buildingGradient)"
            className="animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          />

          {/* Building Windows - Staggered fade-in */}
          {[
            { x: 50, y: 90, delay: "0.2s" }, { x: 62, y: 90, delay: "0.3s" }, { x: 74, y: 90, delay: "0.4s" }, { x: 86, y: 90, delay: "0.5s" }, { x: 98, y: 90, delay: "0.6s" },
            { x: 50, y: 105, delay: "0.7s" }, { x: 62, y: 105, delay: "0.8s" }, { x: 74, y: 105, delay: "0.9s" }, { x: 86, y: 105, delay: "1.0s" }, { x: 98, y: 105, delay: "1.1s" }
          ].map((window, i) => (
            <rect
              key={i}
              x={window.x}
              y={window.y}
              width="8"
              height="8"
              rx="1"
              fill="#ffffff"
              opacity="0.8"
              className="animate-fade-in-staggered"
              style={{ animationDelay: window.delay }}
            />
          ))}

          {/* ABIC Letters as Dynamic Elements - Now with a more controlled float */}
          <g>
            {/* Letter A */}
            <motion.path
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              d="M25 60 L35 30 L45 60 M30 50 L40 50"
              stroke="url(#letterGradient)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Letter B */}
            <motion.path
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              d="M55 30 L55 60 M55 30 L65 30 Q70 30 70 37.5 Q70 45 65 45 L55 45 M55 45 L68 45 Q73 45 73 52.5 Q73 60 68 60 L55 60"
              stroke="url(#letterGradient)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Letter I */}
            <motion.path
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              d="M85 30 L95 30 M90 30 L90 60 M85 60 L95 60"
              stroke="url(#letterGradient)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Letter C */}
            <motion.path
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              d="M115 37.5 Q105 30 105 45 Q105 60 115 52.5"
              stroke="url(#letterGradient)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>

          {/* Floating Documents - More organic float */}
          <g className="animate-float" style={{ animationDuration: "3s", animationDelay: "0.5s" }}>
            <rect x="20" y="20" width="12" height="16" rx="2" fill="url(#docGradient)" opacity="0.8" />
            <rect x="22" y="24" width="8" height="1" fill="#ffffff" opacity="0.6" />
            <rect x="22" y="27" width="6" height="1" fill="#ffffff" opacity="0.6" />
            <rect x="22" y="30" width="8" height="1" fill="#ffffff" opacity="0.6" />
          </g>
          <g className="animate-float" style={{ animationDuration: "3s", animationDelay: "1.5s" }}>
            <rect x="125" y="25" width="12" height="16" rx="2" fill="url(#docGradient)" opacity="0.8" />
            <rect x="127" y="29" width="8" height="1" fill="#ffffff" opacity="0.6" />
            <rect x="127" y="32" width="6" height="1" fill="#ffffff" opacity="0.6" />
            <rect x="127" y="35" width="8" height="1" fill="#ffffff" opacity="0.6" />
          </g>

          {/* Success Checkmarks - Subtle ping */}
          <g className="animate-ping-subtle" style={{ animationDuration: "2s", animationDelay: "1.0s" }}>
            <circle cx="30" cy="70" r="8" fill="url(#successGradient)" opacity="0.9" />
            <path d="M26 70 L29 73 L34 67" stroke="#ffffff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>
          <g className="animate-ping-subtle" style={{ animationDuration: "2s", animationDelay: "1.7s" }}>
            <circle cx="130" cy="75" r="8" fill="url(#successGradient)" opacity="0.9" />
            <path d="M126 75 L129 78 L134 72" stroke="#ffffff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>

          {/* Gradient Definitions */}
          <defs>
            <linearGradient id="buildingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
            <linearGradient id="letterGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#059669" />
              <stop offset="100%" stopColor="#2563EB" />
            </linearGradient>
            <linearGradient id="docGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34D399" />
              <stop offset="100%" stopColor="#60A5FA" />
            </linearGradient>
            <linearGradient id="successGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Enhanced Loading Text and Progress */}
      <div className="mt-8 text-center">
        {/* Animated Dots */}
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
          <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
          <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
        </div>
        {/* Loading Text with Enhanced Gradient */}
        <div className="relative">
          <p className="text-4xl font-bold bg-gradient-to-r from-green-500 via-blue-500 to-green-600 bg-clip-text text-transparent animate-pulse-text">
            ABIC
          </p>
          <p className="text-sm text-gray-600 mt-2 font-medium animate-fade-in-out">
            {loadingText}
          </p>
          <p className="text-xs text-gray-500 mt-1 animate-fade-in-out" style={{ animationDelay: "0.2s" }}>
            Professional • Reliable • Excellence
          </p>
        </div>
        {/* Enhanced Progress Bar */}
        <div className="mt-6 w-64 h-3 bg-gray-200 rounded-full overflow-hidden mx-auto shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-green-500 via-blue-500 to-green-600 rounded-full shadow-sm"
            style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
          ></div>
        </div>
        {/* Service Status Indicator */}
        <div className="mt-4 flex items-center justify-center space-x-4">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: "0s" }}></div>
            <div className="text-xs text-gray-600">Business</div>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: "0.3s" }}></div>
            <div className="text-xs text-gray-600">Visa</div>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: "0.6s" }}></div>
            <div className="text-xs text-gray-600">Tax</div>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: "0.9s" }}></div>
            <div className="text-xs text-gray-600">HR</div>
          </div>
        </div>
      </div>
      {/* Custom CSS for additional animations */}
      <style jsx>{`
        @keyframes fade-in-out {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-staggered {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0px); }
        }
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-3px) rotate(1deg); }
          50% { transform: translateY(0px) rotate(0deg); }
          75% { transform: translateY(3px) rotate(-1deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes ping-subtle {
          0% { transform: scale(0.8); opacity: 0.5; }
          50% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(0.8); opacity: 0.5; }
        }
        @keyframes pulse-text {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }

        .animate-fade-in-out {
          animation: fade-in-out 3s ease-in-out infinite;
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
        .animate-fade-in-staggered {
          animation: fade-in-staggered 0.6s ease-out forwards;
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-ping-subtle {
          animation: ping-subtle 2s ease-in-out infinite;
        }
        .animate-pulse-text {
          animation: pulse-text 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
