import { getTranslations } from "next-intl/server";
import Reveal from "@/components/ui/Reveal";

export default async function Guarantee() {
  const t = await getTranslations("guarantee");

  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <div className="rounded-3xl bg-ink p-10 text-center md:p-16">
          <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-5xl">
            {t.rich("heading", {
              accent: (chunks) => <span className="text-accent">{chunks}</span>,
            })}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70">{t("body")}</p>
        </div>
      </Reveal>
    </section>
  );
}
