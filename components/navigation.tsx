"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import LanguageSelector from "@/components/language-selector"
import InstallPrompt from "@/components/install-prompt"
import { ClientOnly } from "@/components/client-only" // Import the new ClientOnly component

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const servicesItems = [
    {
      title: "Business Solution",
      items: [
        { name: "Start-Up", href: "/services/business/startup" },
        { name: "Amendment", href: "/services/business/amendment" },
        { name: "Special License & Permit", href: "/services/business/license" },
        { name: "Business Renewal", href: "/services/business/renewal" },
        { name: "Business Closure", href: "/services/business/closure" },
      ],
    },
    {
      title: "Visa",
      items: [
        { name: "Short Term Visa", href: "/services/visa/short-term" },
        { name: "Long Term Visa", href: "/services/visa/long-term" },
        { name: "International Visa", href: "/services/visa/international" },
      ],
    },
    {
      title: "Tax & Accounting / Payroll",
      items: [
        { name: "Tax Requirements", href: "/services/tax/requirements" },
        { name: "Mandatory Taxes", href: "/services/tax/mandatory" },
      ],
    },
  ]

  const newsUpdatesItems = [
    { name: "Events", href: "/events" },
    { name: "Announcements", href: "/announcements" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-emerald-200/30 bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 backdrop-blur-xl shadow-lg shadow-emerald-500/5">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(16,185,129,0.15)_1px,transparent_0)] bg-[length:20px_20px]"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-cyan-500/5"></div>
      {/* Animated accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 opacity-60"></div>

      <div className="container mx-auto px-4 lg:px-6 relative">
        <div className="flex h-12 lg:h-14 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center transition-all duration-300 hover:scale-105 relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Image
              src="/images/abic-logo.png"
              alt="ABIC Consultancy"
              width={100}
              height={40}
              className="object-contain relative z-10"
            />
          </Link>

          {/* Desktop Navigation */}
          <ClientOnly>
            {" "}
            {/* Wrap NavigationMenu with ClientOnly */}
            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList className="space-x-1">
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/"
                      className="group inline-flex h-10 w-max items-center justify-center rounded-lg bg-white/60 px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-white/80 hover:text-emerald-600 hover:shadow-md hover:shadow-emerald-500/20 focus:bg-white/80 focus:text-emerald-600 focus:outline-none border border-white/40 hover:border-emerald-300 backdrop-blur-sm"
                    >
                      Home
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/about"
                      className="group inline-flex h-10 w-max items-center justify-center rounded-lg bg-white/60 px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-white/80 hover:text-emerald-600 hover:shadow-md hover:shadow-emerald-500/20 focus:bg-white/80 focus:text-emerald-600 focus:outline-none border border-white/40 hover:border-emerald-300 backdrop-blur-sm"
                    >
                      About Us
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                {/* News & Updates Dropdown for Desktop */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="h-10 px-4 py-2 text-sm font-medium text-gray-700 bg-white/60 border border-white/40 hover:bg-white/80 hover:text-emerald-600 hover:border-emerald-300 hover:shadow-md hover:shadow-emerald-500/20 transition-all backdrop-blur-sm">
                    News & Updates
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[200px] p-4 bg-white/95 backdrop-blur-xl border border-emerald-200 shadow-xl shadow-emerald-500/10 rounded-lg">
                      <ul className="flex flex-col gap-2">
                        {newsUpdatesItems.map((item) => (
                          <li key={item.name}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={item.href}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 focus:bg-emerald-50 focus:text-emerald-600"
                              >
                                <div className="text-sm font-medium leading-none">{item.name}</div>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="h-10 px-4 py-2 text-sm font-medium text-gray-700 bg-white/60 border border-white/40 hover:bg-white/80 hover:text-emerald-600 hover:border-emerald-300 hover:shadow-md hover:shadow-emerald-500/20 transition-all backdrop-blur-sm">
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[700px] grid-cols-3 gap-6 p-8 bg-white/95 backdrop-blur-xl border border-emerald-200 shadow-xl shadow-emerald-500/10 rounded-lg">
                      {servicesItems.map((category) => (
                        <div key={category.title} className="space-y-4">
                          <h4 className="text-sm font-semibold leading-none bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                            {category.title}
                          </h4>
                          <div className="space-y-2">
                            {category.items.map((item) => (
                              <NavigationMenuLink key={item.name} asChild>
                                <Link
                                  href={item.href}
                                  className="block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 focus:bg-emerald-50 focus:text-emerald-600"
                                >
                                  <div className="text-sm font-medium leading-none">{item.name}</div>
                                </Link>
                              </NavigationMenuLink>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="h-10 px-4 py-2 text-sm font-medium text-gray-700 bg-white/60 border border-white/40 hover:bg-white/80 hover:text-emerald-600 hover:border-emerald-300 hover:shadow-md hover:shadow-emerald-500/20 transition-all backdrop-blur-sm">
                    Business Solution
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[500px] p-8 bg-white/95 backdrop-blur-xl border border-emerald-200 shadow-xl shadow-emerald-500/10 rounded-lg">
                      <NavigationMenuLink asChild>
                        <Link
                          href="/business-solution/hr-consulting"
                          className="group grid h-auto w-full items-center justify-start gap-2 rounded-lg bg-emerald-50/50 p-6 text-sm font-medium transition-colors text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 focus:bg-emerald-50 focus:text-emerald-600 focus:outline-none border border-emerald-100 hover:border-emerald-200"
                        >
                          <div className="text-sm font-semibold leading-none group-hover:underline">HR Consulting</div>
                          <div className="line-clamp-2 text-xs leading-snug text-gray-500">
                            Professional HR consulting services for your business needs
                          </div>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/business-solution/hr-outsourcing"
                          className="group grid h-auto w-full items-center justify-start gap-2 rounded-lg bg-emerald-50/50 p-6 text-sm font-medium transition-colors text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 focus:bg-emerald-50 focus:text-emerald-600 focus:outline-none border border-emerald-100 hover:border-emerald-200"
                        >
                          <div className="text-sm font-semibold leading-none group-hover:underline">HR Outsourcing</div>
                          <div className="line-clamp-2 text-xs leading-snug text-gray-500">
                            Complete HR outsourcing solutions for streamlined operations
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/blog"
                      className="group inline-flex h-10 w-max items-center justify-center rounded-lg bg-white/60 px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-white/80 hover:text-emerald-600 hover:shadow-md hover:shadow-emerald-500/20 focus:bg-white/80 focus:text-emerald-600 focus:outline-none border border-white/40 hover:border-emerald-300 backdrop-blur-sm"
                    >
                      Blog
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/contact"
                      className="group inline-flex h-10 w-max items-center justify-center rounded-lg bg-white/60 px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-white/80 hover:text-emerald-600 hover:shadow-md hover:shadow-emerald-500/20 focus:bg-white/80 focus:text-emerald-600 focus:outline-none border border-white/40 hover:border-emerald-300 backdrop-blur-sm"
                    >
                      Contact Us
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </ClientOnly>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="bg-white/60 rounded-lg p-2 border border-white/40 backdrop-blur-sm">
              <LanguageSelector />
            </div>
            {/* PWA Install Prompt for Desktop */}
            <div className="bg-white/60 rounded-lg p-2 border border-white/40 backdrop-blur-sm">
              <InstallPrompt />
            </div>
          </div>

          {/* Mobile Navigation */}
          <ClientOnly>
            {" "}
            {/* Wrap Sheet with ClientOnly */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden h-8 w-8 text-gray-700 hover:bg-white/80 hover:text-emerald-600 border border-white/40 hover:border-emerald-300 transition-all backdrop-blur-sm"
                >
                  <Menu className="h-4 w-4" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[280px] bg-gradient-to-b from-emerald-50/95 to-teal-50/95 backdrop-blur-xl border-r border-emerald-200"
              >
                <VisuallyHidden>
                  <SheetTitle>Navigation Menu</SheetTitle>
                </VisuallyHidden>
                <div className="flex flex-col space-y-4 mt-4">
                  <div className="flex items-center justify-between pb-4 border-b border-emerald-200">
                    {" "}
                    {/* Changed to justify-between */}
                    <div className="bg-white/60 rounded-lg p-2 border border-emerald-200 backdrop-blur-sm">
                      <Image
                        src="/images/abic-logo.png"
                        alt="ABIC Consultancy"
                        width={80}
                        height={32}
                        className="object-contain"
                      />
                    </div>
                    {/* PWA Install Prompt for Mobile - moved here */}
                    <InstallPrompt />
                  </div>
                  <nav className="flex flex-col space-y-1">
                    <Link
                      href="/"
                      className="flex items-center py-2 px-3 text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors rounded-lg hover:bg-white/60 backdrop-blur-sm"
                      onClick={() => setIsOpen(false)}
                    >
                      Home
                    </Link>
                    <Link
                      href="/about"
                      className="flex items-center py-2 px-3 text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors rounded-lg hover:bg-white/60 backdrop-blur-sm"
                      onClick={() => setIsOpen(false)}
                    >
                      About Us
                    </Link>
                    {/* News & Updates Collapsible for Mobile */}
                    <Collapsible className="space-y-1">
                      <CollapsibleTrigger className="flex w-full items-center justify-between py-2 px-3 text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors rounded-lg hover:bg-white/60 backdrop-blur-sm">
                        News & Updates
                        <ChevronDown className="h-3 w-3" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="space-y-1 pl-4">
                        {newsUpdatesItems.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="block py-1.5 px-3 text-xs text-gray-600 hover:text-emerald-600 transition-colors rounded-lg hover:bg-white/40"
                            onClick={() => setIsOpen(false)}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                    <Collapsible className="space-y-1">
                      <CollapsibleTrigger className="flex w-full items-center justify-between py-2 px-3 text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors rounded-lg hover:bg-white/60 backdrop-blur-sm">
                        Services
                        <ChevronDown className="h-3 w-3" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="space-y-1 pl-4">
                        {servicesItems.map((category) => (
                          <Collapsible key={category.title} className="space-y-1">
                            <CollapsibleTrigger className="flex w-full items-center justify-between py-1.5 px-3 text-xs font-medium text-gray-600 hover:text-emerald-600 transition-colors rounded-lg hover:bg-white/40">
                              {category.title}
                              <ChevronDown className="h-2 w-2" />
                            </CollapsibleTrigger>
                            <CollapsibleContent className="space-y-1 pl-4">
                              {category.items.map((item) => (
                                <Link
                                  key={item.name}
                                  href={item.href}
                                  className="block py-1 px-3 text-xs text-gray-500 hover:text-emerald-600 transition-colors rounded-lg hover:bg-white/40"
                                  onClick={() => setIsOpen(false)}
                                >
                                  {item.name}
                                </Link>
                              ))}
                            </CollapsibleContent>
                          </Collapsible>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                    <Collapsible className="space-y-1">
                      <CollapsibleTrigger className="flex w-full items-center justify-between py-2 px-3 text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors rounded-lg hover:bg-white/60 backdrop-blur-sm">
                        Business Solution
                        <ChevronDown className="h-3 w-3" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="space-y-1 pl-4">
                        <Link
                          href="/business-solution/hr-consulting"
                          className="block py-1.5 px-3 text-xs text-gray-600 hover:text-emerald-600 transition-colors rounded-lg hover:bg-white/40"
                          onClick={() => setIsOpen(false)}
                        >
                          HR Consulting
                        </Link>
                        <Link
                          href="/business-solution/hr-outsourcing"
                          className="block py-1.5 px-3 text-xs text-gray-600 hover:text-emerald-600 transition-colors rounded-lg hover:bg-white/40"
                          onClick={() => setIsOpen(false)}
                        >
                          HR Outsourcing
                        </Link>
                      </CollapsibleContent>
                    </Collapsible>
                    <Link
                      href="/blog"
                      className="flex items-center py-2 px-3 text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors rounded-lg hover:bg-white/60 backdrop-blur-sm"
                      onClick={() => setIsOpen(false)}
                    >
                      Blog
                    </Link>
                    <Link
                      href="/contact"
                      className="flex items-center py-2 px-3 text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors rounded-lg hover:bg-white/60 backdrop-blur-sm"
                      onClick={() => setIsOpen(false)}
                    >
                      Contact Us
                    </Link>
                  </nav>
                  {/* Mobile Language Selector */}
                  <div className="pt-3 mt-auto border-t border-emerald-200">
                    <div className="bg-white/60 rounded-lg p-2 border border-emerald-200 backdrop-blur-sm">
                      <LanguageSelector />
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </ClientOnly>
        </div>
      </div>
    </header>
  )
}
