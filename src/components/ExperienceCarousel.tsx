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
  const slideRefs = useMemo(() => items.map(() => ({ current: null as HTMLDivElement | null })), [items]);
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

  const scrollBy = (dir: -1 | 1) => {
    const el = containerRef.current;
    if (!el) return;
    const amount = Math.max(1, Math.floor(items.length * 0.25));
    const step = el.clientWidth * 0.9;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
    // Optimistically update active index
    setActive((i) => Math.min(items.length - 1, Math.max(0, i + dir * amount)));
  };

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
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar py-2 px-1"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {items.map((exp, idx) => (
            <motion.div
              key={`${exp.company}-${exp.start}`}
              ref={(node) => (slideRefs[idx].current = node)}
              className="snap-center shrink-0 w-[18rem] sm:w-[20rem] md:w-[22rem] xl:w-[24rem] h-[20rem]"
              whileHover={{ scale: 1.01 }}
            >
              <Link href={`/experiences/${slugify(exp.company)}`} className="group block h-full focus:outline-none" aria-label={`${exp.company} ${exp.position?.en || exp.position?.es}`}>
                <div className="h-full rounded-2xl p-[1px] bg-gradient-to-br from-teal-500/30 to-blue-500/30">
                  <div className="h-full rounded-[calc(theme(borderRadius.2xl)-1px)] bg-white/90 p-5 shadow-sm ring-1 ring-zinc-200 transition-all duration-300 group-hover:shadow-lg dark:bg-zinc-900/80 dark:ring-zinc-700 flex flex-col">
                    <div className="flex items-start gap-4">
                      <div className="relative h-12 w-12 flex-none overflow-hidden rounded-xl ring-1 ring-zinc-200 dark:ring-zinc-700 bg-gradient-to-br from-teal-500/20 to-blue-500/20">
                        {exp.logo ? (
                          <Image src={exp.logo} alt={exp.company} fill className="object-contain p-2" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-sm font-bold text-teal-600 dark:text-teal-400">
                            {exp.company.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                          {exp.position?.[locale]}
                        </h3>
                        <p className="mt-0.5 text-sm text-zinc-600 dark:text-zinc-400">
                          <span className="font-medium text-zinc-800 dark:text-zinc-200">{exp.company}</span>
                          {" "}•{" "}
                          <span>{exp.duration?.[locale]}</span>
                        </p>
                      </div>
                    </div>

                    <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {(exp.description?.[locale]?.[0] || "").toString()}
                    </p>

                    {exp.technologies?.length ? (
                      <div className="mt-4 flex flex-wrap gap-2 min-h-[1.75rem]">
                        {exp.technologies.slice(0, 2).map((tech) => (
                          <TechBadge key={tech} size="sm">
                            {tech}
                          </TechBadge>
                        ))}
                        {exp.technologies.length > 2 && (
                          <span className="text-xs text-zinc-500 dark:text-zinc-400">+{exp.technologies.length - 2}</span>
                        )}
                      </div>
                    ) : null}

                    <div className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-teal-600 transition-colors group-hover:text-teal-700 dark:text-teal-400 dark:group-hover:text-teal-300">
                      <span>{t("about.viewDetail")}</span>
                      <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.21 14.77a.75.75 0 001.06 0L14 9.94 8.27 4.21a.75.75 0 10-1.06 1.06L11.94 10l-4.73 4.71a.75.75 0 000 1.06z" clipRule="evenodd"/></svg>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Controls */}
        <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between">
          <button
            type="button"
            aria-label="Previous"
            className="pointer-events-auto ml-1 rounded-full bg-white/80 p-2 shadow ring-1 ring-zinc-200 backdrop-blur dark:bg-zinc-800/70 dark:ring-zinc-700"
            onClick={() => scrollBy(-1)}
          >
            <svg className="h-5 w-5 text-zinc-700 dark:text-zinc-200" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 010 1.06L9.06 10l3.73 3.71a.75.75 0 11-1.06 1.08l-4.25-4.25a.75.75 0 010-1.06l4.25-4.25a.75.75 0 011.06 0z" clipRule="evenodd" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next"
            className="pointer-events-auto mr-1 rounded-full bg-white/80 p-2 shadow ring-1 ring-zinc-200 backdrop-blur dark:bg-zinc-800/70 dark:ring-zinc-700"
            onClick={() => scrollBy(1)}
          >
            <svg className="h-5 w-5 text-zinc-700 dark:text-zinc-200" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 010-1.06L10.94 10 7.21 6.29a.75.75 0 111.06-1.08l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Dots */}
        <div className="mt-4 flex justify-center gap-2">
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
