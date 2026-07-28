interface SectionEyebrowProps {
  children: React.ReactNode
  className?: string
}

export function SectionEyebrow({ children, className = '' }: SectionEyebrowProps) {
  return (
    <p
      className={`font-sans text-[11px] font-medium tracking-[0.15em] uppercase text-[#C9963A] ${className}`}
    >
      {children}
    </p>
  )
}
