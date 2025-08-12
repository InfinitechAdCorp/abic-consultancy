"use client"
import type React from "react"
import { useState, useCallback, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { UploadCloud, X } from "lucide-react"
import Image from "next/image"

export interface ImageFile {
  file: File
  preview: string
}

export interface ExistingImage {
  id: number
  image_path: string // The URL from the backend
}

interface MultiImageUploadDropzoneProps {
  id: string
  label: string
  // onFilesChange now receives the *current* new files and the *updated* imagesToDelete list
  onFilesChange: (newFiles: File[], imagesToDelete: number[]) => void
  existingImages: ExistingImage[] // Images already saved in the backend (full list)
  imagesToDelete: number[] // List of IDs of existing images marked for deletion (controlled by parent)
  disabled?: boolean
}

export function MultiImageUploadDropzone({
  id,
  label,
  onFilesChange,
  existingImages = [], // Default to empty array if not provided
  imagesToDelete = [], // Default to empty array if not provided
  disabled = false,
}: MultiImageUploadDropzoneProps) {
  const [newlySelectedFiles, setNewlySelectedFiles] = useState<ImageFile[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Refs to store the *last values that were actually passed to onFilesChange*
  // These are used to prevent infinite loops if onFilesChange is called with the same data
  const lastEmittedNewFilesRef = useRef<File[]>([])
  const lastEmittedImagesToDeleteRef = useRef<number[]>([])

  // Helper for comparing File arrays by content (name and size)
  const areFilesContentEqual = useCallback((arr1: File[], arr2: File[]) => {
    if (arr1.length !== arr2.length) return false
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i].name !== arr2[i].name || arr1[i].size !== arr2[i].size) {
        return false
      }
    }
    return true
  }, [])

  // Helper for comparing number arrays (for image IDs) by content
  const areImageIdsContentEqual = useCallback((arr1: number[], arr2: number[]) => {
    if (arr1.length !== arr2.length) return false
    // Sort to ensure order doesn't matter for comparison
    const sortedArr1 = [...arr1].sort((a, b) => a - b)
    const sortedArr2 = [...arr2].sort((a, b) => a - b)
    for (let i = 0; i < sortedArr1.length; i++) {
      if (sortedArr1[i] !== sortedArr2[i]) {
        return false
      }
    }
    return true
  }, [])

  // Effect to call onFilesChange when internal newlySelectedFiles or external imagesToDelete change
  useEffect(() => {
    const currentNewFiles = newlySelectedFiles.map((item) => item.file)
    const currentImagesToDelete = imagesToDelete // Use the prop directly

    const newFilesContentChanged = !areFilesContentEqual(currentNewFiles, lastEmittedNewFilesRef.current)
    const imagesToDeleteContentChanged = !areImageIdsContentEqual(
      currentImagesToDelete,
      lastEmittedImagesToDeleteRef.current,
    )

    if (newFilesContentChanged || imagesToDeleteContentChanged) {
      console.log("Dropzone (useEffect): Calling onFilesChange with:", {
        newFiles: currentNewFiles,
        imagesToDelete: currentImagesToDelete,
      })
      onFilesChange(currentNewFiles, currentImagesToDelete)
      lastEmittedNewFilesRef.current = currentNewFiles
      lastEmittedImagesToDeleteRef.current = currentImagesToDelete
    } else {
      console.log("Dropzone (useEffect): onFilesChange not called, no significant change detected.")
    }
  }, [newlySelectedFiles, imagesToDelete, onFilesChange, areFilesContentEqual, areImageIdsContentEqual])

  const handleFileAdd = useCallback((files: FileList | null) => {
    if (files) {
      const newImageFiles: ImageFile[] = Array.from(files).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }))
      setNewlySelectedFiles((prev) => {
        const updated = [...prev, ...newImageFiles]
        console.log("Dropzone (handleFileAdd): newlySelectedFiles updated to:", updated)
        return updated
      })
    }
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)
      handleFileAdd(e.dataTransfer.files)
      e.dataTransfer.clearData()
    },
    [handleFileAdd],
  )

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFileAdd(e.target.files)
      if (fileInputRef.current) {
        fileInputRef.current.value = "" // Clear the input so same file can be selected again
      }
    },
    [handleFileAdd],
  )

  const handleRemoveNewFile = useCallback((fileToRemove: ImageFile) => {
    setNewlySelectedFiles((prev) => {
      const updatedFiles = prev.filter((item) => item.preview !== fileToRemove.preview)
      URL.revokeObjectURL(fileToRemove.preview) // Clean up object URL
      console.log("Dropzone (handleRemoveNewFile): newlySelectedFiles updated to:", updatedFiles)
      return updatedFiles
    })
  }, [])

  const handleRemoveExistingImage = useCallback(
    (imageId: number) => {
      // Instead of managing imagesToDelete internally, call onFilesChange with the updated list
      const updatedImagesToDelete = [...imagesToDelete, imageId]
      console.log(
        "Dropzone (handleRemoveExistingImage): Calling onFilesChange with updated imagesToDelete:",
        updatedImagesToDelete,
      )
      onFilesChange(
        newlySelectedFiles.map((item) => item.file),
        updatedImagesToDelete,
      )
    },
    [imagesToDelete, newlySelectedFiles, onFilesChange],
  )

  // Filter existing images based on the imagesToDelete prop
  const filteredExistingImages = existingImages.filter((img) => !imagesToDelete.includes(img.id))
  console.log("Dropzone (render): filteredExistingImages (from prop and imagesToDelete prop):", filteredExistingImages)

  // Combine filtered existing images with newly selected files for display
  const allImagesForDisplay = [
    ...filteredExistingImages,
    ...newlySelectedFiles.map((file) => ({ id: null, image_path: file.preview })), // Treat new files like existing for display
  ]

  // Final logs before rendering
  console.log("Dropzone (render): allImagesForDisplay for rendering:", allImagesForDisplay)
  console.log("Dropzone (render): current imagesToDelete prop:", imagesToDelete)

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div
        className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-md transition-colors duration-200
         ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-50"}
         ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:border-gray-400 hover:bg-gray-100"}`}
        onDragOver={disabled ? undefined : handleDragOver}
        onDragLeave={disabled ? undefined : handleDragLeave}
        onDrop={disabled ? undefined : handleDrop}
        onClick={disabled ? undefined : () => fileInputRef.current?.click()}
      >
        <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          <span className="font-semibold">Drag and drop</span> or click to upload
        </p>
        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB per image</p>
        <Input
          id={id}
          name={id}
          type="file"
          multiple
          className="hidden"
          ref={fileInputRef}
          onChange={handleInputChange}
          accept="image/*"
          disabled={disabled}
        />
      </div>
      {allImagesForDisplay.length > 0 && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {allImagesForDisplay.map((img, index) => {
            const imageUrl = img.id
              ? `${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}${img.image_path}`
              : img.image_path
            console.log(
              `Rendering: ID=${img.id}, Path=${img.image_path}, URL=${imageUrl}, IsToDelete=${img.id !== null && imagesToDelete.includes(img.id)}`,
            )
            return (
              <div
                key={img.id !== null ? `existing-${img.id}` : `new-${img.image_path}`} // Improved key for new files
                className="relative w-full aspect-square rounded-md overflow-hidden border border-gray-200"
              >
                <Image
                  src={imageUrl || "/placeholder.svg"}
                  alt={`Event Image ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  className="object-center"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-1 right-1 h-6 w-6 rounded-full bg-red-500 text-white hover:bg-red-600"
                  onClick={(e) => {
                    e.stopPropagation()
                    if (img.id !== null) {
                      handleRemoveExistingImage(img.id) // This now calls onFilesChange
                    } else {
                      const fileToRemove = newlySelectedFiles.find((f) => f.preview === img.image_path)
                      if (fileToRemove) handleRemoveNewFile(fileToRemove)
                    }
                  }}
                  disabled={disabled}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
