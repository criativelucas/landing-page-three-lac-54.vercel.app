import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import { getLocale, getTranslations } from "next-intl/server";
import Logomark from "@/components/Logomark";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Reveal from "@/components/ui/Reveal";

// 1:1 meeting deck, presented by Lucas over screen share — not a public page.
// Argument order is the sales arc (diagnosis → cost → proof → stack → price):
// the price does not exist on screen until slide 9. Personalisation comes from
// query params with generic fallbacks so a bare /pitch never breaks.
// Playbook: Business Plan/apresentacao-reuniao-plan.md

const DEMO_URL = "https://duo-clinic-eosin.vercel.app";
const CASES = [
  { dir: "duoclinic", url: "duo-clinic-eosin.vercel.app", niche: "case1Niche", name: "case1Name" },
  { dir: "efraim", url: "site-efraim.vercel.app", niche: "case2Niche", name: "case2Name" },
] as const;

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function first(v: string | string[] | undefined): string | undefined {
  return Array.isArray(v) ? v[0] : v;
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const t = await getTranslations("pitch");
  const client = first((await searchParams).client) ?? t("cover.defaultClient");
  return {
    title: t("meta.title", { client }),
    robots: { index: false, follow: false },
  };
}

function Slide({ n, children }: { n: number; children: ReactNode }) {
  return (
    <section className="relative flex min-h-svh snap-start flex-col justify-center px-6 py-16 md:px-16">
      <span className="absolute bottom-6 right-6 font-pixel text-xs text-white/30">
        {String(n).padStart(2, "0")} / 10
      </span>
      <div className="mx-auto w-full max-w-5xl">{children}</div>
    </section>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="mb-6 font-pixel text-xs tracking-widest text-accent">{children}</p>;
}

function BrowserFrame({ url, children }: { url: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/15 bg-white/5">
      <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2">
        <span className="flex gap-1.5" aria-hidden>
          <i className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <i className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <i className="h-2.5 w-2.5 rounded-full bg-white/20" />
        </span>
        <span className="truncate font-pixel text-[10px] text-white/40">{url}</span>
      </div>
      <div className="relative aspect-[16/10]">{children}</div>
    </div>
  );
}

function PhoneShot({ shot, alt, placeholder }: { shot?: string; alt: string; placeholder: string }) {
  return (
    <div className="relative mx-auto aspect-9/19 w-52 shrink-0 overflow-hidden rounded-[2rem] border-4 border-white/15 bg-white/5 md:w-60">
      {shot ? (
        <Image
          src={`/pitch/${shot}`}
          alt={alt}
          fill
          sizes="240px"
          className="object-cover object-top"
        />
      ) : (
        <div className="flex h-full flex-col gap-3 p-4" aria-hidden>
          <div className="h-20 rounded-lg bg-white/10" />
          <div className="h-3 w-3/4 rounded bg-white/10" />
          <div className="h-3 w-1/2 rounded bg-white/10" />
          <div className="h-24 rounded-lg bg-white/10" />
          <div className="h-3 w-2/3 rounded bg-white/10" />
          <p className="mt-auto font-pixel text-[10px] leading-relaxed text-white/40">{placeholder}</p>
        </div>
      )}
    </div>
  );
}

export default async function PitchPage({ searchParams }: { searchParams: SearchParams }) {
  const [t, locale, params] = await Promise.all([
    getTranslations("pitch"),
    getLocale(),
    searchParams,
  ]);

  const client = first(params.client) ?? t("cover.defaultClient");
  const reviews = first(params.reviews) ?? "100+";
  const stars = first(params.stars) ?? "4.8";
  const load = first(params.load) ?? "4";
  const taken = first(params.slots) ?? "2";
  const day = first(params.day) ?? t("next.defaultDay");
  // Screenshot filename under public/pitch/. Whitelist chars: this value lands
  // in a path, so nothing outside plain filenames gets through.
  const rawShot = first(params.shot);
  const shot = rawShot && /^[\w.-]+$/.test(rawShot) ? rawShot : undefined;

  const ticketNum = Number.parseInt(first(params.ticket) ?? "", 10);
  const ticket = Number.isFinite(ticketNum) && ticketNum > 0 ? ticketNum : 350;
  const money = new Intl.NumberFormat(locale === "pt" ? "pt-BR" : "en-US", {
    style: "currency",
    currency: locale === "pt" ? "BRL" : "USD",
    maximumFractionDigits: 0,
  });

  const accent = (chunks: ReactNode) => <span className="text-accent">{chunks}</span>;
  const strike = (chunks: ReactNode) => <s className="opacity-50">{chunks}</s>;

  return (
    <main data-pitch-root id="main-content" className="flex-1 bg-ink text-white">
      {/* 1 — Cover */}
      <Slide n={1}>
        <LanguageSwitcher className="absolute right-6 top-6" />
        <Reveal>
          <div className="flex flex-wrap items-center gap-3 text-lg text-white/70">
            <span className="font-display font-semibold text-white">{client}</span>
            <span aria-hidden>×</span>
            <span className="inline-flex items-center gap-2">
              <Logomark className="h-5 w-5 text-accent" />
              <span className="font-display font-semibold text-white">think.studio</span>
            </span>
          </div>
          <h1 className="mt-8 max-w-4xl font-display text-5xl font-bold tracking-tight md:text-7xl">
            {t.rich("cover.headline", { accent })}
          </h1>
          <p className="mt-16 animate-bounce font-pixel text-xs text-white/40">{t("cover.hint")}</p>
        </Reveal>
      </Slide>

      {/* 2 — Diagnosis */}
      <Slide n={2}>
        <Reveal>
          <Eyebrow>{t("diagnosis.eyebrow")}</Eyebrow>
          <div className="flex flex-col items-start gap-10 md:flex-row md:items-center">
            <PhoneShot shot={shot} alt={client} placeholder={t("diagnosis.placeholder")} />
            <div>
              <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
                {t("diagnosis.heading")}
              </h2>
              <ul className="mt-8 space-y-3">
                {(["chip1", "chip2", "chip3"] as const).map((key) => (
                  <li
                    key={key}
                    className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white/85"
                  >
                    <span aria-hidden className="text-red-400">✕</span>
                    {t(`diagnosis.${key}`, { load })}
                  </li>
                ))}
              </ul>
              <p className="mt-6 max-w-xl text-white/60">{t("diagnosis.note")}</p>
            </div>
          </div>
        </Reveal>
      </Slide>

      {/* 3 — Cost */}
      <Slide n={3}>
        <Reveal>
          <Eyebrow>{t("cost.eyebrow")}</Eyebrow>
          <h2 className="max-w-3xl font-display text-3xl font-bold tracking-tight md:text-5xl">
            {t("cost.heading", { reviews, stars })}
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-white/70">{t("cost.body")}</p>
          <div className="mt-10 max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10">
            <p className="text-lg text-white/85">{t("cost.math", { ticket: money.format(ticket) })}</p>
            <p className="mt-3 font-display text-3xl font-bold text-accent md:text-4xl">
              {t("cost.result", { yearly: money.format(ticket * 24) })}
            </p>
          </div>
          <p className="mt-6 max-w-xl text-white/60">{t("cost.note")}</p>
        </Reveal>
      </Slide>

      {/* 4 — What good looks like */}
      <Slide n={4}>
        <Reveal>
          <Eyebrow>{t("compare.eyebrow")}</Eyebrow>
          <h2 className="max-w-3xl font-display text-3xl font-bold tracking-tight md:text-5xl">
            {t("compare.heading")}
          </h2>
          <div className="mt-10 grid items-start gap-8 md:grid-cols-[auto_1fr]">
            <div>
              <p className="mb-3 font-pixel text-xs text-white/40">{t("compare.before")}</p>
              <PhoneShot shot={shot} alt={client} placeholder={t("diagnosis.placeholder")} />
            </div>
            <div>
              <p className="mb-3 font-pixel text-xs text-accent">{t("compare.after")}</p>
              <BrowserFrame url={CASES[0].url}>
                <Image
                  src={`/work/${CASES[0].dir}/desktop.png`}
                  alt={t(`proof.${CASES[0].name}`)}
                  fill
                  sizes="(min-width: 768px) 640px, 90vw"
                  className="object-cover object-top"
                />
              </BrowserFrame>
              <ul className="mt-6 space-y-2 text-white/85">
                {(["point1", "point2", "point3"] as const).map((key) => (
                  <li key={key} className="flex items-start gap-3">
                    <span aria-hidden className="text-accent">✓</span>
                    {t(`compare.${key}`)}
                  </li>
                ))}
              </ul>
              <a
                href={DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block rounded-full bg-accent px-5 py-2.5 font-semibold text-accent-ink"
              >
                {t("compare.demoCta")}
              </a>
            </div>
          </div>
        </Reveal>
      </Slide>

      {/* 5 — Process */}
      <Slide n={5}>
        <Reveal>
          <Eyebrow>{t("process.eyebrow")}</Eyebrow>
          <ol className="grid gap-6 md:grid-cols-3">
            {([1, 2, 3] as const).map((step) => (
              <li key={step} className="rounded-3xl border border-white/10 bg-white/5 p-8">
                <span className="font-pixel text-xs text-accent">0{step}</span>
                <h2 className="mt-4 font-display text-2xl font-bold">{t(`process.step${step}Title`)}</h2>
                <p className="mt-3 text-white/70">{t(`process.step${step}Body`)}</p>
              </li>
            ))}
          </ol>
          <p className="mt-10 font-display text-2xl font-bold md:text-3xl">
            {t.rich("process.highlight", { accent })}
          </p>
        </Reveal>
      </Slide>

      {/* 6 — Founding story */}
      <Slide n={6}>
        <Reveal>
          <Eyebrow>{t("founding.eyebrow")}</Eyebrow>
          <h2 className="max-w-4xl font-display text-3xl font-bold tracking-tight md:text-5xl">
            {t.rich("founding.heading", { accent })}
          </h2>
          <p className="mt-8 max-w-2xl text-lg text-white/70">{t("founding.trade")}</p>
          <p className="mt-10 inline-block rounded-full border border-accent/40 px-5 py-2.5 font-pixel text-xs text-accent">
            {t("founding.slots", { taken })}
          </p>
        </Reveal>
      </Slide>

      {/* 7 — Proof */}
      <Slide n={7}>
        <Reveal>
          <Eyebrow>{t("proof.eyebrow")}</Eyebrow>
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
            {t("proof.heading")}
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {CASES.map((c) => (
              <div key={c.dir}>
                <BrowserFrame url={c.url}>
                  <Image
                    src={`/work/${c.dir}/desktop.png`}
                    alt={t(`proof.${c.name}`)}
                    fill
                    sizes="(min-width: 768px) 480px, 90vw"
                    className="object-cover object-top"
                  />
                </BrowserFrame>
                <div className="mt-4 flex items-baseline justify-between gap-4">
                  <p>
                    <span className="font-display font-bold">{t(`proof.${c.name}`)}</span>
                    <span className="ml-2 text-sm text-white/50">{t(`proof.${c.niche}`)}</span>
                  </p>
                  <a
                    href={`https://${c.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 text-sm text-accent underline-offset-4 hover:underline"
                  >
                    {t("proof.visit")}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Slide>

      {/* 8 — Everything included (still no price) */}
      <Slide n={8}>
        <Reveal>
          <Eyebrow>{t("stack.eyebrow")}</Eyebrow>
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
            {t("stack.heading")}
          </h2>
          <ul className="mt-10 grid gap-4 md:grid-cols-2">
            {(["i1", "i2", "i3", "i4", "i5", "i6"] as const).map((key) => (
              <li
                key={key}
                className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white/85"
              >
                <span aria-hidden className="text-accent">✓</span>
                {t(`stack.${key}`)}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-white/60">{t("stack.note")}</p>
        </Reveal>
      </Slide>

      {/* 9 — Price. Only now. */}
      <Slide n={9}>
        <Reveal>
          <Eyebrow>{t("invest.eyebrow")}</Eyebrow>
          <p className="text-lg text-white/70">{t.rich("invest.anchor", { strike })}</p>
          <p className="mt-2 text-lg text-white/70">{t.rich("invest.standard", { strike })}</p>
          <p className="mt-6 font-display text-7xl font-bold tracking-tight text-accent md:text-8xl">
            {t("invest.price")}
          </p>
          <p className="mt-2 font-pixel text-xs text-white/50">{t("invest.priceNote")}</p>
          <p className="mt-10 max-w-2xl font-display text-2xl font-bold md:text-3xl">
            {t.rich("invest.risk", { accent })}
          </p>
          <p className="mt-8 max-w-xl text-white/60">{t("invest.guarantee")}</p>
        </Reveal>
      </Slide>

      {/* 10 — Next step */}
      <Slide n={10}>
        <Reveal>
          <h2 className="font-display text-5xl font-bold tracking-tight md:text-7xl">
            {t("next.heading")}
          </h2>
          <p className="mt-8 max-w-2xl text-lg text-white/70">{t("next.body")}</p>
          <p className="mt-6 font-display text-2xl font-bold text-accent md:text-3xl">
            {t("next.live", { day })}
          </p>
        </Reveal>
      </Slide>
    </main>
  );
}
