"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { CalendarDays } from "lucide-react"
import { useEffect } from "react"

interface Announcement {
  id: number
  title: string
  content: string
  date: string
  created_at: string
  updated_at: string
}

interface AnnouncementDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  announcement: Announcement | null
}

export default function AnnouncementDetailsModal({ isOpen, onClose, announcement }: AnnouncementDetailsModalProps) {
  useEffect(() => {
    console.log("AnnouncementDetailsModal rendered. isOpen:", isOpen, "Announcement:", announcement?.title)
  }, [isOpen, announcement])

  if (!announcement) {
    console.log("AnnouncementDetailsModal: No announcement data, returning null.")
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto z-[9999]">
        <DialogHeader className="p-6 pb-4 border-b border-gray-200">
          <DialogTitle className="text-3xl font-bold text-gray-900 text-center">{announcement.title}</DialogTitle>
          {/* Changed text-center to text-left and justify-center to justify-start */}
          <DialogDescription className="text-left text-gray-600 flex items-center justify-start gap-2">
            <CalendarDays className="h-4 w-4 text-purple-500" />
            <span>
              {new Date(announcement.date).toLocaleDateString("en-US", {
                month: "long",
                day: "2-digit",
                year: "numeric",
              })}
            </span>
          </DialogDescription>
        </DialogHeader>
        <div className="px-6 py-4">
          <div className="space-y-4 text-gray-700 text-sm md:text-base">
            <p
              className="text-base mt-1 p-3 bg-gray-50 rounded-md whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: announcement.content.replace(/\n/g, "<br />") }}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
