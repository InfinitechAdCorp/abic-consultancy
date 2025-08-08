"use client"
import { Award, Users, Building2, Globe, TrendingUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import Image from 'next/image' // Import the Image component
import Link from 'next/link' // Import Link from next/link

export default function WhyChooseUs() {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedStats, setAnimatedStats] = useState<number[]>([])
  const [countingNumbers, setCountingNumbers] = useState([0, 0, 0, 0])
  const stats = [
    {
      icon: Award,
      number: "7",
      label: "YEARS OF",
      sublabel: "EXCELLENCE",
      color: "from-green-500 to-emerald-500",
      finalNumber: 7
    },
    {
      icon: Users,
      number: "60",
      label: "EXPERT",
      sublabel: "EMPLOYEES",
      color: "from-blue-500 to-cyan-500",
      finalNumber: 60
    },
    {
      icon: Building2,
      number: "387+",
      label: "INTERNATIONAL CORPORATE",
      sublabel: "CLIENTS",
      color: "from-purple-500 to-violet-500",
      finalNumber: 387
    },
    {
      icon: Globe,
      number: "1000+",
      label: "INDIVIDUAL FOREIGN",
      sublabel: "ACCOUNTS SERVED",
      color: "from-orange-500 to-red-500",
      finalNumber: 1000
    }
  ]

  // Counter animation function
  const animateCounter = (finalNumber: number, index: number) => {
    let current = 0
    const increment = finalNumber / 50
    const timer = setInterval(() => {
      current += increment
      if (current >= finalNumber) {
        current = finalNumber
        clearInterval(timer)
      }
      setCountingNumbers(prev => {
        const newNumbers = [...prev]
        newNumbers[index] = Math.floor(current)
        return newNumbers
      })
    }, 30)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            // Animate stats one by one
            stats.forEach((stat, index) => {
              setTimeout(() => {
                setAnimatedStats(prev => [...prev, index])
                // Start counter animation
                if (stat.finalNumber <= 100) {
                  animateCounter(stat.finalNumber, index)
                }
              }, index * 300)
            })
          }
        })
      },
      { threshold: 0.1 }
    )
    const section = document.getElementById('why-choose-us')
    if (section) observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="why-choose-us" className="py-32 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/map.png"
        alt="Background map of the Philippines"
        fill
        quality={100}
        sizes="100vw"
        style={{
          objectFit: 'cover',
          zIndex: 0, // Changed zIndex from 999 to 0
          opacity: 0.9, // Make it subtle
        }}
      />
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
      <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-orange-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>

      {/* Floating Achievement Icons */}
      <div className="absolute top-32 left-1/4 animate-bounce" style={{animationDelay: '0.5s'}}>
        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center opacity-20">
          <Award className="h-6 w-6 text-white" />
        </div>
      </div>
      <div className="absolute top-48 right-1/3 animate-bounce" style={{animationDelay: '1.5s'}}>
        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-orange-500 rounded-lg flex items-center justify-center opacity-20">
          <TrendingUp className="h-5 w-5 text-white" />
        </div>
      </div>
      <div className="absolute bottom-32 right-1/4 animate-bounce" style={{animationDelay: '2s'}}>
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center opacity-20">
          <Building2 className="h-4 w-4 text-white" />
        </div>
      </div>
      <div className="container mx-auto px-6 lg:px-8 relative z-10"> {/* Ensure content is above background */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
            Why Choose <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">ABIC Consultancy</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our track record speaks for itself - delivering excellence and building lasting partnerships across the Philippines
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            const isAnimated = animatedStats.includes(index)
            const displayNumber = stat.finalNumber <= 100 ? countingNumbers[index] : stat.number
            const linkHref = (index === 0 || index === 1) ? "/about" : "/services/visa/international";

            return (
              <Link href={linkHref} passHref key={index}>
                <div
                  className={`text-center p-8 shadow-xl hover:shadow-2xl transition-all duration-700 bg-white/10 backdrop-blur group cursor-pointer relative overflow-hidden
                    ${isAnimated ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'}
                    hover:-translate-y-2 hover:scale-105`}
                >
                  {/* Animated background gradient on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                  {/* Icon with pulsing effect */}
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 relative`}>
                    <Icon className="h-8 w-8 text-white" />
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${stat.color} animate-ping opacity-20`}></div>
                  </div>

                  {/* Animated Number */}
                  <div className="mb-4">
                    <div className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2 transform group-hover:scale-110 transition-all duration-300`}>
                      {stat.finalNumber <= 100 ? displayNumber : stat.number}
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm font-bold text-gray-800 tracking-wide">{stat.label}</div>
                      <div className="text-sm font-bold text-gray-800 tracking-wide">{stat.sublabel}</div>
                    </div>
                  </div>

                  {/* Progress bar animation */}
                  <div className="w-full bg-gray-200 rounded-full h-1 mt-4 overflow-hidden">
                    <div
                      className={`h-1 bg-gradient-to-r ${stat.color} rounded-full transform transition-all duration-1000 ${
                        isAnimated ? 'translate-x-0' : '-translate-x-full'
                      }`}
                      style={{transitionDelay: `${index * 0.2}s`}}
                    ></div>
                  </div>
                  {/* Floating particles effect */}
                  {isAnimated && (
                    <>
                      <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-green-400 to-blue-400 rounded-full animate-ping opacity-60" style={{animationDelay: '0.5s'}}></div>
                      <div className="absolute bottom-4 left-4 w-1 h-1 bg-gradient-to-r from-purple-400 to-orange-400 rounded-full animate-ping opacity-60" style={{animationDelay: '1s'}}></div>
                    </>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
