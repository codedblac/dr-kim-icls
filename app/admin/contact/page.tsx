import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { AdminShell } from '@/components/admin/admin-shell'

export default async function AdminContactPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const { data: submissions } = await supabase
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <AdminShell title="Contact Submissions">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        <div>
          <h2 className="font-serif font-bold text-[#0A1628] text-2xl tracking-[-0.02em]">Contact Submissions</h2>
          <p className="font-sans text-sm text-[#4A5568] mt-0.5">{submissions?.length ?? 0} total submissions</p>
        </div>

        <div className="flex flex-col gap-4">
          {submissions && submissions.length > 0 ? (
            submissions.map((s) => (
              <div key={s.id} className="bg-white rounded-sm border border-[#E2E8F0] p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <p className="font-sans font-semibold text-sm text-[#1A202C]">
                      {s.first_name} {s.last_name}
                    </p>
                    <a href={`mailto:${s.email}`} className="font-sans text-sm text-[#C9963A] hover:text-[#0A1628] transition-colors duration-150">
                      {s.email}
                    </a>
                    {s.phone && (
                      <p className="font-sans text-xs text-[#4A5568] mt-0.5">{s.phone}</p>
                    )}
                  </div>
                  <span className="font-sans text-xs text-[#4A5568] flex-shrink-0">
                    {new Date(s.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>

                {s.district && (
                  <p className="font-sans text-xs text-[#4A5568] mb-2">
                    <strong>District:</strong> {s.district}
                  </p>
                )}
                {s.reason && (
                  <p className="font-sans text-xs text-[#4A5568] mb-3">
                    <strong>Reason:</strong> {s.reason}
                  </p>
                )}
                {s.message && (
                  <div className="bg-[#F4F6F9] rounded-sm p-4 border-l-2 border-[#C9963A]">
                    <p className="font-sans text-sm text-[#1A202C] leading-relaxed whitespace-pre-wrap">
                      {s.message}
                    </p>
                  </div>
                )}

                <div className="mt-4 pt-4 border-t border-[#E2E8F0] flex gap-3">
                  <a
                    href={`mailto:${s.email}?subject=Re: Your inquiry to ICLS`}
                    className="font-sans text-xs font-semibold bg-[#C9963A] text-white px-4 py-2 rounded-sm hover:bg-[#0A1628] transition-colors duration-150"
                  >
                    Reply via Email
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-sm border border-[#E2E8F0] px-5 py-16 text-center font-sans text-sm text-[#4A5568]">
              No contact submissions yet.
            </div>
          )}
        </div>
      </div>
    </AdminShell>
  )
}
