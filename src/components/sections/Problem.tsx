import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Gauge, Smartphone, MousePointerClick } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SplitText from "@/components/ui/SplitText";

const problems = [
  { Icon: Gauge, key: "speed", src: "/topics/speed.jpg" },
  { Icon: Smartphone, key: "mobile", src: "/topics/mobile.jpg" },
  { Icon: MousePointerClick, key: "cta", src: "/topics/cta.jpg" },
] as const;

export default async function Problem() {
  const t = await getTranslations("problem");

  return (
    <section id="problem" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <SplitText
        as="h2"
        text={t("heading")}
        className="max-w-2xl font-display text-3xl font-bold tracking-tight md:text-5xl"
      />
      <Reveal delay={0.08}>
        <p className="mt-6 max-w-xl text-lg text-muted">{t("subheading")}</p>
      </Reveal>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {problems.map((item, i) => (
          <Reveal key={item.key} delay={0.12 + i * 0.06}>
            <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-surface-border bg-surface shadow-sm">
              <div className="relative aspect-[4/3] w-full bg-ink">
                <Image
                  src={item.src}
                  alt={t(`items.${item.key}`)}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex items-center gap-3 p-6">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ink">
                  <item.Icon className="h-4 w-4 text-accent" strokeWidth={1.75} />
                </span>
                <p className="text-sm text-muted">{t(`items.${item.key}`)}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
