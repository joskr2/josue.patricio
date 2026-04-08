import { motion } from 'motion/react'

import { Card } from '@/components/Card'
import { Container } from '@/components/Container'
import { ProjectShowcase } from '@/components/ProjectShowcase'
import { GitHubIcon, LinkedInIcon, MailIcon } from '@/components/SocialIcons'
import { TechBadge } from '@/components/TechBadge'
import { useTranslation } from '@/hooks/useTranslation'
import { useTypewriter } from '@/hooks/useTypewriter'
import type { Project } from '@/lib/projects-data'
import { ImageCarousel } from '@/components/ImageCarousel'

type Props = {
  personalInfo: {
    name: string
    title: { en: string; es: string }
    location: { en: string; es: string }
    email: string
    phone: string
    linkedin: string
    github: string
    summary: { en: string; es: string }
    portraitImage: string
  }
  featuredProject: Project | undefined
  galleryImages: Array<{ src: string; alt: string }>
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
    },
  },
}

function SocialLink({
  icon: Icon,
  href,
  children,
  ...props
}: {
  icon: React.ComponentType<{ className?: string }>
  href: string
  children?: React.ReactNode
  'aria-label'?: string
  target?: string
  rel?: string
}) {
  const isExternal = href.startsWith('http') || href.startsWith('mailto')
  const shouldOpenNewTab = !href.startsWith('mailto') && !href.startsWith('/')

  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      <a
        className="group -m-1 p-1"
        href={href}
        target={shouldOpenNewTab ? '_blank' : undefined}
        rel={shouldOpenNewTab ? 'noopener noreferrer' : undefined}
        aria-label={props['aria-label']}
        {...props}
      >
        <Icon className="h-6 w-6 fill-zinc-500 transition-colors duration-300 group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
        {children && (
          <span className="ml-4 text-sm font-medium text-zinc-800 dark:text-zinc-200">
            {children}
          </span>
        )}
      </a>
    </motion.div>
  )
}

export function HomeClient({
  personalInfo,
  featuredProject,
  galleryImages,
}: Props) {
  const { t, locale } = useTranslation()
  const { displayText: typedName, isComplete } = useTypewriter({
    text: personalInfo.name,
    speed: 100,
    delay: 300,
  })

  const carouselItems = galleryImages.map((img, i) => ({
    src: img.src,
    alt: img.alt || `image${i + 1}`,
  }))

  return (
    <>
      <Container className="mt-9">
        <motion.div
          className="max-w-2xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="min-h-[4rem] text-5xl font-bold tracking-tight text-zinc-800 sm:min-h-[5rem] sm:text-6xl lg:min-h-[6rem] lg:text-7xl dark:text-zinc-100"
            variants={itemVariants}
          >
            {typedName}
            {isComplete ? null : (
              <motion.span
                className="text-teal-600 dark:text-teal-400"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                |
              </motion.span>
            )}
          </motion.h1>
          <motion.p
            className="mt-4 text-xl text-teal-600 sm:text-2xl dark:text-teal-400"
            variants={itemVariants}
          >
            {personalInfo.title[locale]}
          </motion.p>
          <motion.p
            className="mt-6 text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-400"
            variants={itemVariants}
          >
            {personalInfo.summary[locale]}
          </motion.p>
          <motion.div className="mt-6 flex gap-6" variants={itemVariants}>
            <SocialLink
              href={`mailto:${personalInfo.email}`}
              aria-label="Send email"
              icon={MailIcon}
            />
            <SocialLink
              href={personalInfo.github}
              aria-label="Follow on GitHub"
              icon={GitHubIcon}
              target="_blank"
              rel="noopener noreferrer"
            />
            <SocialLink
              href={personalInfo.linkedin}
              aria-label="Follow on LinkedIn"
              icon={LinkedInIcon}
              target="_blank"
              rel="noopener noreferrer"
            />
          </motion.div>
        </motion.div>
      </Container>

      <Container className="mt-16 sm:mt-20">
        <motion.div
          className="mx-auto grid max-w-xl grid-cols-1 gap-y-8 lg:max-w-none lg:grid-cols-2"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="flex justify-center lg:justify-end lg:pr-8"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <motion.div
              className="relative aspect-square w-80 rotate-2 overflow-hidden rounded-2xl bg-zinc-100 lg:w-96 lg:rotate-2 dark:bg-zinc-800"
              whileHover={{ rotate: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <img
                src={typeof personalInfo.portraitImage === 'string'
                  ? personalInfo.portraitImage
                  : '/portrait.webp'}
                alt={personalInfo.name}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </motion.div>
          </motion.div>

          <motion.div
            className="lg:pl-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="mx-auto max-w-xs px-2.5 lg:max-w-none">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ rotate: 1 }}
              >
                <ImageCarousel
                  className="w-full"
                  items={carouselItems}
                  intervalMs={30000}
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </Container>

      <Container className="mt-24 mb-24 sm:mb-32 md:mt-28">
        <motion.div
          className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="flex flex-col gap-16"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {featuredProject && (
              <>
                <motion.h2
                  className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  {t('home.featuredProject')}
                </motion.h2>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.02,
                    transition: { type: 'spring', stiffness: 300, damping: 30 },
                  }}
                >
                  <ProjectShowcase project={featuredProject} />
                </motion.div>
              </>
            )}
          </motion.div>

          <motion.div
            className="space-y-10 lg:pl-16 xl:pl-24"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <Card as="div">
                <Card.Title as="h2">{t('about.skills')}</Card.Title>
                <Card.Description>{t('home.subtitle')}</Card.Description>
                <div className="mt-6 space-y-4">
                  <div>
                    <h4 className="mb-2 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                      Frontend
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {[
                        'React.js',
                        'Next.js',
                        'TypeScript',
                        'Tailwind CSS',
                      ].map((tech) => (
                        <TechBadge key={tech} variant="primary">
                          {tech}
                        </TechBadge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-2 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                      Backend
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {['Python', 'FastAPI', '.NET', 'Node.js'].map((tech) => (
                        <TechBadge key={tech} variant="secondary">
                          {tech}
                        </TechBadge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-2 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                      Infrastructure
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {['AWS', 'Docker', 'PostgreSQL', 'Redis'].map((tech) => (
                        <TechBadge key={tech}>{tech}</TechBadge>
                      ))}
                    </div>
                  </div>
                </div>
                <Card.Cta href="/about">{t('nav.about')}</Card.Cta>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </>
  )
}