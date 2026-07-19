// Single source of truth so the WhatsApp number and the "slots left" claim never
// drift out of sync between the sections that mention them.
export const WHATSAPP_NUMBER = "5592993625934";
export const SLOTS_LEFT_THIS_MONTH = 3;

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
