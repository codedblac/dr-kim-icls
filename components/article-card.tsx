interface ArticleCardProps {
  title: string
  description: string | null
  category: string | null
  amazon_url: string | null
  file_url: string | null
  price: number | null
  is_free: boolean
  cover_image_url?: string | null
}

export function ArticleCard({
  title,
  description,
  category,
  amazon_url,
  file_url,
  price,
  is_free,
  cover_image_url,
}: ArticleCardProps) {
  const actionUrl = is_free ? file_url : amazon_url
  const actionLabel = is_free ? 'Download Free \u2192' : 'View on Amazon \u2192'

  return (
    <article className="bg-white border border-[#E2E8F0] rounded-sm shadow-[0_1px_4px_rgba(0,0,0,0.08)] overflow-hidden hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] transition-shadow duration-150 flex flex-col group">
      {/* Cover image - 3:4 aspect */}
      <div className="relative" style={{ paddingBottom: '133.33%' }}>
        <div className="absolute inset-0 bg-[#F4F6F9] overflow-hidden">
          {cover_image_url ? (
            <img
              src={cover_image_url}
              alt={`Cover for ${title}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-6">
              <span className="font-serif text-4xl font-bold text-[#0A1628]/20">ICLS</span>
              <span className="font-sans text-xs text-[#4A5568]/60 text-center leading-tight">{title}</span>
            </div>
          )}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1 gap-3">
        {category && (
          <span className="inline-block self-start font-sans text-[10px] font-semibold tracking-[0.1em] uppercase text-[#C9963A] bg-[#C9963A]/10 px-2.5 py-1 rounded-sm">
            {category}
          </span>
        )}

        <h2 className="font-serif font-bold text-[#0A1628] text-base leading-tight tracking-[-0.02em]">
          {title}
        </h2>

        {description && (
          <p className="font-sans text-sm text-[#4A5568] leading-relaxed line-clamp-2 flex-1">
            {description}
          </p>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-[#E2E8F0] mt-auto">
          {is_free ? (
            <span className="font-sans text-sm font-semibold text-[#C9963A]">Free</span>
          ) : price ? (
            <span className="font-sans text-sm font-semibold text-[#0A1628]">
              ${price.toFixed(2)}
            </span>
          ) : (
            <span />
          )}

          {actionUrl ? (
            <a
              href={actionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-xs font-semibold bg-[#C9963A] text-white px-4 py-2 rounded-sm hover:bg-[#0A1628] transition-colors duration-150"
            >
              {actionLabel}
            </a>
          ) : (
            <span className="font-sans text-xs text-[#4A5568]">Coming soon</span>
          )}
        </div>
      </div>
    </article>
  )
}
