// app/layout.tsx
import './globals.css'
import Header from '../components/header'
import Footer from '../components/footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My App',
  description: 'This is my Next.js app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
