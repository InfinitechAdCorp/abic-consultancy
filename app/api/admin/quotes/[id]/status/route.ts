import { type NextRequest, NextResponse } from "next/server"

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { status } = await request.json()
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

    const response = await fetch(`${apiUrl}/admin/quotes/${params.id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // Add authorization header if needed
        // 'Authorization': `Bearer ${process.env.LARAVEL_API_TOKEN}`
      },
      body: JSON.stringify({ status }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || `Laravel API responded with status: ${response.status}`)
    }

    const result = await response.json()
    return NextResponse.json(result)
  } catch (error: any) {
    console.error("Error updating quote status:", error)
    return NextResponse.json(
      {
        message: "Failed to update quote status",
        error: error.message,
      },
      { status: 500 },
    )
  }
}
