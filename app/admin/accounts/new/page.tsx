import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { AdminShell } from '@/components/admin/admin-shell'
import { AdminAccountForm } from '@/components/admin/admin-account-form'

export default async function NewAdminAccountPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  // TODO: Add proper admin role verification later
  // For now, all authenticated users can create admin accounts

  return (
    <AdminShell title="Create Admin Account">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="font-serif font-bold text-3xl text-[#0A1628] tracking-[-0.02em]">Create Admin Account</h1>
          <p className="font-sans text-sm text-[#4A5568] mt-1">Add a new administrator to your team</p>
        </div>
        <AdminAccountForm mode="create" />
      </div>
    </AdminShell>
  )
}
