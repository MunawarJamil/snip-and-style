import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail, Phone, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Sign in — Snip & Style",
  description: "Sign in to your Snip & Style guest account.",
};

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center bg-noir px-6 py-24">
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-noir via-noir-soft to-noir" />

      <div className="w-full max-w-md border border-ivory/10 bg-noir-soft p-8 md:p-10">
        <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-gold">
          <span className="mr-3 inline-block h-px w-8 align-middle bg-gold/60" />
          Guest sign in
        </span>
        <h1 className="font-display mt-5 text-3xl leading-tight tracking-tight text-ivory md:text-4xl">
          Welcome back to{" "}
          <span className="italic text-gold">{siteConfig.name}.</span>
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-ivory-dim">
          Guest accounts are arriving soon — you'll be able to track upcoming
          appointments, save preferred stylists, and view your aftercare cards
          all in one place.
        </p>

        <div className="mt-8 space-y-3 border-t border-ivory/10 pt-7">
          <div className="flex items-start gap-3 text-sm text-ivory-dim">
            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-gold/80" />
            <span>
              In the meantime, our front desk has every guest's history on file
              — just call or message us.
            </span>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <Button
            asChild
            size="lg"
            className="group h-12 rounded-none bg-gold px-7 text-noir hover:bg-ivory"
          >
            <Link href="/book" className="flex items-center justify-center">
              Book an appointment
              <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>

          <div className="grid grid-cols-2 gap-2">
            <Button
              asChild
              variant="ghost"
              size="lg"
              className="h-12 rounded-none border border-ivory/15 px-4 text-ivory hover:bg-ivory/5 hover:text-ivory"
            >
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                className="flex items-center justify-center gap-2"
              >
                <Phone className="size-4" />
                Call
              </a>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="lg"
              className="h-12 rounded-none border border-ivory/15 px-4 text-ivory hover:bg-ivory/5 hover:text-ivory"
            >
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center justify-center gap-2"
              >
                <Mail className="size-4" />
                Email
              </a>
            </Button>
          </div>
        </div>

        <div className="mt-8 border-t border-ivory/10 pt-5 text-center">
          <Link
            href="/"
            className="text-[11px] uppercase tracking-[0.22em] text-ivory/55 transition-colors hover:text-gold"
          >
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
