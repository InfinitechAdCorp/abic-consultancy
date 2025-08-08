"use client"
import { ArrowRight, CheckCircle, Plane, FileText, RefreshCw, Award } from 'lucide-react'
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

const services = [
  {
    title: "Tourist Visa Extension",
    description: "Extend your tourist visa to stay longer in the Philippines",
    icon: Plane
  },
  {
    title: "Downgrading of Visa",
    description: "Convert your current visa to a different category as needed",
    icon: RefreshCw
  },
  {
    title: "Emigration Clearance Certificate",
    description: "Required clearance for Filipino citizens traveling abroad",
    icon: FileText
  },
  {
    title: "Re-Stamping of Visa",
    description: "Renew visa stamps for continued legal stay",
    icon: Award
  },
  {
    title: "Re-Validation of Visa",
    description: "Validate expired or expiring visa documents",
    icon: CheckCircle
  },
  {
    title: "Temporary Resident Visa",
    description: "Short-term residency for specific purposes",
    icon: Plane
  },
  {
    title: "Provisional Work Permit",
    description: "Temporary work authorization while processing long-term permits",
    icon: FileText
  },
  {
    title: "Special Work Permit",
    description: "Work permits for specific industries and short-term projects",
    icon: Award
  }
]

const otherServices = [
  "Not the Same Person Certificate",
  "NBI Clearance",
  "Derogatory Certificate",
  "Lifting Of (Bio) Black List Order / (HDO) Hold Departure Order / (ALO) Alert List Order (ADO) Allow Departure Order",
  "DFA Apostille Documents",
  "Certification, Authentication & Verification (DEPED)",
  "Birth Certificate",
  "Marriage Certificate"
]

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
}

export default function ShortTermVisaPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-green-50 via-blue-50 to-white overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-green-200/10 rounded-full blur-3xl animate-blob-subtle"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-200/10 rounded-full blur-3xl animate-blob-subtle" style={{animationDelay: '1s'}}></div>
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
              Short Term <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Visa</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Professional assistance for short-term visa services and document processing
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button size="lg" className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-3 transform hover:scale-105 transition-all duration-300">
                Get Visa Assistance
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-gradient-to-br from-white to-gray-50 flex-grow relative">
        <div className="absolute inset-0 opacity-5 bg-[url('/subtle-pattern.png')] bg-repeat animate-pulse-subtle"></div>
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 animate-fade-in-up">
              <h2 className="text-3xl font-bold mb-4">
                Short Term <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Visa Services</span>
              </h2>
              <p className="text-lg text-gray-700">
                Comprehensive visa services for short-term stays and document processing
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => {
                const Icon = service.icon
                return (
                  <motion.div
                    key={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={cardVariants}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full hover:-translate-y-2 hover:scale-105">
                      <CardHeader className="text-center">
                        <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center group-hover:scale-105 group-hover:rotate-3 transition-all duration-300">
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <CardTitle className="text-lg mb-2">{service.title}</CardTitle>
                        <CardDescription className="text-sm leading-relaxed">
                          {service.description}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Other Services */}
      <section className="py-16 bg-gradient-to-br from-green-50 via-blue-50 to-white relative">
        <div className="absolute inset-0 opacity-5 bg-[url('/subtle-pattern.png')] bg-repeat animate-pulse-subtle animation-delay-500"></div>
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 animate-fade-in-up">
              <h2 className="text-3xl font-bold mb-4">
                Other <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Services</span>
              </h2>
              <p className="text-lg text-gray-700">
                Additional document processing and certification services
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {otherServices.map((service, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={cardVariants}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full hover:-translate-y-2 hover:scale-105">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <p className="text-sm font-medium leading-relaxed">{service}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gradient-to-br from-white to-gray-50 relative">
        <div className="absolute inset-0 opacity-5 bg-[url('/subtle-pattern.png')] bg-repeat animate-pulse-subtle animation-delay-1000"></div>
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 animate-fade-in-up">
              <h2 className="text-3xl font-bold mb-4">
                Application <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Process</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: "01", title: "Consultation", description: "Assess your visa needs and requirements" },
                { step: "02", title: "Documentation", description: "Prepare and review all necessary documents" },
                { step: "03", title: "Application", description: "Submit applications to relevant agencies" },
                { step: "04", title: "Processing", description: "Monitor status and ensure timely completion" }
              ].map((process, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={cardVariants}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full hover:-translate-y-2 hover:scale-105">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center group-hover:scale-105 group-hover:rotate-3 transition-all duration-300">
                        <span className="text-white font-bold text-sm">{process.step}</span>
                      </div>
                      <h3 className="text-lg font-semibold mb-3">{process.title}</h3>
                      <p className="text-gray-700 text-sm">{process.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-green-50 via-blue-50 to-white relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-green-200/10 rounded-full blur-3xl animate-blob-subtle"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-200/10 rounded-full blur-3xl animate-blob-subtle" style={{animationDelay: '1s'}}></div>
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center text-gray-800 animate-fade-in-up">
            <h2 className="text-3xl font-bold mb-4">Need Short Term Visa Assistance?</h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Our visa experts are ready to help you with all your short-term visa and document processing needs
            </p>
            <Button size="lg" className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-3 transform hover:scale-105 transition-all duration-300">
              Start Application Process
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
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
