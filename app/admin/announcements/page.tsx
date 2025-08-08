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
import { MoreHorizontal, Eye, Plus, Search, Loader2, RefreshCw, ArrowUpDown, Edit, Trash2, X, CalendarIcon } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useState, useEffect, useCallback, ChangeEvent, FormEvent } from "react"
import { useRouter } from 'next/navigation'
import { useToast } from "@/components/ui/use-toast"
import { DataTable } from "@/components/ui/data-table"
import { ColumnDef, ColumnFiltersState, RowSelectionState, useReactTable, getCoreRowModel, getFilteredRowModel, getSortedRowModel } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

// Announcement data type - aligned with Laravel backend
interface Announcement {
  id: number;
  title: string;
  content: string;
  date: string;
  created_at: string;
  updated_at: string;
}

export default function AnnouncementsAdminPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null)
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

  // Add new state variables for the create announcement modal:
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newFormData, setNewFormData] = useState({
    title: '',
    content: '',
    date: new Date(), // Initialize date for new announcement
  });
  const [isCreating, setIsCreating] = useState(false);

  // Add handler functions for the new announcement form:
  const handleNewFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    const data = {
      title: newFormData.title,
      content: newFormData.content,
      date: format(newFormData.date, 'yyyy-MM-dd'), // Format date for backend
    };

    try {
      const response = await fetch('/api/announcements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Failed to create announcement.');
      }
      toast({
        title: "Success",
        description: "Announcement created successfully!"
      });
      setIsCreateModalOpen(false); // Close modal
      setNewFormData({ title: '', content: '', date: new Date() }); // Reset form
      fetchAnnouncements(); // Refresh the list
    } catch (error: any) {
      console.error('Error creating announcement:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "There was an error creating the announcement."
      });
    } finally {
      setIsCreating(false);
    }
  };

  // Fetch Announcements
  const fetchAnnouncements = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/announcements')
      const result = await response.json()
      if (response.ok) {
        setAnnouncements(result)
      } else {
        throw new Error(result.message || 'Failed to fetch announcements');
      }
    } catch (error) {
      console.error('Failed to fetch announcements:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load announcements"
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAnnouncements()
  }, [])

  // Define columns for DataTable
  const columns: ColumnDef<Announcement>[] = [
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
      accessorKey: "title",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Announcement Title
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
      accessorKey: "date", // Column for date
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Announcement Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => new Date(row.original.date).toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }),
    },
    {
      accessorKey: "content",
      header: "Content",
      cell: ({ row }) => <div className="truncate max-w-xs">{row.original.content}</div>,
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
        const announcement = row.original;
        return (
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" onClick={() => setSelectedAnnouncement(announcement)}>
                  <Eye className="h-4 w-4" />
                  <span className="ml-1 sr-only sm:not-sr-only">View</span>
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
                {/* Sheet content will be rendered here, using selectedAnnouncement */}
                {selectedAnnouncement && (
                  <SheetHeader>
                    <SheetTitle>Announcement Details</SheetTitle>
                    <SheetDescription>
                      Complete information for this announcement
                    </SheetDescription>
                    <div className="mt-6 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium text-gray-500">Announcement Title</Label>
                            <p className="text-lg font-semibold">{selectedAnnouncement.title}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-500">Announcement Date</Label>
                            <p className="text-lg">{new Date(selectedAnnouncement.date).toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })}</p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium text-gray-500">Created On</Label>
                            <p className="text-sm">{new Date(selectedAnnouncement.created_at).toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-500">Last Updated</Label>
                            <p className="text-sm">{new Date(selectedAnnouncement.updated_at).toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })}</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Announcement Content</Label>
                        {/* FIX: Use dangerouslySetInnerHTML to render newlines as <br /> tags */}
                        <p
                          className="text-sm mt-1 p-3 bg-gray-50 rounded-md whitespace-pre-wrap" // Added whitespace-pre-wrap for better rendering
                          dangerouslySetInnerHTML={{ __html: selectedAnnouncement.content.replace(/\n/g, '<br />') }}
                        />
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
                <DropdownMenuItem onClick={() => router.push(`/admin/announcements/${announcement.id}`)}>
                  <Edit className="mr-2 h-4 w-4" /> Edit Announcement
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
    data: announcements,
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
            <span>Loading announcements...</span>
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
              <span className="text-sm font-semibold">Announcements</span>
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
                        placeholder="Search announcements..."
                        value={globalFilter || ''}
                        onChange={event => setGlobalFilter(event.target.value)}
                        className="pl-9 pr-3 py-2 w-full"
                      />
                    </div>
                    {/* Create Announcement button */}
                    <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                      <DialogTrigger asChild>
                        <Button size="sm">
                          <Plus className="mr-2 h-4 w-4" />
                          Create Announcement
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Create New Announcement</DialogTitle>
                          <DialogDescription>
                            Fill in the details for your new announcement.
                          </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleCreateSubmit} className="space-y-6 py-4">
                          <div>
                            <Label htmlFor="newTitle">Announcement Title</Label>
                            <Input id="newTitle" name="title" value={newFormData.title} onChange={handleNewFormChange} required disabled={isCreating} />
                          </div>
                          <div>
                            <Label htmlFor="newContent">Content</Label>
                            <Textarea id="newContent" name="content" value={newFormData.content} onChange={handleNewFormChange} required rows={5} disabled={isCreating} />
                          </div>
                          <div>
                            <Label htmlFor="newDate">Announcement Date</Label>
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
                          <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsCreateModalOpen(false)} disabled={isCreating}>
                              Cancel
                            </Button>
                            <Button type="submit" disabled={isCreating}>
                              {isCreating ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating Announcement...
                                </>
                              ) : (
                                "Create Announcement"
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
                    Showing {table.getFilteredRowModel().rows.length} of {announcements.length} announcements
                  </div>
                  <div className="w-full overflow-x-auto">
                    <DataTable
                      columns={columns}
                      data={announcements}
                      globalSearchPlaceholder="Search announcements..."
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
