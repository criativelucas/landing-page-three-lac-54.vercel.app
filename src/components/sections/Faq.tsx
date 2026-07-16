import { getTranslations } from "next-intl/server";
import Reveal from "@/components/ui/Reveal";
import SplitText from "@/components/ui/SplitText";

const faqIds = ["delivery", "ownership", "revisions", "international", "requirements", "payments"] as const;

export default async function Faq() {
  const t = await getTranslations("faq");

  return (
    <section id="faq" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <SplitText
        as="h2"
        text={t("heading")}
        className="font-display text-3xl font-bold tracking-tight md:text-5xl"
      />

      <div className="mt-10 divide-y divide-surface-border border-y border-surface-border">
        {faqIds.map((id, i) => (
          <Reveal key={id} delay={Math.min(i * 0.04, 0.2)}>
            <details className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-medium">
                {t(`items.${id}.q`)}
                <span className="shrink-0 font-display text-lg text-accent-ink transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-2xl text-sm text-muted">{t(`items.${id}.a`)}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
