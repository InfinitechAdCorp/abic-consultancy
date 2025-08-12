import { NextResponse } from "next/server"

const LARAVEL_API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

export async function POST(req: Request) {
  if (!LARAVEL_API_BASE_URL) {
    console.error(
      "NEXT_PUBLIC_API_URL is not defined. Please set it in your .env.local or Vercel environment variables.",
    )
    return NextResponse.json({ message: "Server configuration error: API URL not set." }, { status: 500 })
  }

  try {
    const { recipient, subject, body } = await req.json()

    if (!recipient || !subject || !body) {
      return NextResponse.json({ message: "Missing required fields: recipient, subject, or body." }, { status: 400 })
    }

    const laravelApiUrl = `${LARAVEL_API_BASE_URL}/send-contact-reply`

    console.log(`Forwarding email to Laravel: ${laravelApiUrl}`)
    console.log("Email details:", { recipient, subject, body })

    const response = await fetch(laravelApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // Add any necessary authentication headers for your Laravel API here
      },
      body: JSON.stringify({ recipient, subject, body }),
    })

    if (response.ok) {
      const data = await response.json()
      return NextResponse.json({ message: "Email sent successfully!", data }, { status: 200 })
    } else {
      let errorData
      try {
        errorData = await response.json()
      } catch (jsonError) {
        const responseText = await response.text()
        console.error(`Laravel returned non-JSON response (Status: ${response.status}):`, responseText)
        return NextResponse.json(
          {
            message: `Failed to send email via backend. Laravel returned non-JSON response. Status: ${response.status}`,
          },
          { status: 500 },
        )
      }

      console.error("Error from Laravel API (send-reply):", errorData)
      return NextResponse.json(
        { message: errorData.message || "Failed to send email via backend.", errors: errorData.errors || {} },
        { status: response.status },
      )
    }
  } catch (error: any) {
    console.error("Error in Next.js API route (POST /api/send-reply):", error)
    return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 })
  }
}
