import { getTranslations } from "next-intl/server";
import { buildWhatsAppUrl, SLOTS_LEFT_THIS_MONTH } from "@/lib/site-config";
import LivePing from "@/components/ui/LivePing";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

export default async function FinalCta() {
  const t = await getTranslations("finalCta");

  return (
    <section id="quote" className="mx-auto max-w-3xl px-6 py-24 scroll-mt-24">
      <div className="rounded-3xl bg-ink p-8 text-center shadow-2xl shadow-black/40 sm:p-12">
        <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-5xl">
          {t.rich("heading", {
            accent: (chunks) => (
              <>
                <br />
                <span className="text-accent">{chunks}</span>
              </>
            ),
          })}
        </h2>

        <p className="mx-auto mt-6 max-w-md text-lg text-white/70">{t("subheading")}</p>

        <a
          href={buildWhatsAppUrl(t("whatsappMessage"))}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("whatsappAriaLabel")}
          className="mt-10 flex w-full items-center justify-center gap-3 rounded-full bg-accent px-6 py-6 font-display text-xl font-bold text-accent-ink shadow-[0_0_45px_-8px_rgba(227,255,61,0.6)] transition-all hover:scale-[1.02] hover:shadow-[0_0_60px_-4px_rgba(227,255,61,0.85)] sm:text-2xl"
        >
          <WhatsAppIcon className="h-7 w-7 shrink-0 sm:h-8 sm:w-8" />
          {t("whatsappCta")}
        </a>

        <p className="mt-6 inline-flex items-center gap-2 text-sm text-white/70">
          <LivePing />
          {t("footnote", { count: SLOTS_LEFT_THIS_MONTH })}
        </p>
      </div>
    </section>
  );
}
