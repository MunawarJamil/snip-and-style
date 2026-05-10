import Link from "next/link";
import { Clock, Mail, MapPin, Phone, Scissors } from "lucide-react";

import { siteConfig } from "@/config/site";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M13.5 21v-7.5h2.5l.5-3h-3V8.6c0-.9.3-1.5 1.6-1.5H17V4.4c-.3 0-1.4-.1-2.5-.1-2.5 0-4 1.5-4 4.2V10.5H8v3h2.5V21h3z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative bg-noir">
      {/* Hairline accent above */}
      <div className="container-narrow">
        <div className="h-px w-full bg-linear-to-r from-transparent via-gold/30 to-transparent" />
      </div>

      <div className="container-narrow grid gap-14 py-20 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-full border border-ivory/15 bg-ivory/5">
              <Scissors className="size-4 text-gold" />
            </span>
            <span className="font-display text-xl tracking-tight text-ivory">
              {siteConfig.name}
            </span>
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-ivory-dim">
            {siteConfig.tagline} A small, considered space for hair, skin, and
            grooming.
          </p>
          <div className="mt-8 flex items-center gap-3">
            <Link
              href={siteConfig.social.instagram}
              aria-label="Instagram"
              className="flex size-9 items-center justify-center border border-ivory/15 text-ivory/70 transition-colors hover:border-gold hover:text-gold"
            >
              <InstagramIcon className="size-4" />
            </Link>
            <Link
              href={siteConfig.social.facebook}
              aria-label="Facebook"
              className="flex size-9 items-center justify-center border border-ivory/15 text-ivory/70 transition-colors hover:border-gold hover:text-gold"
            >
              <FacebookIcon className="size-4" />
            </Link>
          </div>
        </div>

        <div className="md:col-span-3">
          <h3 className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold">
            Visit
          </h3>
          <ul className="mt-5 space-y-4 text-sm text-ivory-dim">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold/80" />
              <span>{siteConfig.contact.address}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Phone className="mt-0.5 size-4 shrink-0 text-gold/80" />
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                className="transition-colors hover:text-ivory"
              >
                {siteConfig.contact.phone}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Mail className="mt-0.5 size-4 shrink-0 text-gold/80" />
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="transition-colors hover:text-ivory"
              >
                {siteConfig.contact.email}
              </a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h3 className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold">
            Hours
          </h3>
          <ul className="mt-5 space-y-4 text-sm text-ivory-dim">
            {siteConfig.hours.map((h) => (
              <li key={h.day} className="flex items-start gap-2.5">
                <Clock className="mt-0.5 size-4 shrink-0 text-gold/80" />
                <span className="flex flex-1 justify-between gap-4">
                  <span>{h.day}</span>
                  <span className="text-ivory">{h.time}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <h3 className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold">
            Explore
          </h3>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <Link
                href="/services/women"
                className="text-ivory-dim transition-colors hover:text-ivory"
              >
                Women
              </Link>
            </li>
            <li>
              <Link
                href="/services/men"
                className="text-ivory-dim transition-colors hover:text-ivory"
              >
                Men
              </Link>
            </li>
            <li>
              <Link
                href="/book"
                className="text-ivory-dim transition-colors hover:text-ivory"
              >
                Book
              </Link>
            </li>
            <li>
              <Link
                href="/login"
                className="text-ivory-dim transition-colors hover:text-ivory"
              >
                Sign in
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ivory/8">
        <div className="container-narrow flex flex-col items-center justify-between gap-3 py-6 text-[11px] uppercase tracking-[0.18em] text-ivory/45 md:flex-row">
          <span>
            © {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
          </span>
          <span className="font-display tracking-wide normal-case text-ivory/55">
            Crafted with care in Lahore.
          </span>
        </div>
      </div>
    </footer>
  );
}
