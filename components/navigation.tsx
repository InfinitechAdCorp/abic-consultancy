"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown, Menu, X } from 'lucide-react'
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
    ]
  },
  {
    title: "Visa",
    items: [
      { name: "Short Term Visa", href: "/services/visa/short-term" },
      { name: "Long Term Visa", href: "/services/visa/long-term" },
      { name: "International Visa", href: "/services/visa/international" },
    ]
  },
  {
    title: "Tax & Accounting / Payroll",
    items: [
      { name: "Tax Requirements", href: "/services/tax/requirements" },
      { name: "Mandatory Taxes", href: "/services/tax/mandatory" },
    ]
  }
]

const newsUpdatesItems = [
  { name: "Events", href: "/events" },
  { name: "Announcements", href: "/announcements" },
]

return (
  <header className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
    <div className="container mx-auto px-6 lg:px-8">
      <div className="flex h-20 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-2">
          <Image
            src="/images/abic-logo.png"
            alt="ABIC Consultancy"
            width={140}
            height={56}
            className="object-contain"
          />
        </Link>
        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList className="space-x-2">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/"
                  className="group inline-flex h-12 w-max items-center justify-center rounded-lg bg-background px-6 py-3 text-base font-medium transition-all hover:bg-gray-50 hover:text-green-600 focus:bg-gray-50 focus:text-green-600 focus:outline-none"
                >
                  Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/about"
                  className="group inline-flex h-12 w-max items-center justify-center rounded-lg bg-background px-6 py-3 text-base font-medium transition-all hover:bg-gray-50 hover:text-green-600 focus:bg-gray-50 focus:text-green-600 focus:outline-none"
                >
                  About Us
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="h-12 px-6 py-3 text-base font-medium">Services</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[700px] grid-cols-3 gap-6 p-8">
                  {servicesItems.map((category) => (
                    <div key={category.title} className="space-y-4">
                      <h4 className="text-base font-semibold leading-none bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                        {category.title}
                      </h4>
                      <div className="space-y-2">
                        {category.items.map((item) => (
                          <NavigationMenuLink key={item.name} asChild>
                            <Link
                              href={item.href}
                              className="block select-none space-y-1 rounded-lg p-4 leading-none no-underline outline-none transition-colors hover:bg-gray-50 hover:text-green-600 focus:bg-gray-50 focus:text-green-600"
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
              <NavigationMenuTrigger className="h-12 px-6 py-3 text-base font-medium">Business Solution</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[500px] p-8">
                  <NavigationMenuLink asChild>
                    <Link
                      href="/business-solution/hr-consulting"
                      className="group grid h-auto w-full items-center justify-start gap-2 rounded-lg bg-background p-6 text-base font-medium transition-colors hover:bg-gray-50 hover:text-green-600 focus:bg-gray-50 focus:text-green-600 focus:outline-none"
                    >
                      <div className="text-base font-semibold leading-none group-hover:underline">HR Consulting</div>
                      <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Professional HR consulting services for your business needs
                      </div>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/business-solution/hr-outsourcing"
                      className="group grid h-auto w-full items-center justify-start gap-2 rounded-lg bg-background p-6 text-base font-medium transition-colors hover:bg-gray-50 hover:text-green-600 focus:bg-gray-50 focus:text-green-600 focus:outline-none"
                    >
                      <div className="text-base font-semibold leading-none group-hover:underline">HR Outsourcing</div>
                      <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
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
                  className="group inline-flex h-12 w-max items-center justify-center rounded-lg bg-background px-6 py-3 text-base font-medium transition-all hover:bg-gray-50 hover:text-green-600 focus:bg-gray-50 focus:text-green-600 focus:outline-none"
                >
                  Blog
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            {/* New News & Updates Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="h-12 px-6 py-3 text-base font-medium">News & Updates</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[200px] p-4"> {/* New div wrapper for correct positioning */}
                  <ul className="flex flex-col gap-3"> {/* Simplified ul classes */}
                    {newsUpdatesItems.map((item) => (
                      <li key={item.name}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
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
              <NavigationMenuLink asChild>
                <Link
                  href="/contact"
                  className="group inline-flex h-12 w-max items-center justify-center rounded-lg bg-background px-6 py-3 text-base font-medium transition-all hover:bg-gray-50 hover:text-green-600 focus:bg-gray-50 focus:text-green-600 focus:outline-none"
                >
                  Contact Us
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center space-x-4">
          <LanguageSelector />
          <Button size="lg" className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-3 text-base font-semibold">
            Get Started
          </Button>
        </div>
        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden h-12 w-12">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[350px] sm:w-[450px]">
            <VisuallyHidden>
              <SheetTitle>Navigation Menu</SheetTitle>
            </VisuallyHidden>
            <div className="flex flex-col space-y-6 mt-8">
              <div className="flex items-center justify-center">
                <Image
                  src="/images/abic-logo.png"
                  alt="ABIC Consultancy"
                  width={120}
                  height={48}
                  className="object-contain"
                />
              </div>
              <nav className="flex flex-col space-y-4">
                <Link
                  href="/"
                  className="flex items-center py-3 text-lg font-semibold hover:text-green-600 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className="flex items-center py-3 text-lg font-semibold hover:text-green-600 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  About Us
                </Link>
                <Collapsible className="space-y-3">
                  <CollapsibleTrigger className="flex w-full items-center justify-between py-3 text-lg font-semibold hover:text-green-600 transition-colors">
                    Services
                    <ChevronDown className="h-5 w-5" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-3 pl-4">
                    {servicesItems.map((category) => (
                      <Collapsible key={category.title} className="space-y-2">
                        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-base font-medium text-muted-foreground hover:text-green-600 transition-colors">
                          {category.title}
                          <ChevronDown className="h-4 w-4" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="space-y-2 pl-4">
                          {category.items.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className="block py-2 text-sm text-muted-foreground hover:text-green-600 transition-colors"
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
                <Collapsible className="space-y-3">
                  <CollapsibleTrigger className="flex w-full items-center justify-between py-3 text-lg font-semibold hover:text-green-600 transition-colors">
                    Business Solution
                    <ChevronDown className="h-5 w-5" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-2 pl-4">
                    <Link
                      href="/business-solution/hr-consulting"
                      className="block py-2 text-base text-muted-foreground hover:text-green-600 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      HR Consulting
                    </Link>
                    <Link
                      href="/business-solution/hr-outsourcing"
                      className="block py-2 text-base text-muted-foreground hover:text-green-600 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      HR Outsourcing
                    </Link>
                  </CollapsibleContent>
                </Collapsible>
                <Link
                  href="/blog"
                  className="flex items-center py-3 text-lg font-semibold hover:text-green-600 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Blog
                </Link>
                {/* New News & Updates Collapsible for Mobile */}
                <Collapsible className="space-y-3">
                  <CollapsibleTrigger className="flex w-full items-center justify-between py-3 text-lg font-semibold hover:text-green-600 transition-colors">
                    News & Updates
                    <ChevronDown className="h-5 w-5" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-2 pl-4">
                    {newsUpdatesItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block py-2 text-base text-muted-foreground hover:text-green-600 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
                <Link
                  href="/contact"
                  className="flex items-center py-3 text-lg font-semibold hover:text-green-600 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Contact Us
                </Link>
              </nav>
              {/* Mobile Language Selector */}
              <div className="pt-4 border-t border-gray-200">
                <LanguageSelector />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  </header>
)
}
