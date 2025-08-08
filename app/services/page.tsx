import Navigation from "@/components/navigation"
import { Building2, Globe, CreditCard, Users, ArrowRight, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Footer from "@/components/footer"

export default function ServicesPage() {
  const mainServices = [
    {
      icon: Building2,
      title: "Business Solutions",
      description: "Complete business setup and management services",
      features: [
        "Start-Up Registration & Incorporation",
        "Business Amendment & Modifications", 
        "Special License & Permit Applications",
        "Business Renewal Services",
        "Business Closure & Dissolution"
      ],
      color: "from-green-500 to-green-600",
      href: "/services/business"
    },
    {
      icon: Globe,
      title: "Visa Services",
      description: "Professional visa processing and immigration support",
      features: [
        "Short Term Visa Applications",
        "Long Term Visa Processing",
        "International Visa Consultation",
        "Document Preparation & Review",
        "Application Status Tracking"
      ],
      color: "from-blue-500 to-blue-600",
      href: "/services/visa"
    },
    {
      icon: CreditCard,
      title: "Tax & Accounting",
      description: "Comprehensive tax planning and accounting services",
      features: [
        "Tax Requirements Assessment",
        "Mandatory Tax Compliance",
        "Payroll Management Services",
        "Financial Statement Preparation",
        "Tax Planning & Optimization"
      ],
      color: "from-green-400 to-blue-500",
      href: "/services/tax"
    }
  ]

  const businessSolutions = [
    {
      icon: Users,
      title: "HR Consulting",
      description: "Strategic human resource consulting to optimize your workforce",
      features: [
        "HR Policy Development",
        "Employee Relations Management",
        "Performance Management Systems",
        "Compliance & Legal Advisory"
      ]
    },
    {
      icon: Users,
      title: "HR Outsourcing",
      description: "Complete HR outsourcing solutions for streamlined operations",
      features: [
        "Recruitment & Selection",
        "Payroll Processing",
        "Benefits Administration",
        "Training & Development"
      ]
    }
  ]

  return (
    <main className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-green-50 via-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
              Our <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Services</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Comprehensive business solutions tailored to your needs
            </p>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Core Services</h2>
              <p className="text-xl text-muted-foreground">
                Professional services to support your business growth
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {mainServices.map((service, index) => {
                const Icon = service.icon
                return (
                  <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                    <CardHeader className="text-center pb-4">
                      <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-r ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-10 w-10 text-white" />
                      </div>
                      <CardTitle className="text-2xl mb-3">{service.title}</CardTitle>
                      <CardDescription className="text-base">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <ul className="space-y-3 mb-8">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Link href={service.href}>
                        <Button className="w-full group-hover:bg-gradient-to-r group-hover:from-green-500 group-hover:to-blue-500 group-hover:text-white transition-all duration-300">
                          Learn More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Business Solutions */}
      <section className="py-20 bg-gradient-to-br from-green-50 via-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">
                Additional <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Business Solutions</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Specialized HR services to enhance your business operations
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {businessSolutions.map((solution, index) => {
                const Icon = solution.icon
                return (
                  <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-8">
                      <div className="flex items-center mb-6">
                        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center mr-4">
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold mb-2">{solution.title}</h3>
                          <p className="text-muted-foreground">{solution.description}</p>
                        </div>
                      </div>
                      <ul className="space-y-2 mb-6">
                        {solution.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm">
                            <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mr-3" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button variant="outline" className="hover:bg-gradient-to-r hover:from-green-500 hover:to-blue-500 hover:text-white hover:border-transparent transition-all duration-300">
                        Get Quote
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Need a Custom Solution?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Contact us to discuss your specific business requirements and get a tailored solution.
            </p>
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
              Contact Our Experts
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
