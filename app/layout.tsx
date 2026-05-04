import type { Metadata } from 'next'
import '../styles/globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CustomCursor from '@/components/CustomCursor'
import AmbientBackground from '@/components/AmbientBackground'

export const metadata: Metadata = {
  title: 'Mohammed Adhil P P — Civil Engineer & 3D Visualization Specialist',
  description: 'Portfolio of Mohammed Adhil P P — Civil Engineer and 3D Visualization Specialist based in Malappuram, Kerala, India. Specializing in structural engineering, AutoCAD, SketchUp, and project coordination.',
  keywords: ['civil engineer', 'structural engineer', 'AutoCAD', 'SketchUp', 'Kerala', 'Malappuram', '3D visualization'],
  authors: [{ name: 'Mohammed Adhil P P' }],
  openGraph: {
    title: 'Mohammed Adhil P P — Civil Engineer',
    description: 'Portfolio of Mohammed Adhil P P — Civil Engineer and 3D Visualization Specialist',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-obsidian text-text-primary antialiased grain">
        <CustomCursor />
        <AmbientBackground />
        <Navbar />
        <main className="relative z-[2]">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
