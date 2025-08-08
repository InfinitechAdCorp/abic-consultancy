import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date')
    
    if (!date) {
      return NextResponse.json(
        { success: false, message: 'Date is required' },
        { status: 400 }
      )
    }

    // Fetch consultations for the specific date from Laravel backend
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/consultations?preferred_date=${date}`, {
      headers: {
        'Accept': 'application/json',
      }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch consultations')
    }

    const result = await response.json()
    const consultations = result.data?.data || []

    // Count consultations per time slot
    const timeSlotCounts: Record<string, number> = {}
    
    consultations.forEach((consultation: any) => {
      if (consultation.preferred_time) {
        timeSlotCounts[consultation.preferred_time] = (timeSlotCounts[consultation.preferred_time] || 0) + 1
      }
    })

    return NextResponse.json({
      success: true,
      data: timeSlotCounts
    })

  } catch (error) {
    console.error('Time slots API error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch time slot availability' },
      { status: 500 }
    )
  }
}
