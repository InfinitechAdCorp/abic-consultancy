import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

    const response = await fetch(`${apiUrl}/admin/quotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // Add authorization header if needed
        // 'Authorization': `Bearer ${process.env.LARAVEL_API_TOKEN}`
      },
    })

    if (!response.ok) {
      throw new Error(`Laravel API responded with status: ${response.status}`)
    }

    const quotes = await response.json()
    return NextResponse.json(quotes)
  } catch (error: any) {
    console.error("Error fetching quotes:", error)
    return NextResponse.json(
      {
        message: "Failed to fetch quotes",
        error: error.message,
      },
      { status: 500 },
    )
  }
}
