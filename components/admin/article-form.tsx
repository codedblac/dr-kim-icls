'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { ImageUploader } from './image-uploader'

interface Article {
  id?: string
  title: string
  description: string
  cover_image_url: string
  category: string
  amazon_url: string
  file_url: string
  price: string
  is_free: boolean
  published: boolean
}

interface ArticleFormProps {
  initialData?: Article
  mode: 'new' | 'edit'
}

const CATEGORIES = ['Procurement', 'Leadership', 'Finance', 'Literacy', 'Law', 'Framework Guide']

export function ArticleForm({ initialData, mode }: ArticleFormProps) {
  const router = useRouter()
  const [form, setForm] = useState<Article>(
    initialData ?? {
      title: '',
      description: '',
      cover_image_url: '',
      category: '',
      amazon_url: '',
      file_url: '',
      price: '',
      is_free: false,
      published: true,
    }
  )
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  function handleChange(field: keyof Article, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setSaving(true)

    const supabase = createClient()
    const payload = {
      ...form,
      price: form.is_free ? 0 : form.price ? parseFloat(form.price) : null,
      updated_at: new Date().toISOString(),
    }

    let error
    if (mode === 'edit' && initialData?.id) {
      const r = await supabase.from('articles').update(payload).eq('id', initialData.id)
      error = r.error
    } else {
      const r = await supabase.from('articles').insert(payload)
      error = r.error
    }

    setSaving(false)
    if (error) {
      setError(error.message)
    } else {
      setSuccess(mode === 'edit' ? 'Article updated.' : 'Article created.')
      if (mode === 'new') setTimeout(() => router.push('/admin/articles'), 800)
    }
  }

  async function handleDelete() {
    if (!initialData?.id) return
    if (!confirm('Delete this article? This cannot be undone.')) return
    setDeleting(true)
    const supabase = createClient()
    const { error } = await supabase.from('articles').delete().eq('id', initialData.id)
    setDeleting(false)
    if (error) setError(error.message)
    else router.push('/admin/articles')
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6" aria-label={mode === 'edit' ? 'Edit article' : 'Create article'}>
      {error && <div role="alert" className="bg-red-50 border border-red-200 rounded-sm px-4 py-3 font-sans text-sm text-red-700">{error}</div>}
      {success && <div role="status" className="bg-green-50 border border-green-200 rounded-sm px-4 py-3 font-sans text-sm text-green-700">{success}</div>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded-sm border border-[#E2E8F0] p-6 flex flex-col gap-5">
          <Field label="Title" required>
            <input type="text" required value={form.title} onChange={(e) => handleChange('title', e.target.value)} className={inp} placeholder="Resource title..." />
          </Field>
          <Field label="Description">
            <textarea value={form.description} onChange={(e) => handleChange('description', e.target.value)} rows={4} className={inp} placeholder="Brief description..." />
          </Field>
          <Field label="Category">
            <select value={form.category} onChange={(e) => handleChange('category', e.target.value)} className={inp}>
              <option value="">Select category…</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Amazon URL">
            <input type="url" value={form.amazon_url} onChange={(e) => handleChange('amazon_url', e.target.value)} className={inp} placeholder="https://amazon.com/dp/..." />
          </Field>
          <Field label="Free Download URL">
            <input type="text" value={form.file_url} onChange={(e) => handleChange('file_url', e.target.value)} className={inp} placeholder="/files/guide.pdf or external URL" />
          </Field>
        </div>

        <div className="flex flex-col gap-5">
          <div className="bg-white rounded-sm border border-[#E2E8F0] p-6 flex flex-col gap-4">
            <h3 className="font-sans font-semibold text-sm text-[#1A202C]">Settings</h3>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={form.is_free} onChange={(e) => handleChange('is_free', e.target.checked)} className="w-4 h-4 accent-[#C9963A]" />
              <span className="font-sans text-sm text-[#1A202C]">Free resource</span>
            </label>
            {!form.is_free && (
              <Field label="Price ($)">
                <input type="number" step="0.01" min="0" value={form.price} onChange={(e) => handleChange('price', e.target.value)} className={inp} placeholder="29.99" />
              </Field>
            )}
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={form.published} onChange={(e) => handleChange('published', e.target.checked)} className="w-4 h-4 accent-[#C9963A]" />
              <span className="font-sans text-sm text-[#1A202C]">
                {form.published ? 'Visible on site' : 'Hidden'}
              </span>
            </label>
            <button type="submit" disabled={saving} className="w-full bg-[#C9963A] text-white font-sans font-semibold text-sm py-2.5 rounded-sm hover:bg-[#0A1628] transition-colors duration-150 disabled:opacity-60">
              {saving ? 'Saving...' : mode === 'edit' ? 'Update Article' : 'Create Article'}
            </button>
            {mode === 'edit' && (
              <button type="button" onClick={handleDelete} disabled={deleting} className="w-full border border-red-200 text-red-600 font-sans text-sm py-2 rounded-sm hover:bg-red-50 transition-colors duration-150 disabled:opacity-60">
                {deleting ? 'Deleting...' : 'Delete Article'}
              </button>
            )}
          </div>

          <div className="bg-white rounded-sm border border-[#E2E8F0] p-6">
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

const inp = 'w-full border border-[#E2E8F0] rounded-sm px-3 py-2 font-sans text-sm text-[#1A202C] focus:outline-none focus:border-[#C9963A] transition-colors duration-150 bg-white'

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
