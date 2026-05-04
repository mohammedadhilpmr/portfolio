import type { Metadata } from 'next'
import ExperienceTimeline from '@/components/sections/ExperienceTimeline'
import { education } from '@/lib/data'
import AnimateIn from '@/components/ui/AnimateIn'
import SectionHeader from '@/components/ui/SectionHeader'

export const metadata: Metadata = {
  title: 'Experience — Mohammed Adhil P P',
  description: 'Professional experience and educational background of Mohammed Adhil P P.',
}

export default function ExperiencePage() {
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
        <div
          className="absolute right-0 bottom-0 text-[15vw] font-light select-none pointer-events-none opacity-[0.025]"
          style={{ fontFamily: 'var(--font-display)', WebkitTextStroke: '1px #c9a84c' }}
        >
          EXP
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <AnimateIn>
            <p className="text-[0.7rem] tracking-[0.35em] uppercase text-gold mb-4">Career</p>
            <h1
              className="font-display font-light text-text-primary"
              style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 7vw, 6rem)' }}
            >
              Experience &
              <br />
              <span className="text-gradient-gold italic">Education</span>
            </h1>
          </AnimateIn>
        </div>
      </div>

      <ExperienceTimeline />

      {/* Education */}
      <section className="section-pad">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionHeader
            eyebrow="Education"
            title="Academic Background"
            subtitle="Structured engineering education providing the theoretical foundation for practical excellence."
          />

          <div className="space-y-4">
            {education.map((edu, i) => (
              <AnimateIn key={edu.id} delay={i * 0.1}>
                <div className="glass border-gold-subtle p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group relative overflow-hidden">
                  <span className="absolute left-0 top-0 w-1 h-0 bg-gold group-hover:h-full transition-all duration-500" />

                  <div className="pl-4">
                    <h3
                      className="font-display text-xl font-medium text-text-primary mb-1"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {edu.degree}
                    </h3>
                    <p className="text-text-secondary text-sm">{edu.institution}</p>
                  </div>

                  <div className="pl-4 sm:pl-0 flex items-center gap-4 shrink-0">
                    <span className="text-gold font-mono text-sm">{edu.period}</span>
                    <span className={`tag-pill text-[0.6rem] ${edu.status === 'ongoing' ? 'border-gold/50 text-gold bg-gold/10' : ''}`}>
                      {edu.status === 'ongoing' ? '● Ongoing' : '✓ Completed'}
                    </span>
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
