"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, Facebook, MessageSquare, Send, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast" // Assuming you have a useToast hook for notifications

export default function Footer() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast() // Initialize toast

  const services = [
    { name: "Business Setup", href: "/services/business/startup" },
    { name: "Visa Services", href: "/services/visa/short-term" },
    { name: "Tax & Accounting", href: "/services/tax/requirements" },
    { name: "HR Solutions", href: "/business-solution/hr-consulting" },
  ]
  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ]

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage("")

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage(data.message)
        toast({
          title: "Success!",
          description: data.message,
          variant: "default",
        })
        setEmail("") // Clear email input on success
      } else {
        setMessage(data.message || "An unexpected error occurred.")
        toast({
          title: "Error!",
          description: data.message || "Failed to subscribe.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Subscription error:", error)
      setMessage("Network error. Please try again.")
      toast({
        title: "Error!",
        description: "Network error. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <footer className="bg-white border-t border-gray-200">
      {/* Newsletter */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 py-8">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h3 className="text-2xl font-bold mb-3">Stay Updated with ABIC</h3>
            <p className="text-lg opacity-90 mb-6 max-w-xl mx-auto">
              Get the latest business insights, regulatory updates, and expert tips delivered to your inbox
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="bg-white/20 border-white/30 text-white placeholder-white h-10 text-sm backdrop-blur"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitting}
              />
              <Button
                type="submit"
                className="bg-white text-green-600 hover:bg-white-100 px-6 h-10 font-semibold text-sm"
                disabled={isSubmitting}
              >
                <Send className="mr-2 h-4 w-4" />
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
            {message && (
              <p className={`mt-3 text-sm ${message.includes("Success") ? "text-white" : "text-red-200"}`}>{message}</p>
            )}
            <p className="text-xs opacity-75 mt-3">Join 500+ business owners who trust our insights</p>
          </div>
        </div>
      </div>
      {/* Main Footer */}
      <div className="container mx-auto px-4 lg:px-6 py-10">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <Image src="/abic-logo.png" alt="ABIC Consultancy" width={120} height={40} className="object-contain" />
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Your trusted partner for business success in the Philippines since 2018. We provide comprehensive
              consulting services to help you achieve your business goals.
            </p>
            <div className="flex space-x-3">
              {[
                {
                  Icon: Facebook,
                  href: "https://www.facebook.com/people/Advance-Beyond-International-Consulting-Inc/100064218002344/?rdid=9l5ALMAI7iEncSMo&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1AMRDepebP%2F",
                },
                {
                  Icon: MessageSquare,
                  href: "https://wa.me/09155800518",
                },
                {
                  Icon: Phone,
                  href: "tel:+639155800518",
                },
                {
                  Icon: Mail,
                  href: "mailto:zoe@abicph.com",
                },
              ].map(({ Icon, href }, index) => (
                <a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-gray-100 hover:bg-gradient-to-r hover:from-green-500 hover:to-blue-500 rounded-md flex items-center justify-center transition-all"
                >
                  <Icon className="h-4 w-4 text-gray-600 hover:text-white" />
                </a>
              ))}
            </div>
          </div>
          {/* Services */}
          <div>
            <h3 className="text-base font-bold text-gray-900 mb-4">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <Link
                    href={service.href}
                    className="text-gray-600 hover:text-green-600 transition-colors text-sm flex items-center group no-underline"
                  >
                    <ArrowRight className="h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Quick Links */}
          <div>
            <h3 className="text-base font-bold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-green-600 transition-colors text-sm flex items-center group no-underline"
                  >
                    <ArrowRight className="h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Get In Touch */}
          <div>
            <h3 className="text-base font-bold text-gray-900 mb-4">Get In Touch</h3>
            <ul className="space-y-3">
              {/* Address */}
              <li>
                <a
                  href="https://maps.google.com/?q=Unit+402+Campos+Rueda+Building+Urban+Ave.+Makati+City"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center group text-sm no-underline"
                >
                  <ArrowRight className="h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-opacity text-green-600" />
                  <span className="flex flex-col text-left">
                    <span className="text-gray-900 font-semibold group-hover:text-green-600 transition-colors">
                      Office Address
                    </span>
                    <span className="text-gray-600 text-xs group-hover:text-green-600 transition-colors">
                      Unit 402 Campos Rueda Building Urban Ave. Makati City
                    </span>
                    <span className="text-gray-600 text-xs group-hover:text-green-600 transition-colors">
                      Business District Area
                    </span>
                  </span>
                </a>
              </li>
              <li className="text-sm">
                <div className="flex items-start group">
                  <ArrowRight className="h-3 w-3 mt-1 mr-1 opacity-0 group-hover:opacity-100 transition-opacity text-green-600" />
                  <div className="flex flex-col text-left">
                    <span className="text-gray-900 font-semibold group-hover:text-green-600 transition-colors">
                      Phone Numbers
                    </span>
                    <div>
                      <span className="text-gray-500 text-xs mr-1">Telephone:</span>
                      <a
                        href="tel:+63282405150"
                        className="text-gray-600 text-xs hover:text-green-600 transition-colors no-underline"
                      >
                        (02) 8240 5150
                      </a>
                    </div>
                    <div>
                      <span className="text-gray-500 text-xs mr-1">Mobile:</span>
                      <a
                        href="tel:+639155800518"
                        className="text-gray-600 text-xs hover:text-green-600 transition-colors no-underline"
                      >
                        +63 915 580 0518
                      </a>
                    </div>
                  </div>
                </div>
              </li>
              {/* Email */}
              <li>
                <a href="mailto:zoe@abicph.com" className="flex items-center group text-sm no-underline">
                  <ArrowRight className="h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-opacity text-green-600" />
                  <span className="flex flex-col text-left">
                    <span className="text-gray-900 font-semibold group-hover:text-green-600 transition-colors">
                      Email Address
                    </span>
                    <span className="text-gray-600 text-xs group-hover:text-green-600 transition-colors">
                      zoe@abicph.com
                    </span>
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="border-t border-gray-200 bg-gray-50 py-4">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            <p className="text-gray-600 text-xs">
              &copy; {new Date().getFullYear()} Advanced Beyond International Consulting Inc. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                href="/privacy-policy"
                className="text-gray-600 hover:text-green-600 transition-colors text-xs no-underline"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-of-service"
                className="text-gray-600 hover:text-green-600 transition-colors text-xs no-underline"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
