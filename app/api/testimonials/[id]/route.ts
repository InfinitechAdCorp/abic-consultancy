import { NextRequest, NextResponse } from 'next/server';

const LARAVEL_API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Handler for PATCH requests (e.g., updating approval status or other fields)
export async function PATCH(request: NextRequest) {
  // Extract the ID directly from the request URL's pathname
  const pathSegments = request.nextUrl.pathname.split('/');
  const id = pathSegments[pathSegments.length - 1];

  if (!LARAVEL_API_BASE_URL) {
    return NextResponse.json({ message: 'NEXT_PUBLIC_API_URL is not defined' }, { status: 500 });
  }

  try {
    const body = await request.json();
    const response = await fetch(`${LARAVEL_API_BASE_URL}/testimonials/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // Add any necessary authentication headers if your Laravel API requires them
        // 'Authorization': `Bearer ${process.env.LARAVEL_API_TOKEN}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(`Failed to update testimonial ${id} in Laravel:`, errorData);
      return NextResponse.json({ message: `Failed to update testimonial ${id}`, error: errorData }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error(`Error in PATCH /api/testimonials/${id}:`, error);
    return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
  }
}

// Handler for PUT requests (e.g., full replacement of testimonial data)
export async function PUT(request: NextRequest) {
  // Extract the ID directly from the request URL's pathname
  const pathSegments = request.nextUrl.pathname.split('/');
  const id = pathSegments[pathSegments.length - 1];

  if (!LARAVEL_API_BASE_URL) {
    return NextResponse.json({ message: 'NEXT_PUBLIC_API_URL is not defined' }, { status: 500 });
  }

  try {
    const body = await request.json();
    const response = await fetch(`${LARAVEL_API_BASE_URL}/testimonials/${id}`, {
      method: 'PUT', // Or 'PATCH' depending on your Laravel API's update method
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // 'Authorization': `Bearer ${process.env.LARAVEL_API_TOKEN}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(`Failed to update testimonial ${id} in Laravel:`, errorData);
      return NextResponse.json({ message: `Failed to update testimonial ${id}`, error: errorData }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error(`Error in PUT /api/testimonials/${id}:`, error);
    return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
  }
}

// Handler for DELETE requests
export async function DELETE(request: NextRequest) {
  // Extract the ID directly from the request URL's pathname
  const pathSegments = request.nextUrl.pathname.split('/');
  const id = pathSegments[pathSegments.length - 1];

  if (!LARAVEL_API_BASE_URL) {
    return NextResponse.json({ message: 'NEXT_PUBLIC_API_URL is not defined' }, { status: 500 });
  }

  try {
    const response = await fetch(`${LARAVEL_API_BASE_URL}/testimonials/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json', // Laravel expects this for JSON responses
        // 'Authorization': `Bearer ${process.env.LARAVEL_API_TOKEN}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(`Failed to delete testimonial ${id} in Laravel:`, errorData);
      return NextResponse.json({ message: `Failed to delete testimonial ${id}`, error: errorData }, { status: response.status });
    }

    // Laravel's destroy method typically returns a 204 No Content on success
    // If it returns JSON, you might need to parse it, but 204 is common for successful deletion.
    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    console.error(`Error in DELETE /api/testimonials/${id}:`, error);
    return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
  }
}
