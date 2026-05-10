import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-noir px-6 py-24">
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-noir via-noir-soft to-noir" />

      <div className="mx-auto w-full max-w-xl text-center">
        <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-gold">
          <span className="mr-3 inline-block h-px w-10 align-middle bg-gold/60" />
          404 · Wrong door
        </span>
        <h1 className="font-display mt-6 text-5xl leading-[1.02] tracking-tight text-ivory md:text-6xl">
          That page is{" "}
          <span className="italic text-gold">between cuts.</span>
        </h1>
        <p className="mt-5 text-base leading-relaxed text-ivory-dim">
          The link you followed is no longer on our floor. Head back to the
          studio menu, or reserve your hour and we'll take it from there.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="group h-12 rounded-none bg-gold px-7 text-noir hover:bg-ivory"
          >
            <Link href="/book" className="flex items-center">
              Book an appointment
              <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="ghost"
            className="h-12 rounded-none border border-ivory/20 px-7 text-ivory hover:bg-ivory/5 hover:text-ivory"
          >
            <Link href="/">Back to home</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
