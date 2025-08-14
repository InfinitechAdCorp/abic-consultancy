"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarDays, Clock, ArrowRight, Play, AlertCircle } from "lucide-react"
import Footer from "@/components/footer"
import Navigation from "@/components/navigation"

interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  thumbnail: string | null
  video_path: string | null
  published_at: string
  reading_time: number
  featured: boolean
}

interface BlogResponse {
  data: BlogPost[]
  current_page: number
  last_page: number
  per_page: number
  total: number
  message?: string
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [error, setError] = useState<string | null>(null)
  const [backendStatus, setBackendStatus] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchBlogs(currentPage)
  }, [currentPage])

  const fetchBlogs = async (page: number) => {
    try {
      const response = await fetch(`/api/blog?page=${page}&limit=9`)

      if (!response.ok) {
        throw new Error("Failed to fetch blogs")
      }

      const data: BlogResponse = await response.json()

      if (data.message && data.message.includes("backend")) {
        setBackendStatus(data.message)
      } else {
        setBackendStatus(null)
      }

      setBlogs(data.data)
      setTotalPages(data.last_page)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getMediaUrl = (path: string | null) => {
    if (!path) return null
    const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") || "http://localhost:8000"
    return `${baseUrl}${path}?v=${Date.now()}`
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-2xl mx-auto">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Connection Error</h2>
            <p className="text-red-600 text-lg mb-4">Error: {error}</p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-yellow-800 mb-2">To fix this issue:</h3>
              <ol className="text-left text-yellow-700 space-y-1">
                <li>1. Make sure Laravel backend is running on port 8000</li>
                <li>
                  2. Run: <code className="bg-yellow-100 px-2 py-1 rounded">php artisan serve --port=8000</code>
                </li>
                <li>3. Check that NEXT_PUBLIC_API_URL is set to http://localhost:8000/api</li>
              </ol>
            </div>
            <Button onClick={() => fetchBlogs(currentPage)} className="bg-teal-600 hover:bg-teal-700">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Navigation Component */}
      <Navigation />

      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-100 to-teal-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">
            <span className="text-gray-900">ABIC</span> <span className="text-teal-600">Blog</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Insights, tips, and updates from our business consulting experts
          </p>
          {backendStatus && (
            <div className="mt-6 max-w-2xl mx-auto">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-center justify-center gap-2 text-amber-800">
                  <AlertCircle className="w-5 h-5" />
                  <span className="font-medium">Backend Status:</span>
                </div>
                <p className="text-amber-700 mt-2">{backendStatus}</p>
                <p className="text-sm text-amber-600 mt-2">
                  Start Laravel server with:{" "}
                  <code className="bg-amber-100 px-2 py-1 rounded">php artisan serve --port=8000</code>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="container mx-auto px-4 py-16">
        {blogs.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">No blog posts found.</p>
            {backendStatus && <p className="text-gray-500 mt-2">Connect to Laravel backend to load blog posts.</p>}
          </div>
        ) : (
          <>
            {/* Featured Post */}
            {blogs.find((blog) => blog.featured) && (
              <div className="mb-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Post</h2>
                {(() => {
                  const featuredPost = blogs.find((blog) => blog.featured)!
                  return (
                    <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                      <div className="md:flex">
                        <div className="md:w-1/2 relative">
                          {featuredPost.thumbnail ? (
                            <Image
                              src={getMediaUrl(featuredPost.thumbnail) || "/placeholder.svg"}
                              alt={featuredPost.title}
                              width={600}
                              height={400}
                              className="w-full h-64 md:h-full object-cover object-center"
                            />
                          ) : (
                            <div className="w-full h-64 md:h-full bg-gradient-to-br from-teal-100 to-green-100 flex items-center justify-center">
                              <span className="text-teal-600 text-lg font-medium">ABIC Consultancy</span>
                            </div>
                          )}
                          {featuredPost.video_path && (
                            <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                              <Play className="w-3 h-3" />
                              Video
                            </div>
                          )}
                        </div>
                        <div className="md:w-1/2 p-8">
                          <CardTitle className="text-2xl mb-4 hover:text-teal-600 transition-colors">
                            <Link href={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link>
                          </CardTitle>
                          <p className="text-gray-600 mb-6 line-clamp-3">{featuredPost.excerpt}</p>
                          <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
                            <div className="flex items-center gap-2">
                              <CalendarDays className="w-4 h-4" />
                              <span>{formatDate(featuredPost.published_at)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              <span>{featuredPost.reading_time} min read</span>
                            </div>
                          </div>
                          <Link href={`/blog/${featuredPost.slug}`}>
                            <Button className="bg-teal-600 hover:bg-teal-700">
                              Read More <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </Card>
                  )
                })()}
              </div>
            )}

            {/* Regular Posts Grid */}
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Latest Posts</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs
                  .filter((blog) => !blog.featured)
                  .map((blog) => (
                    <Card key={blog.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                      <div className="relative">
                        {blog.thumbnail ? (
                          <Image
                            src={getMediaUrl(blog.thumbnail) || "/placeholder.svg"}
                            alt={blog.title}
                            width={400}
                            height={250}
                            className="w-full h-48 object-cover object-center"
                          />
                        ) : (
                          <div className="w-full h-48 bg-gradient-to-br from-teal-100 to-green-100 flex items-center justify-center">
                            <span className="text-teal-600 font-medium">ABIC Consultancy</span>
                          </div>
                        )}
                        {blog.video_path && (
                          <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                            <Play className="w-3 h-3" />
                            Video
                          </div>
                        )}
                      </div>
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-gray-500">{formatDate(blog.published_at)}</span>
                        </div>
                        <CardTitle className="text-lg hover:text-teal-600 transition-colors">
                          <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{blog.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{blog.reading_time} min</span>
                            </div>
                          </div>
                          <Link href={`/blog/${blog.slug}`}>
                            <Button variant="ghost" size="sm" className="text-teal-600 hover:text-teal-700">
                              Read More
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    onClick={() => setCurrentPage(page)}
                    className={currentPage === page ? "bg-teal-600 hover:bg-teal-700" : ""}
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer Component */}
      <Footer />
    </div>
  )
}
