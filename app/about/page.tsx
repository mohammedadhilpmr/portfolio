import type { Metadata } from 'next'
import AboutSection from '@/components/sections/AboutSection'
import SkillsSection from '@/components/sections/SkillsSection'
import { education, siteData } from '@/lib/data'
import AnimateIn from '@/components/ui/AnimateIn'
import SectionHeader from '@/components/ui/SectionHeader'

export const metadata: Metadata = {
  title: 'About — Mohammed Adhil P P',
  description: 'Learn about Mohammed Adhil P P, Civil Engineer and 3D Visualization Specialist from Kerala, India.',
}

export default function AboutPage() {
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
            <p className="text-[0.7rem] tracking-[0.35em] uppercase text-gold mb-4">About</p>
            <h1
              className="font-display font-light text-text-primary"
              style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 7vw, 6rem)' }}
            >
              The Engineer
              <br />
              <span className="text-gradient-gold italic">Behind the Work</span>
            </h1>
          </AnimateIn>
        </div>
      </div>

      <AboutSection />
      <SkillsSection />

      {/* Education */}
      <section className="section-pad bg-charcoal">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionHeader
            eyebrow="Education"
            title="Academic Foundation"
            subtitle="Building theoretical depth through structured engineering education."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {education.map((edu, i) => (
              <AnimateIn key={edu.id} delay={i * 0.1}>
                <div className="glass border-gold-subtle p-8 relative group hover:border-gold/30 transition-all duration-500">
                  <span className="absolute top-0 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-600" />

                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3
                        className="font-display text-lg font-medium text-text-primary mb-1"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {edu.degree}
                      </h3>
                      <p className="text-text-secondary text-sm">{edu.institution}</p>
                    </div>
                    <div className="shrink-0 text-right">
                      <span className="text-gold font-mono text-xs block">{edu.period}</span>
                      <span className={`tag-pill text-[0.55rem] mt-1 ${edu.status === 'ongoing' ? 'border-gold/50 text-gold' : 'border-border text-text-muted'}`}>
                        {edu.status === 'ongoing' ? 'Ongoing' : 'Completed'}
                      </span>
                    </div>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
