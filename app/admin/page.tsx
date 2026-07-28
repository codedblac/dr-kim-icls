import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { AdminShell } from '@/components/admin/admin-shell'
import { FileText, BookOpen, Users, Mail, Calendar, ArrowRight } from 'lucide-react'

export default async function AdminDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  // Fetch counts in parallel
  const [
    { count: postCount },
    { count: articleCount },
    { count: testimonialCount },
    { count: subscriberCount },
    { count: contactCount },
  ] = await Promise.all([
    supabase.from('blog_posts').select('*', { count: 'exact', head: true }),
    supabase.from('articles').select('*', { count: 'exact', head: true }),
    supabase.from('testimonials').select('*', { count: 'exact', head: true }),
    supabase.from('subscribers').select('*', { count: 'exact', head: true }),
    supabase.from('contact_submissions').select('*', { count: 'exact', head: true }),
  ])

  // Recent activity
  const { data: recentPosts } = await supabase
    .from('blog_posts')
    .select('id, title, slug, published, published_at')
    .order('created_at', { ascending: false })
    .limit(5)

  const { data: recentContacts } = await supabase
    .from('contact_submissions')
    .select('id, first_name, last_name, email, created_at')
    .order('created_at', { ascending: false })
    .limit(5)

  const stats = [
    { label: 'Blog Posts', count: postCount ?? 0, icon: FileText, href: '/admin/blog', color: 'text-[#0A1628]' },
    { label: 'Articles', count: articleCount ?? 0, icon: BookOpen, href: '/admin/articles', color: 'text-[#0A1628]' },
    { label: 'Testimonials', count: testimonialCount ?? 0, icon: Users, href: '/admin/testimonials', color: 'text-[#0A1628]' },
    { label: 'Subscribers', count: subscriberCount ?? 0, icon: Mail, href: '/admin/subscribers', color: 'text-[#C9963A]' },
    { label: 'Contact Forms', count: contactCount ?? 0, icon: Calendar, href: '/admin/contact', color: 'text-[#0A1628]' },
  ]

  return (
    <AdminShell title="Dashboard">
      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        {/* Welcome banner */}
        <div className="bg-[#0A1628] rounded-sm p-6 text-white">
          <p className="font-sans text-xs tracking-[0.12em] uppercase text-[#C9963A] mb-1">Welcome back</p>
          <h2 className="font-serif font-bold text-xl tracking-[-0.02em]">
            ICLS Admin Portal
          </h2>
          <p className="font-sans text-sm text-white/60 mt-1">{user.email}</p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {stats.map(({ label, count, icon: Icon, href, color }) => (
            <Link
              key={label}
              href={href}
              className="bg-white rounded-sm border border-[#E2E8F0] p-5 flex flex-col gap-2 hover:border-[#C9963A] hover:shadow-[0_2px_12px_rgba(201,150,58,0.12)] transition-all duration-150"
            >
              <Icon size={18} className={color} aria-hidden="true" />
              <p className="font-sans text-2xl font-bold text-[#1A202C]">{count}</p>
              <p className="font-sans text-xs text-[#4A5568]">{label}</p>
            </Link>
          ))}
        </div>

        {/* Two-col layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recent blog posts */}
          <div className="bg-white rounded-sm border border-[#E2E8F0] overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E8F0]">
              <h3 className="font-sans font-semibold text-sm text-[#1A202C]">Recent Blog Posts</h3>
              <Link href="/admin/blog" className="font-sans text-xs text-[#C9963A] hover:text-[#0A1628] flex items-center gap-1 transition-colors duration-150">
                View all <ArrowRight size={11} aria-hidden="true" />
              </Link>
            </div>
            <ul className="divide-y divide-[#E2E8F0]">
              {recentPosts && recentPosts.length > 0 ? (
                recentPosts.map((post) => (
                  <li key={post.id} className="px-5 py-3 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-sans text-sm text-[#1A202C] truncate">{post.title}</p>
                      <p className="font-sans text-xs text-[#4A5568]">
                        {post.published_at ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
                      </p>
                    </div>
                    <span className={`flex-shrink-0 font-sans text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-sm ${
                      post.published ? 'bg-green-100 text-green-700' : 'bg-[#F4F6F9] text-[#4A5568]'
                    }`}>
                      {post.published ? 'Live' : 'Draft'}
                    </span>
                  </li>
                ))
              ) : (
                <li className="px-5 py-8 text-center font-sans text-sm text-[#4A5568]">
                  No blog posts yet.
                </li>
              )}
            </ul>
          </div>

          {/* Recent contact submissions */}
          <div className="bg-white rounded-sm border border-[#E2E8F0] overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E8F0]">
              <h3 className="font-sans font-semibold text-sm text-[#1A202C]">Recent Contact Forms</h3>
              <Link href="/admin/contact" className="font-sans text-xs text-[#C9963A] hover:text-[#0A1628] flex items-center gap-1 transition-colors duration-150">
                View all <ArrowRight size={11} aria-hidden="true" />
              </Link>
            </div>
            <ul className="divide-y divide-[#E2E8F0]">
              {recentContacts && recentContacts.length > 0 ? (
                recentContacts.map((c) => (
                  <li key={c.id} className="px-5 py-3">
                    <p className="font-sans text-sm text-[#1A202C]">
                      {c.first_name} {c.last_name}
                    </p>
                    <p className="font-sans text-xs text-[#4A5568]">{c.email}</p>
                    <p className="font-sans text-xs text-[#4A5568]">
                      {new Date(c.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </li>
                ))
              ) : (
                <li className="px-5 py-8 text-center font-sans text-sm text-[#4A5568]">
                  No contact submissions yet.
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Quick actions */}
        <div className="bg-white rounded-sm border border-[#E2E8F0] p-6">
          <h3 className="font-sans font-semibold text-sm text-[#1A202C] mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/admin/blog/new" className="bg-[#C9963A] text-white font-sans text-sm font-semibold px-4 py-2 rounded-sm hover:bg-[#0A1628] transition-colors duration-150">
              + New Blog Post
            </Link>
            <Link href="/admin/articles/new" className="bg-[#0A1628] text-white font-sans text-sm font-semibold px-4 py-2 rounded-sm hover:bg-[#122244] transition-colors duration-150">
              + New Article
            </Link>
            <Link href="/admin/testimonials/new" className="border border-[#E2E8F0] text-[#1A202C] font-sans text-sm font-semibold px-4 py-2 rounded-sm hover:border-[#C9963A] transition-colors duration-150">
              + New Testimonial
            </Link>
          </div>
        </div>
      </div>
    </AdminShell>
  )
}
