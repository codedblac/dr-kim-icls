'use client'

import { useState, useRef, useEffect } from 'react'
import { Bold, Italic, Underline, Heading1, Heading2, Heading3, Heading4, List, ListOrdered, Highlighter, Trash2 } from 'lucide-react'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [uploading, setUploading] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  // Initialize editor with saved value
  useEffect(() => {
    if (editorRef.current && !isInitialized && value) {
      editorRef.current.innerHTML = value
      setIsInitialized(true)
    }
  }, [isInitialized, value])

  const updateValue = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const applyFormat = (format: string) => {
    document.execCommand(format, false, undefined)
    editorRef.current?.focus()
    updateValue()
  }

  const formatBlock = (tag: string) => {
    document.execCommand('formatBlock', false, `<${tag}>`)
    editorRef.current?.focus()
    updateValue()
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      console.log('[v0] Uploading file:', { name: file.name, size: file.size, type: file.type })

      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      })

      console.log('[v0] Upload response status:', response.status)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.details || errorData.error || 'Upload failed')
      }

      const data = await response.json()
      console.log('[v0] Upload successful:', data)

      if (editorRef.current) {
        // For private blobs, use the pathname with /api/blob route
        const imageUrl = data.pathname ? `/api/blob?pathname=${encodeURIComponent(data.pathname)}` : data.url
        const imgTag = `<img src="${imageUrl}" alt="Uploaded image" style="max-width: 100%; height: auto; margin: 8px 0;" />`
        document.execCommand('insertHTML', false, imgTag)
        updateValue()
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error'
      console.error('[v0] Image upload error:', errorMsg)
      alert(`Failed to upload image: ${errorMsg}`)
    } finally {
      setUploading(false)
    }
  }

  const toolbarButtons = [
    { group: 'headings', buttons: [
      { icon: Heading1, label: 'Heading 1', action: () => formatBlock('h1') },
      { icon: Heading2, label: 'Heading 2', action: () => formatBlock('h2') },
      { icon: Heading3, label: 'Heading 3', action: () => formatBlock('h3') },
      { icon: Heading4, label: 'Heading 4', action: () => formatBlock('h4') },
    ] },
    { group: 'formatting', buttons: [
      { icon: Bold, label: 'Bold', action: () => applyFormat('bold'), shortcut: 'Ctrl+B' },
      { icon: Italic, label: 'Italic', action: () => applyFormat('italic'), shortcut: 'Ctrl+I' },
      { icon: Underline, label: 'Underline', action: () => applyFormat('underline'), shortcut: 'Ctrl+U' },
      { icon: Highlighter, label: 'Highlight', action: () => applyFormat('backColor') },
    ] },
    { group: 'lists', buttons: [
      { icon: List, label: 'Bullet List', action: () => applyFormat('insertUnorderedList') },
      { icon: ListOrdered, label: 'Numbered List', action: () => applyFormat('insertOrderedList') },
    ] },
  ]

  return (
    <div className="bg-white rounded-sm border border-[#E2E8F0] overflow-hidden flex flex-col">
      {/* Toolbar */}
      <div className="border-b border-[#E2E8F0] p-2 bg-[#F4F6F9] flex flex-wrap gap-1">
        {toolbarButtons.map((group) => (
          <div key={group.group} className="flex gap-1">
            {group.buttons.map(({ icon: Icon, label, action }) => (
              <button
                key={label}
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault()
                  action()
                }}
                title={label}
                className="p-2 rounded hover:bg-white text-[#4A5568] hover:text-[#C9963A] transition-colors"
                aria-label={label}
              >
                <Icon size={18} />
              </button>
            ))}
            {group.group !== toolbarButtons[toolbarButtons.length - 1].group && (
              <div className="border-l border-[#E2E8F0]" />
            )}
          </div>
        ))}

        <div className="border-l border-[#E2E8F0]" />

        <label className="p-2 rounded hover:bg-white text-[#4A5568] hover:text-[#C9963A] transition-colors cursor-pointer" title="Insert image">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploading}
            className="hidden"
            aria-label="Upload image"
          />
        </label>

        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault()
            if (editorRef.current) {
              editorRef.current.innerHTML = ''
              onChange('')
            }
          }}
          title="Clear"
          className="p-2 rounded hover:bg-white text-[#4A5568] hover:text-red-500 transition-colors ml-auto"
          aria-label="Clear content"
        >
          <Trash2 size={18} />
        </button>

        {uploading && <span className="text-xs text-[#4A5568] px-2 py-2">Uploading...</span>}
      </div>

      {/* WYSIWYG Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={updateValue}
        onBlur={updateValue}
        data-placeholder={placeholder || 'Write your content here...'}
        className="flex-1 p-4 outline-none text-[#1A202C] min-h-96 prose prose-sm max-w-none focus:outline-none empty:before:content-[attr(data-placeholder)] empty:before:text-[#999]"
        style={{
          fontSize: '14px',
          lineHeight: '1.6',
        }}
      />
    </div>
  )
}
