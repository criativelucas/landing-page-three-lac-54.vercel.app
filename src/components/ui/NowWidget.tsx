import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/site-config";
import LivePing from "./LivePing";

export default async function NowWidget() {
  const t = await getTranslations("nowWidget");

  return (
    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 rounded-full border border-surface-border bg-surface px-6 py-3 font-pixel text-xs text-muted shadow-sm md:justify-start">
      <div className="flex items-center gap-2">
        <span className="opacity-60">{t("building")}</span>
        <span className="text-ink">{siteConfig.now.building}</span>
      </div>
      <div className="hidden h-3 w-px bg-surface-border md:block" />
      <div className="flex items-center gap-2">
        <span className="opacity-60">{t("lastLaunch")}</span>
        <span className="text-ink">{siteConfig.now.lastLaunch}</span>
      </div>
      <div className="hidden h-3 w-px bg-surface-border md:block" />
      <div className="flex items-center gap-2">
        <span className="opacity-60">{t("availability")}</span>
        <span className="flex items-center gap-1.5 text-accent-ink">
          <LivePing />
          {siteConfig.now.availability}
        </span>
      </div>
    </div>
  );
}
