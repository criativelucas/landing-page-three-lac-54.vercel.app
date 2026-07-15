"use client";

import { useTransition } from "react";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { setLocale } from "@/i18n/actions";
import type { AppLocale } from "@/i18n/request";

export default function LanguageSwitcher({ className = "" }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function switchTo(next: AppLocale) {
    if (next === locale || isPending) return;
    startTransition(async () => {
      await setLocale(next);
      router.refresh();
    });
  }

  return (
    <div
      className={`inline-flex items-center rounded-full border border-white/15 p-0.5 font-pixel text-[11px] ${className}`}
      role="group"
      aria-label="Language"
    >
      {(["en", "pt"] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => switchTo(code)}
          aria-pressed={locale === code}
          disabled={isPending}
          className={`rounded-full px-2.5 py-1 transition-colors ${
            locale === code ? "bg-accent text-accent-ink" : "text-white/60 hover:text-white"
          }`}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
