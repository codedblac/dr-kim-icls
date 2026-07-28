'use client'

import { useState, FormEvent, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function ResetPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [isValidSession, setIsValidSession] = useState(false)

  useEffect(() => {
    const checkSession = async () => {
      const supabase = createClient()
      const { data } = await supabase.auth.getSession()
      
      if (data.session) {
        setIsValidSession(true)
      } else {
        setError('Session expired. Please request a new password reset link.')
        setTimeout(() => router.push('/admin/login'), 3000)
      }
    }

    checkSession()
  }, [router])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      setLoading(false)
      return
    }

    try {
      const supabase = createClient()
      
      const { error: updateError } = await supabase.auth.updateUser({
        password: password,
      })

      if (updateError) {
        setError(updateError.message || 'Failed to update password')
        setLoading(false)
        return
      }

      setSuccess(true)
      setTimeout(() => {
        router.push('/admin/login')
        router.refresh()
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setLoading(false)
    }
  }

  if (!isValidSession) {
    return (
      <div className="min-h-screen bg-[#0A1628] flex items-center justify-center px-4">
        <div className="w-full max-w-sm text-center">
          <p className="font-sans text-white mb-4">Checking session...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0A1628] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <span className="font-serif font-bold text-white text-3xl tracking-tight">ICLS</span>
          <p className="font-sans text-[10px] tracking-[0.15em] uppercase text-[#C9963A] mt-1">
            Admin Portal
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-sm p-8 shadow-[0_8px_40px_rgba(0,0,0,0.3)] flex flex-col gap-5"
          aria-label="Reset password form"
        >
          <h1 className="font-serif font-bold text-[#0A1628] text-xl tracking-[-0.02em]">
            Reset Password
          </h1>

          {success ? (
            <div className="bg-green-50 border border-green-200 rounded-sm px-4 py-3">
              <p className="font-sans text-sm text-green-700">
                Password updated successfully! Redirecting to login...
              </p>
            </div>
          ) : (
            <>
              {error && (
                <div
                  role="alert"
                  className="bg-red-50 border border-red-200 rounded-sm px-4 py-3 font-sans text-sm text-red-700"
                >
                  {error}
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label htmlFor="new-password" className="font-sans text-xs font-semibold text-[#4A5568] uppercase tracking-wide">
                  New Password
                </label>
                <input
                  id="new-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 8 characters"
                  className="border border-[#E2E8F0] rounded-sm px-3 py-2.5 font-sans text-sm text-[#1A202C] focus:outline-none focus:border-[#C9963A] transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="confirm-password" className="font-sans text-xs font-semibold text-[#4A5568] uppercase tracking-wide">
                  Confirm Password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your password"
                  className="border border-[#E2E8F0] rounded-sm px-3 py-2.5 font-sans text-sm text-[#1A202C] focus:outline-none focus:border-[#C9963A] transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-[#C9963A] text-white font-sans font-semibold text-sm py-3 rounded-sm hover:bg-[#0A1628] transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-1"
              >
                {loading ? 'Updating Password...' : 'Update Password'}
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  )
}
