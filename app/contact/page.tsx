import type { Metadata } from 'next'
import ContactSection from '@/components/sections/ContactSection'
import AnimateIn from '@/components/ui/AnimateIn'

export const metadata: Metadata = {
  title: 'Contact — Mohammed Adhil P P',
  description: 'Get in touch with Mohammed Adhil P P for civil engineering projects and 3D visualization work.',
}

export default function ContactPage() {
  return (
    <div className="pt-20">
      {/* Page header */}
      <div className="relative overflow-hidden bg-charcoal py-24">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(201,168,76,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <AnimateIn>
            <p className="text-[0.7rem] tracking-[0.35em] uppercase text-gold mb-4">Get in Touch</p>
            <h1
              className="font-display font-light text-text-primary"
              style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 7vw, 6rem)' }}
            >
              Start a
              <br />
              <span className="text-gradient-gold italic">Conversation</span>
            </h1>
          </AnimateIn>
        </div>
      </div>

      <ContactSection />
    </div>
  )
}
