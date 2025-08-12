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
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      return NextResponse.json({ message: "Missing required fields." }, { status: 400 })
    }

    // Forward the data to your Laravel backend API
    const laravelApiUrl = `${LARAVEL_API_BASE_URL}/contacts`

    console.log(`Forwarding request to Laravel: ${laravelApiUrl}`)
    console.log("Request body:", JSON.stringify(formData))

    const response = await fetch(laravelApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json", // Explicitly tell Laravel we prefer JSON
        // Add any necessary authentication headers for your Laravel API here, e.g.,
        // 'Authorization': `Bearer ${process.env.LARAVEL_API_TOKEN}`,
      },
      body: JSON.stringify(formData),
    })

    if (response.ok) {
      const data = await response.json()
      return NextResponse.json({ message: "Message sent successfully!", data }, { status: 200 })
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
            message: `Failed to send message to backend. Laravel returned non-JSON response. Status: ${response.status}`,
          },
          { status: 500 }, // Internal Server Error because Laravel didn't return expected format
        )
      }

      console.error("Error from Laravel API:", errorData)
      return NextResponse.json(
        { message: errorData.message || "Failed to send message to backend.", errors: errorData.errors || {} },
        { status: response.status },
      )
    }
  } catch (error: any) {
    console.error("Error in Next.js API route:", error)
    return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 })
  }
}
