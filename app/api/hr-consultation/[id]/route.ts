import { type NextRequest, NextResponse } from "next/server"

export async function PATCH(request: NextRequest) {
  try {
    const pathSegments = request.nextUrl.pathname.split("/")
    const consultationId = pathSegments[pathSegments.length - 1] // Get the last segment as the ID

    const { status } = await request.json()

    if (!status) {
      return NextResponse.json({ success: false, message: "Status is required" }, { status: 400 })
    }

    const laravelApiUrl = process.env.NEXT_PUBLIC_API_URL
    if (!laravelApiUrl) {
      return NextResponse.json({ message: "NEXT_PUBLIC_API_URL is not defined" }, { status: 500 })
    }

    const response = await fetch(`${laravelApiUrl}/hr-consultations/${consultationId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ status }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      return NextResponse.json(
        { success: false, message: "Failed to update status", error: errorData },
        { status: response.status },
      )
    }

    const result = await response.json()
    return NextResponse.json({
      success: true,
      message: "Status updated successfully",
      data: result.data,
    })
  } catch (error: any) {
    console.error("Update status error:", error)
    return NextResponse.json(
      { success: false, message: "Internal server error", error: error.message },
      { status: 500 },
    )
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const consultationData = await request.json()

    const laravelApiUrl = process.env.NEXT_PUBLIC_API_URL
    if (!laravelApiUrl) {
      return NextResponse.json({ message: "NEXT_PUBLIC_API_URL is not defined" }, { status: 500 })
    }

    const response = await fetch(`${laravelApiUrl}/hr-consultations/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(consultationData),
    })

    if (!response.ok) {
      const errorData = await response.json()
      return NextResponse.json(
        { success: false, message: "Failed to update consultation", error: errorData },
        { status: response.status },
      )
    }

    const result = await response.json()
    return NextResponse.json({
      success: true,
      message: "Consultation updated successfully",
      data: result.data,
    })
  } catch (error: any) {
    console.error("Error updating consultation:", error)
    return NextResponse.json(
      { success: false, message: "Internal server error", error: error.message },
      { status: 500 },
    )
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    const laravelApiUrl = process.env.NEXT_PUBLIC_API_URL
    if (!laravelApiUrl) {
      return NextResponse.json({ message: "NEXT_PUBLIC_API_URL is not defined" }, { status: 500 })
    }

    const response = await fetch(`${laravelApiUrl}/hr-consultations/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      return NextResponse.json(
        { success: false, message: "Failed to delete consultation", error: errorData },
        { status: response.status },
      )
    }

    return NextResponse.json({
      success: true,
      message: "Consultation deleted successfully",
    })
  } catch (error: any) {
    console.error("Error deleting consultation:", error)
    return NextResponse.json(
      { success: false, message: "Internal server error", error: error.message },
      { status: 500 },
    )
  }
}
