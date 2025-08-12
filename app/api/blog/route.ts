import { type NextRequest, NextResponse } from "next/server"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get("slug")
    const page = searchParams.get("page") || "1"
    const limit = searchParams.get("limit") || "10"

    let endpoint = `${API_BASE_URL}/blogs`

    if (slug) {
      endpoint = `${API_BASE_URL}/blogs/${slug}`
    } else {
      endpoint = `${API_BASE_URL}/blogs?page=${page}&limit=${limit}`
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout

    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      cache: "no-store",
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Laravel API Error: ${response.status} - ${errorText}`)

      // Return mock data if Laravel backend is not available
      if (response.status >= 500) {
        return NextResponse.json(
          {
            data: [],
            current_page: Number.parseInt(page),
            per_page: Number.parseInt(limit),
            total: 0,
            last_page: 1,
            message: "Backend service temporarily unavailable",
          },
          { status: 200 },
        )
      }

      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    })
  } catch (error) {
    console.error("Blog API Error:", error)

    if (error instanceof Error && (error.name === "AbortError" || error.message.includes("fetch"))) {
      console.log("Laravel backend not available, returning mock data")
      return NextResponse.json(
        {
          data: [],
          current_page: 1,
          per_page: Number.parseInt(request.nextUrl.searchParams.get("limit") || "10"),
          total: 0,
          last_page: 1,
          message: "Laravel backend not available. Please start the Laravel server on port 8000.",
        },
        { status: 200 },
      )
    }

    return NextResponse.json(
      {
        error: "Failed to fetch blog data",
        message: error instanceof Error ? error.message : "Unknown error",
        suggestion: "Make sure Laravel backend is running on http://localhost:8000",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    console.log("Form data being sent to Laravel:")
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value instanceof File ? `File: ${value.name}` : value)
    }

    const response = await fetch(`${API_BASE_URL}/blogs`, {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error(`Laravel API Error: ${response.status} - ${errorData}`)

      let parsedError
      try {
        parsedError = JSON.parse(errorData)
      } catch {
        parsedError = { message: errorData }
      }

      return NextResponse.json(
        {
          error: "Failed to create blog post",
          message: `HTTP error! status: ${response.status}`,
          details: parsedError,
          suggestion: "Check Laravel validation errors above",
        },
        { status: response.status },
      )
    }

    const data = await response.json()
    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error("Blog Creation Error:", error)
    return NextResponse.json(
      {
        error: "Failed to create blog post",
        message: error instanceof Error ? error.message : "Unknown error",
        suggestion: "Make sure Laravel backend is running on http://localhost:8000",
      },
      { status: 500 },
    )
  }
}
