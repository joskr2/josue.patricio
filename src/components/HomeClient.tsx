'use client'

import { Download } from 'lucide-react'
import { motion } from 'motion/react'
import type { StaticImageData } from 'next/image'
import Link from 'next/link'

import { Card } from '@/components/Card'
import { Container } from '@/components/Container'
import { ImageCarousel } from '@/components/ImageCarousel'
import { ProjectShowcase } from '@/components/ProjectShowcase'
import { ReadMore } from '@/components/ReadMore'
import { GitHubIcon, LinkedInIcon, MailIcon } from '@/components/SocialIcons'
import { TechBadge } from '@/components/TechBadge'
import { useTranslation } from '@/hooks/useTranslation'
import { localizedPath } from '@/lib/i18n'
import { cv, skills } from '@/lib/personal-data'
import type { Project } from '@/lib/projects-data'

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
    portraitImage: StaticImageData | string
  }
  featuredProject: Project | undefined
  galleryImages: Array<{ src: StaticImageData | string }>
}

// Hoisted motion variants
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
}: React.ComponentPropsWithoutRef<typeof Link> & {
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      <Link className="group -m-1 p-1" href={href} {...props}>
        <Icon className="h-6 w-6 fill-zinc-500 transition-colors duration-300 group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
        {children && (
          <span className="ml-4 font-medium text-sm text-zinc-800 dark:text-zinc-200">
            {children}
          </span>
        )}
      </Link>
    </motion.div>
  )
}

export function HomeClient({
  personalInfo,
  featuredProject,
  galleryImages,
}: Props) {
  const { t, tArray, locale } = useTranslation()

  const galleryAlts = tArray('gallery.alts')
  // One carousel for every breakpoint. The portrait opens the gallery, so the
  // page no longer mounts a second hidden copy of it behind the other layout.
  const carouselItems = [
    { src: personalInfo.portraitImage, alt: personalInfo.name },
    ...galleryImages.map((img, i) => ({
      src: img.src,
      alt: galleryAlts[i] ?? '',
    })),
  ]

  return (
    <>
      {/* Hero Section */}
      <Container className="mt-9">
        <div className="lg:grid lg:grid-cols-[1.35fr_1fr] lg:items-start lg:gap-x-16">
          <motion.div
            className="max-w-2xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              className="font-bold text-[clamp(1.875rem,6.5vw,4.5rem)] text-zinc-800 leading-[1.05] tracking-tight dark:text-zinc-100"
              variants={itemVariants}
            >
              {personalInfo.name}
            </motion.h1>
            <motion.p
              className="mt-4 text-[clamp(1.0625rem,3.2vw,1.5rem)] text-teal-600 dark:text-teal-400"
              variants={itemVariants}
            >
              {personalInfo.title[locale]}
            </motion.p>
            <ReadMore variants={itemVariants}>
              {personalInfo.summary[locale]}
            </ReadMore>
            <motion.div className="mt-6 flex gap-6" variants={itemVariants}>
              <SocialLink
                href={`mailto:${personalInfo.email}`}
                aria-label={t('a11y.sendEmail')}
                icon={MailIcon}
              />
              <SocialLink
                href={personalInfo.github}
                aria-label={t('a11y.followOnGitHub')}
                icon={GitHubIcon}
                target="_blank"
                rel="noopener noreferrer"
              />
              <SocialLink
                href={personalInfo.linkedin}
                aria-label={t('a11y.followOnLinkedIn')}
                icon={LinkedInIcon}
                target="_blank"
                rel="noopener noreferrer"
              />
            </motion.div>
            <motion.div
              className="mt-8 flex flex-wrap items-center gap-3"
              variants={itemVariants}
            >
              <a
                href={cv[locale].href}
                download={cv[locale].downloadName}
                className="inline-flex items-center gap-2 rounded-full bg-teal-600 px-5 py-2.5 font-semibold text-sm text-white shadow-sm transition hover:bg-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-600 focus-visible:outline-offset-2 dark:bg-teal-500 dark:hover:bg-teal-400"
              >
                <Download aria-hidden="true" className="h-4 w-4" />
                {t('home.downloadCV')}
              </a>
              <Link
                href={localizedPath(locale, '/contact')}
                className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-5 py-2.5 font-semibold text-sm text-zinc-800 transition hover:border-teal-500 hover:text-teal-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-600 focus-visible:outline-offset-2 dark:border-zinc-600 dark:text-zinc-200 dark:hover:border-teal-400 dark:hover:text-teal-300"
              >
                {t('home.getInTouch')}
              </Link>
            </motion.div>
          </motion.div>
          <div className="mt-12 lg:mt-0 lg:rotate-1 lg:transition-transform lg:duration-300 lg:hover:rotate-0">
            <ImageCarousel
              className="w-full"
              items={carouselItems}
              intervalMs={30000}
              sizes="(min-width: 1024px) 26rem, 100vw"
              priority
            />
          </div>
        </div>
      </Container>

      <Container className="mt-24 mb-24 sm:mb-32 md:mt-28">
        <motion.div
          className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Featured Project */}
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
                  className="font-bold text-2xl text-zinc-800 tracking-tight dark:text-zinc-100"
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

          {/* Skills and Contact */}
          <motion.div
            className="space-y-10 lg:pl-16 xl:pl-24"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {/* Skills Overview */}
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
                    <h3 className="mb-2 font-semibold text-sm text-zinc-800 dark:text-zinc-200">
                      Frontend
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.highlights.frontend.map((tech) => (
                        <TechBadge key={tech} variant="primary">
                          {tech}
                        </TechBadge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold text-sm text-zinc-800 dark:text-zinc-200">
                      Backend
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.highlights.backend.map((tech) => (
                        <TechBadge key={tech} variant="secondary">
                          {tech}
                        </TechBadge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold text-sm text-zinc-800 dark:text-zinc-200">
                      Infrastructure
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.highlights.infrastructure.map((tech) => (
                        <TechBadge key={tech}>{tech}</TechBadge>
                      ))}
                    </div>
                  </div>
                </div>
                <Card.Cta href={localizedPath(locale, '/about')}>
                  {t('nav.about')}
                </Card.Cta>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </>
  )
}
