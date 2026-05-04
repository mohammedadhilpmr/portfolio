'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { projects } from '@/lib/data'
import AnimateIn from '@/components/ui/AnimateIn'
import SectionHeader from '@/components/ui/SectionHeader'

export default function ProjectsPreview() {
  const featured = projects.slice(0, 3)

  return (
    <section className="section-pad relative overflow-hidden" id="projects">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <SectionHeader
            eyebrow="Portfolio"
            title="Selected Projects"
            subtitle="A curated selection of infrastructure, structural, and research works."
          />
          <AnimateIn delay={0.3}>
            <Link href="/projects" className="btn-outline-gold shrink-0 self-start md:self-auto mb-16">
              All Projects →
            </Link>
          </AnimateIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((project, i) => (
            <AnimateIn key={project.id} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="glass border-gold-subtle group relative overflow-hidden h-full flex flex-col"
              >
                {/* Top bar animation */}
                <span className="absolute top-0 left-0 w-0 h-px bg-gradient-gold group-hover:w-full transition-all duration-700" />

                {/* Year + category bar */}
                <div className="px-8 py-5 border-b border-border/30 flex items-center justify-between">
                  <span className="text-[0.65rem] tracking-[0.25em] uppercase text-text-muted">
                    {project.category}
                  </span>
                  <span className="text-gold font-mono text-xs">{project.year}</span>
                </div>

                {/* Content */}
                <div className="p-8 flex-1 flex flex-col gap-4">
                  <div className="space-y-1">
                    <span className="tag-pill text-[0.6rem]">{project.highlight}</span>
                  </div>

                  <h3
                    className="font-display font-light text-xl text-text-primary group-hover:text-gradient-gold transition-all duration-300 leading-snug"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {project.title}
                  </h3>

                  <p className="text-text-muted text-sm leading-relaxed line-clamp-3 flex-1">
                    {project.description}
                  </p>

                  {/* Location */}
                  <div className="flex items-center gap-2 text-text-muted text-xs pt-2 border-t border-border/20">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>{project.location}</span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="tag-pill text-[0.6rem]">{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Bottom accent */}
                <span className="absolute bottom-0 right-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-700 delay-100" />
              </motion.div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
