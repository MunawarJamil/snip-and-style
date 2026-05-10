"use client";

import { motion } from "framer-motion";

import type { CategoryContent } from "@/types";

interface Props {
  content: CategoryContent;
}

export function CategoryPillars({ content }: Props) {
  return (
    <section className="relative border-y border-ivory/10 bg-noir-soft">
      <div className="container-narrow">
        <div className="grid grid-cols-1 divide-y divide-ivory/10 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          {content.pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.55,
                delay: idx * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="px-6 py-9 md:px-8 md:py-11"
            >
              <span className="font-display text-2xl text-gold/60">
                0{idx + 1}
              </span>
              <h3 className="font-display mt-4 text-lg tracking-tight text-ivory md:text-xl">
                {pillar.title}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-ivory-dim">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
