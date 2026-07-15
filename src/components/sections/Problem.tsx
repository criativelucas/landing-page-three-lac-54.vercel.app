import { getTranslations } from "next-intl/server";
import { Gauge, Smartphone, MousePointerClick } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const problems = [
  { Icon: Gauge, key: "speed" },
  { Icon: Smartphone, key: "mobile" },
  { Icon: MousePointerClick, key: "cta" },
] as const;

export default async function Problem() {
  const t = await getTranslations("problem");

  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <h2 className="max-w-2xl font-display text-3xl font-bold tracking-tight md:text-5xl">
          {t("heading")}
        </h2>
      </Reveal>
      <Reveal delay={0.08}>
        <p className="mt-6 max-w-xl text-lg text-muted">{t("subheading")}</p>
      </Reveal>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {problems.map((item, i) => (
          <Reveal key={item.key} delay={0.12 + i * 0.06}>
            <div className="h-full rounded-2xl border border-surface-border bg-surface p-6 shadow-sm">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/10 text-red-500">
                <item.Icon className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <p className="mt-3 text-sm text-muted">{t(`items.${item.key}`)}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
