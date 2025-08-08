"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { ArrowRight, Calendar, CheckCircle, ExternalLink, Building, Heart, Users } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion" // Import motion for animations

const visaTypes = [
  {
    title: "9G PRE-ARRANGED EMPLOYMENT VISA – WORK VISA",
    description: "This is a work visa issued to foreign nationals who have been hired by a Philippine-based company. The employer must sponsor the visa and secure an Alien Employment Permit (AEP) from the Department of Labor and Employment (DOLE).",
    validity: "Valid for one to three years and renewable",
    icon: Building,
    link: "https://immigration.gov.ph/resources/visa-application-status/"
  },
  {
    title: "SPECIAL RESIDENT RETIREE'S VISA (SRRV) – RETIREMENT VISA",
    description: "A long-term visa for foreign retirees who wish to live permanently in the Philippines. Applicants must deposit a set amount in a Philippine bank (varies based on age and type of SRRV).",
    validity: "Offers multiple-entry privileges and exemption from certain taxes",
    icon: Heart
  },
  {
    title: "SPECIAL INVESTOR'S RESIDENT VISA (SIRV)",
    description: "A visa for foreign investors who wish to reside indefinitely in the Philippines. Requires an investment of at least USD 75,000 in eligible industries as approved by the Board of Investments (BOI).",
    validity: "Provides permanent residency as long as the investment remains in the country",
    icon: Building
  },
  {
    title: "QUOTA IMMIGRANT VISA (13 QUOTA VISA)",
    description: "A limited annual visa (only 50 visas issued per nationality per year) for highly qualified foreign nationals. Requires proof of good moral character, financial self-sufficiency, and at least USD 50,000 in bank deposit or investment.",
    validity: "Grants permanent residence and allows the holder to engage in business or employment",
    icon: Users
  },
  {
    title: "13A MARRIAGE VISA – FOR SPOUSES OF FILIPINOS",
    description: "A permanent residency visa for foreign nationals married to a Filipino citizen. Initially issued as a one-year probationary visa, then converted into permanent status.",
    validity: "Allows the holder to live, work, and study in the Philippines without needing a work permit",
    icon: Heart
  }
]

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
}

