"use client";
import { useState, useEffect } from "react"
import { User, Building2, Calendar, MessageSquare, CheckCircle, ArrowRight, Facebook, MessageCircle, Mail, Phone, Clock, ChevronLeft, ChevronRight, Briefcase, FileText, CreditCard, Award, RotateCcw, XCircle, Plane, HelpCircle, Globe, Plus, X, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils";
import { format } from "date-fns"
import { useToast } from "@/components/ui/use-toast"

const serviceOptions = [
  {
    value: "business-setup",
    label: "Business Setup & Registration",
    icon: Building2,
    color: "from-blue-500 to-blue-600",
    description: "Complete business registration and setup services"
  },
  {
    value: "visa-services",
    label: "Visa & Immigration Services",
    icon: Plane,
    color: "from-purple-500 to-purple-600",
    description: "Visa applications and immigration assistance"
  },
  {
    value: "tax-accounting",
    label: "Tax & Accounting Services",
    icon: CreditCard,
    color: "from-green-500 to-green-600",
    description: "Tax filing and accounting solutions"
  },
  {
    value: "license-permit",
    label: "License & Permit Applications",
    icon: Award,
    color: "from-orange-500 to-orange-600",
    description: "Professional license and permit processing"
  },
  {
    value: "business-renewal",
    label: "Business Renewal Services",
    icon: RotateCcw,
    color: "from-teal-500 to-teal-600",
    description: "Renewal of business licenses and permits"
  },
  {
    value: "amendment",
    label: "Business Amendment Services",
    icon: FileText,
    color: "from-indigo-500 to-indigo-600",
    description: "Business document amendments and updates"
  },
  {
    value: "consultation",
    label: "General Business Consultation",
    icon: Briefcase,
    color: "from-pink-500 to-pink-600",
    description: "Expert business advice and consultation"
  },
  {
    value: "other",
    label: "Other Services",
    icon: HelpCircle,
    color: "from-gray-500 to-gray-600",
    description: "Custom services tailored to your needs"
  }
]

const timeSlots = [
  { value: "9am-10am", label: "9:00 AM" },
  { value: "10am-11am", label: "10:00 AM" },
  { value: "11am-12pm", label: "11:00 AM" },
  { value: "1pm-2pm", label: "1:00 PM" },
  { value: "2pm-3pm", label: "2:00 PM" },
  { value: "3pm-4pm", label: "3:00 PM" },
  { value: "4pm-5pm", label: "4:00 PM" }
]

interface Country {
  name: string
  code: string
  flag?: string
}

interface ConsultationFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  country: string
  serviceType: string
  otherServiceDetails: string
  consultationType: string
  preferredDate: string
  preferredTime: string
  message: string
  agreeToTerms: boolean
  subscribeNewsletter: boolean
}

interface FormErrors {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  country?: string
  serviceType?: string
  otherServiceDetails?: string
  preferredDate?: string
  preferredTime?: string
  agreeToTerms?: string
}

// Generate full month calendar with navigation
const generateFullMonthCalendar = (year: number, month: number) => {
  const today = new Date()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const daysInMonth = lastDay.getDate()
  const startingDayOfWeek = firstDay.getDay()

  const dates = []
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startingDayOfWeek; i++) {
    dates.push(null)
  }

  // Add all days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day)
    const isPast = date < today && date.toDateString() !== today.toDateString()

    dates.push({
      date: date.toISOString().split('T')[0],
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      dayNum: day.toString(),
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      fullDate: date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      isToday: date.toDateString() === today.toDateString(),
      isPast: isPast,
      isDisabled: isPast
    })
  }

  return {
    dates,
    monthName: monthNames[month],
    year
  }
}

