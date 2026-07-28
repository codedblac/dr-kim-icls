import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { AdminShell } from '@/components/admin/admin-shell'
import { ArticleForm } from '@/components/admin/article-form'
import { ArrowLeft } from 'lucide-react'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EditArticlePage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const { data: article } = await supabase
    .from('articles')
    .select('*')
    .eq('id', id)
    .single()

  if (!article) notFound()

  return (
    <AdminShell title="Edit Article">
      <div className="max-w-5xl mx-auto flex flex-col gap-5">
        <Link href="/admin/articles" className="flex items-center gap-2 font-sans text-sm text-[#4A5568] hover:text-[#C9963A] transition-colors duration-150 self-start">
          <ArrowLeft size={14} aria-hidden="true" />
          Back to Articles
        </Link>
        <h2 className="font-serif font-bold text-[#0A1628] text-2xl tracking-[-0.02em] line-clamp-1">
          Edit: {article.title}
        </h2>
        <ArticleForm mode="edit" initialData={{ ...article, price: article.price?.toString() ?? '' }} />
      </div>
    </AdminShell>
  )
}
