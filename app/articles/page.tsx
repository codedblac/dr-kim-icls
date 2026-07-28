import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { SectionEyebrow } from '@/components/section-eyebrow'
import { ArticleCard } from '@/components/article-card'

export const metadata: Metadata = {
  title: 'Resources & Articles | In Context Learning Solutions',
  description:
    'Free and paid resources for Social Studies educators — frameworks, guides, and books by Dr. Kimberly Miles on disciplinary literacy and instructional rigor.',
  alternates: { canonical: 'https://incontextls.com/articles' },
}

export default async function ArticlesPage() {
  const supabase = await createClient()
  const { data: articles } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false })

  const free = articles?.filter((a) => a.is_free) ?? []
  const paid = articles?.filter((a) => !a.is_free) ?? []

  return (
    <>
      {/* HERO */}
      <section className="bg-[#0A1628] pt-32 pb-16 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <SectionEyebrow className="mb-3">Resources &amp; Publications</SectionEyebrow>
          <h1 className="font-serif font-bold text-white text-4xl sm:text-5xl tracking-[-0.02em] mb-4 text-balance">
            Tools to Transform Your Classroom
          </h1>
          <p className="font-sans text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl">
            From free downloadable frameworks to peer-reviewed publications and classroom-ready books — every ICLS resource is grounded in disciplinary literacy research.
          </p>
        </div>
      </section>

      {/* FREE RESOURCES */}
      <section className="bg-white py-16 px-6 lg:px-8" aria-label="Free resources">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="font-serif font-bold text-[#0A1628] text-2xl sm:text-3xl tracking-[-0.02em]">
              Free Downloads
            </h2>
            <p className="font-sans text-sm text-[#4A5568] mt-1">
              No strings attached. Designed for immediate classroom and department use.
            </p>
          </div>

          {free.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {free.map((a) => (
                <ArticleCard
                  key={a.id}
                  title={a.title}
                  description={a.description}
                  category={a.category}
                  amazon_url={a.amazon_url}
                  file_url={a.file_url}
                  price={a.price}
                  is_free={a.is_free}
                  cover_image_url={a.cover_image_url}
                />
              ))}
            </div>
          ) : (
            /* Placeholder card for "The Contextual Shift" */
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              <ArticleCard
                title="The Contextual Shift"
                description="5 high-yield strategies to integrate disciplinary literacy into your existing Social Studies pacing guide."
                category="Framework Guide"
                amazon_url={null}
                file_url={null}
                price={null}
                is_free={true}
                cover_image_url={null}
              />
            </div>
          )}
        </div>
      </section>

      {/* DIVIDER */}
      <div className="bg-[#F4F6F9] h-px mx-6 lg:mx-8" aria-hidden="true" />

      {/* PAID / AMAZON */}
      <section className="bg-[#F4F6F9] py-16 px-6 lg:px-8" aria-label="Books and paid resources">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="font-serif font-bold text-[#0A1628] text-2xl sm:text-3xl tracking-[-0.02em]">
              Books &amp; Publications
            </h2>
            <p className="font-sans text-sm text-[#4A5568] mt-1">
              Available on Amazon. Includes signed copies and bulk district orders.
            </p>
          </div>

          {paid.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {paid.map((a) => (
                <ArticleCard
                  key={a.id}
                  title={a.title}
                  description={a.description}
                  category={a.category}
                  amazon_url={a.amazon_url}
                  file_url={a.file_url}
                  price={a.price}
                  is_free={a.is_free}
                  cover_image_url={a.cover_image_url}
                />
              ))}
            </div>
          ) : (
            <p className="font-sans text-sm text-[#4A5568] py-8">
              Books and publications will be listed here as they become available.
            </p>
          )}
        </div>
      </section>

      {/* ARTICLE PUBLICATION CALLOUT */}
      <section className="bg-[#0A1628] py-16 px-6 lg:px-8" aria-label="Peer-reviewed article callout">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
          <div className="md:col-span-4">
            <span className="font-sans text-[10px] font-semibold tracking-[0.15em] uppercase text-[#C9963A] mb-3 block">
              Peer-Reviewed
            </span>
            <h3 className="font-serif font-bold text-white text-xl sm:text-2xl tracking-[-0.02em] leading-snug text-balance">
              &ldquo;Adolescent Literacy: Bridging Literacy Gaps in Georgia&rsquo;s Social Studies Classrooms&rdquo;
            </h3>
            <p className="font-sans text-sm text-white/60 mt-2">
              Teaching Social Studies in the Peach State &middot; Georgia Southern University
            </p>
          </div>
          <div className="md:col-span-1 flex md:justify-end">
            <a
              href="https://digitalcommons.georgiasouthern.edu/sspeach/vol4/iss1/5/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#C9963A] text-white font-sans font-semibold text-sm px-6 py-3 rounded-sm hover:bg-[#F0C97A] hover:text-[#0A1628] transition-colors duration-150 whitespace-nowrap"
            >
              Read Article &rarr;
            </a>
          </div>
        </div>
      </section>
    </>
  )
}