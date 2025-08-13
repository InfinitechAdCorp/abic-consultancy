"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Users, ArrowRight, DollarSign, Clock, Award, Shield } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
}

export default function HROutsourcingPage() {
  const services = [
    {
      title: "Payroll & Benefits Administration",
      description: "Processing salaries, tax compliance, SSS, PhilHealth, Pag-IBIG contributions",
      icon: DollarSign,
    },
    {
      title: "Recruitment & Staffing Solutions",
      description: "End-to-end hiring, onboarding, and workforce planning",
      icon: Users,
    },
    {
      title: "HR Administration & Employee Management",
      description: "Records management, contracts, performance tracking",
      icon: Award,
    },
    {
      title: "Employee Engagement & Relations",
      description: "Conflict resolution, company culture programs",
      icon: Users,
    },
    {
      title: "Labor Law Compliance & Risk Management",
      description: "DOLE compliance, disciplinary procedures, terminations",
      icon: Shield,
    },
  ]

  const benefits = [
    {
      icon: DollarSign,
      title: "Reduce Costs",
      description: "Significantly lower operational expenses compared to maintaining in-house HR teams",
    },
    {
      icon: Clock,
      title: "Improve Efficiency",
      description: "Streamlined HR processes that save time and increase productivity",
    },
    {
      icon: Shield,
      title: "Stay Compliant",
      description: "Ensure full compliance with Philippine labor laws and regulations",
    },
    {
      icon: Award,
      title: "Expert Solutions",
      description: "Access to specialized HR professionals and best practices",
    },
  ]

  return (
    <main className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-green-50 via-blue-50 to-white overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-green-200/10 rounded-full blur-3xl animate-blob-subtle"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-200/10 rounded-full blur-3xl animate-blob-subtle"
          style={{ animationDelay: "1s" }}
        ></div>
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
              HR{" "}
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Outsourcing
              </span>
            </h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Streamline Your Workforce Management with Expert HR Solutions
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              We provide HR Outsourcing Services to help businesses reduce costs, improve efficiency, and stay compliant
              with labor laws
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {/* Updated to link to quote page */}
              <Link href="/quote">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-3 transform hover:scale-105 transition-all duration-300"
                >
                  Get HR Outsourcing Quote
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-gradient-to-br from-white to-gray-50 relative">
        <div className="absolute inset-0 opacity-5 bg-[url('/subtle-pattern.png')] bg-repeat animate-pulse-subtle"></div>
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 animate-fade-in-up">
              <h2 className="text-3xl font-bold mb-4">Our HR Outsourcing Services</h2>
              <p className="text-lg text-gray-600">
                Comprehensive HR solutions designed to optimize your workforce management
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                        <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center group-hover:scale-105 group-hover:rotate-3 transition-all duration-300">
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                        <CardTitle className="text-xl mb-3">{service.title}</CardTitle>
                        <CardDescription className="leading-relaxed">{service.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gradient-to-br from-green-50 via-blue-50 to-white relative">
        <div className="absolute inset-0 opacity-5 bg-[url('/subtle-pattern.png')] bg-repeat animate-pulse-subtle animation-delay-500"></div>
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 animate-fade-in-up">
              <h2 className="text-3xl font-bold mb-4">
                Why Choose Our{" "}
                <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  HR Outsourcing
                </span>
              </h2>
              <p className="text-lg text-gray-600">Key benefits that drive your business success</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon
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
                        <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center group-hover:scale-105 group-hover:rotate-3 transition-all duration-300">
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold mb-3">{benefit.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
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
              <h2 className="text-3xl font-bold mb-4">Our Outsourcing Process</h2>
              <p className="text-lg text-gray-600">A systematic approach to seamless HR outsourcing implementation</p>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  step: "01",
                  title: "Assessment",
                  description: "Comprehensive analysis of your current HR needs and challenges",
                },
                {
                  step: "02",
                  title: "Planning",
                  description: "Develop customized HR outsourcing strategy and implementation plan",
                },
                {
                  step: "03",
                  title: "Transition",
                  description: "Smooth transition of HR functions with minimal business disruption",
                },
                {
                  step: "04",
                  title: "Management",
                  description: "Ongoing HR management with regular reporting and optimization",
                },
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
                      <p className="text-gray-600 text-sm leading-relaxed">{process.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-green-200/10 rounded-full blur-3xl animate-blob-subtle"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-200/10 rounded-full blur-3xl animate-blob-subtle"
          style={{ animationDelay: "1s" }}
        ></div>
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center text-white animate-fade-in-up">
            <h2 className="text-3xl font-bold mb-4">Ready to Outsource Your HR Operations?</h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Transform your HR operations with our comprehensive outsourcing solutions. Get a free consultation today.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {/* Updated to link to quote page */}
              <Link href="/consultation">
                <Button
                  size="lg"
                  className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 transform hover:scale-105 transition-all duration-300"
                >
                  Get Free Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
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
