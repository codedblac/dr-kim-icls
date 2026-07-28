import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { AdminShell } from '@/components/admin/admin-shell'
import { PlusCircle, Pencil } from 'lucide-react'

export default async function AdminTestimonialsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const { data: testimonials } = await supabase
    .from('testimonials')
    .select('id, author_name, author_role, author_district, quote, display, created_at')
    .order('created_at', { ascending: false })

  return (
    <AdminShell title="Testimonials">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif font-bold text-[#0A1628] text-2xl tracking-[-0.02em]">Testimonials</h2>
            <p className="font-sans text-sm text-[#4A5568] mt-0.5">{testimonials?.length ?? 0} total</p>
          </div>
          <Link
            href="/admin/testimonials/new"
            className="flex items-center gap-2 bg-[#C9963A] text-white font-sans text-sm font-semibold px-4 py-2.5 rounded-sm hover:bg-[#0A1628] transition-colors duration-150"
          >
            <PlusCircle size={15} aria-hidden="true" />
            Add Testimonial
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          {testimonials && testimonials.length > 0 ? (
            testimonials.map((t) => (
              <div key={t.id} className="bg-white rounded-sm border border-[#E2E8F0] p-6 flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="font-sans font-semibold text-sm text-[#1A202C]">{t.author_name}</p>
                    {t.display && (
                      <span className="font-sans text-[9px] font-bold uppercase tracking-wide bg-[#C9963A] text-white px-1.5 py-0.5 rounded-sm">
                        Displayed
                      </span>
                    )}
                  </div>
                  <p className="font-sans text-xs text-[#4A5568] mb-3">
                    {t.author_role}{t.author_district ? ` · ${t.author_district}` : ''}
                  </p>
                  <p className="font-sans text-sm text-[#4A5568] italic line-clamp-2">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
                <Link
                  href={`/admin/testimonials/${t.id}/edit`}
                  className="flex-shrink-0 inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-[#C9963A] hover:text-[#0A1628] transition-colors duration-150 px-3 py-1.5 border border-[#E2E8F0] hover:border-[#C9963A] rounded-sm"
                >
                  <Pencil size={11} aria-hidden="true" />
                  Edit
                </Link>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-sm border border-[#E2E8F0] px-5 py-16 text-center">
              <p className="font-sans text-sm text-[#4A5568] mb-4">No testimonials yet.</p>
              <Link href="/admin/testimonials/new" className="inline-flex items-center gap-2 bg-[#C9963A] text-white font-sans text-sm font-semibold px-4 py-2.5 rounded-sm hover:bg-[#0A1628] transition-colors duration-150">
                <PlusCircle size={15} />
                Add first testimonial
              </Link>
            </div>
          )}
        </div>
      </div>
    </AdminShell>
  )
}
