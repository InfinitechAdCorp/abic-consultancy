"use client"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays } from "lucide-react"
import { useState, useEffect } from "react"
import AnnouncementDetailsModal from "@/components/announcement-details-modal"

interface Announcement {
  id: number
  title: string
  content: string
  date: string
  created_at: string
  updated_at: string
}

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [error, setError] = useState<string | null>(null)
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false)
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null)

  useEffect(() => {
    fetchAnnouncements()
  }, [])

  const fetchAnnouncements = async () => {
    setError(null)
    try {
      const response = await fetch("/api/announcements")
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data: Announcement[] = await response.json()
      setAnnouncements(data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()))
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleCardClick = (announcement: Announcement) => {
    console.log("Card clicked:", announcement.title)
    setSelectedAnnouncement(announcement)
    setShowAnnouncementModal(true)
    console.log("showAnnouncementModal state set to:", true)
  }

  const handleCloseModal = () => {
    console.log("Closing modal.")
    setShowAnnouncementModal(false)
    setSelectedAnnouncement(null)
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-500">Error: {error}</p>
      </main>
    )
  }

  return (
    <>
      <main className="min-h-screen flex flex-col">
        <Navigation />
        {/* Hero Section - Simplified background */}
        <section className="relative py-24 bg-gradient-to-br from-blue-100 via-green-100 to-purple-100 overflow-hidden">
          {/* Removed complex absolute background elements */}
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
                LATEST{" "}
                <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  ANNOUNCEMENTS
                </span>
              </h1>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">STAY UPDATED TO OUR ANNOUNCEMENTS</p>
            </div>
          </div>
        </section>

        {/* Announcements Grid Section - Simplified background */}
        <section
          id="announcements-list"
          className="flex-1 py-20 bg-gradient-to-br from-pink-50 via-orange-50 to-purple-50 relative overflow-hidden"
        >
          {/* Removed complex absolute background elements */}
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
                  <Card
                    key={announcement.id}
                    className="border-2 border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 overflow-hidden p-0 flex flex-col h-full cursor-pointer"
                    onClick={() => handleCardClick(announcement)}
                  >
                    <CardHeader className="pt-6 pb-2 px-6">
                      <CardTitle className="text-2xl font-bold text-gray-900 leading-tight">
                        {announcement.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pb-6 pt-0 px-6 space-y-3 flex-1 flex flex-col">
                      <p className="text-gray-700 text-base line-clamp-3 leading-relaxed">{announcement.content}</p>
                      <div className="space-y-2 mt-4">
                        <div className="flex items-center text-gray-600 text-sm">
                          <CalendarDays className="h-4 w-4 mr-2 text-purple-500" />
                          <span>
                            {new Date(announcement.date).toLocaleDateString("en-US", {
                              month: "long",
                              day: "2-digit",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>

      {/* Announcement Details Modal */}
      <AnnouncementDetailsModal
        isOpen={showAnnouncementModal}
        onClose={handleCloseModal}
        announcement={selectedAnnouncement}
      />
    </>
  )
}
