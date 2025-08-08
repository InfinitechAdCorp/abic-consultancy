"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarDays, ArrowRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import Link from 'next/link' // Import Link for navigation

interface Announcement {
  id: number;
  title: string;
  content: string;
  date: string;
  created_at: string;
  updated_at: string;
}

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/announcements');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Announcement[] = await response.json();
      setAnnouncements(data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())); // Sort by date descending
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-700">Loading announcements...</p>
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
    <main className="min-h-screen flex flex-col">
      <Navigation />
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-blue-100 via-green-100 to-purple-100 overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('/subtle-pattern.png')] bg-repeat animate-pulse-subtle"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-3xl animate-blob-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-orange-400/20 rounded-full blur-3xl animate-blob-fast" style={{ animationDelay: '1s' }}></div>
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
              LATEST <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">ANNOUNCEMENTS</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              STAY UPDATED TO OUR ANNOUNCEMENTS
            </p>
          </div>
        </div>
      </section>
      {/* Announcements Grid Section */}
      <section id="announcements-list" className="flex-1 py-20 bg-gradient-to-br from-pink-50 via-orange-50 to-purple-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('/subtle-pattern.png')] bg-repeat animate-pulse-subtle animation-delay-500"></div>
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 animate-fade-in-up">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">All Announcements</h2>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                Browse through our official communications and news.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {announcements.map((announcement) => (
                <Link
                  key={announcement.id}
                  href={`/announcements/${announcement.id}`}
                  className="block" // Use block to make the entire card clickable
                >
                  <Card
                    className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 overflow-hidden p-0 flex flex-col h-full cursor-pointer"
                  >
                    <CardHeader className="pt-6 pb-2 px-6">
                      <CardTitle className="text-2xl font-bold text-gray-900 leading-tight">
                        {announcement.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pb-6 pt-0 px-6 space-y-3 flex-1 flex flex-col">
                      {announcement.content.length > 50 ? (
                        <>
                          <p className="text-gray-700 text-base line-clamp-3 leading-relaxed">
                            {announcement.content}
                          </p>
                          <div className="space-y-2 mt-4">
                            <div className="flex items-center text-gray-600 text-sm">
                              <CalendarDays className="h-4 w-4 mr-2 text-purple-500" />
                              <span>{new Date(announcement.date).toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })}</span>
                            </div>
                            {/* The Link wrapping the Card already handles navigation, but a visual "Read More" button can be added for clarity */}
                            <Button variant="link" className="px-0 text-blue-600 hover:text-blue-800">
                              Read More <ArrowRight className="ml-1 h-4 w-4" />
                            </Button>
                          </div>
                        </>
                      ) : (
                        <>
                          <p className="text-gray-700 text-base leading-relaxed">
                            {announcement.content}
                          </p>
                          <div className="space-y-2 mt-4">
                            <div className="flex items-center text-gray-600 text-sm">
                              <CalendarDays className="h-4 w-4 mr-2 text-purple-500" />
                              <span>{new Date(announcement.date).toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })}</span>
                            </div>
                          </div>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
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
