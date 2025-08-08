import { NextRequest, NextResponse } from 'next/server';

const LARAVEL_API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(request: NextRequest) {
  // Extract the ID directly from the request URL's pathname
  const pathSegments = request.nextUrl.pathname.split('/');
  const id = pathSegments[pathSegments.length - 1];

  if (!LARAVEL_API_BASE_URL) {
    return NextResponse.json({ message: 'NEXT_PUBLIC_API_URL is not defined' }, { status: 500 });
  }

  try {
    // Fetch a single event from the Laravel API
    const response = await fetch(`${LARAVEL_API_BASE_URL}/events/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Ensure fresh data
    });

    if (!response.ok) {
      // Check if the response is actually JSON before parsing
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const errorData = await response.json();
        console.error(`Error fetching event ${id} from Laravel (JSON error):`, errorData);
        return NextResponse.json({ message: 'Failed to fetch event', error: errorData }, { status: response.status });
      } else {
        // If not JSON, it's likely an HTML error page
        const errorText = await response.text();
        console.error(`Error fetching event ${id} from Laravel (Non-JSON error, status ${response.status}):`, errorText.substring(0, 200) + '...'); // Log first 200 chars of HTML
        return NextResponse.json({ message: `Failed to fetch event: Unexpected response from backend (Status: ${response.status})` }, { status: 500 });
      }
    }

    const event = await response.json();
    return NextResponse.json(event);
  } catch (error: any) {
    console.error(`Server error during GET for event ${id}:`, error);
    return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  // Extract the ID directly from the request URL's pathname
  const pathSegments = request.nextUrl.pathname.split('/');
  const id = pathSegments[pathSegments.length - 1];

  if (!LARAVEL_API_BASE_URL) {
    return NextResponse.json({ message: 'NEXT_PUBLIC_API_URL is not defined' }, { status: 500 });
  }

  try {
    const formData = await request.formData();
    const newFormData = new FormData();

    for (const [key, value] of formData.entries()) {
      if (key.startsWith('images[')) {
        newFormData.append('images[]', value);
      } else if (key.startsWith('images_to_delete[]')) {
        newFormData.append('images_to_delete[]', value);
      } else {
        newFormData.append(key, value);
      }
    }

    newFormData.append('_method', 'PUT');

    const response = await fetch(`${LARAVEL_API_BASE_URL}/events/${id}`, {
      method: 'POST', // Still POST from Next.js, but with override
      body: newFormData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(`Error updating event ${id} in Laravel:`, errorData);
      return NextResponse.json({ message: 'Failed to update event', error: errorData }, { status: response.status });
    }

    const updatedEvent = await response.json();
    return NextResponse.json(updatedEvent);
  } catch (error: any) {
    console.error(`Server error during PUT for event ${id}:`, error);
    return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  // Extract the ID directly from the request URL's pathname
  const pathSegments = request.nextUrl.pathname.split('/');
  const id = pathSegments[pathSegments.length - 1];

  if (!LARAVEL_API_BASE_URL) {
    return NextResponse.json({ message: 'NEXT_PUBLIC_API_URL is not defined' }, { status: 500 });
  }

  try {
    const response = await fetch(`${LARAVEL_API_BASE_URL}/events/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(`Error deleting event ${id} in Laravel:`, errorData);
      return NextResponse.json({ message: 'Failed to delete event', error: errorData }, { status: response.status });
    }

    return NextResponse.json({ message: `Event ${id} deleted successfully` });
  } catch (error: any) {
    console.error(`Server error during DELETE for event ${id}:`, error);
    return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
  }
}
