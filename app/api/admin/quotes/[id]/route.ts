import { type NextRequest, NextResponse } from "next/server"

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const quoteId = params.id
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

    const response = await fetch(`${apiUrl}/admin/quotes/${quoteId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${process.env.LARAVEL_API_TOKEN || ""}`,
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || "Failed to delete quote")
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error deleting quote:", error)
    return NextResponse.json({ error: "Failed to delete quote" }, { status: 500 })
  }
}
