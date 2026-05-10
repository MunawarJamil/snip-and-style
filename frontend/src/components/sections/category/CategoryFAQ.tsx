"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";

import type { FAQ } from "@/types";
import { cn } from "@/lib/utils";

interface Props {
  faqs: FAQ[];
}

export function CategoryFAQ({ faqs }: Props) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  if (faqs.length === 0) return null;

  return (
    <section className="relative bg-noir-soft py-20 md:py-28">
      <div className="container-narrow">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="md:col-span-4"
          >
            <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-gold">
              <span className="mr-3 inline-block h-px w-8 align-middle bg-gold/60" />
              The Details
            </span>
            <h2 className="font-display mt-4 text-3xl tracking-tight text-ivory md:text-4xl lg:text-[2.75rem]">
              Questions, <span className="italic text-gold">answered.</span>
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ivory-dim">
              The things our guests ask before their first visit. If yours
              isn't here, our front desk will pick up on the first ring.
            </p>
          </motion.div>

          <div className="md:col-span-8">
            <div className="border-t border-ivory/10">
              {faqs.map((faq, idx) => {
                const isOpen = openId === faq.id;
                return (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                      duration: 0.5,
                      delay: idx * 0.04,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="border-b border-ivory/10"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenId(isOpen ? null : faq.id)}
                      aria-expanded={isOpen}
                      className="group flex w-full items-start justify-between gap-6 py-6 text-left transition-colors md:py-7"
                    >
                      <span className="flex items-start gap-5">
                        <span className="font-display pt-1 text-sm text-gold/70 md:text-base">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={cn(
                            "font-display text-lg leading-snug tracking-tight transition-colors md:text-xl",
                            isOpen
                              ? "text-gold"
                              : "text-ivory group-hover:text-gold",
                          )}
                        >
                          {faq.question}
                        </span>
                      </span>
                      <span
                        className={cn(
                          "mt-1 flex size-8 shrink-0 items-center justify-center border transition-all duration-300 md:size-9",
                          isOpen
                            ? "border-gold bg-gold text-noir"
                            : "border-ivory/25 text-ivory/70 group-hover:border-gold group-hover:text-gold",
                        )}
                      >
                        <Plus
                          className={cn(
                            "size-4 transition-transform duration-300",
                            isOpen ? "rotate-45" : "rotate-0",
                          )}
                        />
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.4,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-2xl pb-7 pl-9 pr-4 text-sm leading-relaxed text-ivory-dim md:pb-8 md:pl-12 md:text-[15px]">
                            {faq.answer}
                          </p>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
