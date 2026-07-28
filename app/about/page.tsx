import Link from 'next/link'
import type { Metadata } from 'next'
import { SectionEyebrow } from '@/components/section-eyebrow'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'About Dr. Kimberly Miles | In Context Learning Solutions',
  description:
    'Learn about Dr. Kimberly Nicole Miles, Ed.D. — founder of ICLS with 20+ years of experience in secondary education, disciplinary literacy, and Social Studies instructional consulting.',
  alternates: { canonical: 'https://incontextls.com/about' },
}

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-[#0A1628] pt-32 pb-16 px-6 lg:px-8" aria-label="About hero">
        <div className="max-w-4xl mx-auto">
          <SectionEyebrow className="mb-3 text-[#C9963A]">
            The Expertise Behind the Framework
          </SectionEyebrow>
          <h1 className="font-serif font-bold text-white text-4xl sm:text-5xl tracking-[-0.02em] mb-4 text-balance leading-tight">
            Rooted in Research. Proven in the Classroom. Empowering Secondary Educators.
          </h1>
          <div className="w-10 h-0.5 bg-[#C9963A]" aria-hidden="true" />
        </div>
      </section>

      {/* BIOGRAPHY */}
      <section className="bg-white py-20 px-6 lg:px-8" aria-label="Biography">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 items-start">
            {/* Photo Container */}
            <div className="md:col-span-2">
              <div
                className="relative w-full border-2 border-[#C9963A] rounded-sm overflow-hidden bg-[#F4F6F9]"
                style={{ aspectRatio: '3/4' }}
              >
                <Image
                  src="/dr-kim.jpeg"
                  alt="Dr. Kimberly Miles, Ed.D., Founder of In Context Learning Solutions"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover object-center transition-transform duration-300 hover:scale-[1.02]"
                  priority
                />
              </div>
            </div>

            {/* Bio text */}
            <div className="md:col-span-3 flex flex-col gap-6">
              <div>
                <h2 className="font-serif font-bold text-[#0A1628] text-2xl mb-4">
                  Driven by a Legacy of Education
                </h2>
                <p className="font-sans text-base text-[#1A202C] leading-relaxed mb-4">
                  True instructional leadership isn&rsquo;t born in a vacuum; it is forged through years of real-world classroom experience and a deep respect for the teaching profession. As the daughter of dedicated lifelong educators, my path was set early. I witnessed firsthand the profound impact that a supported, highly skilled teacher can have on a student&rsquo;s life.
                </p>
                <p className="font-sans text-base text-[#1A202C] leading-relaxed">
                  Today, with over 20 years of cross-curricular experience spanning elementary, secondary, and collegiate levels, I carry that legacy forward. I know the unique pressures secondary teachers face—balancing heavy content pacing, evolving state standards, and diverse classroom reading dynamics. My mission through In Context Learning Solutions is to ensure that educators never have to navigate these challenges alone.
                </p>
              </div>

              <div className="mt-4 border-t border-[#E2E8F0] pt-8">
                <h3 className="font-serif font-bold text-[#0A1628] text-xl mb-3">
                  Academic & Professional Credentials
                </h3>
                <p className="font-sans text-base text-[#4A5568] leading-relaxed mb-5">
                  My approach to school district consulting combines practical, job-embedded classroom application with rigorous, evidence-based research.
                </p>
                <ul className="flex flex-col gap-4">
                  <li className="flex items-start gap-3">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#C9963A] shrink-0" aria-hidden="true" />
                    <p className="font-sans text-sm text-[#1A202C] leading-relaxed">
                      <strong className="font-semibold text-[#0A1628]">Doctorate in Education (Ed.D.)</strong> | Academic Focus on Curriculum, Instruction, and Educational Leadership (3.9 GPA).
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#C9963A] shrink-0" aria-hidden="true" />
                    <p className="font-sans text-sm text-[#1A202C] leading-relaxed">
                      <strong className="font-semibold text-[#0A1628]">Professional Endorsements:</strong> Advanced specializations in Instructional Coaching, Gifted Education, and ESOL (English to Speakers of Other Languages).
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#C9963A] shrink-0" aria-hidden="true" />
                    <p className="font-sans text-sm text-[#1A202C] leading-relaxed">
                      <strong className="font-semibold text-[#0A1628]">Leadership Profiles:</strong> Director of regional secondary history tournaments, voting delegate on local Panhellenic educational executive boards, and active leader within Delta Sigma Theta Sorority, Inc.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PUBLICATIONS */}
      <section className="bg-[#F4F6F9] py-20 px-6 lg:px-8" aria-label="Publications">
        <div className="max-w-5xl mx-auto">
          <SectionEyebrow className="mb-3">Published Works</SectionEyebrow>
          <h2 className="font-serif font-bold text-[#0A1628] text-3xl sm:text-4xl tracking-[-0.02em] mb-4">
            Featured Thought Leadership & Publications
          </h2>
          <p className="font-sans text-base text-[#4A5568] leading-relaxed mb-10 max-w-3xl">
            I actively contribute to the regional and national dialogue surrounding secondary literacy and historical inquiry. My published work serves as a foundational blueprint for districts looking to redefine their instructional approaches.
          </p>

          <div className="flex flex-col gap-6">
            {/* Featured publication */}
            <div className="bg-[#0A1628] rounded-sm p-8 text-white">
              <span className="font-sans text-[10px] font-semibold tracking-[0.15em] uppercase text-[#C9963A] mb-3 block">
                Featured Article
              </span>
              <h3 className="font-serif font-bold text-white text-xl sm:text-2xl tracking-[-0.02em] leading-snug mb-3 text-balance">
                &ldquo;Adolescent Literacy: Bridging Literacy Gaps in Georgia&rsquo;s Social Studies Classrooms — A Call for Disciplinary Literacy in Secondary Education&rdquo;
              </h3>
              <p className="font-sans text-sm text-white/60 mb-4">
                <em>Teaching Social Studies in the Peach State</em> &middot; Vol. 4, Iss. 1
              </p>
              <p className="font-sans text-sm text-white/80 leading-relaxed mb-6 max-w-2xl">
                In this peer-reviewed publication, I break down the critical cognitive distinction between foundational reading support and specialized historical thinking. The article outlines a practical roadmap for district leaders to elevate secondary classroom rigor without falling behind on curriculum maps.
              </p>
              <a
                href="https://digitalcommons.georgiasouthern.edu/sspeach/vol4/iss1/5/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#C9963A] text-white font-sans font-semibold text-sm px-6 py-3 rounded-sm hover:bg-[#F0C97A] hover:text-[#0A1628] transition-colors duration-150"
              >
                Access the Full Text via Georgia Southern University Digital Commons <span aria-hidden="true">&rarr;</span>
              </a>
            </div>

            {/* Secondary publication */}
            <div className="bg-white border border-[#E2E8F0] rounded-sm p-7 shadow-[0_1px_4px_rgba(0,0,0,0.08)]">
              <span className="font-sans text-[10px] font-semibold tracking-[0.15em] uppercase text-[#C9963A] mb-3 block">
                National Contribution
              </span>
              <h3 className="font-serif font-bold text-[#0A1628] text-lg tracking-[-0.02em] leading-snug mb-2">
                &ldquo;Building Bridges: Integrating Multicultural Awareness in Early Learning (and Beyond)&rdquo;
              </h3>
              <p className="font-sans text-sm text-[#4A5568] mb-4">
                Published in <em>The Leader</em>
              </p>
              <p className="font-sans text-sm text-[#4A5568] leading-relaxed">
                A national perspective focusing on cross-cultural alignment, disciplinary literacy frameworks, and the seamless integration of diverse viewpoints within social studies instruction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ICLS PROMISE (Retained for conversion consistency) */}
      <section className="bg-white py-20 px-6 lg:px-8 text-center" aria-label="The ICLS Promise">
        <div className="max-w-[680px] mx-auto">
          <SectionEyebrow className="mb-4">The ICLS Promise</SectionEyebrow>
          <h2 className="font-serif font-bold text-[#0A1628] text-3xl sm:text-4xl tracking-[-0.02em] mb-6">
            Seen. Heard. Understood.
          </h2>
          <p className="font-sans text-base text-[#4A5568] leading-relaxed mb-8">
            Sustainable instructional growth never happens through top-down mandates or generic professional development. It happens when educators feel deeply seen, heard, and understood in their specific content areas. Every ICLS engagement begins with listening.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-[#C9963A] text-white font-sans font-semibold text-sm px-7 py-3.5 rounded-sm hover:bg-[#0A1628] transition-colors duration-150"
          >
            Start the Conversation
          </Link>
        </div>
      </section>
    </>
  )
}