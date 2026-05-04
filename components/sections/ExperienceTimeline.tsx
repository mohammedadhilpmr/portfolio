'use client'

import { motion } from 'framer-motion'
import { experiences } from '@/lib/data'
import AnimateIn from '@/components/ui/AnimateIn'
import SectionHeader from '@/components/ui/SectionHeader'

export default function ExperienceTimeline() {
  return (
    <section className="section-pad bg-charcoal relative overflow-hidden" id="experience">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeader
          eyebrow="Experience"
          title="Professional Journey"
          subtitle="Building expertise through diverse engineering challenges across infrastructure, structural, and visualization domains."
        />

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold/40 via-gold/20 to-transparent" />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <AnimateIn key={exp.id} delay={i * 0.15}>
                <div className={`relative flex gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 top-8 -translate-x-1/2 z-10">
                    <motion.div
                      whileInView={{ scale: [0, 1.3, 1] }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.15 }}
                      className={`w-4 h-4 rounded-full border-2 ${exp.current ? 'bg-gold border-gold' : 'bg-graphite border-border'} relative`}
                    >
                      {exp.current && (
                        <span className="absolute inset-0 rounded-full animate-ping bg-gold/30" />
                      )}
                    </motion.div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block w-1/2" />

                  {/* Card */}
                  <div className="ml-12 md:ml-0 md:w-1/2 md:px-10">
                    <motion.div
                      whileHover={{ x: i % 2 === 0 ? 6 : -6 }}
                      transition={{ duration: 0.3 }}
                      className="glass border-gold-subtle p-8 relative group"
                    >
                      {/* Corner accent */}
                      <span className="absolute top-0 left-0 w-8 h-px bg-gold" />
                      <span className="absolute top-0 left-0 w-px h-8 bg-gold" />

                      {/* Header */}
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            {exp.current && (
                              <span className="tag-pill text-[0.55rem]">Current</span>
                            )}
                            <span className="text-[0.65rem] tracking-[0.2em] uppercase text-text-muted">
                              {exp.type}
                            </span>
                          </div>
                          <h3
                            className="font-display text-xl font-medium text-text-primary"
                            style={{ fontFamily: 'var(--font-display)' }}
                          >
                            {exp.role}
                          </h3>
                          <p className="text-gold text-sm mt-1">{exp.company}</p>
                        </div>
                        <span className="text-text-muted text-xs font-mono shrink-0">{exp.period}</span>
                      </div>

                      <div className="divider-gold mb-4" />

                      <p className="text-text-secondary text-sm leading-relaxed mb-5">
                        {exp.description}
                      </p>

                      {/* Highlights */}
                      <ul className="space-y-2">
                        {exp.highlights.map((h) => (
                          <li key={h} className="flex items-start gap-3 text-text-muted text-xs">
                            <span className="text-gold mt-0.5 shrink-0">◆</span>
                            {h}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
