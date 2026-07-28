import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Montserrat } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  weight: ['400', '700'],
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'In Context Learning Solutions | Social Studies Consulting for K-12',
  description:
    'Specialized disciplinary literacy and Social Studies professional development for K-12 school districts. Founded by Dr. Kimberly Nicole Miles, Ed.D.',
  keywords: [
    'Social Studies consulting',
    'disciplinary literacy',
    'K-12 professional development',
    'instructional coaching Georgia',
    'Social Studies PD',
    'adolescent literacy',
    'ICLS',
  ],
  openGraph: {
    title: 'In Context Learning Solutions | Social Studies Consulting',
    description:
      'Specialized Social Studies instructional consulting and disciplinary literacy professional development for K-12 school districts.',
    url: 'https://incontextls.com',
    siteName: 'In Context Learning Solutions',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'In Context Learning Solutions',
    description:
      'Disciplinary literacy professional development for K-12 Social Studies educators.',
    creator: '@drmilesk31',
  },
  alternates: { canonical: 'https://incontextls.com' },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#0A1628',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'In Context Learning Solutions, LLC',
  founder: { '@type': 'Person', name: 'Dr. Kimberly Nicole Miles' },
  description:
    'Specialized Social Studies instructional consulting and disciplinary literacy professional development for K-12 school districts.',
  url: 'https://incontextls.com',
  areaServed: 'US',
  serviceType: 'Educational Consulting',
  sameAs: [
    'https://www.linkedin.com/in/kmilesbsedmed',
    'https://x.com/drmilesk31',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${montserrat.variable} bg-white`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-[#C9963A] focus:text-white focus:px-4 focus:py-2 focus:rounded"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
