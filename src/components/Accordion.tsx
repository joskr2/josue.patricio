"use client";

import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ReactNode, MouseEvent } from "react";
import { motion } from "motion/react";

interface AccordionProps {
  title: ReactNode;
  children?: ReactNode;
  defaultOpen?: boolean;
  onClick?: (e: MouseEvent) => void; // when provided, act like a link (no panel)
}

function ChevronDownIcon(props: Readonly<React.ComponentPropsWithoutRef<"svg">>) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function Accordion({ title, children, defaultOpen = false, onClick }: Readonly<AccordionProps>) {
  const linkMode = typeof onClick === "function";

  return (
    <div className="border border-zinc-200 dark:border-zinc-700 rounded-xl overflow-hidden">
      <Disclosure defaultOpen={linkMode ? false : defaultOpen}>
        {({ open }) => (
          <>
            <DisclosureButton
              as={motion.button}
              whileHover={{ scale: 1.01, y: -1 }}
              whileTap={{ scale: 0.99 }}
              className="flex w-full justify-between items-center px-6 py-4 text-left text-base font-semibold text-zinc-800 bg-zinc-50 hover:bg-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-inset dark:bg-zinc-800/50 dark:text-zinc-200 dark:hover:bg-zinc-800 transition-all"
              onClick={(e: MouseEvent) => {
                if (linkMode && onClick) {
                  e.preventDefault();
                  e.stopPropagation();
                  onClick(e);
                }
              }}
            >
              {/* Render provided title; allow full-width layouts */}
              <div className="flex w-full items-center justify-between gap-4">
                {title}
                {!linkMode && (
                  <motion.span
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-2 flex-shrink-0"
                  >
                    <ChevronDownIcon className="h-5 w-5 text-zinc-500" />
                  </motion.span>
                )}
              </div>
            </DisclosureButton>
            {!linkMode && (
              <DisclosurePanel static className="px-6 py-0 bg-white dark:bg-zinc-900 overflow-hidden">
                <motion.div
                  initial={false}
                  animate={open ? "open" : "collapsed"}
                  variants={{
                    open: { opacity: 1, height: "auto" },
                    collapsed: { opacity: 0, height: 0 },
                  }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="py-4">{children}</div>
                </motion.div>
              </DisclosurePanel>
            )}
          </>
        )}
      </Disclosure>
    </div>
  );
}
