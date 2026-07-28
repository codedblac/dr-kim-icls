'use client'

import { useState, useEffect } from 'react'
import { Clock, BookOpen, Users } from 'lucide-react'

const cards = [
  {
    icon: Clock,
    text: '"Teachers feel forced to choose between content pacing and literacy instruction."',
  },
  {
    icon: BookOpen,
    text: '"District mandates arrive without discipline-specific frameworks to back them up."',
  },
  {
    icon: Users,
    text: '"Generic reading strategies fail in the Social Studies classroom."',
  },
]

export function HomeCarousel() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % cards.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const card = cards[active]
  const Icon = card.icon

  return (
    <div>
      {/* Card */}
      <div
        key={active}
        className="bg-white border border-[#E2E8F0] rounded-sm p-8 shadow-[0_1px_4px_rgba(0,0,0,0.08)] min-h-[160px] flex flex-col justify-center gap-4 transition-all duration-500"
      >
        <div className="w-10 h-10 rounded-sm bg-[#C9963A]/10 flex items-center justify-center">
          <Icon size={20} className="text-[#C9963A]" />
        </div>
        <p className="font-serif text-lg text-[#0A1628] leading-snug tracking-[-0.01em] italic">
          {card.text}
        </p>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2.5 mt-5" role="tablist" aria-label="Carousel navigation">
        {cards.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            role="tab"
            aria-selected={active === i}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              active === i ? 'bg-[#C9963A] w-6' : 'bg-[#E2E8F0] w-2'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
