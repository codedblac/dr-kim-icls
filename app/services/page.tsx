import Link from 'next/link'
import type { Metadata } from 'next'
import { SectionEyebrow } from '@/components/section-eyebrow'
import { CheckCircle, BookOpen, PenTool } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Services | In Context Learning Solutions',
  description:
    'Scalable, High-Impact Professional Learning. Explore our instructional consulting tiers, academic editing services, and picture book editing.',
  alternates: { canonical: 'https://incontextls.com/services' },
}

const consultingTiers = [
  {
    tag: 'Workshops',
    badge: null,
    title: 'Foundational PD Workshops',
    bestFor: 'Districts seeking a high-impact, immediate catalyst to shift their school culture.',
    desc: 'Dynamic single-day or half-day interactive workshops designed for school site or district-wide professional learning days. We unpack the tactical difference between adolescent and disciplinary literacy, providing teachers with a bank of "Monday-ready" inquiry routines.',
    highlight: false,
  },
  {
    tag: 'Coaching',
    // badge: 'PREMIER MODEL',
    title: 'Collaborative Coaching Cohorts',
    bestFor: 'Departments committed to transforming text instruction into long-term student achievement.',
    desc: 'Our premier delivery model. We embed directly into your school building, joining teachers during their regular collaborative planning times. Together, we analyze student data, co-design rigorous lesson plans, model strategies in real classrooms, and provide immediate feedback. This ensures teachers feel deeply seen, heard, and understood.',
    highlight: true,
  },
  {
    tag: 'Partnerships',
    badge: null,
    title: 'Strategic District Partnerships & Rigor Audits',
    bestFor: 'District leaders looking for long-term systemic alignment.',
    desc: 'A comprehensive, year-long partnership. We conduct thorough curriculum audits to identify structural literacy gaps, align your district pacing guides with advanced disciplinary inquiry standards, and train building-level instructional coaches to sustain the growth long after our engagement concludes.',
    highlight: false,
  },
]

const academicEditingTiers = [
  {
    tag: 'Tier 1',
    title: 'Developmental & Pedagogical Editing',
    bestFor: 'Rough drafts, early manuscripts, or curriculum designs that need structural alignment.',
    desc: 'We look at the "big picture" of your book. We evaluate chapter flow, the logical progression of your arguments, and the alignment of your pedagogical frameworks. For social studies and literacy texts, we ensure the crucial distinction between foundational adolescent literacy support and advanced disciplinary literacy inquiry is maintained with absolute precision.',
  },
  {
    tag: 'Tier 2',
    title: 'Content & Copy Editing (Line Editing)',
    bestFor: 'Completed drafts that require fine-tuning for clarity, academic tone, and reading engagement.',
    desc: 'We dive deep into the sentence level. We eliminate academic fluff, clarify dense educational jargon, and improve overall readability while preserving your unique professional voice. We ensure your tone resonates perfectly with school administrators, university peers, or classroom teachers.',
  },
  {
    tag: 'Tier 3',
    title: 'Academic Formatting & Citation Compliance',
    bestFor: 'Manuscripts preparing for submission to peer-reviewed journals, university presses, or district procurement boards.',
    desc: 'We handle the meticulous details of academic formatting. We ensure absolute adherence to formatting styles (APA, Chicago Manual of Style, etc.), clean up bibliography entries, format text callout boxes, and verify that all curriculum standards referenced are properly cited.',
  },
]

const pictureBookTiers = [
  {
    tag: 'Early Stage',
    title: 'The Picture Book Manuscript Critique',
    bestFor: 'Completed raw drafts needing an expert eye on the overarching concept before moving to layout.',
    desc: 'We evaluate the core theme, character arc, emotional resonance, and commercial viability of your story. We look closely at your target age demographic (e.g., ages 3–5 vs. 6–8) to ensure the concept and themes match their developmental level.',
  },
  {
    tag: 'Line Stage',
    title: 'Pacing, Rhythm, & Pagination Editing',
    bestFor: 'Drafts ready to be mapped out into standard publishing layouts (typically the traditional 32-page picture book format).',
    desc: 'We refine word choice, eliminate unnecessary exposition, and optimize the meter and rhyme (if applicable) for read-aloud appeal. Crucially, we provide concrete "Illustrator Notes" and map out the exact page turns to build tension, humor, or emotional impact from page to page.',
  },
]

