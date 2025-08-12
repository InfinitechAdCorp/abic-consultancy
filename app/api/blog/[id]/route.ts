import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") || "http://localhost:8000"

    const response = await fetch(`${apiUrl}/api/blogs/${params.id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Blog fetch error:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch blog post",
        message: error instanceof Error ? error.message : "Unknown error",
        suggestion: "Make sure Laravel backend is running on http://localhost:8000",
      },
      { status: 500 },
    )
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") || "http://localhost:8000"
    const formData = await request.formData()

    console.log("Updating blog ID:", params.id)
    console.log("FormData entries:")
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value instanceof File ? `File: ${value.name}` : value)
    }

    const response = await fetch(`${apiUrl}/api/blogs/${params.id}`, {
      method: "PUT",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Laravel error response:", errorText)
      let errorData
      try {
        errorData = JSON.parse(errorText)
      } catch {
        errorData = { message: errorText }
      }
      return NextResponse.json(
        {
          error: "Failed to update blog post",
          message: `HTTP ${response.status}: ${errorData.message || errorText}`,
          details: errorData,
        },
        { status: response.status },
      )
    }

    const data = await response.json()
    console.log("Laravel update response:", data)
    return NextResponse.json(data)
  } catch (error) {
    console.error("Blog update error:", error)
    return NextResponse.json(
      {
        error: "Failed to update blog post",
        message: error instanceof Error ? error.message : "Unknown error",
        suggestion: "Make sure Laravel backend is running on http://localhost:8000",
      },
      { status: 500 },
    )
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") || "http://localhost:8000"

    const response = await fetch(`${apiUrl}/api/blogs/${params.id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Blog delete error:", error)
    return NextResponse.json(
      {
        error: "Failed to delete blog post",
        message: error instanceof Error ? error.message : "Unknown error",
        suggestion: "Make sure Laravel backend is running on http://localhost:8000",
      },
      { status: 500 },
    )
  }
}
