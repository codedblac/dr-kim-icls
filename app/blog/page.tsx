import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { SectionEyebrow } from '@/components/section-eyebrow'
import { BlogCard } from '@/components/blog-card'

export const metadata: Metadata = {
  title: 'Blog | In Context Learning Solutions',
  description:
    'Insights on Social Studies instruction, disciplinary literacy, and K-12 professional development from Dr. Kimberly Miles.',
  alternates: { canonical: 'https://incontextls.com/blog' },
}

export default async function BlogPage() {
  const supabase = await createClient()
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('id, title, slug, excerpt, category, published_at, cover_image_url')
    .eq('published', true)
    .order('published_at', { ascending: false })

  return (
    <>
      {/* HERO */}
      <section className="bg-[#0A1628] pt-32 pb-16 px-6 lg:px-8" aria-label="Blog hero">
        <div className="max-w-4xl mx-auto">
          <SectionEyebrow className="mb-3">The ICLS Blog</SectionEyebrow>
          <h1 className="font-serif font-bold text-white text-4xl sm:text-5xl tracking-[-0.02em] mb-4 text-balance">
            Ideas That Move Social Studies Forward
          </h1>
          <p className="font-sans text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl">
            Practical frameworks, commentary, and research-backed strategies for secondary Social Studies educators and instructional leaders.
          </p>
        </div>
      </section>

      {/* POST GRID */}
      <section className="bg-white py-16 px-6 lg:px-8" aria-label="Blog posts">
        <div className="max-w-6xl mx-auto">
          {posts && posts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <BlogCard
                  key={post.id}
                  title={post.title}
                  slug={post.slug}
                  excerpt={post.excerpt}
                  category={post.category}
                  published_at={post.published_at}
                  cover_image_url={post.cover_image_url}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <span className="font-serif text-6xl font-bold text-[#0A1628]/10 select-none">ICLS</span>
              <p className="font-sans text-[#4A5568] mt-6">
                Blog posts are coming soon. Subscribe to the ICLS Educator Digest to be notified when content goes live.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}