export default function ServicesPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-[#0A1628] pt-32 pb-20 px-6 lg:px-8" aria-label="Services hero">
        <div className="max-w-4xl mx-auto text-center md:text-left">
          <SectionEyebrow className="mb-3 text-[#C9963A]">Our Core Themes & Service Delivery Tiers</SectionEyebrow>
          <h1 className="font-serif font-bold text-white text-4xl sm:text-5xl tracking-[-0.02em] mb-6 text-balance leading-tight">
            Scalable, High-Impact Professional Learning Built for Sustained Growth.
          </h1>
          <p className="font-sans text-white/80 text-base sm:text-lg leading-relaxed max-w-3xl">
            We do not believe in generic, one-size-fits-all reading mandates. Our service framework is divided into two precise instructional pillars to help departments target the exact needs of their students.
          </p>
        </div>
      </section>

      {/* TWO PILLARS */}
      <section aria-label="The Two Pillars of Our Framework">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="bg-[#F4F6F9] p-12 lg:p-20">
            <span className="font-sans text-[10px] font-semibold tracking-[0.15em] uppercase text-[#C9963A] mb-3 block">
              Pillar 1
            </span>
            <h3 className="font-serif font-bold text-[#0A1628] text-2xl md:text-3xl tracking-[-0.02em] mb-4">
              Adolescent Literacy Foundations <span className="text-[#4A5568] block mt-1 text-xl font-normal">(The Access Tier)</span>
            </h3>
            <p className="font-sans text-base text-[#4A5568] leading-relaxed">
              We equip middle and high school teachers with actionable, low-prep reading, writing, and comprehension strategies. These foundational tools ensure that struggling readers can successfully decode, process, and extract basic information from dense secondary textbooks and complex informational texts.
            </p>
          </div>
          <div className="bg-[#0A1628] p-12 lg:p-20">
            <span className="font-sans text-[10px] font-semibold tracking-[0.15em] uppercase text-[#C9963A] mb-3 block">
              Pillar 2
            </span>
            <h3 className="font-serif font-bold text-white text-2xl md:text-3xl tracking-[-0.02em] mb-4">
              Disciplinary Literacy Specialization <span className="text-white/60 block mt-1 text-xl font-normal">(The Inquiry Tier)</span>
            </h3>
            <p className="font-sans text-base text-white/80 leading-relaxed">
              We move students beyond basic comprehension and train them to read, write, and think like true historians. Teachers learn how to build advanced inquiry units focused on the core habits of the discipline: sourcing documents, analyzing historical context, identifying institutional bias, and corroborating conflicting evidence.
            </p>
          </div>
        </div>
      </section>

      {/* THREE TIERS (Consulting) */}
      <section className="bg-white py-24 px-6 lg:px-8" aria-label="Our Service Tiers">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <SectionEyebrow className="mb-3">How We Work Together</SectionEyebrow>
            <h2 className="font-serif font-bold text-[#0A1628] text-3xl sm:text-4xl tracking-[-0.02em]">
              Our Service Tiers
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {consultingTiers.map((tier) => (
              <div
                key={tier.title}
                className={`rounded-sm flex flex-col p-8 gap-5 ${
                  tier.highlight
                    ? 'border-2 border-[#C9963A] shadow-[0_4px_20px_rgba(201,150,58,0.15)] bg-white relative top-[-10px]'
                    : 'border border-[#E2E8F0] shadow-[0_1px_4px_rgba(0,0,0,0.08)] bg-white'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="font-sans text-[10px] font-semibold tracking-[0.12em] uppercase text-[#C9963A]">
                    {tier.tag}
                  </span>
                  {/* {tier.badge && (
                    <span className="font-sans text-[9px] font-bold tracking-wide uppercase bg-[#C9963A] text-white px-2.5 py-1 rounded-sm">
                      {tier.badge}
                    </span>
                  )} */}
                </div>
                <h3 className="font-serif font-bold text-[#0A1628] text-2xl tracking-[-0.02em]">
                  {tier.title}
                </h3>
                
                <div className="flex flex-col gap-4 flex-1">
                  <div className="bg-[#F4F6F9] p-4 rounded-sm border border-[#E2E8F0]">
                    <span className="font-sans text-xs font-bold text-[#0A1628] uppercase tracking-wider block mb-1">
                      Best For:
                    </span>
                    <span className="font-sans text-sm text-[#4A5568] leading-snug">
                      {tier.bestFor}
                    </span>
                  </div>
                  <div>
                    <span className="font-sans text-xs font-bold text-[#0A1628] uppercase tracking-wider block mb-1">
                      What It Is:
                    </span>
                    <p className="font-sans text-sm text-[#4A5568] leading-relaxed">
                      {tier.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ACADEMIC EDITING SECTION */}
      <section className="bg-[#F4F6F9] py-24 px-6 lg:px-8 border-t border-[#E2E8F0]" aria-label="Academic Editing Services">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <SectionEyebrow className="mb-3 flex items-center gap-2">
              <PenTool size={16} /> Editing Services
            </SectionEyebrow>
            <h2 className="font-serif font-bold text-[#0A1628] text-3xl sm:text-4xl tracking-[-0.02em] mb-4">
              Elevating Academic Voices: Authoritative Editing for Educational Texts
            </h2>
            <p className="font-sans text-base text-[#4A5568] leading-relaxed mb-4">
              Transforming complex educational research, pedagogy, and curriculum into polished, publishable manuscripts.
            </p>
            <p className="font-sans text-base text-[#4A5568] leading-relaxed">
              Writing an educational textbook, a peer-reviewed journal article, or a curriculum framework requires balancing dense academic research with engaging, readable prose. At In Context Learning Solutions, we provide premium, specialized developmental and copy editing services specifically tailored for academic authors, curriculum developers, independent education consultants, and publishers. We ensure your manuscript is instructionally sound, structurally rigorous, and ready for publication.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
            {academicEditingTiers.map((tier) => (
              <div key={tier.tag} className="bg-white border border-[#E2E8F0] p-8 rounded-sm shadow-sm flex flex-col">
                <span className="font-sans text-[10px] font-semibold tracking-[0.12em] uppercase text-[#C9963A] mb-3">
                  {tier.tag}
                </span>
                <h3 className="font-serif font-bold text-[#0A1628] text-xl tracking-[-0.02em] mb-5">
                  {tier.title}
                </h3>
                <div className="flex flex-col gap-4 flex-1">
                  <div>
                    <span className="font-sans text-xs font-bold text-[#0A1628] uppercase tracking-wider block mb-1">
                      Best For:
                    </span>
                    <p className="font-sans text-sm text-[#4A5568] leading-snug">
                      {tier.bestFor}
                    </p>
                  </div>
                  <div>
                    <span className="font-sans text-xs font-bold text-[#0A1628] uppercase tracking-wider block mb-1">
                      What We Do:
                    </span>
                    <p className="font-sans text-sm text-[#4A5568] leading-relaxed">
                      {tier.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* What We Edit List */}
          <div className="bg-[#0A1628] p-8 md:p-12 rounded-sm text-white">
            <h3 className="font-serif font-bold text-2xl mb-8">What We Edit</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <BookOpen className="text-[#C9963A] flex-shrink-0 mt-1" size={24} />
                <div>
                  <h4 className="font-bold font-sans text-lg mb-1">Educational Non-Fiction Books</h4>
                  <p className="font-sans text-white/70 text-sm leading-relaxed">Professional development manuals, instructional leadership books, and teacher guidebooks.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <BookOpen className="text-[#C9963A] flex-shrink-0 mt-1" size={24} />
                <div>
                  <h4 className="font-bold font-sans text-lg mb-1">Curriculum Materials & Textbooks</h4>
                  <p className="font-sans text-white/70 text-sm leading-relaxed">Grade-level history programs, secondary text sets, and instructional frameworks.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <BookOpen className="text-[#C9963A] flex-shrink-0 mt-1" size={24} />
                <div>
                  <h4 className="font-bold font-sans text-lg mb-1">Peer-Reviewed Journal Articles</h4>
                  <p className="font-sans text-white/70 text-sm leading-relaxed">Articles aiming for publication in state, regional, or national social studies and literacy journals.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <BookOpen className="text-[#C9963A] flex-shrink-0 mt-1" size={24} />
                <div>
                  <h4 className="font-bold font-sans text-lg mb-1">White Papers & Capability Statements</h4>
                  <p className="font-sans text-white/70 text-sm leading-relaxed">Authoritative industry papers designed to secure large district-level or state-level educational contracts.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CHILDREN'S LITERATURE SECTION */}
      <section className="bg-white py-24 px-6 lg:px-8" aria-label="Children's Literature Editing">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-12">
            <SectionEyebrow className="mb-3">Children&apos;s Literature & Picture Books</SectionEyebrow>
            <h2 className="font-serif font-bold text-[#0A1628] text-3xl sm:text-4xl tracking-[-0.02em] mb-4">
              Crafting Impactful Stories for Young Readers
            </h2>
            <p className="font-sans text-base text-[#4A5568] leading-relaxed mb-4">
              Writing a picture book requires an entirely unique set of rules. Every single word must earn its place on the page, the rhythm must feel effortless when read aloud, and the text must leave perfect structural room for the illustrator to bring the story to life.
            </p>
            <p className="font-sans text-base text-[#4A5568] leading-relaxed">
              Whether you are writing a historical narrative, a multicultural story, or an early childhood concept book, we help you refine your manuscript to captivate young minds, engage parents, and align with early literacy standards.
            </p>
          </div>

          {/* Picture Book Tiers */}
          <h3 className="font-serif font-bold text-[#0A1628] text-2xl mb-8">Specialized Picture Book Editing Tiers</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {pictureBookTiers.map((tier) => (
              <div key={tier.tag} className="border-l-4 border-[#C9963A] pl-6 py-2">
                <h4 className="font-serif font-bold text-[#0A1628] text-xl tracking-[-0.02em] mb-3">
                  {tier.title}
                </h4>
                <div className="mb-3">
                  <span className="font-sans text-xs font-bold text-[#0A1628] uppercase tracking-wider block mb-1">
                    Best For:
                  </span>
                  <p className="font-sans text-sm text-[#4A5568] leading-snug">
                    {tier.bestFor}
                  </p>
                </div>
                <div>
                  <span className="font-sans text-xs font-bold text-[#0A1628] uppercase tracking-wider block mb-1">
                    What We Do:
                  </span>
                  <p className="font-sans text-sm text-[#4A5568] leading-relaxed">
                    {tier.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* What We Edit in Early Literacy */}
          <div className="bg-[#F4F6F9] rounded-sm p-8 md:p-12 border border-[#E2E8F0]">
            <h3 className="font-serif font-bold text-[#0A1628] text-2xl mb-6">What We Edit in Early Literacy</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle size={18} className="text-[#C9963A] flex-shrink-0 mt-0.5" aria-hidden="true" />
                <p className="font-sans text-base text-[#1A202C]">
                  <strong className="text-[#0A1628]">Historical Fiction & Biographical Picture Books:</strong> Transforming complex historical events or figures into accessible, inspiring narratives for primary elementary students.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle size={18} className="text-[#C9963A] flex-shrink-0 mt-0.5" aria-hidden="true" />
                <p className="font-sans text-base text-[#1A202C]">
                  <strong className="text-[#0A1628]">Multicultural & Inclusive Stories:</strong> Ensuring authentic representation, rich cultural context, and diverse perspectives are seamlessly woven into early childhood literature.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle size={18} className="text-[#C9963A] flex-shrink-0 mt-0.5" aria-hidden="true" />
                <p className="font-sans text-base text-[#1A202C]">
                  <strong className="text-[#0A1628]">Social-Emotional Learning (SEL) Books:</strong> Crafting character-driven stories that help early learners navigate emotions, community, and relationships.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="bg-[#0A1628] py-20 px-6 lg:px-8 text-center" aria-label="Call to action">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif font-bold text-white text-3xl sm:text-4xl tracking-[-0.02em] mb-6">
            Ready to Bring Your Story to Life?
          </h2>
          <p className="font-sans text-white/80 text-base leading-relaxed mb-10">
            Let&rsquo;s ensure your manuscript, curriculum framework, or picture book is tight, rhythmic, and perfectly aligned for its intended audience.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-block bg-[#C9963A] text-white font-sans font-semibold text-sm px-8 py-4 rounded-sm hover:bg-white hover:text-[#0A1628] transition-colors duration-150 w-full sm:w-auto"
            >
              Submit Your Draft for Review
            </Link>
            <Link
              href="/contact"
              className="inline-block bg-transparent border border-white/30 text-white font-sans font-semibold text-sm px-8 py-4 rounded-sm hover:bg-white/10 transition-colors duration-150 w-full sm:w-auto"
            >
              Book a Strategy Audit
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}