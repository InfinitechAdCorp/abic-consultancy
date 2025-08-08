"use client"
import { ArrowRight, CheckCircle, Star, Users, Award, Clock, Building2, Globe, CreditCard, HeadphonesIcon, TrendingUp } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { motion, type Transition } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

// Static data for international visas, as provided
const visaDestinations = [{ id: 1, name: "China Visa", imagePath: "/images/great-wall-china.png", slug: "china-visa" },{ id: 2, name: "Tourist Thailand Visa", imagePath: "/images/tourist-thailand-visa.png", slug: "tourist-thailand-visa" },{ id: 3, name: "Destination Thailand Visa", imagePath: "/images/destination_thailand.png", slug: "destination-thailand-visa" },{ id: 4, name: "Italy Visa", imagePath: "/images/italy-visa.png", slug: "italy-visa" },{ id: 5, name: "Hong Kong Visa", imagePath: "/images/hong-kong-visa.png", slug: "hong-kong-visa" },{ id: 6, name: "Saudi Visa", imagePath: "/images/saudi-visa.png", slug: "saudi-visa" }, // More descriptive placeholder
{ id: 7, name: "Korea Visa", imagePath: "/images/korea-visa.png", slug: "korea-visa" },{ id: 8, name: "Schengen Visa", imagePath: "/images/schengen.png", slug: "schengen-visa" }, // Using Eiffel Tower for Schengen as a placeholder
{ id: 9, name: "Japan Visa", imagePath: "/images/japan-visa.png", slug: "japan-visa" }, // More descriptive placeholder
{ id: 10, name: "Canada Visa", imagePath: "/images/canada-visa.png", slug: "canada-visa" }, // More descriptive placeholder
{ id: 11, name: "USA Visa", imagePath: "/images/usa-visa.png", slug: "usa-visa" }, // More descriptive placeholder
];

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentStat, setCurrentStat] = useState(0)
  const stats = [
    { number: "7+", label: "Years of Excellence", icon: Award },
    { number: "500+", label: "Successful Businesses", icon: Building2 },
    { number: "24/7", label: "Expert Support", icon: HeadphonesIcon },
    { number: "98%", label: "Success Rate", icon: TrendingUp },
  ]

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.42, 0, 0.58, 1] } as Transition,
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.42, 0, 0.58, 1],
        delay: 0.8,
      } as Transition,
    },
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
      <div
        className="absolute top-32 left-1/4 animate-bounce"
        style={{ animationDelay: "0.5s" }}
      >
        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center opacity-30">
          <Building2 className="h-6 w-6 text-white" />
        </div>
      </div>
      <div
        className="absolute top-48 right-1/3 animate-bounce"
        style={{ animationDelay: "1.5s" }}
      >
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center opacity-30">
          <Globe className="h-5 w-5 text-white" />
        </div>
      </div>
      <div
        className="absolute bottom-32 right-1/4 animate-bounce"
        style={{ animationDelay: "2s" }}
      >
        <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-400 rounded-lg flex items-center justify-center opacity-30">
          <CreditCard className="h-4 w-4 text-white" />
        </div>
      </div>
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div
            className={`space-y-8 transition-all duration-1000 ${
              isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
            }`}
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={textVariants}
              transition={{ delay: 0.1 }}
            >
              <div className="inline-flex items-center rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-700 animate-fade-in">
                <Star
                  className="mr-2 h-4 w-4 fill-current animate-spin"
                  style={{ animationDuration: "3s" }}
                />
                #1 Trusted Business Consultancy in Philippines
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl leading-tight mt-6">
                <span className="inline-block animate-fade-in-up">Your Gateway to</span>
                <span
                  className="block bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mt-2 animate-fade-in-up"
                  style={{ animationDelay: "0.2s" }}
                >
                  Business Success
                </span>
                <span
                  className="block text-gray-900 mt-2 animate-fade-in-up"
                  style={{ animationDelay: "0.4s" }}
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
                ABIC Consultancy provides comprehensive business solutions, visa services,
                tax consulting, and HR outsourcing to help foreign entrepreneurs and
                investors establish and grow their businesses in the Philippines.
              </p>
            </motion.div>
            {/* Transparent Launch Card */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              className={`mt-8 p-6 bg-white/20 backdrop-blur-xl rounded-xl shadow-xl border border-white/10 transition-all duration-1000 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
              }`}
              style={{ transitionDelay: "0.8s" }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 leading-tight">
                Launch your Business in the Philippines <br className="hidden sm:inline" /> as
                Fast as{" "}
                <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  1 Month
                </span>
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Ready to get started? Schedule a free consultation with our experts.
              </p>
              <Link href="/consultation">
                <Button className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-3 text-base font-semibold transform hover:scale-105 transition-all duration-300 hover:shadow-lg">
                  Schedule A Consultation
                  <ArrowRight className="ml-2 h-4 w-4 animate-pulse" />
                </Button>
              </Link>
            </motion.div>
            <div
              className={`grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-gray-200 transition-all duration-1000 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
              }`}
              style={{ transitionDelay: "1s" }}
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div
                    key={index}
                    className={`text-center transform transition-all duration-500 ${
                      currentStat === index ? "scale-110" : "scale-100"
                    }`}
                  >
                    <div className="flex items-center justify-center mb-2">
                      <Icon
                        className={`h-5 w-5 mr-2 transition-colors duration-300 ${
                          currentStat === index ? "text-green-600" : "text-gray-400"
                        }`}
                      />
                      <div
                        className={`text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent transition-all duration-300 ${
                          currentStat === index ? "scale-110" : "scale-100"
                        }`}
                      >
                        {stat.number}
                      </div>
                    </div>
                    <div className="text-xs text-gray-600 font-medium">{stat.label}</div>
                  </div>
                )
              })}
            </div>
          </div>
          {/* Right International Visa Cards Grid */}
          <div
            className={`grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 transition-all duration-1000 ${
              isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
            }`}
            style={{ transitionDelay: "0.4s" }}
          >
            {visaDestinations.map((visa, index) => (
              <motion.div
                key={visa.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={textVariants}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="transform hover:scale-105 transition-all duration-500 shadow-lg hover:shadow-2xl bg-white rounded-xl overflow-hidden border border-gray-200 p-0 flex flex-col"> {/* Added p-0 to Card */}
                  <Link href={`/services/visa/international/${visa.slug}`} passHref className="flex flex-col h-full">
                    <div className="relative w-full h-[108px] overflow-hidden"> {/* Adjusted height */}
                      <Image
                        src={visa.imagePath || "/placeholder.svg"}
                        alt={visa.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                        style={{ objectFit: 'cover' }}
                        className="transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <CardContent className="px-4 py-0 text-center flex items-center justify-center h-[45px]"> {/* Adjusted padding and min-height */}
                      <h3 className="font-bold text-lg text-gray-900 line-clamp-2">
                        {visa.name}
                      </h3>
                    </CardContent>
                  </Link>
                </Card>
              </motion.div>
            ))}
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
