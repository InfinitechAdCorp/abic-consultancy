import { NextResponse } from "next/server"

const LARAVEL_API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

// GET single event by ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params

  if (!LARAVEL_API_BASE_URL) {
    console.error(
      "NEXT_PUBLIC_API_URL is not defined. Please set it in your .env.local or Vercel environment variables.",
    )
    return NextResponse.json({ message: "Server configuration error: API URL not set." }, { status: 500 })
  }

  try {
    const laravelApiUrl = `${LARAVEL_API_BASE_URL}/events/${id}`
    console.log(`Fetching event from Laravel: ${laravelApiUrl}`)

    const response = await fetch(laravelApiUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      cache: 'no-store',
    })

    if (response.ok) {
      // Check if response actually contains JSON
      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        const responseText = await response.text()
        console.error(`Laravel returned non-JSON response:`, responseText)
        return NextResponse.json(
          { message: "Backend returned invalid response format" },
          { status: 500 }
        )
      }

      const data = await response.json()
      return NextResponse.json(data, { status: 200 })
    } else {
      let errorData
      try {
        const contentType = response.headers.get("content-type")
        if (contentType && contentType.includes("application/json")) {
          errorData = await response.json()
        } else {
          const responseText = await response.text()
          console.error(`Laravel returned non-JSON error response (Status: ${response.status}):`, responseText)
          return NextResponse.json(
            { message: `Failed to fetch event. Laravel returned non-JSON response. Status: ${response.status}` },
            { status: 500 }
          )
        }
      } catch (jsonError) {
        const responseText = await response.text()
        console.error(`Laravel returned non-JSON error response (Status: ${response.status}):`, responseText)
        return NextResponse.json(
          { message: `Failed to fetch event. Laravel returned non-JSON response. Status: ${response.status}` },
          { status: 500 }
        )
      }

      console.error("Error from Laravel API (GET /events/:id):", errorData)
      return NextResponse.json(
        { message: errorData.message || "Failed to fetch event from backend.", errors: errorData.errors || {} },
        { status: response.status }
      )
    }
  } catch (error: any) {
    console.error("Error in Next.js API route (GET /api/events/[id]):", error)
    return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 })
  }
}

// Update event (handles POST from frontend, forwards as POST with _method to Laravel)
export async function POST(req: Request, { params }: { params: { id: string } }) {
  const { id } = params

  if (!LARAVEL_API_BASE_URL) {
    console.error(
      "NEXT_PUBLIC_API_URL is not defined. Please set it in your .env.local or Vercel environment variables.",
    )
    return NextResponse.json({ message: "Server configuration error: API URL not set." }, { status: 500 })
  }

  try {
    const formData = await req.formData()
    
    // Add Laravel's method override for PUT request
    formData.append('_method', 'PUT')

    const laravelApiUrl = `${LARAVEL_API_BASE_URL}/events/${id}`
    console.log(`Forwarding update request to Laravel: ${laravelApiUrl}`)

    const response = await fetch(laravelApiUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        // Don't set Content-Type header when using FormData - let the browser set it with boundary
      },
      body: formData,
    })

    if (response.ok) {
      // Check if response actually contains JSON
      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        const responseText = await response.text()
        console.error(`Laravel returned non-JSON response:`, responseText)
        return NextResponse.json(
          { message: "Event updated successfully but backend returned invalid response format" },
          { status: 200 }
        )
      }

      const data = await response.json()
      return NextResponse.json({ message: "Event updated successfully!", data }, { status: 200 })
    } else {
      let errorData
      try {
        const contentType = response.headers.get("content-type")
        if (contentType && contentType.includes("application/json")) {
          errorData = await response.json()
        } else {
          const responseText = await response.text()
          console.error(`Laravel returned non-JSON error response (Status: ${response.status}):`, responseText)
          return NextResponse.json(
            { message: `Failed to update event. Laravel returned non-JSON response. Status: ${response.status}` },
            { status: 500 }
          )
        }
      } catch (jsonError) {
        const responseText = await response.text()
        console.error(`Laravel returned non-JSON error response (Status: ${response.status}):`, responseText)
        return NextResponse.json(
          { message: `Failed to update event. Laravel returned non-JSON response. Status: ${response.status}` },
          { status: 500 }
        )
      }

      console.error("Error from Laravel API (PUT /events):", errorData)
      return NextResponse.json(
        { message: errorData.message || "Failed to update event via backend.", errors: errorData.errors || {} },
        { status: response.status }
      )
    }
  } catch (error: any) {
    console.error("Error in Next.js API route (POST /api/events/[id]):", error)
    return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { id } = params

  if (!LARAVEL_API_BASE_URL) {
    console.error(
      "NEXT_PUBLIC_API_URL is not defined. Please set it in your .env.local or Vercel environment variables.",
    )
    return NextResponse.json({ message: "Server configuration error: API URL not set." }, { status: 500 })
  }

  try {
    const laravelApiUrl = `${LARAVEL_API_BASE_URL}/events/${id}`
    console.log(`Deleting event from Laravel: ${laravelApiUrl}`)

    const response = await fetch(laravelApiUrl, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })

    if (response.ok) {
      // Check if response actually contains JSON
      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        // For DELETE requests, it's common to return empty response
        return NextResponse.json({ message: "Event deleted successfully!" }, { status: 200 })
      }

      try {
        const data = await response.json()
        return NextResponse.json({ message: "Event deleted successfully!", data }, { status: 200 })
      } catch {
        // If JSON parsing fails but response is ok, assume deletion was successful
        return NextResponse.json({ message: "Event deleted successfully!" }, { status: 200 })
      }
    } else {
      let errorData
      try {
        const contentType = response.headers.get("content-type")
        if (contentType && contentType.includes("application/json")) {
          errorData = await response.json()
        } else {
          const responseText = await response.text()
          console.error(`Laravel returned non-JSON error response (Status: ${response.status}):`, responseText)
          return NextResponse.json(
            { message: `Failed to delete event. Laravel returned non-JSON response. Status: ${response.status}` },
            { status: 500 }
          )
        }
      } catch (jsonError) {
        const responseText = await response.text()
        console.error(`Laravel returned non-JSON error response (Status: ${response.status}):`, responseText)
        return NextResponse.json(
          { message: `Failed to delete event. Laravel returned non-JSON response. Status: ${response.status}` },
          { status: 500 }
        )
      }

      console.error("Error from Laravel API (DELETE /events):", errorData)
      return NextResponse.json(
        { message: errorData.message || "Failed to delete event from backend.", errors: errorData.errors || {} },
        { status: response.status }
      )
    }
  } catch (error: any) {
    console.error("Error in Next.js API route (DELETE /api/events/[id]):", error)
    return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 })
  }
}