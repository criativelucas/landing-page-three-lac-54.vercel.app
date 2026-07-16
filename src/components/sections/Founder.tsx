import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

export default async function Founder() {
  const t = await getTranslations("founder");

  return (
    <section className="bg-ink py-24 text-white -mt-8 rounded-t-[2.5rem] pt-32 md:-mt-12 md:rounded-t-[4rem] md:pt-36 z-20 relative">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-24">
          <Reveal className="relative mx-auto max-w-sm md:mx-0">
            <Image
              src="/assets/founder.jpg"
              alt="Lucas"
              width={500}
              height={500}
              className="rounded-2xl object-cover shadow-2xl shadow-accent/10"
            />
          </Reveal>
          
          <div className="space-y-6">
            <Reveal delay={0.1}>
              <h2 className="font-display text-3xl font-bold md:text-4xl">
                {t("heading")}
              </h2>
            </Reveal>
            
            <Reveal delay={0.2}>
              <p className="text-lg text-white/80 leading-relaxed">
                {t("body")}
              </p>
            </Reveal>
            
            <Reveal delay={0.3}>
              <p className="font-pixel text-sm text-accent">
                {t("commitment")}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
