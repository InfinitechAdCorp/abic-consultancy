"use client"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { MapPin, CalendarDays, ArrowRight, ImageIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState, useEffect } from 'react'
import Link from "next/link"
import { useRouter } from 'next/navigation'

// Updated Event interface to include an array of images
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

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/events'); // Fetch from your Next.js API route
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Event[] = await response.json();
      setEvents(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (eventId: number) => {
    router.push(`/events/${eventId}`); // Redirect to the new event details page
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-700">Loading events...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-500">Error: {error}</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <Navigation />
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-blue-100 via-green-100 to-purple-100 overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('/subtle-pattern.png')] bg-repeat animate-pulse-subtle"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-3xl animate-blob-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-orange-400/20 rounded-full blur-3xl animate-blob-fast" style={{ animationDelay: '1s' }}></div>
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
              Our Upcoming <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Events</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Join us at our next gathering and connect with industry leaders and innovators.
            </p>
          </div>
        </div>
      </section>
      {/* Events Grid Section */}
      <section id="events-list" className="py-20 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('/subtle-pattern.png')] bg-repeat animate-pulse-subtle animation-delay-500"></div>
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 animate-fade-in-up">
              <h2 className="text-3xl font-bold mb-4">Explore Our Events</h2>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                Discover upcoming conferences, workshops, and networking opportunities.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <Card
                  key={event.id}
                  className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden p-0"
                  onClick={() => handleCardClick(event.id)}
                >
                  <div className="relative w-full h-48">
                    {event.images && event.images.length > 0 ? (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '')}${event.images[0].image_path}`} // Corrected path
                        alt={event.title}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-300 hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <ImageIcon className="w-16 h-16 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <CardHeader className="pt-4 pb-2 px-6">
                    <CardTitle className="text-xl font-bold">{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-6 pt-0 px-6 space-y-2">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 text-blue-500" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <CalendarDays className="h-4 w-4 mr-2 text-green-500" />
                       <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      
      <Footer />
      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
        @keyframes blob-slow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          30% { transform: translate(20px, -30px); }
          60% { transform: translate(-10px, 40px); }
        }
        .animate-blob-slow {
          animation: blob-slow 15s infinite ease-in-out alternate;
        }
        @keyframes blob-fast {
          0%, 100% { transform: translate(0, 0) scale(1); }
          40% { transform: translate(-25px, 35px); }
          70% { transform: translate(15px, -20px); }
        }
        .animate-blob-fast {
          animation: blob-fast 12s infinite ease-in-out alternate;
        }
        @keyframes pulse-subtle {
          0%, 100% { opacity: 0.05; }
          50% { opacity: 0.08; }
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 10s infinite ease-in-out alternate;
        }
      `}</style>
    </main>
  )
}
