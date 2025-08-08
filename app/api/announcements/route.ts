import { NextResponse } from 'next/server';

const LARAVEL_API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET() {
  if (!LARAVEL_API_BASE_URL) {
    return NextResponse.json({ message: 'NEXT_PUBLIC_API_URL is not defined' }, { status: 500 });
  }

  try {
    const response = await fetch(`${LARAVEL_API_BASE_URL}/announcements`, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Ensure fresh data on each request
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ message: errorData.message || 'Failed to fetch announcements from Laravel' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error fetching announcements from Laravel:', error);
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!LARAVEL_API_BASE_URL) {
    return NextResponse.json({ message: 'NEXT_PUBLIC_API_URL is not defined' }, { status: 500 });
  }

  try {
    const body = await request.json(); // Get the JSON body from the Next.js request

    const response = await fetch(`${LARAVEL_API_BASE_URL}/announcements`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers your Laravel API expects, e.g., Authorization
      },
      body: JSON.stringify(body), // Send the JSON body to Laravel
    });

    const result = await response.json();

    if (!response.ok) {
      return NextResponse.json({ message: result.message || 'Failed to create announcement in Laravel', errors: result.errors }, { status: response.status });
    }

    return NextResponse.json(result, { status: 201 }); // 201 Created
  } catch (error: any) {
    console.error('Error creating announcement in Laravel:', error);
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}
