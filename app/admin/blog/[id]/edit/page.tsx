import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { AdminShell } from '@/components/admin/admin-shell'
import { BlogPostForm } from '@/components/admin/blog-post-form'
import { ArrowLeft } from 'lucide-react'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EditBlogPostPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const { data: post } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .single()

  if (!post) notFound()

  return (
    <AdminShell title="Edit Blog Post">
      <div className="max-w-5xl mx-auto flex flex-col gap-5">
        <Link
          href="/admin/blog"
          className="flex items-center gap-2 font-sans text-sm text-[#4A5568] hover:text-[#C9963A] transition-colors duration-150 self-start"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          Back to Blog Posts
        </Link>
        <h2 className="font-serif font-bold text-[#0A1628] text-2xl tracking-[-0.02em] line-clamp-1">
          Edit: {post.title}
        </h2>
        <BlogPostForm mode="edit" initialData={post} />
      </div>
    </AdminShell>
  )
}
