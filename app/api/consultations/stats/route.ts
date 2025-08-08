import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/consultations-stats`, {
      headers: {
        'Accept': 'application/json',
      }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch stats from Laravel backend')
    }

    const result = await response.json()

    return NextResponse.json(result)
  } catch (error) {
    console.error('Stats API Error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch consultation stats' },
      { status: 500 }
    )
  }
}
