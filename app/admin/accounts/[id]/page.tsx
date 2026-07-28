'use client'

import { useRouter, useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import { EditAdminAccountForm } from '@/components/admin/edit-admin-account-form'

interface AdminUser {
  id: string
  email: string
  full_name: string | null
  role: string
  is_active: boolean
  created_at: string
}

export default function EditAdminAccountPage() {
  const router = useRouter()
  const params = useParams()
  const userId = params.id as string
  const [account, setAccount] = useState<AdminUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const supabase = createClient()
        
        const { data, error: fetchError } = await supabase
          .from('admin_users')
          .select('*')
          .eq('id', userId)
          .single()

        if (fetchError || !data) {
          setError('Account not found')
          setLoading(false)
          return
        }

        setAccount(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load account')
      } finally {
        setLoading(false)
      }
    }

    fetchAccount()
  }, [userId])

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-[#4A5568]">Loading...</p>
      </div>
    )
  }

  if (error || !account) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-sm px-4 py-3">
          <p className="font-sans text-sm text-red-700">{error || 'Account not found'}</p>
        </div>
        <button
          onClick={() => router.push('/admin/accounts')}
          className="mt-4 px-4 py-2 bg-[#C9963A] text-white font-sans text-sm rounded-sm hover:bg-[#0A1628] transition-colors"
        >
          Back to Accounts
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif font-bold text-[#1A202C] text-2xl">Edit Admin Account</h1>
        <p className="font-sans text-[#4A5568] text-sm mt-1">Update admin account details and permissions</p>
      </div>

      <EditAdminAccountForm account={account} />
    </div>
  )
}
