// app/layout.tsx
import type { Metadata } from 'next'
import Script from 'next/script'
import { Toaster } from 'react-hot-toast'

import '../styles/globals.css'
import Footer from '@/components/common/Footer'
import Navbar from '@/components/common/Navbar'
import Analytics from '@/components/analytics'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { AuthProvider } from './contexts/AuthContext'

export const metadata: Metadata = {
  title: 'Match My Resume',
  description: 'AI-powered resume matching and optimization tool',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
        <html lang="en">
          <head>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <Script
              id="gtag-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  window.gtag = gtag;
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </head>
          <body className="flex flex-col min-h-screen">
            <Toaster position="top-center" reverseOrder={false} /> {/* ✅ Toasts appear across routes */}
            <Navbar />
            <Analytics />
            <main className="flex-grow">{children}</main>
            <Footer />
          </body>
        </html>
      </GoogleOAuthProvider>
    </AuthProvider>
  )
}
