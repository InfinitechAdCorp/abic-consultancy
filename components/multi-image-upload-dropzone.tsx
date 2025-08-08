'use client'

import React, { useState, useCallback, useEffect, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { ImageIcon, UploadCloud, X } from 'lucide-react'
import Image from 'next/image'

export interface ImageFile {
  file: File;
  preview: string;
}

export interface ExistingImage {
  id: number;
  image_path: string; // The URL from the backend
}

interface MultiImageUploadDropzoneProps {
  id: string;
  label: string;
  onFilesChange: (newFiles: File[], imagesToDelete: number[]) => void;
  existingImages?: ExistingImage[]; // Images already saved in the backend
  disabled?: boolean;
}

export function MultiImageUploadDropzone({
  id,
  label,
  onFilesChange,
  existingImages = [],
  disabled = false,
}: MultiImageUploadDropzoneProps) {
  const [newlySelectedFiles, setNewlySelectedFiles] = useState<ImageFile[]>([])
  const [imagesToDelete, setImagesToDelete] = useState<number[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Ref to store the last emitted state to prevent unnecessary calls to onFilesChange
  const lastEmittedNewFiles = useRef<File[]>([]);
  const lastEmittedImagesToDelete = useRef<number[]>([]);

  // Helper for comparing File arrays by content (name and size)
  const areFilesEqual = useCallback((arr1: File[], arr2: File[]) => {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i].name !== arr2[i].name || arr1[i].size !== arr2[i].size) {
        return false;
      }
    }
    return true;
  }, []);

  // Helper for comparing number arrays (for image IDs) by content
  const areImageIdsEqual = useCallback((arr1: number[], arr2: number[]) => {
    if (arr1.length !== arr2.length) return false;
    // Sort to ensure order doesn't matter for comparison
    const sortedArr1 = [...arr1].sort((a, b) => a - b);
    const sortedArr2 = [...arr2].sort((a, b) => a - b);
    for (let i = 0; i < sortedArr1.length; i++) {
      if (sortedArr1[i] !== sortedArr2[i]) {
        return false;
      }
    }
    return true;
  }, []);

  // Effect to reset internal state when parent's existingImages change
  // This is crucial for when the component is reused (e.g., for an edit form)
  // or when the parent explicitly wants to reset the child's state.
  // By using a stable empty array for `existingImages` in the create form,
  // this effect will only run once on mount for the create dialog.
  useEffect(() => {
    setNewlySelectedFiles([]);
    setImagesToDelete([]);
    // Also reset the last emitted state refs
    lastEmittedNewFiles.current = [];
    lastEmittedImagesToDelete.current = [];
  }, [existingImages]);

  // This effect is responsible for calling onFilesChange when internal state changes
  useEffect(() => {
    const currentNewFiles = newlySelectedFiles.map(item => item.file);
    const currentImagesToDelete = imagesToDelete;

    // Only call onFilesChange if the content of the arrays has actually changed
    const newFilesContentChanged = !areFilesEqual(currentNewFiles, lastEmittedNewFiles.current);
    const imagesToDeleteContentChanged = !areImageIdsEqual(currentImagesToDelete, lastEmittedImagesToDelete.current);

    if (newFilesContentChanged || imagesToDeleteContentChanged) {
      onFilesChange(currentNewFiles, currentImagesToDelete);
      lastEmittedNewFiles.current = currentNewFiles;
      lastEmittedImagesToDelete.current = currentImagesToDelete;
    }
  }, [newlySelectedFiles, imagesToDelete, onFilesChange, areFilesEqual, areImageIdsEqual]);

  const handleFileAdd = useCallback((files: FileList | null) => {
    if (files) {
      const newImageFiles: ImageFile[] = Array.from(files).map(file => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setNewlySelectedFiles(prev => [...prev, ...newImageFiles]);
    }
  }, []);

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
    handleFileAdd(e.dataTransfer.files);
    e.dataTransfer.clearData();
  }, [handleFileAdd]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileAdd(e.target.files);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Clear the input so same file can be selected again
    }
  }, [handleFileAdd]);

  const handleRemoveNewFile = useCallback((fileToRemove: ImageFile) => {
    setNewlySelectedFiles(prev => {
      const updatedFiles = prev.filter(item => item.preview !== fileToRemove.preview);
      URL.revokeObjectURL(fileToRemove.preview); // Clean up object URL
      return updatedFiles;
    });
  }, []);

  const handleRemoveExistingImage = useCallback((imageId: number) => {
    setImagesToDelete(prev => [...prev, imageId]);
  }, []);

  const allImages = [
    ...existingImages.filter(img => !imagesToDelete.includes(img.id)),
    ...newlySelectedFiles.map(file => ({ id: null, image_path: file.preview })) // Treat new files like existing for display
  ];

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
      {allImages.length > 0 && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {allImages.map((img, index) => (
            <div key={img.id || img.image_path} className="relative w-full aspect-square rounded-md overflow-hidden border border-gray-200">
              <Image
                src={img.id ? `${process.env.NEXT_PUBLIC_API_URL}${img.image_path}` : img.image_path} // Use backend URL for existing, object URL for new
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
                  e.stopPropagation();
                  if (img.id !== null) {
                    handleRemoveExistingImage(img.id);
                  } else {
                    // Find the original ImageFile object to revoke URL
                    const fileToRemove = newlySelectedFiles.find(f => f.preview === img.image_path);
                    if (fileToRemove) handleRemoveNewFile(fileToRemove);
                  }
                }}
                disabled={disabled}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
