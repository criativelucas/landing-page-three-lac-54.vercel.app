"use server";

import { Resend } from "resend";

export interface QuoteFormState {
  status: "idle" | "success" | "error";
  messageKey?: "missingFields" | "invalidEmail" | "success";
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LEAD_INBOX = "criativelucas@gmail.com";

// Requires RESEND_API_KEY in the environment (Vercel project settings or
// .env.local). Without it, submissions still work — they just only land in
// the server log below, not your inbox.
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function submitQuoteRequest(
  _prevState: QuoteFormState,
  formData: FormData
): Promise<QuoteFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const website = String(formData.get("website") ?? "").trim();

  if (!name || !email) {
    return { status: "error", messageKey: "missingFields" };
  }
  if (!EMAIL_RE.test(email)) {
    return { status: "error", messageKey: "invalidEmail" };
  }

  console.log("[quote request]", { name, email, website });

  if (resend) {
    try {
      await resend.emails.send({
        from: "think.studio <onboarding@resend.dev>",
        to: LEAD_INBOX,
        replyTo: email,
        subject: `New quote request — ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nCurrent website: ${website || "—"}`,
      });
    } catch (err) {
      // Don't fail the visitor's submission over a downstream delivery
      // hiccup — the console log above is still the fallback record.
      console.error("[quote request] email delivery failed", err);
    }
  } else {
    console.warn("[quote request] RESEND_API_KEY not set — email not sent");
  }

  return { status: "success", messageKey: "success" };
}
