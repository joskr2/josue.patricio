'use client'

import clsx from 'clsx'
import { motion } from 'motion/react'
import type { StaticImageData } from 'next/image'
import Image from 'next/image'
import Link from 'next/link'

import { Container } from '@/components/Container'
import { ExperienceCarousel } from '@/components/ExperienceCarousel'
import { SkillCategory } from '@/components/SkillCategory'
import { GitHubIcon, LinkedInIcon } from '@/components/SocialIcons'
import { useTranslation } from '@/hooks/useTranslation'
import type { Experience } from '@/lib/experience-data'
import { skills } from '@/lib/personal-data'
import { slugify } from '@/lib/slugify'

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
        className="group flex font-medium text-sm text-zinc-800 transition hover:text-teal-500 focus-visible:text-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-500 focus-visible:outline-offset-4 dark:text-zinc-200 dark:hover:text-teal-500"
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

  return (
    <Container className="mt-16 sm:mt-32">
      {/*
        One layout for every breakpoint: the name/title block, the portrait and
        the biography are placed explicitly on the desktop grid, so the mobile
        order (name → portrait → biography) is preserved without rendering the
        whole hero twice.
      */}
      <div className="flex flex-col gap-y-8 lg:grid lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-12">
        <div className="order-1 lg:col-start-1 lg:row-start-1">
          <h1 className="font-bold text-4xl text-zinc-800 tracking-tight sm:text-5xl dark:text-zinc-100">
            {personalInfo.name}
          </h1>
          <p className="mt-2 text-teal-600 text-xl dark:text-teal-400">
            {personalInfo.title[locale]}
          </p>
        </div>

        <motion.div
          className="order-2 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:pl-20"
          whileHover={{
            scale: 1.03,
            rotate: 1,
            transition: { type: 'spring', stiffness: 300, damping: 30 },
          }}
        >
          <motion.div className="mx-auto max-w-xs px-2.5 lg:max-w-none">
            <Image
              src={personalInfo.portraitImage}
              alt={personalInfo.name}
              sizes="(min-width: 1024px) 32rem, 20rem"
              priority
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            />
          </motion.div>
        </motion.div>

        <div className="order-3 lg:col-start-1 lg:row-start-2">
          <div className="space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <p>{personalInfo.summary[locale]}</p>
            <p>{t('about.intro')}</p>
          </div>
          <ul className="mt-8 space-y-4">
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
        </div>
      </div>

      {/* Experience Section */}
      <motion.div
        className="mt-16 sm:mt-24"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="mx-auto max-w-7xl">
          <h2 className="font-bold text-2xl text-zinc-800 tracking-tight dark:text-zinc-100">
            {t('about.experience')}
          </h2>

          {/* Mobile: horizontal carousel */}
          <div className="mt-4 md:hidden">
            <ExperienceCarousel items={experiences} />
          </div>

          {/* Desktop: link list */}
          <div className="mt-6 hidden space-y-3 md:block">
            {experiences.map((exp) => (
              <Link
                key={`${exp.company}-${exp.start}`}
                href={`/experiences/${slugify(exp.company)}`}
                className="flex w-full items-center gap-3 rounded-lg bg-zinc-50 px-4 py-3 text-left shadow-sm transition-all duration-200 hover:bg-zinc-100 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-500 focus-visible:outline-offset-2 dark:bg-zinc-800/50 dark:hover:bg-zinc-800"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 font-bold text-sm text-white">
                  {exp.company.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-base text-zinc-800 dark:text-zinc-100">
                    {exp.position[locale]}
                  </p>
                  <p className="truncate text-sm text-zinc-500 dark:text-zinc-400">
                    {exp.company} • {exp.duration[locale]}
                  </p>
                </div>
                <span className="font-medium text-sm text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300">
                  {t('about.viewDetail')}
                </span>
              </Link>
            ))}
          </div>
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
          <h2 className="font-bold text-2xl text-zinc-800 tracking-tight dark:text-zinc-100">
            {t('about.skills')}
          </h2>
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
              <SkillCategory title="Frontend" skills={skills.frontend} />
            </motion.div>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
            >
              <SkillCategory title="Backend" skills={skills.backend} />
            </motion.div>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
            >
              <SkillCategory title="Tools" skills={skills.tools} />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </Container>
  )
}
