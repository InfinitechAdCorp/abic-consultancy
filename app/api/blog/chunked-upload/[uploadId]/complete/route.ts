import { type NextRequest, NextResponse } from "next/server"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

export async function POST(request: NextRequest, { params }: { params: { uploadId: string } }) {
  try {
    const { uploadId } = params

    const response = await fetch(`${API_BASE_URL}/blogs/chunked-upload/${uploadId}/complete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
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
          error: "Failed to complete chunked upload",
          message: `HTTP error! status: ${response.status}`,
          details: parsedError,
        },
        { status: response.status },
      )
    }

    const data = await response.json()
    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    console.error("Complete Chunked Upload Error:", error)
    return NextResponse.json(
      {
        error: "Failed to complete chunked upload",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
