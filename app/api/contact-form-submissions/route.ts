import { NextResponse } from "next/server"

const LARAVEL_API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

export async function GET() {
  // Check if the environment variable is defined
  if (!LARAVEL_API_BASE_URL) {
    console.error(
      "NEXT_PUBLIC_API_URL is not defined. Please set it in your .env.local or Vercel environment variables.",
    )
    return NextResponse.json({ message: "Server configuration error: API URL not set." }, { status: 500 })
  }

  try {
    // CORRECTED: Ensure this matches the Laravel GET route
    const laravelApiUrl = `${LARAVEL_API_BASE_URL}/contact-form-submissions`

    console.log(`Fetching contact form submissions from Laravel: ${laravelApiUrl}`)

    const response = await fetch(laravelApiUrl, {
      method: "GET",
      headers: {
        Accept: "application/json", // Explicitly tell Laravel we prefer JSON
        // Add any necessary authentication headers for your Laravel API here, e.g.,
        // 'Authorization': `Bearer ${process.env.LARAVEL_API_TOKEN}`,
      },
    })

    if (response.ok) {
      const data = await response.json()
      return NextResponse.json(data, { status: 200 })
    } else {
      let errorData
      try {
        errorData = await response.json()
      } catch (jsonError) {
        const responseText = await response.text()
        console.error(`Laravel returned non-JSON response (Status: ${response.status}):`, responseText)
        return NextResponse.json(
          {
            message: `Failed to fetch submissions from backend. Laravel returned non-JSON response. Status: ${response.status}`,
          },
          { status: 500 },
        )
      }

      console.error("Error from Laravel API:", errorData)
      return NextResponse.json(
        { message: errorData.message || "Failed to fetch submissions from backend.", errors: errorData.errors || {} },
        { status: response.status },
      )
    }
  } catch (error: any) {
    console.error("Error in Next.js API route (GET /api/contact-form-submissions):", error)
    return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 })
  }
}
