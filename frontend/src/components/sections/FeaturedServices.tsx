"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getFeaturedServices } from "@/data/services";
import { formatDuration, formatPKR } from "@/lib/utils";

export function FeaturedServices() {
  const services = getFeaturedServices();

  return (
    <section className="relative bg-noir-soft py-20 md:py-24">
      <div className="container-narrow">
        <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-gold">
              <span className="mr-3 inline-block h-px w-8 align-middle bg-gold/60" />
              Signature services
            </span>
            <h2 className="font-display mt-4 text-3xl tracking-tight text-ivory md:text-4xl lg:text-5xl">
              Crafted, <span className="italic text-gold">not rushed.</span>
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-ivory-dim md:text-base">
              A short look at the rituals our guests come back for — every one
              built on consultation, technique, and the right moment of pause.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Button
              asChild
              variant="ghost"
              className="group rounded-none px-0 text-ivory hover:bg-transparent hover:text-gold"
            >
              <Link href="/services/women">
                Browse the full menu
                <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service, idx) => (
            <motion.article
              key={service.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: Math.min(idx * 0.06, 0.4),
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group flex flex-col overflow-hidden border border-ivory/8 bg-noir transition-all duration-500 hover:-translate-y-1 hover:border-gold/40"
            >
              <Link
                href={`/book?service=${service.slug}&category=${service.categoryId}`}
                className="flex h-full flex-col"
              >
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    quality={75}
                    className="object-cover opacity-85 transition-all duration-700 group-hover:scale-[1.04] group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-noir via-noir/30 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-40" />

                  <div className="absolute left-3 top-3">
                    <Badge
                      variant="secondary"
                      className="rounded-none border border-ivory/15 bg-noir/60 text-[9px] font-medium uppercase tracking-[0.22em] text-ivory/80 backdrop-blur"
                    >
                      For{" "}
                      {service.categoryId === "women" ? "Women" : "Men"}
                    </Badge>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-base leading-snug tracking-tight text-ivory transition-colors group-hover:text-gold md:text-[1.05rem]">
                    {service.name}
                  </h3>
                  <p className="mt-1.5 line-clamp-2 text-[12.5px] leading-relaxed text-ivory-dim">
                    {service.description}
                  </p>

                  <div className="mt-auto flex items-center justify-between border-t border-ivory/8 pt-4">
                    <div className="flex items-center gap-1.5 text-[11px] text-ivory/55">
                      <Clock className="size-3" />
                      <span>{formatDuration(service.duration)}</span>
                    </div>
                    <div className="font-display text-sm text-gold md:text-[15px]">
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
