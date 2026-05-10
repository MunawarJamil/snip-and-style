"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const slides = [
  {
    src: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=2400&q=85",
    label: "Hair · Color · Styling",
    alt: "A guest mid-styling, framed in soft golden light",
  },
  {
    src: "https://images.unsplash.com/photo-1559599101-f09722fb4948?auto=format&fit=crop&w=2400&q=85",
    label: "Skin · Facials · Glow",
    alt: "A skin treatment in progress at a quiet salon",
  },
  {
    src: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=2400&q=85",
    label: "Grooming · Beard · Shave",
    alt: "A precision grooming session for a modern gentleman",
  },
  {
    src: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=2400&q=85",
    label: "Spa · Massage · Reset",
    alt: "Hands at work during a calm spa ritual",
  },
];

const SLIDE_MS = 5500;
const easing = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(
    () => setIndex((i) => (i + 1) % slides.length),
    [],
  );

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, SLIDE_MS);
    return () => clearInterval(id);
  }, [next, paused]);

  const current = slides[index];

  return (
    <section
      className="relative w-full overflow-hidden bg-noir"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Image stack — crossfade + subtle Ken Burns */}
      <div className="relative h-[78svh] min-h-[560px] w-full md:h-[82svh]">
        <AnimatePresence mode="sync">
          <motion.div
            key={current.src}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{
              opacity: { duration: 1.1, ease: easing },
              scale: { duration: SLIDE_MS / 1000 + 1.5, ease: "linear" },
            }}
            className="absolute inset-0"
          >
            <Image
              src={current.src}
              alt={current.alt}
              fill
              priority={index === 0}
              sizes="100vw"
              quality={88}
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Editorial gradient washes */}
        <div className="absolute inset-0 bg-linear-to-r from-noir/85 via-noir/45 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-noir via-noir/30 to-transparent" />

        {/* Content */}
        <div className="container-narrow relative flex h-full flex-col justify-end pb-20 md:justify-center md:pb-0">
          {/* Eyebrow — animates per slide */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.label}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.6, ease: easing }}
                className="inline-flex w-fit items-center gap-3 text-[10px] font-medium uppercase tracking-[0.3em] text-gold"
              >
                <span className="inline-block h-px w-10 bg-gold/60" />
                <Sparkles className="size-3" />
                <span>{current.label}</span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Static headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: easing, delay: 0.15 }}
            className="font-display mt-5 max-w-3xl text-5xl leading-[0.98] tracking-tight text-ivory sm:text-6xl md:text-[4.5rem] lg:text-[5.25rem]"
          >
            The art of <span className="italic text-gold">becoming.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easing, delay: 0.35 }}
            className="mt-6 max-w-lg text-base leading-relaxed text-ivory/75 md:text-[1.05rem]"
          >
            Hair, skin, and grooming services delivered with the precision of
            a tailor and the patience of a portrait painter. For her. For him.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easing, delay: 0.5 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
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
              <Link href="/services/women">View the menu</Link>
            </Button>
          </motion.div>

          {/* Bottom strip — slide counter + dots */}
          <div className="absolute inset-x-0 bottom-6 md:bottom-10">
            <div className="container-narrow flex items-center justify-between">
              <div className="font-display text-sm tracking-widest text-ivory/60">
                <span className="text-ivory">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="mx-2 text-ivory/30">/</span>
                <span>{String(slides.length).padStart(2, "0")}</span>
              </div>

              <div className="flex items-center gap-3">
                {slides.map((s, i) => (
                  <button
                    key={s.src}
                    aria-label={`Go to slide ${i + 1}`}
                    onClick={() => setIndex(i)}
                    className="group relative h-px w-10 overflow-hidden bg-ivory/20 transition-colors hover:bg-ivory/40"
                  >
                    <span
                      className={cn(
                        "absolute inset-y-0 left-0 bg-gold transition-all",
                        i === index
                          ? paused
                            ? "w-full duration-200"
                            : "w-full"
                          : "w-0 duration-200",
                      )}
                      style={
                        i === index && !paused
                          ? {
                              animation: `hero-progress ${SLIDE_MS}ms linear forwards`,
                            }
                          : undefined
                      }
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Keyframes for the progress fill */}
      <style jsx>{`
        @keyframes hero-progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
