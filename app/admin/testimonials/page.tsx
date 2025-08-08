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
import { MoreHorizontal, Eye, Plus, Search, Loader2, Star, CheckCircle, XCircle, RefreshCw, ArrowUpDown, Edit, Trash2 } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useState, useEffect, useCallback } from "react"
import { useToast } from "@/components/ui/use-toast"
import { DataTable } from "@/components/ui/data-table"
import { ColumnDef, ColumnFiltersState, RowSelectionState, useReactTable, getCoreRowModel, getFilteredRowModel, getSortedRowModel } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"

// Testimonial data type - aligned with Laravel backend
type Testimonial = {
  id: number;
  name: string;
  rating: number;
  message: string;
  is_approved: boolean;
  created_at: string;
  updated_at: string;
}

// StarRating component (re-used from frontend)
interface StarRatingProps {
  rating: number;
  onRatingChange?: (newRating: number) => void;
  isInteractive?: boolean;
}

function StarRating({ rating, onRatingChange, isInteractive = false }: StarRatingProps) {
  return (
    <div className="flex items-center justify-center space-x-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} ${isInteractive ? "cursor-pointer" : ""}`}
          onClick={() => isInteractive && onRatingChange?.(i + 1)}
        />
      ))}
    </div>
  );
}

export default function TestimonialsAdminPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null)
  const [approvalFilter, setApprovalFilter] = useState("all") // "all", "approved", "pending"
  const { toast } = useToast()

  // New states for Edit and Delete
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null)
  const [showDeleteConfirmDialog, setShowDeleteConfirmDialog] = useState(false)
  const [deletingTestimonialId, setDeletingTestimonialId] = useState<number | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  // DataTable states managed by TestimonialsAdminPage for specific column filters
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

  // Helper functions for approval status badges
  const getApprovalBadge = (isApproved: boolean) => {
    if (isApproved) {
      return (
        <Badge variant="default" className="flex items-center gap-1 bg-green-500 hover:bg-green-600">
          <CheckCircle className="h-4 w-4" />
          Approved
        </Badge>
      )
    } else {
      return (
        <Badge variant="secondary" className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600">
          <XCircle className="h-4 w-4" />
          Pending
        </Badge>
      )
    }
  }

  // Define columns for DataTable
  const columns: ColumnDef<Testimonial>[] = [
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
      accessorKey: "name",
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
          {row.original.name}
        </div>
      ),
    },
    {
      accessorKey: "rating",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Rating
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <StarRating rating={row.original.rating} isInteractive={false} />,
    },
    {
      accessorKey: "message",
      header: "Message",
      cell: ({ row }) => <div className="truncate max-w-xs">{row.original.message}</div>,
    },
    {
      accessorKey: "is_approved",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => getApprovalBadge(row.original.is_approved),
      filterFn: (row, id, value) => {
        // Ensure both the row value and filter value are treated as booleans for comparison
        const rowIsApproved = Boolean(row.getValue(id));
        const filterValue = Boolean(value); // 'value' from the filter state is already boolean, but this adds robustness

        if (value === "all") return true; // 'all' is a string, so handle it explicitly
        return rowIsApproved === filterValue;
      },
    },
    {
      accessorKey: "created_at",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Submitted Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => new Date(row.original.created_at).toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const testimonial = row.original;
        return (
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" onClick={() => setSelectedTestimonial(testimonial)}>
                  <Eye className="h-4 w-4" />
                  <span className="ml-1 sm:hidden">View</span>
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
                {/* Sheet content will be rendered here, using selectedTestimonial */}
                {selectedTestimonial && (
                  <SheetHeader>
                    <SheetTitle>Testimonial Details</SheetTitle>
                    <SheetDescription>
                      Complete information for this testimonial
                    </SheetDescription>
                    <div className="mt-6 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium text-gray-500">Client Name</Label>
                            <p className="text-lg font-semibold">{selectedTestimonial.name}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-500">Rating</Label>
                            <StarRating rating={selectedTestimonial.rating} isInteractive={false} />
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-500">Status</Label>
                            {getApprovalBadge(selectedTestimonial.is_approved)}
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium text-gray-500">Submitted On</Label>
                            <p className="text-sm">{new Date(selectedTestimonial.created_at).toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-500">Last Updated</Label>
                            <p className="text-sm">{new Date(selectedTestimonial.updated_at).toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })}</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Testimonial Message</Label>
                        <p className="text-sm mt-1 p-3 bg-gray-50 rounded-md">{selectedTestimonial.message}</p>
                      </div>
                      {/* Status Update */}
                      <div className="border-t pt-4">
                        <Label className="text-sm font-medium text-gray-500">Update Approval Status</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <Button
                            size="sm"
                            variant={selectedTestimonial.is_approved ? 'default' : 'outline'}
                            onClick={() => updateApprovalStatus(selectedTestimonial.id, true)}
                          >
                            <CheckCircle className="mr-2 h-4 w-4" /> Approve
                          </Button>
                          <Button
                            size="sm"
                            variant={!selectedTestimonial.is_approved ? 'destructive' : 'outline'}
                            onClick={() => updateApprovalStatus(selectedTestimonial.id, false)}
                          >
                            <XCircle className="mr-2 h-4 w-4" /> Unapprove
                          </Button>
                        </div>
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
                <DropdownMenuItem onClick={() => updateApprovalStatus(testimonial.id, true)}>
                  <CheckCircle className="mr-2 h-4 w-4" /> Approve
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => updateApprovalStatus(testimonial.id, false)}>
                  <XCircle className="mr-2 h-4 w-4" /> Unapprove
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleEdit(testimonial)}>
                  <Edit className="mr-2 h-4 w-4" /> Edit Testimonial
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-600"
                  onClick={() => handleDelete(testimonial.id)}
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Delete Testimonial
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
    if (approvalFilter !== "all") {
      newColumnFilters.push({ id: 'is_approved', value: approvalFilter === "approved" });
    }
    setColumnFilters(newColumnFilters);
  }, [approvalFilter]);

  // Fetch testimonials
  const fetchTestimonials = async () => {
    try {
      setLoading(true)
      // Fetch all testimonials, including unapproved ones, for the admin panel
      const response = await fetch('/api/testimonials?include_unapproved=true')
      const result = await response.json()
      if (response.ok) {
        setTestimonials(result)
      } else {
        throw new Error(result.message || 'Failed to fetch testimonials');
      }
    } catch (error) {
      console.error('Failed to fetch testimonials:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load testimonials"
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTestimonials()
  }, [])

  // Update testimonial approval status
  const updateApprovalStatus = async (id: number, newStatus: boolean) => {
    try {
      const response = await fetch(`/api/testimonials/${id}`, {
        method: 'PATCH', // Use PATCH for partial updates
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ is_approved: newStatus })
      })
      if (response.ok) {
        setTestimonials(prev =>
          prev.map(testimonial =>
            testimonial.id === id
              ? { ...testimonial, is_approved: newStatus }
              : testimonial
          )
        )
        toast({
          title: "Success",
          description: `Testimonial ${newStatus ? 'approved' : 'unapproved'} successfully`
        })
      } else {
        const errorData = await response.json();
        toast({
          variant: "destructive",
          title: "Error",
          description: errorData.message || "Failed to update approval status"
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update approval status"
      })
    }
  }

  // Handle Edit Testimonial
  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial({ ...testimonial }); // Create a copy to edit
    setShowEditDialog(true);
  };

  // Save Edited Testimonial
  const saveEditedTestimonial = async () => {
    if (!editingTestimonial) return;
    setIsSaving(true);
    try {
      const response = await fetch(`/api/testimonials/${editingTestimonial.id}`, {
        method: 'PUT', // Use PUT for full replacement or PATCH for partial
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingTestimonial)
      });
      if (response.ok) {
        setTestimonials(prev =>
          prev.map(t => (t.id === editingTestimonial.id ? editingTestimonial : t))
        );
        toast({
          title: "Success",
          description: "Testimonial updated successfully."
        });
        setShowEditDialog(false);
        setEditingTestimonial(null);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save testimonial');
      }
    } catch (error: any) {
      console.error("Failed to save testimonial:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to save testimonial."
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Handle Delete Testimonial
  const handleDelete = (id: number) => {
    setDeletingTestimonialId(id);
    setShowDeleteConfirmDialog(true);
  };

  // Confirm Delete Testimonial
  const confirmDeleteTestimonial = async () => {
    if (deletingTestimonialId === null) return;
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/testimonials/${deletingTestimonialId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setTestimonials(prev => prev.filter(t => t.id !== deletingTestimonialId));
        toast({
          title: "Success",
          description: "Testimonial deleted successfully."
        });
        setShowDeleteConfirmDialog(false);
        setDeletingTestimonialId(null);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete testimonial');
      }
    } catch (error: any) {
      console.error("Failed to delete testimonial:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to delete testimonial."
      });
    } finally {
      setIsDeleting(false);
    }
  };

  // Initialize table instance at the top level
  const table = useReactTable({
    data: testimonials,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(), // Added for sorting
    state: {
      columnFilters,
      globalFilter,
      rowSelection, // Pass rowSelection state
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection, // Handle row selection changes
  });

  if (loading) {
    return (
      <SidebarProvider>
        <AppSidebar />
        <div className="flex items-center justify-center min-h-screen w-full">
          <div className="flex items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading testimonials...</span>
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
              <span className="text-sm font-semibold">Testimonials</span>
            </div>
          )}
          
          <main className="flex-1 overflow-auto p-4 md:p-6">
            <div className="max-w-full space-y-6">
              {/* Filters and Search */}
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div className="flex gap-2 w-full sm:w-auto">
                      <Select value={approvalFilter} onValueChange={setApprovalFilter}>
                        <SelectTrigger className="w-full sm:w-32">
                          <SelectValue placeholder="Approval Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="approved">Approved</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground mb-4">
                    Showing {table.getFilteredRowModel().rows.length} of {testimonials.length} testimonials
                  </div>
                  <div className="w-full overflow-x-auto">
                    <DataTable
                      columns={columns}
                      data={testimonials}
                      globalSearchPlaceholder="Search testimonials..."
                      getRowClassName={() => ''} // Removed priority color as it's consultation specific
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
      {/* Edit Testimonial Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Testimonial</DialogTitle>
            <DialogDescription>
              Make changes to the testimonial details.
            </DialogDescription>
          </DialogHeader>
          {editingTestimonial && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Client Name
                </Label>
                <Input
                  id="name"
                  value={editingTestimonial.name}
                  onChange={(e) =>
                    setEditingTestimonial({ ...editingTestimonial, name: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="rating" className="text-right">
                  Rating
                </Label>
                <Select
                  value={String(editingTestimonial.rating)}
                  onValueChange={(value) =>
                    setEditingTestimonial({ ...editingTestimonial, rating: parseInt(value) })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <SelectItem key={num} value={String(num)}>{num} Star</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="message" className="text-right">
                  Message
                </Label>
                <Textarea
                  id="message"
                  value={editingTestimonial.message || ''}
                  onChange={(e) =>
                    setEditingTestimonial({ ...editingTestimonial, message: e.target.value })
                  }
                  className="col-span-3"
                  rows={5}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="is_approved" className="text-right">
                  Approved
                </Label>
                <Select
                  value={String(editingTestimonial.is_approved)}
                  onValueChange={(value) =>
                    setEditingTestimonial({ ...editingTestimonial, is_approved: value === 'true' })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Yes</SelectItem>
                    <SelectItem value="false">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancel
            </Button>
            <Button onClick={saveEditedTestimonial} disabled={isSaving}>
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
              This action cannot be undone. This will permanently delete the testimonial record.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteConfirmDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteTestimonial} disabled={isDeleting}>
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
