import { type NextRequest, NextResponse } from "next/server"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get("date")

    if (!date) {
      return NextResponse.json(
        {
          success: false,
          error: "Date parameter is required",
          data: {},
        },
        { status: 400 },
      )
    }

    console.log(`Fetching time slots from: ${API_BASE_URL}/hr-consultations/time-slot-availability?date=${date}`)

    const response = await fetch(`${API_BASE_URL}/hr-consultations/time-slot-availability?date=${date}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })

    const data = await response.json()
    console.log("Laravel response:", data)

    if (!response.ok) {
      console.error("Laravel API error:", data)
      return NextResponse.json(
        {
          success: false,
          error: data.message || "Failed to fetch time slot availability",
          data: {},
        },
        { status: response.status },
      )
    }

    return NextResponse.json({
      success: data.success || true,
      data: data.data || data,
      message: data.message,
    })
  } catch (error) {
    console.error("Time Slots API Error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        data: {},
      },
      { status: 500 },
    )
  }
}
