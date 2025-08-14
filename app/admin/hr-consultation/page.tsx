"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import {
  Edit,
  Trash2,
  Mail,
  ArrowUpDown,
  MoreHorizontal,
  Calendar,
  User,
  MessageSquare,
  Send,
  Loader2,
  Eye,
  Reply,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
} from "lucide-react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type RowSelectionState,
} from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { AppSidebar } from "@/components/app-sidebar"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

type HRConsultation = {
  id: number
  first_name: string
  last_name: string
  email: string
  phone: string
  country: string
  service_type: string
  service_description?: string
  preferred_date: string
  preferred_time: string
  timezone?: string
  additional_info?: string
  subscribe_newsletter: boolean
  status: "pending" | "confirmed" | "completed" | "cancelled"
  created_at: string
  updated_at: string
}

const serviceTypeLabels: Record<string, string> = {
  "recruitment-talent": "Recruitment & Talent Strategy",
  "performance-retention": "Employee Performance & Retention",
  "hr-technology": "HR Technology & Process Optimization",
  "training-development": "Workforce Training & Development",
  other: "Other HR Services",
}

// Country codes to names (basic mapping)
const countryNames: Record<string, string> = {
  PH: "Philippines",
  US: "United States",
  CA: "Canada",
  AU: "Australia",
  GB: "United Kingdom",
  SG: "Singapore",
  JP: "Japan",
  KR: "South Korea",
}

