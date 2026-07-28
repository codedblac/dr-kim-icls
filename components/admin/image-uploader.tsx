'use client'

import { useState, useRef } from 'react'
import { Upload, X } from 'lucide-react'

interface ImageUploaderProps {
  value: string
  onChange: (url: string) => void
  label?: string
}

export function ImageUploader({ value, onChange, label = 'Cover Image' }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [inputMode, setInputMode] = useState<'upload' | 'url'>('upload')
  const [urlInput, setUrlInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be less than 5MB')
      return
    }

    setUploading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const data = await response.json()
      // For private blobs, use the pathname with /api/blob route
      const imageUrl = data.pathname ? `/api/blob?pathname=${encodeURIComponent(data.pathname)}` : data.url
      onChange(imageUrl)
    } catch (err) {
      setError('Failed to upload image')
      console.error(err)
    } finally {
      setUploading(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const file = e.dataTransfer.files[0]
    if (file) handleFileSelect(file)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0]
    if (file) handleFileSelect(file)
  }

  const handleUrlSubmit = () => {
    if (!urlInput.trim()) {
      setError('Please enter a URL')
      return
    }
    onChange(urlInput.trim())
    setUrlInput('')
    setInputMode('upload')
    setError(null)
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="font-sans font-semibold text-sm text-[#1A202C]">{label}</label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setInputMode('upload')}
            className={`font-sans text-xs px-2 py-1 rounded transition-colors ${inputMode === 'upload' ? 'bg-[#C9963A] text-white' : 'bg-[#F4F6F9] text-[#4A5568] hover:bg-[#E2E8F0]'}`}
          >
            Upload
          </button>
          <button
            type="button"
            onClick={() => setInputMode('url')}
            className={`font-sans text-xs px-2 py-1 rounded transition-colors ${inputMode === 'url' ? 'bg-[#C9963A] text-white' : 'bg-[#F4F6F9] text-[#4A5568] hover:bg-[#E2E8F0]'}`}
          >
            URL
          </button>
        </div>
      </div>

      {inputMode === 'url' ? (
        <div className="space-y-2">
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="w-full border border-[#E2E8F0] rounded-sm px-3 py-2 font-sans text-sm focus:outline-none focus:border-[#C9963A]"
          />
          <button
            type="button"
            onClick={handleUrlSubmit}
            className="w-full bg-[#C9963A] text-white font-sans font-semibold text-sm py-2 rounded-sm hover:bg-[#0A1628] transition-colors"
          >
            Add Image URL
          </button>
        </div>
      ) : value ? (
        <div className="relative rounded-sm border border-[#E2E8F0] overflow-hidden bg-[#F4F6F9]">
          <img src={value} alt="Cover" className="w-full h-48 object-cover" />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-sm hover:bg-red-600 transition-colors"
            aria-label="Remove image"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border-2 border-dashed border-[#C9963A]/30 rounded-sm p-8 text-center cursor-pointer hover:border-[#C9963A] hover:bg-[#F4F6F9] transition-colors"
          onClick={() => inputRef.current?.click()}
        >
          <Upload size={24} className="mx-auto mb-2 text-[#C9963A]" aria-hidden="true" />
          <p className="font-sans text-sm text-[#4A5568] mb-1">Drop image here or click to upload</p>
          <p className="font-sans text-xs text-[#4A5568]/60">PNG, JPG up to 5MB</p>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        disabled={uploading}
        className="hidden"
      />

      {uploading && <div className="text-center text-sm text-[#4A5568]">Uploading...</div>}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}
