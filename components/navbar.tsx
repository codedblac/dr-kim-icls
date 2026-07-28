'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/procurement', label: 'Procurement' },
  { href: '/blog', label: 'Blog' },
  { href: '/articles', label: 'Articles' },
  { href: '/contact', label: 'Contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on route change
  useEffect(() => setMobileOpen(false), [pathname])

  const isAdmin = pathname.startsWith('/admin')
  if (isAdmin) return null

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white shadow-[0_1px_8px_rgba(0,0,0,0.1)]'
          : 'bg-transparent'
      }`}
    >
      <nav
        className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Left-Anchored Gold Bar + ICLS Stacked Logo */}
        <Link
          href="/"
          className="flex items-stretch gap-3 group"
          aria-label="In Context Learning Solutions — Home"
        >
          {/* Bold Gold Bar (Left Anchor) */}
          <div 
            className="w-[3px] bg-[#C9963A] rounded-full transition-transform duration-150 group-hover:scale-y-105" 
            aria-hidden="true"
          />
          
          {/* Stacked Branding Details */}
          <div className="flex flex-col justify-center">
            <span
              className={`font-serif font-bold text-2xl tracking-wide leading-none transition-colors duration-150 ${
                scrolled ? 'text-[#0A1628]' : 'text-white'
              }`}
            >
              ICLS
            </span>
            
            {/* Elegant Divider Line */}
            <div 
              className={`h-[1px]  w-full my-1 transition-colors duration-150 ${
                scrolled ? 'bg-[#0A1628]/25' : 'bg-white/25'
              }`}
              aria-hidden="true"
            />

            <span
              className={`font-sans text-[8px] sm:text-[9px] font-semibold tracking-[0.12em] uppercase leading-none transition-colors duration-150 ${
                scrolled ? 'text-[#4A5568]' : 'text-[#F4F6F9]/80'
              }`}
            >
              In Context Learning Solutions, LLC
            </span>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-sans text-sm font-medium tracking-wide transition-colors duration-150 relative group ${
                pathname === link.href
                  ? 'text-[#C9963A]'
                  : scrolled
                  ? 'text-[#1A202C] hover:text-[#C9963A]'
                  : 'text-white/90 hover:text-[#C9963A]'
              }`}
            >
              {link.label}
              {pathname === link.href && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#C9963A]" />
              )}
            </Link>
          ))}
          <Link
            href="/contact"
            className="ml-2 bg-[#C9963A] text-white font-sans text-sm font-semibold px-5 py-2.5 rounded-sm hover:bg-[#F0C97A] hover:text-[#0A1628] transition-colors duration-150 whitespace-nowrap"
          >
            Book a Strategy Audit
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className={`lg:hidden p-2 rounded-sm transition-colors duration-150 ${
            scrolled ? 'text-[#0A1628]' : 'text-white'
          }`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`lg:hidden bg-[#0A1628] overflow-hidden transition-all duration-300 ${
          mobileOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
        aria-hidden={!mobileOpen}
      >
        <div className="px-6 py-6 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-sans text-base font-medium py-3 border-b border-white/10 transition-colors duration-150 ${
                pathname === link.href
                  ? 'text-[#C9963A]'
                  : 'text-white hover:text-[#C9963A]'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="mt-4 bg-[#C9963A] text-white font-sans text-sm font-semibold px-5 py-3 rounded-sm text-center hover:bg-[#F0C97A] hover:text-[#0A1628] transition-colors duration-150"
          >
            Book a Strategy Audit
          </Link>
        </div>
      </div>
    </header>
  )
}