'use client'

import { useState } from 'react'
import { Trash2, Shield, Edit, Check, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Account {
  id: string
  email: string
  full_name: string | null
  role: string
  is_active: boolean
  is_approved: boolean
  created_at: string
  approved_at?: string
}

interface AccountsListProps {
  accounts: Account[]
}

export function AccountsList({ accounts: initialAccounts }: AccountsListProps) {
  const router = useRouter()
  const [accounts, setAccounts] = useState(initialAccounts)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [processing, setProcessing] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleApproval(id: string, action: 'approve' | 'reject') {
    const actionText = action === 'approve' ? 'approve' : 'reject'
    if (!confirm(`Are you sure you want to ${actionText} this account?`)) {
      return
    }

    setProcessing(id)
    setError(null)

    try {
      const response = await fetch('/api/admin-accounts/approval', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: id, action }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || `Failed to ${actionText} account`)
        setProcessing(null)
        return
      }

      if (action === 'reject') {
        // Remove from list if rejected
        setAccounts(accounts.filter(acc => acc.id !== id))
      } else {
        // Update approval status if approved
        setAccounts(accounts.map(acc =>
          acc.id === id ? { ...acc, is_approved: true, approved_at: new Date().toISOString() } : acc
        ))
      }
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setProcessing(null)
    }
  }

  async function handleDelete(id: string, email: string) {
    if (!confirm(`Are you sure you want to delete ${email}? This action cannot be undone.`)) {
      return
    }

    setDeleting(id)
    setError(null)

    try {
      const response = await fetch('/api/admin-accounts', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: id }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to delete account')
        setDeleting(null)
        return
      }

      // Update local state
      setAccounts(accounts.filter(acc => acc.id !== id))
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setDeleting(null)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div>
      {error && (
        <div className="bg-red-50 border-b border-red-200 p-4">
          <p className="font-sans text-sm text-red-700">{error}</p>
        </div>
      )}

      <div className="divide-y divide-[#E2E8F0]">
        {accounts.length === 0 ? (
          <div className="text-center py-12">
            <p className="font-sans text-[#4A5568]">No admin accounts</p>
          </div>
        ) : (
          accounts.map((account) => (
            <div
              key={account.id}
              className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 hover:bg-[#F9FAFB] transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <p className="font-sans font-semibold text-sm text-[#1A202C] truncate">{account.email}</p>
                  {account.role === 'admin' && (
                    <span className="flex items-center gap-1 bg-[#C9963A]/10 text-[#C9963A] px-2 py-1 rounded text-xs font-semibold">
                      <Shield size={12} />
                      Admin
                    </span>
                  )}
                  {account.role === 'editor' && (
                    <span className="bg-[#E2E8F0] text-[#4A5568] px-2 py-1 rounded text-xs font-semibold">
                      Editor
                    </span>
                  )}
                  {!account.is_active && (
                    <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded text-xs font-semibold">
                      Inactive
                    </span>
                  )}
                  {!account.is_approved && (
                    <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-semibold">
                      Pending Approval
                    </span>
                  )}
                  {account.is_approved && (
                    <span className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold">
                      <Check size={12} />
                      Approved
                    </span>
                  )}
                </div>
                {account.full_name && (
                  <p className="font-sans text-xs text-[#4A5568] mb-2">{account.full_name}</p>
                )}
                <p className="font-sans text-xs text-[#999]">
                  Created {formatDate(account.created_at)}
                </p>
              </div>

              <div className="flex gap-2 self-start sm:self-center flex-wrap">
                {!account.is_approved && (
                  <>
                    <button
                      onClick={() => handleApproval(account.id, 'approve')}
                      disabled={processing === account.id}
                      className="px-3 py-2 rounded text-green-600 hover:bg-green-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      title="Approve account"
                    >
                      <Check size={16} />
                      {processing === account.id ? (
                        <span className="text-xs font-semibold">Approving...</span>
                      ) : (
                        <span className="text-xs font-semibold">Approve</span>
                      )}
                    </button>

                    <button
                      onClick={() => handleApproval(account.id, 'reject')}
                      disabled={processing === account.id}
                      className="px-3 py-2 rounded text-orange-600 hover:bg-orange-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      title="Reject account"
                    >
                      <X size={16} />
                      {processing === account.id ? (
                        <span className="text-xs font-semibold">Rejecting...</span>
                      ) : (
                        <span className="text-xs font-semibold">Reject</span>
                      )}
                    </button>
                  </>
                )}

                {account.is_approved && (
                  <Link
                    href={`/admin/accounts/${account.id}`}
                    className="px-3 py-2 rounded text-[#C9963A] hover:bg-[#C9963A]/10 transition-colors flex items-center gap-2"
                    title="Edit account"
                  >
                    <Edit size={16} />
                    <span className="text-xs font-semibold">Edit</span>
                  </Link>
                )}

                <button
                  onClick={() => handleDelete(account.id, account.email)}
                  disabled={deleting === account.id}
                  className="px-3 py-2 rounded text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  title="Delete account"
                >
                  <Trash2 size={16} />
                  {deleting === account.id ? (
                    <span className="text-xs font-semibold">Deleting...</span>
                  ) : (
                    <span className="text-xs font-semibold">Delete</span>
                  )}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
