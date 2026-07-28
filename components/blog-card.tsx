import Link from 'next/link'

interface BlogCardProps {
  title: string
  slug: string
  excerpt: string | null
  category: string | null
  published_at: string | null
  cover_image_url?: string | null
}

function estimateReadTime(excerpt: string | null): string {
  if (!excerpt) return '3 min read'
  const words = excerpt.split(' ').length
  const mins = Math.max(2, Math.ceil(words / 200))
  return `${mins} min read`
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export function BlogCard({ title, slug, excerpt, category, published_at, cover_image_url }: BlogCardProps) {
  return (
    <article className="bg-white border border-[#E2E8F0] rounded-sm shadow-[0_1px_4px_rgba(0,0,0,0.08)] overflow-hidden hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] transition-shadow duration-150 flex flex-col group">
      {/* Cover image */}
      <div className="aspect-video bg-[#F4F6F9] overflow-hidden">
        {cover_image_url ? (
          <img
            src={cover_image_url}
            alt={`Cover image for ${title}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-serif text-3xl font-bold text-[#0A1628]/20">ICLS</span>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1 gap-3">
        {/* Category pill */}
        {category && (
          <span className="inline-block self-start font-sans text-[10px] font-semibold tracking-[0.1em] uppercase text-[#C9963A] bg-[#C9963A]/10 px-2.5 py-1 rounded-sm">
            {category}
          </span>
        )}

        {/* Title */}
        <h2 className="font-serif font-bold text-[#0A1628] text-lg leading-tight tracking-[-0.02em] line-clamp-2">
          <Link
            href={`/blog/${slug}`}
            className="hover:text-[#C9963A] transition-colors duration-150"
          >
            {title}
          </Link>
        </h2>

        {/* Excerpt */}
        {excerpt && (
          <p className="font-sans text-sm text-[#4A5568] leading-relaxed line-clamp-2 flex-1">
            {excerpt}
          </p>
        )}

        {/* Meta */}
        <div className="flex items-center justify-between pt-2 border-t border-[#E2E8F0] mt-auto">
          <div>
            <p className="font-sans text-xs font-semibold text-[#1A202C]">Dr. Kimberly Miles</p>
            <p className="font-sans text-xs text-[#4A5568]">
              {formatDate(published_at)} &middot; {estimateReadTime(excerpt)}
            </p>
          </div>
          <Link
            href={`/blog/${slug}`}
            className="font-sans text-xs font-semibold text-[#C9963A] hover:text-[#0A1628] transition-colors duration-150"
            aria-label={`Read more about ${title}`}
          >
            Read More &rarr;
          </Link>
        </div>
      </div>
    </article>
  )
}
