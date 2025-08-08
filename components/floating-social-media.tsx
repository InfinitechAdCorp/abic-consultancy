"use client"

import { Facebook, Twitter, Linkedin, Instagram, MessageCircle, Mail, Phone } from 'lucide-react'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { useMediaQuery } from '@/hooks/use-media-query' // Ensure this hook is available

export default function FloatingSocialMedia() {
  const pathname = usePathname()
  
  // Don't show on admin pages
  if (pathname?.startsWith('/admin')) {
    return null
  }

  const [isExpanded, setIsExpanded] = useState(false)
  const isMobile = useMediaQuery('(max-width: 768px)') // Detects if screen width is 768px or less

  const socialLinks = [
    {
      icon: Facebook,
      href: "https://www.facebook.com/people/Advance-Beyond-International-Consulting-Inc/100064218002344/?rdid=9l5ALMAI7iEncSMo&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1AMRDepebP%2F",
      label: "Facebook",
      bgColorClass: "bg-blue-600", // Default background color
      iconColorClass: "text-white", // Default icon color
      hoverEffectClass: "hover:brightness-90" // Subtle hover effect
    },
    {
      icon: MessageCircle,
      href: "https://wa.me/09155800518",
      label: "WhatsApp",
      bgColorClass: "bg-green-600",
      iconColorClass: "text-white",
      hoverEffectClass: "hover:brightness-90"
    },
    {
      icon: Mail,
      href: "mailto:zoe@abicph.com",
      label: "Email",
      bgColorClass: "bg-red-600",
      iconColorClass: "text-white",
      hoverEffectClass: "hover:brightness-90"
    },
    {
      icon: Phone,
      href: "tel:+639155800518",
      label: "Call Us",
      bgColorClass: "bg-blue-500",
      iconColorClass: "text-white",
      hoverEffectClass: "hover:brightness-90"
    }
  ]

  // Render different layouts based on screen size
  if (isMobile) {
    // Mobile layout: expandable/collapsible
    return (
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50">
        <div className={`flex flex-col items-center space-y-3 transition-all duration-500 ${isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}>
          {socialLinks.map((social, index) => {
            const Icon = social.icon
            return (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                // Increased size to w-14 h-14, applied bgColorClass, iconColorClass, and hoverEffectClass
                className={`w-14 h-14 shadow-lg rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group ${social.bgColorClass} ${social.hoverEffectClass}`}
                title={social.label}
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                {/* Increased icon size to h-7 w-7, applied iconColorClass */}
                <Icon className={`h-7 w-7 ${social.iconColorClass}`} />
                <span className="absolute right-16 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  {social.label}
                </span>
              </a>
            )
          })}
        </div>
        {/* Toggle Button for mobile */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-14 h-14 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 mt-4"
          title="Social Media"
        >
          <div className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-45' : 'rotate-0'}`}>
            {isExpanded ? (
              <div className="w-6 h-0.5 bg-white relative">
                <div className="w-6 h-0.5 bg-white absolute top-0 rotate-90"></div>
              </div>
            ) : (
              <MessageCircle className="h-6 w-6" />
            )}
          </div>
        </button>
      </div>
    )
  } else {
    // Desktop layout: all icons exposed, repositioned to center-right
    return (
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 flex flex-col gap-2 z-50">
        {socialLinks.map((social, index) => {
          const Icon = social.icon
          return (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              // Increased size to w-12 h-12, applied bgColorClass, iconColorClass, and hoverEffectClass
              className={`w-12 h-12 shadow-lg rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group ${social.bgColorClass} ${social.hoverEffectClass}`}
              title={social.label}
            >
              {/* Increased icon size to h-6 w-6, applied iconColorClass */}
              <Icon className={`h-6 w-6 ${social.iconColorClass}`} />
              <span className="absolute right-14 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                {social.label}
              </span>
            </a>
          )
        })}
      </div>
    )
  }
}
