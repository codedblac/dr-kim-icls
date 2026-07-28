'use client'

import { useState, FormEvent } from 'react'
import { X } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface ForgotPasswordModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ForgotPasswordModal({ isOpen, onClose }: ForgotPasswordModalProps) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const supabase = createClient()
      
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/admin/reset-password`,
      })

      if (resetError) {
        setError(resetError.message || 'Failed to send reset email')
        setLoading(false)
        return
      }

      setSuccess(true)
      setEmail('')
      setTimeout(() => {
        onClose()
        setSuccess(false)
      }, 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-sm p-6 w-full max-w-sm shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif font-bold text-[#0A1628] text-lg">Reset Password</h2>
          <button
            onClick={onClose}
            className="text-[#4A5568] hover:text-[#1A202C] transition-colors"
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        </div>

        <p className="font-sans text-sm text-[#4A5568] mb-4">
          Enter your email address and we&apos;ll send you a link to reset your password.
        </p>

        {success ? (
          <div className="bg-green-50 border border-green-200 rounded-sm px-4 py-3 text-center">
            <p className="font-sans text-sm text-green-700">
              Check your email for password reset instructions!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-sm px-4 py-3">
                <p className="font-sans text-sm text-red-700">{error}</p>
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label htmlFor="reset-email" className="font-sans text-xs font-semibold text-[#4A5568] uppercase tracking-wide">
                Email Address
              </label>
              <input
                id="reset-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="border border-[#E2E8F0] rounded-sm px-3 py-2.5 font-sans text-sm text-[#1A202C] focus:outline-none focus:border-[#C9963A] transition-colors"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 border border-[#E2E8F0] text-[#4A5568] font-sans font-semibold text-sm py-2.5 rounded-sm hover:bg-[#F9FAFB] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-[#C9963A] text-white font-sans font-semibold text-sm py-2.5 rounded-sm hover:bg-[#0A1628] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