export default function LongTermVisaPage() {
  const timelineSteps = [
    { phase: "Initial Consultation", duration: "1-2 days", description: "Assessment of eligibility and document requirements" },
    { phase: "Document Preparation", duration: "2-4 weeks", description: "Gathering and authentication of required documents" },
    { phase: "Application Submission", duration: "1-2 days", description: "Filing of complete application with relevant agencies" },
    { phase: "Processing & Review", duration: "4-12 weeks", description: "Government review and background verification" },
    { phase: "Visa Approval", duration: "1-2 days", description: "Visa issuance and collection of documents" }
  ];

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
              Long Term <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Visa</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Comprehensive assistance for long-term visa applications and permanent residency in the Philippines
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button size="lg" className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-3 transform hover:scale-105 transition-all duration-300">
                Start Visa Application
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-green-500 text-green-600 hover:bg-green-50 px-8 py-3 transform hover:scale-105 transition-all duration-300">
                <ExternalLink className="mr-2 h-4 w-4" />
                Check Agenda List
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Visa Types - Redesigned to a grid */}
      <section className="py-16 bg-gradient-to-br from-white to-gray-50 flex-grow relative">
        <div className="absolute inset-0 opacity-5 bg-[url('/subtle-pattern.png')] bg-repeat animate-pulse-subtle"></div>
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 animate-fade-in-up">
              <h2 className="text-3xl font-bold mb-4">
                Long Term <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Visa Options</span>
              </h2>
              <p className="text-lg text-gray-700">
                Various long-term visa categories for extended stay and permanent residency
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visaTypes.map((visa, index) => {
                const Icon = visa.icon
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
                      <CardHeader>
                        <div className="flex items-start space-x-4">
                          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 group-hover:rotate-3 transition-all duration-300">
                            <Icon className="h-8 w-8 text-white" />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-xl mb-3">{visa.title}</CardTitle>
                            <CardDescription className="text-base leading-relaxed mb-4">
                              {visa.description}
                            </CardDescription>
                            <div className="flex items-center text-sm text-green-600 font-semibold">
                              <Calendar className="h-4 w-4 mr-2" />
                              {visa.validity}
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      {visa.link && (
                        <CardContent className="pt-0">
                          <Button asChild className="w-full mt-4 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white transform hover:scale-105 transition-all duration-300">
                            <a href={visa.link} target="_blank" rel="noopener noreferrer">
                              Check Application Status
                              <ExternalLink className="ml-2 h-4 w-4" />
                            </a>
                          </Button>
                        </CardContent>
                      )}
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-gradient-to-br from-green-50 via-blue-50 to-white relative">
        <div className="absolute inset-0 opacity-5 bg-[url('/subtle-pattern.png')] bg-repeat animate-pulse-subtle animation-delay-500"></div>
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 animate-fade-in-up">
              <h2 className="text-3xl font-bold mb-4">
                Long Term Visa <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Benefits</span>
              </h2>
              <p className="text-lg text-gray-700">
                Advantages of obtaining a long-term visa for the Philippines
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[{ title: "Multiple Entry Privileges", description: "Enter and exit the Philippines multiple times during visa validity" },
                { title: "Extended Stay Duration", description: "Stay in the Philippines for extended periods based on visa type" },
                { title: "Work Authorization", description: "Legal authorization to work in the Philippines (for applicable visas)" },
                { title: "Path to Residency", description: "Potential pathway to permanent residency and citizenship" }
              ].map((benefit, index) => (
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
                        <CheckCircle className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold mb-3">{benefit.title}</h3>
                      <p className="text-gray-700 text-sm leading-relaxed">{benefit.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-16 bg-gradient-to-br from-white to-gray-50 relative">
        <div className="absolute inset-0 opacity-5 bg-[url('/subtle-pattern.png')] bg-repeat animate-pulse-subtle animation-delay-1000"></div>
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-full mx-auto">
            <div className="text-center mb-12 animate-fade-in-up">
              <h2 className="text-3xl font-bold mb-4">
                Application <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Timeline</span>
              </h2>
              <p className="text-lg text-gray-700">
                A step-by-step guide through the visa application process
              </p>
            </div>

            <div className="relative flex flex-nowrap py-8 overflow-x-auto scrollbar-hide justify-center items-start">
              {/* Horizontal line */}
              <div
                className="absolute top-[calc(50%-20px)] h-0.5 bg-gradient-to-r from-gray-300 to-gray-200 z-0"
                style={{
                  width: `${(timelineSteps.length - 1) * (240 + 48)}px`, // (card width + margin-right) * (number of steps - 1)
                  left: `calc(50% - ${((timelineSteps.length - 1) * (240 + 48)) / 2}px + 20px)`, // Center the line, adjust for circle width
                }}
              ></div>

              {timelineSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={cardVariants}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex-shrink-0 w-[240px] relative z-10 flex flex-col items-center"
                  style={{ marginRight: index < timelineSteps.length - 1 ? '48px' : '0' }} // Increased margin-right
                >
                  {/* Circle indicator */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center flex-shrink-0 border-4 border-white shadow-md mb-4"> {/* Added mb-4 */}
                    <span className="text-white font-bold text-sm">{index + 1}</span>
                  </div>
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                    <CardContent className="p-6 text-center">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{step.phase}</h3>
                      <p className="text-gray-700 text-sm mb-4">{step.description}</p>
                      <span className="text-sm text-green-600 font-semibold">
                        {step.duration}
                      </span>
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
            <h2 className="text-3xl font-bold mb-4">Ready to Apply for Your Long Term Visa?</h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Our visa specialists will guide you through the entire long-term visa application process
            </p>
            <Button size="lg" className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-3 transform hover:scale-105 transition-all duration-300">
              Start Long Term Visa Application
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
        /* Custom scrollbar hide for better aesthetics */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
    </main>
  )
}
