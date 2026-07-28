'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  FileText,
  BookOpen,
  Users,
  Mail,
  Calendar,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Lock,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/blog', label: 'Blog Posts', icon: FileText },
  { href: '/admin/articles', label: 'Articles', icon: BookOpen },
  { href: '/admin/testimonials', label: 'Testimonials', icon: Users },
  { href: '/admin/subscribers', label: 'Subscribers', icon: Mail },
  { href: '/admin/contact', label: 'Contact Submissions', icon: Calendar },
  { href: '/admin/accounts', label: 'Admin Accounts', icon: Lock },
]

interface AdminShellProps {
  children: React.ReactNode
  title: string
}

export function AdminShell({ children, title }: AdminShellProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  const isActive = (item: (typeof navItems)[0]) => {
    if (item.exact) return pathname === item.href
    return pathname.startsWith(item.href)
  }

  return (
    <div className="min-h-screen bg-[#F4F6F9] flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-60 bg-[#0A1628] flex flex-col transition-transform duration-200 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:flex`}
        aria-label="Admin navigation"
      >
        {/* Brand */}
        <div className="flex items-center justify-between h-16 px-5 border-b border-white/10">
          <Link href="/" className="flex flex-col leading-none" aria-label="ICLS — Go to site">
            <span className="font-serif font-bold text-white text-lg">ICLS</span>
            <span className="font-sans text-[9px] tracking-[0.12em] uppercase text-[#C9963A]">Admin</span>
          </Link>
          <button
            className="lg:hidden text-white/60 hover:text-white"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 py-5 px-3 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item)
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-sm font-sans text-sm transition-colors duration-150 ${
                  active
                    ? 'bg-[#C9963A]/20 text-[#C9963A] font-semibold'
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon size={16} aria-hidden="true" />
                {item.label}
                {active && <ChevronRight size={12} className="ml-auto" aria-hidden="true" />}
              </Link>
            )
          })}
        </nav>

        {/* Sign out */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-3 px-3 py-2.5 rounded-sm font-sans text-sm text-white/60 hover:text-red-400 hover:bg-red-400/10 transition-colors duration-150"
          >
            <LogOut size={16} aria-hidden="true" />
            Sign Out
          </button>
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 rounded-sm font-sans text-sm text-white/40 hover:text-white/70 transition-colors duration-150 mt-0.5"
          >
            <span className="text-xs">&#8599;</span>
            View Site
          </Link>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-[#E2E8F0] flex items-center gap-4 px-5 lg:px-8">
          <button
            className="lg:hidden text-[#4A5568] hover:text-[#0A1628]"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <Menu size={20} />
          </button>
          <h1 className="font-sans font-semibold text-[#1A202C] text-base">{title}</h1>
        </header>

        {/* Page content */}
        <main className="flex-1 p-5 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
