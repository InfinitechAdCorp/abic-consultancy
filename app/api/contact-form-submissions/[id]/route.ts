import { NextResponse } from "next/server"

const LARAVEL_API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { id } = params

  if (!LARAVEL_API_BASE_URL) {
    console.error(
      "NEXT_PUBLIC_API_URL is not defined. Please set it in your .env.local or Vercel environment variables.",
    )
    return NextResponse.json({ message: "Server configuration error: API URL not set." }, { status: 500 })
  }

  try {
    const laravelApiUrl = `${LARAVEL_API_BASE_URL}/contact-form-submissions/${id}`

    console.log(`Deleting contact form submission from Laravel: ${laravelApiUrl}`)

    const response = await fetch(laravelApiUrl, {
      method: "DELETE",
      headers: {
        Accept: "application/json", // Explicitly tell Laravel we prefer JSON
        // Add any necessary authentication headers for your Laravel API here
      },
    })

    if (response.ok) {
      // Laravel's destroy method typically returns a 204 No Content or 200 OK with a success message
      // We'll return a 200 OK with a generic success message for consistency
      return NextResponse.json({ message: "Submission deleted successfully!" }, { status: 200 })
    } else {
      let errorData
      try {
        errorData = await response.json()
      } catch (jsonError) {
        const responseText = await response.text()
        console.error(`Laravel returned non-JSON response (Status: ${response.status}):`, responseText)
        return NextResponse.json(
          {
            message: `Failed to delete submission from backend. Laravel returned non-JSON response. Status: ${response.status}`,
          },
          { status: 500 },
        )
      }

      console.error("Error from Laravel API (DELETE /contact-form-submissions):", errorData)
      return NextResponse.json(
        { message: errorData.message || "Failed to delete submission from backend.", errors: errorData.errors || {} },
        { status: response.status },
      )
    }
  } catch (error: any) {
    console.error("Error in Next.js API route (DELETE /api/contact-form-submissions/[id]):", error)
    return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 })
  }
}
