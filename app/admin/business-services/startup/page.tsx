"use client"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Eye, Edit, Trash2, Plus, Loader2 } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useEffect } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { ColumnFiltersState, RowSelectionState } from "@tanstack/react-table" // Import necessary types
import { useToast } from "@/components/ui/use-toast"
import { Separator } from "@/components/ui/separator"


// Sample data type
type BusinessService = {
  id: string
  serviceName: string
  clientName: string
  status: "pending" | "in-progress" | "completed" | "cancelled"
  dateCreated: string
  amount: number
  category: string
}

// Sample data (will be managed by state for edits/deletes)
const initialBusinessServicesData: BusinessService[] = [
  {
    id: "BS001",
    serviceName: "Business Registration",
    clientName: "John Doe Enterprises",
    status: "completed",
    dateCreated: "2024-01-15",
    amount: 2500,
    category: "Start-Up"
  },
  {
    id: "BS002",
    serviceName: "License Amendment",
    clientName: "Tech Solutions Ltd",
    status: "in-progress",
    dateCreated: "2024-01-18",
    amount: 1800,
    category: "Amendment"
  },
  {
    id: "BS003",
    serviceName: "Special Permit Application",
    clientName: "Green Energy Corp",
    status: "pending",
    dateCreated: "2024-01-20",
    amount: 3200,
    category: "Special License"
  },
  {
    id: "BS004",
    serviceName: "Business Renewal",
    clientName: "Fashion Boutique Inc",
    status: "completed",
    dateCreated: "2024-01-12",
    amount: 1500,
    category: "Renewal"
  },
  {
    id: "BS005",
    serviceName: "Business Closure",
    clientName: "Old Manufacturing Co",
    status: "in-progress",
    dateCreated: "2024-01-22",
    amount: 800,
    category: "Closure"
  },
]

