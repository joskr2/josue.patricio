"use client";

import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ReactNode } from "react";

interface AccordionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

function ChevronDownIcon(props: React.ComponentPropsWithoutRef<"svg">) {
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

export function Accordion({ title, children, defaultOpen = false }: Readonly<AccordionProps>) {
  return (
    <div className="border border-zinc-200 dark:border-zinc-700 rounded-xl overflow-hidden">
      <Disclosure defaultOpen={defaultOpen}>
        {({ open }) => (
          <>
            <DisclosureButton className="flex w-full justify-between items-center px-6 py-4 text-left text-base font-semibold text-zinc-800 bg-zinc-50 hover:bg-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-inset dark:bg-zinc-800/50 dark:text-zinc-200 dark:hover:bg-zinc-800 transition-all">
              <span>{title}</span>
              <ChevronDownIcon
                className={`${
                  open ? 'rotate-180 transform' : ''
                } h-5 w-5 text-zinc-500 transition-transform duration-200 flex-shrink-0 ml-2`}
              />
            </DisclosureButton>
            <DisclosurePanel className="px-6 py-4 bg-white dark:bg-zinc-900">
              {children}
            </DisclosurePanel>
          </>
        )}
      </Disclosure>
    </div>
  );
}
