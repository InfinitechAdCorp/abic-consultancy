import { NextResponse } from 'next/server';

const LARAVEL_API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!LARAVEL_API_BASE_URL) {
  console.error('NEXT_PUBLIC_API_URL is not defined. Please set it in your environment variables.');
  // In a real application, you might want to throw an error or handle this more gracefully.
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');
  const sessionId = searchParams.get('sessionId');

  try {
    let url = '';
    if (action === 'getSessions') {
      url = `${LARAVEL_API_BASE_URL}/admin/chat-sessions`;
    } else if (action === 'getMessages' && sessionId) {
      url = `${LARAVEL_API_BASE_URL}/admin/chat-sessions/${sessionId}/messages`;
    } else {
      return NextResponse.json({ message: 'Invalid GET request action or missing sessionId.' }, { status: 400 });
    }

    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(errorData, { status: response.status });
    }
    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error('Error in GET /api/admin/chatbot:', error);
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');
  const sessionId = searchParams.get('sessionId');
  const body = await request.json();

  try {
    if (action === 'addMessage' && sessionId) {
      const url = `${LARAVEL_API_BASE_URL}/admin/chat-sessions/${sessionId}/messages`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return NextResponse.json(errorData, { status: response.status });
      }
      const data = await response.json();
      return NextResponse.json(data, { status: 201 });
    } else {
      return NextResponse.json({ message: 'Invalid POST request action or missing sessionId.' }, { status: 400 });
    }
  } catch (error: any) {
    console.error('Error in POST /api/admin/chatbot:', error);
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');
  const sessionId = searchParams.get('sessionId');
  const body = await request.json();

  try {
    if (action === 'updateStatus' && sessionId) {
      const url = `${LARAVEL_API_BASE_URL}/admin/chat-sessions/${sessionId}/status`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return NextResponse.json(errorData, { status: response.status });
      }
      const data = await response.json();
      return NextResponse.json(data, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Invalid PUT request action or missing sessionId.' }, { status: 400 });
    }
  } catch (error: any) {
    console.error('Error in PUT /api/admin/chatbot:', error);
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}
