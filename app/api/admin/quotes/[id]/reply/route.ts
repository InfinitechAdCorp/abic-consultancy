import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { to, subject, message, quote_id } = await request.json()
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

    const response = await fetch(`${apiUrl}/admin/quotes/${params.id}/reply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // Add authorization header if needed
        // 'Authorization': `Bearer ${process.env.LARAVEL_API_TOKEN}`
      },
      body: JSON.stringify({
        to,
        subject,
        message,
        quote_id,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || `Laravel API responded with status: ${response.status}`)
    }

    const result = await response.json()
    return NextResponse.json(result)
  } catch (error: any) {
    console.error("Error sending reply:", error)
    return NextResponse.json(
      {
        message: "Failed to send reply",
        error: error.message,
      },
      { status: 500 },
    )
  }
}
