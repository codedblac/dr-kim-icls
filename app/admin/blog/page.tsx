import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { AdminShell } from '@/components/admin/admin-shell'
import { PlusCircle, ExternalLink, Pencil } from 'lucide-react'

export default async function AdminBlogPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const { data: posts } = await supabase
    .from('blog_posts')
    .select('id, title, slug, category, published, published_at, created_at')
    .order('created_at', { ascending: false })

  return (
    <AdminShell title="Blog Posts">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif font-bold text-[#0A1628] text-2xl tracking-[-0.02em]">Blog Posts</h2>
            <p className="font-sans text-sm text-[#4A5568] mt-0.5">{posts?.length ?? 0} total posts</p>
          </div>
          <Link
            href="/admin/blog/new"
            className="flex items-center gap-2 bg-[#C9963A] text-white font-sans text-sm font-semibold px-4 py-2.5 rounded-sm hover:bg-[#0A1628] transition-colors duration-150"
          >
            <PlusCircle size={15} aria-hidden="true" />
            New Post
          </Link>
        </div>

        {/* Table */}
        <div className="bg-white rounded-sm border border-[#E2E8F0] overflow-hidden">
          {posts && posts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm" aria-label="Blog posts table">
                <thead>
                  <tr className="border-b border-[#E2E8F0] bg-[#F4F6F9]">
                    <th className="text-left font-sans font-semibold text-[#4A5568] text-xs uppercase tracking-wide px-5 py-3">Title</th>
                    <th className="text-left font-sans font-semibold text-[#4A5568] text-xs uppercase tracking-wide px-4 py-3 hidden sm:table-cell">Category</th>
                    <th className="text-left font-sans font-semibold text-[#4A5568] text-xs uppercase tracking-wide px-4 py-3 hidden md:table-cell">Published</th>
                    <th className="text-left font-sans font-semibold text-[#4A5568] text-xs uppercase tracking-wide px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right font-sans font-semibold text-[#4A5568] text-xs uppercase tracking-wide">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  {posts.map((post) => (
                    <tr key={post.id} className="hover:bg-[#F4F6F9]/50 transition-colors duration-100">
                      <td className="px-5 py-3.5">
                        <p className="font-sans text-sm text-[#1A202C] line-clamp-1 max-w-xs">{post.title}</p>
                        <p className="font-sans text-xs text-[#4A5568] mt-0.5">/blog/{post.slug}</p>
                      </td>
                      <td className="px-4 py-3.5 hidden sm:table-cell">
                        {post.category ? (
                          <span className="font-sans text-xs bg-[#C9963A]/10 text-[#C9963A] font-semibold px-2 py-0.5 rounded-sm">
                            {post.category}
                          </span>
                        ) : (
                          <span className="text-[#4A5568]">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3.5 hidden md:table-cell font-sans text-xs text-[#4A5568]">
                        {post.published_at
                          ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                          : '—'}
                      </td>
                      <td className="px-4 py-3.5">
                        <span className={`font-sans text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-sm ${
                          post.published ? 'bg-green-100 text-green-700' : 'bg-[#F4F6F9] text-[#4A5568]'
                        }`}>
                          {post.published ? 'Live' : 'Draft'}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/blog/${post.id}/edit`}
                            className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-[#C9963A] hover:text-[#0A1628] transition-colors duration-150 px-3 py-1.5 border border-[#E2E8F0] hover:border-[#C9963A] rounded-sm"
                          >
                            <Pencil size={11} aria-hidden="true" />
                            Edit
                          </Link>
                          <Link
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-sans text-xs text-[#4A5568] hover:text-[#C9963A] transition-colors duration-150"
                            aria-label={`View ${post.title} on site`}
                          >
                            <ExternalLink size={11} aria-hidden="true" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="px-5 py-16 text-center">
              <p className="font-sans text-sm text-[#4A5568] mb-4">No blog posts yet.</p>
              <Link
                href="/admin/blog/new"
                className="inline-flex items-center gap-2 bg-[#C9963A] text-white font-sans text-sm font-semibold px-4 py-2.5 rounded-sm hover:bg-[#0A1628] transition-colors duration-150"
              >
                <PlusCircle size={15} />
                Create your first post
              </Link>
            </div>
          )}
        </div>
      </div>
    </AdminShell>
  )
}
