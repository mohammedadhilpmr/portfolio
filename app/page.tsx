import Hero from '@/components/sections/Hero'
import AboutSection from '@/components/sections/AboutSection'
import SkillsSection from '@/components/sections/SkillsSection'
import ProjectsPreview from '@/components/sections/ProjectsPreview'
import ExperienceTimeline from '@/components/sections/ExperienceTimeline'
import ContactSection from '@/components/sections/ContactSection'

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <SkillsSection />
      <ProjectsPreview />
      <ExperienceTimeline />
      <ContactSection />
    </>
  )
}
