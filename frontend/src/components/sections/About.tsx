"use client";

import { motion } from "framer-motion";
import { GraduationCap, HandHeart, Leaf, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: GraduationCap,
    title: "Master stylists",
    description:
      "Every artist on our floor has at least seven years of clientele, mentorship, and a personal portfolio.",
  },
  {
    icon: Leaf,
    title: "Considered products",
    description:
      "Sulfate-free, ammonia-conscious, cruelty-free — chosen for performance and for what they leave out.",
  },
  {
    icon: HandHeart,
    title: "Unhurried service",
    description:
      "We stack appointments with breathing room, so your stylist can be where you are — fully.",
  },
  {
    icon: ShieldCheck,
    title: "Transparent pricing",
    description:
      "What you see at booking is what you pay at checkout. No surprise add-ons, ever.",
  },
];

export function About() {
  return (
    <section className="relative bg-noir py-24 md:py-32">
      <div className="container-narrow">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="md:col-span-5"
          >
            <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold">
              <span className="mr-3 inline-block h-px w-8 align-middle bg-gold/60" />
              Why Snip &amp; Style
            </span>
            <h2 className="font-display mt-5 text-4xl tracking-tight text-ivory md:text-5xl lg:text-[3.5rem]">
              A salon built around
              <br />
              <span className="italic text-gold">the guest&apos;s hour.</span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ivory-dim md:text-[1.05rem]">
              Most salons are built around the chair. We started with the
              question: what would it feel like to design every detail around
              the person sitting in it? The answer is everything you&apos;ll
              find here.
            </p>

            <div className="mt-10 flex items-stretch gap-6 border-t border-ivory/10 pt-8">
              <Stat value="12k+" label="Guests served" />
              <span className="w-px bg-ivory/10" />
              <Stat value="4.9" label="Avg. rating" />
              <span className="w-px bg-ivory/10" />
              <Stat value="9" label="Years open" />
            </div>
          </motion.div>

          <div className="md:col-span-7">
            <div className="grid grid-cols-1 gap-px overflow-hidden border border-ivory/10 bg-ivory/10 sm:grid-cols-2">
              {features.map((feature, idx) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.55,
                    delay: idx * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group bg-noir p-8 transition-colors duration-500 hover:bg-noir-soft"
                >
                  <span className="flex size-11 items-center justify-center border border-gold/30 text-gold transition-all duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-noir">
                    <feature.icon className="size-5" />
                  </span>
                  <h3 className="font-display mt-6 text-xl tracking-tight text-ivory">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ivory-dim">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display text-3xl tracking-tight text-ivory">
        {value}
      </div>
      <div className="mt-1 text-[10px] uppercase tracking-[0.22em] text-ivory/55">
        {label}
      </div>
    </div>
  );
}
