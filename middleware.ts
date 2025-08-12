import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Define protected routes
const protectedRoutes = [
  "/admin",
  "/admin/testimonials",
  "/admin/clients",
  "/admin/applications",
  "/admin/revenue",
  "/admin/business-services",
  "/admin/visa-services",
  "/admin/tax-accounting",
  "/admin/consultations",
  "/admin/contact-forms",
  "/admin/chat",
  "/admin/events",
  "/admin/announcements",
  "/admin/settings",
  "/admin/help",
]

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route))

  // Get the authentication cookie
  const isAuthenticated = req.cookies.get("isAuthenticated")?.value === "true"

  // If trying to access a protected route and not authenticated, redirect to login
  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", req.nextUrl))
  }

  // If trying to access login/signup while authenticated, redirect to admin dashboard
  if ((path === "/login" || path === "/signup") && isAuthenticated) {
    return NextResponse.redirect(new URL("/admin", req.nextUrl))
  }

  return NextResponse.next()
}

// Configure middleware to run on all paths except API routes, static files, and images
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
}
