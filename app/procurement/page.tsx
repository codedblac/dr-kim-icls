import Link from 'next/link'
import type { Metadata } from 'next'
import { SectionEyebrow } from '@/components/section-eyebrow'
import { Download, FileText, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Procurement & Vendor Data | In Context Learning Solutions',
  description:
    'A contract-ready partner for school districts and educational agencies. NAICS 611710, Georgia LLC compliance data, core capabilities, and downloadable corporate assets.',
  alternates: { canonical: 'https://incontextls.com/procurement' },
}

const vendorData = [
  { label: 'Legal Entity Name', value: 'In Context Learning Solutions, LLC' },
  { label: 'Core Focus', value: 'K-12 Educational Support Services, Social Studies Curriculum Consultation, Secondary Literacy Integration.' },
  { label: 'Primary NAICS Code', value: '611710 — Educational Support Services' },
  { label: 'NIGP Class/Item Codes', value: 'Applicable Georgia state procurement codes' },
  { label: 'Certifications & Structure', value: 'State-registered Georgia Limited Liability Company (LLC)' },
  { label: 'Service Area', value: 'Georgia (primary) · National (virtual & hybrid)' },
  { label: 'Founder & Principal Consultant', value: 'Dr. Kimberly Nicole Miles, Ed.D.' },
]

const coreCapabilities = [
  {
    title: 'Curriculum Realignment',
    desc: 'Auditing secondary social studies curriculum maps to blend foundational adolescent literacy strategies with advanced historical inquiry frameworks.',
  },
  {
    title: 'Job-Embedded Coaching',
    desc: 'Facilitating on-site PLC (Professional Learning Community) workshops that build internal teacher capacity without interrupting instructional pacing.',
  },
  {
    title: 'Assessment Development',
    desc: 'Designing rigorous, text-dependent Depth of Knowledge (DOK) level 2 and 3 assessment items that reflect state testing demands and historical thinking skills.',
  },
  {
    title: 'Disciplinary Literacy Modules',
    desc: 'Developing targeted primary and secondary source analysis modules that improve student evidence-based writing performance.',
  },
]

