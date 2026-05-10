"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";

import type { Category, Service } from "@/types";
import { formatDuration, formatPKR } from "@/lib/utils";

interface Props {
  category: Category;
  services: Service[];
}

export function CategorySignatures({ category, services }: Props) {
  const featured = services.slice(0, 3);
  if (featured.length === 0) return null;

  return (
    <section className="relative bg-noir py-20 md:py-28">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-2xl">
            <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-gold">
              <span className="mr-3 inline-block h-px w-8 align-middle bg-gold/60" />
              Signatures
            </span>
            <h2 className="font-display mt-4 text-3xl tracking-tight text-ivory md:text-4xl lg:text-5xl">
              The rituals our guests{" "}
              <span className="italic text-gold">come back for.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-ivory-dim">
            Three of the experiences that have come to define the {category.name.toLowerCase()}'s
            studio — each performed by a single artist, from greeting to goodbye.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {featured.map((service, idx) => (
            <motion.article
              key={service.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: idx * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative flex flex-col"
            >
              <Link
                href={`/services/${service.categoryId}/${service.slug}`}
                className="flex h-full flex-col"
              >
                {/* Image */}
                <div className="relative aspect-[5/6] w-full overflow-hidden bg-noir-soft lg:aspect-[4/5]">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    quality={85}
                    className="object-cover opacity-90 transition-all duration-[1100ms] ease-out group-hover:scale-[1.04] group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-noir via-noir/30 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-50" />

                  {/* Number tag */}
                  <div className="absolute left-5 top-5">
                    <span className="font-display text-3xl text-ivory/85">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Hover hairline frame */}
                  <div className="pointer-events-none absolute inset-3 border border-gold/0 transition-colors duration-500 group-hover:border-gold/40" />
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col pt-6">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-xl leading-snug tracking-tight text-ivory transition-colors group-hover:text-gold md:text-2xl">
                      {service.name}
                    </h3>
                    <span className="mt-1 flex size-9 shrink-0 items-center justify-center border border-ivory/25 text-ivory transition-all duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-noir">
                      <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45" />
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-ivory-dim">
                    {service.description}
                  </p>

                  <div className="mt-6 flex items-center justify-between border-t border-ivory/10 pt-4">
                    <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-ivory/55">
                      <Clock className="size-3" />
                      <span>{formatDuration(service.duration)}</span>
                    </div>
                    <div className="font-display text-base text-gold">
                      {formatPKR(service.price)}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
