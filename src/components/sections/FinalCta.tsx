"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useTranslations } from "next-intl";
import { submitQuoteRequest, type QuoteFormState } from "@/app/actions";
import { buildWhatsAppUrl, SLOTS_LEFT_THIS_MONTH } from "@/lib/site-config";
import LivePing from "@/components/ui/LivePing";

const initialState: QuoteFormState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  const t = useTranslations("finalCta");
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-ink transition-transform hover:scale-105 disabled:opacity-60 disabled:hover:scale-100"
    >
      {pending ? t("sending") : t("submit")}
    </button>
  );
}

function SuccessCard() {
  const t = useTranslations("finalCta");
  return (
    <div className="mx-auto mt-10 max-w-md rounded-2xl border border-accent/40 bg-black/30 p-6 text-left">
      <p className="font-display text-lg font-bold text-accent">{t("success.title")}</p>
      <p className="mt-1 text-sm text-white/70">{t("success.body")}</p>
      <p className="mt-4 text-sm text-white/70">{t("success.instantPrompt")}</p>
      <a
        href={buildWhatsAppUrl(t("whatsappMessage"))}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("success.whatsappAriaLabel")}
        className="mt-2 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-105"
      >
        {t("success.whatsappCta")} ↗
      </a>
    </div>
  );
}

export default function FinalCta() {
  const [state, formAction] = useActionState(submitQuoteRequest, initialState);
  const t = useTranslations("finalCta");

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

        {state.status === "success" ? (
          <SuccessCard />
        ) : (
          <form action={formAction} className="mx-auto mt-10 flex max-w-md flex-col gap-3">
            <label htmlFor="quote-name" className="sr-only">
              {t("fields.name")}
            </label>
            <input
              id="quote-name"
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder={t("fields.name")}
              className="rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-accent"
            />
            <label htmlFor="quote-email" className="sr-only">
              {t("fields.email")}
            </label>
            <input
              id="quote-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder={t("fields.email")}
              className="rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-accent"
            />
            <label htmlFor="quote-website" className="sr-only">
              {t("fields.website")}
            </label>
            <input
              id="quote-website"
              name="website"
              type="text"
              autoComplete="url"
              placeholder={t("fields.website")}
              className="rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-accent"
            />
            <div className="mt-2 flex justify-center">
              <SubmitButton />
            </div>
            <p aria-live="polite" className="min-h-5 text-sm">
              {state.status === "error" && state.messageKey && (
                <span className="text-red-400">{t(`errors.${state.messageKey}`)}</span>
              )}
            </p>
          </form>
        )}

        <p className="mt-6 inline-flex items-center gap-2 text-sm text-white/70">
          <LivePing />
          {t("footnote", { count: SLOTS_LEFT_THIS_MONTH })}
        </p>
      </div>
    </section>
  );
}
