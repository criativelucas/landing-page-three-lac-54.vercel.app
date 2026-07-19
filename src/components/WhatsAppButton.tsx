import { getTranslations } from "next-intl/server";
import { buildWhatsAppUrl } from "@/lib/site-config";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

export default async function WhatsAppButton() {
  const t = await getTranslations("whatsapp");

  return (
    <a
      href={buildWhatsAppUrl(t("defaultMessage"))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("ariaLabel")}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110"
    >
      <WhatsAppIcon />
    </a>
  );
}
