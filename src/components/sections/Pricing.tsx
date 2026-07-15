import { getTranslations } from "next-intl/server";
import { Check, FileText, Layers, TrendingUp } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

interface Plan {
  id: "launch" | "business" | "growth";
  Icon: typeof FileText;
  featured: boolean;
}

export const plans: Plan[] = [
  { id: "launch", Icon: FileText, featured: false },
  { id: "business", Icon: Layers, featured: true },
  { id: "growth", Icon: TrendingUp, featured: false },
];

export default async function Pricing() {
  const t = await getTranslations("pricing");

  return (
    <section id="pricing" className="scroll-mt-24 bg-ink">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <h2 className="max-w-2xl font-display text-3xl font-bold tracking-tight text-white md:text-5xl">
            {t("heading")}
          </h2>
          <p className="mt-4 text-lg text-white/70">{t("subheading")}</p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {plans.map((plan, i) => {
            const features = t.raw(`plans.${plan.id}.features`) as string[];
            const hasAgencyQuote = t.has(`plans.${plan.id}.agencyQuote`);
            return (
              <Reveal key={plan.id} delay={0.1 + i * 0.08}>
                <div
                  className={`flex h-full flex-col rounded-2xl border p-8 ${
                    plan.featured
                      ? "border-accent bg-surface shadow-[0_0_40px_-12px_rgba(227,255,61,0.5)]"
                      : "border-surface-border bg-surface shadow-xl shadow-black/30"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink">
                      <plan.Icon className="h-4 w-4 text-accent" strokeWidth={1.75} />
                    </span>
                    {plan.featured && (
                      <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-ink">
                        {t("mostPopular")}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-4 font-display text-xl font-bold">{t(`plans.${plan.id}.name`)}</h3>
                  <p className="mt-1 text-sm text-muted">{t(`plans.${plan.id}.tagline`)}</p>
                  {hasAgencyQuote && (
                    <p className="mt-6 text-sm text-muted line-through decoration-1">
                      {t("agencyQuoteLabel", { price: t(`plans.${plan.id}.agencyQuote`) })}
                    </p>
                  )}
                  <p className={`font-display text-4xl font-bold ${hasAgencyQuote ? "mt-1" : "mt-6"}`}>
                    {t(`plans.${plan.id}.price`)}
                  </p>
                  <ul className="mt-6 flex-1 space-y-3 text-sm text-muted">
                    {features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5">
                        <Check className="h-4 w-4 shrink-0 text-accent-ink" strokeWidth={2.5} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#quote"
                    className={`group mt-8 rounded-full px-5 py-3 text-center text-sm font-semibold transition-transform hover:scale-105 ${
                      plan.featured
                        ? "bg-accent text-accent-ink"
                        : "border border-surface-border text-foreground"
                    }`}
                  >
                    {t(`plans.${plan.id}.cta`)}{" "}
                    <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.3}>
          <p className="mt-6 text-center text-sm text-white/70">{t("includesNote")}</p>
        </Reveal>

        <Reveal delay={0.36}>
          <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-2xl border border-accent bg-surface p-6 text-center shadow-xl shadow-black/30 sm:flex-row sm:text-left">
            <div>
              <p className="font-display text-lg font-bold text-foreground">{t("carePlan.title")}</p>
              <p className="mt-1 text-sm text-muted">{t("carePlan.description")}</p>
            </div>
            <a
              href="#quote"
              className="group shrink-0 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-ink transition-transform hover:scale-105"
            >
              {t("carePlan.cta")}{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
