import { Building2, Globe, CreditCard, Users, ArrowRight, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ServicesOverview() {
  const services = [
    {
      icon: Building2,
      title: "Business Solutions",
      description: "Complete business setup, amendments, licensing, and closure services for all business types",
      features: [
        "Start-Up Registration",
        "Business Amendment", 
        "Special Licenses",
        "Renewal Services",
        "Business Closure"
      ],
      color: "from-green-500 to-green-600",
      href: "/services/business/startup"
    },
    {
      icon: Globe,
      title: "Visa Services", 
      description: "Professional visa processing for all types of travel and business immigration needs",
      features: [
        "Short Term Visa",
        "Long Term Visa",
        "International Visa",
        "Express Processing",
        "Document Review"
      ],
      color: "from-blue-500 to-blue-600",
      href: "/services/visa/short-term"
    },
    {
      icon: CreditCard,
      title: "Tax & Accounting",
      description: "Expert tax planning, compliance, and comprehensive payroll management services",
      features: [
        "Tax Requirements",
        "Mandatory Taxes", 
        "Payroll Services",
        "Financial Planning",
        "Compliance Audit"
      ],
      color: "from-green-400 to-blue-500",
      href: "/services/tax/requirements"
    },
    {
      icon: Users,
      title: "HR Solutions",
      description: "Comprehensive human resource consulting and complete outsourcing solutions",
      features: [
        "HR Consulting",
        "HR Outsourcing",
        "Recruitment",
        "Training & Development", 
        "Policy Development"
      ],
      color: "from-blue-400 to-green-500",
      href: "/business-solution/hr-consulting"
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Our Professional <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We provide comprehensive business solutions to help you succeed in every aspect of your business journey in the Philippines
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-1 bg-white h-full">
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 mx-auto rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl mb-3 group-hover:text-green-600 transition-colors">{service.title}</CardTitle>
                  <CardDescription className="text-sm text-gray-600 leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0 flex flex-col flex-1">
                  <ul className="space-y-2 mb-6 flex-1">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href={service.href}>
                    <Button className="w-full group-hover:bg-gradient-to-r group-hover:from-green-500 group-hover:to-blue-500 group-hover:text-white group-hover:border-transparent transition-all duration-300 text-sm font-semibold" variant="outline">
                      Learn More
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
