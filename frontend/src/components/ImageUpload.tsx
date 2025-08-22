import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Upload, Image as ImageIcon, X, Check } from "lucide-react";

interface ImageUploadProps {
  value?: string;
  onChange: (imageUrl: string) => void;
  className?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange, className }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Convert file to base64 data URL (for demo purposes)
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Simulate upload to a service (in real app, you'd upload to your server/cloud)
  const uploadFile = async (file: File): Promise<string> => {
    setIsUploading(true);
    setUploadError(null);

    try {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        throw new Error('Please select an image file (JPG, PNG, GIF, etc.)');
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('Image size must be less than 5MB');
      }

      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // For demo, convert to base64 (in production, upload to your server/cloud)
      const base64Url = await convertToBase64(file);
      
      // In a real app, you would upload to your server and get back a URL
      // const formData = new FormData();
      // formData.append('image', file);
      // const response = await fetch('/api/upload', { method: 'POST', body: formData });
      // const { url } = await response.json();
      
      return base64Url;
    } catch (error) {
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      await handleFileUpload(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = async (file: File) => {
    try {
      const imageUrl = await uploadFile(file);
      onChange(imageUrl);
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : 'Upload failed');
    }
  };

  const handleRemoveImage = () => {
    onChange('');
    setUploadError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  if (value) {
    return (
      <div className={className}>
        <Label className="text-lg font-semibold text-gray-700 mb-2 block">
          Featured Image (Banner/Hero Image)
        </Label>
        <Card className="p-4 border-2 border-green-200 bg-green-50">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center text-green-700">
              <Check className="w-5 h-5 mr-2" />
              <span className="font-medium">Image uploaded successfully!</span>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleRemoveImage}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <X className="w-4 h-4 mr-1" />
              Remove
            </Button>
          </div>
          
          {/* Image Preview */}
          <div className="relative overflow-hidden rounded-lg border-2 border-gray-200">
            <img 
              src={value} 
              alt="Featured preview" 
              className="w-full h-48 object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
                const errorDiv = document.createElement('div');
                errorDiv.className = 'w-full h-48 bg-red-50 border border-red-200 rounded-lg flex items-center justify-center text-red-600';
                errorDiv.innerHTML = '❌ Image failed to load';
                (e.target as HTMLImageElement).parentNode?.replaceChild(errorDiv, e.target as HTMLImageElement);
              }}
            />
          </div>
          
          <p className="text-sm text-gray-600 mt-2">
            This image will appear as a large banner at the top of your blog post!
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className={className}>
      <Label className="text-lg font-semibold text-gray-700 mb-2 block">
        Featured Image (Banner/Hero Image)
      </Label>
      
      <Card 
        className={`
          p-8 border-2 border-dashed transition-all duration-200 cursor-pointer
          ${isDragging 
            ? 'border-orange-400 bg-orange-50' 
            : 'border-gray-300 hover:border-orange-300 hover:bg-orange-25'
          }
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <div className="text-center">
          {isUploading ? (
            <div className="space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
              <div>
                <p className="text-lg font-medium text-gray-700">Uploading your image...</p>
                <p className="text-sm text-gray-500">Please wait while we process your image</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="p-4 bg-orange-100 rounded-full">
                  {isDragging ? (
                    <Upload className="w-8 h-8 text-orange-600" />
                  ) : (
                    <ImageIcon className="w-8 h-8 text-orange-600" />
                  )}
                </div>
              </div>
              
              <div>
                <p className="text-lg font-medium text-gray-700 mb-2">
                  {isDragging ? 'Drop your image here!' : 'Add a featured image'}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Drag and drop an image here, or click to select a file
                </p>
                
                <Button 
                  type="button"
                  variant="outline"
                  className="border-orange-200 text-orange-700 hover:bg-orange-50"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Choose Image
                </Button>
              </div>
              
              <div className="text-xs text-gray-400 space-y-1">
                <p>• Supports JPG, PNG, GIF formats</p>
                <p>• Maximum file size: 5MB</p>
                <p>• Recommended size: 1200x600 pixels</p>
              </div>
            </div>
          )}
        </div>
      </Card>

      {uploadError && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600 flex items-center">
            <X className="w-4 h-4 mr-2" />
            {uploadError}
          </p>
        </div>
      )}

      <p className="text-sm text-gray-500 mt-2">
        💡 This image will appear as a large banner at the top of your blog post, just like professional blogs!
      </p>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};