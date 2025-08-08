"use client"

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
import { MoreHorizontal, Eye, Reply, Plus, Search, Filter, Calendar, User, Phone, Mail, Globe, Building2, Clock, MessageSquare, Send, X, CheckCircle, AlertCircle, XCircle, Loader2, Archive, Star, StarOff, RefreshCw, ArrowUpDown, Edit, Trash2 } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import { DataTable } from "@/components/ui/data-table"
import { ColumnDef, ColumnFiltersState, RowSelectionState, useReactTable, getCoreRowModel, getFilteredRowModel } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"

// Consultation data type
type Consultation = {
  id: number
  first_name: string
  last_name: string
  email: string
  phone: string
  country: string
  service_type: string
  other_service_details?: string
  consultation_type: string
  preferred_date: string
  preferred_time: string
  message?: string
  agree_to_terms: boolean
  subscribe_newsletter: boolean
  status: "pending" | "confirmed" | "completed" | "cancelled"
  created_at: string
  updated_at: string
}

// Service type labels
const serviceTypeLabels: Record<string, string> = {
  'business-setup': 'Business Setup & Registration',
  'visa-services': 'Visa & Immigration Services',
  'tax-accounting': 'Tax & Accounting Services',
  'license-permit': 'License & Permit Applications',
  'business-renewal': 'Business Renewal Services',
  'amendment': 'Business Amendment Services',
  'consultation': 'General Business Consultation',
  'other': 'Other Services'
}

// Consultation type labels
const consultationTypeLabels: Record<string, string> = {
  'online': 'Online (Video Call)',
  'phone': 'Phone Call',
  'office': 'In-Person (Office Visit)'
}

// Country codes to names (basic mapping)
const countryNames: Record<string, string> = {
  'PH': 'Philippines',
  'US': 'United States',
  'CA': 'Canada',
  'AU': 'Australia',
  'GB': 'United Kingdom',
  'SG': 'Singapore',
  'JP': 'Japan',
  'KR': 'South Korea'
}