export default function BusinessServicesPage() {
  const [isMobile, setIsMobile] = useState(false)
  const [businessServices, setBusinessServices] = useState<BusinessService[]>(initialBusinessServicesData)
  const { toast } = useToast()

  // New states for Edit and Delete
  const [showEditServiceDialog, setShowEditServiceDialog] = useState(false)
  const [editingService, setEditingService] = useState<BusinessService | null>(null)
  const [showDeleteServiceConfirmDialog, setShowDeleteServiceConfirmDialog] = useState(false)
  const [deletingServiceId, setDeletingServiceId] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)


  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // DataTable states managed by BusinessServicesPage
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [globalFilter, setGlobalFilter] = useState('') // Global filter state managed here

  // Handle Edit Service
  const handleEditService = (service: BusinessService) => {
    setEditingService({ ...service }); // Create a copy to edit
    setShowEditServiceDialog(true);
  };

  // Save Edited Service
  const saveEditedService = async () => {
    if (!editingService) return;

    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In a real app, you'd send editingService to your API
      // const response = await fetch(`/api/business-services/${editingService.id}`, {
      //   method: 'PUT', // or PATCH
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(editingService)
      // });
      // if (!response.ok) throw new Error('Failed to save service');

      setBusinessServices(prev =>
        prev.map(s => (s.id === editingService.id ? editingService : s))
      );
      toast({
        title: "Success",
        description: "Business service updated successfully."
      });
      setShowEditServiceDialog(false);
      setEditingService(null);
    } catch (error) {
      console.error("Failed to save business service:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save business service."
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Handle Delete Service
  const handleDeleteService = (id: string) => {
    setDeletingServiceId(id);
    setShowDeleteServiceConfirmDialog(true);
  };

  // Confirm Delete Service
  const confirmDeleteService = async () => {
    if (deletingServiceId === null) return;

    setIsDeleting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In a real app, you'd send a DELETE request to your API
      // const response = await fetch(`/api/business-services/${deletingServiceId}`, {
      //   method: 'DELETE'
      // });
      // if (!response.ok) throw new Error('Failed to delete service');

      setBusinessServices(prev => prev.filter(s => s.id !== deletingServiceId));
      toast({
        title: "Success",
        description: "Business service deleted successfully."
      });
      setShowDeleteServiceConfirmDialog(false);
      setDeletingServiceId(null);
    } catch (error) {
      console.error("Failed to delete business service:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete business service."
      });
    } finally {
      setIsDeleting(false);
    }
  };


  const columns: ColumnDef<BusinessService>[] = [
    {
      accessorKey: "id",
      header: "Service ID",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("id")}</div>
      ),
    },
    {
      accessorKey: "serviceName",
      header: "Service Name",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("serviceName")}</div>
      ),
    },
    {
      accessorKey: "clientName",
      header: "Client Name",
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => (
        <Badge variant="outline">{row.getValue("category")}</Badge>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <Badge
            variant={
              status === "completed" ? "default" :
              status === "in-progress" ? "secondary" :
              status === "pending" ? "outline" :
              "destructive"
            }
          >
            {status}
          </Badge>
        )
      },
    },
    {
      accessorKey: "dateCreated",
      header: "Date Created",
      cell: ({ row }) => {
        const date = new Date(row.getValue("dateCreated"))
        return <div>{date.toLocaleDateString()}</div>
      },
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("amount"))
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount)
        return <div className="font-medium">{formatted}</div>
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const service = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>
                <Eye className="mr-2 h-4 w-4" />
                View details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleEditService(service)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit service
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteService(service.id)}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete service
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className={`flex-1 min-w-0 ${isMobile ? 'ml-0' : 'ml-72'}`}>
          {isMobile && (
            <div className="sticky top-0 z-50 flex h-12 items-center gap-2 border-b bg-background px-4 md:hidden">
              <SidebarTrigger className="-ml-1" />
              <span className="text-sm font-semibold">Business Services</span>
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
                <h1 className="text-lg font-semibold">Business Services</h1>
              </div>
              <div className="flex items-center gap-3">
                <Button className="w-fit">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Service
                </Button>
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-4 md:p-6">
            <div className="max-w-full space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Business Services</h1>
                  <p className="text-muted-foreground mt-2 text-sm md:text-base">
                    Manage and track all business service requests
                  </p>
                </div>
                <Button className="w-fit">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Service
                </Button>
              </div>
              {/* Added overflow-x-auto to the container of DataTable */}
              <div className="bg-card rounded-lg border p-6 overflow-x-auto">
                <DataTable
                  columns={columns}
                  data={businessServices}
                  globalSearchPlaceholder="Search services..."
                  columnFilters={columnFilters}
                  onColumnFiltersChange={setColumnFilters}
                  globalFilter={globalFilter}
                  onGlobalFilterChange={setGlobalFilter}
                />
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Edit Business Service Dialog */}
      <Dialog open={showEditServiceDialog} onOpenChange={setShowEditServiceDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Business Service</DialogTitle>
            <DialogDescription>
              Make changes to the business service details.
            </DialogDescription>
          </DialogHeader>
          {editingService && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="serviceName" className="text-right">
                  Service Name
                </Label>
                <Input
                  id="serviceName"
                  value={editingService.serviceName}
                  onChange={(e) =>
                    setEditingService({ ...editingService, serviceName: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="clientName" className="text-right">
                  Client Name
                </Label>
                <Input
                  id="clientName"
                  value={editingService.clientName}
                  onChange={(e) =>
                    setEditingService({ ...editingService, clientName: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Input
                  id="category"
                  value={editingService.category}
                  onChange={(e) =>
                    setEditingService({ ...editingService, category: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  Amount
                </Label>
                <Input
                  id="amount"
                  type="number"
                  value={editingService.amount}
                  onChange={(e) =>
                    setEditingService({ ...editingService, amount: parseFloat(e.target.value) || 0 })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select
                  value={editingService.status}
                  onValueChange={(value) =>
                    setEditingService({ ...editingService, status: value as "pending" | "in-progress" | "completed" | "cancelled" })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In-Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="dateCreated" className="text-right">
                  Date Created
                </Label>
                <Input
                  id="dateCreated"
                  type="date"
                  value={editingService.dateCreated}
                  onChange={(e) =>
                    setEditingService({ ...editingService, dateCreated: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditServiceDialog(false)}>
              Cancel
            </Button>
            <Button onClick={saveEditedService} disabled={isSaving}>
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

      {/* Delete Service Confirmation Dialog */}
      <Dialog open={showDeleteServiceConfirmDialog} onOpenChange={setShowDeleteServiceConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the business service record.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteServiceConfirmDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteService} disabled={isDeleting}>
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
