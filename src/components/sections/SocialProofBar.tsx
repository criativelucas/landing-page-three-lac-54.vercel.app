import { getTranslations } from "next-intl/server";
import { SLOTS_LEFT_THIS_MONTH } from "@/lib/site-config";
import ScrollMarquee from "@/components/ui/ScrollMarquee";

export default async function SocialProofBar() {
  const t = await getTranslations("socialProof");

  const items = [
    t("foundingClients"),
    t("slotsLeft", { count: SLOTS_LEFT_THIS_MONTH }),
    t("regions"),
  ];

  return <ScrollMarquee items={items} />;
}