export default function HRConsultationPage() {
  const [consultations, setConsultations] = useState<HRConsultation[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedConsultation, setSelectedConsultation] = useState<HRConsultation | null>(null)
  const [editingConsultation, setEditingConsultation] = useState<HRConsultation | null>(null)
  const [showReplyDialog, setShowReplyDialog] = useState(false)
  const [replyMessage, setReplyMessage] = useState("")
  const [replySubject, setReplySubject] = useState("")
  const [sendingReply, setSendingReply] = useState(false)
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [globalFilter, setGlobalFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [serviceFilter, setServiceFilter] = useState("all")
  const [deletingConsultationId, setDeletingConsultationId] = useState<number | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showDeleteConfirmDialog, setShowDeleteConfirmDialog] = useState(false)

  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const { toast } = useToast()

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0,
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "confirmed":
        return <AlertCircle className="h-4 w-4 text-blue-500" />
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: "outline",
      confirmed: "outline",
      completed: "outline",
      cancelled: "outline",
    } as const

    const colors = {
      pending: "text-yellow-600 border-yellow-200",
      confirmed: "text-blue-600 border-blue-200",
      completed: "text-green-600 border-green-200",
      cancelled: "text-red-600 border-red-200",
    } as const

    return (
      <Badge
        variant={variants[status as keyof typeof variants] || "outline"}
        className={colors[status as keyof typeof colors] || ""}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const columns: ColumnDef<HRConsultation>[] = [
    {
      accessorKey: "first_name",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="font-medium">
          {row.getValue("first_name")} {row.original.last_name}
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
    },
    {
      accessorKey: "service_type",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Service Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const serviceType = row.getValue("service_type") as string
        return (
          <Badge variant="outline" className="whitespace-nowrap">
            {serviceTypeLabels[serviceType] || serviceType}
          </Badge>
        )
      },
      filterFn: (row, id, value) => {
        return row.getValue(id) === value
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => getStatusBadge(row.getValue("status")),
      filterFn: (row, id, value) => {
        return row.getValue(id) === value
      },
    },
    {
      accessorKey: "created_at",
      header: "Date",
      cell: ({ row }) => {
        const date = new Date(row.getValue("created_at"))
        return <div>{date.toLocaleDateString()}</div>
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const consultation = row.original
        return (
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" onClick={() => setSelectedConsultation(consultation)}>
                  <Eye className="h-4 w-4" />
                  <span className="ml-1 sm:hidden">View</span>
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
                {selectedConsultation && (
                  <>
                    <SheetHeader>
                      <SheetTitle>HR Consultation Details</SheetTitle>
                      <SheetDescription>Complete information for this HR consultation request</SheetDescription>
                    </SheetHeader>
                    <div className="mt-6 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium text-gray-500">Client Name</Label>
                            <p className="text-lg font-semibold">
                              {selectedConsultation.first_name} {selectedConsultation.last_name}
                            </p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-500">Email</Label>
                            <p className="text-sm break-all">{selectedConsultation.email}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-500">Phone</Label>
                            <p className="text-sm">{selectedConsultation.phone}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-500">Country</Label>
                            <p className="text-sm">
                              {countryNames[selectedConsultation.country] || selectedConsultation.country}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium text-gray-500">Service Type</Label>
                            <p className="text-sm">{serviceTypeLabels[selectedConsultation.service_type]}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-500">Preferred Date</Label>
                            <p className="text-sm">
                              {new Date(selectedConsultation.preferred_date).toLocaleDateString("en-US", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-500">Preferred Time</Label>
                            <p className="text-sm">{selectedConsultation.preferred_time}</p>
                          </div>
                          {selectedConsultation.timezone && (
                            <div>
                              <Label className="text-sm font-medium text-gray-500">Timezone</Label>
                              <p className="text-sm">{selectedConsultation.timezone}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {selectedConsultation.service_description && (
                        <div>
                          <Label className="text-sm font-medium text-gray-500">Service Description</Label>
                          <p className="text-sm mt-1 p-3 bg-gray-50 rounded-md">
                            {selectedConsultation.service_description}
                          </p>
                        </div>
                      )}

                      {selectedConsultation.additional_info && (
                        <div>
                          <Label className="text-sm font-medium text-gray-500">Additional Information</Label>
                          <p className="text-sm mt-1 p-3 bg-gray-50 rounded-md">
                            {selectedConsultation.additional_info}
                          </p>
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-500">Newsletter Subscription</Label>
                          <p className="text-sm">{selectedConsultation.subscribe_newsletter ? "Yes" : "No"}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-500">Submitted</Label>
                          <p className="text-sm">{new Date(selectedConsultation.created_at).toLocaleString()}</p>
                        </div>
                      </div>

                      {/* Status Update */}
                      <div className="border-t pt-4">
                        <Label className="text-sm font-medium text-gray-500">Update Status</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <Button
                            size="sm"
                            variant={selectedConsultation.status === "confirmed" ? "default" : "outline"}
                            onClick={() => updateStatus(selectedConsultation.id, "confirmed")}
                          >
                            Confirm
                          </Button>
                          <Button
                            size="sm"
                            variant={selectedConsultation.status === "completed" ? "default" : "outline"}
                            onClick={() => updateStatus(selectedConsultation.id, "completed")}
                          >
                            Complete
                          </Button>
                          <Button
                            size="sm"
                            variant={selectedConsultation.status === "cancelled" ? "destructive" : "outline"}
                            onClick={() => updateStatus(selectedConsultation.id, "cancelled")}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="border-t pt-4 flex gap-2">
                        <Button onClick={() => prepareReply(selectedConsultation)} className="flex-1">
                          <Reply className="mr-2 h-4 w-4" />
                          Reply to Client
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </SheetContent>
            </Sheet>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => setEditingConsultation(consultation)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => prepareReply(consultation)}>
                  <Mail className="mr-2 h-4 w-4" />
                  Reply
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setDeletingConsultationId(consultation.id)} className="text-red-600">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      },
    },
  ]

  const fetchConsultations = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/hr-consultation/list")
      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setConsultations(data.data.data || [])
          // Update stats
          const consultationData = data.data.data || []
          setStats({
            total: consultationData.length,
            pending: consultationData.filter((c: HRConsultation) => c.status === "pending").length,
            confirmed: consultationData.filter((c: HRConsultation) => c.status === "confirmed").length,
            completed: consultationData.filter((c: HRConsultation) => c.status === "completed").length,
            cancelled: consultationData.filter((c: HRConsultation) => c.status === "cancelled").length,
          })
        }
      }
    } catch (error) {
      console.error("Error fetching consultations:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch consultations",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchConsultations()
  }, [])

  const updateStatus = async (id: number, newStatus: string) => {
    try {
      const response = await fetch(`/api/hr-consultation/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      })
      if (response.ok) {
        setConsultations((prev) =>
          prev.map((consultation) =>
            consultation.id === id ? { ...consultation, status: newStatus as any } : consultation,
          ),
        )
        toast({
          title: "Success",
          description: "Status updated successfully",
        })
        fetchConsultations()
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to update status",
        })
      }
    } catch (error) {
      console.error("Failed to update status:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update status",
      })
    }
  }

  const handleEditConsultation = async () => {
    if (!editingConsultation) return

    try {
      setIsSaving(true)
      const response = await fetch(`/api/hr-consultation/${editingConsultation.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingConsultation),
      })

      if (response.ok) {
        const result = await response.json()
        setConsultations((prev) =>
          prev.map((consultation) => (consultation.id === editingConsultation.id ? result.data : consultation)),
        )
        setEditingConsultation(null)
        toast({
          title: "Success",
          description: "Consultation updated successfully",
        })
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to update consultation",
        })
      }
    } catch (error) {
      console.error("Failed to update consultation:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update consultation",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const confirmDelete = async () => {
    if (!deletingConsultationId) return
    setIsDeleting(true)

    try {
      const response = await fetch(`/api/hr-consultation/${deletingConsultationId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        fetchConsultations()
        toast({
          title: "Success",
          description: "Consultation deleted successfully!",
        })
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to delete consultation.",
        })
      }
    } catch (error) {
      console.error("Error deleting consultation:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete consultation.",
      })
    } finally {
      setIsDeleting(false)
      setDeletingConsultationId(null)
    }
  }

  const handleSendEmail = async () => {
    if (!selectedConsultation || !replySubject || !replyMessage) return

    try {
      setSendingReply(true)
      const response = await fetch("/api/hr-consultation/reply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          consultationId: selectedConsultation.id,
          to: selectedConsultation.email,
          subject: replySubject,
          message: replyMessage,
          clientName: `${selectedConsultation.first_name} ${selectedConsultation.last_name}`,
        }),
      })

      if (response.ok) {
        setShowReplyDialog(false)
        setReplySubject("")
        setReplyMessage("")
        toast({
          title: "Success",
          description: "Email sent successfully",
        })
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to send email",
        })
      }
    } catch (error) {
      console.error("Failed to send email:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send email",
      })
    } finally {
      setSendingReply(false)
    }
  }

  const handleReply = (consultation: HRConsultation) => {
    setSelectedConsultation(consultation)
    setReplySubject(`Re: HR Consultation Request - ${consultation.first_name} ${consultation.last_name}`)
    setReplyMessage(
      `Dear ${consultation.first_name},\n\nThank you for your HR consultation request.\n\nBest regards,\nABIC Consultancy Team`,
    )
    setShowReplyDialog(true)
  }

  const sendReply = async () => {
    if (!selectedConsultation) return

    setSendingReply(true)
    try {
      const response = await fetch("/api/hr-consultation/reply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: selectedConsultation.email,
          subject: replySubject,
          message: replyMessage,
          clientName: `${selectedConsultation.first_name} ${selectedConsultation.last_name}`,
        }),
      })

      if (response.ok) {
        setShowReplyDialog(false)
        setReplySubject("")
        setReplyMessage("")
        toast({
          title: "Success",
          description: "Email sent successfully",
        })
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to send email",
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send email",
      })
    } finally {
      setSendingReply(false)
    }
  }

  const handleEdit = (consultation: HRConsultation) => {
    setEditingConsultation(consultation)
  }

  const handleSaveEdit = async () => {
    if (!editingConsultation) return
    setIsSaving(true)

    try {
      const response = await fetch(`/api/hr-consultation/${editingConsultation.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingConsultation),
      })

      if (response.ok) {
        fetchConsultations()
        setEditingConsultation(null)
        toast({
          title: "Success",
          description: "Consultation updated successfully!",
        })
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to update consultation.",
        })
      }
    } catch (error) {
      console.error("Error updating consultation:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update consultation.",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteOld = (id: number) => {
    setDeletingConsultationId(id)
    setShowDeleteConfirmDialog(true)
  }

  const confirmDeleteOld = async () => {
    if (!deletingConsultationId) return
    setIsDeleting(true)

    try {
      const response = await fetch(`/api/hr-consultation/${deletingConsultationId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        fetchConsultations()
        setShowDeleteConfirmDialog(false)
        toast({
          title: "Success",
          description: "Consultation deleted successfully!",
        })
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to delete consultation.",
        })
      }
    } catch (error) {
      console.error("Error deleting consultation:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete consultation.",
      })
    } finally {
      setIsDeleting(false)
      setDeletingConsultationId(null)
    }
  }

  // Table setup
  const table = useReactTable({
    data: consultations,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "includesString",
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
  })

  const deleteConsultation = async (id: number) => {
    try {
      const response = await fetch(`/api/hr-consultation/${id}`, {
        method: "DELETE",
      })
      if (response.ok) {
        toast({
          title: "Success",
          description: "Consultation deleted successfully",
        })
        fetchConsultations()
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to delete consultation",
        })
      }
    } catch (error) {
      console.error("Error deleting consultation:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete consultation",
      })
    }
  }

  useEffect(() => {
    const filters: ColumnFiltersState = []

    if (statusFilter !== "all") {
      filters.push({ id: "status", value: statusFilter })
    }

    if (serviceFilter !== "all") {
      filters.push({ id: "service_type", value: serviceFilter })
    }

    setColumnFilters(filters)
  }, [statusFilter, serviceFilter])

  const updateNotes = async (id: number, notes: string) => {
    try {
      const response = await fetch(`/api/hr-consultation/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ notes: notes }),
      })
      if (response.ok) {
        toast({
          title: "Success",
          description: "Notes updated successfully",
        })
        fetchConsultations()
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to update notes",
        })
      }
    } catch (error) {
      console.error("Failed to update notes:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update notes",
      })
    }
  }

  const prepareReply = (consultation: HRConsultation) => {
    setSelectedConsultation(consultation)
    setReplySubject(`Regarding your HR Consultation Request`)
    setReplyMessage(
      `Dear ${consultation.first_name},\n\nThank you for reaching out to us. We have received your HR consultation request and will get back to you shortly.\n\nBest regards,\nABIC Consultancy Team`,
    )
    setShowReplyDialog(true)
  }

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className={`flex-1 min-w-0 ${isMobile ? "ml-0" : "ml-72"}`}>
          {isMobile && (
            <div className="sticky top-0 z-50 flex h-12 items-center gap-2 border-b bg-background px-4 md:hidden">
              <SidebarTrigger className="-ml-1" />
              <span className="text-sm font-semibold">HR Consultations</span>
            </div>
          )}
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 md:px-6">
            {!isMobile && (
              <>
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
              </>
            )}
            <div className="flex items-center justify-between w-full">
              <div>
                <h1 className="text-lg font-semibold">HR Consultations</h1>
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-4 md:p-6">
            <div className="max-w-full space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xs sm:text-sm font-medium">Total</CardTitle>
                    <User className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg sm:text-2xl font-bold">{stats.total}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xs sm:text-sm font-medium">Pending</CardTitle>
                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg sm:text-2xl font-bold text-yellow-600">{stats.pending}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xs sm:text-sm font-medium">Confirmed</CardTitle>
                    <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg sm:text-2xl font-bold text-blue-600">{stats.confirmed}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xs sm:text-sm font-medium">Completed</CardTitle>
                    <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg sm:text-2xl font-bold text-green-600">{stats.completed}</div>
                  </CardContent>
                </Card>
                <Card className="col-span-2 sm:col-span-1">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xs sm:text-sm font-medium">Cancelled</CardTitle>
                    <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg sm:text-2xl font-bold text-red-600">{stats.cancelled}</div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div className="flex gap-2 w-full sm:w-auto">
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-full sm:w-32">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="confirmed">Confirmed</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={serviceFilter} onValueChange={setServiceFilter}>
                        <SelectTrigger className="w-full sm:w-40">
                          <SelectValue placeholder="Service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Services</SelectItem>
                          <SelectItem value="recruitment-talent">Recruitment & Talent</SelectItem>
                          <SelectItem value="performance-retention">Performance & Retention</SelectItem>
                          <SelectItem value="hr-technology">HR Technology</SelectItem>
                          <SelectItem value="training-development">Training & Development</SelectItem>
                          <SelectItem value="other">Other Services</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="w-full sm:w-auto">
                      <Input
                        placeholder="Search consultations..."
                        value={globalFilter ?? ""}
                        onChange={(event) => setGlobalFilter(String(event.target.value))}
                        className="w-full sm:max-w-sm"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground mb-4">
                    Showing {table.getFilteredRowModel().rows.length} of {consultations.length} consultations
                  </div>
                  <div className="w-full overflow-x-auto">
                    <Table>
                      <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                          <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                              <TableHead key={header.id} className="whitespace-nowrap">
                                {header.isPlaceholder
                                  ? null
                                  : flexRender(header.column.columnDef.header, header.getContext())}
                              </TableHead>
                            ))}
                          </TableRow>
                        ))}
                      </TableHeader>
                      <TableBody>
                        {table.getRowModel().rows?.length ? (
                          table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                              {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id} className="whitespace-nowrap">
                                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                              ))}
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                              {loading ? "Loading..." : "No results."}
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>

              <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
                <div className="flex-1 text-xs sm:text-sm text-muted-foreground">
                  {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
                  selected.
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Reply Dialog */}
      <Dialog open={showReplyDialog} onOpenChange={setShowReplyDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Reply to {selectedConsultation?.first_name} {selectedConsultation?.last_name}
            </DialogTitle>
            <DialogDescription>Send a personalized reply to the client's consultation request</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="reply-subject">Subject</Label>
              <Input
                id="reply-subject"
                value={replySubject}
                onChange={(e) => setReplySubject(e.target.value)}
                placeholder="Email subject"
              />
            </div>
            <div>
              <Label htmlFor="reply-message">Message</Label>
              <Textarea
                id="reply-message"
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                placeholder="Your reply message..."
                rows={8}
                className="resize-none"
              />
            </div>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setShowReplyDialog(false)} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button onClick={sendReply} disabled={sendingReply} className="w-full sm:w-auto">
              {sendingReply ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Reply
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={editingConsultation !== null} onOpenChange={() => setEditingConsultation(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit HR Consultation</DialogTitle>
            <DialogDescription>Make changes to the consultation details.</DialogDescription>
          </DialogHeader>
          {editingConsultation && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="first_name" className="text-right">
                  First Name
                </Label>
                <Input
                  id="first_name"
                  value={editingConsultation.first_name}
                  onChange={(e) => setEditingConsultation({ ...editingConsultation, first_name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="last_name" className="text-right">
                  Last Name
                </Label>
                <Input
                  id="last_name"
                  value={editingConsultation.last_name}
                  onChange={(e) => setEditingConsultation({ ...editingConsultation, last_name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={editingConsultation.email}
                  onChange={(e) => setEditingConsultation({ ...editingConsultation, email: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input
                  id="phone"
                  value={editingConsultation.phone}
                  onChange={(e) => setEditingConsultation({ ...editingConsultation, phone: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="country" className="text-right">
                  Country
                </Label>
                <Select
                  value={editingConsultation.country}
                  onValueChange={(value) => setEditingConsultation({ ...editingConsultation, country: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(countryNames).map(([code, name]) => (
                      <SelectItem key={code} value={code}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="service_type" className="text-right">
                  Service Type
                </Label>
                <Select
                  value={editingConsultation.service_type}
                  onValueChange={(value) => setEditingConsultation({ ...editingConsultation, service_type: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select service type" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(serviceTypeLabels).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="preferred_date" className="text-right">
                  Preferred Date
                </Label>
                <Input
                  id="preferred_date"
                  type="date"
                  value={editingConsultation.preferred_date}
                  onChange={(e) => setEditingConsultation({ ...editingConsultation, preferred_date: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="preferred_time" className="text-right">
                  Preferred Time
                </Label>
                <Input
                  id="preferred_time"
                  type="time"
                  value={editingConsultation.preferred_time}
                  onChange={(e) => setEditingConsultation({ ...editingConsultation, preferred_time: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="timezone" className="text-right">
                  Timezone
                </Label>
                <Input
                  id="timezone"
                  value={editingConsultation.timezone || ""}
                  onChange={(e) => setEditingConsultation({ ...editingConsultation, timezone: e.target.value })}
                  className="col-span-3"
                  placeholder="e.g., UTC+8, EST"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="service_description" className="text-right">
                  Service Description
                </Label>
                <Textarea
                  id="service_description"
                  value={editingConsultation.service_description || ""}
                  onChange={(e) =>
                    setEditingConsultation({ ...editingConsultation, service_description: e.target.value })
                  }
                  className="col-span-3"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="additional_info" className="text-right">
                  Additional Info
                </Label>
                <Textarea
                  id="additional_info"
                  value={editingConsultation.additional_info || ""}
                  onChange={(e) => setEditingConsultation({ ...editingConsultation, additional_info: e.target.value })}
                  className="col-span-3"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select
                  value={editingConsultation.status}
                  onValueChange={(value) => setEditingConsultation({ ...editingConsultation, status: value as any })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingConsultation(null)}>
              Cancel
            </Button>
            <Button onClick={handleEditConsultation} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={showDeleteConfirmDialog}
        onOpenChange={(open) => {
          if (!open) setShowDeleteConfirmDialog(false)
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the consultation
              {deletingConsultationId &&
                consultations.find((c) => c.id === deletingConsultationId) &&
                ` for ${consultations.find((c) => c.id === deletingConsultationId)?.first_name} ${consultations.find((c) => c.id === deletingConsultationId)?.last_name}`}
              .
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowDeleteConfirmDialog(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteOld} disabled={isDeleting} className="bg-red-600 hover:bg-red-700">
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </SidebarProvider>
  )
}
