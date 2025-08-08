import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DocumentsPage() {
  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Documents</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="mt-4">
          <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
          <p className="text-muted-foreground">
            Document management and processing center
          </p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Pending Review</CardTitle>
              <CardDescription>Documents awaiting approval</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">156</p>
              <p className="text-xs text-muted-foreground">Requires attention</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Processed Today</CardTitle>
              <CardDescription>Documents completed today</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">89</p>
              <p className="text-xs text-muted-foreground">Successfully processed</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Archive</CardTitle>
              <CardDescription>Total archived documents</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">2,847</p>
              <p className="text-xs text-muted-foreground">All time total</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarInset>
  )
}
