"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { categories } from "@/data/services";
import { cn } from "@/lib/utils";

export function CategoryCards() {
  return (
    <section className="relative bg-noir py-20 md:py-24">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-2xl">
            <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-gold">
              <span className="mr-3 inline-block h-px w-8 align-middle bg-gold/60" />
              Two studios
            </span>
            <h2 className="font-display mt-4 text-3xl tracking-tight text-ivory md:text-4xl lg:text-5xl">
              Choose your <span className="italic text-gold">space.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-ivory-dim md:text-base">
            Each side of the salon is shaped to its guests — different
            atmospheres, the same obsession with craft.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2 md:gap-6">
          {categories.map((category, idx) => {
            const isWomen = category.id === "women";
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.7,
                  delay: idx * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link
                  href={`/services/${category.id}`}
                  className="group relative block aspect-4/5 w-full overflow-hidden bg-noir-soft sm:aspect-3/2 lg:aspect-3/2"
                >
                  <Image
                    src={category.image}
                    alt={`${category.name} services`}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    quality={90}
                    className="object-cover opacity-90 transition-all duration-[1200ms] ease-out group-hover:scale-[1.04] group-hover:opacity-100"
                  />

                  {/* Editorial overlay — uniform dark wash with subtle directional gradient */}
                  <div
                    className={cn(
                      "absolute inset-0 transition-opacity duration-700",
                      isWomen
                        ? "bg-linear-to-t from-noir via-noir/55 to-noir/20"
                        : "bg-linear-to-t from-noir via-noir/65 to-noir/30",
                    )}
                  />

                  {/* Hairline frame on hover */}
                  <div className="pointer-events-none absolute inset-4 border border-ivory/0 transition-colors duration-500 group-hover:border-ivory/25" />

                  {/* Top label */}
                  <div className="absolute left-6 top-6 md:left-7 md:top-7">
                    <span
                      className={cn(
                        "inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.3em]",
                        isWomen ? "text-gold" : "text-ivory/70",
                      )}
                    >
                      <span
                        className={cn(
                          "inline-block h-px w-6",
                          isWomen ? "bg-gold/60" : "bg-ivory/40",
                        )}
                      />
                      For {category.name}
                    </span>
                  </div>

                  {/* Bottom content */}
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <h3 className="font-display text-2xl tracking-tight text-ivory md:text-3xl lg:text-[2.25rem]">
                          {category.tagline}
                        </h3>
                        <p className="mt-2 max-w-sm text-[13px] leading-relaxed text-ivory/65 md:text-sm">
                          {category.description}
                        </p>
                      </div>

                      <span className="flex size-10 shrink-0 items-center justify-center border border-ivory/30 text-ivory transition-all duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-noir md:size-11">
                        <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45 md:size-5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
