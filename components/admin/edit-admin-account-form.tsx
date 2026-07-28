'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

interface AdminUser {
  id: string
  email: string
  full_name: string | null
  role: string
  is_active: boolean
  created_at: string
}

interface EditAdminAccountFormProps {
  account: AdminUser
}

export function EditAdminAccountForm({ account }: EditAdminAccountFormProps) {
  const router = useRouter()
  const [fullName, setFullName] = useState(account.full_name || '')
  const [role, setRole] = useState(account.role)
  const [isActive, setIsActive] = useState(account.is_active)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const response = await fetch('/api/admin-accounts/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: account.id,
          fullName,
          role,
          isActive,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to update account')
        setLoading(false)
        return
      }

      setSuccess(true)
      setTimeout(() => {
        router.push('/admin/accounts')
        router.refresh()
      }, 1500)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setLoading(false)
    }
  }

  const inputClass = 'border border-[#E2E8F0] rounded-sm px-3 py-2.5 font-sans text-sm text-[#1A202C] focus:outline-none focus:border-[#C9963A] transition-colors'

  return (
    <div className="bg-white rounded-sm border border-[#E2E8F0] p-6 flex flex-col gap-5">
      {success && (
        <div className="bg-green-50 border border-green-200 rounded-sm px-4 py-3">
          <p className="font-sans text-sm text-green-700">Account updated successfully!</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-sm px-4 py-3">
          <p className="font-sans text-sm text-red-700">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="font-sans text-xs font-semibold text-[#4A5568] uppercase tracking-wide">
            Email Address
          </label>
          <input
            type="email"
            value={account.email}
            disabled
            className="border border-[#E2E8F0] rounded-sm px-3 py-2.5 font-sans text-sm text-[#999] bg-[#F9FAFB]"
          />
          <p className="font-sans text-xs text-[#999]">Email cannot be changed</p>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="full-name" className="font-sans text-xs font-semibold text-[#4A5568] uppercase tracking-wide">
            Full Name
          </label>
          <input
            id="full-name"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="John Doe"
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="role" className="font-sans text-xs font-semibold text-[#4A5568] uppercase tracking-wide">
            Role
          </label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value as 'admin' | 'editor')}
            className={inputClass}
          >
            <option value="editor">Editor (Can manage content)</option>
            <option value="admin">Admin (Can manage all + accounts)</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
          <input
            id="is-active"
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="w-4 h-4 cursor-pointer"
          />
          <label htmlFor="is-active" className="font-sans text-sm text-[#1A202C] cursor-pointer">
            Account is active
          </label>
        </div>

        <div className="bg-[#F9FAFB] rounded-sm p-4">
          <p className="font-sans text-xs font-semibold text-[#4A5568] uppercase tracking-wide mb-2">
            Account Info
          </p>
          <p className="font-sans text-xs text-[#999]">
            Created: {new Date(account.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </p>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={() => router.push('/admin/accounts')}
            className="flex-1 border border-[#E2E8F0] text-[#4A5568] font-sans font-semibold text-sm py-3 rounded-sm hover:bg-[#F9FAFB] transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-[#C9963A] text-white font-sans font-semibold text-sm py-3 rounded-sm hover:bg-[#0A1628] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Updating...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  )
}
