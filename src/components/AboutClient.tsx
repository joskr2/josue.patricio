'use client'

import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import dynamic from 'next/dynamic'
import type { StaticImageData } from 'next/image'

import { Container } from '@/components/Container'
import { ExperienceCarousel } from '@/components/ExperienceCarousel'
import { SkillCategory } from '@/components/SkillCategory'
import { GitHubIcon, LinkedInIcon } from '@/components/SocialIcons'
import { useTranslation } from '@/hooks/useTranslation'
import { useTypewriter } from '@/hooks/useTypewriter'
import { Accordion } from '@/components/Accordion'
import { slugify } from '@/lib/slugify'
import { useRouter } from 'next/navigation'
import type { Experience } from '@/lib/experience-data'

const ExperienceCarouselDynamic = dynamic(
  () =>
    import('@/components/ExperienceCarousel').then((mod) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return mod.ExperienceCarousel || mod
    }),
  {
    loading: () => (
      <div className="h-48 animate-pulse rounded-xl bg-zinc-200 dark:bg-zinc-700" />
    ),
    ssr: false,
  },
) as unknown as React.ComponentType<{
  items: Experience[]
  className?: string
}>

type Props = {
  personalInfo: {
    name: string
    title: { en: string; es: string }
    summary: { en: string; es: string }
    email: string
    linkedin: string
    github: string
    portraitImage: StaticImageData | string
  }
  experiences: Experience[]
}

function SocialLink({
  className,
  href,
  children,
  icon: Icon,
}: Readonly<{
  className?: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}>) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

function MailIcon(props: Readonly<React.ComponentPropsWithoutRef<'svg'>>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

export function AboutClient({ personalInfo, experiences }: Props) {
  const { t, locale } = useTranslation()
  const { displayText: typedName, isComplete } = useTypewriter({
    text: personalInfo.name,
    speed: 100,
    delay: 300,
  })

  return (
    <Container className="mt-16 sm:mt-32">
      {/* Mobile Layout: Name first, then image */}
      <div className="block lg:hidden">
        <motion.div
          className="text-center sm:text-left"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="min-h-[3rem] text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            {typedName}
            {!isComplete && (
              <span className="animate-pulse text-teal-600 dark:text-teal-400">
                |
              </span>
            )}
          </h1>
          <motion.p
            className="mt-2 text-xl text-teal-600 dark:text-teal-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {personalInfo.title[locale]}
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-8 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.6,
            delay: 0.5,
            type: 'spring',
            stiffness: 200,
            damping: 20,
          }}
        >
          <motion.div
            className="max-w-xs px-2.5"
            whileHover={{
              scale: 1.05,
              rotate: -1,
              transition: { type: 'spring', stiffness: 300, damping: 30 },
            }}
          >
            <Image
              src={personalInfo.portraitImage}
              alt={personalInfo.name}
              sizes="20rem"
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            />
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-8 space-y-7 text-base text-zinc-600 dark:text-zinc-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <p>{personalInfo.summary[locale]}</p>
          <p>{t('about.intro')}</p>
        </motion.div>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <ul className="space-y-4">
            <SocialLink href={`mailto:${personalInfo.email}`} icon={MailIcon}>
              {personalInfo.email}
            </SocialLink>
            <SocialLink href={personalInfo.linkedin} icon={LinkedInIcon}>
              LinkedIn
            </SocialLink>
            <SocialLink href={personalInfo.github} icon={GitHubIcon}>
              GitHub
            </SocialLink>
          </ul>
        </motion.div>
      </div>

      {/* Desktop Layout: Original grid layout with typewriter effect */}
      <motion.div
        className="hidden lg:grid lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="lg:pl-20"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div
            className="max-w-xs px-2.5 lg:max-w-none"
            whileHover={{
              scale: 1.03,
              rotate: 1,
              transition: { type: 'spring', stiffness: 300, damping: 30 },
            }}
          >
            <Image
              src={personalInfo.portraitImage}
              alt={personalInfo.name}
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            />
          </motion.div>
        </motion.div>

        <motion.div
          className="lg:order-first lg:row-span-2"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h1 className="min-h-[4rem] text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            {typedName}
            {!isComplete && (
              <span className="animate-pulse text-teal-600 dark:text-teal-400">
                |
              </span>
            )}
          </h1>
          <motion.p
            className="mt-2 text-xl text-teal-600 dark:text-teal-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {personalInfo.title[locale]}
          </motion.p>
          <motion.div
            className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <p>{personalInfo.summary[locale]}</p>
            <p>{t('about.intro')}</p>
          </motion.div>
        </motion.div>

        <motion.div
          className="lg:pl-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <ul>
            <SocialLink href={`mailto:${personalInfo.email}`} icon={MailIcon}>
              {personalInfo.email}
            </SocialLink>
            <SocialLink href={personalInfo.linkedin} icon={LinkedInIcon}>
              LinkedIn
            </SocialLink>
            <SocialLink href={personalInfo.github} icon={GitHubIcon}>
              GitHub
            </SocialLink>
          </ul>
        </motion.div>
      </motion.div>

      {/* Experience Section */}
      <motion.div
        className="mt-16 sm:mt-24"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="mx-auto max-w-7xl">
          {/* Mobile View: carousel only */}
          <motion.div
            className="block md:hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              {t('about.experience')}
            </motion.h2>
            <motion.div className="mt-4">
              <ExperienceCarousel items={experiences} />
            </motion.div>
          </motion.div>

          {/* Desktop View: link-like accordions mimicking mobile cards */}
          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              {t('about.experience')}
            </motion.h2>
            <div className="mt-6 space-y-3">
              {experiences.map((exp) => (
                <Link
                  key={`${exp.company}-${exp.start}`}
                  href={`/experiences/${slugify(exp.company)}`}
                  className="flex w-full items-center gap-3 rounded-lg bg-zinc-50 px-4 py-3 text-left shadow-sm transition-all duration-200 hover:bg-zinc-100 hover:shadow-md dark:bg-zinc-800/50 dark:hover:bg-zinc-800"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 text-sm font-bold text-white">
                    {exp.company.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-base font-semibold text-zinc-800 dark:text-zinc-100">
                      {exp.position[locale]}
                    </p>
                    <p className="truncate text-sm text-zinc-500 dark:text-zinc-400">
                      {exp.company} • {exp.duration[locale]}
                    </p>
                  </div>
                  <span className="text-sm font-medium text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300">
                    {t('about.viewDetail')}
                  </span>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Skills Section */}
      <motion.div
        className="mt-16 sm:mt-24"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="mx-auto max-w-7xl">
          <motion.h2
            className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {t('about.skills')}
          </motion.h2>
          <motion.div
            className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.4,
                },
              },
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
            >
              <SkillCategory
                title="Frontend"
                skills={['React', 'Next.js', 'TypeScript', 'Tailwind CSS']}
              />
            </motion.div>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
            >
              <SkillCategory
                title="Backend"
                skills={['Node.js', 'Python', 'PostgreSQL', 'API REST']}
              />
            </motion.div>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
            >
              <SkillCategory
                title="Tools"
                skills={['Git', 'Docker', 'AWS', 'Figma']}
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </Container>
  )
}
