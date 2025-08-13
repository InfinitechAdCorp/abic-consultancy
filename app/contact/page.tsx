"use client" // Mark as client component for animations

import type React from "react"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast" // Import useToast
import { Loader2 } from "lucide-react" // Import Loader2 for loading spinner

export default function ContactPage() {
  const [isVisibleContactInfo, setIsVisibleContactInfo] = useState(false)
  const [animatedContactCards, setAnimatedContactCards] = useState<number[]>([])
  const [isVisibleFAQ, setIsVisibleFAQ] = useState(false)
  const [animatedFAQCards, setAnimatedFAQCards] = useState<number[]>([])

  // Form states
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [service, setService] = useState("")
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const { toast } = useToast() // Initialize toast

  const contactInfo = [
    {
      icon: MapPin,
      title: "Office Address",
      details: ["Makati City, Philippines", "Business District Area"],
      color: "from-green-500 to-green-600",
    },
    {
      icon: Phone,
      title: "Phone Number",
      details: ["+63 (2) 8123-4567", "+63 917-123-4567"],
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Mail,
      title: "Email Address",
      details: ["info@abic-consultancy.com", "support@abic-consultancy.com"],
      color: "from-green-400 to-blue-500",
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat: 9:00 AM - 1:00 PM"],
      color: "from-blue-400 to-green-500",
    },
  ]

  const faqs = [
    {
      question: "How long does it take to set up a business in the Philippines?",
      answer:
        "The timeline varies depending on the type of business and requirements, but typically ranges from 2-8 weeks for complete setup including all permits and licenses.",
    },
    {
      question: "What documents do I need for visa application?",
      answer:
        "Required documents vary by visa type, but generally include passport, application forms, financial statements, and supporting documents specific to your visa category.",
    },
    {
      question: "Do you provide ongoing support after business setup?",
      answer:
        "Yes, we offer comprehensive ongoing support including compliance monitoring, tax filing assistance, and business advisory services.",
    },
    {
      question: "What are your consultation fees?",
      answer:
        "We offer free initial consultations. Our service fees vary based on the complexity and scope of services required. Contact us for a detailed quote.",
    },
  ]

  useEffect(() => {
    const contactInfoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisibleContactInfo(true)
            contactInfo.forEach((_, index) => {
              setTimeout(() => {
                setAnimatedContactCards((prev) => [...prev, index])
              }, index * 150)
            })
          }
        })
      },
      { threshold: 0.1 },
    )

    const faqObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisibleFAQ(true)
            faqs.forEach((_, index) => {
              setTimeout(() => {
                setAnimatedFAQCards((prev) => [...prev, index])
              }, index * 150)
            })
          }
        })
      },
      { threshold: 0.1 },
    )

    const contactInfoSection = document.getElementById("contact-info-section")
    const faqSection = document.getElementById("faq-section")

    if (contactInfoSection) contactInfoObserver.observe(contactInfoSection)
    if (faqSection) faqObserver.observe(faqSection)

    return () => {
      contactInfoObserver.disconnect()
      faqObserver.disconnect()
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          service,
          message,
        }),
      })

      if (response.ok) {
        toast({
          title: "Message Sent!",
          description: "We've received your message and will get back to you shortly.",
          variant: "default",
        })
        // Clear form fields
        setFirstName("")
        setLastName("")
        setEmail("")
        setPhone("")
        setService("")
        setMessage("")
      } else {
        const errorData = await response.json()
        toast({
          title: "Submission Failed",
          description: errorData.message || "There was an error sending your message. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Network Error",
        description: "Could not connect to the server. Please check your internet connection.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen">
      <Navigation />
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-100 via-green-100 to-purple-100 overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('/subtle-pattern.png')] bg-repeat animate-pulse-subtle"></div>
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-green-200/10 rounded-full blur-3xl animate-blob-subtle"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-200/10 rounded-full blur-3xl animate-blob-subtle"
          style={{ animationDelay: "1s" }}
        ></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
              Contact{" "}
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Us</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Get in touch with our experts for personalized business consulting solutions
            </p>
          </div>
        </div>
      </section>
      {/* Contact Information */}
      {/* <section
        id="contact-info-section"
        className="relative py-20 bg-gradient-to-br from-purple-50 via-blue-50 to-green-50"
      >
        <div className="absolute inset-0 opacity-5 bg-[url('/subtle-pattern.png')] bg-repeat animate-pulse-subtle animation-delay-500"></div>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div
              className={`text-center mb-16 transition-all duration-1000 ${isVisibleContactInfo ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
            >
              <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
              <p className="text-xl text-muted-foreground">We're here to help you with all your business needs</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {contactInfo.map((info, index) => {
                const Icon = info.icon
                const isAnimated = animatedContactCards.includes(index)
                return (
                  <Card
                    key={index}
                    className={`text-center border-0 shadow-lg hover:shadow-xl transition-all duration-700 group h-full ${
                      isAnimated ? "translate-y-0 opacity-100 scale-100" : "translate-y-10 opacity-0 scale-95"
                    } hover:-translate-y-2 hover:scale-105`}
                    style={{ transitionDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-6">
                      <div
                        className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${info.color} flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                      >
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold mb-3">{info.title}</h3>
                      <div className="space-y-1">
                        {info.details.map((detail, detailIndex) => (
                          <p key={detailIndex} className="text-muted-foreground text-sm">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section> */}
      {/* Contact Form & Map */}
      <section className="relative py-20 bg-gradient-to-br from-green-50 via-purple-50 to-blue-50">
        <div className="absolute inset-0 opacity-5 bg-[url('/subtle-pattern.png')] bg-repeat animate-pulse-subtle animation-delay-1000"></div>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 animate-fade-in-up">
              {/* Contact Form */}
              <Card className="border-0 shadow-xl p-6">
                <CardHeader className="px-0 pt-0 pb-4">
                  <CardTitle className="text-3xl font-bold">Send us a Message</CardTitle>
                  <CardDescription className="text-lg text-muted-foreground">
                    Fill out the form below and we'll get back to you within 24 hours
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 px-0 pb-0">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          placeholder="John"
                          className="h-12 text-base"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          placeholder="Doe"
                          className="h-12 text-base"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        className="h-12 text-base"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                     <Input
  id="phone"
  type="tel"
  placeholder="+63 917-123-4567"
  className="h-12 text-base"
  value={phone}
  onChange={(e) => {
    // Allow only numbers, spaces, dashes, parentheses, and plus sign
    const filteredValue = e.target.value.replace(/[^0-9+\-\s()]/g, "")
    setPhone(filteredValue)
  }}
/>

                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="service">Service Interested In</Label>
                      <Select value={service} onValueChange={setService}>
                        <SelectTrigger id="service" className="h-12 text-base">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="business-setup">Business Setup</SelectItem>
                          <SelectItem value="visa-services">Visa Services</SelectItem>
                          <SelectItem value="tax-accounting">Tax & Accounting</SelectItem>
                          <SelectItem value="hr-solutions">HR Solutions</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us about your business needs..."
                        className="min-h-[150px] text-base"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full h-12 text-lg bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
              {/* Map & Additional Info */}
              <div className="space-y-8">
                <Card className="border-0 shadow-xl overflow-hidden">
                  <CardContent className="p-0">
                    <div className="aspect-video w-full h-full">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.686618330025!2d121.01093307574082!3d14.559904978070435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c90b830e5f29%3A0x89fe307dfecd3c0d!2sCampos%20Rueda%20Building!5e0!3m2!1sen!2sph!4v1754469721002!5m2!1sen!2sph"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Google Map of Campos Rueda Building"
                      ></iframe>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-xl p-6">
                  <CardHeader className="px-0 pt-0 pb-4">
                    <CardTitle className="text-2xl font-bold">Why Choose ABIC?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 px-0 pb-0">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mt-2" />
                      <div>
                        <h4 className="font-semibold text-lg">Expert Consultation</h4>
                        <p className="text-sm text-muted-foreground">
                          Professional guidance from experienced consultants
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mt-2" />
                      <div>
                        <h4 className="font-semibold text-lg">Fast Processing</h4>
                        <p className="text-sm text-muted-foreground">Quick turnaround times for all services</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mt-2" />
                      <div>
                        <h4 className="font-semibold text-lg">Comprehensive Support</h4>
                        <p className="text-sm text-muted-foreground">End-to-end business solutions</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <section id="faq-section" className="relative py-20 bg-gradient-to-br from-white to-gray-50">
        <div className="absolute inset-0 opacity-5 bg-[url('/subtle-pattern.png')] bg-repeat animate-pulse-subtle animation-delay-1500"></div>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div
              className={`text-center mb-12 transition-all duration-1000 ${isVisibleFAQ ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
            >
              <h2 className="text-3xl font-bold mb-4">
                Frequently Asked{" "}
                <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Questions
                </span>
              </h2>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                Find answers to common inquiries about our services
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {faqs.map((faq, index) => {
                const isAnimated = animatedFAQCards.includes(index)
                return (
                  <Card
                    key={index}
                    className={`border-0 shadow-lg hover:shadow-xl transition-all duration-700 group h-full ${
                      isAnimated ? "translate-y-0 opacity-100 scale-100" : "translate-y-10 opacity-0 scale-95"
                    } hover:-translate-y-2 hover:scale-105`}
                    style={{ transitionDelay: `${index * 0.1}s` }}
                  >
                    <CardHeader className="pb-4">
                      <CardTitle className="text-xl font-semibold">{faq.question}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardDescription className="text-gray-700 leading-relaxed">{faq.answer}</CardDescription>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
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
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s infinite ease-in-out;
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
