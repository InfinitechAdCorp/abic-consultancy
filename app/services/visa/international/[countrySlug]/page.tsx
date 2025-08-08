"use client"
import React from 'react'
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Image from 'next/image'
import { Clock, FileText, Info, ArrowLeft, ArrowRight, CheckCircle, HelpCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { countriesData } from '@/lib/data' // Import countriesData

interface CountryPageProps {
  params: Promise<{ countrySlug: string }>
}

export default function CountryPage({ params }: CountryPageProps) {
  // Unwrap the params promise using React.use()
  const unwrappedParams = React.use(params);
  const country = countriesData.find(c => c.slug === unwrappedParams.countrySlug);

  if (!country) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-gray-50">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Country Not Found</h1>
        <p className="text-lg text-gray-600 mb-8">The requested visa information could not be found.</p>
        <Link href="/services/visa/international" passHref>
          <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-3">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Destinations
          </Button>
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navigation />
      {/* Hero Section for Country */}
      <section className="relative py-20 bg-gradient-to-br from-green-50 via-blue-50 to-white overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-green-200/10 rounded-full blur-3xl animate-blob-subtle"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-200/10 rounded-full blur-3xl animate-blob-subtle" style={{ animationDelay: '1s' }}></div>
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
              {country.name} <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Visa</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Your comprehensive guide to obtaining a visa for {country.name.replace(' Visa', '')}
            </p>
            <Link href="/services/visa/international" passHref>
              <Button variant="outline" className="border-2 border-green-500 text-green-600 hover:bg-green-50 px-8 py-3 transform hover:scale-105 transition-all duration-300">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to All Destinations
              </Button>
            </Link>
          </div>
        </div>
      </section>
      {/* Country Details Section */}
      <section className="py-16 bg-gradient-to-br from-white to-gray-50 flex-grow relative">
        <div className="absolute inset-0 opacity-5 bg-[url('/subtle-pattern.png')] bg-repeat animate-pulse-subtle"></div>
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main Image and Overview */}
            <div className="lg:col-span-2 space-y-8">
              <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={country.image || "/placeholder.svg?height=384&width=768&query=country landscape"}
                  alt={country.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Processing Time */}
                <div className="p-6 flex flex-col h-full">
                  <div className="flex items-center mb-2">
                    <Clock className="h-5 w-5 mr-2 text-blue-500" />
                    <h3 className="text-xl font-bold text-gray-800 whitespace-nowrap">Processing Time</h3>
                  </div>
                  <p className="text-base text-gray-700">{country.processing}</p>
                </div>
                {/* Key Requirements */}
                <div className="p-6 flex flex-col h-full">
                  <div className="flex items-center mb-2">
                    <FileText className="h-5 w-5 mr-2 text-green-500" />
                    <h3 className="text-xl font-bold text-gray-800 whitespace-nowrap">Key Requirements</h3> {/* Added whitespace-nowrap */}
                  </div>
                  <p className="text-base text-gray-700">{country.requirements}</p>
                </div>
                {/* Good For */}
                <div className="p-6 flex flex-col h-full">
                  <div className="flex items-center mb-2">
                    <Info className="h-5 w-5 mr-2 text-purple-500" />
                    <h3 className="text-xl font-bold text-gray-800 whitespace-nowrap">Good For</h3>
                  </div>
                  <p className="text-base text-gray-700">{country.goodFor}</p>
                </div>
              </div>
            </div>
            {/* Visa Types Section - Now displayed directly */}
            <div className="lg:col-span-1 space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Visa Types</h3>
              {country.visaTypes && country.visaTypes.length > 0 ? (
                <div className="space-y-4"> {/* Replaced Accordion with a simple div for spacing */}
                  {country.visaTypes.map((visaType, index) => (
                    <Card key={index} className="border-0 shadow-md p-4"> {/* Each visa type in a Card */}
                      <h4 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                        <HelpCircle className="h-5 w-5 mr-2 text-blue-500" />
                        {visaType.type}
                      </h4>
                      <p className="text-gray-700 mb-2">{'Description: '}{visaType.description}</p>
                      <p className="text-gray-700 mb-2"><strong>Duration:</strong> {visaType.duration}</p>
                      <h5 className="font-semibold mt-4 mb-2 text-gray-800">Specific Requirements:</h5>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        {visaType.requirements.map((req, reqIndex) => (
                          <li key={reqIndex} className="text-sm">{req}</li>
                        ))}
                      </ul>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No specific visa types listed at this time.</p>
              )}
            </div>
          </div>
          {/* Required Documents Section */}
          <div className="max-w-6xl mx-auto mt-16">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Required Documents Checklist</h3>
            {country.documents && country.documents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {country.documents.map((doc, index) => (
                  <Card key={index} className="border-0 shadow-md">
                    <CardContent className="p-4 flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <p className="text-base text-gray-700">{doc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-center">No specific document checklist available at this time.</p>
            )}
          </div>
          {/* Application Process Section */}
          <div className="max-w-6xl mx-auto mt-16">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Application Process for {country.name.replace(' Visa', '')}</h3>
            {country.applicationSteps && country.applicationSteps.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {country.applicationSteps.map((step, index) => (
                  <Card key={index} className="text-center border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">{`0${index + 1}`}</span>
                      </div>
                      <h4 className="text-lg font-semibold mb-2">{step.title}</h4>
                      <p className="text-gray-700 text-sm">{step.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-center">Application steps not available at this time.</p>
            )}
          </div>
          {/* FAQs Section */}
          <div className="max-w-4xl mx-auto mt-16">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Frequently Asked Questions</h3>
            {country.faqs && country.faqs.length > 0 ? (
              <div className="space-y-4"> {/* Replaced Accordion with a simple div for spacing */}
                {country.faqs.map((faq, index) => (
                  <Card key={index} className="border-0 shadow-md p-4"> {/* Each FAQ in a Card */}
                    <h4 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                      <HelpCircle className="h-5 w-5 mr-2 text-blue-500" />
                      {faq.question}
                    </h4>
                    <p className="text-gray-700">{faq.answer}</p>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-center">No FAQs available for this destination at this time.</p>
            )}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-green-50 via-blue-50 to-white relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-green-200/10 rounded-full blur-3xl animate-blob-subtle"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-200/10 rounded-full blur-3xl animate-blob-subtle" style={{ animationDelay: '1s' }}></div>
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center text-gray-800 animate-fade-in-up">
            <h2 className="text-3xl font-bold mb-4">Ready to Apply for Your {country.name.replace(' Visa', '')} Visa?</h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Our visa specialists will guide you through the entire application process for {country.name.replace(' Visa', '')}.
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
