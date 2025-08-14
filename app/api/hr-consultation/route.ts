import { type NextRequest, NextResponse } from "next/server"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields (expecting snake_case from frontend)
    const requiredFields = [
      "country",
      "first_name",
      "last_name",
      "email",
      "phone",
      "service_type",
      "consultation_type",
      "preferred_date",
      "preferred_time",
      "agree_to_terms",
    ]

    for (const field of requiredFields) {
      if (!body[field] && body[field] !== false) {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 })
      }
    }

    const consultationData = {
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      phone: body.phone,
      country: body.country,
      service_type: body.service_type,
      service_description: body.other_service_details || null, // Changed from other_service_details
      consultation_type: body.consultation_type,
      preferred_date: body.preferred_date,
      preferred_time: body.preferred_time,
      additional_info: body.message || null,
      agree_to_terms: body.agree_to_terms,
      subscribe_newsletter: body.subscribe_newsletter || false,
      timezone: body.timezone,
    }

    console.log("Sending to Laravel API:", `${API_BASE_URL}/hr-consultations`)
    console.log("Consultation data:", consultationData)

    // Send to Laravel API
    const response = await fetch(`${API_BASE_URL}/hr-consultations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(consultationData),
    })

    console.log("Laravel response status:", response.status)

    let data
    try {
      data = await response.json()
      console.log("Laravel response data:", data)
    } catch (parseError) {
      console.error("Failed to parse Laravel response:", parseError)
      return NextResponse.json(
        {
          error: "Failed to submit HR consultation request",
          details: `Laravel API returned invalid JSON. Status: ${response.status}`,
          laravel_url: `${API_BASE_URL}/hr-consultations`,
        },
        { status: 500 },
      )
    }

    if (!response.ok) {
      return NextResponse.json(
        {
          error: data.message || "Failed to submit consultation",
          errors: data.errors || {},
          status: response.status,
          laravel_response: data,
        },
        { status: response.status },
      )
    }

    return NextResponse.json({
      success: true,
      message: data.message || "HR consultation submitted successfully",
      data: data.data,
    })
  } catch (error) {
    console.error("HR Consultation API Error:", error)
    return NextResponse.json(
      {
        error: "Failed to submit HR consultation request",
        details: error instanceof Error ? error.message : "Unknown error",
        laravel_url: `${API_BASE_URL}/hr-consultations`,
        errors: {},
      },
      { status: 500 },
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const pathname = new URL(request.url).pathname

    // Handle time slots endpoint
    if (pathname.includes("/time-slots")) {
      const date = searchParams.get("date")

      if (!date) {
        return NextResponse.json({ error: "Date parameter is required" }, { status: 400 })
      }

      const response = await fetch(`${API_BASE_URL}/hr-consultations/time-slots?date=${date}`, {
        headers: {
          Accept: "application/json",
        },
      })

      const data = await response.json()

      if (!response.ok) {
        return NextResponse.json({ error: data.message || "Failed to fetch time slots" }, { status: response.status })
      }

      return NextResponse.json(data)
    }

    // Handle regular consultations listing
    const page = searchParams.get("page") || "1"
    const limit = searchParams.get("limit") || "10"
    const status = searchParams.get("status")
    const serviceType = searchParams.get("service_type")

    let url = `${API_BASE_URL}/hr-consultations?page=${page}&limit=${limit}`

    if (status) url += `&status=${status}`
    if (serviceType) url += `&service_type=${serviceType}`

    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json({ error: data.message || "Failed to fetch consultations" }, { status: response.status })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("HR Consultation GET API Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
