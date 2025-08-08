"use client"
import React, { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { MapPin, CalendarDays, Loader2, ArrowLeft, ImageIcon } from 'lucide-react'
import Image from 'next/image'
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

interface Event {
  id: number;
  title: string;
  location: string;
   date: string;
  description: string;
  images: {
    id: number;
    image_path: string;
  }[];
  created_at: string;
  updated_at: string;
}

export default function PublicEventDetailsPageDesign1() {
  const router = useRouter()
  const params = useParams()
  const { id } = params
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [mainImage, setMainImage] = useState<string | null>(null)

  const fetchEvent = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/events/${id}`)
      const result = await response.json()
      if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch event.')
      }
      setEvent(result)
      if (result.images && result.images.length > 0) {
        setMainImage(`${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '')}${result.images[0].image_path}`)
      } else {
        setMainImage(null)
      }
    } catch (err: any) {
      console.error('Error fetching event:', err)
      setError(err.message || 'Failed to load event.')
      setEvent(null)
      setMainImage(null)
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    if (id) {
      fetchEvent()
    }
  }, [id, fetchEvent])

  const handleThumbnailClick = (imagePath: string) => {
    setMainImage(`${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '')}${imagePath}`)
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-gray-700" />
        <span className="ml-2 text-gray-700">Loading event details...</span>
      </main>
    )
  }

  if (error || !event) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Event Not Found</h1>
        <p className="text-lg text-gray-700 mb-6">{error || 'The event you are looking for does not exist.'}</p>
        <Button onClick={() => router.push('/events')}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to All Events
        </Button>
      </main>
    )
  }

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="container mx-auto px-4 py-6 md:py-8 flex-shrink-0">
          <Button variant="ghost" onClick={() => router.push('/events')} className="mb-6 text-gray-700 hover:text-blue-600">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to All Events
          </Button>
        </div>

        <section className="flex-1 flex flex-col lg:flex-row container mx-auto px-4 pb-8 overflow-hidden">
          {/* Left Column: Main Image & Thumbnails */}
          <div className="lg:w-2/3 lg:pr-8 flex flex-col flex-shrink-0 mb-8 lg:mb-0">
            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg mb-4 bg-gray-100 flex items-center justify-center">
              {mainImage ? (
                <Image
                  src={mainImage || "/placeholder.svg"}
                  alt={`${event.title} Main Image`}
                  fill
                  priority
                  objectFit="cover"
                  className="transition-transform duration-500 ease-in-out"
                />
              ) : (
                <ImageIcon className="w-32 h-32 text-gray-400" />
              )}
            </div>

            {/* Image Thumbnails */}
            {event.images && event.images.length > 0 ? (
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {event.images.map((img) => (
                  <div
                    key={img.id}
                    className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden border-2 transition-all duration-200 cursor-pointer flex-shrink-0
                      ${mainImage === `${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '')}${img.image_path}` ? 'border-blue-500 ring-2 ring-blue-500' : 'border-gray-200 hover:border-gray-400'}`}
                    onClick={() => handleThumbnailClick(img.image_path)}
                  >
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '')}${img.image_path}`}
                      alt={`${event.title} Thumbnail`}
                      fill
                      objectFit="cover"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 text-sm">No additional images.</div>
            )}
          </div>

          {/* Right Column: Event Details */}
          <div className="lg:w-1/3 lg:pl-8 flex flex-col">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
              {event.title}
            </h1>
            <div className="flex items-center text-gray-700 text-lg mb-2">
              <MapPin className="h-5 w-5 mr-2 text-blue-600" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center text-gray-700 text-lg mb-6">
              <CalendarDays className="h-5 w-5 mr-2 text-green-600" />
       <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })}</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">About the Event</h2>
            <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed flex-1 pr-2" style={{ overflowY: 'auto' }}>
              <p>{event.description}</p>
            </div>
            <div className="mt-6 text-sm text-gray-500 border-t pt-4 flex-shrink-0">
              <p>Created: {new Date(event.created_at).toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })}</p>
              <p>Last Updated: {new Date(event.updated_at).toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })}</p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </main>
  )
}
