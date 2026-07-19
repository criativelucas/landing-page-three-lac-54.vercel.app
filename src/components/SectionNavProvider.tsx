import { getTranslations } from "next-intl/server";
import SectionNav from "./SectionNav";

// `dark` = the section's background is dark, so the floating rail should render
// in light ink over it (and vice-versa). Order matches page scroll order.
const SECTIONS = [
  { id: "top", key: "intro", dark: true },
  { id: "problem", key: "problem", dark: false },
  { id: "process", key: "process", dark: true },
  { id: "work", key: "work", dark: false },
  { id: "pricing", key: "pricing", dark: true },
  { id: "founder", key: "founder", dark: true },
  { id: "faq", key: "faq", dark: false },
  { id: "quote", key: "quote", dark: true },
] as const;

export default async function SectionNavProvider() {
  const t = await getTranslations("sectionNav");
  const items = SECTIONS.map((s) => ({ id: s.id, label: t(s.key), dark: s.dark }));
  return <SectionNav items={items} />;
}
