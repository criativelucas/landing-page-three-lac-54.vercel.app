import { getTranslations } from "next-intl/server";
import { ClipboardList, Code2, Rocket } from "lucide-react";
import SplitText from "@/components/ui/SplitText";
import Reveal from "@/components/ui/Reveal";
import FloatingIcon from "@/components/ui/FloatingIcon";
import LivePing from "@/components/ui/LivePing";

const steps = [
  { id: "brief", n: "01", Icon: ClipboardList },
  { id: "build", n: "02", Icon: Code2 },
  { id: "launch", n: "03", Icon: Rocket },
] as const;

function BriefVisual() {
  return (
    <div className="flex h-full flex-col justify-center gap-2 rounded-lg bg-background p-4">
      <div className="h-2.5 w-3/4 rounded-full bg-surface-border" />
      <div className="h-2.5 w-full rounded-full bg-surface-border" />
      <div className="h-2.5 w-1/2 rounded-full bg-surface-border" />
      <div className="mt-1 h-3 w-16 self-end rounded-full bg-accent" />
    </div>
  );
}

function BuildVisual() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg bg-background">
      <div className="flex items-center gap-1 border-b border-surface-border px-3 py-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-surface-border" />
        <span className="h-1.5 w-1.5 rounded-full bg-surface-border" />
        <span className="h-1.5 w-1.5 rounded-full bg-surface-border" />
      </div>
      <div className="flex flex-1 flex-col justify-center gap-2 p-4">
        <div className="h-2.5 w-2/3 animate-pulse rounded-full bg-surface-border" />
        <div className="h-2.5 w-full animate-pulse rounded-full bg-surface-border" />
        <div className="h-2.5 w-1/3 animate-pulse rounded-full bg-surface-border" />
      </div>
    </div>
  );
}

function LaunchVisual() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg bg-background">
      <div className="flex items-center justify-between border-b border-surface-border px-3 py-1.5">
        <div className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-surface-border" />
          <span className="h-1.5 w-1.5 rounded-full bg-surface-border" />
          <span className="h-1.5 w-1.5 rounded-full bg-surface-border" />
        </div>
        <span className="flex items-center gap-1.5 font-pixel text-[9px] text-accent-ink">
          <LivePing /> LIVE
        </span>
      </div>
      <div className="flex flex-1 flex-col justify-center gap-2 p-4">
        <div className="h-2.5 w-2/3 rounded-full bg-ink" />
        <div className="h-2.5 w-full rounded-full bg-accent" />
        <div className="h-2.5 w-1/3 rounded-full bg-ink" />
      </div>
    </div>
  );
}

const visuals = { brief: BriefVisual, build: BuildVisual, launch: LaunchVisual };

export default async function Process() {
  const t = await getTranslations("process");

  return (
    <section id="process" className="relative scroll-mt-24 overflow-hidden bg-ink">
      <FloatingIcon
        src="/assets/icon-calendar.png"
        alt=""
        size={200}
        className="absolute right-4 top-16 z-0 hidden opacity-90 md:block lg:right-16"
      />
      <div className="relative z-10 mx-auto max-w-4xl px-6 py-24">
        <SplitText
          as="h2"
          text={t("heading")}
          className="max-w-2xl font-display text-3xl font-bold tracking-tight text-white md:text-5xl"
        />

        {/* Sticky card stack (Breedlove-style): each card pins near the top and
            the next one scrolls up to cover it, opaque so the overlap reads
            cleanly. Pure CSS sticky — no JS, no scroll listeners. */}
        <div className="mt-12">
          {steps.map((step, i) => {
            const Visual = visuals[step.id];
            return (
              <div
                key={step.id}
                className="sticky pb-6"
                style={{ top: `${6 + i * 2.5}rem` }}
              >
                <div className="grid gap-6 rounded-2xl border border-surface-border bg-surface p-8 shadow-2xl shadow-black/40 md:grid-cols-[1.1fr_1fr] md:p-10">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-pixel text-2xl text-accent-ink">{step.n}</span>
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink">
                        <step.Icon className="h-4 w-4 text-accent" strokeWidth={1.75} />
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-2xl font-bold">
                      {t(`steps.${step.id}.title`)}{" "}
                      <span className="font-pixel text-xs font-normal text-muted">
                        {t(`steps.${step.id}.when`).toUpperCase()}
                      </span>
                    </h3>
                    <p className="mt-3 text-sm text-muted">{t(`steps.${step.id}.text`)}</p>
                  </div>
                  <div className="min-h-[140px]">
                    <Visual />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-10 text-sm text-white/70">{t("footnote")}</p>
        </Reveal>
      </div>
    </section>
  );
}
