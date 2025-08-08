"use client"

import React, { useState, useCallback, useEffect, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { ImageIcon, UploadCloud, X } from 'lucide-react'
import Image from 'next/image'

interface ImageUploadDropzoneProps {
  id: string;
  label: string;
  onFileChange: (file: File | null) => void;
  currentImageUrl?: string | null; // For displaying existing image from backend
  initialFile?: File | null; // For displaying a file already selected but not yet uploaded
  onRemoveExistingImage?: () => void; // Callback to signal removal of existing image
  disabled?: boolean;
}

export function ImageUploadDropzone({
  id,
  label,
  onFileChange,
  currentImageUrl,
  initialFile,
  onRemoveExistingImage,
  disabled = false,
}: ImageUploadDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Effect to create and revoke object URL for preview
  useEffect(() => {
    let url: string | null = null;
    if (initialFile) {
      url = URL.createObjectURL(initialFile);
      setPreviewUrl(url);
    } else if (currentImageUrl) {
      setPreviewUrl(currentImageUrl);
    } else {
      setPreviewUrl(null);
    }

    return () => {
      if (url) {
        URL.revokeObjectURL(url);
      }
    };
  }, [initialFile, currentImageUrl]);

  const handleFileSelect = useCallback((file: File | null) => {
    onFileChange(file);
  }, [onFileChange]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleFileSelect(file);
      e.dataTransfer.clearData();
    }
  }, [handleFileSelect]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      handleFileSelect(file);
    } else {
      handleFileSelect(null);
    }
  }, [handleFileSelect]);

  const handleRemovePreview = useCallback(() => {
    handleFileSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Clear the file input
    }
    if (onRemoveExistingImage) {
      onRemoveExistingImage(); // Signal to parent to remove existing image
    }
  }, [handleFileSelect, onRemoveExistingImage]);

  const displayImageSrc = initialFile ? previewUrl : (currentImageUrl ? `${process.env.NEXT_PUBLIC_API_URL}${currentImageUrl}` : null);

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div
        className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-md transition-colors duration-200
          ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-gray-400 hover:bg-gray-100'}`}
        onDragOver={disabled ? undefined : handleDragOver}
        onDragLeave={disabled ? undefined : handleDragLeave}
        onDrop={disabled ? undefined : handleDrop}
        onClick={disabled ? undefined : () => fileInputRef.current?.click()}
      >
        {displayImageSrc ? (
          <div className="relative w-full h-48 rounded-md overflow-hidden mb-4">
            <Image
              src={displayImageSrc || "/placeholder.svg"}
              alt="Image Preview"
              layout="fill"
              objectFit="contain" // Use contain to ensure full image is visible
              className="object-center"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-white rounded-full shadow-md hover:bg-gray-100"
              onClick={(e) => { e.stopPropagation(); handleRemovePreview(); }}
              disabled={disabled}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="text-center">
            <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              <span className="font-semibold">Drag and drop</span> or click to upload
            </p>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        )}
        <Input
          id={id}
          name={id}
          type="file"
          className="hidden"
          ref={fileInputRef}
          onChange={handleInputChange}
          accept="image/*"
          disabled={disabled}
        />
      </div>
    </div>
  );
}
