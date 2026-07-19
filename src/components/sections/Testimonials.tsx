import { getTranslations } from "next-intl/server";
import Reveal from "@/components/ui/Reveal";
import Logomark from "@/components/Logomark";

// Placeholder quotes — replace with real client testimonials before launch.
const quoteIds = ["clinic", "contractor"] as const;

export default async function Testimonials() {
  const t = await getTranslations("testimonials");

  return (
    <section className="relative z-20 -mt-8 rounded-t-[2.5rem] bg-background px-6 py-24 pt-32 md:-mt-12 md:rounded-t-[4rem] md:pt-36">
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
        {quoteIds.map((id, i) => (
          <Reveal key={id} delay={i * 0.08}>
            <div className="flex h-full overflow-hidden rounded-2xl">
              <div className="flex w-24 shrink-0 items-center justify-center bg-ink sm:w-32">
                <Logomark className="h-8 w-8 text-accent" />
              </div>
              <blockquote className="relative flex-1 bg-accent p-6 sm:p-8">
                <Logomark className="absolute right-5 top-5 h-5 w-5 text-accent-ink/70" />
                <p className="pr-8 text-base text-accent-ink sm:text-lg">
                  &ldquo;{t(`quotes.${id}.quote`)}&rdquo;
                </p>
                <footer className="mt-6 text-sm text-accent-ink/70">
                  <span className="font-medium text-accent-ink">{t(`quotes.${id}.name`)}</span>,{" "}
                  {t(`quotes.${id}.role`)}
                </footer>
              </blockquote>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
