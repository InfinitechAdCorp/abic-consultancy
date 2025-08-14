"use client"

import { Building2, Globe, CreditCard, Users, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function ServicesOverview() {
  const [activeSlide, setActiveSlide] = useState(0)

  const serviceCategories = [
    {
      icon: Building2,
      title: "Business Solutions",
      description:
        "Complete business setup, amendments, licensing, and closure services for all business types in the Philippines",
      services: [
        {
          name: "Start-Up Registration",
          href: "/services/business/startup",
          description: "Complete business registration and setup",
        },
        {
          name: "Business Amendment",
          href: "/services/business/amendment",
          description: "Modify existing business structure",
        },
        {
          name: "Special License & Permit",
          href: "/services/business/license",
          description: "Specialized permits and licensing",
        },
        { name: "Business Renewal", href: "/services/business/renewal", description: "Annual business renewals" },
        {
          name: "Business Closure",
          href: "/services/business/closure",
          description: "Proper business closure procedures",
        },
      ],
      color: "violet",
      gradient: "from-violet-600 to-purple-700",
      bgGradient: "from-violet-50 to-purple-50",
      hoverGradient: "from-violet-500 to-purple-600",
    },
    {
      icon: Globe,
      title: "Visa Services",
      description:
        "Professional visa processing for all types of travel and business immigration needs with expert guidance",
      services: [
        { name: "Short Term Visa", href: "/services/visa/short-term", description: "Tourist and business visas" },
        { name: "Long Term Visa", href: "/services/visa/long-term", description: "Extended stay and work visas" },
        {
          name: "International Visa",
          href: "/services/visa/international",
          description: "Global visa processing services",
        },
      ],
      color: "blue",
      gradient: "from-blue-600 to-indigo-700",
      bgGradient: "from-blue-50 to-indigo-50",
      hoverGradient: "from-blue-500 to-indigo-600",
    },
    {
      icon: CreditCard,
      title: "Tax & Accounting",
      description: "Expert tax planning, compliance, and comprehensive payroll management services for businesses",
      services: [
        {
          name: "Tax Requirements",
          href: "/services/tax/requirements",
          description: "Complete tax compliance solutions",
        },
        { name: "Mandatory Taxes", href: "/services/tax/mandatory", description: "Required tax filings and payments" },
      ],
      color: "emerald",
      gradient: "from-emerald-600 to-teal-700",
      bgGradient: "from-emerald-50 to-teal-50",
      hoverGradient: "from-emerald-500 to-teal-600",
    },
    {
      icon: Users,
      title: "HR Solutions",
      description: "Comprehensive human resource consulting and complete outsourcing solutions for modern businesses",
      services: [
        {
          name: "HR Consulting",
          href: "/business-solution/hr-consulting",
          description: "Strategic HR advisory services",
        },
        {
          name: "HR Outsourcing",
          href: "/business-solution/hr-outsourcing",
          description: "Complete HR management solutions",
        },
      ],
      color: "orange",
      gradient: "from-orange-600 to-red-700",
      bgGradient: "from-orange-50 to-red-50",
      hoverGradient: "from-orange-500 to-red-600",
    },
  ]

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % serviceCategories.length)
  }

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + serviceCategories.length) % serviceCategories.length)
  }

  useEffect(() => {
    const isMobile = window.innerWidth < 768
    if (!isMobile) return

    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % serviceCategories.length)
    }, 4000) // Auto-slide every 4 seconds on mobile

    return () => clearInterval(interval)
  }, [serviceCategories.length])

  const currentCategory = serviceCategories[activeSlide]
  const Icon = currentCategory.icon

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-hidden">
      <div className="absolute inset-0 opacity-5 bg-[url('/images/subtle-pattern.png')] bg-repeat animate-pulse-subtle"></div>

      <div className="relative z-10">
        <section className="py-12 px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl text-center">
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">Explore our Services</h1>
            <p className="text-base text-slate-600 max-w-2xl mx-auto">
              Professional business solutions tailored to your needs
            </p>
          </div>
        </section>

        <section className="py-6 px-6 lg:px-8">
          <div className="container mx-auto max-w-5xl">
            <div className="relative mb-8" style={{ perspective: "1000px" }}>
              <Card
                className="group relative overflow-hidden border-0 shadow-xl bg-white hover:shadow-2xl transition-all duration-500 transform hover:rotateY-2 hover:rotateX-1 hover:scale-105 max-w-4xl mx-auto"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className={`h-2 bg-gradient-to-r ${currentCategory.gradient}`}></div>

                <CardHeader className="relative z-10 p-6 lg:p-8">
                  <div className="flex flex-col lg:flex-row items-start gap-4">
                    <div
                      className={`w-16 h-16 lg:w-18 lg:h-18 rounded-2xl bg-gradient-to-r ${currentCategory.gradient} flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotateY-12 transition-all duration-500`}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <Icon className="h-8 w-8 lg:h-9 lg:w-9 text-white" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-2xl lg:text-3xl font-bold text-slate-900 mb-3">
                        {currentCategory.title}
                      </CardTitle>
                      <CardDescription className="text-base text-slate-600 leading-relaxed">
                        {currentCategory.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="relative z-10 px-6 lg:px-8 pb-6 lg:pb-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-6">
                    {currentCategory.services.map((service, serviceIndex) => (
                      <Link
                        key={serviceIndex}
                        href={service.href}
                        className="block p-4 rounded-xl bg-white/90 hover:bg-white border border-slate-200/50 hover:border-slate-300 transition-all duration-300 group/service hover:shadow-md transform hover:scale-105 hover:rotateX-2 hover:translateZ-2"
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-slate-900 text-base mb-1 group-hover/service:text-violet-700 transition-colors">
                              {service.name}
                            </h4>
                            <p className="text-sm text-slate-600">{service.description}</p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-slate-400 group-hover/service:text-violet-600 group-hover/service:translate-x-1 transition-all duration-300 ml-3 flex-shrink-0" />
                        </div>
                      </Link>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                    <Badge variant="secondary" className="bg-slate-100 text-slate-700 text-sm px-3 py-1">
                      {currentCategory.services.length} Services
                    </Badge>
                    <Button
                      asChild
                      size="sm"
                      className={`bg-gradient-to-r ${currentCategory.gradient} hover:shadow-lg transition-all duration-300 text-white border-0 px-6 py-2 transform hover:scale-105 hover:rotateX-3`}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                     
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/95 hover:bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 items-center justify-center group z-50 transform hover:scale-110 hover:rotateY-12 hidden md:flex"
                style={{ transformStyle: "preserve-3d" }}
              >
                <ChevronLeft className="h-5 w-5 text-slate-600 group-hover:text-slate-900 transition-colors" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/95 hover:bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 items-center justify-center group z-50 transform hover:scale-110 hover:rotateY-12 hidden md:flex"
                style={{ transformStyle: "preserve-3d" }}
              >
                <ChevronRight className="h-5 w-5 text-slate-600 group-hover:text-slate-900 transition-colors" />
              </button>
            </div>

            <div className="flex justify-center gap-2 mb-6">
              {serviceCategories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 transform hover:scale-125 ${
                    index === activeSlide
                      ? `bg-gradient-to-r ${currentCategory.gradient} shadow-md scale-125`
                      : "bg-slate-300 hover:bg-slate-400"
                  }`}
                  style={{ transformStyle: "preserve-3d" }}
                />
              ))}
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3" style={{ perspective: "800px" }}>
              {serviceCategories.map((category, index) => {
                if (index === activeSlide) return null
                const PreviewIcon = category.icon
                return (
                  <button
                    key={index}
                    onClick={() => setActiveSlide(index)}
                    className="group p-3 bg-white rounded-lg border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-300 text-left transform hover:scale-105 hover:rotateY-5 hover:rotateX-2"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className={`w-6 h-6 rounded-md bg-gradient-to-r ${category.gradient} flex items-center justify-center transform group-hover:rotateY-12 transition-all duration-300`}
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        <PreviewIcon className="h-3 w-3 text-white" />
                      </div>
                      <h4 className="font-semibold text-slate-900 text-sm group-hover:text-violet-700 transition-colors">
                        {category.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-2">{category.description}</p>
                  </button>
                )
              })}
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        @keyframes pulse-subtle {
          0%, 100% { opacity: 0.05; }
          50% { opacity: 0.08; }
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 10s infinite ease-in-out alternate;
        }
      `}</style>
    </div>
  )
}
