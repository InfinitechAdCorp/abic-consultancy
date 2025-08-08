import { NextResponse, NextRequest } from 'next/server';

const LARAVEL_API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(request: NextRequest) {
try {
  const includeUnapproved = request.nextUrl.searchParams.get('include_unapproved');
  let apiUrl = `${LARAVEL_API_BASE_URL}/testimonials`;
  if (includeUnapproved) {
    apiUrl += `?include_unapproved=${includeUnapproved}`;
  }

  const response = await fetch(apiUrl, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    // Add any necessary authentication headers if your Laravel API requires them
    // 'Authorization': `Bearer ${process.env.LARAVEL_API_TOKEN}`,
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Failed to fetch testimonials from Laravel:', errorData);
    return NextResponse.json({ message: 'Failed to fetch testimonials', error: errorData }, { status: response.status });
  }

  const data = await response.json();
  return NextResponse.json(data);
} catch (error) {
  console.error('Error in GET /api/testimonials:', error);
  return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
}
}

export async function POST(request: Request) {
try {
  const body = await request.json();
  const response = await fetch(`${LARAVEL_API_BASE_URL}/testimonials`, {
    method: 'POST',
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
    console.error('Failed to submit testimonial to Laravel:', errorData);
    return NextResponse.json({ message: 'Failed to submit testimonial', error: errorData }, { status: response.status });
  }

  const data = await response.json();
  return NextResponse.json(data, { status: 201 });
} catch (error) {
  console.error('Error in POST /api/testimonials:', error);
  return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
}
}
