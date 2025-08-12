"use client"

// Removed useState, useEffect, useRouter, and isLoading from this file
// as authentication is now handled by middleware and AuthProvider's useEffect
import { useAuth } from "@/components/auth-provider" // Still need useAuth for logout
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
import { TrendingUp, TrendingDown, Users, FileText, DollarSign, Clock, Building2, Plane, Receipt, AlertCircle, CheckCircle, XCircle, Eye, LogOut } from 'lucide-react'
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { useState } from "react"

// Sample data for charts
const monthlyRevenue = [
  { month: "Jan", revenue: 45000, applications: 120 },
  { month: "Feb", revenue: 52000, applications: 140 },
  { month: "Mar", revenue: 48000, applications: 130 },
  { month: "Apr", revenue: 61000, applications: 165 },
  { month: "May", revenue: 55000, applications: 150 },
  { month: "Jun", revenue: 67000, applications: 180 },
]
const serviceDistribution = [
  { name: "Business Setup", value: 35, color: "#3B82F6" },
  { name: "Visa Services", value: 28, color: "#10B981" },
  { name: "Tax & Accounting", value: 22, color: "#F59E0B" },
  { name: "Renewals", value: 15, color: "#EF4444" },
]
const weeklyApplications = [
  { day: "Mon", applications: 25 },
  { day: "Tue", applications: 32 },
  { day: "Wed", applications: 28 },
  { day: "Thu", applications: 35 },
  { day: "Fri", applications: 42 },
  { day: "Sat", applications: 18 },
  { day: "Sun", applications: 12 },
]
const recentApplications = [
  {
    id: "APP-001",
    client: "Tech Solutions LLC",
    service: "Business Setup",
    status: "completed",
    amount: "$2,500",
    date: "2024-01-15",
  },
  {
    id: "APP-002",
    client: "Global Imports Co.",
    service: "Work Visa",
    status: "pending",
    amount: "$1,800",
    date: "2024-01-14",
  },
  {
    id: "APP-003",
    client: "Digital Marketing Inc.",
    service: "Tax Filing",
    status: "in-progress",
    amount: "$950",
    date: "2024-01-14",
  },
  {
    id: "APP-004",
    client: "Restaurant Group",
    service: "License Renewal",
    status: "completed",
    amount: "$1,200",
    date: "2024-01-13",
  },
  {
    id: "APP-005",
    client: "Construction Ltd.",
    service: "Amendment",
    status: "rejected",
    amount: "$750",
    date: "2024-01-13",
  },
]

export default function AdminDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("30d")
  const { logout } = useAuth() // Only need logout here

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "in-progress":
        return <AlertCircle className="h-4 w-4 text-blue-500" />
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: "default",
      pending: "secondary",
      "in-progress": "outline",
      rejected: "destructive",
    } as const

    return <Badge variant={variants[status as keyof typeof variants] || "secondary"}>{status.replace("-", " ")}</Badge>
  }

  // No conditional rendering based on isAuthenticated/isLoading here,
  // as middleware handles redirection before this component renders for unauthenticated users.

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarProvider>
        <AppSidebar />
        {/* Main Content with Manual Margin */}
        <div className="flex-1 ml-80 min-w-0">
          {/* Header with Logout Button */}
          <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-white px-6">
            <h1 className="text-xl font-semibold">Admin Dashboard</h1>
            <Button onClick={logout} variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            <div className="p-6 space-y-6">
              {/* Welcome Message */}
              <div>
                <p className="text-gray-600">Welcome back! Here's what's happening with your business services.</p>
              </div>
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-blue-700">Total Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-blue-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-900">$328,000</div>
                    <p className="text-xs text-blue-600 flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +12.5% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-green-700">Active Applications</CardTitle>
                    <FileText className="h-4 w-4 text-green-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-900">1,285</div>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +8.2% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-purple-700">Total Clients</CardTitle>
                    <Users className="h-4 w-4 text-purple-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-purple-900">2,847</div>
                    <p className="text-xs text-purple-600 flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +15.3% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-orange-700">Completion Rate</CardTitle>
                    <CheckCircle className="h-4 w-4 text-orange-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-orange-900">94.2%</div>
                    <p className="text-xs text-orange-600 flex items-center mt-1">
                      <TrendingDown className="h-3 w-3 mr-1" />
                      -2.1% from last month
                    </p>
                  </CardContent>
                </Card>
              </div>
              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Revenue & Applications</CardTitle>
                    <CardDescription>Revenue and application trends over the last 6 months</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <ComposedChart data={monthlyRevenue}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Area
                          yAxisId="left"
                          type="monotone"
                          dataKey="revenue"
                          stroke="#3B82F6"
                          fill="#3B82F6"
                          fillOpacity={0.1}
                        />
                        <Line yAxisId="right" type="monotone" dataKey="applications" stroke="#10B981" strokeWidth={2} />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                {/* Service Distribution */}
                <Card>
                  <CardHeader>
                    <CardTitle>Service Distribution</CardTitle>
                    <CardDescription>Breakdown of services by percentage</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={serviceDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {serviceDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      {serviceDistribution.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="text-sm text-gray-600">{item.name}</span>
                          <span className="text-sm font-medium ml-auto">{item.value}%</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              {/* Weekly Applications & Recent Applications */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Weekly Applications */}
                <Card>
                  <CardHeader>
                    <CardTitle>Weekly Applications</CardTitle>
                    <CardDescription>Applications received this week</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={weeklyApplications}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="applications" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                {/* Recent Applications */}
                <Card className="lg:col-span-2">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Recent Applications</CardTitle>
                      <CardDescription>Latest application submissions</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View All
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentApplications.map((app) => (
                        <div key={app.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-4">
                            {getStatusIcon(app.status)}
                            <div>
                              <p className="font-medium text-gray-900">{app.client}</p>
                              <p className="text-sm text-gray-600">
                                {app.service} • {app.id}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="font-medium text-gray-900">{app.amount}</p>
                              <p className="text-sm text-gray-600">{app.date}</p>
                            </div>
                            {getStatusBadge(app.status)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Business Setups</CardTitle>
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">456</div>
                    <Progress value={75} className="mt-2" />
                    <p className="text-xs text-muted-foreground mt-2">75% of monthly target</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Visa Applications</CardTitle>
                    <Plane className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">289</div>
                    <Progress value={58} className="mt-2" />
                    <p className="text-xs text-muted-foreground mt-2">58% of monthly target</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Tax Services</CardTitle>
                    <Receipt className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">167</div>
                    <Progress value={42} className="mt-2" />
                    <p className="text-xs text-muted-foreground mt-2">42% of monthly target</p>
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
