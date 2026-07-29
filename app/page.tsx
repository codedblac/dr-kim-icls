import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { SectionEyebrow } from '@/components/section-eyebrow'
import { HomeCarousel } from '@/components/home-carousel'
import { TestimonialCard } from '@/components/testimonial-card'
import { EmailSubscribeForm } from '@/components/email-subscribe-form'
import { BookOpen, Users, Target } from 'lucide-react'

export const metadata: Metadata = {
  title: 'In Context Learning Solutions | Social Studies Consulting for K-12',
  description:
    'Specialized disciplinary literacy and Social Studies professional development for K-12 school districts. Founded by Dr. Kimberly Nicole Miles, Ed.D.',
  alternates: { canonical: 'https://incontextls.com' },
}

export default async function HomePage() {
  const supabase = await createClient()
  const { data: testimonials } = await supabase
    .from('testimonials')
    .select('*')
    .eq('display', true)
    .limit(3)

  return (
    <>
      {/* HERO */}
      <section
        className="relative min-h-screen bg-[#0A1628] hero-grid-texture overflow-hidden"
        aria-label="Hero"
      >
        {/* Background gradient overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#0A1628] via-[#122244] to-[#0A1628] opacity-80 pointer-events-none z-0"
          aria-hidden="true"
        />

        {/* Hero content wrapper - responsive grid */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 min-h-screen items-stretch">
          {/* Left Content Section */}
          <div className="flex items-center px-6 sm:px-8 md:px-10 lg:px-12 py-20 lg:py-24 overflow-y-auto lg:overflow-y-visible">
            <div className="w-full max-w-xl mx-auto lg:mx-0">
              <div className="flex flex-col gap-6">
                <SectionEyebrow>Secondary Social Studies Consulting</SectionEyebrow>
                
                <h1 className="font-serif font-bold text-white text-4xl sm:text-5xl lg:text-5xl xl:text-6xl leading-[1.1] tracking-[-0.02em] text-balance">
                  Empowering Social Studies Educators to Bridge the Literacy Gap.
                </h1>
                
                <p className="font-sans text-[#F4F6F9]/85 text-base sm:text-lg leading-relaxed">
                  Specialized, job-embedded professional development that integrates content and literacy for contextual understanding and sustained success.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 mt-2">
                  <Link
                    href="/contact"
                    className="bg-[#C9963A] text-white font-sans font-semibold text-sm px-7 py-3.5 rounded-sm hover:bg-[#F0C97A] hover:text-[#0A1628] transition-all duration-200 text-center active:scale-95"
                  >
                    Book a Strategy Audit
                  </Link>
                  <Link
                    href="/articles"
                    className="border border-white/40 text-white font-sans font-semibold text-sm px-7 py-3.5 rounded-sm hover:border-white hover:bg-white/10 transition-all duration-200 text-center active:scale-95"
                  >
                    Download the Free Rigor Guide
                  </Link>
                </div>
                
                <p className="font-sans text-xs text-white/50 tracking-wide pt-4">
                  Serving K-12 school districts, curriculum directors &amp; Social Studies department heads
                </p>
              </div>
            </div>
          </div>

          {/* Right Image Section with Overlay Quote */}
          <div className="relative hidden lg:flex lg:flex-col lg:items-stretch lg:overflow-hidden">
            {/* Background image - smooth covering */}
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dr-kim-FRWMfJtVuLIxOGTJNoHlVBrDAPwd2b.jpeg"
              alt="Dr. Kimberly Miles, EdD - Secondary Social Studies Education Consultant"
              fill
              className="object-cover object-center"
              priority
            />

            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#0A1628]/30 to-[#0A1628]/60 pointer-events-none transition-opacity duration-700" />

            {/* Overlay Quote Content */}
            {/* <div className="relative flex flex-col items-end justify-center h-full px-8 lg:px-12 py-12 lg:py-24 z-20">
              <div className="max-w-md">
                <blockquote className="font-serif text-2xl lg:text-3xl text-white italic leading-snug tracking-[-0.01em] mb-6">
                  &ldquo;Literacy instruction shouldn&rsquo;t be an addition to your history content. It is the vehicle for it.&rdquo;
                </blockquote>
                <p className="font-sans text-sm lg:text-base text-[#F0C97A] font-medium tracking-wide">
                  &mdash; Dr. Kimberly Miles, Ed.D.
                </p>
              </div>
            </div> */}
          </div>
        </div>
      </section>

       {/* SECTION 2: THE REAL TENSION */}
      <section className="bg-white py-20 px-6 lg:px-8" aria-label="The Real Tension">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <SectionEyebrow className="mb-3">The Real Tension</SectionEyebrow>
          <h2 className="font-serif font-bold text-[#0A1628] text-3xl sm:text-4xl tracking-[-0.02em] text-balance">
            The mandate landed. The pacing guide didn&rsquo;t move.
          </h2>
        </div>
        <div className="max-w-2xl mx-auto mb-12">
          <HomeCarousel />
        </div>
        <div className="max-w-[720px] mx-auto text-center flex flex-col gap-6">
          <p className="font-sans text-base text-[#4A5568] leading-relaxed">
            You&rsquo;ve been handed a district-wide literacy initiative. Your Social Studies teachers have a curriculum map that waits for no one. And somewhere in the middle, students are being asked to read like historians without ever being taught how.
          </p>
          <p className="font-sans text-base font-semibold text-[#0A1628] leading-relaxed">
            This is the gap Dr. Miles closes.
          </p>
          <p className="font-sans text-base text-[#4A5568] leading-relaxed">
            Not with generic reading strategies stapled onto your existing units. Not with a two-day PD that disappears by Monday. But with job-embedded coaching that meets your teachers where they are &mdash; inside their planning time, inside their content, inside their classrooms.
          </p>
        </div>
      </section>

      {/* SECTION 3: THE DISTINCTION THAT MATTERS */}
      <section className="bg-[#F4F6F9] py-20 px-6 lg:px-8" aria-label="The Distinction That Matters">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <SectionEyebrow className="mb-2">The Distinction That Matters</SectionEyebrow>
            <h2 className="font-serif font-bold text-[#0A1628] text-2xl sm:text-3xl tracking-[-0.02em] mb-4">
              There&rsquo;s a difference. Most PD doesn&rsquo;t know it.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white rounded-sm border-l-4 border-[#C9963A] p-7 shadow-[0_1px_4px_rgba(0,0,0,0.08)]">
              <h3 className="font-serif font-bold text-[#0A1628] text-xl tracking-[-0.02em] mb-3">
                Adolescent Literacy
              </h3>
              <p className="font-sans text-sm text-[#4A5568] leading-relaxed">
                Most literacy professional development teaches adolescent literacy &mdash; foundational strategies for accessing complex text.
              </p>
            </div>
            <div className="bg-white rounded-sm border-l-4 border-[#0A1628] p-7 shadow-[0_1px_4px_rgba(0,0,0,0.08)]">
              <h3 className="font-serif font-bold text-[#0A1628] text-xl tracking-[-0.02em] mb-3">
                Disciplinary Literacy
              </h3>
              <p className="font-sans text-sm text-[#4A5568] leading-relaxed">
                Dr. Miles teaches disciplinary literacy &mdash; the specialized practice of reading, writing, and thinking like a historian.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-sm p-8 border border-[#E2E8F0] shadow-sm max-w-3xl mx-auto text-center flex flex-col gap-4">
            <p className="font-sans text-sm text-[#4A5568] leading-relaxed">
              That distinction changes everything. A student who can identify the main idea of a passage is not the same as a student who can source a primary document, contextualize an era, and corroborate competing accounts.
            </p>
            <p className="font-serif text-lg font-semibold text-[#0A1628]">
              The second student is college-ready. The second student is what Social Studies was always meant to produce.
            </p>
            <p className="font-sans text-sm font-semibold text-[#C9963A] uppercase tracking-wider">
              ICLS exists to get your department there.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: THE APPROACH */}
      <section className="bg-white py-20 px-6 lg:px-8" aria-label="The Approach">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
            <div className="md:col-span-2">
              <SectionEyebrow className="mb-3">The Approach</SectionEyebrow>
              <h2 className="font-serif font-bold text-[#0A1628] text-3xl sm:text-4xl tracking-[-0.02em] leading-tight">
                We go where the work actually happens.
              </h2>
            </div>
            <div className="md:col-span-3 flex flex-col gap-4 border-l border-[#E2E8F0] md:pl-8">
              <p className="font-sans text-sm text-[#4A5568] leading-relaxed">
                Every ICLS engagement is built around one principle: <strong>real change happens in collaborative planning rooms, not conference centers.</strong>
              </p>
              <p className="font-sans text-sm text-[#4A5568] leading-relaxed">
                Dr. Miles embeds directly into your teachers&rsquo; professional learning communities &mdash; bringing targeted historical inquiry routines into the spaces where your team already works together. No extra sessions to schedule. No separate literacy block to carve out. <strong>The content is the literacy.</strong>
              </p>
              <p className="font-sans text-sm text-[#4A5568] leading-relaxed">
                When teachers feel genuinely supported &mdash; not managed, not mandated &mdash; they build the confidence to lead students deeper. That&rsquo;s where student growth becomes measurable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TIERED SERVICES SNAPSHOT */}
      <section className="bg-white py-20 px-6 lg:px-8 border-t border-[#E2E8F0]" aria-label="Services overview">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <SectionEyebrow className="mb-3">What We Offer</SectionEyebrow>
            <h2 className="font-serif font-bold text-[#0A1628] text-3xl sm:text-4xl tracking-[-0.02em]">
              Three Tiers. One Mission.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: BookOpen,
                tier: 'Tier 1',
                title: 'Foundational PD Workshops',
                desc: "High-impact single sessions aligned to your district's current literacy goals and Social Studies curriculum standards.",
              },
              {
                icon: Users,
                tier: 'Tier 2',
                title: 'Collaborative Coaching Cohorts',
                desc: 'Job-embedded support delivered during teacher planning periods. Live co-planning that honors curriculum pacing.',
              },
              {
                icon: Target,
                tier: 'Tier 3',
                title: 'Strategic Partnerships & Rigor Audits',
                desc: 'District-wide instructional alignment. An instructional audit and multi-year literacy integration roadmap for your department.',
              },
            ].map(({ icon: Icon, tier, title, desc }) => (
              <div
                key={tier}
                className="border border-[#E2E8F0] rounded-sm p-6 shadow-[0_1px_4px_rgba(0,0,0,0.08)] flex flex-col gap-4 hover:border-[#C9963A] transition-colors duration-150"
              >
                <div className="w-10 h-10 rounded-sm bg-[#C9963A]/10 flex items-center justify-center">
                  <Icon size={20} className="text-[#C9963A]" aria-hidden="true" />
                </div>
                <div>
                  <span className="font-sans text-[10px] font-semibold tracking-[0.12em] uppercase text-[#C9963A]">
                    {tier}
                  </span>
                  <h3 className="font-serif font-bold text-[#0A1628] text-lg mt-1 tracking-[-0.02em]">
                    {title}
                  </h3>
                </div>
                <p className="font-sans text-sm text-[#4A5568] leading-relaxed flex-1">{desc}</p>
                <Link
                  href="/services"
                  className="font-sans text-sm font-semibold text-[#C9963A] hover:text-[#0A1628] transition-colors duration-150"
                >
                  Learn More &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: MEET DR. MILES (WITH CIRCLE IMAGE) */}
      <section className="bg-[#0A1628] py-20 px-6 lg:px-8 text-white" aria-label="Meet Dr. Miles">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Col: Circular Image & Callout */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-start gap-6">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-[#C9963A] shadow-xl flex-shrink-0">
                <Image
                  src="/dr-kim.jpeg"
                  alt="Dr. Kimberly Nicole Miles, Ed.D."
                  fill
                  sizes="(max-width: 640px) 192px, 224px"
                  className="object-cover object-center"
                  priority
                />
              </div>
              <div className="text-center lg:text-left">
                <h3 className="font-serif font-bold text-xl text-white">
                  Dr. Kimberly Nicole Miles
                </h3>
                <p className="font-sans text-xs text-[#C9963A] font-medium tracking-wide uppercase mt-1">
                  Founder &amp; Lead Consultant, Ed.D.
                </p>
              </div>
            </div>

            {/* Right Col: Info & Bio */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <SectionEyebrow>Meet Dr. Miles</SectionEyebrow>
              <h2 className="font-serif font-bold text-3xl sm:text-4xl tracking-[-0.02em]">
                Twenty years in the room. Now she&rsquo;s in yours.
              </h2>
              <p className="font-sans text-sm text-[#F4F6F9]/80 leading-relaxed">
                Dr. Kimberly Nicole Miles built ICLS from the inside out &mdash; starting in elementary classrooms, moving through secondary and collegiate instruction, and spending two decades watching what happens when literacy is treated as an English teacher&rsquo;s problem instead of everyone&rsquo;s responsibility.
              </p>
              <p className="font-sans text-sm text-[#F4F6F9]/80 leading-relaxed">
                She holds an Ed.D. with professional endorsements in Instructional Coaching, Gifted Education, ESOL, and Math (K&ndash;5). Her peer-reviewed research on adolescent disciplinary literacy in Georgia&rsquo;s Social Studies classrooms has been recognized as a benchmark regional framework for secondary integration.
              </p>
              <p className="font-serif italic text-base text-[#C9963A]">
                She doesn&rsquo;t just study this. She&rsquo;s lived it.
              </p>
              <div>
                <a
                  href="https://digitalcommons.georgiasouthern.edu/sspeach/vol4/iss1/5/?fbclid=IwZnRzaAS5OKJwZG9mA2ZkaWQWUKHUOUTJgpkDuhaCgpP04JOjSVHOJWV4dG4DYWVtAjExAHNydGMGYXBwX2lkCjY2Mjg1NjgzNzkAAR4EVi8owYmwW13nolqZ6b3WrI3DyiNSJ4J_VokkJPH-WwKJsTc30iGxfW1xaQ_aem_hIDZxMNXnAcaFFTXTu1Gpg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#C9963A] text-white font-sans font-semibold text-xs px-6 py-3.5 rounded-sm hover:bg-[#F0C97A] hover:text-[#0A1628] transition-colors duration-150"
                >
                  Read her published research &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-[#F4F6F9] py-20 px-6 lg:px-8" aria-label="Testimonials">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <SectionEyebrow className="mb-3">What Educators Say</SectionEyebrow>
            <h2 className="font-serif font-bold text-[#0A1628] text-3xl sm:text-4xl tracking-[-0.02em]">
              Trusted by District Leaders
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(testimonials && testimonials.length > 0
              ? testimonials
              : [
                  { id: '1', quote: 'Dr. Miles transformed how our teachers think about reading instruction. Our students actually engage with primary sources now.', author_name: 'Dr. J. Thompson', author_role: 'Curriculum Director', author_district: null },
                  { id: '2', quote: 'The distinction between adolescent and disciplinary literacy was a game-changer for our department.', author_name: 'M. Rivera', author_role: 'Social Studies Specialist', author_district: null },
                  { id: '3', quote: 'Job-embedded coaching that actually fits our planning schedule. Rare and invaluable.', author_name: 'S. Johnson', author_role: 'Instructional Coach', author_district: null },
                ]
            ).map((t) => (
              <TestimonialCard
                key={t.id}
                quote={t.quote}
                author_name={t.author_name}
                author_role={t.author_role}
                author_district={t.author_district}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: LEAD CAPTURE */}
      <section className="bg-white py-20 px-6 lg:px-8 border-t border-[#E2E8F0]" aria-label="Lead capture blueprint download">
        <div className="max-w-2xl mx-auto text-center">
          <SectionEyebrow className="mb-3">Free Resource</SectionEyebrow>
          <h3 className="font-serif font-bold text-[#0A1628] text-2xl sm:text-3xl tracking-[-0.02em] mb-4 text-balance">
            Stop choosing between the curriculum map and the literacy mandate.
          </h3>
          <p className="font-sans text-sm text-[#4A5568] leading-relaxed mb-6">
            There&rsquo;s a better path. Download the free guide Dr. Miles wrote for secondary instructional leaders who are done making that impossible trade-off.
          </p>
          <p className="font-sans text-base font-semibold text-[#0A1628] mb-8">
            The Contextual Shift: 5 Ways to Integrate Literacy Without Losing Content Pacing
          </p>
          <EmailSubscribeForm />
        </div>
      </section>

      {/* SECTION 7: FINAL CTA */}
      <section className="bg-[#0A1628] py-20 px-6 lg:px-8 text-center" aria-label="Final call to action">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif font-bold text-white text-3xl sm:text-4xl tracking-[-0.02em] mb-4 text-balance">
            Your Social Studies classrooms can do more than cover content.
          </h2>
          <p className="font-sans text-white/75 text-base sm:text-lg mb-8">
            They can teach students to think like historians. Let&rsquo;s build that together.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-[#C9963A] text-white font-sans font-semibold text-sm px-8 py-4 rounded-sm hover:bg-[#F0C97A] hover:text-[#0A1628] transition-colors duration-150"
          >
            Learn More &rarr;
          </Link>
        </div>
      </section>
    </>
  )
}
