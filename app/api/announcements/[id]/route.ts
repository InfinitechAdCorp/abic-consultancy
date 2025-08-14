import { type NextRequest, NextResponse } from "next/server"

// GET /api/announcements/[id] - Get single announcement
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params
  const laravelApiUrl = process.env.NEXT_PUBLIC_API_URL

  if (!laravelApiUrl) {
    return NextResponse.json({ message: "NEXT_PUBLIC_API_URL is not defined" }, { status: 500 })
  }

  try {
    const response = await fetch(`${laravelApiUrl}/announcements/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })

    if (!response.ok) {
      let errorMessage = `Failed to fetch announcement with ID ${id} from Laravel`
      try {
        const contentType = response.headers.get("content-type")
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json()
          errorMessage = errorData.message || errorMessage
        } else {
          const errorText = await response.text()
          console.error(`Laravel returned non-JSON response:`, errorText)
        }
      } catch (parseError) {
        console.error(`Error parsing Laravel response:`, parseError)
      }

      return NextResponse.json({ message: errorMessage }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error: any) {
    console.error(`Error fetching announcement with ID ${id} from Laravel:`, error)
    return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 })
  }
}

// PUT /api/announcements/[id] - Update announcement
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params
  const laravelApiUrl = process.env.NEXT_PUBLIC_API_URL

  if (!laravelApiUrl) {
    return NextResponse.json({ message: "NEXT_PUBLIC_API_URL is not defined" }, { status: 500 })
  }

  try {
    const body = await request.json()

    const response = await fetch(`${laravelApiUrl}/announcements/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      let errorMessage = `Failed to update announcement with ID ${id}`
      try {
        const contentType = response.headers.get("content-type")
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json()
          errorMessage = errorData.message || errorMessage
        } else {
          const errorText = await response.text()
          console.error(`Laravel returned non-JSON response:`, errorText)
        }
      } catch (parseError) {
        console.error(`Error parsing Laravel response:`, parseError)
      }

      return NextResponse.json({ message: errorMessage }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error: any) {
    console.error(`Error updating announcement with ID ${id}:`, error)
    return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 })
  }
}

// DELETE /api/announcements/[id] - Delete announcement
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params
  const laravelApiUrl = process.env.NEXT_PUBLIC_API_URL

  console.log(`DELETE request for announcement ID: ${id}`)
  console.log(`Laravel API URL: ${laravelApiUrl}`)

  if (!laravelApiUrl) {
    return NextResponse.json({ message: "NEXT_PUBLIC_API_URL is not defined" }, { status: 500 })
  }

  try {
    const fullUrl = `${laravelApiUrl}/announcements/${id}`
    console.log(`Making DELETE request to: ${fullUrl}`)

    const response = await fetch(fullUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })

    console.log(`Laravel response status: ${response.status}`)
    console.log(`Laravel response headers:`, Object.fromEntries(response.headers.entries()))

    if (!response.ok) {
      let errorMessage = `Failed to delete announcement with ID ${id}`
      try {
        const contentType = response.headers.get("content-type")
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json()
          console.log(`Laravel error response:`, errorData)
          errorMessage = errorData.message || errorMessage
        } else {
          const errorText = await response.text()
          console.error(`Laravel returned non-JSON response:`, errorText)
        }
      } catch (parseError) {
        console.error(`Error parsing Laravel response:`, parseError)
      }

      return NextResponse.json({ message: errorMessage }, { status: response.status })
    }

    // Laravel DELETE operations often return 204 No Content or empty responses
    try {
      const contentType = response.headers.get("content-type")
      let data = null

      // Check if response has content and is JSON
      if (contentType && contentType.includes("application/json")) {
        const responseText = await response.text()
        if (responseText.trim()) {
          data = JSON.parse(responseText)
        }
      }

      // Return success response regardless of Laravel's response format
      console.log(`Delete successful, Laravel response:`, data)
      return NextResponse.json({
        message: "Announcement deleted successfully",
        success: true,
        data: data,
      })
    } catch (parseError) {
      // If parsing fails, it's still a successful delete since response.ok was true
      console.log(`Delete successful, but couldn't parse response (this is normal for 204 responses)`)
      return NextResponse.json({
        message: "Announcement deleted successfully",
        success: true,
      })
    }
  } catch (error: any) {
    console.error(`Error deleting announcement with ID ${id}:`, error)
    return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 })
  }
}
