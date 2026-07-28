import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { SectionEyebrow } from '@/components/section-eyebrow'
import { ArrowLeft } from 'lucide-react'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data: post } = await supabase
    .from('blog_posts')
    .select('title, excerpt')
    .eq('slug', slug)
    .single()

  if (!post) return { title: 'Post Not Found | ICLS' }
  return {
    title: `${post.title} | In Context Learning Solutions`,
    description: post.excerpt ?? undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
    },
  }
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: post } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (!post) notFound()

  return (
    <>
      {/* HERO */}
      <section
        className="bg-[#0A1628] pt-32 pb-14 px-6 lg:px-8"
        aria-label={`Blog post: ${post.title}`}
      >
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="flex items-center gap-2 font-sans text-sm text-white/60 hover:text-[#C9963A] transition-colors duration-150 mb-6"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            Back to Blog
          </Link>
          {post.category && (
            <SectionEyebrow className="mb-3">{post.category}</SectionEyebrow>
          )}
          <h1 className="font-serif font-bold text-white text-3xl sm:text-4xl tracking-[-0.02em] leading-tight mb-4 text-balance">
            {post.title}
          </h1>
          <div className="flex items-center gap-3 mt-4">
            <div className="w-8 h-8 rounded-sm bg-[#C9963A]/20 flex items-center justify-center">
              <span className="font-sans text-xs font-bold text-[#C9963A]">KM</span>
            </div>
            <div>
              <p className="font-sans text-sm font-semibold text-white">Dr. Kimberly Miles, Ed.D.</p>
              <p className="font-sans text-xs text-white/50">
                {formatDate(post.published_at)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COVER IMAGE */}
      {post.cover_image_url && (
        <div className="bg-[#F4F6F9]">
          <div className="max-w-3xl mx-auto">
            <img
              src={post.cover_image_url}
              alt={`Cover image for ${post.title}`}
              className="w-full aspect-video object-cover"
            />
          </div>
        </div>
      )}

      {/* BODY */}
      <article className="bg-white py-16 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {post.body ? (
            <div className="prose-icls">
              <div
                dangerouslySetInnerHTML={{ __html: post.body }}
                className="font-sans text-base text-[#1A202C] leading-relaxed"
              />
            </div>
          ) : (
            <p className="font-sans text-base text-[#4A5568] leading-relaxed">
              {post.excerpt}
            </p>
          )}
        </div>
      </article>

      {/* BACK LINK */}
      <div className="bg-white pb-16 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto border-t border-[#E2E8F0] pt-8">
          <Link
            href="/blog"
            className="flex items-center gap-2 font-sans text-sm font-semibold text-[#C9963A] hover:text-[#0A1628] transition-colors duration-150"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            Back to all posts
          </Link>
        </div>
      </div>
    </>
  )
}
