'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '@/lib/data'
import AnimateIn from '@/components/ui/AnimateIn'
import SectionHeader from '@/components/ui/SectionHeader'

const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))]

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory)

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
            <p className="text-[0.7rem] tracking-[0.35em] uppercase text-gold mb-4">Portfolio</p>
            <h1
              className="font-display font-light text-text-primary"
              style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 7vw, 6rem)' }}
            >
              Projects &
              <br />
              <span className="text-gradient-gold italic">Deliverables</span>
            </h1>
          </AnimateIn>
        </div>
      </div>

      <section className="section-pad">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {/* Filter tabs */}
          <AnimateIn delay={0.1}>
            <div className="flex flex-wrap gap-3 mb-12">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-[0.7rem] tracking-[0.15em] uppercase px-5 py-2.5 border transition-all duration-300 ${
                    activeCategory === cat
                      ? 'border-gold bg-gold/10 text-gold'
                      : 'border-border/50 text-text-muted hover:border-gold/30 hover:text-text-secondary'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </AnimateIn>

          {/* Projects grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                >
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.3 }}
                    className="glass border-gold-subtle group relative overflow-hidden h-full flex flex-col"
                  >
                    {/* Top line animation */}
                    <span className="absolute top-0 left-0 w-0 h-0.5 bg-gradient-to-r from-gold-dark to-gold group-hover:w-full transition-all duration-700" />

                    {/* Header */}
                    <div className="px-8 py-5 border-b border-border/30 flex items-center justify-between">
                      <span className="text-[0.65rem] tracking-[0.2em] uppercase text-text-muted">
                        {project.category}
                      </span>
                      <span className="text-gold font-mono text-xs">{project.year}</span>
                    </div>

                    {/* Body */}
                    <div className="p-8 flex-1 flex flex-col gap-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-2">
                          <span className="tag-pill text-[0.6rem]">{project.highlight}</span>
                          <h2
                            className="font-display text-2xl font-light text-text-primary leading-snug group-hover:text-gradient-gold transition-all duration-300"
                            style={{ fontFamily: 'var(--font-display)' }}
                          >
                            {project.title}
                          </h2>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-text-muted text-xs">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        <span>{project.location}</span>
                      </div>

                      <p className="text-text-secondary text-sm leading-relaxed flex-1">
                        {project.description}
                      </p>

                      {/* Outcomes */}
                      <div className="border-t border-border/30 pt-5">
                        <p className="text-[0.65rem] tracking-[0.2em] uppercase text-gold/70 mb-3">Key Outcomes</p>
                        <ul className="space-y-2">
                          {project.outcomes.map((outcome) => (
                            <li key={outcome} className="flex items-start gap-3 text-text-muted text-xs">
                              <span className="text-gold mt-0.5 shrink-0">◆</span>
                              {outcome}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map(tag => (
                          <span key={tag} className="tag-pill text-[0.6rem]">{tag}</span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom line */}
                    <span className="absolute bottom-0 right-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-700 delay-100" />
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  )
}
