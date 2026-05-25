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
    <main className="bg-noir relative flex min-h-screen items-center justify-center px-6 py-24">
      <div className="from-noir via-noir-soft to-noir absolute inset-0 -z-10 bg-linear-to-br" />

      <div className="border-ivory/10 bg-noir-soft w-full max-w-md border p-8 md:p-10">
        <span className="text-gold text-[10px] font-medium tracking-[0.3em] uppercase">
          <span className="bg-gold/60 mr-3 inline-block h-px w-8 align-middle" />
          Guest sign in
        </span>
        <h1 className="font-display text-ivory mt-5 text-3xl leading-tight tracking-tight md:text-4xl">
          Welcome back to{" "}
          <span className="text-gold italic">{siteConfig.name}.</span>
        </h1>
        <p className="text-ivory-dim mt-4 text-sm leading-relaxed">
          Guest accounts are arriving soon — you'll be able to track upcoming
          appointments, save preferred stylists, and view your aftercare cards
          all in one place.
        </p>

        <div className="border-ivory/10 mt-8 space-y-3 border-t pt-7">
          <div className="text-ivory-dim flex items-start gap-3 text-sm">
            <ShieldCheck className="text-gold/80 mt-0.5 size-4 shrink-0" />
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
            className="group bg-gold text-noir hover:bg-ivory h-12 rounded-none px-7"
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
              className="border-ivory/15 text-ivory hover:bg-ivory/5 hover:text-ivory h-12 rounded-none border px-4"
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
              className="border-ivory/15 text-ivory hover:bg-ivory/5 hover:text-ivory h-12 rounded-none border px-4"
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

        <div className="border-ivory/10 mt-8 border-t pt-5 text-center">
          <Link
            href="/"
            className="text-ivory/55 hover:text-gold text-[11px] tracking-[0.22em] uppercase transition-colors"
          >
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
