'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { RichTextEditor } from './rich-text-editor'
import { ImageUploader } from './image-uploader'

interface BlogPost {
  id?: string
  title: string
  slug: string
  excerpt: string
  body: string
  cover_image_url: string
  category: string
  seo_title: string
  seo_description: string
  published: boolean
}

interface BlogPostFormProps {
  initialData?: BlogPost
  mode: 'new' | 'edit'
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

const CATEGORIES = ['Procurement', 'Leadership', 'Finance', 'Literacy', 'Instruction', 'Policy']

export function BlogPostForm({ initialData, mode }: BlogPostFormProps) {
  const router = useRouter()
  const [form, setForm] = useState<BlogPost>(
    initialData ?? {
      title: '',
      slug: '',
      excerpt: '',
      body: '',
      cover_image_url: '',
      category: '',
      seo_title: '',
      seo_description: '',
      published: false,
    }
  )
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  function handleChange(field: keyof BlogPost, value: string | boolean) {
    setForm((prev) => {
      const next = { ...prev, [field]: value }
      if (field === 'title' && mode === 'new') {
        next.slug = slugify(value as string)
        if (!next.seo_title) next.seo_title = value as string
      }
      return next
    })
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setSaving(true)

    const supabase = createClient()
    const payload = {
      ...form,
      published_at: form.published ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    }

    let error
    if (mode === 'edit' && initialData?.id) {
      const result = await supabase.from('blog_posts').update(payload).eq('id', initialData.id)
      error = result.error
    } else {
      const result = await supabase.from('blog_posts').insert(payload)
      error = result.error
    }

    setSaving(false)
    if (error) {
      setError(error.message)
    } else {
      setSuccess(mode === 'edit' ? 'Post updated successfully.' : 'Post created successfully.')
      if (mode === 'new') {
        setTimeout(() => router.push('/admin/blog'), 800)
      }
    }
  }

  async function handleDelete() {
    if (!initialData?.id) return
    if (!confirm('Delete this post permanently? This cannot be undone.')) return
    setDeleting(true)
    const supabase = createClient()
    const { error } = await supabase.from('blog_posts').delete().eq('id', initialData.id)
    setDeleting(false)
    if (error) {
      setError(error.message)
    } else {
      router.push('/admin/blog')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6" aria-label={mode === 'edit' ? 'Edit blog post' : 'Create blog post'}>
      {error && (
        <div role="alert" className="bg-red-50 border border-red-200 rounded-sm px-4 py-3 font-sans text-sm text-red-700">
          {error}
        </div>
      )}
      {success && (
        <div role="status" className="bg-green-50 border border-green-200 rounded-sm px-4 py-3 font-sans text-sm text-green-700">
          {success}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left 2/3 */}
        <div className="md:col-span-2 flex flex-col gap-5">
          <div className="bg-white rounded-sm border border-[#E2E8F0] p-6 flex flex-col gap-5">
            <Field label="Title" required>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className={inputClass}
                placeholder="Enter post title..."
              />
            </Field>

            <Field label="Slug" required>
              <input
                type="text"
                required
                value={form.slug}
                onChange={(e) => handleChange('slug', e.target.value)}
                className={inputClass}
                placeholder="post-url-slug"
              />
            </Field>

            <Field label="Excerpt">
              <textarea
                value={form.excerpt}
                onChange={(e) => handleChange('excerpt', e.target.value)}
                rows={3}
                className={inputClass}
                placeholder="Brief summary shown in post cards and previews..."
              />
            </Field>

            <Field label="Body Content">
              <RichTextEditor
                value={form.body}
                onChange={(value) => handleChange('body', value)}
                placeholder="Write your post content here... Use formatting tools for bold, headings, lists, etc."
              />
            </Field>
          </div>

          {/* SEO */}
          <div className="bg-white rounded-sm border border-[#E2E8F0] p-6 flex flex-col gap-5">
            <h3 className="font-sans font-semibold text-sm text-[#1A202C]">SEO</h3>
            <Field label="SEO Title">
              <input
                type="text"
                value={form.seo_title}
                onChange={(e) => handleChange('seo_title', e.target.value)}
                className={inputClass}
                placeholder="Page &lt;title&gt; tag"
                maxLength={70}
              />
              <p className="font-sans text-xs text-[#4A5568] mt-1">{form.seo_title.length}/70 characters</p>
            </Field>
            <Field label="SEO Description">
              <textarea
                value={form.seo_description}
                onChange={(e) => handleChange('seo_description', e.target.value)}
                rows={2}
                className={inputClass}
                placeholder="Meta description for search engines"
                maxLength={160}
              />
              <p className="font-sans text-xs text-[#4A5568] mt-1">{form.seo_description.length}/160 characters</p>
            </Field>
          </div>
        </div>

        {/* Right 1/3 */}
        <div className="flex flex-col gap-5">
          {/* Publish */}
          <div className="bg-white rounded-sm border border-[#E2E8F0] p-6 flex flex-col gap-4">
            <h3 className="font-sans font-semibold text-sm text-[#1A202C]">Publish</h3>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => handleChange('published', e.target.checked)}
                className="w-4 h-4 accent-[#C9963A] cursor-pointer"
              />
              <span className="font-sans text-sm text-[#1A202C]">
                {form.published ? 'Published (Live)' : 'Draft'}
              </span>
            </label>
            <button
              type="submit"
              disabled={saving}
              className="w-full bg-[#C9963A] text-white font-sans font-semibold text-sm py-2.5 rounded-sm hover:bg-[#0A1628] transition-colors duration-150 disabled:opacity-60"
            >
              {saving ? 'Saving...' : mode === 'edit' ? 'Update Post' : 'Create Post'}
            </button>
            {mode === 'edit' && (
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="w-full border border-red-200 text-red-600 font-sans text-sm py-2 rounded-sm hover:bg-red-50 transition-colors duration-150 disabled:opacity-60"
              >
                {deleting ? 'Deleting...' : 'Delete Post'}
              </button>
            )}
          </div>

          {/* Meta */}
          <div className="bg-white rounded-sm border border-[#E2E8F0] p-6 flex flex-col gap-5">
            <h3 className="font-sans font-semibold text-sm text-[#1A202C]">Post Details</h3>
            <Field label="Category">
              <select
                value={form.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className={inputClass}
              >
                <option value="">Select category…</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
            <ImageUploader
              value={form.cover_image_url}
              onChange={(url) => handleChange('cover_image_url', url)}
              label="Cover Image"
            />
          </div>
        </div>
      </div>
    </form>
  )
}

const inputClass =
  'w-full border border-[#E2E8F0] rounded-sm px-3 py-2 font-sans text-sm text-[#1A202C] focus:outline-none focus:border-[#C9963A] transition-colors duration-150 bg-white'

function Field({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-sans text-xs font-semibold text-[#4A5568] uppercase tracking-wide">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  )
}
