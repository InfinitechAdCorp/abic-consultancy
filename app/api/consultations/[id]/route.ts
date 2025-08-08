import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(request: NextRequest) {
  try {
    // Extract the ID directly from the request URL's pathname
    const pathSegments = request.nextUrl.pathname.split('/');
    const consultationId = pathSegments[pathSegments.length - 1]; // Get the last segment as the ID

    const { status } = await request.json();

    if (!status) {
      return NextResponse.json(
        { success: false, message: 'Status is required' },
        { status: 400 }
      );
    }

    const laravelApiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!laravelApiUrl) {
      return NextResponse.json({ message: 'NEXT_PUBLIC_API_URL is not defined' }, { status: 500 });
    }

    // Update status in Laravel backend
    const response = await fetch(`${laravelApiUrl}/consultations/${consultationId}`, {
      method: 'PUT', // Note: PATCH is typically used for partial updates, PUT for full replacement.
                      // If your Laravel API expects PUT for this operation, it's fine.
                      // Otherwise, consider changing to 'PATCH' if Laravel supports it.
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ status })
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { success: false, message: 'Failed to update status', error: errorData },
        { status: response.status }
      );
    }

    const result = await response.json();
    return NextResponse.json({
      success: true,
      message: 'Status updated successfully',
      data: result.data
    });
  } catch (error: any) { // Added 'any' type for error for broader compatibility
    console.error('Update status error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error', error: error.message }, // Include error message for debugging
      { status: 500 }
    );
  }
}
