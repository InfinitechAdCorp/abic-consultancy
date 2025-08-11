import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required." }, { status: 400 })
    }

    // Replace with your actual Laravel backend URL
    const LARAVEL_API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

    const response = await fetch(`${LARAVEL_API_URL}/newsletter/subscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email }),
    })

    const data = await response.json()

    if (response.ok) {
      return NextResponse.json({ success: true, message: data.message || "Successfully subscribed!" }, { status: 201 })
    } else {
      // Handle specific Laravel validation errors or other backend errors
      const errorMessage = data.message || "Failed to subscribe due to an unknown error."
      return NextResponse.json(
        { success: false, message: errorMessage, errors: data.errors },
        { status: response.status },
      )
    }
  } catch (error) {
    console.error("Error in Next.js API route:", error)
    return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 })
  }
}
