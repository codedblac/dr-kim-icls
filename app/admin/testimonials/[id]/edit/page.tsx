import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { AdminShell } from '@/components/admin/admin-shell'
import { TestimonialForm } from '@/components/admin/testimonial-form'
import { ArrowLeft } from 'lucide-react'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EditTestimonialPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const { data: t } = await supabase.from('testimonials').select('*').eq('id', id).single()
  if (!t) notFound()

  return (
    <AdminShell title="Edit Testimonial">
      <div className="max-w-5xl mx-auto flex flex-col gap-5">
        <Link href="/admin/testimonials" className="flex items-center gap-2 font-sans text-sm text-[#4A5568] hover:text-[#C9963A] transition-colors duration-150 self-start">
          <ArrowLeft size={14} />
          Back to Testimonials
        </Link>
        <h2 className="font-serif font-bold text-[#0A1628] text-2xl tracking-[-0.02em]">Edit Testimonial</h2>
        <TestimonialForm mode="edit" initialData={t} />
      </div>
    </AdminShell>
  )
}
