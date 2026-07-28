'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { ForgotPasswordModal } from '@/components/admin/forgot-password-modal'

export default function AdminLoginPage() {
  const router = useRouter()
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [email, setEmail] = useState('felixorina19@gmail.com')
  const [password, setPassword] = useState('444_Felix')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const supabase = createClient()
      
      if (mode === 'signup') {
        const { error: signUpError } = await supabase.auth.signUp({ 
          email, 
          password,
          options: {
            emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ?? `${window.location.origin}/auth/callback`
          }
        })
        if (signUpError) {
          setError(signUpError.message || 'Failed to create account.')
          setLoading(false)
          return
        }
        setError(null)
        setEmail('')
        setPassword('')
        setMode('signin')
        alert('Account created! Check your email to confirm, or sign in directly.')
      } else {
        const { error: signInError, data: authData } = await supabase.auth.signInWithPassword({ email, password })
        if (signInError) {
          setError('Invalid email or password.')
          setLoading(false)
          return
        }

        // Check if account is approved
        if (authData.user) {
          const { data: adminUser } = await supabase
            .from('admin_users')
            .select('is_approved')
            .eq('id', authData.user.id)
            .single()

          if (!adminUser?.is_approved) {
            await supabase.auth.signOut()
            setError('Your account is pending approval from an administrator.')
            setLoading(false)
            return
          }
        }

        router.push('/admin')
        router.refresh()
      }
    } catch {
      setError('An unexpected error occurred.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0A1628] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Brand */}
        <div className="text-center mb-10">
          <span className="font-serif font-bold text-white text-3xl tracking-tight">ICLS</span>
          <p className="font-sans text-[10px] tracking-[0.15em] uppercase text-[#C9963A] mt-1">
            Admin Portal
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-sm p-8 shadow-[0_8px_40px_rgba(0,0,0,0.3)] flex flex-col gap-5"
          aria-label={mode === 'signin' ? 'Admin login form' : 'Create admin account'}
        >
          <h1 className="font-serif font-bold text-[#0A1628] text-xl tracking-[-0.02em]">
            {mode === 'signin' ? 'Sign In' : 'Create Account'}
          </h1>

          {error && (
            <div
              role="alert"
              className="bg-red-50 border border-red-200 rounded-sm px-4 py-3 font-sans text-sm text-red-700"
            >
              {error}
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="font-sans text-xs font-semibold text-[#4A5568] uppercase tracking-wide">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-[#E2E8F0] rounded-sm px-3 py-2.5 font-sans text-sm text-[#1A202C] focus:outline-none focus:border-[#C9963A] transition-colors duration-150"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="font-sans text-xs font-semibold text-[#4A5568] uppercase tracking-wide">
                Password
              </label>
              {mode === 'signin' && (
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="font-sans text-xs text-[#C9963A] hover:text-[#0A1628] transition-colors"
                >
                  Forgot?
                </button>
              )}
            </div>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-[#E2E8F0] rounded-sm px-3 py-2.5 font-sans text-sm text-[#1A202C] focus:outline-none focus:border-[#C9963A] transition-colors duration-150"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-[#C9963A] text-white font-sans font-semibold text-sm py-3 rounded-sm hover:bg-[#0A1628] transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed mt-1"
          >
            {loading ? (mode === 'signin' ? 'Signing In...' : 'Creating Account...') : (mode === 'signin' ? 'Sign In' : 'Create Account')}
          </button>

          <div className="border-t border-[#E2E8F0] pt-4 mt-2">
            <button
              type="button"
              onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
              className="w-full font-sans text-sm text-[#C9963A] hover:text-[#0A1628] transition-colors duration-150"
            >
              {mode === 'signin' ? "Don't have an account? Create one" : 'Already have an account? Sign in'}
            </button>
          </div>
        </form>

        <p className="font-sans text-xs text-white/30 text-center mt-6">
          Authorized administrators only
        </p>
      </div>

      <ForgotPasswordModal 
        isOpen={showForgotPassword} 
        onClose={() => setShowForgotPassword(false)} 
      />
    </div>
  )
}
