"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Shield, Building, Package, Wine, FileCheck, ArrowRight, CheckCircle, Award, Users, Globe } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from 'react'

export default function LicensePage() {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedCards, setAnimatedCards] = useState<number[]>([])

  const licenses = [
    {
      icon: Building,
      title: "PCAB License",
      subtitle: "Philippine Contractors Accreditation Board License",
      description: "A PCAB License is a mandatory accreditation issued by the Philippine Contractors Accreditation Board (PCAB) for contractors operating in the Philippines. It ensures that contractors comply with the government's standards for safety, quality, and financial stability.",
      color: "from-blue-500 to-cyan-500",
      features: [
        "Safety and quality compliance standards",
        "Financial stability verification",
        "Project-specific licensing options",
        "Regular and special license categories"
      ],
      types: [
        {
          name: "Regular License",
          description: "For contractors registered with SEC or DTI operating permanently in the Philippines."
        },
        {
          name: "Special License", 
          description: "For foreign contractors or joint ventures for specific projects only."
        }
      ]
    },
    {
      icon: Package,
      title: "Import License",
      subtitle: "Legal Authorization for Importing Goods",
      description: "An Import License is a legal authorization required for businesses and individuals who intend to import goods into the Philippines. This ensures compliance with customs regulations, protects local industries, and safeguards public health and safety.",
      color: "from-green-500 to-emerald-500",
      features: [
        "Customs regulations compliance",
        "Local industry protection measures",
        "Public health and safety standards",
        "Import quota management"
      ],
      types: [
        {
          name: "General Import License",
          description: "For standard commercial goods and products not under restricted categories."
        },
        {
          name: "Restricted Import License",
          description: "For controlled items requiring special permits and additional documentation."
        }
      ]
    },
    {
      icon: Wine,
      title: "Liquor License",
      subtitle: "Permit for Alcoholic Beverage Operations",
      description: "A Liquor License is a legal permit required for businesses involved in the sale, distribution, or manufacture of alcoholic beverages in the Philippines. This license ensures compliance with government regulations regarding alcohol production and sales.",
      color: "from-purple-500 to-violet-500",
      features: [
        "Alcohol production compliance",
        "Distribution network authorization",
        "Age verification requirements",
        "Public safety regulations"
      ],
      types: [
        {
          name: "Manufacturer's License",
          description: "For businesses involved in the production and manufacturing of alcoholic beverages."
        },
        {
          name: "Retailer's License",
          description: "For establishments selling alcoholic beverages directly to consumers."
        }
      ]
    },
    {
      icon: FileCheck,
      title: "FDA Registration",
      subtitle: "Food and Drug Administration Registration",
      description: "The Food and Drug Administration (FDA) in the Philippines is responsible for regulating the safety, quality, and efficacy of food, drugs, cosmetics, medical devices, and other health-related products.",
      color: "from-orange-500 to-red-500",
      features: [
        "Product safety and quality assurance",
        "Health-related product regulation",
        "Manufacturing standards compliance",
        "Consumer protection measures"
      ],
      types: [
        {
          name: "Food Product Registration",
          description: "For food manufacturers, importers, and distributors ensuring product safety."
        },
        {
          name: "Drug and Medical Device Registration",
          description: "For pharmaceutical companies and medical device manufacturers and importers."
        }
      ]
    }
  ]
  const industries = [
    "Construction & Engineering", "Food & Beverage", "Import & Export", "Healthcare & Pharmaceuticals",
    "Manufacturing", "Telecommunications", "Transportation", "Mining & Energy",
    "Tourism & Hospitality", "Financial Services", "Education", "Real Estate"
  ]
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            // Animate cards with staggered delay
            licenses.forEach((_, index) => {
              setTimeout(() => {
                setAnimatedCards(prev => [...prev, index])
              }, index * 100) // Slightly faster stagger
            })
          }
        })
      },
      { threshold: 0.1 }
    )
    const section = document.getElementById('licenses-section')
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
                Special License & <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Permit</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Professional assistance in obtaining specialized licenses and permits for your business operations
              </p>
              <Button size="lg" className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-3 transform hover:scale-105 transition-all duration-300">
                Get License Assistance
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Licenses Section - Compact Cards */}
      <section id="licenses-section" className="py-20 bg-gradient-to-br from-white to-gray-50">
        <div className="absolute inset-0 opacity-5 bg-[url('/subtle-pattern.png')] bg-repeat animate-pulse-subtle"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h2 className="text-3xl font-bold mb-4">
                <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Special License & Permit</span> Services
              </h2>
              <p className="text-xl text-muted-foreground">
                We help you obtain the necessary licenses and permits for your specific industry
              </p>
            </div>
            <div className="grid lg:grid-cols-2 gap-8">
              {licenses.map((license, index) => {
                const Icon = license.icon
                const isAnimated = animatedCards.includes(index)
                
                return (
                  <Card 
                    key={index} 
                    className={`border-0 shadow-lg hover:shadow-xl transition-all duration-700 group cursor-pointer flex flex-col ${
                      isAnimated 
                        ? 'translate-y-0 opacity-100 scale-100' 
                        : 'translate-y-10 opacity-0 scale-95'
                    } hover:-translate-y-2 hover:scale-105`}
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-start space-x-4">
                        <div className={`w-16 h-16 bg-gradient-to-r ${license.color} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-105 group-hover:rotate-3 transition-all duration-300`}>
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-2xl mb-2 group-hover:text-green-600 transition-colors">
                            {license.title}
                          </CardTitle>
                          <CardDescription className="text-lg font-medium text-green-600 mb-4">
                            {license.subtitle}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                                        <CardContent className="pt-0 flex-1 flex flex-col">
                      <p className="text-muted-foreground mb-4 leading-relaxed">{license.description}</p>
                                            {/* Key Features */}
                      <div className="mb-4">
                        <h4 className="text-lg font-semibold text-gray-700 mb-3">Key Features</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {license.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center text-sm">
                              <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                              <span className="text-gray-600">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                                            {/* License Types */}
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-700 mb-3">License Types</h4>
                        <div className="space-y-3">
                          {license.types.map((type, typeIndex) => (
                            <div key={typeIndex} className="border-l-4 border-green-500 pl-4 bg-green-50 p-3 rounded-r-lg">
                              <h5 className="font-semibold text-green-600 mb-2">{type.name}</h5>
                              <p className="text-sm text-muted-foreground leading-relaxed">{type.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                                            {/* Progress indicator */}
                      <div className="w-full bg-gray-200 rounded-full h-1 mt-4 overflow-hidden">
                        <div 
                          className={`h-1 bg-gradient-to-r ${license.color} rounded-full transform transition-all duration-1000 ${
                            isAnimated ? 'translate-x-0' : '-translate-x-full'
                          }`}
                          style={{transitionDelay: `${index * 0.1}s`}}
                        ></div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
            <div className="text-center mt-12">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-50 to-blue-50 px-6 py-3 rounded-full border border-green-200">
                <Award className="h-5 w-5 text-green-600 animate-bounce-subtle" />
                <p className="text-lg text-muted-foreground font-medium">And many more specialized licenses...</p>
              </div>
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
                Our License & Permit <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Process</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Streamlined approach to obtaining your required licenses and permits
              </p>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: "01", title: "Consultation", description: "Identify required licenses and permits for your business", icon: Users },
                { step: "02", title: "Documentation", description: "Prepare and compile all necessary documents and requirements", icon: FileCheck },
                { step: "03", title: "Application", description: "Submit applications to relevant government agencies", icon: ArrowRight },
                { step: "04", title: "Follow-up", description: "Monitor application status and ensure timely approval", icon: CheckCircle }
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

      {/* Industries Section - Compact Grid */}
      <section className="py-20 bg-gradient-to-br from-white to-gray-50">
        <div className="absolute inset-0 opacity-5 bg-[url('/subtle-pattern.png')] bg-repeat animate-pulse-subtle animation-delay-1000"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">
                Industries We <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Serve</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Specialized license and permit services across various industries
              </p>
            </div>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              {industries.map((industry, index) => (
                <Card key={index} className="text-center border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                  <CardContent className="p-4">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center group-hover:scale-105 group-hover:rotate-3 transition-transform duration-300">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <p className="text-sm font-medium">{industry}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 via-blue-50 to-white relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-green-200/10 rounded-full blur-3xl animate-blob-subtle"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-200/10 rounded-full blur-3xl animate-blob-subtle" style={{animationDelay: '1s'}}></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center text-gray-800">
            <h2 className="text-3xl font-bold mb-4">Need Help with Licenses & Permits?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Our experts will guide you through the entire process of obtaining the necessary licenses and permits for your business
            </p>
            <Button size="lg" className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-3 transform hover:scale-105 transition-all duration-300">
              Get License Assistance
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
