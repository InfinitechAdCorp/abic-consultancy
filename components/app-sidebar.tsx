"use client"
import { Home, Building2, FileText, Award, RotateCcw, XCircle, Plane, Clock, Globe, Calculator, Receipt, TrendingUp, Settings, HelpCircle, LogOut, User, Bell, ChevronRight, MessageSquare, Search, Loader2, RefreshCw } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarInput,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, Calendar, Star, Megaphone  } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

// Business Solution items
const businessSolutionItems = [
  {
    title: "Start-Up",
    url: "/admin/business-services/startup",
    icon: Building2,
    badge: "New",
  },
  {
    title: "Amendment",
    url: "/business/amendment",
    icon: FileText,
  },
  {
    title: "Special License & Permit",
    url: "/business/license-permit",
    icon: Award,
    badge: "3",
  },
  {
    title: "Business Renewal",
    url: "/business/renewal",
    icon: RotateCcw,
  },
  {
    title: "Business Closure",
    url: "/business/closure",
    icon: XCircle,
  },
]

// Visa service items
const visaServiceItems = [
  {
    title: "Short Term Visa",
    url: "/visa/short-term",
    icon: Clock,
  },
  {
    title: "Long Term Visa",
    url: "/visa/long-term",
    icon: Plane,
    badge: "Popular",
  },
  {
    title: "International Visa",
    url: "/visa/international",
    icon: Globe,
  },
]

// Tax & Accounting items
const taxAccountingItems = [
  {
    title: "Tax Requirements",
    url: "/tax/requirements",
    icon: Receipt,
  },
  {
    title: "Mandatory Taxes",
    url: "/tax/mandatory",
    icon: Calculator,
    badge: "Due",
  },
  {
    title: "Payroll Services",
    url: "/tax/payroll",
    icon: TrendingUp,
  },
]

// System items
const systemItems = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: Home,
  },
  {
    title: "Consultations",
    url: "/admin/consultations",
    icon: MessageSquare,
  },
  {
    title: "Chat Support",
    url: "/admin/chat", // Corrected URL to match your page.tsx
    icon: MessageSquare,
  },
  {
    title: "Testimonials",
    url: "/admin/testimonials",
    icon: Star,
  },
  {
    title: "Events",
    url: "/admin/events",
    icon: Calendar,
  },
    {
    title: "Announcements",
    url: "/admin/announcements",
    icon: Megaphone ,
  },
];

export function AppSidebar() {
  const pathname = usePathname()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [collapsedSections, setCollapsedSections] = useState({
    business: true,
    visa: true,
    tax: true,
  })

  const toggleSection = (section: string) => {
    setCollapsedSections(prev => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev]
    }))
  }

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (response.ok) {
        localStorage.clear()
        sessionStorage.clear()
        window.location.href = "/login"
      } else {
        throw new Error("Logout failed")
      }
    } catch (error) {
      console.error("Logout error:", error)
      setIsLoggingOut(false)
    }
  }

  const renderMenuItem = (item: any) => (
    <SidebarMenuItem key={item.title}>
      <SidebarMenuButton
        asChild
        isActive={pathname === item.url}
        className="group relative w-full justify-start px-3 py-2 rounded-lg transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-green-50 hover:shadow-sm data-[active=true]:bg-gradient-to-r data-[active=true]:from-blue-100 data-[active=true]:to-green-100 data-[active=true]:shadow-md"
      >
        <Link href={item.url} className="flex items-center gap-3 w-full">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/10 to-green-500/10 group-hover:from-blue-500/20 group-hover:to-green-500/20 transition-all duration-200">
            <item.icon className="h-3.5 w-3.5 text-blue-600 group-hover:text-blue-700 transition-colors" />
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900 group-hover:text-gray-800 transition-colors">
                {item.title}
              </span>
              {item.badge && (
                <Badge
                  variant={item.badge === "New" ? "default" : item.badge === "Due" ? "destructive" : "secondary"}
                  className="text-xs px-1.5 py-0.5 ml-2"
                >
                  {item.badge}
                </Badge>
              )}
            </div>
          </div>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )

  return (
    <Sidebar className="bg-gradient-to-b from-blue-50/50 to-green-50/50 backdrop-blur-sm border-r shadow-lg">
      <SidebarHeader className="border-b border-gray-100 p-4 bg-gradient-to-r from-blue-50 to-green-50">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-green-500 shadow-lg">
            <Building2 className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-base font-bold text-gray-900">ABIC Consultancy</span>
            <span className="text-sm text-gray-600">Services Portal</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-3">
        <div className="space-y-4">
          {/* System Navigation */}
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs font-bold text-gray-700 uppercase tracking-wider px-2 mb-2 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              Navigation
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {systemItems.map(renderMenuItem)}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Business Solutions Section */}
          <Collapsible open={!collapsedSections.business} onOpenChange={() => toggleSection('business')}>
            <SidebarGroup>
              <CollapsibleTrigger asChild>
                <SidebarGroupLabel className="text-xs font-bold text-gray-700 uppercase tracking-wider px-2 mb-2 flex items-center gap-2 cursor-pointer hover:text-gray-900 transition-colors">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  Business Solutions
                  <ChevronDown className={`h-3 w-3 ml-auto transition-transform duration-200 ${!collapsedSections.business ? 'rotate-180' : ''}`} />
                </SidebarGroupLabel>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu className="space-y-1">
                    {businessSolutionItems.map(renderMenuItem)}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>

          {/* Visa Services Section */}
          <Collapsible open={!collapsedSections.visa} onOpenChange={() => toggleSection('visa')}>
            <SidebarGroup>
              <CollapsibleTrigger asChild>
                <SidebarGroupLabel className="text-xs font-bold text-gray-700 uppercase tracking-wider px-2 mb-2 flex items-center gap-2 cursor-pointer hover:text-gray-900 transition-colors">
                  <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                  Visa Services
                  <ChevronDown className={`h-3 w-3 ml-auto transition-transform duration-200 ${!collapsedSections.visa ? 'rotate-180' : ''}`} />
                </SidebarGroupLabel>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu className="space-y-1">
                    {visaServiceItems.map(renderMenuItem)}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>

          {/* Tax & Accounting Section */}
          <Collapsible open={!collapsedSections.tax} onOpenChange={() => toggleSection('tax')}>
            <SidebarGroup>
              <CollapsibleTrigger asChild>
                <SidebarGroupLabel className="text-xs font-bold text-gray-700 uppercase tracking-wider px-2 mb-2 flex items-center gap-2 cursor-pointer hover:text-gray-900 transition-colors">
                  <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                  Tax & Accounting
                  <ChevronDown className={`h-3 w-3 ml-auto transition-transform duration-200 ${!collapsedSections.tax ? 'rotate-180' : ''}`} />
                </SidebarGroupLabel>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu className="space-y-1">
                    {taxAccountingItems.map(renderMenuItem)}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        </div>
      </SidebarContent>
      <SidebarFooter className="border-t border-gray-100 p-3 bg-gray-50/50">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="group w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-lg transition-all duration-200 hover:shadow-sm"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-50 group-hover:bg-red-100 transition-colors">
                <LogOut className="h-3.5 w-3.5" />
              </div>
              <span className="text-sm font-medium ml-3">
                {isLoggingOut ? "Logging out..." : "Logout"}
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
