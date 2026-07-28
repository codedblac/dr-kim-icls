import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { AdminShell } from '@/components/admin/admin-shell'
import { Plus, Trash2, Shield } from 'lucide-react'
import { AccountsList } from '@/components/admin/accounts-list'

export default async function AdminAccountsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  // TODO: Add proper admin role verification later
  // For now, all authenticated users can access accounts page

  // Fetch all admin accounts
  const { data: accounts } = await supabase
    .from('admin_users')
    .select('id, email, full_name, role, is_active, is_approved, approved_at, created_at')
    .order('created_at', { ascending: false })

  return (
    <AdminShell title="Admin Accounts">
      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif font-bold text-3xl text-[#0A1628] tracking-[-0.02em]">Admin Accounts</h1>
            <p className="font-sans text-sm text-[#4A5568] mt-1">Manage administrator access and permissions</p>
          </div>
          <Link
            href="/admin/accounts/new"
            className="flex items-center gap-2 bg-[#C9963A] text-white font-sans font-semibold text-sm px-4 py-2 rounded-sm hover:bg-[#0A1628] transition-colors"
          >
            <Plus size={18} />
            Add Admin Account
          </Link>
        </div>

        {/* Accounts List */}
        <div className="bg-white rounded-sm border border-[#E2E8F0] overflow-hidden">
          {accounts && accounts.length > 0 ? (
            <AccountsList accounts={accounts} />
          ) : (
            <div className="text-center py-12">
              <Shield size={48} className="mx-auto text-[#C9963A] mb-4" />
              <p className="font-sans text-[#4A5568]">No admin accounts yet</p>
            </div>
          )}
        </div>
      </div>
    </AdminShell>
  )
}
