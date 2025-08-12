"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { XCircle, ArrowRight, CheckCircle, AlertTriangle, FileX, Building } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from 'react'

export default function ClosurePage() {
  const [isVisibleClosureTypes, setIsVisibleClosureTypes] = useState(false)
  const [animatedClosureCards, setAnimatedClosureCards] = useState<number[]>([])

  const closureTypes = [
    {
      title: "Voluntary Dissolution",
      description: "Planned closure of business operations by the owners' decision",
      process: [
        "Board resolution for dissolution",
        "Creditor notifications",
        "Asset liquidation",
        "Final tax clearances",
        "SEC dissolution filing"
      ]
    },
    {
      title: "Business Cessation",
      description: "Temporary or permanent cessation of business operations",
      process: [
        "Cessation notice filing",
        "Employee termination procedures",
        "Final tax returns",
        "Permit cancellations",
        "Asset disposition"
      ]
    },
    {
      title: "Corporate Liquidation",
      description: "Complete winding up of corporate affairs and asset distribution",
      process: [
        "Liquidation plan approval",
        "Asset valuation and sale",
        "Debt settlement",
        "Final distributions",
        "Corporate deregistration"
      ]
    }
  ]
  const requirements = [
    {
      category: "Legal Documents",
      items: [
        "Board resolution for closure",
        "Stockholders' consent",
        "Articles of dissolution",
        "Final financial statements"
      ]
    },
    {
      category: "Tax Compliance",
      items: [
        "Final income tax return",
        "VAT final return",
        "Withholding tax returns",
        "BIR clearance certificate"
      ]
    },
    {
      category: "Regulatory Clearances",
      items: [
        "SEC clearance certificate",
        "Local government clearances",
        "SSS/PhilHealth/Pag-IBIG clearances",
        "Special license cancellations"
      ]
    },
    {
      category: "Employee Obligations",
      items: [
        "Final pay computation",
        "Separation benefits",
        "13th month pay",
        "Government remittances"
      ]
    }
  ]

  useEffect(() => {
    const closureTypesObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisibleClosureTypes(true)
            closureTypes.forEach((_, index) => {
              setTimeout(() => {
                setAnimatedClosureCards(prev => [...prev, index])
              }, index * 100)
            })
          }
        })
      },
      { threshold: 0.1 }
    )

    const closureTypesSection = document.getElementById('closure-types-section')
    if (closureTypesSection) closureTypesObserver.observe(closureTypesSection)

    return () => closureTypesObserver.disconnect()
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
              Business <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Closure</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Professional assistance for proper business closure and dissolution
            </p>
          </div>
        </div>
      </section>

      {/* Closure Types */}
      <section id="closure-types-section" className="py-16 bg-gradient-to-br from-white to-gray-50">
        <div className="absolute inset-0 opacity-5 bg-[url('/subtle-pattern.png')] bg-repeat animate-pulse-subtle"></div>
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className={`text-center mb-12 transition-all duration-1000 ${isVisibleClosureTypes ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h2 className="text-3xl font-bold mb-4">
                Types of Business <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Closure</span>
              </h2>
              <p className="text-lg text-gray-700">
                Different closure options depending on your business situation
              </p>
            </div>
            <div className="grid lg:grid-cols-3 gap-6">
              {closureTypes.map((closure, index) => {
                const isAnimated = animatedClosureCards.includes(index)
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
                      <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-105 group-hover:rotate-3 transition-all duration-300">
                        <XCircle className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-xl mb-2">{closure.title}</CardTitle>
                      <CardDescription className="leading-relaxed">
                        {closure.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <h4 className="font-semibold mb-3 text-gray-700">Process Steps:</h4>
                      <ul className="space-y-2">
                        {closure.process.map((step, stepIndex) => (
                          <li key={stepIndex} className="flex items-start text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="leading-relaxed">{step}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-16 bg-gradient-to-br from-green-50 via-blue-50 to-white">
        <div className="absolute inset-0 opacity-5 bg-[url('/subtle-pattern.png')] bg-repeat animate-pulse-subtle animation-delay-500"></div>
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Closure <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Requirements</span>
              </h2>
              <p className="text-lg text-gray-700">
                Essential documents and clearances needed for proper business closure
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {requirements.map((req, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                        <FileX className="h-5 w-5 text-white" />
                      </div>
                      <CardTitle className="text-lg">{req.category}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-2">
                      {req.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="leading-relaxed">{item}</span>
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

      {/* Important Considerations */}
      <section className="py-16 bg-gradient-to-br from-white to-gray-50">
        <div className="absolute inset-0 opacity-5 bg-[url('/subtle-pattern.png')] bg-repeat animate-pulse-subtle animation-delay-1000"></div>
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-lg bg-orange-50 border-l-4 border-l-orange-500">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <AlertTriangle className="h-8 w-8 text-orange-600 flex-shrink-0 mt-1 animate-bounce-subtle" />
                  <div>
                    <h3 className="text-xl font-bold text-orange-800 mb-4">Important Considerations</h3>
                    <div className="space-y-3 text-orange-700">
                      <div>
                        <h4 className="font-semibold mb-1">Timeline Planning</h4>
                        <p className="text-sm">Business closure can take 3-6 months depending on complexity and compliance requirements.</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Financial Obligations</h4>
                        <p className="text-sm">All debts, taxes, and employee obligations must be settled before closure approval.</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Asset Disposition</h4>
                        <p className="text-sm">Proper valuation and disposal of business assets according to legal requirements.</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Record Keeping</h4>
                        <p className="text-sm">Maintain business records for the required retention period even after closure.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
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
