'use client'

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MoreHorizontal, Eye, Plus, Search, Loader2, RefreshCw, ArrowUpDown, Edit, Trash2, X, ImageIcon, CalendarIcon } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useState, useEffect, useCallback, ChangeEvent, FormEvent } from "react"
import { useRouter } from 'next/navigation'
import { useToast } from "@/components/ui/use-toast"
import { DataTable } from "@/components/ui/data-table"
import { ColumnDef, ColumnFiltersState, RowSelectionState, useReactTable, getCoreRowModel, getFilteredRowModel, getSortedRowModel } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image"
import { MultiImageUploadDropzone, type ExistingImage } from "@/components/multi-image-upload-dropzone"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"


// Event data type - aligned with Laravel backend, now with 'images' array
interface Event {
  id: number;
  title: string;
  location: string;
  description: string;
  date: string; // Add date field
  images: {
    id: number;
    image_path: string;
  }[];
  created_at: string;
  updated_at: string;
}

// Define a stable empty array reference outside the component
const EMPTY_EXISTING_IMAGES: ExistingImage[] = [];

export default function EventsAdminPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const { toast } = useToast()
  const router = useRouter()

  // DataTable states
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [globalFilter, setGlobalFilter] = useState('')

  // State for mobile detection
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Add new state variables for the create event modal:
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newFormData, setNewFormData] = useState({
    title: '',
    location: '',
    description: '',
    date: new Date(), // Initialize date for new event
  });
  const [newFiles, setNewFiles] = useState<File[]>([]);
  // This state is needed to match the MultiImageUploadDropzone's onFilesChange signature,
  // even if it will always be empty for the create form.
  const [newImagesToDelete, setNewImagesToDelete] = useState<number[]>([]);
  const [isCreating, setIsCreating] = useState(false);

  // Add handler functions for the new event form:
  const handleNewFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewFormData(prev => ({ ...prev, [name]: value }));
  };

  // Memoize handleNewFilesChange to prevent unnecessary re-renders in child component
  // This callback now correctly accepts both newFiles and imagesToDelete
  const handleNewFilesChange = useCallback((files: File[], idsToDelete: number[]) => {
    setNewFiles(files);
    // For the create form, idsToDelete will always be empty from the child,
    // but we need to accept it to match the signature and prevent the child's useEffect from looping.
    setNewImagesToDelete(idsToDelete);
  }, []);

  const handleCreateSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    const data = new FormData();
    data.append('title', newFormData.title);
    data.append('location', newFormData.location);
    data.append('description', newFormData.description);
    data.append('date', format(newFormData.date, 'yyyy-MM-dd')); // Format date for backend
    newFiles.forEach((file, index) => {
      data.append(`images[${index}]`, file);
    });

    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        body: data,
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Failed to create event.');
      }
      toast({
        title: "Success",
        description: "Event created successfully!"
      });
      setIsCreateModalOpen(false); // Close modal
      setNewFormData({ title: '', location: '', description: '', date: new Date() }); // Reset form
      setNewFiles([]); // Clear selected files
      setNewImagesToDelete([]); // Clear images to delete for next create
      fetchEvents(); // Refresh the list
    } catch (error: any) {
      console.error('Error creating event:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "There was an error creating the event."
      });
    } finally {
      setIsCreating(false);
    }
  };

  // Fetch Events
  const fetchEvents = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/events')
      const result = await response.json()
      if (response.ok) {
        setEvents(result)
      } else {
        throw new Error(result.message || 'Failed to fetch events');
      }
    } catch (error) {
      console.error('Failed to fetch events:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load events"
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  // Define columns for DataTable
  const columns: ColumnDef<Event>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "images", // Access images array
      header: "Images",
      cell: ({ row }) => (
        <div className="flex -space-x-2 overflow-hidden">
          {row.original.images.length > 0 ? (
            row.original.images.slice(0, 3).map((img, index) => ( // Show up to 3 images
              <div key={img.id} className="w-10 h-10 relative rounded-full border-2 border-white overflow-hidden first:ml-0">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '')}${img.image_path}`}
                  alt={`Event Image ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  className="object-center"
                />
              </div>
            ))
          ) : (
            <div className="w-10 h-10 relative rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs text-gray-500">
              <ImageIcon className="w-5 h-5" />
            </div>
          )}
          {row.original.images.length > 3 && (
            <div className="w-10 h-10 relative rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs text-gray-600">
              +{row.original.images.length - 3}
            </div>
          )}
        </div>
      ),
    },
    {
      accessorKey: "title",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Event Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="font-semibold text-gray-900">
          {row.original.title}
        </div>
      ),
    },
    {
      accessorKey: "location",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Location
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="truncate max-w-xs">{row.original.location}</div>,
    },
    {
      accessorKey: "date", // New column for date
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Event Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => new Date(row.original.date).toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => <div className="truncate max-w-xs">{row.original.description}</div>,
    },
    {
      accessorKey: "created_at",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => new Date(row.original.created_at).toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const event = row.original;
        return (
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" onClick={() => setSelectedEvent(event)}>
                  <Eye className="h-4 w-4" />
                  <span className="ml-1 sr-only sm:not-sr-only">View</span>
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
                {/* Sheet content will be rendered here, using selectedEvent */}
                {selectedEvent && (
                  <SheetHeader>
                    <SheetTitle>Event Details</SheetTitle>
                    <SheetDescription>
                      Complete information for this event
                    </SheetDescription>
                    <div className="mt-6 space-y-6">
                      {selectedEvent.images && selectedEvent.images.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                          {selectedEvent.images.map((img, idx) => (
                            <div key={img.id || idx} className="relative w-full aspect-video rounded-md overflow-hidden">
                              <Image
                                src={`${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '')}${img.image_path}`}
                                alt={`Event Image ${idx + 1}`}
                                layout="fill"
                                objectFit="cover"
                                className="object-center"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                      {selectedEvent.images.length === 0 && (
                        <div className="relative w-full h-48 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center mb-4">
                          <ImageIcon className="w-16 h-16 text-gray-400" />
                        </div>
                      )}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium text-gray-500">Event Title</Label>
                            <p className="text-lg font-semibold">{selectedEvent.title}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-500">Location</Label>
                            <p className="text-lg">{selectedEvent.location}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-500">Event Date</Label>
                            <p className="text-lg">{new Date(selectedEvent.date).toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })}</p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium text-gray-500">Created On</Label>
                            <p className="text-sm">{new Date(selectedEvent.created_at).toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-500">Last Updated</Label>
                            <p className="text-sm">{new Date(selectedEvent.updated_at).toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })}</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Event Description</Label>
                        <p className="text-sm mt-1 p-3 bg-gray-50 rounded-md">{selectedEvent.description}</p>
                      </div>
                    </div>
                  </SheetHeader>
                )}
              </SheetContent>
            </Sheet>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => router.push(`/admin/events/${event.id}`)}>
                  <Edit className="mr-2 h-4 w-4" /> Edit Event
                </DropdownMenuItem>
                {/* Delete is handled on the details page now */}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  // Initialize table instance
  const table = useReactTable({
    data: events,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      columnFilters,
      globalFilter,
      rowSelection,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
  });

  if (loading) {
    return (
      <SidebarProvider>
        <AppSidebar />
        <div className="flex items-center justify-center min-h-screen w-full">
          <div className="flex items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading events...</span>
          </div>
        </div>
      </SidebarProvider>
    )
  }

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className={`flex-1 min-w-0 ${isMobile ? 'ml-0' : 'ml-72'}`}>
          {isMobile && (
            <div className="sticky top-0 z-50 flex h-12 items-center gap-2 border-b bg-background px-4 md:hidden">
              <SidebarTrigger className="-ml-1" />
              <span className="text-sm font-semibold">Events</span>
            </div>
          )}
          <main className="flex-1 overflow-auto p-4 md:p-6">
            <div className="max-w-full space-y-6">
              {/* Filters and Search */}
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div className="relative w-full sm:w-64">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input
                        placeholder="Search events..."
                        value={globalFilter || ''}
                        onChange={event => setGlobalFilter(event.target.value)}
                        className="pl-9 pr-3 py-2 w-full"
                      />
                    </div>
                    {/* Moved Create Event button here */}
                    <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                      <DialogTrigger asChild>
                        <Button size="sm">
                          <Plus className="mr-2 h-4 w-4" />
                          Create Event
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Create New Event</DialogTitle>
                          <DialogDescription>
                            Fill in the details for your new event.
                          </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleCreateSubmit} className="space-y-6 py-4">
                          <div>
                            <Label htmlFor="newTitle">Event Title</Label>
                            <Input id="newTitle" name="title" value={newFormData.title} onChange={handleNewFormChange} required disabled={isCreating} />
                          </div>
                          <div>
                            <Label htmlFor="newLocation">Location</Label>
                            <Input id="newLocation" name="location" value={newFormData.location} onChange={handleNewFormChange} required disabled={isCreating} />
                          </div>
                          <div>
                            <Label htmlFor="newDescription">Description</Label>
                            <Textarea id="newDescription" name="description" value={newFormData.description} onChange={handleNewFormChange} required rows={5} disabled={isCreating} />
                          </div>
                          <div>
                            <Label htmlFor="newDate">Event Date</Label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !newFormData.date && "text-muted-foreground"
                                  )}
                                  disabled={isCreating}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {newFormData.date ? format(newFormData.date, "PPP") : <span>Pick a date</span>}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={newFormData.date}
                                  onSelect={(date: any) => {
                                    if (date) {
                                      setNewFormData(prev => ({ ...prev, date }));
                                    }
                                  }}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                          <MultiImageUploadDropzone
                            id="newEventImages"
                            label="Event Images"
                            onFilesChange={handleNewFilesChange}
                            disabled={isCreating}
                            existingImages={EMPTY_EXISTING_IMAGES} // Use the stable empty array
                          />
                          <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsCreateModalOpen(false)} disabled={isCreating}>
                              Cancel
                            </Button>
                            <Button type="submit" disabled={isCreating}>
                              {isCreating ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating Event...
                                </>
                              ) : (
                                "Create Event"
                              )}
                            </Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground mb-4">
                    Showing {table.getFilteredRowModel().rows.length} of {events.length} events
                  </div>
                  <div className="w-full overflow-x-auto">
                    <DataTable
                      columns={columns}
                      data={events}
                      globalSearchPlaceholder="Search events..."
                      getRowClassName={() => ''}
                      columnFilters={columnFilters}
                      onColumnFiltersChange={setColumnFilters}
                      globalFilter={globalFilter}
                      onGlobalFilterChange={setGlobalFilter}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
