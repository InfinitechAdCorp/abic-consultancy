"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Edit, ArrowRight, CheckCircle, Building, Users, MapPin, DollarSign, FileText, Award, Briefcase } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from 'react'

export default function AmendmentPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedCards, setAnimatedCards] = useState<number[]>([])

  const amendments = [
    {
      icon: Building,
      title: "Business Name Amendment",
      description: "Changing the registered business name with relevant authorities (e.g., SEC, DTI, or local government).",
      details: "Updating official records and permits to reflect the new name.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Users,
      title: "Change in Ownership Structure",
      description: "Adding or removing business partners, shareholders, or directors. Converting a sole proprietorship into a partnership, corporation, or One Person Corporation (OPC).",
      details: "Updating share distribution and equity structure.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: MapPin,
      title: "Change in Business Address",
      description: "Amending the registered business address with the SEC, BIR, and local government unit (LGU).",
      details: "Securing new business permits and location clearance for the updated address.",
      color: "from-purple-500 to-violet-500"
    },
    {
      icon: Award,
      title: "Change in Corporate Name or Branding",
      description: "Modifying the Articles of Incorporation or By-laws to reflect a new corporate name.",
      details: "Updating branding-related registrations (e.g., trademarks).",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Briefcase,
      title: "Change in Business Purpose or Activities",
      description: "Amending the scope of business operations (e.g., adding new products/services).",
      details: "Updating the Articles of Incorporation to reflect new business activities. Securing additional permits if the new activities fall under regulated industries.",
      color: "from-teal-500 to-green-500"
    },
    {
      icon: DollarSign,
      title: "Capital Structure Amendments",
      description: "Increasing or decreasing authorized capital stock.",
      details: "Updating SEC records and issuing new shares (if applicable). Adjusting the capital contribution of shareholders.",
      color: "from-indigo-500 to-blue-500"
    },
    {
      icon: FileText,
      title: "Change in Corporate Officers or Board Members",
      description: "Updating the list of officers, directors, or incorporators with the SEC.",
      details: "Filing necessary resolutions or certifications to document the changes.",
      color: "from-pink-500 to-rose-500"
    }
  ]

  const benefits = [
    {
      icon: CheckCircle,
      title: "Expert Guidance",
      description: "Professional advice on the best amendment strategy for your business needs",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: FileText,
      title: "Complete Documentation",
      description: "We handle all paperwork and ensure compliance with government requirements",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: ArrowRight,
      title: "Fast Processing",
      description: "Efficient processing to minimize business disruption during amendments",
      color: "from-purple-500 to-violet-500"
    }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            // Animate cards with staggered delay
            amendments.forEach((_, index) => {
              setTimeout(() => {
                setAnimatedCards(prev => [...prev, index])
              }, index * 100) // Slightly faster stagger
            })
          }
        })
      },
      { threshold: 0.1 }
    )

    const section = document.getElementById('amendments-section')
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  return (
    <main className="min-h-screen">
      <Navigation />
      
      {/* Animated Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-green-50 via-blue-50 to-white overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-green-200/10 rounded-full blur-3xl animate-blob-subtle"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-200/10 rounded-full blur-3xl animate-blob-subtle" style={{animationDelay: '1s'}}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-fade-in-up">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
                Business <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Amendment</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Professional business amendment services to adapt your business structure as it grows
              </p>
             
            </div>
          </div>
        </div>
      </section>

      {/* Amendment Types - Compact Grid */}
     <section id="amendments-section" className="py-20 bg-gradient-to-br from-white to-gray-50 relative overflow-hidden">
  {/* Adjusted pattern wrapper */}
  <div
   className="absolute inset-0 opacity-10 bg-[url('/subtle-pattern.png')] bg-[length:1200px_1200px] bg-repeat animate-pulse-subtle"

  ></div>

  <div className="container mx-auto px-4 relative z-10">
    <div className="max-w-6xl mx-auto">
      <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-50' : 'translate-y-10 opacity-0'}`}>
        <h2 className="text-3xl font-bold mb-4">
          Possible <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Amendments</span> You Might Request
        </h2>
        <p className="text-xl text-muted-foreground">
          Comprehensive amendment services for your evolving business needs
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {amendments.map((amendment, index) => {
          const Icon = amendment.icon
          const isAnimated = animatedCards.includes(index)

          return (
            <Card
              key={index}
              className={`border-0 shadow-lg hover:shadow-xl transition-all duration-700 group cursor-pointer h-full ${
                isAnimated 
                  ? 'translate-y-0 opacity-100 scale-100' 
                  : 'translate-y-10 opacity-0 scale-95'
              } hover:-translate-y-2 hover:scale-105`}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${amendment.color} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-105 group-hover:rotate-3 transition-all duration-300`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2 group-hover:text-green-600 transition-colors">
                      {amendment.title}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-sm mb-3 leading-relaxed">
                  {amendment.description}
                </CardDescription>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {amendment.details}
                </p>

                {/* Progress indicator */}
                <div className="w-full bg-gray-200 rounded-full h-1 mt-4 overflow-hidden">
                  <div 
                    className={`h-1 bg-gradient-to-r ${amendment.color} rounded-full transform transition-all duration-1000 ${
                      isAnimated ? 'translate-x-0' : '-translate-x-full'
                    }`}
                    style={{ transitionDelay: `${index * 0.1}s` }}
                  ></div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  </div>
</section>

      {/* Process Section - Compact */}
      <section className="py-20 bg-gradient-to-br from-green-50 via-blue-50 to-white">
        <div className="absolute inset-0 opacity-5 bg-[url('/subtle-pattern.png')] bg-repeat animate-pulse-subtle animation-delay-500"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">
                Our Amendment <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Process</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Streamlined process to ensure your amendments are processed efficiently
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: "01", title: "Assessment", description: "Review current business structure and amendment requirements", icon: CheckCircle },
                { step: "02", title: "Documentation", description: "Prepare all necessary documents and forms for submission", icon: FileText },
                { step: "03", title: "Filing", description: "Submit amendments to relevant government agencies", icon: ArrowRight },
                { step: "04", title: "Completion", description: "Receive updated certificates and permits", icon: Award }
              ].map((process, index) => {
                const Icon = process.icon
                return (
                  <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center group-hover:scale-105 group-hover:rotate-3 transition-transform duration-300">
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="text-2xl font-bold text-green-600 mb-2">{process.step}</div>
                      <h3 className="text-lg font-semibold mb-3">{process.title}</h3>
                      <p className="text-muted-foreground text-sm">{process.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section - Compact */}
      <section className="py-20 bg-gradient-to-br from-white to-gray-50">
        <div className="absolute inset-0 opacity-5 bg-[url('/subtle-pattern.png')] bg-repeat animate-pulse-subtle animation-delay-1000"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">
                Why Choose Our <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Amendment Services</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
                    <CardContent className="p-8">
                      <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r ${benefit.color} flex items-center justify-center group-hover:scale-105 group-hover:rotate-3 transition-all duration-300`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
     

      <Footer />
      
      {/* Custom CSS */}
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

        @keyframes blob-subtle {
          0%, 100% { transform: translate(0, 0) scale(1); }
          30% { transform: translate(10px, -15px) scale(1.05); }
          60% { transform: translate(-5px, 20px) scale(0.98); }
        }
        .animate-blob-subtle {
          animation: blob-subtle 20s infinite ease-in-out alternate;
        }

        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 3s infinite ease-in-out;
        }

        @keyframes pulse-subtle {
          0%, 100% { opacity: 0.05; }
          50% { opacity: 0.08; }
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 10s infinite ease-in-out alternate;
        }
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </main>
  )
}
