import { getTranslations } from "next-intl/server";
import { ClipboardList, Code2, Rocket } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const steps = [
  { id: "brief", n: "01", Icon: ClipboardList },
  { id: "build", n: "02", Icon: Code2 },
  { id: "launch", n: "03", Icon: Rocket },
] as const;

function BriefVisual() {
  return (
    <div className="flex h-28 flex-col justify-center gap-2 rounded-lg bg-background p-4">
      <div className="h-2.5 w-3/4 rounded-full bg-surface-border" />
      <div className="h-2.5 w-full rounded-full bg-surface-border" />
      <div className="h-2.5 w-1/2 rounded-full bg-surface-border" />
      <div className="mt-1 h-3 w-16 self-end rounded-full bg-accent" />
    </div>
  );
}

function BuildVisual() {
  return (
    <div className="flex h-28 flex-col overflow-hidden rounded-lg bg-background">
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
    <div className="flex h-28 flex-col overflow-hidden rounded-lg bg-background">
      <div className="flex items-center justify-between border-b border-surface-border px-3 py-1.5">
        <div className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-surface-border" />
          <span className="h-1.5 w-1.5 rounded-full bg-surface-border" />
          <span className="h-1.5 w-1.5 rounded-full bg-surface-border" />
        </div>
        <span className="flex items-center gap-1 font-pixel text-[9px] text-accent-ink">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" /> LIVE
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
    <section id="process" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <Reveal>
        <h2 className="max-w-2xl font-display text-3xl font-bold tracking-tight md:text-5xl">
          {t("heading")}
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {steps.map((step, i) => {
          const Visual = visuals[step.id];
          return (
            <Reveal key={step.id} delay={0.1 + i * 0.08}>
              <div className="relative h-full rounded-2xl border border-surface-border bg-surface p-8 shadow-sm">
                <span className="absolute right-6 top-6 flex h-9 w-9 items-center justify-center rounded-lg bg-ink">
                  <step.Icon className="h-4 w-4 text-accent" strokeWidth={1.75} />
                </span>
                <span className="font-pixel text-2xl text-accent-ink">{step.n}</span>
                <h3 className="mt-4 font-display text-xl font-bold">
                  {t(`steps.${step.id}.title`)}{" "}
                  <span className="font-pixel text-xs font-normal text-muted">
                    {t(`steps.${step.id}.when`).toUpperCase()}
                  </span>
                </h3>
                <p className="mt-3 text-sm text-muted">{t(`steps.${step.id}.text`)}</p>
                <div className="mt-6">
                  <Visual />
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.32}>
        <p className="mt-8 text-sm text-muted">{t("footnote")}</p>
      </Reveal>
    </section>
  );
}
