import { getTranslations } from "next-intl/server";
import { SLOTS_LEFT_THIS_MONTH } from "@/lib/site-config";

export default async function SocialProofBar() {
  const t = await getTranslations("socialProof");

  return (
    <div className="bg-accent">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-3 gap-y-2 px-6 py-3 text-center font-pixel text-xs tracking-wide text-accent-ink">
        <span>{t("foundingClients")}</span>
        <span aria-hidden className="hidden md:inline">·</span>
        <span>{t("slotsLeft", { count: SLOTS_LEFT_THIS_MONTH })}</span>
        <span aria-hidden className="hidden md:inline">·</span>
        <span>{t("regions")}</span>
      </div>
    </div>
  );
}
