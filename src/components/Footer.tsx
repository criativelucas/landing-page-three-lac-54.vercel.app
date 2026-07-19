import { getTranslations } from "next-intl/server";
import Logomark from "./Logomark";
import VideoBackdrop from "./ui/VideoBackdrop";

export default async function Footer() {
  const t = await getTranslations("footer");

  return (
    <footer className="relative overflow-hidden bg-ink px-6 py-10">
      <VideoBackdrop opacityClass="opacity-[0.10]" />
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-sm text-white/70 md:flex-row">
        <span className="flex items-center gap-2 font-display font-bold text-white">
          <Logomark className="h-4 w-4 text-accent" />
          think.studio
        </span>
        <span>hello@thinkstudio.dev</span>
        <span>{t("tagline")}</span>
      </div>
    </footer>
  );
}
