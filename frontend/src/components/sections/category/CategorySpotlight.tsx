"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Category, CategoryContent } from "@/types";

interface Props {
  category: Category;
  content: CategoryContent;
}

export function CategorySpotlight({ category, content }: Props) {
  const { spotlight } = content;

  return (
    <section className="relative bg-noir py-20 md:py-28">
      <div className="container-narrow">
        <div className="relative grid gap-0 overflow-hidden border border-ivory/10 md:grid-cols-12">
          {/* Image side */}
          <div className="relative aspect-[4/5] md:col-span-7 md:aspect-auto">
            <Image
              src={spotlight.image}
              alt={spotlight.title}
              fill
              sizes="(min-width: 768px) 58vw, 100vw"
              quality={88}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-noir/65 via-noir/15 to-transparent md:bg-linear-to-r md:from-transparent md:via-transparent md:to-noir/40" />

            {/* Gold corner accents */}
            <div className="pointer-events-none absolute left-5 top-5 size-12 border-l border-t border-gold/70" />
            <div className="pointer-events-none absolute bottom-5 right-5 size-12 border-b border-r border-gold/70" />
          </div>

          {/* Copy side */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
            className="relative flex flex-col justify-center bg-noir-soft p-8 md:col-span-5 md:p-12 lg:p-14"
          >
            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-gold">
              <span className="mr-3 inline-block h-px w-8 align-middle bg-gold/60" />
              {spotlight.eyebrow}
            </span>

            <h2 className="font-display mt-5 text-3xl leading-[1.05] tracking-tight text-ivory md:text-4xl lg:text-[2.75rem]">
              {spotlight.title}{" "}
              <span className="italic text-gold">{spotlight.accent}</span>.
            </h2>

            <p className="mt-5 text-sm leading-relaxed text-ivory-dim md:text-base">
              {spotlight.description}
            </p>

            <ul className="mt-8 space-y-3">
              {spotlight.bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-2text-[13px] leading-relaxed text-ivory/85 md:text-sm"
                >
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center border border-gold/40 text-gold">
                    <Check className="size-3" />
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                asChild
                size="lg"
                className="group h-12 rounded-none bg-gold px-2 text-noir hover:bg-ivory"
              >
                <Link
                  href={`/book?service=${spotlight.serviceSlug}&category=${category.id}`}
                  className="flex items-center"
                >
                  Book this experience
                  <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="h-12 rounded-none border border-ivory/20 px-2 text-ivory hover:bg-ivory/5 hover:text-ivory"
              >
                <Link href="/book">Book a consultation</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
