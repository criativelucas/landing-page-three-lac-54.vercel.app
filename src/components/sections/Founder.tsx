import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

// The photo is a cut-out PNG whose subject is cropped at the source image's
// bottom edge. Floating it mid-section exposes that cut, so it is flush-mounted
// to the section's bottom edge (section has no bottom padding; the photo column
// is bottom-aligned and comes last on mobile) — the crop then reads as the
// person standing on the boundary instead of a broken cutout.
export default async function Founder() {
  const t = await getTranslations("founder");

  return (
    <section
      id="founder"
      className="relative z-20 -mt-8 scroll-mt-24 overflow-hidden rounded-t-[2.5rem] bg-ink pt-32 text-white md:-mt-12 md:rounded-t-[4rem] md:pt-36"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-end gap-12 md:grid-cols-2 md:gap-16">
          <Reveal
            y={0}
            className="relative order-2 mx-auto -mb-px w-full max-w-sm md:order-1 md:mx-0"
          >
            <div
              aria-hidden
              className="absolute inset-0 -z-10 rounded-full bg-[radial-gradient(circle_at_50%_60%,rgba(227,255,61,0.22),transparent_65%)] blur-2xl"
            />
            <Image
              src="/assets/founder.png"
              alt={t("photoAlt")}
              width={520}
              height={700}
              sizes="(min-width: 768px) 40vw, 90vw"
              className="block h-auto w-full"
            />
          </Reveal>

          <div className="order-1 space-y-6 pb-16 md:order-2 md:pb-32">
            <Reveal delay={0.1}>
              <h2 className="font-display text-3xl font-bold md:text-4xl">{t("heading")}</h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-lg leading-relaxed text-white/80">{t("body")}</p>
            </Reveal>

            <Reveal delay={0.3}>
              <p className="font-pixel text-xs leading-relaxed text-accent">{t("commitment")}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
