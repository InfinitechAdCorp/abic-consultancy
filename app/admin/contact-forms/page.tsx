"use client"

import type React from "react"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MoreHorizontal, Eye, Plus, Search, Loader2, ArrowUpDown, Reply, Trash2 } from "lucide-react" // Import Trash2
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog, // Import AlertDialog components
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useState, useEffect, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { DataTable } from "@/components/ui/data-table"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type RowSelectionState,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"

// Contact Form Submission data type - aligned with Laravel backend
interface ContactFormSubmission {
  id: number
  first_name: string
  last_name: string
  email: string
  phone: string | null
  service: string | null
  message: string
  created_at: string
  updated_at: string
}

export default function ContactFormsAdminPage() {
  const [submissions, setSubmissions] = useState<ContactFormSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedSubmission, setSelectedSubmission] = useState<ContactFormSubmission | null>(null)
  const { toast } = useToast()
  const router = useRouter()

  // DataTable states
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [globalFilter, setGlobalFilter] = useState("")

  // State for mobile detection
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Add new state variables for the create submission modal:
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [newFormData, setNewFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  })
  const [isCreating, setIsCreating] = useState(false)

  // State for Reply Modal
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false)
  const [replyFormData, setReplyFormData] = useState({
    recipient: "",
    subject: "",
    body: "",
  })
  const [isSendingReply, setIsSendingReply] = useState(false) // New state for reply sending
  const [isDeleting, setIsDeleting] = useState(false) // New state for deletion loading

  // Add handler functions for the new submission form:
  const handleNewFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNewServiceChange = (value: string) => {
    setNewFormData((prev) => ({ ...prev, service: value }))
  }

  const handleCreateSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsCreating(true)
    try {
      const response = await fetch("/api/contact", {
        // Use the Next.js API route
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFormData),
      })
      const result = await response.json()
      if (!response.ok) {
        throw new Error(result.message || "Failed to create contact form submission.")
      }
      toast({
        title: "Success",
        description: "Contact form submission created successfully!",
      })
      setIsCreateModalOpen(false) // Close modal
      setNewFormData({ firstName: "", lastName: "", email: "", phone: "", service: "", message: "" }) // Reset form
      fetchSubmissions() // Refresh the list
    } catch (error: any) {
      console.error("Error creating submission:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "There was an error creating the submission.",
      })
    } finally {
      setIsCreating(false)
    }
  }

  // Fetch Contact Form Submissions
  const fetchSubmissions = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/contact-form-submissions") // Assuming a GET endpoint for all submissions
      const result = await response.json()
      if (response.ok) {
        setSubmissions(result) // Assuming result is an array of submissions
      } else {
        throw new Error(result.message || "Failed to fetch contact form submissions")
      }
    } catch (error) {
      console.error("Failed to fetch submissions:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load contact form submissions",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSubmissions()
  }, [])

  // Handle Reply action
  const handleReplyClick = (submission: ContactFormSubmission) => {
    setSelectedSubmission(submission)
    setReplyFormData({
      recipient: submission.email,
      subject: `Re: Your inquiry to ABIC Consultancy (${submission.service || "General Inquiry"})`,
      body: `Dear ${submission.first_name} ${submission.last_name},\n\nThank you for contacting ABIC Consultancy regarding your interest in ${submission.service || "our services"}.\n\nWe have received your message:\n"${submission.message}"\n\nWe will get back to you as soon as possible.\n\nBest regards,\nABIC Consultancy Team`,
    })
    setIsReplyModalOpen(true)
  }

  // MODIFIED: handleSendReply to use API route
  const handleSendReply = async () => {
    setIsSendingReply(true)
    try {
      const response = await fetch("/api/send-reply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(replyFormData),
      })

      const result = await response.json()

      if (response.ok) {
        toast({
          title: "Reply Sent!",
          description: "The email has been sent successfully.",
          variant: "default",
        })
        setIsReplyModalOpen(false)
      } else {
        throw new Error(result.message || "Failed to send reply.")
      }
    } catch (error: any) {
      console.error("Error sending reply:", error)
      toast({
        variant: "destructive",
        title: "Error Sending Reply",
        description: error.message || "There was an error sending the email. Please try again.",
      })
    } finally {
      setIsSendingReply(false)
    }
  }

  // NEW: handleDeleteSubmission function
  const handleDeleteSubmission = async (id: number) => {
    setIsDeleting(true)
    try {
      const response = await fetch(`/api/contact-form-submissions/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast({
          title: "Submission Deleted",
          description: "The contact form submission has been successfully deleted.",
          variant: "default",
        })
        fetchSubmissions() // Refresh the list
      } else {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to delete submission.")
      }
    } catch (error: any) {
      console.error("Error deleting submission:", error)
      toast({
        variant: "destructive",
        title: "Deletion Failed",
        description: error.message || "There was an error deleting the submission.",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  // Define columns for DataTable
  const columns: ColumnDef<ContactFormSubmission>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
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
      accessorKey: "first_name",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          First Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="font-semibold text-gray-900">{row.original.first_name}</div>,
    },
    {
      accessorKey: "last_name",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Last Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="font-semibold text-gray-900">{row.original.last_name}</div>,
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="truncate max-w-xs">{row.original.email}</div>,
    },
    {
      accessorKey: "service",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Service
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="truncate max-w-xs">{row.original.service || "N/A"}</div>,
    },
    {
      accessorKey: "created_at",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Submitted Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) =>
        new Date(row.original.created_at).toLocaleDateString("en-US", {
          month: "long",
          day: "2-digit",
          year: "numeric",
        }),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const submission = row.original
        return (
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" onClick={() => setSelectedSubmission(submission)}>
                  <Eye className="h-4 w-4" />
                  <span className="ml-1 sr-only sm:not-sr-only">View</span>
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
                {/* Sheet content will be rendered here, using selectedSubmission */}
                {selectedSubmission && (
                  <SheetHeader>
                    <SheetTitle>Submission Details</SheetTitle>
                    <SheetDescription>Complete information for this contact form submission</SheetDescription>
                    <div className="mt-6 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium text-gray-500">Full Name</Label>
                            <p className="text-lg font-semibold">
                              {selectedSubmission.first_name} {selectedSubmission.last_name}
                            </p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-500">Email</Label>
                            <p className="text-lg">{selectedSubmission.email}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-500">Phone</Label>
                            <p className="text-lg">{selectedSubmission.phone || "N/A"}</p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium text-gray-500">Service Interested In</Label>
                            <p className="text-lg">{selectedSubmission.service || "N/A"}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-500">Submitted On</Label>
                            <p className="text-sm">
                              {new Date(selectedSubmission.created_at).toLocaleDateString("en-US", {
                                month: "long",
                                day: "2-digit",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-500">Last Updated</Label>
                            <p className="text-sm">
                              {new Date(selectedSubmission.updated_at).toLocaleDateString("en-US", {
                                month: "long",
                                day: "2-digit",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Message</Label>
                        <p
                          className="text-sm mt-1 p-3 bg-gray-50 rounded-md whitespace-pre-wrap"
                          dangerouslySetInnerHTML={{ __html: selectedSubmission.message.replace(/\n/g, "<br />") }}
                        />
                      </div>
                    </div>
                  </SheetHeader>
                )}
              </SheetContent>
            </Sheet>
            <Button variant="ghost" size="sm" onClick={() => handleReplyClick(submission)}>
              <Reply className="h-4 w-4" />
              <span className="ml-1 sr-only sm:not-sr-only">Reply</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                {/* Removed Edit Submission as requested */}
                {/* <DropdownMenuItem onClick={() => router.push(`/admin/contact-forms/${submission.id}`)}>
                  <Edit className="mr-2 h-4 w-4" /> Edit Submission
                </DropdownMenuItem> */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      {" "}
                      {/* Prevent dropdown closing */}
                      <Trash2 className="mr-2 h-4 w-4 text-red-600" /> Delete Submission
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the contact form submission and
                        remove its data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDeleteSubmission(submission.id)}
                        disabled={isDeleting}
                        className="bg-red-600 hover:bg-red-700 text-white"
                      >
                        {isDeleting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Deleting...
                          </>
                        ) : (
                          "Delete"
                        )}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      },
    },
  ]

  // Initialize table instance
  const table = useReactTable({
    data: submissions,
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
  })

  if (loading) {
    return (
      <SidebarProvider>
        <AppSidebar />
        <div className="flex items-center justify-center min-h-screen w-full">
          <div className="flex items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading submissions...</span>
          </div>
        </div>
      </SidebarProvider>
    )
  }

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className={`flex-1 min-w-0 ${isMobile ? "ml-0" : "ml-72"}`}>
          {isMobile && (
            <div className="sticky top-0 z-50 flex h-12 items-center gap-2 border-b bg-background px-4 md:hidden">
              <SidebarTrigger className="-ml-1" />
              <span className="text-sm font-semibold">Contact Form Submissions</span>
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
                        placeholder="Search submissions..."
                        value={globalFilter || ""}
                        onChange={(event) => setGlobalFilter(event.target.value)}
                        className="pl-9 pr-3 py-2 w-full"
                      />
                    </div>
                    {/* Create Submission button */}
                    <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                      <DialogTrigger asChild>
                        <Button size="sm">
                          <Plus className="mr-2 h-4 w-4" />
                          Create Submission
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Create New Contact Form Submission</DialogTitle>
                          <DialogDescription>Manually add a new contact form entry.</DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleCreateSubmit} className="space-y-6 py-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="newFirstName">First Name</Label>
                              <Input
                                id="newFirstName"
                                name="firstName"
                                value={newFormData.firstName}
                                onChange={handleNewFormChange}
                                required
                                disabled={isCreating}
                              />
                            </div>
                            <div>
                              <Label htmlFor="newLastName">Last Name</Label>
                              <Input
                                id="newLastName"
                                name="lastName"
                                value={newFormData.lastName}
                                onChange={handleNewFormChange}
                                required
                                disabled={isCreating}
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="newEmail">Email</Label>
                            <Input
                              id="newEmail"
                              name="email"
                              type="email"
                              value={newFormData.email}
                              onChange={handleNewFormChange}
                              required
                              disabled={isCreating}
                            />
                          </div>
                          <div>
                            <Label htmlFor="newPhone">Phone Number</Label>
                            <Input
                              id="newPhone"
                              name="phone"
                              type="tel"
                              value={newFormData.phone}
                              onChange={handleNewFormChange}
                              disabled={isCreating}
                            />
                          </div>
                          <div>
                            <Label htmlFor="newService">Service Interested In</Label>
                            <Select
                              value={newFormData.service}
                              onValueChange={handleNewServiceChange}
                              disabled={isCreating}
                            >
                              <SelectTrigger id="newService">
                                <SelectValue placeholder="Select a service" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="business-setup">Business Setup</SelectItem>
                                <SelectItem value="visa-services">Visa Services</SelectItem>
                                <SelectItem value="tax-accounting">Tax & Accounting</SelectItem>
                                <SelectItem value="hr-solutions">HR Solutions</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="newMessage">Message</Label>
                            <Textarea
                              id="newMessage"
                              name="message"
                              value={newFormData.message}
                              onChange={handleNewFormChange}
                              required
                              rows={5}
                              disabled={isCreating}
                            />
                          </div>
                          <DialogFooter>
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => setIsCreateModalOpen(false)}
                              disabled={isCreating}
                            >
                              Cancel
                            </Button>
                            <Button type="submit" disabled={isCreating}>
                              {isCreating ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating Submission...
                                </>
                              ) : (
                                "Create Submission"
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
                    Showing {table.getFilteredRowModel().rows.length} of {submissions.length} submissions
                  </div>
                  <div className="w-full overflow-x-auto">
                    <DataTable
                      columns={columns}
                      data={submissions}
                      globalSearchPlaceholder="Search submissions..."
                      getRowClassName={() => ""}
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

      {/* Reply Modal */}
      <Dialog open={isReplyModalOpen} onOpenChange={setIsReplyModalOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Reply to Contact Form Submission</DialogTitle>
            <DialogDescription>
              Compose an email to {selectedSubmission?.email}. This will be sent directly from the application.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="replyRecipient">Recipient</Label>
              <Input id="replyRecipient" value={replyFormData.recipient} readOnly className="bg-gray-100" />
            </div>
            <div>
              <Label htmlFor="replySubject">Subject</Label>
              <Input
                id="replySubject"
                value={replyFormData.subject}
                onChange={(e) => setReplyFormData((prev) => ({ ...prev, subject: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="replyBody">Message</Label>
              <Textarea
                id="replyBody"
                value={replyFormData.body}
                onChange={(e) => setReplyFormData((prev) => ({ ...prev, body: e.target.value }))}
                rows={10}
                className="min-h-[200px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsReplyModalOpen(false)}
              disabled={isSendingReply}
            >
              Cancel
            </Button>
            <Button onClick={handleSendReply} disabled={isSendingReply}>
              {isSendingReply ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                </>
              ) : (
                <>
                  <Reply className="mr-2 h-4 w-4" /> Send Reply
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  )
}
