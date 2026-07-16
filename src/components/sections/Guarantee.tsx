import { getTranslations } from "next-intl/server";
import Reveal from "@/components/ui/Reveal";
import FloatingIcon from "@/components/ui/FloatingIcon";

export default async function Guarantee() {
  const t = await getTranslations("guarantee");

  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl bg-ink p-10 text-center md:p-16">
          <FloatingIcon
            src="/assets/icon-star.png"
            alt=""
            size={150}
            className="absolute right-4 top-4 z-0 hidden opacity-90 sm:block md:right-10 md:top-8"
          />
          <div className="relative z-10">
            <h2 className="mx-auto max-w-3xl font-display text-3xl font-bold tracking-tight text-white md:text-5xl">
              {t.rich("heading", {
                accent: (chunks) => <span className="text-accent">{chunks}</span>,
              })}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70">{t("body")}</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
