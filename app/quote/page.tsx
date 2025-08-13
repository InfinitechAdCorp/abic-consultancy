"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Send, Building2, Users, Clock, DollarSign } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { useState } from "react"

export default function QuotePage() {
  const { toast } = useToast()
  const [showOtherServices, setShowOtherServices] = useState(false)
  const [companySize, setCompanySize] = useState("")
  const [timeline, setTimeline] = useState("")
  const [budget, setBudget] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const services = [
    "Payroll & Benefits Administration – Processing salaries, tax compliance, SSS, PhilHealth, Pag-IBIG contributions.",
    "Recruitment & Staffing Solutions – End-to-end hiring, onboarding, and workforce planning.",
    "HR Administration & Employee Management – Records management, contracts, performance tracking.",
    "Employee Engagement & Relations – Conflict resolution, company culture programs.",
    "Labor Law Compliance & Risk Management – DOLE compliance, disciplinary procedures, terminations.",
  ]

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsSubmitting(true)

    try {
      const form = e.currentTarget
      const formData = new FormData(form)

      const servicesNeeded: string[] = []
      services.forEach((service) => {
        if (formData.get(service)) {
          servicesNeeded.push(service)
        }
      })

      if (formData.get("otherServices")) {
        servicesNeeded.push("Other services")
      }

      const quoteData = {
        companyName: formData.get("companyName"),
        contactPerson: formData.get("contactPerson"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        companySize: companySize,
        industry: formData.get("industry"),
        servicesNeeded,
        otherServiceName: formData.get("otherServiceName"),
        otherServiceDescription: formData.get("otherServiceDescription"),
        timeline: timeline,
        budget: budget,
        additionalInfo: formData.get("additionalInfo"),
      }

      const response = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quoteData),
      })

      if (response.ok) {
        toast({
          title: "Quote Request Submitted!",
          description: "We'll get back to you within 24 hours with a customized quote.",
        })
        form.reset()
        setTimeout(() => {
          setCompanySize("")
          setTimeline("")
          setBudget("")
          setShowOtherServices(false)
        }, 0)
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to submit quote request")
      }
    } catch (error) {
      console.error("Quote submission error:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit quote request. Please try again.",
        variant: "destructive",
      })
    } finally {
      setTimeout(() => {
        setIsSubmitting(false)
      }, 0)
    }
  }

  const handleOtherServicesChange = (checked: boolean) => {
    setShowOtherServices(checked)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />

      <main className="flex-1 p-4 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-4">
             
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Get Your HR Outsourcing Quote</h1>
            <p className="text-sm text-gray-600">
              Tell us about your business needs and we'll provide a customized quote.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 min-h-[600px]">
            <div className="lg:col-span-2">
              <Card className="shadow-xl border-0">
                <CardHeader className="pb-3 pt-4">
                  <CardTitle className="text-lg">Quote Request Form</CardTitle>
                  <CardDescription className="text-sm">
                    Please fill out the required fields to receive an accurate quote.
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <Label htmlFor="companyName" className="text-xs font-medium">
                          Company Name *
                        </Label>
                        <Input id="companyName" name="companyName" required className="h-9" />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="contactPerson" className="text-xs font-medium">
                          Contact Person *
                        </Label>
                        <Input id="contactPerson" name="contactPerson" required className="h-9" />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="email" className="text-xs font-medium">
                          Email Address *
                        </Label>
                        <Input id="email" name="email" type="email" required className="h-9" />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="phone" className="text-xs font-medium">
                          Phone Number *
                        </Label>
                        <Input id="phone" name="phone" type="tel" required className="h-9" />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="companySize" className="text-xs font-medium">
                          Company Size *
                        </Label>
                        <Select name="companySize" required value={companySize} onValueChange={setCompanySize}>
                          <SelectTrigger className="h-9">
                            <SelectValue placeholder="Select company size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-10">1-10 employees</SelectItem>
                            <SelectItem value="11-50">11-50 employees</SelectItem>
                            <SelectItem value="51-100">51-100 employees</SelectItem>
                            <SelectItem value="101-500">101-500 employees</SelectItem>
                            <SelectItem value="500+">500+ employees</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="industry" className="text-xs font-medium">
                          Industry *
                        </Label>
                        <Input
                          id="industry"
                          name="industry"
                          required
                          placeholder="e.g., Technology, Manufacturing"
                          className="h-9"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs font-medium">Services Needed *</Label>
                      <div className="grid grid-cols-1 gap-2">
                        {services.map((service) => (
                          <div key={service} className="flex items-start space-x-2">
                            <Checkbox id={service} name={service} className="h-4 w-4 mt-0.5" />
                            <Label htmlFor={service} className="text-xs font-normal leading-tight">
                              {service}
                            </Label>
                          </div>
                        ))}
                        <div className="flex items-start space-x-2">
                          <Checkbox
                            id="otherServices"
                            name="otherServices"
                            className="h-4 w-4 mt-0.5"
                            onCheckedChange={handleOtherServicesChange}
                          />
                          <Label htmlFor="otherServices" className="text-xs font-normal leading-tight">
                            Other services
                          </Label>
                        </div>
                        {showOtherServices && (
                          <div className="ml-6 space-y-2 border-l-2 border-gray-200 pl-4">
                            <div className="space-y-1">
                              <Label htmlFor="otherServiceName" className="text-xs font-medium">
                                Service Name *
                              </Label>
                              <Input
                                id="otherServiceName"
                                name="otherServiceName"
                                required={showOtherServices}
                                placeholder="e.g., Training & Development"
                                className="h-9"
                              />
                            </div>
                            <div className="space-y-1">
                              <Label htmlFor="otherServiceDescription" className="text-xs font-medium">
                                Service Description *
                              </Label>
                              <Textarea
                                id="otherServiceDescription"
                                name="otherServiceDescription"
                                required={showOtherServices}
                                placeholder="Describe the specific service you need..."
                                className="h-16 resize-none text-sm"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <Label htmlFor="timeline" className="text-xs font-medium">
                          Timeline
                        </Label>
                        <Select name="timeline" value={timeline} onValueChange={setTimeline}>
                          <SelectTrigger className="h-9">
                            <SelectValue placeholder="Select timeline" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="immediate">Immediate (within 1 month)</SelectItem>
                            <SelectItem value="1-3months">1-3 months</SelectItem>
                            <SelectItem value="3-6months">3-6 months</SelectItem>
                            <SelectItem value="6months+">6+ months</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="budget" className="text-xs font-medium">
                          Monthly Budget
                        </Label>
                        <Select name="budget" value={budget} onValueChange={setBudget}>
                          <SelectTrigger className="h-9">
                            <SelectValue placeholder="Select budget range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="under-50k">Under ₱50,000</SelectItem>
                            <SelectItem value="50k-100k">₱50,000 - ₱100,000</SelectItem>
                            <SelectItem value="100k-200k">₱100,000 - ₱200,000</SelectItem>
                            <SelectItem value="200k-500k">₱200,000 - ₱500,000</SelectItem>
                            <SelectItem value="500k+">₱500,000+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="additionalInfo" className="text-xs font-medium">
                        Additional Information
                      </Label>
                      <Textarea
                        id="additionalInfo"
                        name="additionalInfo"
                        placeholder="Any specific requirements or challenges..."
                        className="h-16 resize-none text-sm"
                      />
                    </div>

                    <div className="pt-2">
                      <Button
                        type="submit"
                        size="sm"
                        className="w-full h-10 text-sm bg-teal-500 hover:bg-teal-600 text-white"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : "Submit Quote Request"}
                        {!isSubmitting && <Send className="ml-2 h-4 w-4" />}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <div className="text-center space-y-4">
                  <Building2 className="h-12 w-12 text-blue-600 mx-auto" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Why Choose Our HR Services?</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      We provide comprehensive HR solutions tailored to your business needs, helping you focus on growth
                      while we handle your human resources.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Users className="h-6 w-6 text-green-600" />
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">Expert Team</h4>
                      <p className="text-xs text-gray-600">Certified HR professionals</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-6 w-6 text-blue-600" />
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">24/7 Support</h4>
                      <p className="text-xs text-gray-600">Round-the-clock assistance</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <DollarSign className="h-6 w-6 text-purple-600" />
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">Cost Effective</h4>
                      <p className="text-xs text-gray-600">Reduce HR overhead costs</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
