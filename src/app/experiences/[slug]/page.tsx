"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

import { Container } from "@/components/Container";
import { TechBadge } from "@/components/TechBadge";
import { useTranslation } from "@/hooks/useTranslation";
import { experiences } from "@/lib/experience-data";
import { slugify } from "@/lib/slugify";

export default function ExperienceDetail({ params }: { params: { slug: string } }) {
  const { locale, t } = useTranslation();
  const experience = experiences.find((e) => slugify(e.company) === params.slug);

  if (!experience) {
    return (
      <Container className="mt-16 sm:mt-24">
        <p className="text-center text-zinc-600 dark:text-zinc-400">Experience not found.</p>
        <div className="mt-6 text-center">
          <Link className="text-teal-600 hover:underline dark:text-teal-400" href="/about">{t("nav.about")}</Link>
        </div>
      </Container>
    );
  }

  return (
    <Container className="mt-16 sm:mt-24">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="flex items-start gap-4">
          <div className="relative hidden h-16 w-16 overflow-hidden rounded-2xl ring-1 ring-zinc-200 dark:ring-zinc-700 bg-white dark:bg-zinc-900 md:block">
            {experience.logo ? (
              <Image src={experience.logo} alt={experience.company} fill className="object-contain p-3" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-lg font-bold text-teal-600 dark:text-teal-400">
                {experience.company.charAt(0)}
              </div>
            )}
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
              {experience.position[locale]}
            </h1>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              <span className="font-medium text-zinc-800 dark:text-zinc-200">{experience.company}</span>
              {" "}• {experience.duration[locale]}
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="prose prose-zinc mt-8 dark:prose-invert max-w-none">
          <ul>
            {experience.description[locale].map((line) => (
              <li key={line.substring(0, 50)}>{line}</li>
            ))}
          </ul>
        </div>

        {experience.technologies.length > 0 && (
          <div className="mt-8">
            <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Technologies</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {experience.technologies.map((tech) => (
                <TechBadge key={tech}>{tech}</TechBadge>
              ))}
            </div>
          </div>
        )}

        <div className="mt-10">
          <Link href="/about" className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-400">
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.79 14.77a.75.75 0 001.06-1.06L10.94 10l2.91-2.91a.75.75 0 10-1.06-1.06L8.59 9.23a.75.75 0 000 1.06l3.2 3.2z" clipRule="evenodd"/></svg>
            {t("nav.about")}
          </Link>
        </div>
      </motion.div>
    </Container>
  );
}
