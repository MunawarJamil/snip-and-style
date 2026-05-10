"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import type { Category, CategoryContent } from "@/types";

interface Props {
  category: Category;
  content: CategoryContent;
}

export function CategoryCTA({ category, content }: Props) {
  return (
    <section className="relative overflow-hidden bg-noir">
      <div className="relative h-[420px] w-full md:h-[520px]">
        <Image
          src={content.heroImage}
          alt=""
          fill
          sizes="100vw"
          quality={88}
          className="object-cover opacity-65"
        />
        <div className="absolute inset-0 bg-linear-to-t from-noir via-noir/70 to-noir/30" />
        <div className="absolute inset-0 bg-linear-to-r from-noir/85 via-transparent to-noir/85" />

        <div className="container-narrow relative flex h-full items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-gold">
              <span className="mr-3 inline-block h-px w-8 align-middle bg-gold/60" />
              Reserve your hour
            </span>
            <h2 className="font-display mt-5 text-4xl leading-[1.02] tracking-tight text-ivory md:text-5xl lg:text-[3.75rem]">
              The chair is{" "}
              <span className="italic text-gold">waiting.</span>
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-ivory/80 md:text-base">
              Book online in under a minute, or call us — whichever you prefer.
              Either way, the same artist will see you through the door.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                asChild
                size="lg"
                className="group h-12 rounded-none bg-gold px-7 text-noir hover:bg-ivory"
              >
                <Link href="/book" className="flex items-center">
                  Book {category.name.toLowerCase()}'s appointment
                  <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="h-12 rounded-none border border-ivory/20 px-7 text-ivory hover:bg-ivory/5 hover:text-ivory"
              >
                <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}>
                  Call {siteConfig.contact.phone}
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
