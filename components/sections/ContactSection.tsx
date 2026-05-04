'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { siteData } from '@/lib/data'
import AnimateIn from '@/components/ui/AnimateIn'
import SectionHeader from '@/components/ui/SectionHeader'

const contactInfo = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: 'Email',
    value: siteData.email,
    href: `mailto:${siteData.email}`,
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012.18 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.09a16 16 0 006 6l.61-.61a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
    label: 'Phone',
    value: siteData.phone,
    href: `tel:${siteData.phone}`,
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: 'Location',
    value: siteData.location,
    href: '#',
  },
]

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    // Simulate submission — replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setStatus('sent')
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <section className="section-pad relative overflow-hidden" id="contact">
      {/* BG decoration */}
      <div
        className="absolute left-0 bottom-0 w-1/2 h-1/2 opacity-[0.02]"
        style={{ background: 'radial-gradient(circle at 0% 100%, rgba(201,168,76,1) 0%, transparent 60%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeader
          eyebrow="Contact"
          title="Let's Build Together"
          subtitle="Interested in collaboration or have a project in mind? Reach out and let's discuss how I can bring value to your next endeavor."
          centered
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact info */}
          <AnimateIn delay={0.1} className="lg:col-span-2">
            <div className="space-y-6">
              <div className="glass border-gold-subtle p-8 space-y-8">
                <span className="absolute top-0 left-0 w-8 h-px bg-gold" />

                {contactInfo.map((info) => (
                  <div key={info.label} className="flex items-start gap-5">
                    <div className="w-10 h-10 border border-border/60 flex items-center justify-center text-gold shrink-0 group-hover:border-gold transition-colors">
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-[0.65rem] tracking-[0.2em] uppercase text-gold/70 mb-1">{info.label}</p>
                      <a
                        href={info.href}
                        className="text-text-secondary text-sm hover:text-gold transition-colors duration-300 break-all"
                      >
                        {info.value}
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Availability card */}
              <div className="glass border-gold-subtle p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="dot-glow" />
                  <span className="text-[0.7rem] tracking-[0.2em] uppercase text-gold font-medium">
                    Available for Projects
                  </span>
                </div>
                <p className="text-text-muted text-sm leading-relaxed">
                  Currently open to full-time roles, structural consultancy, and 3D visualization commissions across Kerala & remote.
                </p>
              </div>

              {/* Download CV */}
              <a
                href="/assets/Mohammed_Adhil_CV.pdf"
                download
                className="btn-outline-gold w-full flex items-center justify-center gap-3"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                </svg>
                Download CV
              </a>
            </div>
          </AnimateIn>

          {/* Form */}
          <AnimateIn delay={0.2} className="lg:col-span-3">
            <div className="glass border-gold-subtle p-10 relative">
              <span className="absolute top-0 left-0 w-12 h-px bg-gold" />
              <span className="absolute top-0 left-0 w-px h-12 bg-gold" />
              <span className="absolute bottom-0 right-0 w-12 h-px bg-gold" />
              <span className="absolute bottom-0 right-0 w-px h-12 bg-gold" />

              {status === 'sent' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16 space-y-4"
                >
                  <div className="w-16 h-16 border border-gold/50 flex items-center justify-center mx-auto text-gold text-2xl">
                    ✓
                  </div>
                  <h3 className="font-display text-2xl text-text-primary" style={{ fontFamily: 'var(--font-display)' }}>
                    Message Sent
                  </h3>
                  <p className="text-text-muted text-sm">Thank you for reaching out. I'll respond within 24 hours.</p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="btn-outline-gold mt-4"
                  >
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[0.65rem] tracking-[0.2em] uppercase text-gold/70 block">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                        className="input-dark"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[0.65rem] tracking-[0.2em] uppercase text-gold/70 block">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                        className="input-dark"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[0.65rem] tracking-[0.2em] uppercase text-gold/70 block">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="Project inquiry, collaboration..."
                      required
                      className="input-dark"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[0.65rem] tracking-[0.2em] uppercase text-gold/70 block">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project..."
                      required
                      rows={6}
                      className="input-dark resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn-gold w-full flex items-center justify-center gap-3"
                  >
                    {status === 'sending' ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="inline-block w-4 h-4 border-2 border-obsidian/30 border-t-obsidian rounded-full"
                        />
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              )}
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  )
}
