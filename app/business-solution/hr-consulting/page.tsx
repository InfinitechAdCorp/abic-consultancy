"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Users, ArrowRight, CheckCircle, Target, TrendingUp, Shield, Award } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion" // Import motion for animations
import Link from 'next/link';
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
}

export default function HRConsultingPage() {
  const services = [
    {
      title: "Recruitment & Talent Strategy",
      description: "Hiring process optimization, employer branding",
      icon: Users
    },
    {
      title: "Employee Performance & Retention",
      description: "Performance reviews, leadership coaching",
      icon: TrendingUp
    },
    {
      title: "HR Technology & Process Optimization",
      description: "HRIS selection, automation strategies",
      icon: Target
    },
    {
      title: "Workforce Training & Development",
      description: "Custom training programs for skills enhancement",
      icon: Award
    }
  ]

  const benefits = [
    {
      icon: Target,
      title: "Strategic HR Planning",
      description: "Build and manage a high-performing workforce with expert guidance"
    },
    {
      icon: TrendingUp,
      title: "Improved Performance",
      description: "Optimize employee performance through effective HR strategies"
    },
    {
      icon: Shield,
      title: "Compliance Assurance",
      description: "Ensure compliance with labor laws and regulations"
    },
    {
      icon: Users,
      title: "Employee Engagement",
      description: "Enhance employee satisfaction and retention rates"
    }
  ]

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
              HR <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Consulting</span>
            </h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Empowering Businesses with Strategic HR Solutions
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              We help businesses build and manage a high-performing workforce by providing expert HR consulting services tailored to your needs. Whether you're a startup or an established company, our HR solutions ensure compliance, efficiency, and employee engagement.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link href="/hr-consulting">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-3 transform hover:scale-105 transition-all duration-300"
                >
                  Get HR Consultation
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
              <h2 className="text-3xl font-bold mb-4">Our HR Consulting Services</h2>
              <p className="text-lg text-gray-600">
                Comprehensive HR solutions tailored to your business needs
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
                        <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center group-hover:scale-105 group-hover:rotate-3 transition-all duration-300">
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                        <CardTitle className="text-xl mb-3">{service.title}</CardTitle>
                        <CardDescription className="leading-relaxed">
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

      {/* Benefits Section */}
      <section className="py-16 bg-gradient-to-br from-green-50 via-blue-50 to-white relative">
        <div className="absolute inset-0 opacity-5 bg-[url('/subtle-pattern.png')] bg-repeat animate-pulse-subtle animation-delay-500"></div>
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 animate-fade-in-up">
              <h2 className="text-3xl font-bold mb-4">
                Why Choose Our <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">HR Consulting</span>
              </h2>
              <p className="text-lg text-gray-600">
                Transform your HR operations with our expert guidance
              </p>
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
              <h2 className="text-3xl font-bold mb-4">Our Consulting Process</h2>
              <p className="text-lg text-gray-600">
                A systematic approach to transforming your HR operations
              </p>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: "01", title: "Assessment", description: "Comprehensive analysis of your current HR practices and needs" },
                { step: "02", title: "Strategy", description: "Develop customized HR strategies aligned with your business goals" },
                { step: "03", title: "Implementation", description: "Execute HR solutions with proper change management" },
                { step: "04", title: "Support", description: "Ongoing support and optimization of HR processes" }
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
    style={{ animationDelay: '1s' }}
  ></div>
  <div className="container mx-auto px-6 lg:px-8 relative z-10">
    <div className="text-center text-white animate-fade-in-up">
      <h2 className="text-3xl font-bold mb-4">
        Ready to Transform Your HR Operations?
      </h2>
      <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
        Contact our HR experts today for a free consultation and discover how we can help optimize your workforce.
      </p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Link href="/consultation">
          <Button
            size="lg"
            className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 transform hover:scale-105 transition-all duration-300"
          >
            Schedule Free Consultation
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
