"use client"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import type React from "react"

import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MoreHorizontal, Eye, Plus, Search, Loader2, ArrowUpDown, Edit, Video, ImageIcon } from "lucide-react"
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

// Blog data type - aligned with Laravel backend
interface Blog {
  id: number
  title: string
  content: string
  thumbnail_path?: string | null
  video_path?: string | null
  status: "draft" | "published"
  published_at?: string | null
  created_at: string
  updated_at: string
}

export default function BlogAdminPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null)
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

  // Add new state variables for the create blog modal:
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [newFormData, setNewFormData] = useState({
    title: "",
    content: "",
    status: "draft" as "draft" | "published",
  })
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [isCreating, setIsCreating] = useState(false)

  // Add handler functions for the new blog form:
  const handleNewFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setThumbnailFile(file)
    }
  }

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setVideoFile(file)
    }
  }

  const handleCreateSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsCreating(true)

    const formData = new FormData()
    formData.append("title", newFormData.title)
    formData.append("content", newFormData.content)
    formData.append("status", newFormData.status)

    if (thumbnailFile) {
      formData.append("thumbnail", thumbnailFile)
    }
    if (videoFile) {
      formData.append("video", videoFile)
    }

    try {
      const response = await fetch("/api/blog", {
        method: "POST",
        body: formData,
      })
      const result = await response.json()
      if (!response.ok) {
        throw new Error(result.message || "Failed to create blog post.")
      }
      toast({
        title: "Success",
        description: "Blog post created successfully!",
      })
      setIsCreateModalOpen(false)
      setNewFormData({ title: "", content: "", status: "draft" })
      setThumbnailFile(null)
      setVideoFile(null)
      fetchBlogs()
    } catch (error: any) {
      console.error("Error creating blog post:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "There was an error creating the blog post.",
      })
    } finally {
      setIsCreating(false)
    }
  }

  // Fetch Blogs
  const fetchBlogs = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/blog")
      const result = await response.json()
      if (response.ok) {
        setBlogs(result.data || result)
      } else {
        throw new Error(result.message || "Failed to fetch blog posts")
      }
    } catch (error) {
      console.error("Failed to fetch blog posts:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load blog posts",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  // Define columns for DataTable
  const columns: ColumnDef<Blog>[] = [
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
      accessorKey: "title",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Blog Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="font-semibold text-gray-900">{row.original.title}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant={row.original.status === "published" ? "default" : "outline"}>{row.original.status}</Badge>
      ),
    },
    {
      accessorKey: "video_path",
      header: "Media",
      cell: ({ row }) => (
        <div className="flex gap-1">
          {row.original.thumbnail_path && <ImageIcon className="h-4 w-4 text-blue-500" />}
          {row.original.video_path && <Video className="h-4 w-4 text-green-500" />}
        </div>
      ),
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
        const blog = row.original
        return (
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" onClick={() => setSelectedBlog(blog)}>
                  <Eye className="h-4 w-4" />
                  <span className="ml-1 sr-only sm:not-sr-only">View</span>
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
                {selectedBlog && (
                  <SheetHeader>
                    <SheetTitle>Blog Post Details</SheetTitle>
                    <SheetDescription>Complete information for this blog post</SheetDescription>
                    <div className="mt-6 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium text-gray-500">Blog Title</Label>
                            <p className="text-lg font-semibold">{selectedBlog.title}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-500">Status</Label>
                            <Badge variant={selectedBlog.status === "published" ? "default" : "outline"}>
                              {selectedBlog.status}
                            </Badge>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-500">Created On</Label>
                            <p className="text-sm">
                              {new Date(selectedBlog.created_at).toLocaleDateString("en-US", {
                                month: "long",
                                day: "2-digit",
                                year: "numeric",
                              })}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium text-gray-500">Last Updated</Label>
                            <p className="text-sm">
                              {new Date(selectedBlog.updated_at).toLocaleDateString("en-US", {
                                month: "long",
                                day: "2-digit",
                                year: "numeric",
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                      {selectedBlog.thumbnail_path && (
                        <div>
                          <Label className="text-sm font-medium text-gray-500">Thumbnail</Label>
                          <img
                            src={selectedBlog.thumbnail_path || "/placeholder.svg"}
                            alt="Blog thumbnail"
                            className="mt-2 max-w-xs rounded-md"
                          />
                        </div>
                      )}
                      {selectedBlog.video_path && (
                        <div>
                          <Label className="text-sm font-medium text-gray-500">Video</Label>
                          <video
                            src={`${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}${selectedBlog.video_path}`}
                            controls
                            className="mt-2 max-w-xs rounded-md"
                            preload="metadata"
                          />
                        </div>
                      )}
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Blog Content</Label>
                        <p
                          className="text-sm mt-1 p-3 bg-gray-50 rounded-md whitespace-pre-wrap"
                          dangerouslySetInnerHTML={{ __html: selectedBlog.content.replace(/\n/g, "<br />") }}
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
                <DropdownMenuItem onClick={() => router.push(`/admin/blog/${blog.id}`)}>
                  <Edit className="mr-2 h-4 w-4" /> Edit Blog Post
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      },
    },
  ]

  // Initialize table instance
  const table = useReactTable({
    data: blogs,
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
            <span>Loading blog posts...</span>
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
              <span className="text-sm font-semibold">Blog Posts</span>
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
                        placeholder="Search blog posts..."
                        value={globalFilter || ""}
                        onChange={(event) => setGlobalFilter(event.target.value)}
                        className="pl-9 pr-3 py-2 w-full"
                      />
                    </div>
                    {/* Create Blog Post button */}
                    <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                      <DialogTrigger asChild>
                        <Button size="sm">
                          <Plus className="mr-2 h-4 w-4" />
                          Create Blog Post
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Create New Blog Post</DialogTitle>
                          <DialogDescription>Fill in the details for your new blog post.</DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleCreateSubmit} className="space-y-6 py-4">
                          <div>
                            <Label htmlFor="newTitle">Blog Title</Label>
                            <Input
                              id="newTitle"
                              name="title"
                              value={newFormData.title}
                              onChange={handleNewFormChange}
                              required
                              disabled={isCreating}
                            />
                          </div>
                          <div>
                            <Label htmlFor="newContent">Content</Label>
                            <Textarea
                              id="newContent"
                              name="content"
                              value={newFormData.content}
                              onChange={handleNewFormChange}
                              required
                              rows={5}
                              disabled={isCreating}
                            />
                          </div>
                          <div>
                            <Label htmlFor="newStatus">Status</Label>
                            <Select
                              value={newFormData.status}
                              onValueChange={(value) =>
                                setNewFormData((prev) => ({ ...prev, status: value as "draft" | "published" }))
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="draft">Draft</SelectItem>
                                <SelectItem value="published">Published</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="newThumbnail">Thumbnail</Label>
                              <Input
                                id="newThumbnail"
                                name="thumbnail"
                                type="file"
                                accept="image/*"
                                onChange={handleThumbnailChange}
                                disabled={isCreating}
                                className="file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-sm file:bg-gray-100"
                              />
                              <ImageIcon className="h-4 w-4 text-gray-400" />
                              {thumbnailFile && <p className="text-xs text-gray-500 mt-1">{thumbnailFile.name}</p>}
                            </div>
                            <div>
                              <Label htmlFor="newVideo">Video</Label>
                              <Input
                                id="newVideo"
                                name="video"
                                type="file"
                                accept="video/*"
                                onChange={handleVideoChange}
                                disabled={isCreating}
                                className="file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-sm file:bg-gray-100"
                              />
                              <Video className="h-4 w-4 text-gray-400" />
                              {videoFile && <p className="text-xs text-gray-500 mt-1">{videoFile.name}</p>}
                            </div>
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
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating Blog Post...
                                </>
                              ) : (
                                "Create Blog Post"
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
                    Showing {table.getFilteredRowModel().rows.length} of {blogs.length} blog posts
                  </div>
                  <div className="w-full overflow-x-auto">
                    <DataTable
                      columns={columns}
                      data={blogs}
                      globalSearchPlaceholder="Search blog posts..."
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
