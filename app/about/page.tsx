"use client" // Mark as client component for animations
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Users, Target, Eye, Heart, Award, TrendingUp, Building, Globe,  ArrowRight } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from 'react'
import Link from "next/link" 
export default function AboutPage() {
  const [isVisibleStory, setIsVisibleStory] = useState(false)
  const [isVisibleValues, setIsVisibleValues] = useState(false)
  const [animatedValueCards, setAnimatedValueCards] = useState<number[]>([])

  const values = [
    {
      icon: Heart,
      title: "Commitment",
      description: "We are dedicated to delivering exceptional service and long-term success for our clients."
    },
    {
      icon: Users,
      title: "Professionalism",
      description: "We uphold the highest standards of integrity, expertise, and ethical business practices."
    },
    {
      icon: Target,
      title: "Innovation",
      description: "We embrace change and continuously seek creative solutions to drive business success."
    },
    {
      icon: Globe,
      title: "Collaboration",
      description: "We believe in the power of partnerships, fostering strong relationships with clients and stakeholders."
    }
  ]

  const stats = [
    { number: "500+", label: "Successful Businesses", icon: Award },
    { number: "7", label: "Years of Excellence", icon: TrendingUp },
    { number: "98%", label: "Client Satisfaction", icon: Heart },
    { number: "24/7", label: "Support Available", icon: Users }
  ]

  useEffect(() => {
    const storyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisibleStory(true)
          }
        })
      },
      { threshold: 0.1 }
    )

    const valuesObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisibleValues(true)
            values.forEach((_, index) => {
              setTimeout(() => {
                setAnimatedValueCards(prev => [...prev, index])
              }, index * 150) // Staggered animation
            })
          }
        })
      },
      { threshold: 0.1 }
    )

    const storySection = document.getElementById('story-section')
    const valuesSection = document.getElementById('values-section')

    if (storySection) storyObserver.observe(storySection)
    if (valuesSection) valuesObserver.observe(valuesSection)

    return () => {
      storyObserver.disconnect()
      valuesObserver.disconnect()
    }
  }, [])

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-blue-100 via-green-100 to-purple-100 overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('/subtle-pattern.png')] bg-repeat animate-pulse-subtle"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-3xl animate-blob-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-orange-400/20 rounded-full blur-3xl animate-blob-fast" style={{animationDelay: '1s'}}></div>
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
              About <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">ABIC Consultancy</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Streamlining Your Business Needs Since 2018
            </p>
          </div>
        </div>
      </section>

      {/* Company Story & Mission/Vision */}
      <section id="story-section" className="py-20 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('/subtle-pattern.png')] bg-repeat animate-pulse-subtle animation-delay-500"></div>
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className={`grid lg:grid-cols-2 gap-12 items-center mb-16 transition-all duration-1000 ${isVisibleStory ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Advanced Beyond International Consulting Inc. was officially established in September 2018,
                    with its headquarters in Makati, Philippines. The company was founded with the mission of
                    assisting foreign entrepreneurs and investors in establishing businesses and navigating the
                    investment landscape in the Philippines.
                  </p>
                  <p>
                    By providing comprehensive and efficient consulting services, we aim to streamline the setup
                    process and accelerate our clients' understanding of the local market, ensuring a smooth and
                    successful business establishment.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="w-full h-80 bg-gradient-to-br from-green-200 to-blue-200 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                </div>
                {/* Image Section */}
                <div className="absolute top-0 left-0 right-0 bottom-0">
                  <img src="/images/two_smiling.png" alt="Two smiling business people" className="object-cover w-full h-full rounded-xl opacity-50" />
                </div>
              </div>
            </div>

            {/* Mission & Vision in same section */}
            <div className={`grid md:grid-cols-2 gap-8 mb-16 transition-all duration-1000 ${isVisibleStory ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{transitionDelay: '0.2s'}}>
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mr-4">
                      <Target className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold">Our Mission</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Empowering businesses and investors with strategic and innovative consulting solutions
                    to thrive in a dynamic and evolving market.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-4">
                      <Eye className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold">Our Vision</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    To be the premier bridge connecting foreign investors with thriving economic opportunities
                    in the Philippines.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section id="values-section" className="py-20 bg-gradient-to-br from-blue-50 via-white to-green-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('/subtle-pattern.png')] bg-repeat animate-pulse-subtle animation-delay-1000"></div>
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className={`text-center mb-12 transition-all duration-1000 ${isVisibleValues ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h2 className="text-3xl font-bold mb-4">
                Our Core <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Values</span>
              </h2>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                The fundamental principles that guide everything we do
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon
                const isAnimated = animatedValueCards.includes(index)
                return (
                  <Card
                    key={index}
                    className={`text-center border-0 shadow-lg hover:shadow-xl transition-all duration-700 group h-full ${
                      isAnimated
                        ? 'translate-y-0 opacity-100 scale-100'
                        : 'translate-y-10 opacity-0 scale-95'
                    } hover:-translate-y-2 hover:scale-105`}
                    style={{transitionDelay: `${index * 0.1}s`}}
                  >
                    <CardContent className="p-6">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-lg font-bold mb-3">{value.title}</h3>
                      <p className="text-gray-700 text-sm leading-relaxed">{value.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('/abstract-geometric-pattern.png')] bg-repeat animate-pulse-slow"></div>
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto text-center animate-fade-in-up">
            <h2 className="text-3xl font-bold text-white mb-4">Our Impact in Numbers</h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Measurable results that demonstrate our commitment to client success
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6 mt-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <Card key={index} className="bg-white/10 backdrop-blur border-white/20 text-white text-center transform hover:scale-105 transition-transform duration-300">
                  <CardContent className="p-6">
                    <Icon className="h-10 w-10 mx-auto mb-3 animate-bounce-fast" />
                    <div className="text-3xl font-bold mb-2">{stat.number}</div>
                    <div className="text-white/90 text-sm">{stat.label}</div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center animate-fade-in-up">
            <h2 className="text-3xl font-bold mb-4">Ready to Work With Us?</h2>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              Let us help you navigate the Philippine business landscape and achieve your investment goals.
            </p>
          <Link href="/consultation">
                <Button className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-3 text-base font-semibold transform hover:scale-105 transition-all duration-300 hover:shadow-lg">
                  Schedule A Consultation
                  <ArrowRight className="ml-2 h-4 w-4 animate-pulse" />
                </Button>
              </Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* Custom CSS for animations */}
      <style jsx>{`
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
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
        @keyframes blob-slow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          30% { transform: translate(20px, -30px) scale(1.1); }
          60% { transform: translate(-10px, 40px) scale(0.9); }
        }
        .animate-blob-slow {
          animation: blob-slow 15s infinite ease-in-out alternate;
        }
        @keyframes blob-fast {
          0%, 100% { transform: translate(0, 0) scale(1); }
          40% { transform: translate(-25px, 35px) scale(1.05); }
          70% { transform: translate(15px, -20px) scale(0.95); }
        }
        .animate-blob-fast {
          animation: blob-fast 12s infinite ease-in-out alternate;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s infinite ease-in-out;
        }
        @keyframes bounce-fast {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-bounce-fast {
          animation: bounce-fast 2s infinite ease-in-out;
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.3; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s infinite ease-in-out alternate;
        }
        @keyframes pulse-subtle {
          0%, 100% { opacity: 0.05; }
          50% { opacity: 0.08; }
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 10s infinite ease-in-out alternate;
        }
      `}</style>
    </main>
  )
}
