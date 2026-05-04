'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { siteData, stats } from '@/lib/data'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        {/* Geometric grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(201,168,76,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(201,168,76,0.5) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
        {/* Radial gradient */}
        <div className="absolute top-0 right-0 w-[70%] h-full bg-gradient-radial from-[rgba(201,168,76,0.04)] via-transparent to-transparent" />
        {/* Large typography backdrop */}
        <div
          className="absolute bottom-0 right-0 text-[18vw] font-light leading-none select-none pointer-events-none"
          style={{
            fontFamily: 'var(--font-display)',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(201,168,76,0.06)',
            right: '-2vw',
            bottom: '-2vw',
          }}
        >
          CE
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Eyebrow */}
            <motion.div variants={itemVariants} className="flex items-center gap-3">
              <div className="dot-glow" />
              <span className="text-[0.68rem] tracking-[0.35em] uppercase text-gold font-medium">
                Available for Projects
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.div variants={itemVariants} className="space-y-2">
              <h1
                className="font-display font-light leading-[0.95] text-text-primary"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(3.5rem, 7vw, 7rem)',
                }}
              >
                MOHAMMED
                <br />
                <span className="text-gradient-gold italic">ADHIL </span>
                <span className="text-text-secondary" style={{ fontSize: '1em', letterSpacing: '0.05em', fontStyle: 'normal' }}>
                   P P
                </span>
              </h1>
            </motion.div>

            {/* Role */}
            <motion.div variants={itemVariants} className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="w-8 h-px bg-gold" />
                <p className="text-[0.8rem] tracking-[0.25em] uppercase text-text-secondary font-medium">
                  {siteData.role}
                </p>
              </div>
              <p className="text-[0.8rem] tracking-[0.2em] uppercase text-gold ml-11">
                {siteData.specialization}
              </p>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-text-secondary leading-relaxed max-w-md text-[0.95rem]"
            >
              {siteData.bioShort}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <Link href="/projects" className="btn-gold">
                View Projects
              </Link>
              <Link href="/contact" className="btn-outline-gold">
                Get In Touch
              </Link>
              <a
                href="/assets/Mohammed_Adhil_CV.pdf"
                download
                className="btn-outline-gold flex items-center gap-2"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                </svg>
                Download CV
              </a>
            </motion.div>

            {/* Location */}
            <motion.div variants={itemVariants} className="flex items-center gap-2 text-text-muted text-sm">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span className="tracking-wider">{siteData.location}</span>
            </motion.div>
          </motion.div>

          {/* Photo panel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex justify-center"
          >
            <div className="relative">
              {/* Outer glow ring */}
              <div className="absolute inset-0 rounded-none"
                style={{ boxShadow: '0 0 80px rgba(201,168,76,0.08)' }}
              />

              {/* Corner accents */}
              <span className="absolute -top-3 -left-3 w-10 h-px bg-gold z-10" />
              <span className="absolute -top-3 -left-3 w-px h-10 bg-gold z-10" />
              <span className="absolute -bottom-3 -right-3 w-10 h-px bg-gold z-10" />
              <span className="absolute -bottom-3 -right-3 w-px h-10 bg-gold z-10" />

              {/* Photo frame */}
              <div className="relative w-80 h-[480px] overflow-hidden border border-border/40">
                {/* Gold overlay tint at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-transparent z-10" />

                <Image
                  src="/adhil.png"
                  alt="Mohammed Adhil P P — Civil Engineer"
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="320px"
                />

                {/* Name badge at bottom */}
                <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
                  <p className="text-[0.6rem] tracking-[0.3em] uppercase text-gold mb-1">Civil Engineer</p>
                  <p
                    className="font-display text-lg font-light text-text-primary"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    Mohammed Adhil P P
                  </p>
                </div>
              </div>

              {/* Floating stats card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-10 -left-14 glass border-gold-subtle p-5 w-44 z-20"
              >
                <span className="absolute top-0 left-0 w-4 h-px bg-gold" />
                <span className="absolute top-0 left-0 w-px h-4 bg-gold" />
                <div className="space-y-3">
                  {stats.slice(0, 2).map((stat) => (
                    <div key={stat.label}>
                      <p
                        className="text-xl font-light text-gradient-gold"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {stat.value}{stat.suffix}
                      </p>
                      <p className="text-text-muted text-[0.6rem] tracking-widest uppercase">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Floating software card */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -top-6 -right-12 glass border-gold-subtle p-4 w-40 z-20"
              >
                <span className="absolute bottom-0 right-0 w-4 h-px bg-gold" />
                <span className="absolute bottom-0 right-0 w-px h-4 bg-gold" />
                <p className="text-[0.6rem] tracking-[0.2em] uppercase text-gold mb-2">Stack</p>
                {['AutoCAD', 'SketchUp', 'STAAD Pro'].map(s => (
                  <p key={s} className="text-text-secondary text-xs leading-relaxed">{s}</p>
                ))}
              </motion.div>
            </div>
          </motion.div>

        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[0.6rem] tracking-[0.3em] uppercase text-text-muted">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-10 bg-gradient-to-b from-gold/50 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  )
}
