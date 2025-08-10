"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState, useEffect } from "react";
import { motion } from "motion/react";

import { TechBadge } from "@/components/TechBadge";
import { useTranslation } from "@/hooks/useTranslation";
import type { Experience } from "@/lib/experience-data";
import { slugify } from "@/lib/slugify";

type Props = Readonly<{
  items: Experience[];
  className?: string;
}>;

export function ExperienceCarousel({ items, className }: Props) {
  const { locale, t } = useTranslation();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useMemo(
    () => items.map(() => ({ current: null as HTMLDivElement | null })),
    [items]
  );
  const titleRefs = useMemo(
    () => items.map(() => ({ current: null as HTMLHeadingElement | null })),
    [items]
  );
  const [active, setActive] = useState(0);

  // Track active slide based on scroll position
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onScroll = () => {
      const { scrollLeft } = el;
      let bestIdx = 0;
      let bestDist = Number.POSITIVE_INFINITY;
      slideRefs.forEach((ref, idx) => {
        const left = ref.current?.offsetLeft ?? 0;
        const dist = Math.abs(left - scrollLeft);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = idx;
        }
      });
      setActive(bestIdx);
    };

    el.addEventListener("scroll", onScroll, { passive: true } as AddEventListenerOptions);
    onScroll();
    return () => el.removeEventListener("scroll", onScroll as EventListener);
  }, [slideRefs]);

  // Auto-fit title font-size to avoid overflow (down to a minimum)
  useEffect(() => {
    const MIN = 13; // px
    const MAX = 16; // px (~text-base)

    const fitOne = (el: HTMLHeadingElement | null) => {
      if (!el) return;
      // reset to max first
      el.style.fontSize = `${MAX}px`;
      // if it already fits, done
      if (el.scrollWidth <= el.clientWidth) return;
      for (let size = MAX - 1; size >= MIN; size--) {
        el.style.fontSize = `${size}px`;
        if (el.scrollWidth <= el.clientWidth) return;
      }
      // ensure min applied
      el.style.fontSize = `${MIN}px`;
    };

    titleRefs.forEach(r => fitOne(r.current));

    const handle = () => titleRefs.forEach(r => fitOne(r.current));
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, [titleRefs, items, locale]);

  const scrollTo = (idx: number) => {
    const el = containerRef.current;
    const slide = slideRefs[idx]?.current;
    if (!el || !slide) return;
    el.scrollTo({ left: slide.offsetLeft, behavior: "smooth" });
  };

  if (!items?.length) return null;

  return (
    <div className={className}>
      <div className="relative">
        {/* Scroll container */}
        <motion.div
          ref={containerRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar py-2 px-1"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {items.map((exp, idx) => (
            <motion.div
              key={`${exp.company}-${exp.start}`}
              ref={(node) => (slideRefs[idx].current = node)}
              className="snap-center shrink-0 w-[17rem] sm:w-[19rem] md:w-[21rem] xl:w-[23rem]"
              whileHover={{ scale: 1.01 }}
            >
              <Link
                href={`/experiences/${slugify(exp.company)}`}
                className="group block h-full focus:outline-none"
                aria-label={`${exp.company} ${exp.position?.en || exp.position?.es}`}
              >
                <div className="flex h-full flex-col rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-200 transition-all duration-300 group-hover:shadow-md dark:bg-zinc-900 dark:ring-zinc-700">
                  <div className="flex items-start gap-3">
                    <div className="relative h-12 w-12 flex-none overflow-hidden rounded-xl ring-1 ring-zinc-200 dark:ring-zinc-700 bg-zinc-50 dark:bg-zinc-800/50">
                      {exp.logo ? (
                        <Image src={exp.logo} alt={exp.company} fill className="object-contain p-2" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-sm font-bold text-white bg-teal-600">
                          {exp.company.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <h3
                        ref={(n) => (titleRefs[idx].current = n)}
                        className="font-semibold text-zinc-900 dark:text-zinc-100"
                        style={{ fontSize: 16 }}
                      >
                        {exp.position?.[locale]}
                      </h3>
                      <p className="mt-0.5 text-sm text-zinc-600 dark:text-zinc-400">
                        <span className="font-medium text-zinc-800 dark:text-zinc-200">{exp.company}</span>
                        {" • "}
                        <span>{exp.duration?.[locale]}</span>
                      </p>
                    </div>
                  </div>

                  {/* Content spacer to align cards */}
                  <div className="mt-3 flex min-h-[72px] flex-col">
                    <p className="truncate text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {(exp.description?.[locale]?.[0] || "").toString()}
                    </p>

                    {/* Tech row always rendered to keep equal height */}
                    <div className="mt-3 flex min-h-[28px] flex-wrap gap-2">
                      {(exp.technologies?.slice(0, 2) || []).map((tech) => (
                        <TechBadge key={tech} size="sm">
                          {tech}
                        </TechBadge>
                      ))}
                      {exp.technologies && exp.technologies.length > 2 && (
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">+{exp.technologies.length - 2}</span>
                      )}
                    </div>
                  </div>

                  <div className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-teal-600 transition-colors group-hover:text-teal-700 dark:text-teal-400 dark:group-hover:text-teal-300">
                    <span>{t("about.viewDetail")}</span>
                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.21 14.77a.75.75 0 001.06 0L14 9.94 8.27 4.21a.75.75 0 10-1.06 1.06L11.94 10l-4.73 4.71a.75.75 0 000 1.06z" clipRule="evenodd"/></svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Dots below (no arrows) */}
        <div className="mt-3 flex justify-center gap-2">
          {items.map((exp, i) => (
            <button
              key={`${exp.company}-${exp.start}`}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => scrollTo(i)}
              className={
                "h-2 w-2 rounded-full transition-colors " +
                (i === active ? "bg-teal-500" : "bg-zinc-300 dark:bg-zinc-600")
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
