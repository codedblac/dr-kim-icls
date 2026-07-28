'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

interface AdminAccountFormProps {
  mode: 'create' | 'edit'
  initialEmail?: string
}

export function AdminAccountForm({ mode, initialEmail }: AdminAccountFormProps) {
  const router = useRouter()
  const [email, setEmail] = useState(initialEmail || '')
  const [fullName, setFullName] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'admin' | 'editor'>('editor')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      if (mode === 'create') {
        if (!password) {
          setError('Password is required')
          setLoading(false)
          return
        }

        const response = await fetch('/api/admin-accounts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            password,
            fullName,
            role,
          }),
        })

        const data = await response.json()

        if (!response.ok) {
          setError(data.error || 'Failed to create account')
          setLoading(false)
          return
        }

        setSuccess(true)
        setTimeout(() => {
          router.push('/admin/accounts')
          router.refresh()
        }, 1500)
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred')
      setLoading(false)
    }
  }

  const inputClass = 'w-full border border-[#E2E8F0] rounded-sm px-3 py-2 font-sans text-sm focus:outline-none focus:border-[#C9963A] focus:ring-1 focus:ring-[#C9963A]'
  const labelClass = 'font-sans font-semibold text-sm text-[#1A202C]'

  return (
    <div className="bg-white rounded-sm border border-[#E2E8F0] p-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-sm p-4">
            <p className="font-sans text-sm text-red-700">{error}</p>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 rounded-sm p-4">
            <p className="font-sans text-sm text-green-700">Admin account created successfully!</p>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className={labelClass}>
            Email Address *
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            placeholder="admin@example.com"
            disabled={loading || success}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="fullName" className={labelClass}>
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className={inputClass}
            placeholder="John Doe"
            disabled={loading || success}
          />
        </div>

        {mode === 'create' && (
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className={labelClass}>
              Password *
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
              placeholder="••••••••"
              disabled={loading || success}
            />
            <p className="font-sans text-xs text-[#4A5568]">Minimum 8 characters recommended</p>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <label htmlFor="role" className={labelClass}>
            Role *
          </label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value as 'admin' | 'editor')}
            className={`${inputClass} bg-white cursor-pointer`}
            disabled={loading || success}
          >
            <option value="editor">Editor (Can manage content)</option>
            <option value="admin">Admin (Full access including account management)</option>
          </select>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={loading || success}
            className="flex-1 bg-[#C9963A] text-white font-sans font-semibold text-sm py-2 rounded-sm hover:bg-[#0A1628] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Account...' : success ? 'Account Created!' : 'Create Admin Account'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 bg-[#F4F6F9] text-[#4A5568] font-sans font-semibold text-sm py-2 rounded-sm hover:bg-[#E2E8F0] transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
