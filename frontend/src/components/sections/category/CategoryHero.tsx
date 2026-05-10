"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Category, CategoryContent, Service } from "@/types";

const easing = [0.22, 1, 0.36, 1] as const;

interface Props {
  category: Category;
  content: CategoryContent;
  services: Service[];
}

export function CategoryHero({ category, content, services }: Props) {
  return (
    <section className="relative overflow-hidden bg-noir pt-28 md:pt-32">
      {/* Background image — soft, far back */}
      <div className="pointer-events-none absolute inset-0">
        <Image
          src={content.heroImage}
          alt=""
          fill
          priority
          quality={85}
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-linear-to-r from-noir via-noir/85 to-noir/40" />
        <div className="absolute inset-0 bg-linear-to-t from-noir via-transparent to-noir/70" />
      </div>

      <div className="container-narrow relative">
        <div className="grid items-end gap-12 pb-16 md:grid-cols-12 md:gap-10 md:pb-24">
          {/* Left — copy */}
          <div className="md:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easing }}
              className="inline-flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.3em] text-gold"
            >
              <span className="inline-block h-px w-10 bg-gold/60" />
              <Sparkles className="size-3" />
              <span>{content.heroEyebrow}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: easing, delay: 0.12 }}
              className="font-display mt-6 text-5xl leading-[0.98] tracking-tight text-ivory sm:text-6xl md:text-[4.25rem] lg:text-[5.25rem]"
            >
              {content.heroTitle}{" "}
              <span className="italic text-gold">{content.heroAccent}</span>
              {content.heroSuffix}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: easing, delay: 0.3 }}
              className="mt-7 max-w-xl text-base leading-relaxed text-ivory/75 md:text-[1.05rem]"
            >
              {content.heroLead}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: easing, delay: 0.45 }}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Button
                asChild
                size="lg"
                className="group h-12 rounded-none bg-gold px-7 text-noir hover:bg-ivory"
              >
                <Link
                  href={`/book?category=${category.id}`}
                  className="flex items-center"
                >
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
                <Link href="#menu">View the menu</Link>
              </Button>
            </motion.div>

            {/* Meta strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, ease: easing, delay: 0.6 }}
              className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-ivory/10 pt-6 text-[11px] uppercase tracking-[0.22em] text-ivory/55"
            >
              <span className="inline-flex items-center gap-2">
                <MapPin className="size-3.5 text-gold/70" />
                Lahore · Gulberg III
              </span>
              <span className="hidden h-3 w-px bg-ivory/15 sm:block" />
              <span>By appointment</span>
              <span className="hidden h-3 w-px bg-ivory/15 sm:block" />
              <span>
                <span className="text-ivory">{services.length}</span> services
              </span>
              <span className="hidden h-3 w-px bg-ivory/15 sm:block" />
              <span>
                <span className="text-ivory">9</span> years open
              </span>
            </motion.div>
          </div>

          {/* Right — portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: easing, delay: 0.25 }}
            className="md:col-span-5"
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden">
              <Image
                src={content.heroPortrait}
                alt=""
                fill
                priority
                quality={88}
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
              {/* Gold corner accents */}
              <div className="pointer-events-none absolute left-0 top-0 size-12 border-l border-t border-gold/60" />
              <div className="pointer-events-none absolute bottom-0 right-0 size-12 border-b border-r border-gold/60" />

              {/* Press quote panel */}
              <div className="absolute inset-x-4 bottom-4 bg-noir/85 p-5 backdrop-blur-md md:inset-x-5 md:bottom-5 md:p-6">
                <p className="font-display text-sm leading-snug tracking-tight text-ivory md:text-[15px]">
                  &ldquo;{content.heroQuote}&rdquo;
                </p>
                <p className="mt-3 text-[10px] uppercase tracking-[0.22em] text-gold">
                  {content.heroQuoteAttribution}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
