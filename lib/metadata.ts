import type { Metadata } from "next"

interface PageMetadata {
  title: string
  description: string
  keywords?: string[]
  canonical?: string
}

const baseUrl = "https://abicconsultancy.vercel.app"

export const pageMetadata: Record<string, PageMetadata> = {
  "/": {
    title: "ABIC Consultancy - Your Gateway to Business Success in the Philippines",
    description:
      "Advance Beyond International Consulting Inc. provides comprehensive business solutions, visa services, HR consulting, and tax accounting in the Philippines. Start your business journey with expert guidance.",
    keywords: [
      "business consultancy Philippines",
      "startup consulting",
      "business registration",
      "visa services",
      "HR consulting",
    ],
  },
  "/about": {
    title: "About ABIC Consultancy - Expert Business Solutions Since Inception",
    description:
      "Learn about Advance Beyond International Consulting Inc. (ABIC), your trusted partner for business success in the Philippines. Discover our mission, values, and commitment to excellence.",
    keywords: [
      "about ABIC",
      "business consultancy company",
      "Philippines consulting firm",
      "business solutions provider",
    ],
  },
  "/events": {
    title: "Business Events & Workshops - ABIC Consultancy",
    description:
      "Stay updated with the latest business events, workshops, and seminars hosted by ABIC Consultancy. Join our community of successful entrepreneurs and business owners.",
    keywords: ["business events Philippines", "entrepreneurship workshops", "business seminars", "networking events"],
  },
  "/announcements": {
    title: "Latest Announcements - ABIC Consultancy News & Updates",
    description:
      "Get the latest news, updates, and important announcements from ABIC Consultancy. Stay informed about new services, policy changes, and business opportunities.",
    keywords: ["ABIC announcements", "business news Philippines", "consultancy updates", "policy changes"],
  },
  "/services/business/startup": {
    title: "Business Startup Services - Complete Registration & Setup | ABIC",
    description:
      "Launch your business in the Philippines with ABIC's comprehensive startup services. We handle business registration, permits, licenses, and all legal requirements for your new venture.",
    keywords: [
      "business startup Philippines",
      "business registration",
      "company incorporation",
      "startup consulting",
      "business permits",
    ],
  },
  "/services/business/amendment": {
    title: "Business Amendment Services - Modify Your Business Structure | ABIC",
    description:
      "Need to amend your business registration? ABIC provides expert business amendment services including name changes, address updates, and structural modifications.",
    keywords: [
      "business amendment Philippines",
      "company name change",
      "business address change",
      "corporate amendments",
    ],
  },
  "/services/business/license": {
    title: "Special Licenses & Permits - Professional Business Licensing | ABIC",
    description:
      "Obtain special business licenses and permits with ABIC's expert guidance. We handle complex licensing requirements for various industries and business types.",
    keywords: ["business licenses Philippines", "special permits", "professional licenses", "industry permits"],
  },
  "/services/business/renewal": {
    title: "Business Renewal Services - Keep Your Business Compliant | ABIC",
    description:
      "Ensure your business stays compliant with ABIC's business renewal services. We handle permit renewals, license updates, and all regulatory requirements.",
    keywords: ["business renewal Philippines", "permit renewal", "license renewal", "business compliance"],
  },
  "/services/business/closure": {
    title: "Business Closure Services - Professional Business Dissolution | ABIC",
    description:
      "Need to close your business? ABIC provides professional business closure services, handling all legal requirements and ensuring proper dissolution procedures.",
    keywords: ["business closure Philippines", "company dissolution", "business termination", "corporate closure"],
  },
  "/services/visa/short-term": {
    title: "Short Term Visa Services - Tourist & Business Visas | ABIC",
    description:
      "Apply for short-term visas with ABIC's expert assistance. We handle tourist visas, business visas, and other short-duration visa applications with high success rates.",
    keywords: ["short term visa Philippines", "tourist visa", "business visa", "visa application assistance"],
  },
  "/services/visa/long-term": {
    title: "Long Term Visa Services - Residence & Work Visas | ABIC",
    description:
      "Secure your long-term stay in the Philippines with ABIC's visa services. We assist with work visas, residence permits, and long-duration visa applications.",
    keywords: ["long term visa Philippines", "work visa", "residence visa", "permanent visa"],
  },
  "/services/visa/international": {
    title: "International Visa Services - Global Visa Applications | ABIC",
    description:
      "Planning to travel abroad? ABIC provides comprehensive international visa services for various countries. Expert guidance for successful visa applications worldwide.",
    keywords: ["international visa services", "global visa applications", "travel visa assistance", "overseas visa"],
  },
  "/services/tax/requirements": {
    title: "Tax Requirements Consulting - Business Tax Compliance | ABIC",
    description:
      "Understand your business tax obligations with ABIC's tax requirements consulting. We provide expert guidance on Philippine tax laws and compliance requirements.",
    keywords: ["tax requirements Philippines", "business tax compliance", "tax consulting", "Philippine tax laws"],
  },
  "/services/tax/mandatory": {
    title: "Mandatory Tax Services - Essential Business Tax Filing | ABIC",
    description:
      "Ensure compliance with mandatory tax requirements through ABIC's professional tax services. We handle all essential business tax filings and obligations.",
    keywords: ["mandatory taxes Philippines", "business tax filing", "tax compliance services", "required taxes"],
  },
  "/business-solution/hr-consulting": {
    title: "HR Consulting Services - Professional Human Resources Solutions | ABIC",
    description:
      "Transform your HR operations with ABIC's professional HR consulting services. Expert guidance on recruitment, employee relations, compliance, and HR strategy.",
    keywords: [
      "HR consulting Philippines",
      "human resources consulting",
      "HR strategy",
      "employee relations",
      "recruitment services",
    ],
  },
  "/business-solution/hr-outsourcing": {
    title: "HR Outsourcing Services - Complete HR Management Solutions | ABIC",
    description:
      "Streamline your operations with ABIC's comprehensive HR outsourcing services. Complete HR management, payroll processing, and employee administration.",
    keywords: [
      "HR outsourcing Philippines",
      "payroll outsourcing",
      "HR management services",
      "employee administration",
    ],
  },
  "/blog": {
    title: "Business Insights Blog - Expert Tips & Industry News | ABIC",
    description:
      "Stay informed with ABIC's business blog featuring expert insights, industry trends, regulatory updates, and practical tips for business success in the Philippines.",
    keywords: [
      "business blog Philippines",
      "business insights",
      "industry news",
      "business tips",
      "entrepreneurship advice",
    ],
  },
  "/contact": {
    title: "Contact ABIC Consultancy - Get Expert Business Consultation",
    description:
      "Ready to start your business journey? Contact ABIC Consultancy for expert consultation. Call +63 915 580 0518 or email zoe@abicph.com for professional business solutions.",
    keywords: [
      "contact ABIC consultancy",
      "business consultation Philippines",
      "ABIC contact information",
      "business help Philippines",
    ],
  },
}

export function generateMetadata(pathname: string): Metadata {
  const page = pageMetadata[pathname] || pageMetadata["/"]

  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    alternates: {
      canonical: pathname === "/" ? baseUrl : `${baseUrl}${pathname}`,
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: pathname === "/" ? baseUrl : `${baseUrl}${pathname}`,
      siteName: "ABIC Consultancy",
      images: [
        {
          url: "/images/abic-logo.png",
          width: 1200,
          height: 630,
          alt: page.title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: ["/images/abic-logo.png"],
    },
  }
}

export function getPageMetadata(pathname: string): PageMetadata {
  return pageMetadata[pathname] || pageMetadata["/"]
}
