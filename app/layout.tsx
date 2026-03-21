import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AuthProvider } from '@/lib/auth-context'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'ZonaLocal | Marketplace de Negocios Locales',
  description: 'Descubre productos y servicios de negocios locales en Coacalco, Tultitlán, Tultepec y zonas aledañas. Muebles, automotriz, comida, talleres y más.',
  keywords: 'marketplace, negocios locales, coacalco, tultitlan, tultepec, ecommerce, productos locales',
  authors: [{ name: 'ZonaLocal' }],
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'ZonaLocal | Marketplace de Negocios Locales',
    description: 'Descubre productos y servicios de negocios locales cerca de ti',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#232f3e',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} font-sans antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
