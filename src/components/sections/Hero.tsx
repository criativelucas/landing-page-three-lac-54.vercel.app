import { getTranslations } from "next-intl/server";
import Reveal from "@/components/ui/Reveal";
import SplitText from "@/components/ui/SplitText";
import BrainDragHitArea from "@/components/BrainDragHitArea";
import NowWidget from "@/components/ui/NowWidget";

export default async function Hero() {
  const t = await getTranslations("hero");

  return (
    <section id="top" className="relative mx-auto flex max-w-6xl flex-col justify-center px-6 pb-24 pt-20 md:min-h-[90vh] md:pt-24">
      <BrainDragHitArea />
      <span className="pointer-events-none absolute right-6 top-6 hidden select-none items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 font-pixel text-xs tracking-wide text-white/60 md:inline-flex">
        {t("dragToRotate")}
      </span>
      <div className="max-w-2xl">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 font-pixel text-xs tracking-wide text-white/70">
            {t("badge")}
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-6 font-pixel text-xs tracking-[0.2em] text-accent">{t("eyebrow")}</p>
        </Reveal>
        <SplitText
          as="h1"
          text={t("headline")}
          delay={0.15}
          stagger={0.08}
          className="mt-4 font-display text-5xl font-bold leading-[1.05] tracking-tight text-white md:text-7xl"
        />
        <Reveal delay={0.18}>
          <p className="mt-6 max-w-lg text-lg text-white/70 md:text-xl">
            {t.rich("description", {
              strong: (chunks) => <span className="text-white">{chunks}</span>,
            })}
          </p>
        </Reveal>
        <Reveal delay={0.26}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#quote"
              className="group rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-ink transition-transform hover:scale-105"
            >
              {t("primaryCta")}{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#work"
              className="group rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white"
            >
              {t("secondaryCta")}{" "}
              <span className="inline-block transition-transform group-hover:translate-y-0.5">↓</span>
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.32}>
          <p className="mt-4 text-sm text-white/70">{t("microcopy")}</p>
        </Reveal>
        
        <Reveal delay={0.4}>
          <div className="mt-16 border-t border-white/10 pt-8 max-w-fit">
            <NowWidget />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
