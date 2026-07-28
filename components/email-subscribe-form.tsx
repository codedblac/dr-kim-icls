'use client'

import { useState } from 'react'

export function EmailSubscribeForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center">
        <p className="font-sans text-base font-semibold text-[#C9963A] mb-1">
          You&apos;re on the list!
        </p>
        <p className="font-sans text-sm text-[#4A5568]">
          Welcome to the ICLS Educator Digest. Check your inbox for a confirmation.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your.work@district.edu"
          required
          className="flex-1 border border-[#E2E8F0] text-[#1A202C] placeholder:text-[#4A5568]/60 font-sans text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-[#C9963A] transition-colors duration-150 bg-white"
          aria-label="Email address"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="bg-[#C9963A] text-white font-sans text-sm font-semibold px-6 py-3 rounded-sm hover:bg-[#0A1628] transition-colors duration-150 disabled:opacity-60 whitespace-nowrap"
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </button>
      </div>
      {status === 'error' && (
        <p className="text-red-500 text-xs mt-2 text-center">
          Something went wrong. Please try again.
        </p>
      )}
      <p className="font-sans text-xs text-[#4A5568] text-center mt-3">
        No spam. Unsubscribe anytime. For educational leaders only.
      </p>
    </form>
  )
}
