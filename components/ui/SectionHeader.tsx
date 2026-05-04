import AnimateIn from './AnimateIn'

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: string
  centered?: boolean
}

export default function SectionHeader({ eyebrow, title, subtitle, centered = false }: SectionHeaderProps) {
  return (
    <div className={`mb-16 ${centered ? 'text-center' : ''}`}>
      {eyebrow && (
        <AnimateIn delay={0}>
          <p className="text-[0.7rem] tracking-[0.35em] uppercase text-gold font-medium mb-4 flex items-center gap-3">
            {!centered && <span className="w-8 h-px bg-gold inline-block" />}
            {eyebrow}
            {!centered && <span className="w-8 h-px bg-gold inline-block" />}
            {centered && (
              <>
                <span className="w-8 h-px bg-gold inline-block order-first" />
                <span className="w-8 h-px bg-gold inline-block" />
              </>
            )}
          </p>
        </AnimateIn>
      )}
      <AnimateIn delay={0.1}>
        <h2
          className="font-display font-light leading-tight text-text-primary"
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)' }}
        >
          {title}
        </h2>
      </AnimateIn>
      {subtitle && (
        <AnimateIn delay={0.2}>
          <p className="mt-4 text-text-secondary leading-relaxed max-w-2xl text-base" style={{ marginLeft: centered ? 'auto' : undefined, marginRight: centered ? 'auto' : undefined }}>
            {subtitle}
          </p>
        </AnimateIn>
      )}
      <AnimateIn delay={0.25}>
        <div className={`mt-6 divider-gold ${centered ? 'mx-auto' : ''}`} />
      </AnimateIn>
    </div>
  )
}
