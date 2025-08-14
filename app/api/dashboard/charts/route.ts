export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const chartType = searchParams.get("type")
    const apiUrl = process.env.NEXT_PUBLIC_API_URL

    if (!apiUrl) {
      return Response.json({ error: "API URL not configured" }, { status: 500 })
    }

    switch (chartType) {
      case "monthly-consultations":
        return await getMonthlyConsultationsData(apiUrl)
      case "service-distribution":
        return await getServiceDistributionData(apiUrl)
      case "weekly-applications":
        return await getWeeklyApplicationsData(apiUrl)
      case "recent-activities":
        return await getRecentActivitiesData(apiUrl)
      default:
        return Response.json({ error: "Invalid chart type" }, { status: 400 })
    }
  } catch (error) {
    console.error("Dashboard charts error:", error)
    return Response.json(
      {
        error: "Failed to fetch chart data",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

async function getMonthlyConsultationsData(apiUrl: string) {
  const consultationsResponse = await fetch(`${apiUrl}/consultations`)
  const consultationsData = consultationsResponse.ok ? await consultationsResponse.json() : { data: { data: [] } }

  const monthlyData = generateMonthlyData(consultationsData.data?.data || [])

  return Response.json({ success: true, data: monthlyData })
}

async function getServiceDistributionData(apiUrl: string) {
  const consultationsResponse = await fetch(`${apiUrl}/consultations`)
  const consultationsData = consultationsResponse.ok ? await consultationsResponse.json() : { data: { data: [] } }

  const serviceDistribution = calculateServiceDistribution(consultationsData.data?.data || [])

  return Response.json({ success: true, data: serviceDistribution })
}

async function getWeeklyApplicationsData(apiUrl: string) {
  const consultationsResponse = await fetch(`${apiUrl}/consultations`)
  const consultationsData = consultationsResponse.ok ? await consultationsResponse.json() : { data: { data: [] } }

  const weeklyData = generateWeeklyData(consultationsData.data?.data || [])

  return Response.json({ success: true, data: weeklyData })
}

async function getRecentActivitiesData(apiUrl: string) {
  const [consultationsResponse, blogsResponse, eventsResponse] = await Promise.all([
    fetch(`${apiUrl}/consultations`),
    fetch(`${apiUrl}/blogs`),
    fetch(`${apiUrl}/events`),
  ])

  const consultations = consultationsResponse.ok ? await consultationsResponse.json() : { data: { data: [] } }
  const blogs = blogsResponse.ok ? await blogsResponse.json() : { data: [] }
  const events = eventsResponse.ok ? await eventsResponse.json() : []

  const recentActivities = combineRecentActivities(consultations.data?.data || [], blogs.data || [], events || [])

  return Response.json({ success: true, data: recentActivities })
}

function generateMonthlyData(consultations: any[]) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const currentDate = new Date()
  const monthlyData = []

  for (let i = 5; i >= 0; i--) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1)
    const monthName = months[date.getMonth()]

    const monthConsultations = consultations.filter((consultation: any) => {
      const consultationDate = new Date(consultation.created_at)
      return consultationDate.getMonth() === date.getMonth() && consultationDate.getFullYear() === date.getFullYear()
    })

    monthlyData.push({
      month: monthName,
      consultations: monthConsultations.length,
      applications: monthConsultations.length,
    })
  }

  return monthlyData
}

function calculateServiceDistribution(consultations: any[]) {
  const serviceTypes = consultations.reduce((acc: any, consultation: any) => {
    const service = consultation.service_type || "other"
    acc[service] = (acc[service] || 0) + 1
    return acc
  }, {})

  const total = consultations.length || 1
  const colors = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"]

  return Object.entries(serviceTypes).map(([name, count], index) => ({
    name: formatServiceName(name as string),
    value: Math.round(((count as number) / total) * 100),
    color: colors[index % colors.length],
  }))
}

function generateWeeklyData(consultations: any[]) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  const weeklyData = days.map((day) => ({ day, applications: 0 }))

  consultations.forEach((consultation: any) => {
    const date = new Date(consultation.created_at)
    const dayIndex = (date.getDay() + 6) % 7 // Convert Sunday=0 to Monday=0
    if (dayIndex >= 0 && dayIndex < 7) {
      weeklyData[dayIndex].applications++
    }
  })

  return weeklyData
}

function combineRecentActivities(consultations: any[], blogs: any[], events: any[]) {
  const activities: { id: string; type: string; client: any; service: string; status: any; date: string }[] = []

  consultations.slice(0, 3).forEach((consultation: any) => {
    activities.push({
      id: `consultation-${consultation.id}`,
      type: "consultation",
      client: `${consultation.first_name} ${consultation.last_name}`,
      service: formatServiceName(consultation.service_type),
      status: consultation.status,
      date: new Date(consultation.created_at).toISOString().split("T")[0],
    })
  })

  blogs.slice(0, 2).forEach((blog: any) => {
    activities.push({
      id: `blog-${blog.id}`,
      type: "blog",
      client: blog.title,
      service: "Content Creation",
      status: blog.published_at ? "published" : "draft",
      date: new Date(blog.created_at).toISOString().split("T")[0],
    })
  })

  return activities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5)
}

function formatServiceName(serviceType: string) {
  const serviceNames: { [key: string]: string } = {
    "business-setup": "Business Setup",
    "visa-services": "Visa Services",
    "tax-accounting": "Tax & Accounting",
    "license-permit": "License & Permit",
    "business-renewal": "Business Renewal",
    amendment: "Amendment",
    consultation: "Consultation",
    other: "Other Services",
  }

  return serviceNames[serviceType] || serviceType.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())
}
