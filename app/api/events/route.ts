import { NextResponse } from 'next/server';

const LARAVEL_BASE_URL = process.env.NEXT_PUBLIC_API_URL; // This is http://localhost:8000

export async function GET() {
  try {
    // Explicitly add /api to the base URL for API calls
    const response = await fetch(`${LARAVEL_BASE_URL}/events`, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error fetching events from Laravel:', errorData);
      return NextResponse.json({ message: 'Failed to fetch events', error: errorData }, { status: response.status });
    }

    const events = await response.json();
    return NextResponse.json(events);
  } catch (error) {
    console.error('Server error during GET:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const newFormData = new FormData();

    for (const [key, value] of formData.entries()) {
      if (key.startsWith('images[')) {
        newFormData.append('images[]', value);
      } else {
        newFormData.append(key, value);
      }
    }

    // Explicitly add /api to the base URL for API calls
    const response = await fetch(`${LARAVEL_BASE_URL}/events`, {
      method: 'POST',
      body: newFormData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error creating event in Laravel:', errorData);
      return NextResponse.json({ message: 'Failed to create event', error: errorData }, { status: response.status });
    }

    const newEvent = await response.json();
    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error('Server error during POST:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
