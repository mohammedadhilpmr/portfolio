import Link from 'next/link'
import { siteData, navLinks } from '@/lib/data'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-obsidian border-t border-border/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3
              className="text-2xl font-light tracking-[0.2em] uppercase text-text-primary"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              MOHAMMED ADHIL P P
            </h3>
            <p className="text-text-muted text-sm leading-relaxed max-w-xs">
              Civil Engineer & Assistant Structural based in Malappuram, Kerala, India.
            </p>
            <div className="divider-gold" />
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="text-[0.7rem] tracking-[0.25em] uppercase text-gold font-medium">Navigation</h4>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="link-gold text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-[0.7rem] tracking-[0.25em] uppercase text-gold font-medium">Contact</h4>
            <div className="flex flex-col gap-3">
              <a href={`mailto:${siteData.email}`} className="link-gold text-sm break-all">
                {siteData.email}
              </a>
              <a href={`tel:${siteData.phone}`} className="link-gold text-sm">
                {siteData.phone}
              </a>
              <p className="text-text-muted text-sm">{siteData.location}</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border/30 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-xs tracking-wider">
            © {year} Mohammed Adhil P P. All rights reserved.
          </p>
          <p className="text-text-muted text-xs tracking-widest uppercase">
            Civil Engineer · Kerala, India
          </p>
        </div>
      </div>
    </footer>
  )
}