export default function ProcurementPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-[#0A1628] pt-32 pb-20 px-6 lg:px-8" aria-label="Procurement hero">
        <div className="max-w-4xl mx-auto">
          <SectionEyebrow className="mb-3 text-[#C9963A]">Vendor Procurement & Corporate Data</SectionEyebrow>
          <h1 className="font-serif font-bold text-white text-4xl sm:text-5xl tracking-[-0.02em] mb-4 text-balance leading-tight">
            A Contract-Ready Partner for School Districts and Educational Agencies.
          </h1>
          <p className="font-sans text-white/80 text-base sm:text-lg leading-relaxed max-w-3xl">
            In Context Learning Solutions, LLC is a fully registered, compliant corporate entity equipped to streamline the procurement process for public school systems, state agencies, and grant-funded educational programs.
          </p>
        </div>
      </section>

      {/* VENDOR DATA & CORE CAPABILITIES */}
      <section className="bg-white py-24 px-6 lg:px-8" aria-label="Vendor information and capabilities">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left: Vendor Information Table */}
            <div className="lg:col-span-5 bg-[#F4F6F9] p-8 rounded-sm border border-[#E2E8F0]">
              <h2 className="font-serif font-bold text-[#0A1628] text-2xl tracking-[-0.02em] mb-6">
                Corporate Identifiers &amp; Registrations
              </h2>
              <dl className="divide-y divide-[#E2E8F0]">
                {vendorData.map(({ label, value }) => (
                  <div key={label} className="py-3.5 flex flex-col gap-1">
                    <dt className="font-sans text-xs font-bold uppercase tracking-wider text-[#C9963A]">{label}</dt>
                    <dd className="font-sans text-sm text-[#1A202C]">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Right: Core Capabilities */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div>
                <SectionEyebrow className="mb-2">Service Breakdown</SectionEyebrow>
                <h2 className="font-serif font-bold text-[#0A1628] text-3xl tracking-[-0.02em] mb-4">
                  Core Capabilities
                </h2>
                <p className="font-sans text-base text-[#4A5568] leading-relaxed mb-6">
                  Our professional service engagements are structured for seamless integration into existing district improvement grants and institutional budgets.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {coreCapabilities.map((item) => (
                  <div key={item.title} className="border border-[#E2E8F0] p-6 rounded-sm bg-white shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 size={16} className="text-[#C9963A] shrink-0" aria-hidden="true" />
                        <h3 className="font-serif font-bold text-[#0A1628] text-lg">{item.title}</h3>
                      </div>
                      <p className="font-sans text-sm text-[#4A5568] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* DOWNLOAD DIGITAL ASSETS (SEPARATED OUT) */}
      <section className="bg-[#F4F6F9] py-24 px-6 lg:px-8 border-t border-[#E2E8F0]" aria-label="Digital assets and downloads">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <SectionEyebrow className="mb-3">Procurement Resources</SectionEyebrow>
            <h2 className="font-serif font-bold text-[#0A1628] text-3xl sm:text-4xl tracking-[-0.02em] mb-4">
              Download Digital Assets
            </h2>
            <p className="font-sans text-base text-[#4A5568] leading-relaxed">
              Procurement officers, contract managers, and curriculum directors can instantly download our complete physical asset pack below to accelerate vendor onboarding.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Capability Statement Card */}
            <div className="bg-white border-2 border-[#C9963A] rounded-sm p-8 flex flex-col justify-between shadow-sm">
              <div>
                <span className="font-sans text-[10px] font-semibold tracking-[0.15em] uppercase text-[#C9963A] mb-3 block">
                  Official Document
                </span>
                <h3 className="font-serif font-bold text-[#0A1628] text-xl tracking-[-0.02em] mb-3">
                  Full Capability Statement (PDF)
                </h3>
                <p className="font-sans text-sm text-[#4A5568] leading-relaxed mb-6">
                  Comprehensive overview of ICLS core competencies, past performance indicators, NAICS alignments, and consulting frameworks designed for RFQ and grant responses.
                </p>
              </div>
              <a
                href="#"
                className="flex items-center gap-2 justify-center bg-[#C9963A] text-white font-sans font-semibold text-sm px-5 py-3.5 rounded-sm hover:bg-[#0A1628] transition-colors duration-150"
                aria-label="Download Full Capability Statement PDF (coming soon)"
              >
                <Download size={16} aria-hidden="true" />
                Download Capability Statement (PDF)
              </a>
            </div>

            {/* Corporate Vendor Profile Card */}
            <div className="bg-white border border-[#E2E8F0] rounded-sm p-8 flex flex-col justify-between shadow-sm">
              <div>
                <span className="font-sans text-[10px] font-semibold tracking-[0.15em] uppercase text-[#C9963A] mb-3 block">
                  Onboarding Profile
                </span>
                <h3 className="font-serif font-bold text-[#0A1628] text-xl tracking-[-0.02em] mb-3">
                  Corporate Vendor Profile
                </h3>
                <p className="font-sans text-sm text-[#4A5568] leading-relaxed mb-6">
                  Detailed packet including company background, W-9 metadata summary, insurance clearances, and standard educational service agreement parameters.
                </p>
              </div>
              <a
                href="#"
                className="flex items-center gap-2 justify-center bg-[#0A1628] text-white font-sans font-semibold text-sm px-5 py-3.5 rounded-sm hover:bg-[#C9963A] transition-colors duration-150"
                aria-label="Download Corporate Vendor Profile PDF (coming soon)"
              >
                <FileText size={16} aria-hidden="true" />
                Download Corporate Vendor Profile (PDF)
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="bg-white py-24 px-6 lg:px-8 text-center" aria-label="Procurement contact CTA">
        <div className="max-w-xl mx-auto">
          <h2 className="font-serif font-bold text-[#0A1628] text-3xl sm:text-4xl tracking-[-0.02em] mb-4">
            Ready to Clear ICLS as an Approved Vendor?
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#4A5568] leading-relaxed mb-8">
            Our onboarding process is straightforward. Contact us with your district&rsquo;s specific vendor registration requirements or custom contract paperwork.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-[#C9963A] text-white font-sans font-semibold text-sm px-8 py-4 rounded-sm hover:bg-[#0A1628] transition-colors duration-150"
          >
            Contact the Procurement Team
          </Link>
        </div>
      </section>
    </>
  )
}