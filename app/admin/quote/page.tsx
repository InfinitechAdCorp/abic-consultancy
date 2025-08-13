"use client"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MoreHorizontal, Eye, Search, Loader2, ArrowUpDown, Mail, Send, Trash2 } from "lucide-react"
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
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useState, useEffect, type FormEvent } from "react"
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

// Quote data type - aligned with Laravel backend
interface Quote {
  id: number
  company_name: string
  contact_person: string
  email: string
  phone: string
  company_size: string
  industry: string
  services: string[]
  other_service_name?: string
  other_service_description?: string
  timeline: string
  budget: string
  additional_info?: string
  status: "pending" | "processing" | "completed" | "cancelled"
  created_at: string
  updated_at: string
}

export default function QuotesAdminPage() {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null)
  const { toast } = useToast()

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

  // Email reply states
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false)
  const [replyData, setReplyData] = useState({
    subject: "",
    message: "",
  })
  const [isSending, setIsSending] = useState(false)

  // Fetch Quotes
  const fetchQuotes = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/admin/quotes")
      const result = await response.json()
      if (response.ok) {
        setQuotes(result)
      } else {
        throw new Error(result.message || "Failed to fetch quotes")
      }
    } catch (error) {
      console.error("Failed to fetch quotes:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load quotes",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQuotes()
  }, [])

  // Handle email reply
  const handleReplySubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!selectedQuote) return

    setIsSending(true)
    try {
      const response = await fetch(`/api/admin/quotes/${selectedQuote.id}/reply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: selectedQuote.email,
          subject: replyData.subject,
          message: replyData.message,
          quote_id: selectedQuote.id,
        }),
      })

      const result = await response.json()
      if (!response.ok) {
        throw new Error(result.message || "Failed to send reply")
      }

      toast({
        title: "Success",
        description: "Reply sent successfully!",
      })
      setIsReplyModalOpen(false)
      setReplyData({ subject: "", message: "" })
    } catch (error: any) {
      console.error("Error sending reply:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to send reply",
      })
    } finally {
      setIsSending(false)
    }
  }

  // Update quote status
  const updateQuoteStatus = async (quoteId: number, status: string) => {
    try {
      const response = await fetch(`/api/admin/quotes/${quoteId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      })

      if (!response.ok) {
        throw new Error("Failed to update status")
      }

      toast({
        title: "Success",
        description: "Quote status updated successfully!",
      })
      fetchQuotes() // Refresh the list
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update quote status",
      })
    }
  }

  // Delete quote function
  const deleteQuote = async (quoteId: number) => {
    try {
      const response = await fetch(`/api/admin/quotes/${quoteId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete quote")
      }

      // Remove quote from local state
      setQuotes(quotes.filter((quote) => quote.id !== quoteId))

      toast({
        title: "Success",
        description: "Quote deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting quote:", error)
      toast({
        title: "Error",
        description: "Failed to delete quote. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Define columns for DataTable
  const columns: ColumnDef<Quote>[] = [
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
      accessorKey: "company_name",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Company
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="font-semibold text-gray-900">{row.original.company_name}</div>,
    },
    {
      accessorKey: "contact_person",
      header: "Contact Person",
      cell: ({ row }) => <div>{row.original.contact_person}</div>,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <div className="text-blue-600">{row.original.email}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status
        const statusColors = {
          pending: "bg-yellow-100 text-yellow-800",
          processing: "bg-blue-100 text-blue-800",
          completed: "bg-green-100 text-green-800",
          cancelled: "bg-red-100 text-red-800",
        }
        return (
          <Badge className={statusColors[status] || "bg-gray-100 text-gray-800"}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        )
      },
    },
    {
      accessorKey: "created_at",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Created Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) =>
        new Date(row.original.created_at).toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const quote = row.original
        return (
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" onClick={() => setSelectedQuote(quote)}>
                  <Eye className="h-4 w-4" />
                  <span className="ml-1 sr-only sm:not-sr-only">View</span>
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-3xl overflow-y-auto">
                {selectedQuote && (
                  <SheetHeader>
                    <SheetTitle>Quote Details</SheetTitle>
                    <SheetDescription>Complete information for this quote request</SheetDescription>
                    <div className="mt-6 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium text-gray-500">Company Name</Label>
                            <p className="text-lg font-semibold">{selectedQuote.company_name}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-500">Contact Person</Label>
                            <p className="text-lg">{selectedQuote.contact_person}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-500">Email</Label>
                            <p className="text-lg text-blue-600">{selectedQuote.email}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-500">Phone</Label>
                            <p className="text-lg">{selectedQuote.phone}</p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium text-gray-500">Company Size</Label>
                            <p className="text-lg">{selectedQuote.company_size}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-500">Industry</Label>
                            <p className="text-lg">{selectedQuote.industry}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-500">Timeline</Label>
                            <p className="text-lg">{selectedQuote.timeline}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-500">Budget</Label>
                            <p className="text-lg">{selectedQuote.budget}</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-500">Services Needed</Label>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {Array.isArray(selectedQuote.services) ? (
                            selectedQuote.services.map((service, index) => (
                              <Badge key={index} variant="secondary">
                                {service}
                              </Badge>
                            ))
                          ) : (
                            <Badge variant="secondary">No services specified</Badge>
                          )}
                        </div>
                      </div>

                      {selectedQuote.other_service_name && (
                        <div>
                          <Label className="text-sm font-medium text-gray-500">Other Service</Label>
                          <p className="text-lg font-medium">{selectedQuote.other_service_name}</p>
                          {selectedQuote.other_service_description && (
                            <p className="text-sm text-gray-600 mt-1">{selectedQuote.other_service_description}</p>
                          )}
                        </div>
                      )}

                      {selectedQuote.additional_info && (
                        <div>
                          <Label className="text-sm font-medium text-gray-500">Additional Information</Label>
                          <p className="text-sm mt-1 p-3 bg-gray-50 rounded-md whitespace-pre-wrap">
                            {selectedQuote.additional_info}
                          </p>
                        </div>
                      )}

                      <div className="flex gap-4 pt-4">
                        <Dialog open={isReplyModalOpen} onOpenChange={setIsReplyModalOpen}>
                          <DialogTrigger asChild>
                            <Button
                              onClick={() => {
                                setReplyData({
                                  subject: `Re: HR Outsourcing Quote Request - ${selectedQuote.company_name}`,
                                  message: `Dear ${selectedQuote.contact_person},\n\nThank you for your interest in our HR outsourcing services. We have reviewed your requirements and would like to discuss your needs further.\n\nBest regards,\nHR Outsourcing Team`,
                                })
                              }}
                            >
                              <Mail className="mr-2 h-4 w-4" />
                              Reply via Email
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Reply to Quote Request</DialogTitle>
                              <DialogDescription>
                                Send a reply to {selectedQuote.contact_person} at {selectedQuote.email}
                              </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleReplySubmit} className="space-y-4 py-4">
                              <div>
                                <Label htmlFor="subject">Subject</Label>
                                <Input
                                  id="subject"
                                  value={replyData.subject}
                                  onChange={(e) => setReplyData((prev) => ({ ...prev, subject: e.target.value }))}
                                  required
                                  disabled={isSending}
                                />
                              </div>
                              <div>
                                <Label htmlFor="message">Message</Label>
                                <Textarea
                                  id="message"
                                  value={replyData.message}
                                  onChange={(e) => setReplyData((prev) => ({ ...prev, message: e.target.value }))}
                                  required
                                  rows={8}
                                  disabled={isSending}
                                  className="resize-none"
                                />
                              </div>
                              <DialogFooter>
                                <Button
                                  type="button"
                                  variant="outline"
                                  onClick={() => setIsReplyModalOpen(false)}
                                  disabled={isSending}
                                >
                                  Cancel
                                </Button>
                                <Button type="submit" disabled={isSending}>
                                  {isSending ? (
                                    <>
                                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                                    </>
                                  ) : (
                                    <>
                                      <Send className="mr-2 h-4 w-4" /> Send Reply
                                    </>
                                  )}
                                </Button>
                              </DialogFooter>
                            </form>
                          </DialogContent>
                        </Dialog>

                        <Select onValueChange={(value) => updateQuoteStatus(selectedQuote.id, value)}>
                          <SelectTrigger className="w-40">
                            <SelectValue placeholder="Update Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="processing">Processing</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
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
                <DropdownMenuItem onClick={() => updateQuoteStatus(quote.id, "processing")}>
                  Mark as Processing
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => updateQuoteStatus(quote.id, "completed")}>
                  Mark as Completed
                </DropdownMenuItem>
                <Dialog>
                  <DialogTrigger asChild>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Quote
                    </DropdownMenuItem>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete Quote</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to delete this quote from {quote.company_name}? This action cannot be
                        undone.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button variant="destructive" onClick={() => deleteQuote(quote.id)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      },
    },
  ]

  // Initialize table instance
  const table = useReactTable({
    data: quotes,
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
            <span>Loading quotes...</span>
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
              <span className="text-sm font-semibold">Quotes</span>
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
                        placeholder="Search quotes..."
                        value={globalFilter || ""}
                        onChange={(event) => setGlobalFilter(event.target.value)}
                        className="pl-9 pr-3 py-2 w-full"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground mb-4">
                    Showing {table.getFilteredRowModel().rows.length} of {quotes.length} quotes
                  </div>
                  <div className="w-full overflow-x-auto">
                    <DataTable
                      columns={columns}
                      data={quotes}
                      globalSearchPlaceholder="Search quotes..."
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
    </SidebarProvider>
  )
}
