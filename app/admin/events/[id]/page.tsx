"use client"

import React, { useState, useEffect, FormEvent, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, ArrowLeft, Edit, Trash2, X } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import Image from 'next/image'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { MultiImageUploadDropzone, ExistingImage } from '@/components/multi-image-upload-dropzone' // Import new component

interface Event {
  id: number;
  title: string;
  location: string;
  description: string;
  images: ExistingImage[]; // Array of image objects
  created_at: string;
  updated_at: string;
}

export default function EventDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const { id } = params
  const { toast } = useToast()

  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editFormData, setEditFormData] = useState<Partial<Event> | null>(null)
  const [newFiles, setNewFiles] = useState<File[]>([])
  const [imagesToDelete, setImagesToDelete] = useState<number[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null);

  const fetchEvent = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/events/${id}`);
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch event.');
      }
      setEvent(result);
      setEditFormData(result); // Initialize edit form with fetched data
    } catch (err: any) {
      console.error('Error fetching event:', err);
      setError(err.message || 'Failed to load event.');
      setEvent(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchEvent();
    }
  }, [id, fetchEvent]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditFormData(prev => prev ? { ...prev, [name]: value } : null)
  }

  const handleFilesChange = (files: File[], idsToDelete: number[]) => {
    setNewFiles(files)
    setImagesToDelete(idsToDelete)
  }

  const handleEditSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!editFormData || !event) return

    setIsSubmitting(true)
    setError(null);

    const data = new FormData()
    data.append('title', editFormData.title || '')
    data.append('location', editFormData.location || '')
    data.append('description', editFormData.description || '')

    // Append new files
    newFiles.forEach((file, index) => {
      data.append(`images[${index}]`, file)
    })

    // Append image IDs to delete
    imagesToDelete.forEach((imageId) => {
      data.append('images_to_delete[]', String(imageId))
    })

    try {
      const response = await fetch(`/api/events/${event.id}`, {
        method: 'PUT', // Will be handled by Next.js API route as POST with X-HTTP-Method-Override
        body: data,
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Failed to update event.')
      }

      toast({
        title: "Success",
        description: "Event updated successfully!"
      })
      setIsEditing(false)
      fetchEvent(); // Re-fetch to update UI with latest data
    } catch (err: any) {
      console.error('Error updating event:', err)
      setError(err.message || "There was an error updating the event.");
      toast({
        variant: "destructive",
        title: "Error",
        description: err.message || "Failed to update event."
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteEvent = async () => {
    if (!event) return

    setIsDeleting(true)
    setError(null);

    try {
      const response = await fetch(`/api/events/${event.id}`, {
        method: 'DELETE',
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Failed to delete event.')
      }

      toast({
        title: "Success",
        description: "Event deleted successfully!"
      })
      router.push('/admin/events') // Redirect to the admin list after deletion
    } catch (err: any) {
      console.error('Error deleting event:', err)
      setError(err.message || "There was an error deleting the event.");
      toast({
        variant: "destructive",
        title: "Error",
        description: err.message || "Failed to delete event."
      })
    } finally {
      setIsDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-gray-700" />
        <span className="ml-2 text-gray-700">Loading event...</span>
      </div>
    )
  }

  if (error || !event) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <X className="h-12 w-12 text-red-500 mb-4" />
        <p className="text-xl text-red-500 mb-4">Error: {error || 'Event not found.'}</p>
        <Button onClick={() => router.push('/admin/events')}>Go Back to Events</Button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 md:px-6">
        <Button variant="ghost" size="sm" onClick={() => router.push('/admin/events')}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Events
        </Button>
        <h1 className="text-lg font-semibold ml-4">{isEditing ? 'Edit Event' : 'Event Details'}</h1>
        <div className="ml-auto flex gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" form="edit-event-form" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                <Edit className="h-4 w-4 mr-2" /> Edit
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">
                    <Trash2 className="h-4 w-4 mr-2" /> Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the event
                      and all its associated images from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteEvent} disabled={isDeleting}>
                      {isDeleting ? 'Deleting...' : 'Continue'}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          )}
        </div>
      </header>
      <main className="flex-1 overflow-auto p-4 md:p-6">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>{event.title}</CardTitle>
          </CardHeader>
          <CardContent>
            {isEditing && editFormData ? (
              <form id="edit-event-form" onSubmit={handleEditSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="editTitle">Event Title</Label>
                  <Input id="editTitle" name="title" value={editFormData.title || ''} onChange={handleFormChange} required disabled={isSubmitting} />
                </div>
                <div>
                  <Label htmlFor="editLocation">Location</Label>
                  <Input id="editLocation" name="location" value={editFormData.location || ''} onChange={handleFormChange} required disabled={isSubmitting} />
                </div>
                <div>
                  <Label htmlFor="editDescription">Description</Label>
                  <Textarea id="editDescription" name="description" value={editFormData.description || ''} onChange={handleFormChange} required rows={5} disabled={isSubmitting} />
                </div>
                <MultiImageUploadDropzone
                  id="editEventImages"
                  label="Event Images"
                  existingImages={event.images}
                  onFilesChange={handleFilesChange}
                  disabled={isSubmitting}
                />
              </form>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Location</Label>
                    <p className="text-lg">{event.location}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Created On</Label>
                    <p className="text-sm">{new Date(event.created_at).toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })}</p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Description</Label>
                  <p className="text-sm mt-1 p-3 bg-gray-50 rounded-md">{event.description}</p>
                </div>
                {event.images && event.images.length > 0 && (
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Event Images</Label>
                    <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {event.images.map((img, index) => (
                        <div key={img.id} className="relative w-full aspect-square rounded-md overflow-hidden border border-gray-200">
                          <Image
                            src={`${process.env.NEXT_PUBLIC_API_URL}${img.image_path}`}
                            alt={`Event Image ${index + 1}`}
                            layout="fill"
                            objectFit="cover"
                            className="object-center"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {event.images.length === 0 && (
                  <div className="text-gray-500 text-sm mt-2">No images available for this event.</div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
