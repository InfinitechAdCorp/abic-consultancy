import { NextResponse } from "next/server"

const LARAVEL_API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

export async function POST(req: Request) {
  // Check if the environment variable is defined
  if (!LARAVEL_API_BASE_URL) {
    console.error(
      "NEXT_PUBLIC_API_URL is not defined. Please set it in your .env.local or Vercel environment variables.",
    )
    return NextResponse.json({ message: "Server configuration error: API URL not set." }, { status: 500 })
  }

  try {
    const formData = await req.json()

    // Validate incoming data (basic validation)
    if (!formData.companyName || !formData.contactPerson || !formData.email || !formData.phone) {
      return NextResponse.json({ message: "Missing required fields." }, { status: 400 })
    }

    // Validate services
    if (!formData.servicesNeeded || !Array.isArray(formData.servicesNeeded) || formData.servicesNeeded.length === 0) {
      return NextResponse.json({ message: "At least one service must be selected." }, { status: 400 })
    }

    const serviceMapping: Record<string, string> = {
      "Payroll & Benefits Administration – Processing salaries, tax compliance, SSS, PhilHealth, Pag-IBIG contributions.":
        "payroll",
      "Recruitment & Staffing Solutions – End-to-end hiring, onboarding, and workforce planning.": "recruitment",
      "HR Administration & Employee Management – Records management, contracts, performance tracking.": "hr_admin",
      "Employee Engagement & Relations – Conflict resolution, company culture programs.": "engagement",
      "Labor Law Compliance & Risk Management – DOLE compliance, disciplinary procedures, terminations.": "compliance",
      "Other services": "other",
    }

    const mappedServices = formData.servicesNeeded.map((service: string) => serviceMapping[service] || service)

    const quoteData = {
      company_name: formData.companyName,
      contact_person: formData.contactPerson,
      email: formData.email,
      phone: formData.phone,
      company_size: formData.companySize,
      industry: formData.industry,
      services_needed: mappedServices,
      other_service_name: formData.otherServiceName || null,
      other_service_description: formData.otherServiceDescription || null,
      timeline: formData.timeline || "",
      budget: formData.budget || "",
      additional_info: formData.additionalInfo || "",
    }

    // Forward the data to your Laravel backend API
    const laravelApiUrl = `${LARAVEL_API_BASE_URL}/quotes`

    console.log(`Forwarding request to Laravel: ${laravelApiUrl}`)
    console.log("Request body:", JSON.stringify(quoteData))

    const response = await fetch(laravelApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json", // Explicitly tell Laravel we prefer JSON
        // Add any necessary authentication headers for your Laravel API here, e.g.,
        // 'Authorization': `Bearer ${process.env.LARAVEL_API_TOKEN}`,
      },
      body: JSON.stringify(quoteData),
    })

    if (response.ok) {
      const data = await response.json()
      return NextResponse.json({ message: "Quote submitted successfully!", data }, { status: 200 })
    } else {
      // If Laravel returns a non-OK status, it should still be JSON if the controller is correct
      let errorData
      try {
        errorData = await response.json()
      } catch (jsonError) {
        // If response is not JSON, get it as text for debugging
        const responseText = await response.text()
        console.error(`Laravel returned non-JSON response (Status: ${response.status}):`, responseText)
        return NextResponse.json(
          {
            message: `Failed to submit quote to backend. Laravel returned non-JSON response. Status: ${response.status}`,
          },
          { status: 500 }, // Internal Server Error because Laravel didn't return expected format
        )
      }

      console.error("Error from Laravel API:", errorData)
      return NextResponse.json(
        { message: errorData.message || "Failed to submit quote to backend.", errors: errorData.errors || {} },
        { status: response.status },
      )
    }
  } catch (error: any) {
    console.error("Error in Next.js API route:", error)
    return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 })
  }
}
