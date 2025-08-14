import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    //  Forward all query parameters to Laravel backend instead of using mock data
    const params = new URLSearchParams()
    searchParams.forEach((value, key) => {
      params.append(key, value)
    })

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hr-consultations?${params.toString()}`, {
      headers: {
        'Accept': 'application/json',
      }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch consultations from Laravel backend')
    }

    const result = await response.json()

    return NextResponse.json(result)
  } catch (error) {
    console.error('List API Error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch consultations' },
      { status: 500 }
    )
  }
}
