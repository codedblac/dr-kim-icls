import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { AdminShell } from '@/components/admin/admin-shell'

export default async function AdminSubscribersPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const { data: subscribers } = await supabase
    .from('subscribers')
    .select('id, email, created_at')
    .order('created_at', { ascending: false })

  return (
    <AdminShell title="Subscribers">
      <div className="max-w-3xl mx-auto flex flex-col gap-6">
        <div>
          <h2 className="font-serif font-bold text-[#0A1628] text-2xl tracking-[-0.02em]">
            ICLS Educator Digest
          </h2>
          <p className="font-sans text-sm text-[#4A5568] mt-0.5">
            {subscribers?.length ?? 0} subscriber{subscribers?.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="bg-white rounded-sm border border-[#E2E8F0] overflow-hidden">
          {subscribers && subscribers.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm" aria-label="Subscribers table">
                <thead>
                  <tr className="border-b border-[#E2E8F0] bg-[#F4F6F9]">
                    <th className="text-left font-sans font-semibold text-[#4A5568] text-xs uppercase tracking-wide px-5 py-3">Email</th>
                    <th className="text-left font-sans font-semibold text-[#4A5568] text-xs uppercase tracking-wide px-4 py-3">Subscribed</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  {subscribers.map((s) => (
                    <tr key={s.id} className="hover:bg-[#F4F6F9]/50 transition-colors duration-100">
                      <td className="px-5 py-3 font-sans text-sm text-[#1A202C]">{s.email}</td>
                      <td className="px-4 py-3 font-sans text-xs text-[#4A5568]">
                        {new Date(s.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="px-5 py-16 text-center font-sans text-sm text-[#4A5568]">
              No subscribers yet. The newsletter sign-up is live in the footer.
            </div>
          )}
        </div>
      </div>
    </AdminShell>
  )
}
