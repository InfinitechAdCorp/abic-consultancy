"use client"

import { ArrowRight, CheckCircle, Star, Building2, Globe, CreditCard, HeadphonesIcon, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

// Updated visa badges with more engaging customer-focused language
const visaDestinations = [
  {
    id: 1,
    name: "China Visa",
    imagePath: "/images/great-wall-china.png",
    slug: "china-visa",
    badge: "As Fast As 7 Days",
  },
  {
    id: 2,
    name: "Tourist Thailand Visa",
    imagePath: "/images/tourist-thailand-visa.png",
    slug: "tourist-thailand-visa",
    badge: "Same Day Rush!",
  },
  {
    id: 3,
    name: "Destination Thailand Visa",
    imagePath: "/images/destination_thailand.png",
    slug: "destination-thailand-visa",
    badge: "Express 3 Days!",
  },
  {
    id: 4,
    name: "Italy Visa",
    imagePath: "/images/italy-visa.png",
    slug: "italy-visa",
    badge: "As Fast As 14 Days",
  },
  {
    id: 5,
    name: "Hong Kong Visa",
    imagePath: "/images/hong-kong-visa.png",
    slug: "hong-kong-visa",
    badge: "Lightning 5 Days",
  },
  {
    id: 6,
    name: "Saudi Visa",
    imagePath: "/images/saudi-visa.png",
    slug: "saudi-visa",
    badge: "As Fast As 10 Days",
  },
  {
    id: 7,
    name: "Korea Visa",
    imagePath: "/images/korea-visa.png",
    slug: "korea-visa",
    badge: "Super Express 7 Days",
  },
  {
    id: 8,
    name: "Schengen Visa",
    imagePath: "/images/schengen.png",
    slug: "schengen-visa",
    badge: "Ready in 15 Days",
  },
  {
    id: 9,
    name: "Japan Visa",
    imagePath: "/images/japan-visa.png",
    slug: "japan-visa",
    badge: "Ultra Rush 5 Days!",
  },
  {
    id: 10,
    name: "Canada Visa",
    imagePath: "/images/canada-visa.png",
    slug: "canada-visa",
    badge: "Guaranteed 21 Days",
  },
  {
    id: 11,
    name: "USA Visa",
    imagePath: "/images/usa-visa.png",
    slug: "usa-visa",
    badge: "VIP Premium Service",
  },
]

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  const visaSlides = isMobile
    ? [
        visaDestinations.slice(0, 6), // First 6 visas for mobile
        visaDestinations.slice(6), // Remaining 5 visas for mobile
      ]
    : [
        visaDestinations.slice(0, 9), // First 9 visas for desktop
        visaDestinations.slice(9), // Remaining 2 visas for desktop
      ]

  useEffect(() => {
    setIsVisible(true)

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024) // lg breakpoint
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Added carousel navigation functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % visaSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + visaSlides.length) % visaSlides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-green-50 to-blue-50 py-8 lg:py-12">
      <Image
        src="/images/philippine-flag.png"
        alt="Philippine Flag Background"
        fill
        quality={100}
        sizes="100vw"
        style={{
          objectFit: "cover",
          zIndex: 9,
          opacity: 0.2,
        }}
      />
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
      <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-green-400/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div className="absolute top-32 left-1/4 animate-bounce" style={{ animationDelay: "0.5s" }}>
        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center opacity-30">
          <Building2 className="h-6 w-6 text-white" />
        </div>
      </div>
      <div className="absolute top-48 right-1/3 animate-bounce" style={{ animationDelay: "1.5s" }}>
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center opacity-30">
          <Globe className="h-5 w-5 text-white" />
        </div>
      </div>
      <div className="absolute bottom-32 right-1/4 animate-bounce" style={{ animationDelay: "2s" }}>
        <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-400 rounded-lg flex items-center justify-center opacity-30">
          <CreditCard className="h-4 w-4 text-white" />
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-start mb-12">
          <div
            className={`space-y-6 transition-all duration-1000 ${
              isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
            }`}
          >
            <div>
              <div className="inline-flex items-center rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-700 animate-fade-in">
                <Star className="mr-2 h-4 w-4 fill-current animate-spin" style={{ animationDuration: "3s" }} />
                #1 Trusted Business Consultancy in Philippines
              </div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-4xl lg:text-4xl leading-tight mt-1">
                <span className="inline-block animate-fade-in-up">Your Gateway to Business Success</span>
                <span
                  className="block bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mt-1 animate-fade-in-up"
                  style={{ animationDelay: "0.2s" }}
                >
                  in the Philippines
                </span>
              </h1>
              <p
                className={`text-lg text-gray-600 max-w-[600px] leading-relaxed transition-all duration-1000 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
                }`}
                style={{ transitionDelay: "0.6s" }}
              >
                ABIC Consultancy provides comprehensive business solutions, visa services, tax consulting, and HR
                outsourcing to help foreign entrepreneurs and investors establish and grow their businesses in the
                Philippines.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="flex items-center mb-2">
                    <Building2 className="h-5 w-5 text-green-600 mr-2" />
                    <h3 className="font-semibold text-gray-900">Business Setup</h3>
                  </div>
                  <p className="text-sm text-gray-600">Complete business registration, permits, and compliance setup</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="flex items-center mb-2">
                    <Globe className="h-5 w-5 text-blue-600 mr-2" />
                    <h3 className="font-semibold text-gray-900">Visa Services</h3>
                  </div>
                  <p className="text-sm text-gray-600">International visa processing and immigration support</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="flex items-center mb-2">
                    <CreditCard className="h-5 w-5 text-green-600 mr-2" />
                    <h3 className="font-semibold text-gray-900">Tax Consulting</h3>
                  </div>
                  <p className="text-sm text-gray-600">Expert tax planning and compliance management</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="flex items-center mb-2">
                    <HeadphonesIcon className="h-5 w-5 text-blue-600 mr-2" />
                    <h3 className="font-semibold text-gray-900">HR Outsourcing</h3>
                  </div>
                  <p className="text-sm text-gray-600">Complete HR solutions and payroll management</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mt-6">
                <div className="flex items-center bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Free Consultation
                </div>
                <div className="flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Expert Guidance
                </div>
                <div className="flex items-center bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Fast Processing
                </div>
                <div className="flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  24/7 Support
                </div>
              </div>
            </div>

            <div
              className={`mt-6 p-5 bg-white/20 backdrop-blur-xl rounded-xl shadow-xl border border-white/10 transition-all duration-1000 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
              }`}
              style={{ transitionDelay: "0.8s" }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 leading-tight">
                Launch your Business in the Philippines <br className="hidden sm:inline" /> as Fast as{" "}
                <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  1 Month
                </span>
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                Ready to get started? Schedule a free consultation with our experts.
              </p>
              <Link href="/consultation">
                <Button className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-500 text-white px-8 py-3 text-base font-semibold transform hover:scale-105 transition-all duration-300 hover:shadow-lg">
                  Schedule A Consultation
                  <ArrowRight className="ml-2 h-4 w-4 animate-pulse" />
                </Button>
              </Link>
            </div>
          </div>

          {/*  Conditional rendering: desktop grid vs mobile carousel */}
          <div
            className={`relative transition-all duration-1000 ${
              isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
            }`}
            style={{ transitionDelay: "0.4s" }}
          >
            {/* Desktop: Show all visas in grid layout */}
            {!isMobile ? (
              <div className="grid grid-cols-3 gap-4">
                {visaDestinations.map((visa) => (
                  <div
                    key={visa.id}
                    className="transform hover:scale-105 transition-all duration-500 w-full max-w-none"
                  >
                    <Card className="shadow-lg hover:shadow-2xl bg-white rounded-xl overflow-hidden border border-gray-200 p-0 flex flex-col relative h-full">
                      <Badge className="absolute top-3 right-3 z-10 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-lg animate-pulse hover:animate-none transition-all duration-300">
                        {visa.badge}
                      </Badge>

                      <Link
                        href={`/services/visa/international/${visa.slug}`}
                        passHref
                        className="flex flex-col h-full"
                      >
                        <div className="relative w-full h-[120px] overflow-hidden">
                          <Image
                            src={visa.imagePath || "/placeholder.svg"}
                            alt={visa.name}
                            fill
                            sizes="(max-width: 768px) 33vw, (max-width: 1024px) 33vw, 33vw"
                            style={{ objectFit: "cover" }}
                            className="transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                        <CardContent className="px-4 py-3 text-center flex items-center justify-center h-[50px]">
                          <h3 className="font-bold text-sm text-gray-900 line-clamp-2">{visa.name}</h3>
                        </CardContent>
                      </Link>
                    </Card>
                  </div>
                ))}
              </div>
            ) : (
              /* Mobile: Keep existing carousel */
              <>
                {/* Carousel container */}
                <div className="relative overflow-hidden rounded-xl">
                  <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  >
                    {visaSlides.map((slideVisas, slideIndex) => (
                      <div key={slideIndex} className="w-full flex-shrink-0">
                        <div
                          className={`grid gap-4 ${
                            slideIndex === 1
                              ? "grid-cols-2 justify-items-center max-h-[120px] sm:max-h-[200px]"
                              : "grid-cols-2 lg:grid-cols-3"
                          }`}
                          style={{
                            minHeight: slideIndex === 1 ? "auto" : undefined,
                          }}
                        >
                          {slideVisas.map((visa, index) => (
                            <div
                              key={visa.id}
                              className="transform hover:scale-105 transition-all duration-500 w-full max-w-none"
                            >
                              <Card className="shadow-lg hover:shadow-2xl bg-white rounded-xl overflow-hidden border border-gray-200 p-0 flex flex-col relative h-full">
                                <Badge className="absolute top-3 right-3 z-10 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-lg animate-pulse hover:animate-none transition-all duration-300">
                                  {visa.badge}
                                </Badge>

                                <Link
                                  href={`/services/visa/international/${visa.slug}`}
                                  passHref
                                  className="flex flex-col h-full"
                                >
                                  <div className="relative w-full h-[120px] overflow-hidden">
                                    <Image
                                      src={visa.imagePath || "/placeholder.svg"}
                                      alt={visa.name}
                                      fill
                                      sizes="(max-width: 768px) 33vw, (max-width: 1024px) 33vw, 33vw"
                                      style={{ objectFit: "cover" }}
                                      className="transition-transform duration-300 group-hover:scale-110"
                                    />
                                  </div>
                                  <CardContent className="px-4 py-3 text-center flex items-center justify-center h-[50px]">
                                    <h3 className="font-bold text-sm text-gray-900 line-clamp-2">{visa.name}</h3>
                                  </CardContent>
                                </Link>
                              </Card>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  {/* Navigation arrows */}
                  <div className="flex gap-2">
                    <button
                      onClick={prevSlide}
                      className="p-2 rounded-full bg-white/80 hover:bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={currentSlide === 0}
                    >
                      <ChevronLeft className="h-5 w-5 text-gray-600" />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="p-2 rounded-full bg-white/80 hover:bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={currentSlide === visaSlides.length - 1}
                    >
                      <ChevronRight className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>

                  {/* Slide indicators */}
                  <div className="flex gap-2">
                    {visaSlides.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          currentSlide === index
                            ? "bg-gradient-to-r from-green-500 to-blue-500 scale-110"
                            : "bg-gray-300 hover:bg-gray-400"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Slide counter */}
                  <div className="text-sm text-gray-600 font-medium">
                    {currentSlide + 1} / {visaSlides.length}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
