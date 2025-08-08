import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Extract the ID directly from the request URL's pathname
  // Example: /api/announcements/123 -> pathname: /api/announcements/123 -> segments: ["", "api", "announcements", "123"]
  const pathSegments = request.nextUrl.pathname.split('/');
  const id = pathSegments[pathSegments.length - 1]; // Get the last segment as the ID

  const laravelApiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!laravelApiUrl) {
    return NextResponse.json({ message: 'NEXT_PUBLIC_API_URL is not defined' }, { status: 500 });
  }

  try {
    const response = await fetch(`${laravelApiUrl}/announcements/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Ensure fresh data on each request
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { message: errorData.message || `Failed to fetch announcement with ID ${id} from Laravel` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error(`Error fetching announcement with ID ${id} from Laravel:`, error);
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}
