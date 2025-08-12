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
    const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") || "http://localhost:8000";

    const formData = await request.formData();
    formData.append("_method", "PUT");

    const response = await fetch(`${apiUrl}/api/blogs/${params.id}`, {
      method: "POST", // Laravel method spoof
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { message: await response.text() };
      }
      console.error("Laravel update error:", errorData);
      return NextResponse.json(errorData, { status: response.status });
    }

    return NextResponse.json(await response.json());
  } catch (error) {
    console.error("Blog update error:", error);
    return NextResponse.json(
      { error: "Failed to update blog post", message: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
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
