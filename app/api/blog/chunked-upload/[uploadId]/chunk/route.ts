import { type NextRequest, NextResponse } from "next/server"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

export async function POST(request: NextRequest, { params }: { params: { uploadId: string } }) {
  try {
    const { uploadId } = params
    const formData = await request.formData()

    const response = await fetch(`${API_BASE_URL}/blogs/chunked-upload/${uploadId}/chunk`, {
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
          error: "Failed to upload chunk",
          message: `HTTP error! status: ${response.status}`,
          details: parsedError,
        },
        { status: response.status },
      )
    }

    const data = await response.json()
    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    console.error("Chunk Upload Error:", error)
    return NextResponse.json(
      {
        error: "Failed to upload chunk",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
