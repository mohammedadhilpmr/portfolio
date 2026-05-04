'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { skillCategories, softwareStack } from '@/lib/data'
import AnimateIn from '@/components/ui/AnimateIn'
import SectionHeader from '@/components/ui/SectionHeader'

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true })
  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-text-secondary text-sm">{name}</span>
        <span className="text-gold text-xs font-mono">{level}%</span>
      </div>
      <div className="h-px bg-border/60 relative overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-y-0 left-0"
          style={{ background: 'linear-gradient(90deg, #9a7a2e, #c9a84c, #e8c97a)' }}
        />
      </div>
    </div>
  )
}

export default function SkillsSection() {
  return (
    <section className="section-pad bg-charcoal relative overflow-hidden" id="skills">
      {/* Decorative */}
      <div className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(201,168,76,1) 0%, transparent 50%)`,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeader
          eyebrow="Expertise"
          title="Skills & Technical Proficiency"
          subtitle="A comprehensive toolkit honed through academic excellence and real-world project execution."
          centered
        />

        {/* Skill categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((cat, ci) => (
            <AnimateIn key={cat.title} delay={ci * 0.1}>
              <div className="glass border-gold-subtle p-8 relative group hover:border-gold/30 transition-all duration-500">
                {/* Corner */}
                <span className="absolute top-0 left-0 w-0 h-px bg-gold transition-all duration-500 group-hover:w-full" />
                <span className="absolute bottom-0 right-0 w-0 h-px bg-gold transition-all duration-500 group-hover:w-full" />

                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl text-gold">{cat.icon}</span>
                  <h3
                    className="font-display text-xl font-light text-text-primary"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {cat.title}
                  </h3>
                </div>

                <div className="space-y-4">
                  {cat.skills.map((skill, si) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      delay={ci * 0.1 + si * 0.08}
                    />
                  ))}
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>

        {/* Software stack */}
        <AnimateIn delay={0.2}>
          <div className="border-t border-border/30 pt-12">
            <p className="text-[0.7rem] tracking-[0.3em] uppercase text-gold mb-8 text-center">
              Software & Tools
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {softwareStack.map((sw, i) => (
                <motion.div
                  key={sw.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.5 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="glass border-gold-subtle p-5 text-center group cursor-default"
                >
                  <p className="text-text-primary font-medium text-sm mb-1 group-hover:text-gold transition-colors duration-300">
                    {sw.name}
                  </p>
                  <p className="text-text-muted text-xs mb-2">{sw.category}</p>
                  <span className="tag-pill text-[0.6rem]">{sw.proficiency}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
