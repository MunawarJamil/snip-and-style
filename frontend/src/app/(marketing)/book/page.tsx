import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";

import { BookingForm } from "@/components/forms/BookingForm";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Book — Snip & Style",
  description:
    "Reserve your hour at Snip & Style. Pick a studio, a service, and a slot — our team will confirm by phone within the hour.",
};

export default function BookPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-noir pt-28 md:pt-32">
        <div className="pointer-events-none absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=2000&q=85"
            alt=""
            fill
            priority
            sizes="100vw"
            quality={80}
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-linear-to-r from-noir via-noir/85 to-noir/40" />
          <div className="absolute inset-0 bg-linear-to-t from-noir via-transparent to-noir/70" />
        </div>

        <div className="container-narrow relative">
          <div className="max-w-3xl pb-14 md:pb-20">
            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-gold">
              <span className="mr-3 inline-block h-px w-10 align-middle bg-gold/60" />
              Reserve your hour
            </span>
            <h1 className="font-display mt-6 text-4xl leading-[1.02] tracking-tight text-ivory sm:text-5xl md:text-6xl lg:text-[4.25rem]">
              Book a {" "}
              <span className="italic text-gold">considered hour.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ivory/75 md:text-[1.05rem]">
              Tell us a little about your visit. Our front desk will confirm
              your slot by phone within the hour, and a single artist will see
              you through from greeting to goodbye.
            </p>

            <div className="mt-9 grid max-w-xl grid-cols-3 gap-px overflow-hidden border border-ivory/10 bg-ivory/10">
              <Stat label="Reply within" value="< 1 hr" />
              <Stat label="Slots a day" value="24" />
              <Stat label="Cancellation" value="Free 24h" />
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="relative bg-noir py-16 md:py-24">
        <div className="container-narrow">
          <Suspense
            fallback={
              <div className="text-sm text-ivory-dim">Loading the form…</div>
            }
          >
            <BookingForm />
          </Suspense>
        </div>
      </section>

      {/* Below — light reassurance strip */}
      <section className="border-t border-ivory/10 bg-noir-soft py-10">
        <div className="container-narrow grid gap-6 text-sm md:grid-cols-3 md:gap-10">
          <ContactRow
            label="Call the front desk"
            value={siteConfig.contact.phone}
            href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
          />
          <ContactRow
            label="WhatsApp"
            value={siteConfig.contact.whatsapp}
            href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, "")}`}
          />
          <ContactRow
            label="Visit"
            value={siteConfig.contact.address}
          />
        </div>
      </section>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-noir px-4 py-5 text-center md:px-5 md:py-6">
      <div className="font-display text-xl tracking-tight text-ivory md:text-2xl">
        {value}
      </div>
      <div className="mt-1 text-[10px] uppercase tracking-[0.22em] text-ivory/55">
        {label}
      </div>
    </div>
  );
}

function ContactRow({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <>
      <span className="text-[10px] uppercase tracking-[0.22em] text-gold">
        {label}
      </span>
      <span className="mt-1.5 block text-ivory">{value}</span>
    </>
  );
  if (href)
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        className="block transition-colors hover:text-gold"
      >
        {content}
      </a>
    );
  return <div>{content}</div>;
}
