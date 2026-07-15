import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Stethoscope, Wrench, Dumbbell, Scale } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Logomark from "@/components/Logomark";

const featuredCase = {
  href: "https://site-efraim.vercel.app",
  url: "site-efraim.vercel.app",
};

// Illustrative examples — swap for real client results as they land.
const cases = [
  { id: "dental", Icon: Stethoscope },
  { id: "contractor", Icon: Wrench },
  { id: "trainer", Icon: Dumbbell },
  { id: "law", Icon: Scale },
] as const;

function BrowserChrome({ url }: { url: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-surface-border/60 bg-surface px-4 py-2.5">
      <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
      <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
      <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
      <span className="ml-2 truncate rounded-full bg-black/5 px-3 py-1 font-pixel text-[10px] text-muted">
        {url}
      </span>
    </div>
  );
}

export default async function Work() {
  const t = await getTranslations("work");

  return (
    <section id="work" className="scroll-mt-24 bg-accent">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <h2 className="max-w-2xl font-display text-3xl font-bold tracking-tight text-accent-ink md:text-5xl">
            {t("heading")}
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <a
            href={featuredCase.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("featured.ariaLabel")}
            className="group mt-12 grid gap-0 overflow-hidden rounded-2xl border border-ink/20 bg-surface shadow-xl shadow-black/20 transition-transform hover:scale-[1.005] sm:grid-cols-[1fr_auto]"
          >
            <div className="flex flex-col">
              <BrowserChrome url={featuredCase.url} />
              <div className="relative aspect-[2876/1592] w-full overflow-hidden">
                <Image
                  src="/work/efraim/desktop.png"
                  alt={t("featured.heroAlt")}
                  fill
                  sizes="(min-width: 640px) 60vw, 100vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>

            <div className="hidden w-40 shrink-0 flex-col border-l border-surface-border/60 sm:flex">
              <div className="border-b border-surface-border/60 bg-surface px-3 py-2.5 text-center font-pixel text-[9px] text-muted">
                {t("featured.mobileLabel")}
              </div>
              <div className="relative flex-1 overflow-hidden">
                <Image
                  src="/work/efraim/mobile.png"
                  alt={t("featured.mobileAlt")}
                  fill
                  sizes="160px"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 border-t border-surface-border/60 bg-surface p-6 sm:col-span-2">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ink">
                <Logomark className="h-4 w-4 text-accent" />
              </span>
              <div className="min-w-0 flex-1">
                <span className="text-sm font-medium">{t("featured.niche")}</span>
                <p className="mt-1 truncate text-sm text-muted">{t("featured.caption")}</p>
              </div>
              <span className="shrink-0 text-sm font-semibold text-accent-ink underline">
                {t("featured.viewSite")}
              </span>
            </div>
          </a>
        </Reveal>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {cases.map((item, i) => (
            <Reveal key={item.id} delay={0.14 + i * 0.06}>
              <div className="flex h-full flex-col justify-between rounded-2xl border border-ink/10 bg-surface p-8 shadow-lg shadow-black/10">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink">
                      <item.Icon className="h-4 w-4 text-accent" strokeWidth={1.75} />
                    </span>
                    <span className="text-sm font-medium">{t(`cases.${item.id}.niche`)}</span>
                  </div>
                  <span className="font-pixel text-[9px] text-muted">{t("conceptTag")}</span>
                </div>
                <div className="mt-10">
                  <p className="font-display text-5xl font-bold tracking-tight">
                    {t(`cases.${item.id}.stat`)}
                  </p>
                  <p className="mt-2 text-sm text-muted">
                    {t(`cases.${item.id}.caption`)} · {t("typicalForNiche")}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.4}>
          <div className="mt-10">
            <a
              href="#quote"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105"
            >
              {t("cta")}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
