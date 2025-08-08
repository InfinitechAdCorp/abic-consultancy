"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { CheckCircle, ArrowRight, Users, Building, FileText, Globe, Briefcase, Shield, Target } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from 'react'

export default function StartupPage() {
  const [isVisibleSteps, setIsVisibleSteps] = useState(false)
  const [animatedStepCards, setAnimatedStepCards] = useState<number[]>([])

  const steps = [
    {
      step: "01",
      title: "INITIAL CONSULTATION",
      description: "We listen to your goals and assess your need with clarity.",
      detail: "This step ensures we fully understand your situation before recommending any solution."
    },
    {
      step: "02", 
      title: "PROPOSAL CONFIRMATION",
      description: "Transparent, tailored solutions no hidden surprises.",
      detail: "You'll receive a clear proposal that matches your exact requirements and budget."
    },
    {
      step: "03",
      title: "DOCUMENT PREPARATION", 
      description: "We guide you every step to avoid errors and delays.",
      detail: "Our expert support ensures your paperwork is complete, accurate, and stress-free."
    },
    {
      step: "04",
      title: "IMPLEMENTATION",
      description: "We do the heavy lifting so you don't have to.",
      detail: "Whether it's processing submission, or coordination, we execute with precision."
    },
    {
      step: "05",
      title: "COMPLETION",
      description: "Your goal is achieved efficiently and successfully.", 
      detail: "We deliver results, not just promises. Sit back and enjoy the outcome."
    }
  ]
  const entityTypes = [
    {
      number: "1",
      title: "Domestic Corporation",
      description: "A corporation that is majority or wholly owned by Filipinos or foreign investors.",
      features: [
        "Requires at least 2 to 15 incorporators",
        "Foreign ownership is allowed up to 100% for certain industries",
        "Governed by the Revised Corporation Code of the Philippines",
        "Minimum Capital: USD 200,000 (or USD 100,000 under specific conditions)"
      ]
    },
    {
      number: "2",
      title: "One Person Corporation (OPC)",
      description: "A corporation with a single stockholder, who may be a foreign individual or entity.",
      features: [
        "No minimum capital required, unless stipulated by specific industry regulations",
        "Simple governance with no need for a board of directors",
        "The sole stockholder has limited liability"
      ]
    },
    {
      number: "3",
      title: "Branch Office",
      description: "An extension of a foreign parent company operating in the Philippines.",
      features: [
        "Can engage in revenue-generating activities",
        "Fully liable for the operations and obligations in the Philippines",
        "Subject to Philippine corporate taxes",
        "Minimum Capital: USD 200,000 (may be reduced to USD 100,000)"
      ]
    },
    {
      number: "4",
      title: "Representative Office",
      description: "A non-revenue-generating office established to represent a foreign company.",
      features: [
        "Focused on activities like market research, liaison, and promotion",
        "Cannot earn income locally",
        "Minimum Capital: USD 30,000"
      ]
    }
  ]

  useEffect(() => {
    const stepsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisibleSteps(true)
            steps.forEach((_, index) => {
              setTimeout(() => {
                setAnimatedStepCards(prev => [...prev, index])
              }, index * 100)
            })
          }
        })
      },
      { threshold: 0.1 }
    )

    const stepsSection = document.getElementById('steps-section')
    if (stepsSection) stepsObserver.observe(stepsSection)

    return () => stepsObserver.disconnect()
  }, [])

  return (
    <main className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-green-50 via-blue-50 to-white overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-green-200/10 rounded-full blur-3xl animate-blob-subtle"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-200/10 rounded-full blur-3xl animate-blob-subtle" style={{animationDelay: '1s'}}></div>
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
              Business <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Start-Up</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              5 Steps to Start Your Business in the Philippines
            </p>
          </div>
        </div>
      </section>

      {/* Steps Section - Compact Grid Layout */}
      <section id="steps-section" className="py-16 bg-gradient-to-br from-white to-gray-50">
        <div className="absolute inset-0 opacity-5 bg-[url('/subtle-pattern.png')] bg-repeat animate-pulse-subtle"></div>
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className={`text-center mb-12 transition-all duration-1000 ${isVisibleSteps ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h2 className="text-3xl font-bold mb-4">
                5 STEPS TO START YOUR <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">BUSINESS</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {steps.map((step, index) => {
                const isAnimated = animatedStepCards.includes(index)
                return (
                  <Card 
                    key={index} 
                    className={`border-0 shadow-lg hover:shadow-xl transition-all duration-700 group h-full ${
                      isAnimated 
                        ? 'translate-y-0 opacity-100 scale-100' 
                        : 'translate-y-10 opacity-0 scale-95'
                    } hover:-translate-y-2 hover:scale-105`}
                    style={{transitionDelay: `${index * 0.1}s`}}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center mr-4 group-hover:scale-105 group-hover:rotate-3 transition-all duration-300">
                          <span className="text-white font-bold text-sm">{step.step}</span>
                        </div>
                        <h3 className="text-lg font-bold">{step.title}</h3>
                      </div>
                      <p className="text-gray-700 mb-3 leading-relaxed">{step.description}</p>
                      <p className="text-gray-600 text-sm leading-relaxed">{step.detail}</p>
                    </CardContent>
                  </Card>
                )
              })}
                            {/* CTA Card */}
              <Card className="border-0 shadow-lg bg-gradient-to-r from-green-500 to-blue-500 text-white flex flex-col justify-center items-center text-center p-6">
                <CardContent className="p-0 flex flex-col justify-center items-center text-center h-full">
                  <Target className="h-12 w-12 mb-4 animate-bounce-subtle" />
                  <h3 className="text-lg font-bold mb-2">Ready to Start?</h3>
                  <p className="text-sm mb-4 opacity-90">Schedule your consultation today</p>
                  <Button size="sm" className="bg-white text-green-600 hover:bg-gray-100">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Legal Entity Types - Compact Layout */}
      <section className="py-16 bg-gradient-to-br from-green-50 via-blue-50 to-white">
        <div className="absolute inset-0 opacity-5 bg-[url('/subtle-pattern.png')] bg-repeat animate-pulse-subtle animation-delay-500"></div>
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Legal Entity Types in the <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Philippines</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {entityTypes.map((entity, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold">{entity.number}</span>
                      </div>
                      <div>
                        <CardTitle className="text-xl mb-2">{entity.title}</CardTitle>
                        <CardDescription className="leading-relaxed">
                          {entity.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-2">
                      {entity.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Foreign Ownership Restrictions - Side by Side */}
      <section className="py-16 bg-gradient-to-br from-white to-gray-50">
        <div className="absolute inset-0 opacity-5 bg-[url('/subtle-pattern.png')] bg-repeat animate-pulse-subtle animation-delay-1000"></div>
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Foreign Ownership <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Restrictions</span>
              </h2>
              <p className="text-lg text-gray-700">
                Regulated by the Foreign Investment Negative List (FINL)
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-red-600 flex items-center">
                    <Shield className="h-5 w-5 mr-2 animate-bounce-subtle" />
                    Full Foreign Ownership Prohibited
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {[
                      "Mass media (except recording and internet-based)",
                      "Practice of professions (unless reciprocity agreements)",
                      "Retail trade (less than USD 2.5M capital)",
                      "Private security agencies",
                      "Small-scale mining",
                      "Marine resources utilization"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start text-sm">
                        <div className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2 flex-shrink-0" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-orange-600 flex items-center">
                    <Building className="h-5 w-5 mr-2 animate-bounce-subtle" />
                    Up to 40% Foreign Ownership
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {[
                      "Operation of public utilities",
                      "Educational institutions (except religious)",
                      "Ownership of private lands",
                      "Natural resources exploration",
                      "Deep-sea commercial fishing",
                      "Government procurement contracts"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start text-sm">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2 flex-shrink-0" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-green-50 via-blue-50 to-white relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-green-200/10 rounded-full blur-3xl animate-blob-subtle"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-200/10 rounded-full blur-3xl animate-blob-subtle" style={{animationDelay: '1s'}}></div>
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center text-gray-800">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Launch Your Business in the Philippines?
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Let our experts guide you through the entire business setup process
            </p>
            <Button size="lg" className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-3 transform hover:scale-105 transition-all duration-300">
              Start Your Business Today
            </Button>
          </div>
        </div>
      </section>

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
