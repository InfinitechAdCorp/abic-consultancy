"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarDays, Clock, ArrowLeft, Share2, BookOpen } from "lucide-react"
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
  created_at: string
  updated_at: string
  reading_time: number
  featured: boolean
  meta_description: string | null
  seo_keywords: string[]
}

interface RelatedPost {
  id: number
  title: string
  slug: string
  excerpt: string
  thumbnail: string | null
  published_at: string
  reading_time: number
}

interface BlogPostResponse {
  post: BlogPost
  related_posts: RelatedPost[]
}

export default function BlogPostPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  const [post, setPost] = useState<BlogPost | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<RelatedPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (slug) {
      fetchBlogPost(slug)
    }
  }, [slug])

  const fetchBlogPost = async (postSlug: string) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/blog?slug=${postSlug}`)

      if (!response.ok) {
        throw new Error("Failed to fetch blog post")
      }

      const data: BlogPostResponse = await response.json()
      setPost(data.post)
      setRelatedPosts(data.related_posts || [])
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
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
    return `${baseUrl}${path}`
  }

  const handleShare = async () => {
    if (navigator.share && post) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        })
      } catch (err) {
        // Fallback to copying URL
        navigator.clipboard.writeText(window.location.href)
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading blog post...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <p className="text-red-600 text-lg">Error: {error || "Blog post not found"}</p>
            <div className="mt-4 space-x-4">
              <Button onClick={() => router.back()} variant="outline">
                Go Back
              </Button>
              <Link href="/blog">
                <Button>View All Posts</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navigation />

      {/* Header with Back and Share - Full width */}
      <div className="border-b bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <Link href="/blog">
              <Button variant="ghost" className="text-teal-600 hover:text-teal-700">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
            <Button onClick={handleShare} variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Container - Consistent width */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Side - Video/Media - Takes 3 columns */}
          <div className="lg:col-span-3 space-y-6">
            {/* Title and Meta Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <CalendarDays className="w-4 h-4" />
                  <span>{formatDate(post.created_at)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>{post.reading_time} min read</span>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">{post.title}</h1>

              <p className="text-lg text-gray-600 leading-relaxed">{post.excerpt}</p>
            </div>

            {/* Video/Media */}
            {(post.video_path || post.thumbnail) && (
              <div className="rounded-lg overflow-hidden bg-gray-100 shadow-lg">
                {post.video_path ? (
                  <video
                    src={getMediaUrl(post.video_path) || undefined}
                    controls
                    className="w-full h-auto object-contain max-h-[70vh]"
                    poster={getMediaUrl(post.thumbnail) || undefined}
                    preload="metadata"
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : post.thumbnail ? (
                  <Image
                    src={getMediaUrl(post.thumbnail) || "/placeholder.svg"}
                    alt={post.title}
                    width={800}
                    height={600}
                    className="w-full h-auto object-contain max-h-[70vh]"
                  />
                ) : (
                  <div className="aspect-video bg-gradient-to-br from-teal-100 to-green-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-teal-600" />
                  </div>
                )}
              </div>
            )}

            {/* Article Summary - Now under video with full width */}
            <Card className="shadow-sm border-gray-200">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <div className="w-3 h-3 bg-teal-600 rounded-full mr-3"></div>
                  Article Summary
                </h3>
                <div className="bg-gradient-to-r from-teal-50 to-green-50 rounded-lg p-6 border-l-4 border-teal-500">
                  <div
                    className="text-base text-gray-700 leading-relaxed prose prose-base max-w-none"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-2">
                      <CalendarDays className="w-4 h-4" />
                      Published {formatDate(post.created_at)}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {post.reading_time} min read
                    </span>
                  </div>
                  <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm font-medium">
                    {post.featured ? "Featured Article" : "Article"}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Content Sidebar - Takes 1 column */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Article Stats Card */}
              <Card className="bg-gradient-to-br from-teal-50 to-green-50 border-teal-200 shadow-sm">
                <CardContent className="p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <BookOpen className="w-5 h-5 mr-2 text-teal-600" />
                    Article Info
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-teal-100">
                      <div className="text-2xl font-bold text-teal-600">{post.reading_time}</div>
                      <div className="text-sm text-gray-600">Min Read</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-teal-100">
                      <div className="text-2xl font-bold text-teal-600">{new Date(post.created_at).getDate()}</div>
                      <div className="text-sm text-gray-600">
                        {new Date(post.created_at).toLocaleDateString("en-US", { month: "short" })}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Key Highlights Card */}
              <Card className="shadow-sm border-gray-200">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <div className="w-2 h-2 bg-teal-600 rounded-full mr-3"></div>
                    Key Highlights
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-1.5 h-1.5 bg-teal-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        Comprehensive guide to{" "}
                        {post.title.toLowerCase().includes("summer")
                          ? "summer business strategies"
                          : "business optimization"}
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-1.5 h-1.5 bg-teal-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        Expert insights from ABIC Consultancy professionals
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-1.5 h-1.5 bg-teal-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700 leading-relaxed">Practical solutions for modern businesses</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Actions Card */}
              <Card className="shadow-sm border-gray-200">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                        <Share2 className="w-4 h-4 mr-2 text-teal-600" />
                        Share this article
                      </h4>
                      <Button onClick={handleShare} className="w-full bg-teal-600 hover:bg-teal-700 shadow-sm">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share Article
                      </Button>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <Link href="/blog">
                        <Button variant="outline" className="w-full bg-transparent hover:bg-gray-50">
                          <ArrowLeft className="w-4 h-4 mr-2" />
                          More Articles
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Related Posts - Full width with consistent container */}
      {relatedPosts.length > 0 && (
        <div className="bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Related Articles</h2>
              <p className="text-gray-600">Continue reading with these related posts</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Card
                  key={relatedPost.id}
                  className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <Link href={`/blog/${relatedPost.slug}`} className="block">
                    {relatedPost.thumbnail ? (
                      <div className="aspect-video overflow-hidden">
                        <Image
                          src={getMediaUrl(relatedPost.thumbnail) || "/placeholder.svg"}
                          alt={relatedPost.title}
                          width={400}
                          height={225}
                          className="w-full h-auto object-contain hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div className="aspect-video bg-gradient-to-br from-teal-100 to-green-100 flex items-center justify-center">
                        <BookOpen className="w-8 h-8 text-teal-600" />
                      </div>
                    )}
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2 hover:text-teal-600 transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{relatedPost.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                       
                        <span>{relatedPost.reading_time} min read</span>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link href="/blog">
                <Button variant="outline" size="lg" className="px-8 bg-transparent">
                  View All Posts
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
