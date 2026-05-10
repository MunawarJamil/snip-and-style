import { siteConfig } from "@/config/site";

/** Strip non-digits to produce a wa.me-compatible number (no +). */
export function whatsappNumber(): string {
  return siteConfig.contact.whatsapp.replace(/\D/g, "");
}

/** Build a wa.me URL with an optional pre-filled message. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${whatsappNumber()}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
