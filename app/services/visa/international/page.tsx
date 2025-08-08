"use client"
import React from 'react'
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Globe2, ArrowRight, CheckCircle, Plane, MapPin, Clock } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion" // Import motion for animations
import Image from "next/image" // Import Image component
import Link from 'next/link' // Import Link component

const visaDestinations = [{ name: "China Visa", imagePath: "/images/great-wall-china.png", slug: "china-visa" },{ name: "Tourist Thailand Visa", imagePath: "/images/tourist-thailand-visa.png", slug: "tourist-thailand-visa" },{ name: "Destination Thailand Visa", imagePath: "/images/destination_thailand.png", slug: "destination-thailand-visa" },{ name: "Italy Visa", imagePath: "/images/italy-visa.png", slug: "italy-visa" },{ name: "Hong Kong Visa", imagePath: "/images/hong-kong-visa.png", slug: "hong-kong-visa" },{ name: "Saudi Visa", imagePath: "/images/saudi-visa.png", slug: "saudi-visa" },{ name: "Korea Visa", imagePath: "/images/korea-visa.png", slug: "korea-visa" },{ name: "Schengen Visa", imagePath: "/images/schengen.png", slug: "schengen-visa" },{ name: "Japan Visa", imagePath: "/images/japan-visa.png", slug: "japan-visa" },{ name: "Canada Visa", imagePath: "/images/canada-visa.png", slug: "canada-visa" },{ name: "USA Visa", imagePath: "/images/usa-visa.png", slug: "usa-visa" },]

const services = [{
  title: "Visa Consultation",
  description: "Expert guidance on visa requirements and application procedures.",
  icon: MapPin,
},{
  title: "Document Preparation",
  description: "Assistance with gathering and organizing necessary documents.",
  icon: MapPin,
},{
  title: "Application Submission",
  description: "Efficient submission of visa applications to relevant authorities.",
  icon: MapPin,
},{
  title: "Status Tracking",
  description: "Real-time tracking of visa application status and updates.",
  icon: MapPin,
},]

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
}

export default function Page() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navigation />
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-green-50 via-blue-50 to-white overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-green-200/10 rounded-full blur-3xl animate-blob-subtle"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-200/10 rounded-full blur-3xl animate-blob-subtle" style={{ animationDelay: '1s' }}></div>
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
              International <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Visa</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Professional visa assistance for Filipino citizens traveling worldwide
            </p>
          </div>
        </div>
      </section>
      {/* Destinations - Redesigned to match image */}
      <section className="py-16 bg-gradient-to-br from-white to-gray-50 flex-grow relative">
        <div className="absolute inset-0 opacity-5 bg-[url('/subtle-pattern.png')] bg-repeat animate-pulse-subtle"></div>
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {visaDestinations.map((destination, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={cardVariants}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <Card className="border-0 shadow-lg group hover:shadow-2xl transition-all duration-300 h-full flex flex-col hover:-translate-y-1 p-0"> {/* Added p-0 here */}
                    <Link href={`/services/visa/international/${destination.slug}`} passHref className="flex flex-col h-full">
                      <div className="relative w-full h-48 overflow-hidden rounded-t-lg"> {/* Fixed height for image container */}
                        <Image
                          src={destination.imagePath || "/placeholder.svg"}
                          alt={destination.name}
                          fill // Use fill to make image cover the container
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Add sizes for better performance
                          className="object-cover group-hover:scale-110 transition-transform duration-300" // Ensure image covers the area and scales on hover
                        />
                        {/* Overlay for hover effect */}
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <ArrowRight className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </div>
                      <CardContent className="py-2 px-2 flex-grow flex items-center justify-center text-center"> {/* Add padding and flex-grow */}
                        <p className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">{destination.name}</p>
                      </CardContent>
                    </Link>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Services */}
      <section className="py-16 bg-gradient-to-br from-green-50 via-blue-50 to-white relative">
        <div className="absolute inset-0 opacity-5 bg-[url('/subtle-pattern.png')] bg-repeat animate-pulse-subtle animation-delay-500"></div>
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 animate-fade-in-up">
              <h2 className="text-3xl font-bold mb-4">
                Our <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Services</span>
              </h2>
              <p className="text-lg text-gray-700">
                Comprehensive visa assistance services for international travel
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
                    <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full hover:-translate-y-2 hover:scale-105">
                      <CardContent className="p-6">
                        <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center group-hover:scale-105 group-hover:rotate-3 transition-all duration-300">
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold mb-3">{service.title}</h3>
                        <p className="text-gray-700 text-sm leading-relaxed">{service.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
      {/* Process */}
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
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-200/10 rounded-full blur-3xl animate-blob-subtle" style={{ animationDelay: '1s' }}></div>
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center text-gray-800 animate-fade-in-up">
            <h2 className="text-3xl font-bold mb-4">Planning International Travel?</h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Let our visa experts help you navigate international visa requirements and ensure smooth travel
            </p>
            <Button size="lg" className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-3 transform hover:scale-105 transition-all duration-300">
              Get Visa Assistance
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
