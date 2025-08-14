"use client"

import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  ComposedChart,
} from "recharts"
import {
  TrendingUp,
  Users,
  FileText,
  Clock,
  Building2,
  AlertCircle,
  CheckCircle,
  XCircle,
  Eye,
  LogOut,
  Loader2,
  Menu,
} from "lucide-react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar" // Added SidebarTrigger
import { AppSidebar } from "@/components/app-sidebar"
import { useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"

interface DashboardStats {
  totalConsultations: number
  totalBlogPosts: number
  totalContactForms: number
  totalNewsletterSubscribers: number
  completionRate: number
  consultations: {
    total: number
    pending: number
    confirmed: number
    completed: number
    cancelled: number
    today: number
    thisMonth: number
  }
  blogs: {
    total: number
    published: number
  }
  events: {
    total: number
    upcoming: number
  }
  testimonials: {
    total: number
    approved: number
    pending: number
  }
  communications: {
    contactForms: number
    announcements: number
    newsletterSubscribers: number
  }
}

interface ChartData {
  monthlyConsultations: Array<{ month: string; consultations: number; applications: number }>
  serviceDistribution: Array<{ name: string; value: number; color: string }>
  weeklyApplications: Array<{ day: string; applications: number }>
  recentActivities: Array<{
    id: string
    type: string
    client: string
    service: string
    status: string
    date: string
  }>
}

export default function AdminDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("30d")
  const { logout } = useAuth()
  const { toast } = useToast()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null)
  const [chartData, setChartData] = useState<ChartData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch("/api/dashboard/stats")
      if (!response.ok) {
        throw new Error("Failed to fetch dashboard statistics")
      }
      const result = await response.json()
      setDashboardStats(result.data)
    } catch (error) {
      console.error("Error fetching dashboard stats:", error)
      setError("Failed to load dashboard statistics")
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load dashboard statistics",
      })
    }
  }

  const fetchChartData = async () => {
    try {
      const [monthlyResponse, serviceResponse, weeklyResponse, recentResponse] = await Promise.all([
        fetch("/api/dashboard/charts?type=monthly-consultations"),
        fetch("/api/dashboard/charts?type=service-distribution"),
        fetch("/api/dashboard/charts?type=weekly-applications"),
        fetch("/api/dashboard/charts?type=recent-activities"),
      ])

      const [monthlyData, serviceData, weeklyData, recentData] = await Promise.all([
        monthlyResponse.json(),
        serviceResponse.json(),
        weeklyResponse.json(),
        recentResponse.json(),
      ])

      setChartData({
        monthlyConsultations: monthlyData.data || [],
        serviceDistribution: serviceData.data || [],
        weeklyApplications: weeklyData.data || [],
        recentActivities: recentData.data || [],
      })
    } catch (error) {
      console.error("Error fetching chart data:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load chart data",
      })
    }
  }

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true)
      await Promise.all([fetchDashboardStats(), fetchChartData()])
      setLoading(false)
    }

    loadDashboardData()
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
      case "published":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "confirmed":
      case "in-progress":
        return <AlertCircle className="h-4 w-4 text-blue-500" />
      case "cancelled":
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: "default",
      published: "default",
      pending: "secondary",
      confirmed: "outline",
      "in-progress": "outline",
      cancelled: "destructive",
      rejected: "destructive",
      draft: "secondary",
    } as const

    return <Badge variant={variants[status as keyof typeof variants] || "secondary"}>{status.replace("-", " ")}</Badge>
  }

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <SidebarProvider>
          <AppSidebar />
          <div className="flex-1 lg:ml-80 min-w-0 flex items-center justify-center">
            <div className="flex items-center gap-2">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span>Loading dashboard...</span>
            </div>
          </div>
        </SidebarProvider>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <SidebarProvider>
          <AppSidebar />
          <div className="flex-1 lg:ml-80 min-w-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-red-600 mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>Retry</Button>
            </div>
          </div>
        </SidebarProvider>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarProvider>
        <AppSidebar />
        <div className="flex-1 lg:ml-80 min-w-0">
          <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-white px-4 lg:px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="lg:hidden">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Menu className="h-4 w-4" />
                  <span className="sr-only">Toggle sidebar</span>
                </Button>
              </SidebarTrigger>
              <h1 className="text-lg lg:text-xl font-semibold">Admin Dashboard</h1>
            </div>
            <Button onClick={logout} variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </header>

          <main className="flex-1 overflow-auto">
            <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
              <div>
                <p className="text-gray-600 text-sm lg:text-base">
                  Welcome back! Here's what's happening with your business services.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-blue-700">Total Consultations</CardTitle>
                    <Users className="h-4 w-4 text-blue-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl lg:text-2xl font-bold text-blue-900">
                      {dashboardStats?.totalConsultations?.toLocaleString() || "0"}
                    </div>
                    <p className="text-xs text-blue-600 flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {dashboardStats?.consultations.thisMonth || 0} this month
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-green-700">Blog Posts</CardTitle>
                    <FileText className="h-4 w-4 text-green-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl lg:text-2xl font-bold text-green-900">
                      {dashboardStats?.totalBlogPosts?.toLocaleString() || "0"}
                    </div>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {dashboardStats?.blogs.published || 0} published
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-purple-700">Contact Forms</CardTitle>
                    <FileText className="h-4 w-4 text-purple-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl lg:text-2xl font-bold text-purple-900">
                      {dashboardStats?.totalContactForms?.toLocaleString() || "0"}
                    </div>
                    <p className="text-xs text-purple-600 flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Total submissions received
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-orange-700">Newsletter Subscribers</CardTitle>
                    <Users className="h-4 w-4 text-orange-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl lg:text-2xl font-bold text-orange-900">
                      {dashboardStats?.totalNewsletterSubscribers?.toLocaleString() || "0"}
                    </div>
                    <p className="text-xs text-orange-600 flex items-center mt-1">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Active subscribers
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base lg:text-lg">Monthly Consultations & Applications</CardTitle>
                    <CardDescription className="text-sm">
                      Consultation and application trends over the last 6 months
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <ComposedChart data={chartData?.monthlyConsultations || []}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" fontSize={12} />
                        <YAxis yAxisId="left" fontSize={12} />
                        <YAxis yAxisId="right" orientation="right" fontSize={12} />
                        <Tooltip />
                        <Area
                          yAxisId="left"
                          type="monotone"
                          dataKey="consultations"
                          stroke="#3B82F6"
                          fill="#3B82F6"
                          fillOpacity={0.1}
                        />
                        <Line yAxisId="right" type="monotone" dataKey="applications" stroke="#10B981" strokeWidth={2} />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base lg:text-lg">Service Distribution</CardTitle>
                    <CardDescription className="text-sm">Breakdown of services by percentage</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={chartData?.serviceDistribution || []}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {(chartData?.serviceDistribution || []).map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:gap-4 mt-4">
                      {(chartData?.serviceDistribution || []).map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                          <span className="text-xs lg:text-sm text-gray-600 truncate">{item.name}</span>
                          <span className="text-xs lg:text-sm font-medium ml-auto">{item.value}%</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base lg:text-lg">Weekly Applications</CardTitle>
                    <CardDescription className="text-sm">Applications received this week</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={chartData?.weeklyApplications || []}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" fontSize={12} />
                        <YAxis fontSize={12} />
                        <Tooltip />
                        <Bar dataKey="applications" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                <Card className="xl:col-span-2">
                  <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <CardTitle className="text-base lg:text-lg">Recent Activities</CardTitle>
                      <CardDescription className="text-sm">Latest submissions and activities</CardDescription>
                    </div>
                   
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 lg:space-y-4">
                      {(chartData?.recentActivities || []).map((activity) => (
                        <div
                          key={activity.id}
                          className="flex flex-col sm:flex-row sm:items-center justify-between p-3 lg:p-4 bg-gray-50 rounded-lg gap-3"
                        >
                          <div className="flex items-center gap-3 lg:gap-4">
                            {getStatusIcon(activity.status)}
                            <div className="min-w-0 flex-1">
                              <p className="font-medium text-gray-900 text-sm lg:text-base truncate">
                                {activity.client}
                              </p>
                              <p className="text-xs lg:text-sm text-gray-600 truncate">
                                {activity.service} • {activity.type}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between sm:justify-end gap-3 lg:gap-4">
                            <div className="text-left sm:text-right">
                              <p className="text-xs lg:text-sm text-gray-600">{activity.date}</p>
                            </div>
                            {getStatusBadge(activity.status)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl lg:text-2xl font-bold">{dashboardStats?.blogs.published || 0}</div>
                    <Progress
                      value={
                        dashboardStats?.blogs.total
                          ? (dashboardStats.blogs.published / dashboardStats.blogs.total) * 100
                          : 0
                      }
                      className="mt-2"
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      {dashboardStats?.blogs.published || 0} of {dashboardStats?.blogs.total || 0} published
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Events</CardTitle>
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl lg:text-2xl font-bold">{dashboardStats?.events.upcoming || 0}</div>
                    <Progress
                      value={
                        dashboardStats?.events.total
                          ? (dashboardStats.events.upcoming / dashboardStats.events.total) * 100
                          : 0
                      }
                      className="mt-2"
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      {dashboardStats?.events.upcoming || 0} upcoming events
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Testimonials</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl lg:text-2xl font-bold">{dashboardStats?.testimonials.approved || 0}</div>
                    <Progress
                      value={
                        dashboardStats?.testimonials.total
                          ? (dashboardStats.testimonials.approved / dashboardStats.testimonials.total) * 100
                          : 0
                      }
                      className="mt-2"
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      {dashboardStats?.testimonials.pending || 0} pending approval
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  )
}