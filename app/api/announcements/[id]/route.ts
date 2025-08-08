import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const laravelApiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!laravelApiUrl) {
    return NextResponse.json({ message: 'NEXT_PUBLIC_API_URL is not defined' }, { status: 500 });
  }

  try {
    // Replace '/api/announcements' with your actual Laravel endpoint for a single announcement
    const response = await fetch(`${laravelApiUrl}/announcements/${id}`, {
      // Add any necessary headers for your Laravel API, e.g., Authorization
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Ensure fresh data on each request
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ message: errorData.message || `Failed to fetch announcement with ID ${id} from Laravel` }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error(`Error fetching announcement with ID ${id} from Laravel:`, error);
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}
