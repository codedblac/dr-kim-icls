interface TestimonialCardProps {
  quote: string
  author_name: string
  author_role: string | null
  author_district: string | null
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(-2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

export function TestimonialCard({ quote, author_name, author_role, author_district }: TestimonialCardProps) {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-sm shadow-[0_1px_4px_rgba(0,0,0,0.08)] p-6 flex flex-col gap-4">
      {/* Gold quote mark */}
      <span className="font-serif text-5xl font-bold text-[#C9963A] leading-none select-none">&ldquo;</span>

      <blockquote className="font-sans text-sm text-[#1A202C] leading-relaxed flex-1 italic">
        {quote}
      </blockquote>

      <div className="flex items-center gap-3 pt-2 border-t border-[#E2E8F0]">
        {/* Initials avatar */}
        <div
          className="w-9 h-9 rounded-sm bg-[#0A1628] flex items-center justify-center flex-shrink-0"
          aria-hidden="true"
        >
          <span className="font-sans text-xs font-bold text-white">
            {getInitials(author_name)}
          </span>
        </div>
        <div>
          <p className="font-sans text-sm font-semibold text-[#0A1628]">{author_name}</p>
          {(author_role || author_district) && (
            <p className="font-sans text-xs text-[#4A5568]">
              {author_role}{author_role && author_district ? ', ' : ''}{author_district}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
