"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import Logomark from "./Logomark";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("nav");

  const links = [
    { href: "#work", label: t("work") },
    { href: "#pricing", label: t("pricing") },
    { href: "#process", label: t("process") },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link href="#top" className="flex items-center gap-2 font-display text-lg font-bold tracking-tight text-white">
          <Logomark className="h-5 w-5 text-accent" />
          think.studio
        </Link>
        <ul className="hidden gap-8 text-sm text-white/70 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="transition-colors hover:text-white">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher />
          <a
            href="#quote"
            className="group rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-ink transition-transform hover:scale-105"
          >
            {t("cta")} <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? t("closeMenu") : t("openMenu")}
          className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full border border-white/15 text-white md:hidden"
        >
          <span
            className={`h-0.5 w-4 bg-current transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span className={`h-0.5 w-4 bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
          <span
            className={`h-0.5 w-4 bg-current transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-white/10 px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-4 text-sm text-white/70">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setOpen(false)} className="block py-1 transition-colors hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center justify-between gap-3">
            <LanguageSwitcher />
            <a
              href="#quote"
              onClick={() => setOpen(false)}
              className="flex-1 rounded-full bg-accent px-4 py-2 text-center text-sm font-semibold text-accent-ink"
            >
              {t("cta")} →
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
