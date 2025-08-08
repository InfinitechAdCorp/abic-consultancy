import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await request.json()
    const consultationId = params.id

    if (!status) {
      return NextResponse.json(
        { success: false, message: 'Status is required' },
        { status: 400 }
      )
    }

    // Update status in Laravel backend
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/consultations/${consultationId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ status })
    })

    if (!response.ok) {
      const errorData = await response.json()
      return NextResponse.json(
        { success: false, message: 'Failed to update status', error: errorData },
        { status: 500 }
      )
    }

    const result = await response.json()

    return NextResponse.json({
      success: true,
      message: 'Status updated successfully',
      data: result.data
    })

  } catch (error) {
    console.error('Update status error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
