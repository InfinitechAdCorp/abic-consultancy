"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { RefreshCw, ArrowRight, CheckCircle, Calendar, FileText, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from 'react'

export default function RenewalPage() {
  const [isVisibleRenewalTypes, setIsVisibleRenewalTypes] = useState(false)
  const [animatedRenewalCards, setAnimatedRenewalCards] = useState<number[]>([])

  const renewalTypes = [
    {
      title: "Business Permit Renewal",
      description: "Annual renewal of your business permit with local government units",
      requirements: [
        "Previous year's business permit",
        "BIR Certificate of Registration",
        "Updated business information",
        "Compliance certificates"
      ]
    },
    {
      title: "SEC Registration Renewal",
      description: "Annual registration renewal with Securities and Exchange Commission",
      requirements: [
        "General Information Sheet (GIS)",
        "Financial statements",
        "Board resolutions",
        "Updated corporate information"
      ]
    },
    {
      title: "BIR Registration Renewal",
      description: "Tax registration updates and compliance renewals",
      requirements: [
        "Updated registration information",
        "Tax compliance certificates",
        "Financial statements",
        "Authorized representative documents"
      ]
    },
    {
      title: "License Renewals",
      description: "Renewal of special licenses and permits for regulated industries",
      requirements: [
        "Current license certificates",
        "Compliance reports",
        "Updated business operations",
        "Industry-specific requirements"
      ]
    }
  ]
  const process = [
    {
      step: "01",
      title: "Assessment",
      description: "Review current registrations and identify renewal requirements"
    },
    {
      step: "02", 
      title: "Preparation",
      description: "Gather and prepare all necessary documents and forms"
    },
    {
      step: "03",
      title: "Submission",
      description: "Submit renewal applications to relevant government agencies"
    },
    {
      step: "04",
      title: "Follow-up",
      description: "Monitor application status and ensure timely completion"
    }
  ]

  useEffect(() => {
    const renewalTypesObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisibleRenewalTypes(true)
            renewalTypes.forEach((_, index) => {
              setTimeout(() => {
                setAnimatedRenewalCards(prev => [...prev, index])
              }, index * 100)
            })
          }
        })
      },
      { threshold: 0.1 }
    )

    const renewalTypesSection = document.getElementById('renewal-types-section')
    if (renewalTypesSection) renewalTypesObserver.observe(renewalTypesSection)

    return () => renewalTypesObserver.disconnect()
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
              Business <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Renewal</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Keep your business compliant with timely renewal services
            </p>
          </div>
        </div>
      </section>

      {/* Renewal Types */}
      <section id="renewal-types-section" className="py-16 bg-gradient-to-br from-white to-gray-50">
        <div className="absolute inset-0 opacity-5 bg-[url('/subtle-pattern.png')] bg-repeat animate-pulse-subtle"></div>
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className={`text-center mb-12 transition-all duration-1000 ${isVisibleRenewalTypes ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h2 className="text-3xl font-bold mb-4">
                Business <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Renewal Services</span>
              </h2>
              <p className="text-lg text-gray-700">
                Comprehensive renewal services to maintain your business compliance
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {renewalTypes.map((renewal, index) => {
                const isAnimated = animatedRenewalCards.includes(index)
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
                    <CardHeader>
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-105 group-hover:rotate-3 transition-all duration-300">
                          <RefreshCw className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-xl mb-2">{renewal.title}</CardTitle>
                          <CardDescription className="leading-relaxed">
                            {renewal.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="ml-16">
                        <h4 className="font-semibold mb-3 text-gray-700">Requirements:</h4>
                        <ul className="space-y-2">
                          {renewal.requirements.map((req, reqIndex) => (
                            <li key={reqIndex} className="flex items-start text-sm">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="leading-relaxed">{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gradient-to-br from-green-50 via-blue-50 to-white">
        <div className="absolute inset-0 opacity-5 bg-[url('/subtle-pattern.png')] bg-repeat animate-pulse-subtle animation-delay-500"></div>
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Our Renewal <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Process</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              {process.map((step, index) => (
                <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center group-hover:scale-105 group-hover:rotate-3 transition-transform duration-300">
                      <span className="text-white font-bold text-sm">{step.step}</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-3">{step.title}</h3>
                    <p className="text-gray-700 text-sm">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-16 bg-gradient-to-br from-white to-gray-50">
        <div className="absolute inset-0 opacity-5 bg-[url('/subtle-pattern.png')] bg-repeat animate-pulse-subtle animation-delay-1000"></div>
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-lg bg-yellow-50 border-l-4 border-l-yellow-500">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <AlertCircle className="h-8 w-8 text-yellow-600 flex-shrink-0 mt-1 animate-bounce-subtle" />
                  <div>
                    <h3 className="text-xl font-bold text-yellow-800 mb-3">Important Renewal Deadlines</h3>
                    <div className="space-y-2 text-yellow-700">
                      <p>• Business permits must be renewed annually before January 20</p>
                      <p>• SEC registration renewal deadline is typically May 30</p>
                      <p>• BIR registration updates should be done within 30 days of changes</p>
                      <p>• Special licenses have varying renewal periods - check specific requirements</p>
                    </div>
                    <p className="mt-4 text-sm text-yellow-600">
                      Late renewals may result in penalties and business operation disruptions.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-green-50 via-blue-50 to-white relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-green-200/10 rounded-full blur-3xl animate-blob-subtle"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-200/10 rounded-full blur-3xl animate-blob-subtle" style={{animationDelay: '1s'}}></div>
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center text-gray-800">
            <h2 className="text-3xl font-bold mb-4">Don't Miss Your Renewal Deadlines</h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Let us handle your business renewals and keep you compliant with all requirements
            </p>
            <Button size="lg" className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-3 transform hover:scale-105 transition-all duration-300">
              Schedule Renewal Service
              <ArrowRight className="ml-2 h-4 w-4" />
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
