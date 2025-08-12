"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Upload, X, Video } from 'lucide-react'

interface BlogFormData {
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  reading_time: number
  featured: boolean
  meta_description: string
  seo_keywords: string[]
}

export default function BlogForm() {
  const [formData, setFormData] = useState<BlogFormData>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "",
    tags: [],
    reading_time: 5,
    featured: false,
    meta_description: "",
    seo_keywords: [],
  })

  const [thumbnail, setThumbnail] = useState<File | null>(null)
  const [video, setVideo] = useState<File | null>(null)
  const [tagInput, setTagInput] = useState("")
  const [keywordInput, setKeywordInput] = useState("")
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setThumbnail(e.target.files[0])
    }
  }

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideo(e.target.files[0])
    }
  }

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }))
      setTagInput("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const addKeyword = () => {
    if (keywordInput.trim() && !formData.seo_keywords.includes(keywordInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        seo_keywords: [...prev.seo_keywords, keywordInput.trim()],
      }))
      setKeywordInput("")
    }
  }

  const removeKeyword = (keywordToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      seo_keywords: prev.seo_keywords.filter((keyword) => keyword !== keywordToRemove),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const submitData = new FormData()
      
      // Add form data
      Object.entries(formData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          submitData.append(key, JSON.stringify(value))
        } else {
          submitData.append(key, value.toString())
        }
      })

      // Add files
      if (thumbnail) {
        submitData.append("thumbnail", thumbnail)
      }
      if (video) {
        submitData.append("video", video)
      }

      const response = await fetch("/api/blog", {
        method: "POST",
        body: submitData,
      })

      if (!response.ok) {
        throw new Error("Failed to create blog post")
      }

      const result = await response.json()
      console.log("Blog post created:", result)
      
      // Reset form
      setFormData({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        category: "",
        tags: [],
        reading_time: 5,
        featured: false,
        meta_description: "",
        seo_keywords: [],
      })
      setThumbnail(null)
      setVideo(null)
      
      alert("Blog post created successfully!")
    } catch (error) {
      console.error("Error creating blog post:", error)
      alert("Failed to create blog post. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New Blog Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                rows={3}
                required
              />
            </div>

            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                rows={10}
                required
              />
            </div>

            {/* Media Upload */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="thumbnail">Thumbnail Image</Label>
                <div className="mt-2">
                  <Input
                    id="thumbnail"
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailChange}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("thumbnail")?.click()}
                    className="w-full"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {thumbnail ? thumbnail.name : "Upload Thumbnail"}
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="video">Video File</Label>
                <div className="mt-2">
                  <Input
                    id="video"
                    type="file"
                    accept="video/*"
                    onChange={handleVideoChange}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("video")?.click()}
                    className="w-full"
                  >
                    <Video className="w-4 h-4 mr-2" />
                    {video ? video.name : "Upload Video"}
                  </Button>
                </div>
              </div>
            </div>

            {/* Category and Settings */}
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="reading_time">Reading Time (minutes)</Label>
                <Input
                  id="reading_time"
                  name="reading_time"
                  type="number"
                  value={formData.reading_time}
                  onChange={handleInputChange}
                  min="1"
                  required
                />
              </div>
              <div className="flex items-center space-x-2 mt-6">
                <input
                  id="featured"
                  name="featured"
                  type="checkbox"
                  checked={formData.featured}
                  onChange={handleInputChange}
                  className="rounded"
                />
                <Label htmlFor="featured">Featured Post</Label>
              </div>
            </div>

            {/* Tags */}
            <div>
              <Label>Tags</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="Add a tag"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                />
                <Button type="button" onClick={addTag} variant="outline">
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => removeTag(tag)} />
                  </Badge>
                ))}
              </div>
            </div>

            {/* SEO */}
            <div>
              <Label htmlFor="meta_description">Meta Description</Label>
              <Textarea
                id="meta_description"
                name="meta_description"
                value={formData.meta_description}
                onChange={handleInputChange}
                rows={2}
                placeholder="SEO meta description"
              />
            </div>

            <div>
              <Label>SEO Keywords</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  placeholder="Add a keyword"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addKeyword())}
                />
                <Button type="button" onClick={addKeyword} variant="outline">
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.seo_keywords.map((keyword) => (
                  <Badge key={keyword} variant="secondary" className="flex items-center gap-1">
                    {keyword}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => removeKeyword(keyword)} />
                  </Badge>
                ))}
              </div>
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Creating..." : "Create Blog Post"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
