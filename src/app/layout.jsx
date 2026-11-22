import { Newsreader, Inter } from 'next/font/google'
import { Analytics as VercelAnalytics } from '@vercel/analytics/react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Analytics from '@/components/Analytics'
import Reveal from '@/components/Reveal'
import JsonLd from '@/components/JsonLd'
import { SITE, SITE_URL } from '@/lib/site'
import { organizationSchema, websiteSchema } from '@/lib/seo'
import './globals.css'

const serif = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-serif',
  adjustFontFallback: false,
  fallback: ['Georgia', 'Times New Roman', 'serif'],
})
const sans = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-sans' })

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE.name}: ${SITE.tagline}`, template: `%s | ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_BING_VERIFICATION ? { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_VERIFICATION } : undefined,
  },
  formatDetection: { telephone: false },
}

export const viewport = { themeColor: '#FBF8F3', width: 'device-width', initialScale: 1 }

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
      </head>
      <body>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Reveal />
        <Analytics />
        <VercelAnalytics />
      </body>
    </html>
  )
}
