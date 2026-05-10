"use client";

import { motion } from "framer-motion";

import type { CategoryContent } from "@/types";

interface Props {
  content: CategoryContent;
}

export function CategoryProcess({ content }: Props) {
  return (
    <section className="relative bg-noir-soft py-20 md:py-28">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-gold">
            Your visit
          </span>
          <h2 className="font-display mt-4 text-3xl tracking-tight text-ivory md:text-4xl lg:text-5xl">
            Four quiet steps,{" "}
            <span className="italic text-gold">no surprises.</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ivory-dim md:text-base">
            We've designed every appointment around the same simple rhythm.
            You'll know what's happening, and why, the entire way through.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-px overflow-hidden border border-ivory/10 bg-ivory/10 md:mt-20 md:grid-cols-4">
          {content.process.map((step, idx) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.55,
                delay: idx * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative flex flex-col bg-noir p-8 transition-colors duration-500 hover:bg-noir-panel md:p-10"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-4xl text-gold">
                  0{idx + 1}
                </span>
                <span className="text-[10px] uppercase tracking-[0.28em] text-ivory/40">
                  Step
                </span>
              </div>

              <div className="mt-10 h-px w-10 bg-gold/40 transition-all duration-500 group-hover:w-16" />

              <h3 className="font-display mt-6 text-xl tracking-tight text-ivory md:text-[1.4rem]">
                {step.title}
              </h3>
              <p className="mt-3 text-[13px] leading-relaxed text-ivory-dim md:text-sm">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
