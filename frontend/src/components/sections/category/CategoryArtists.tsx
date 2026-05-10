"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import type { Category, Stylist } from "@/types";

interface Props {
  category: Category;
  stylists: Stylist[];
}

export function CategoryArtists({ category, stylists }: Props) {
  if (stylists.length === 0) return null;

  return (
    <section className="relative bg-noir py-20 md:py-28">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-2xl">
            <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-gold">
              <span className="mr-3 inline-block h-px w-8 align-middle bg-gold/60" />
              The Artists
            </span>
            <h2 className="font-display mt-4 text-3xl tracking-tight text-ivory md:text-4xl lg:text-5xl">
              The hands behind{" "}
              <span className="italic text-gold">your hour.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-ivory-dim">
            A small, hand-picked floor of artists. You'll meet the same stylist
            on your second visit, and the third — that continuity is the point.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 md:mt-16 lg:grid-cols-4 lg:gap-7">
          {stylists.map((s, idx) => (
            <motion.article
              key={s.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: idx * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group flex flex-col"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-noir-soft">
                <Image
                  src={s.image}
                  alt={s.name}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  quality={82}
                  className="object-cover opacity-90 transition-all duration-700 group-hover:scale-[1.04] group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-linear-to-t from-noir via-noir/15 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-50" />

                {/* Years badge */}
                <div className="absolute right-4 top-4 border border-ivory/25 bg-noir/55 px-2.5 py-1 backdrop-blur">
                  <span className="text-[10px] uppercase tracking-[0.22em] text-ivory/85">
                    {s.years} yrs
                  </span>
                </div>

                {/* Bottom signature */}
                <div className="absolute inset-x-4 bottom-4">
                  <span className="text-[10px] uppercase tracking-[0.22em] text-gold">
                    Signature
                  </span>
                  <p className="font-display mt-1 text-sm leading-snug tracking-tight text-ivory">
                    {s.signature}
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <h3 className="font-display text-lg tracking-tight text-ivory md:text-xl">
                  {s.name}
                </h3>
                <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-gold/80">
                  {s.role}
                </p>
                <p className="mt-3 text-[13px] leading-relaxed text-ivory-dim">
                  {s.bio}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-14 border-t border-ivory/10 pt-8 text-center">
          <p className="text-[11px] uppercase tracking-[0.22em] text-ivory/55">
            Continuity matters · The full {category.name.toLowerCase()}'s floor
            is hand-picked by our creative director
          </p>
        </div>
      </div>
    </section>
  );
}
