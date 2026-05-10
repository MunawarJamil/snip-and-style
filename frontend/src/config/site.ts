export const siteConfig = {
  name: "Snip & Style",
  tagline: "Where craft meets character.",
  description:
    "An elevated beauty experience for him and her. Master stylists, premium products, and online booking that respects your time.",
  contact: {
    phone: "+92 300 123 4567",
    email: "hello@snipandstyle.pk",
    address: "12-C, Main Boulevard, Gulberg III, Lahore",
    whatsapp: "+923135044999",
  },
  hours: [
    { day: "Mon – Fri", time: "10:00 — 21:00" },
    { day: "Saturday", time: "09:00 — 22:00" },
    { day: "Sunday", time: "11:00 — 19:00" },
  ],
  social: {
    instagram: "https://instagram.com/snipandstyle",
    facebook: "https://facebook.com/snipandstyle",
    tiktok: "https://tiktok.com/@snipandstyle",
  },
  nav: [
    { href: "/", label: "Home" },
    { href: "/services/women", label: "Women" },
    { href: "/services/men", label: "Men" },
    { href: "/book", label: "Book" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