export default function ConsultationForm() {
  const [formData, setFormData] = useState<ConsultationFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    serviceType: "",
    otherServiceDetails: "",
    consultationType: "online",
    preferredDate: "",
    preferredTime: "",
    message: "",
    agreeToTerms: false,
    subscribeNewsletter: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [activeTab, setActiveTab] = useState("personal")
  const [countries, setCountries] = useState<Country[]>([])
  const [loadingCountries, setLoadingCountries] = useState(true)
  const [floatingMenuOpen, setFloatingMenuOpen] = useState(false)

  // Calendar state
  const [currentCalendarMonth, setCurrentCalendarMonth] = useState(new Date().getMonth())
  const [currentCalendarYear, setCurrentCalendarYear] = useState(new Date().getFullYear())
  const [calendarData, setCalendarData] = useState(generateFullMonthCalendar(new Date().getFullYear(), new Date().getMonth()))
  const [timeSlotCounts, setTimeSlotCounts] = useState<Record<string, number>>({})
  const [loadingTimeSlots, setLoadingTimeSlots] = useState(false)

  const fetchTimeSlotAvailability = async (date: string) => {
    try {
      setLoadingTimeSlots(true)
      const response = await fetch(`/api/consultations/time-slots?date=${date}`)
      const result = await response.json()

      if (result.success) {
        setTimeSlotCounts(result.data)
      }
    } catch (error) {
      console.error('Failed to fetch time slot availability:', error)
    } finally {
      setLoadingTimeSlots(false)
    }
  }

  // Fetch countries from REST Countries API
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2,flag')
        const data = await response.json()

        const formattedCountries: Country[] = data
          .map((country: any) => ({
            name: country.name.common,
            code: country.cca2,
            flag: country.flag
          }))
          .sort((a: Country, b: Country) => a.name.localeCompare(b.name))

        // Put Philippines at the top
        const philippines = formattedCountries.find(c => c.code === 'PH')
        const otherCountries = formattedCountries.filter(c => c.code !== 'PH')

        if (philippines) {
          setCountries([philippines, ...otherCountries])
        } else {
          setCountries(formattedCountries)
        }
      } catch (error) {
        console.error('Failed to fetch countries:', error)
        // Fallback to basic list
        setCountries([
          { name: "Philippines", code: "PH", flag: "🇵🇭" },
          { name: "United States", code: "US", flag: "🇺🇸" },
          { name: "Canada", code: "CA", flag: "🇨🇦" },
          { name: "Australia", code: "AU", flag: "🇦🇺" },
          { name: "United Kingdom", code: "GB", flag: "🇬🇧" },
          { name: "Singapore", code: "SG", flag: "🇸🇬" },
          { name: "Japan", code: "JP", flag: "🇯🇵" },
          { name: "South Korea", code: "KR", flag: "🇰🇷" }
        ])
      } finally {
        setLoadingCountries(false)
      }
    }
    fetchCountries()
  }, [])

  // Update calendar when month/year changes
  useEffect(() => {
    setCalendarData(generateFullMonthCalendar(currentCalendarYear, currentCalendarMonth))
  }, [currentCalendarMonth, currentCalendarYear])

  // Fetch time slot availability when preferred date changes
  useEffect(() => {
    if (formData.preferredDate) {
      fetchTimeSlotAvailability(formData.preferredDate)
    }
  }, [formData.preferredDate])

  const validateForm = () => {
    const newErrors: FormErrors = {}
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid"
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
    if (!formData.country) newErrors.country = "Please select your country"
    if (!formData.serviceType) newErrors.serviceType = "Please select a service type"
    if (formData.serviceType === "other" && !formData.otherServiceDetails.trim()) {
      newErrors.otherServiceDetails = "Please describe the service you need"
    }
    if (!formData.preferredDate) newErrors.preferredDate = "Please select a preferred date"
    if (!formData.preferredTime) newErrors.preferredTime = "Please select a preferred time"
    if (!formData.agreeToTerms) newErrors.agreeToTerms = "You must agree to the terms"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast({
        variant: "destructive",
        title: "Form Validation Error",
        description: "Please fill in all required fields correctly.",
      })
      return
    }
    setIsSubmitting(true)
    try {
      // Submit to Next.js API route (which handles Laravel backend + email)
      const response = await fetch('/api/consultations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
      const result = await response.json()
      if (!response.ok) {
        throw new Error(result.message || 'Failed to submit consultation')
      }

      console.log("Form submitted:", formData)

      toast({
        variant: "success",
        title: "Success! 🎉",
        description: "Your consultation request has been submitted successfully and email notifications sent!",
      })

      setIsSubmitted(true)
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        variant: "destructive",
        title: "Submission Error",
        description: "There was an error submitting your form. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof ConsultationFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Only clear errors for fields that exist in FormErrors
    if (field in errors) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleNext = (nextTab: string) => {
    setActiveTab(nextTab)
  }

  const getSelectedDateDisplay = () => {
    if (!formData.preferredDate) return ""
    const selectedDate = calendarData.dates.find(d => d && d.date === formData.preferredDate)
    return selectedDate ? selectedDate.fullDate : ""
  }

  const navigateCalendar = (direction: 'prev' | 'next') => {
    if (direction === 'next') {
      if (currentCalendarMonth === 11) {
        setCurrentCalendarMonth(0)
        setCurrentCalendarYear(currentCalendarYear + 1)
      } else {
        setCurrentCalendarMonth(currentCalendarMonth + 1)
      }
    } else {
      if (currentCalendarMonth === 0) {
        setCurrentCalendarMonth(11)
        setCurrentCalendarYear(currentCalendarYear - 1)
      } else {
        setCurrentCalendarMonth(currentCalendarMonth - 1)
      }
    }
  }

  const canNavigatePrev = () => {
    const today = new Date()
    const currentMonth = today.getMonth()
    const currentYear = today.getFullYear()

    return !(currentCalendarYear === currentYear && currentCalendarMonth === currentMonth)
  }

  return (
    <>
      {/* Responsive Floating Action Buttons */}
     
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with ABIC branding */}

        {/* Form Card */}
        <Card className="bg-white shadow-2xl border-0 overflow-hidden">
          <div className="h-2 lg:h-3 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600"></div>
          <CardHeader className="text-center pb-4 lg:pb-6 bg-gradient-to-r from-green-50 to-blue-50">
            <CardTitle className="text-2xl lg:text-3xl bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Consultation Details</CardTitle>
            <CardDescription className="text-gray-600 text-base lg:text-lg px-4">
              Fill out the form below and we'll get back to you within 24 hours
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 lg:p-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-6 lg:mb-8 bg-gray-100 p-1 lg:p-2 rounded-xl lg:rounded-2xl gap-1">
                <TabsTrigger
                  value="personal"
                  className="flex items-center gap-1 lg:gap-2 rounded-lg lg:rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-blue-500 data-[state=active]:text-white transition-all duration-300 text-xs sm:text-sm"
                >
                  <User className="w-3 h-3 lg:w-4 lg:h-4" />
                  <span className="hidden sm:inline">Personal</span>
                </TabsTrigger>
                <TabsTrigger
                  value="service"
                  className="flex items-center gap-1 lg:gap-2 rounded-lg lg:rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-blue-500 data-[state=active]:text-white transition-all duration-300 text-xs sm:text-sm"
                >
                  <Building2 className="w-3 h-3 lg:w-4 lg:h-4" />
                  <span className="hidden sm:inline">Service</span>
                </TabsTrigger>
                <TabsTrigger
                  value="schedule"
                  className="flex items-center gap-1 lg:gap-2 rounded-lg lg:rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-blue-500 data-[state=active]:text-white transition-all duration-300 text-xs sm:text-sm"
                >
                  <Calendar className="w-3 h-3 lg:w-4 lg:h-4" />
                  <span className="hidden sm:inline">Schedule</span>
                </TabsTrigger>
                <TabsTrigger
                  value="additional"
                  className="flex items-center gap-1 lg:gap-2 rounded-lg lg:rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-blue-500 data-[state=active]:text-white transition-all duration-300 text-xs sm:text-sm"
                >
                  <MessageSquare className="w-3 h-3 lg:w-4 lg:h-4" />
                  <span className="hidden sm:inline">Additional</span>
                </TabsTrigger>
              </TabsList>
              <form onSubmit={handleSubmit} className="space-y-6 lg:space-y-8">
                <TabsContent value="personal" className="space-y-6 lg:space-y-8">
                  {/* Country Field - Full Width at Top */}
                  <div className="space-y-3">
                    <Label htmlFor="country" className="text-base lg:text-lg font-semibold text-gray-700">Country *</Label>
                    <Select
                      value={formData.country}
                      onValueChange={(value) => handleInputChange("country", value)}
                      disabled={loadingCountries}
                    >
                      <SelectTrigger className={`h-12 lg:h-14 text-base lg:text-lg rounded-xl border-2 transition-all duration-300 ${
                        errors.country
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-200 focus:border-blue-500"
                      }`}>
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4 lg:w-5 lg:h-5 text-gray-500" />
                          <SelectValue placeholder={loadingCountries ? "Loading countries..." : "Select your country"} />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country.code} value={country.code}>
                            <div className="flex items-center gap-2">
                              {country.flag && <span className="text-lg">{country.flag}</span>}
                              <span>{country.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.country && (
                      <p className="text-red-500 text-sm font-medium">{errors.country}</p>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    <div className="space-y-3">
                      <Label htmlFor="firstName" className="text-base lg:text-lg font-semibold text-gray-700">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        className={`h-12 lg:h-14 text-base lg:text-lg rounded-xl border-2 transition-all duration-300 ${
                          errors.firstName
                            ? "border-red-500 focus:border-red-500"
                            : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        }`}
                        placeholder="Enter your first name"
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm font-medium">{errors.firstName}</p>
                      )}
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="lastName" className="text-base lg:text-lg font-semibold text-gray-700">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        className={`h-12 lg:h-14 text-base lg:text-lg rounded-xl border-2 transition-all duration-300 ${
                          errors.lastName
                            ? "border-red-500 focus:border-red-500"
                            : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        }`}
                        placeholder="Enter your last name"
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm font-medium">{errors.lastName}</p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    <div className="space-y-3">
                      <Label htmlFor="email" className="text-base lg:text-lg font-semibold text-gray-700">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className={`h-12 lg:h-14 text-base lg:text-lg rounded-xl border-2 transition-all duration-300 ${
                          errors.email
                            ? "border-red-500 focus:border-red-500"
                            : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        }`}
                        placeholder="your.email@example.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm font-medium">{errors.email}</p>
                      )}
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="phone" className="text-base lg:text-lg font-semibold text-gray-700">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className={`h-12 lg:h-14 text-base lg:text-lg rounded-xl border-2 transition-all duration-300 ${
                          errors.phone
                            ? "border-red-500 focus:border-red-500"
                            : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        }`}
                        placeholder="+63 XXX XXX XXXX"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm font-medium">{errors.phone}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-end pt-4 lg:pt-6">
                    <Button
                      type="button"
                      onClick={() => handleNext("service")}
                      className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-6 lg:px-8 py-3 lg:py-4 text-base lg:text-lg font-semibold rounded-xl transform hover:scale-105 transition-all duration-300"
                    >
                      Next <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 ml-2" />
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="service" className="space-y-6 lg:space-y-8">

                  <div className="space-y-4">
                    <Label className="text-lg lg:text-xl font-bold text-gray-800">What service are you interested in? *</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                      {serviceOptions.map((service) => {
                        const IconComponent = service.icon
                        return (
                          <Card
                            key={service.value}
                            className={`cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                              formData.serviceType === service.value
                                ? `bg-gradient-to-r ${service.color} text-white shadow-lg scale-105`
                                : "bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300"
                            }`}
                            onClick={() => handleInputChange("serviceType", service.value)}
                          >
                            <CardContent className="p-3 lg:p-4">
                              <div className="flex flex-col items-center text-center gap-2 lg:gap-3">
                                <div className={`p-2 rounded-lg ${
                                  formData.serviceType === service.value
                                    ? "bg-white/20"
                                    : `bg-gradient-to-r ${service.color} text-white`
                                }`}>
                                  <IconComponent className="w-4 h-4 lg:w-5 lg:h-5" />
                                </div>
                                <div>
                                  <h3 className="font-semibold text-xs lg:text-sm mb-1 leading-tight">{service.label}</h3>
                                  <p className={`text-xs leading-tight ${
                                    formData.serviceType === service.value
                                      ? "text-white/90"
                                      : "text-gray-600"
                                  }`}>
                                    {service.description}
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        )
                      })}
                    </div>
                    {errors.serviceType && (
                      <p className="text-red-500 text-sm font-medium">{errors.serviceType}</p>
                    )}
                  </div>
                  {/* Additional field for "Other Services" */}
                  {formData.serviceType === "other" && (
                    <div className="space-y-3 bg-gradient-to-r from-gray-50 to-blue-50 p-4 lg:p-6 rounded-xl border-2 border-gray-200">
                      <Label htmlFor="otherServiceDetails" className="text-base lg:text-lg font-semibold text-gray-700">Please describe the service you need *</Label>
                      <Textarea
                        id="otherServiceDetails"
                        value={formData.otherServiceDetails}
                        onChange={(e) => handleInputChange("otherServiceDetails", e.target.value)}
                        className={`min-h-[100px] lg:min-h-[120px] text-base lg:text-lg rounded-xl border-2 transition-all duration-300 ${
                          errors.otherServiceDetails
                            ? "border-red-500 focus:border-red-500"
                            : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        }`}
                        placeholder="Please provide details about the specific service you're looking for..."
                        rows={4}
                      />
                      {errors.otherServiceDetails && (
                        <p className="text-red-500 text-sm font-medium">{errors.otherServiceDetails}</p>
                      )}
                    </div>
                  )}
                  <div className="space-y-6 bg-gradient-to-r from-green-50 to-blue-50 p-4 lg:p-6 rounded-xl">
                    <Label className="text-lg lg:text-xl font-bold text-gray-800">Consultation Type</Label>
                    <RadioGroup
                      value={formData.consultationType}
                      onValueChange={(value) => handleInputChange("consultationType", value)}
                      className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-4"
                    >
                      <div className={`flex items-center space-x-3 p-3 lg:p-4 rounded-xl border-2 transition-all duration-300 ${
                        formData.consultationType === "online"
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}>
                        <RadioGroupItem value="online" id="online" className="text-blue-500" />
                        <Label htmlFor="online" className="font-semibold text-gray-700 cursor-pointer text-sm lg:text-base">Online (Video Call)</Label>
                      </div>
                      <div className={`flex items-center space-x-3 p-3 lg:p-4 rounded-xl border-2 transition-all duration-300 ${
                        formData.consultationType === "phone"
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}>
                        <RadioGroupItem value="phone" id="phone" className="text-green-500" />
                        <Label htmlFor="phone" className="font-semibold text-gray-700 cursor-pointer text-sm lg:text-base">Phone Call</Label>
                      </div>
                      <div className={`flex items-center space-x-3 p-3 lg:p-4 rounded-xl border-2 transition-all duration-300 ${
                        formData.consultationType === "office"
                          ? "border-purple-500 bg-purple-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}>
                        <RadioGroupItem value="office" id="office" className="text-purple-500" />
                        <Label htmlFor="office" className="font-semibold text-gray-700 cursor-pointer text-sm lg:text-base">In-Person (Office Visit)</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between gap-3 pt-4 lg:pt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleNext("personal")}
                      className="w-full sm:w-auto px-6 lg:px-8 py-3 lg:py-4 text-base lg:text-lg font-semibold rounded-xl border-2 hover:bg-gray-50 transition-all duration-300"
                    >
                      Previous
                    </Button>
                    <Button
                      type="button"
                      onClick={() => handleNext("schedule")}
                      className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-6 lg:px-8 py-3 lg:py-4 text-base lg:text-lg font-semibold rounded-xl transform hover:scale-105 transition-all duration-300"
                    >
                      Next <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 ml-2" />
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="schedule" className="space-y-6 lg:space-y-8">
                  {/* Full Month Calendar with Navigation */}
                  <div className="space-y-4 lg:space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <Label className="text-xl lg:text-2xl font-bold text-gray-800">Select Preferred Date *</Label>
                      {formData.preferredDate && (
                        <div className="text-sm lg:text-lg font-semibold text-blue-600 bg-blue-50 px-3 lg:px-4 py-2 rounded-lg">
                          {getSelectedDateDisplay()}
                        </div>
                      )}
                    </div>

                    {/* Calendar Header with Navigation */}
                    <div className="flex items-center justify-between bg-gradient-to-r from-green-50 to-blue-50 p-3 lg:p-4 rounded-xl">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => navigateCalendar('prev')}
                        disabled={!canNavigatePrev()}
                        className="flex items-center gap-2 hover:bg-white transition-all duration-300 text-sm"
                      >
                        <ChevronLeft className="w-3 h-3 lg:w-4 lg:h-4" />
                        <span className="hidden sm:inline">Previous</span>
                      </Button>


                      <h3 className="text-lg lg:text-xl font-bold text-gray-800">
                        {calendarData.monthName} {calendarData.year}
                      </h3>


                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => navigateCalendar('next')}
                        className="flex items-center gap-2 hover:bg-white transition-all duration-300 text-sm"
                      >
                        <span className="hidden sm:inline">Next</span>
                        <ChevronRight className="w-3 h-3 lg:w-4 lg:h-4" />
                      </Button>
                    </div>
                    {/* Calendar Grid */}
                    <div className="bg-white border-2 border-gray-200 rounded-xl p-3 lg:p-4">
                      {/* Day Headers */}
                      <div className="grid grid-cols-7 gap-1 lg:gap-2 mb-3 lg:mb-4">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                          <div key={day} className="text-center text-xs lg:text-sm font-semibold text-gray-600 py-2">
                            {day}
                          </div>
                        ))}
                      </div>

                      {/* Calendar Dates */}
                      <div className="grid grid-cols-7 gap-1 lg:gap-2">
                        {calendarData.dates.map((dateOption, index) => {
                          if (!dateOption) {
                            return <div key={index} className="h-10 lg:h-12"></div>
                          }


                          return (
                            <Button
                              key={dateOption.date}
                              type="button"
                              variant="outline"
                              disabled={dateOption.isDisabled}
                              className={`h-10 lg:h-12 flex flex-col items-center justify-center rounded-lg border-2 transition-all duration-300 transform hover:scale-105 text-xs lg:text-sm ${
                                formData.preferredDate === dateOption.date
                                  ? "bg-gradient-to-r from-green-500 to-blue-500 text-white border-transparent shadow-xl scale-105"
                                  : dateOption.isToday
                                    ? "border-blue-300 bg-blue-50 hover:bg-blue-100"
                                    : dateOption.isDisabled
                                      ? "opacity-40 cursor-not-allowed bg-gray-100 border-gray-200 hover:scale-100"
                                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                              }`}
                              onClick={() => !dateOption.isDisabled && handleInputChange("preferredDate", dateOption.date)}
                            >
                              <span className="font-bold">{dateOption.dayNum}</span>
                              {dateOption.isToday && !dateOption.isDisabled && (
                                <div className="w-1 h-1 lg:w-1.5 lg:h-1.5 bg-blue-500 rounded-full mt-1"></div>
                              )}
                            </Button>
                          )
                        })}
                      </div>
                    </div>

                    {errors.preferredDate && (
                      <p className="text-red-500 text-sm font-medium">{errors.preferredDate}</p>
                    )}
                  </div>
                  {/* Time Selection */}
                  <div className="space-y-4 lg:space-y-6">
                    <div className="flex items-center justify-between">
                      <Label className="text-xl lg:text-2xl font-bold text-gray-800">Select Preferred Time *</Label>
                      {loadingTimeSlots && (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Checking availability...
                        </div>
                      )}
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
                      {timeSlots.map((slot) => {
                        const bookingCount = timeSlotCounts[slot.value] || 0
                        const isFullyBooked = bookingCount >= 10
                        const spotsLeft = Math.max(0, 10 - bookingCount)


                        return (
                          <Button
                            key={slot.value}
                            type="button"
                            variant="outline"
                            disabled={isFullyBooked}
                            className={`h-14 lg:h-16 flex flex-col items-center justify-center gap-1 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                              formData.preferredTime === slot.value
                                ? "bg-gradient-to-r from-green-500 to-blue-500 text-white border-transparent shadow-xl scale-105"
                                : isFullyBooked
                                  ? "opacity-50 cursor-not-allowed bg-gray-100 border-gray-200 hover:scale-100"
                                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                            }`}
                            onClick={() => !isFullyBooked && handleInputChange("preferredTime", slot.value)}
                          >
                            <div className="flex items-center gap-1 lg:gap-2">
                              <Clock className="w-3 h-3 lg:w-4 lg:h-4" />
                              <div className="font-bold text-sm lg:text-base">{slot.label}</div>
                            </div>
                            {isFullyBooked ? (
                              <div className="text-xs text-red-500">Fully Booked</div>
                            ) : bookingCount > 0 ? (
                              <div className="text-xs text-orange-500">{spotsLeft} spots left</div>
                            ) : (
                              <div className="text-xs text-green-500">Available</div>
                            )}
                          </Button>
                        )
                      })}
                    </div>
                    {errors.preferredTime && (
                      <p className="text-red-500 text-sm font-medium">{errors.preferredTime}</p>
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between gap-3 pt-4 lg:pt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleNext("service")}
                      className="w-full sm:w-auto px-6 lg:px-8 py-3 lg:py-4 text-base lg:text-lg font-semibold rounded-xl border-2 hover:bg-gray-50 transition-all duration-300"
                    >
                      Previous
                    </Button>
                    <Button
                      type="button"
                      onClick={() => handleNext("additional")}
                      className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-6 lg:px-8 py-3 lg:py-4 text-base lg:text-lg font-semibold rounded-xl transform hover:scale-105 transition-all duration-300"
                    >
                      Next <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 ml-2" />
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="additional" className="space-y-6 lg:space-y-8">
                  <div className="space-y-4">
                    <Label htmlFor="message" className="text-lg lg:text-xl font-bold text-gray-800">Tell us more about your needs (Optional)</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Please describe your business goals, specific questions, or any additional information that would help us prepare for your consultation..."
                      rows={6}
                      className="text-base lg:text-lg rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                    />
                  </div>
                  <div className="space-y-4 lg:space-y-6 bg-gradient-to-r from-green-50 to-blue-50 p-4 lg:p-6 rounded-xl">
                    <div className="flex items-start space-x-3 lg:space-x-4">
                      <Checkbox
                        id="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                        className={`mt-1 ${errors.agreeToTerms ? "border-red-500" : "border-gray-300"}`}
                      />
                      <Label htmlFor="agreeToTerms" className="text-base lg:text-lg leading-relaxed cursor-pointer">
                        I agree to the <a href="/terms" className="text-blue-600 hover:underline font-semibold">Terms of Service</a> and
                        <a href="/privacy" className="text-blue-600 hover:underline font-semibold ml-1">Privacy Policy</a> *
                      </Label>
                    </div>
                    {errors.agreeToTerms && (
                      <p className="text-red-500 text-sm font-medium ml-7 lg:ml-8">{errors.agreeToTerms}</p>
                    )}
                    <div className="flex items-start space-x-3 lg:space-x-4">
                      <Checkbox
                        id="subscribeNewsletter"
                        checked={formData.subscribeNewsletter}
                        onCheckedChange={(checked) => handleInputChange("subscribeNewsletter", checked as boolean)}
                        className="mt-1 border-gray-300"
                      />
                      <Label htmlFor="subscribeNewsletter" className="text-base lg:text-lg leading-relaxed cursor-pointer">
                        Subscribe to our newsletter for business tips and updates
                      </Label>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between gap-3 pt-4 lg:pt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleNext("schedule")}
                      className="w-full sm:w-auto px-6 lg:px-8 py-3 lg:py-4 text-base lg:text-lg font-semibold rounded-xl border-2 hover:bg-gray-50 transition-all duration-300"
                    >
                      Previous
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 lg:px-12 py-3 lg:py-4 text-lg lg:text-xl font-bold rounded-xl transform hover:scale-105 transition-all duration-300 shadow-xl"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 lg:w-6 lg:h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Submitting...
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          Schedule Consultation
                          <ArrowRight className="w-5 h-5 lg:w-6 lg:h-6" />
                        </div>
                      )}
                    </Button>
                  </div>
                </TabsContent>
              </form>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
