"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

type NavItem = { id: string; label: string; dark: boolean };

// Breedlove-style numbered rail with scroll-spy. Fixed on the left edge on
// large screens only; an IntersectionObserver marks the section nearest the
// viewport middle as active. Because it floats over sections that alternate
// dark/light, the whole rail re-themes to stay legible against whatever section
// currently sits behind it. Hidden for touch/mobile (the hamburger covers it).
export default function SectionNav({ items }: { items: NavItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const sections = items
      .map((it) => document.getElementById(it.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [items]);

  const navIsDark = items.find((it) => it.id === active)?.dark ?? true;
  const dim = navIsDark ? "text-white/35" : "text-ink/35";
  const dimHover = navIsDark ? "group-hover:text-white/70" : "group-hover:text-ink/70";
  const strong = navIsDark ? "text-white" : "text-ink";
  const rail = navIsDark ? "bg-white/20" : "bg-ink/20";

  return (
    <nav
      aria-label="Sections"
      className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
    >
      <ul className="flex flex-col gap-3">
        {items.map((item, i) => {
          const isActive = active === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="group flex items-center gap-3"
                aria-current={isActive ? "true" : undefined}
              >
                <span
                  className={`font-pixel text-[10px] tabular-nums transition-colors ${
                    isActive ? "text-accent" : `${dim} ${dimHover}`
                  }`}
                >
                  {String(i).padStart(2, "0")}
                </span>
                <span className={`relative h-px w-6 overflow-hidden ${rail}`}>
                  {isActive && (
                    <motion.span
                      layoutId="section-nav-active"
                      className="absolute inset-0 bg-accent"
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}
                </span>
                <span
                  className={`font-pixel text-[10px] uppercase tracking-[0.15em] transition-all ${
                    isActive ? `${strong} opacity-100` : `${dim} opacity-0 group-hover:opacity-100`
                  }`}
                >
                  {item.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
