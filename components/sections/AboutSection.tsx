'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { siteData, stats } from '@/lib/data'
import AnimateIn from '@/components/ui/AnimateIn'
import SectionHeader from '@/components/ui/SectionHeader'

export default function AboutSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section className="section-pad relative overflow-hidden" id="about">
      {/* BG text */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 text-[15vw] font-light select-none pointer-events-none opacity-[0.02]"
        style={{ fontFamily: 'var(--font-display)', WebkitTextStroke: '1px #c9a84c' }}
      >
        ABOUT
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left: visual */}
          <AnimateIn direction="right" delay={0.1}>
            <div className="relative">
              {/* Main card */}
              <div className="glass border-gold-subtle p-10 relative">
                <span className="absolute top-0 left-0 w-12 h-px bg-gold" />
                <span className="absolute top-0 left-0 w-px h-12 bg-gold" />
                <span className="absolute bottom-0 right-0 w-12 h-px bg-gold" />
                <span className="absolute bottom-0 right-0 w-px h-12 bg-gold" />

              
                {/* Info rows */}
                <div className="space-y-4 mt-6 border-t border-border/30 pt-6">
                  {[
                    { label: 'Name', value: siteData.name },
                    { label: 'Role', value: `${siteData.role} · ${siteData.specialization}` },
                    { label: 'Location', value: siteData.location },
                    { label: 'Email', value: siteData.email },
                    { label: 'Phone', value: siteData.phone },
                  ].map((item) => (
                    <div key={item.label} className="flex gap-4">
                      <span className="text-[0.65rem] tracking-[0.2em] uppercase text-gold/70 w-20 shrink-0 pt-0.5">
                        {item.label}
                      </span>
                      <span className="text-text-secondary text-sm break-all">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats row */}
              <div
                ref={ref}
                className="grid grid-cols-2 gap-4 mt-4"
              >
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="glass border-gold-subtle p-5 text-center"
                  >
                    <p
                      className="text-2xl font-light text-gradient-gold"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {stat.value}{stat.suffix}
                    </p>
                    <p className="text-text-muted text-xs tracking-widest uppercase mt-1">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimateIn>

          {/* Right: content */}
          <div className="space-y-8">
            <SectionHeader
              eyebrow="About Me"
              title="Engineering with Purpose & Precision"
            />

            <AnimateIn delay={0.3}>
              <p className="text-text-secondary leading-[1.9] text-[0.95rem]">
                {siteData.bio}
              </p>
            </AnimateIn>

            <AnimateIn delay={0.4}>
              <p className="text-text-secondary leading-[1.9] text-[0.95rem]">
                My approach blends technical rigor with creative visualization — translating complex structural concepts into compelling 3D renderings that communicate design intent to clients and stakeholders with clarity and precision.
              </p>
            </AnimateIn>

            {/* Expertise pills */}
            <AnimateIn delay={0.5}>
              <div className="flex flex-wrap gap-2">
                {['Structural Engineering', '3D Visualization', 'Site Supervision', 'Project Planning', 'AutoCAD', 'Quality Control'].map((tag) => (
                  <span key={tag} className="tag-pill">{tag}</span>
                ))}
              </div>
            </AnimateIn>

            {/* CTAs */}
            <AnimateIn delay={0.6}>
              <div className="flex gap-4 pt-2">
                <Link href="/experience" className="btn-gold">
                  My Journey
                </Link>
                <Link href="/contact" className="btn-outline-gold">
                  Contact Me
                </Link>
              </div>
            </AnimateIn>
          </div>
        </div>
      </div>
    </section>
  )
}
