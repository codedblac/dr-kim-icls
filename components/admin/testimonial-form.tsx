'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface Testimonial {
  id?: string
  author_name: string
  author_role: string
  author_district: string
  quote: string
  display: boolean
}

interface TestimonialFormProps {
  initialData?: Testimonial
  mode: 'new' | 'edit'
}

export function TestimonialForm({ initialData, mode }: TestimonialFormProps) {
  const router = useRouter()
  const [form, setForm] = useState<Testimonial>(
    initialData ?? { author_name: '', author_role: '', author_district: '', quote: '', display: true }
  )
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  function handleChange(field: keyof Testimonial, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null); setSuccess(null); setSaving(true)
    const supabase = createClient()
    let error
    if (mode === 'edit' && initialData?.id) {
      const r = await supabase.from('testimonials').update(form).eq('id', initialData.id)
      error = r.error
    } else {
      const r = await supabase.from('testimonials').insert(form)
      error = r.error
    }
    setSaving(false)
    if (error) setError(error.message)
    else {
      setSuccess(mode === 'edit' ? 'Testimonial updated.' : 'Testimonial added.')
      if (mode === 'new') setTimeout(() => router.push('/admin/testimonials'), 800)
    }
  }

  async function handleDelete() {
    if (!initialData?.id) return
    if (!confirm('Delete this testimonial?')) return
    setDeleting(true)
    const supabase = createClient()
    const { error } = await supabase.from('testimonials').delete().eq('id', initialData.id)
    setDeleting(false)
    if (error) setError(error.message)
    else router.push('/admin/testimonials')
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-sm border border-[#E2E8F0] p-6 flex flex-col gap-5 max-w-xl">
      {error && <div role="alert" className="bg-red-50 border border-red-200 rounded-sm px-4 py-3 font-sans text-sm text-red-700">{error}</div>}
      {success && <div role="status" className="bg-green-50 border border-green-200 rounded-sm px-4 py-3 font-sans text-sm text-green-700">{success}</div>}

      <Field label="Name" required>
        <input type="text" required value={form.author_name} onChange={(e) => handleChange('author_name', e.target.value)} className={inp} placeholder="Jane Smith" />
      </Field>
      <Field label="Role / Title" required>
        <input type="text" required value={form.author_role} onChange={(e) => handleChange('author_role', e.target.value)} className={inp} placeholder="Department Chair" />
      </Field>
      <Field label="School / District">
        <input type="text" value={form.author_district} onChange={(e) => handleChange('author_district', e.target.value)} className={inp} placeholder="Fulton County Schools" />
      </Field>
      <Field label="Quote" required>
        <textarea required value={form.quote} onChange={(e) => handleChange('quote', e.target.value)} rows={5} className={inp} placeholder="Dr. Miles transformed how our team thinks about literacy..." />
      </Field>
      <label className="flex items-center gap-3 cursor-pointer">
        <input type="checkbox" checked={form.display} onChange={(e) => handleChange('display', e.target.checked)} className="w-4 h-4 accent-[#C9963A]" />
        <span className="font-sans text-sm text-[#1A202C]">Display on homepage</span>
      </label>

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={saving} className="bg-[#C9963A] text-white font-sans font-semibold text-sm px-6 py-2.5 rounded-sm hover:bg-[#0A1628] transition-colors duration-150 disabled:opacity-60">
          {saving ? 'Saving...' : mode === 'edit' ? 'Update' : 'Add Testimonial'}
        </button>
        {mode === 'edit' && (
          <button type="button" onClick={handleDelete} disabled={deleting} className="border border-red-200 text-red-600 font-sans text-sm px-5 py-2 rounded-sm hover:bg-red-50 transition-colors duration-150 disabled:opacity-60">
            {deleting ? 'Deleting...' : 'Delete'}
          </button>
        )}
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
