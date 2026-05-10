"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

import { testimonials } from "@/data/services";
import { cn } from "@/lib/utils";

export function Testimonials() {
  return (
    <section className="relative bg-noir-soft py-24 md:py-32">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold">
            Kind words
          </span>
          <h2 className="font-display mt-5 text-4xl tracking-tight text-ivory md:text-5xl lg:text-[3.5rem]">
            From our <span className="italic text-gold">chairs.</span>
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, idx) => (
            <motion.figure
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: idx * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={cn(
                "group relative flex flex-col border border-ivory/10 bg-noir p-9 transition-all duration-500",
                "hover:-translate-y-1 hover:border-gold/40",
              )}
            >
              <Quote className="absolute right-6 top-6 size-9 text-gold/15" />

              <div className="flex items-center gap-1 text-gold">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="size-3.5 fill-current" />
                ))}
              </div>

              <blockquote className="font-display mt-6 flex-1 text-lg leading-relaxed tracking-tight text-ivory/90">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <figcaption className="mt-8 border-t border-ivory/10 pt-5">
                <div className="font-medium text-ivory">{t.name}</div>
                {t.role ? (
                  <div className="mt-1 text-[10px] uppercase tracking-[0.22em] text-ivory/55">
                    {t.role}
                  </div>
                ) : null}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
