"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CalendarDays, Loader2, ArrowLeft } from 'lucide-react'
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

interface Announcement {
  id: number;
  title: string;
  content: string;
  date: string;
  created_at: string;
  updated_at: string;
}

export default function AnnouncementDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const { id } = params
  const [announcement, setAnnouncement] = useState<Announcement | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAnnouncement = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/announcements/${id}`)
      const result = await response.json()
      if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch announcement.');
      }
      setAnnouncement(result);
    } catch (err: any) {
      console.error('Error fetching announcement:', err)
      setError(err.message || 'Failed to load announcement.')
      setAnnouncement(null)
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    if (id) {
      fetchAnnouncement()
    }
  }, [id, fetchAnnouncement])

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-700" />
        <span className="ml-2 text-gray-700">Loading announcement details...</span>
      </main>
    )
  }

  if (error || !announcement) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Announcement Not Found</h1>
        <p className="text-lg text-gray-700 mb-6">{error || 'The announcement you are looking for does not exist.'}</p>
        <Button onClick={() => router.push('/announcements')}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to All Announcements
        </Button>
      </main>
    )
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navigation />
      <section className="flex-1 py-12 md:py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
        <div className="container mx-auto px-6 lg:px-8">
          <Button variant="ghost" onClick={() => router.push('/announcements')} className="mb-8 text-gray-700 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to All Announcements
          </Button>
          <Card className="max-w-5xl mx-auto shadow-xl border-0 p-6 md:p-8">
            <CardHeader className="pb-4 text-center">
              <CardTitle className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
                {announcement.title}
              </CardTitle>
              <div className="flex flex-col sm:flex-row items-center justify-center text-gray-600 text-lg gap-2 sm:gap-4 mb-4">
                <div className="flex items-center">
                  <CalendarDays className="h-5 w-5 mr-2 text-purple-500" />
                  <span>{new Date(announcement.date).toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed mx-auto">
                <p
                  className="text-sm mt-1 p-3 bg-gray-50 rounded-md whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: announcement.content.replace(/\n/g, '<br />') }}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      <Footer />
    </main>
  )
}
