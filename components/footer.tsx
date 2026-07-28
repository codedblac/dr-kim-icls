'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
// Social icons as inline SVGs (lucide-react v1.17 removed Linkedin/Twitter)

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/procurement', label: 'Procurement' },
  { href: '/blog', label: 'Blog' },
  { href: '/articles', label: 'Articles' },
  { href: '/contact', label: 'Contact' },
]

export function Footer() {
  const pathname = usePathname()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const isAdmin = pathname.startsWith('/admin')
  if (isAdmin) return null

  async function handleSubscribe(e: React.FormEvent) {
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

  return (
    <footer className="bg-[#0A1628] text-white" aria-label="Site footer">

  {/* Bottom bar */}
  <div className="border-t border-white/10">
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">

      <p className="font-sans text-xs text-white/40 text-center sm:text-left">
        © 2026 In Context Learning Solutions, LLC. All Rights Reserved.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-xs text-white/40 font-sans">

        <a
          href="mailto:info@incontextls.com"
          className="hover:text-white transition-colors"
        >
          info@incontextls.com
        </a>

        <span className="hidden sm:inline">•</span>

        <span>
          NAICS Code: 611710 — Educational Support Services
        </span>

        <span className="hidden sm:inline">•</span>

        <a
          href="https://linkedin.com/in/kmilesICLS"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors"
        >
          LinkedIn
        </a>

      </div>

    </div>
  </div>

</footer>
  )
}