export default function ConsultationsPage() {
  const [consultations, setConsultations] = useState<Consultation[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null)
  const [statusFilter, setStatusFilter] = useState("all")
  const [serviceFilter, setServiceFilter] = useState("all")
  const [showReplyDialog, setShowReplyDialog] = useState(false)
  const [replySubject, setReplySubject] = useState("")
  const [replyMessage, setReplyMessage] = useState("")
  const [sendingReply, setSendingReply] = useState(false)
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0
  })
  const { toast } = useToast()

  // New states for Edit and Delete
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [editingConsultation, setEditingConsultation] = useState<Consultation | null>(null)
  const [showDeleteConfirmDialog, setShowDeleteConfirmDialog] = useState(false)
  const [deletingConsultationId, setDeletingConsultationId] = useState<number | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)


  // DataTable states managed by ConsultationsPage for specific column filters
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [globalFilter, setGlobalFilter] = useState('') // Global filter state managed here

  // State for mobile detection, used for default sidebar open state
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Helper functions for status icons and badges
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />
      case 'confirmed':
        return <AlertCircle className="h-4 w-4 text-blue-500" />
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: 'default',
      pending: 'secondary',
      confirmed: 'outline',
      cancelled: 'destructive'
    } as const
    return (
      <Badge variant={variants[status as keyof typeof variants] || 'secondary'} className="flex items-center gap-1">
        {getStatusIcon(status)}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const getPriorityColor = (consultation: Consultation) => {
    const daysSinceCreated = Math.floor((new Date().getTime() - new Date(consultation.created_at).getTime()) / (1000 * 60 * 60 * 24))
    if (consultation.status === 'pending' && daysSinceCreated > 2) return 'border-l-red-500'
    if (consultation.status === 'pending' && daysSinceCreated > 1) return 'border-l-yellow-500'
    if (consultation.status === 'confirmed') return 'border-l-blue-500'
    if (consultation.status === 'completed') return 'border-l-green-500'
    return 'border-l-gray-200'
  }

  // Define columns for DataTable
  const columns: ColumnDef<Consultation>[] = [
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
      accessorFn: (row) => `${row.first_name} ${row.last_name}`,
      id: "clientName",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Client Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="font-semibold text-gray-900">
          {row.original.first_name} {row.original.last_name}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => getStatusBadge(row.original.status),
      filterFn: (row, id, value) => {
        return value === "all" || row.getValue(id) === value;
      },
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="truncate">{row.original.email}</div>,
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) => row.original.phone,
    },
    {
      accessorKey: "service_type",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Service Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => serviceTypeLabels[row.original.service_type],
      filterFn: (row, id, value) => {
        return value === "all" || row.getValue(id) === value;
      },
    },
    {
      accessorKey: "preferred_date",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => new Date(row.original.preferred_date).toLocaleDateString(),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const consultation = row.original;
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
                {/* Sheet content will be rendered here, using selectedConsultation */}
                {selectedConsultation && (
                  <SheetHeader>
                    <SheetTitle>Consultation Details</SheetTitle>
                    <SheetDescription>
                      Complete information for this consultation request
                    </SheetDescription>
                    <div className="mt-6 space-y-6">
                      {/* Client Information */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium text-gray-500">Client Name</Label>
                            <p className="text-lg font-semibold">{selectedConsultation.first_name} {selectedConsultation.last_name}</p>
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
                            <p className="text-sm">{countryNames[selectedConsultation.country] || selectedConsultation.country}</p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium text-gray-500">Service Type</Label>
                            <p className="text-sm">{serviceTypeLabels[selectedConsultation.service_type]}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-500">Consultation Type</Label>
                            <p className="text-sm">{consultationTypeLabels[selectedConsultation.consultation_type]}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-500">Preferred Date</Label>
                            <p className="text-sm">{new Date(selectedConsultation.preferred_date).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-500">Preferred Time</Label>
                            <p className="text-sm">{selectedConsultation.preferred_time}</p>
                          </div>
                        </div>
                      </div>
                      {selectedConsultation.other_service_details && (
                        <div>
                          <Label className="text-sm font-medium text-gray-500">Other Service Details</Label>
                          <p className="text-sm mt-1 p-3 bg-gray-50 rounded-md">{selectedConsultation.other_service_details}</p>
                        </div>
                      )}
                      {selectedConsultation.message && (
                        <div>
                          <Label className="text-sm font-medium text-gray-500">Message</Label>
                          <p className="text-sm mt-1 p-3 bg-gray-50 rounded-md">{selectedConsultation.message}</p>
                        </div>
                      )}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-500">Newsletter Subscription</Label>
                          <p className="text-sm">{selectedConsultation.subscribe_newsletter ? 'Yes' : 'No'}</p>
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
                            variant={selectedConsultation.status === 'confirmed' ? 'default' : 'outline'}
                            onClick={() => updateStatus(selectedConsultation.id, 'confirmed')}
                          >
                            Confirm
                          </Button>
                          <Button
                            size="sm"
                            variant={selectedConsultation.status === 'completed' ? 'default' : 'outline'}
                            onClick={() => updateStatus(selectedConsultation.id, 'completed')}
                          >
                            Complete
                          </Button>
                          <Button
                            size="sm"
                            variant={selectedConsultation.status === 'cancelled' ? 'destructive' : 'outline'}
                            onClick={() => updateStatus(selectedConsultation.id, 'cancelled')}
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
                  </SheetHeader>
                )}
              </SheetContent>
            </Sheet>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => prepareReply(consultation)}
            >
              <Reply className="h-4 w-4" />
              <span className="ml-1 sm:hidden">Reply</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => updateStatus(consultation.id, 'confirmed')}>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Mark as Confirmed
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => updateStatus(consultation.id, 'completed')}>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Mark as Completed
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleEdit(consultation)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Consultation
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-600"
                  onClick={() => handleDelete(consultation.id)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Consultation
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-600"
                  onClick={() => updateStatus(consultation.id, 'cancelled')}
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Cancel Consultation
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  // Update column filters when local filter states change
  useEffect(() => {
    const newColumnFilters: ColumnFiltersState = [];
    if (statusFilter !== "all") {
      newColumnFilters.push({ id: 'status', value: statusFilter });
    }
    if (serviceFilter !== "all") {
      newColumnFilters.push({ id: 'service_type', value: serviceFilter });
    }
    setColumnFilters(newColumnFilters);
  }, [statusFilter, serviceFilter]);

  // Fetch consultations
  const fetchConsultations = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/consultations/list')
      const result = await response.json()
      if (result.success && result.data?.data) {
        setConsultations(result.data.data)
      }
    } catch (error) {
      console.error('Failed to fetch consultations:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load consultations"
      })
    } finally {
      setLoading(false)
    }
  }

  // Fetch stats
  const fetchStats = async () => {
    try {
      const response = await fetch('/api/consultations/stats')
      const result = await response.json()
      if (result.success && result.data) {
        setStats(result.data)
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    }
  }

  useEffect(() => {
    fetchConsultations()
    fetchStats()
  }, [])

  // Update consultation status
  const updateStatus = async (id: number, newStatus: string) => {
    try {
      const response = await fetch(`/api/consultations/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus })
      })
      if (response.ok) {
        setConsultations(prev =>
          prev.map(consultation =>
            consultation.id === id
              ? { ...consultation, status: newStatus as any }
              : consultation
          )
        )
        toast({
          title: "Success",
          description: "Status updated successfully"
        })
        fetchStats() // Refresh stats
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to update status"
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update status"
      })
    }
  }

  // Handle Edit Consultation
  const handleEdit = (consultation: Consultation) => {
    setEditingConsultation({ ...consultation }); // Create a copy to edit
    setShowEditDialog(true);
  };

  // Save Edited Consultation
  const saveEditedConsultation = async () => {
    if (!editingConsultation) return;

    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In a real app, you'd send editingConsultation to your API
      // const response = await fetch(`/api/consultations/${editingConsultation.id}`, {
      //   method: 'PUT', // or PATCH
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(editingConsultation)
      // });
      // if (!response.ok) throw new Error('Failed to save consultation');

      setConsultations(prev =>
        prev.map(c => (c.id === editingConsultation.id ? editingConsultation : c))
      );
      toast({
        title: "Success",
        description: "Consultation updated successfully."
      });
      setShowEditDialog(false);
      setEditingConsultation(null);
    } catch (error) {
      console.error("Failed to save consultation:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save consultation."
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Handle Delete Consultation
  const handleDelete = (id: number) => {
    setDeletingConsultationId(id);
    setShowDeleteConfirmDialog(true);
  };

  // Confirm Delete Consultation
  const confirmDeleteConsultation = async () => {
    if (deletingConsultationId === null) return;

    setIsDeleting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In a real app, you'd send a DELETE request to your API
      // const response = await fetch(`/api/consultations/${deletingConsultationId}`, {
      //   method: 'DELETE'
      // });
      // if (!response.ok) throw new Error('Failed to delete consultation');

      setConsultations(prev => prev.filter(c => c.id !== deletingConsultationId));
      toast({
        title: "Success",
        description: "Consultation deleted successfully."
      });
      setShowDeleteConfirmDialog(false);
      setDeletingConsultationId(null);
      fetchStats(); // Refresh stats after deletion
    } catch (error) {
      console.error("Failed to delete consultation:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete consultation."
      });
    } finally {
      setIsDeleting(false);
    }
  };


  // Send reply email
  const sendReply = async () => {
    if (!selectedConsultation || !replySubject || !replyMessage) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all fields"
      })
      return
    }
    try {
      setSendingReply(true)
      const response = await fetch('/api/consultations/reply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          consultationId: selectedConsultation.id,
          to: selectedConsultation.email,
          subject: replySubject,
          message: replyMessage,
          clientName: `${selectedConsultation.first_name} ${selectedConsultation.last_name}`
        })
      })
      const result = await response.json()
      if (result.success) {
        toast({
          title: "Success",
          description: "Reply sent successfully"
        })
        setShowReplyDialog(false)
        setReplySubject("")
        setReplyMessage("")
      } else {
        throw new Error(result.message)
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send reply"
      })
    } finally {
      setSendingReply(false)
    }
  }

  // Prepare reply
  const prepareReply = (consultation: Consultation) => {
    setSelectedConsultation(consultation)
    setReplySubject(`Re: Your Consultation Request - ${serviceTypeLabels[consultation.service_type]}`)
    setReplyMessage(`Dear ${consultation.first_name} ${consultation.last_name},Thank you for your consultation request regarding ${serviceTypeLabels[consultation.service_type]}.`)
    setShowReplyDialog(true)
  }

  // Initialize table instance at the top level
  const table = useReactTable({
    data: consultations,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
      globalFilter, // Pass globalFilter to the table instance
    },
  });

  if (loading) {
    return (
      <SidebarProvider>
        <AppSidebar />
        <div className="flex items-center justify-center min-h-screen w-full">
          <div className="flex items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading consultations...</span>
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
              <span className="text-sm font-semibold">Consultations</span>
            </div>
          )}
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 md:px-6">
            {!isMobile && ( // Only show trigger on desktop if sidebar is collapsible
              <>
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
              </>
            )}
            <div className="flex items-center justify-between w-full">
              <div>
                <h1 className="text-lg font-semibold">Consultations</h1>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" onClick={fetchConsultations}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh
                </Button>
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-4 md:p-6">
            <div className="max-w-full space-y-6">
              {/* Filters and Search */}
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
                          {Object.entries(serviceTypeLabels).map(([key, label]) => (
                            <SelectItem key={key} value={key}>{label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground mb-4">
                    Showing {table.getFilteredRowModel().rows.length} of {consultations.length} consultations
                  </div>
                  {/* Added overflow-x-auto wrapper for the DataTable */}
                  <div className="w-full overflow-x-auto">
                    <DataTable
                      columns={columns}
                      data={consultations}
                      globalSearchPlaceholder="Search consultations..."
                      getRowClassName={(row) => getPriorityColor(row.original)}
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
      {/* Reply Dialog */}
      <Dialog open={showReplyDialog} onOpenChange={setShowReplyDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Reply to {selectedConsultation?.first_name} {selectedConsultation?.last_name}</DialogTitle>
            <DialogDescription>
              Send a personalized reply to the client's consultation request
            </DialogDescription>
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
            <div className="flex flex-col sm:flex-row justify-end gap-2">
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
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Consultation Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Consultation</DialogTitle>
            <DialogDescription>
              Make changes to the consultation details.
            </DialogDescription>
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
                  onChange={(e) =>
                    setEditingConsultation({ ...editingConsultation, first_name: e.target.value })
                  }
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
                  onChange={(e) =>
                    setEditingConsultation({ ...editingConsultation, last_name: e.target.value })
                  }
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
                  onChange={(e) =>
                    setEditingConsultation({ ...editingConsultation, email: e.target.value })
                  }
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
                  onChange={(e) =>
                    setEditingConsultation({ ...editingConsultation, phone: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="service_type" className="text-right">
                  Service Type
                </Label>
                <Select
                  value={editingConsultation.service_type}
                  onValueChange={(value) =>
                    setEditingConsultation({ ...editingConsultation, service_type: value })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a service type" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(serviceTypeLabels).map(([key, label]) => (
                      <SelectItem key={key} value={key}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="consultation_type" className="text-right">
                  Consultation Type
                </Label>
                <Select
                  value={editingConsultation.consultation_type}
                  onValueChange={(value) =>
                    setEditingConsultation({ ...editingConsultation, consultation_type: value })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select consultation type" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(consultationTypeLabels).map(([key, label]) => (
                      <SelectItem key={key} value={key}>{label}</SelectItem>
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
                  onChange={(e) =>
                    setEditingConsultation({ ...editingConsultation, preferred_date: e.target.value })
                  }
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
                  onChange={(e) =>
                    setEditingConsultation({ ...editingConsultation, preferred_time: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              {editingConsultation.other_service_details !== undefined && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="other_service_details" className="text-right">
                    Other Details
                  </Label>
                  <Textarea
                    id="other_service_details"
                    value={editingConsultation.other_service_details || ''}
                    onChange={(e) =>
                      setEditingConsultation({ ...editingConsultation, other_service_details: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
              )}
              {editingConsultation.message !== undefined && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="message" className="text-right">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    value={editingConsultation.message || ''}
                    onChange={(e) =>
                      setEditingConsultation({ ...editingConsultation, message: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancel
            </Button>
            <Button onClick={saveEditedConsultation} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                </>
              ) : (
                "Save changes"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteConfirmDialog} onOpenChange={setShowDeleteConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the consultation record.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteConfirmDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteConsultation} disabled={isDeleting}>
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Deleting...
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  )
}
