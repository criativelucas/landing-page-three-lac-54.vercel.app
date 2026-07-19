import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { ClipboardList, Code2, Rocket } from "lucide-react";
import SplitText from "@/components/ui/SplitText";
import Reveal from "@/components/ui/Reveal";
import FloatingIcon from "@/components/ui/FloatingIcon";

const steps = [
  { id: "brief", n: "01", Icon: ClipboardList, src: "/topics/brief.jpg" },
  { id: "build", n: "02", Icon: Code2, src: "/topics/build.jpg" },
  { id: "launch", n: "03", Icon: Rocket, src: "/topics/launch.jpg" },
] as const;

export default async function Process() {
  const t = await getTranslations("process");

  return (
    <section
      id="process"
      className="relative z-20 -mt-8 scroll-mt-24 overflow-hidden rounded-t-[2.5rem] bg-ink pt-8 md:-mt-12 md:rounded-t-[4rem] md:pt-12"
    >
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
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-ink">
                    <Image
                      src={step.src}
                      alt={t(`steps.${step.id}.text`)}
                      fill
                      sizes="(min-width: 768px) 40vw, 90vw"
                      className="object-cover"
                    />
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
