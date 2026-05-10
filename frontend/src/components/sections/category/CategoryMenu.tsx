"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Clock, HandHeart, ShieldCheck } from "lucide-react";

import type { Category, CategoryContent, Service, ServiceGroup } from "@/types";
import { cn, formatDuration, formatPKR } from "@/lib/utils";

interface Props {
  category: Category;
  content: CategoryContent;
  services: Service[];
}

const easing = [0.22, 1, 0.36, 1] as const;

export function CategoryMenu({ category, content, services }: Props) {
  // Filter to groups that actually have services
  const availableGroups = useMemo(() => {
    return content.groupOrder.filter((g) =>
      services.some((s) => s.group === g.group),
    );
  }, [content.groupOrder, services]);

  const [activeGroup, setActiveGroup] = useState<ServiceGroup>(
    availableGroups[0]?.group ?? "hair",
  );

  const grouped = useMemo(() => {
    return services.filter((s) => s.group === activeGroup);
  }, [services, activeGroup]);

  const activeMeta = availableGroups.find((g) => g.group === activeGroup);
  const previewService = grouped[0];

  return (
    <section
      id="menu"
      className="relative scroll-mt-24 bg-noir-soft py-20 md:py-28"
    >
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
              The Menu
            </span>
            <h2 className="font-display mt-4 text-3xl tracking-tight text-ivory md:text-4xl lg:text-5xl">
              For {category.name.toLowerCase()}, in{" "}
              <span className="italic text-gold">six chapters.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-ivory-dim">
            Prices include consultation, premium products, and finishing care.
            What you see here is what you'll see at checkout.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="mt-10 overflow-x-auto md:mt-14">
          <div className="flex min-w-max items-center gap-1 border-b border-ivory/10 pb-px">
            {availableGroups.map((g) => {
              const isActive = g.group === activeGroup;
              return (
                <button
                  key={g.group}
                  onClick={() => setActiveGroup(g.group)}
                  className={cn(
                    "relative px-4 py-3 text-[11px] font-medium uppercase tracking-[0.22em] transition-colors md:px-5 md:py-4 md:text-xs",
                    isActive
                      ? "text-gold"
                      : "text-ivory/55 hover:text-ivory",
                  )}
                >
                  {g.label}
                  {isActive ? (
                    <motion.span
                      layoutId="menu-tab-underline"
                      className="absolute inset-x-0 -bottom-px h-px bg-gold"
                      transition={{ duration: 0.4, ease: easing }}
                    />
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active group panel */}
        <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-12 md:gap-10 lg:gap-14">
          {/* Left — group blurb + smaller image preview */}
          <div className="md:col-span-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeGroup}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5, ease: easing }}
              >
                <p className="font-display text-2xl leading-snug tracking-tight text-ivory md:text-[1.6rem]">
                  {activeMeta?.label}
                </p>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-ivory-dim">
                  {activeMeta?.description}
                </p>

                {previewService ? (
                  <div className="relative mt-7 hidden aspect-square w-full max-w-sm overflow-hidden md:block">
                    <Image
                      src={previewService.image}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 30vw, 100vw"
                      quality={82}
                      className="object-cover opacity-85 transition-opacity duration-700 hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-noir/70 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="text-[10px] uppercase tracking-[0.28em] text-gold">
                        Featured · {previewService.name}
                      </span>
                    </div>
                    <div className="pointer-events-none absolute left-0 top-0 size-8 border-l border-t border-gold/60" />
                    <div className="pointer-events-none absolute bottom-0 right-0 size-8 border-b border-r border-gold/60" />
                  </div>
                ) : null}

                {/* Always-on side card — fills space gracefully */}
                <div className="mt-7 border border-ivory/10 bg-noir-soft p-6 md:max-w-sm">
                  <span className="flex size-9 items-center justify-center border border-gold/30 text-gold">
                    <ShieldCheck className="size-4" />
                  </span>
                  <h4 className="font-display mt-5 text-base tracking-tight text-ivory">
                    Always included
                  </h4>
                  <p className="mt-2 text-[13px] leading-relaxed text-ivory-dim">
                    Every booking comes with a ten-minute consult, premium
                    products, and a finishing styling — no surprise add-ons at
                    checkout.
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right — service list + supplementary content */}
          <div className="md:col-span-8">
            <AnimatePresence mode="wait">
              <motion.ul
                key={activeGroup}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="divide-y divide-ivory/10 border-t border-ivory/10"
              >
                {grouped.map((service, idx) => (
                  <motion.li
                    key={service.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: idx * 0.05,
                      ease: easing,
                    }}
                  >
                    <Link
                      href={`/services/${service.categoryId}/${service.slug}`}
                      className="group grid items-start gap-3 py-6 transition-colors md:grid-cols-[1fr_auto] md:gap-8 md:py-7"
                    >
                      <div>
                        <div className="flex items-baseline gap-3">
                          <h3 className="font-display text-lg tracking-tight text-ivory transition-colors group-hover:text-gold md:text-xl">
                            {service.name}
                          </h3>
                          {service.featured ? (
                            <span className="text-[9px] uppercase tracking-[0.22em] text-gold/80">
                              · Signature
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-ivory-dim">
                          {service.description}
                        </p>
                        <div className="mt-3 flex items-center gap-4 text-[11px] uppercase tracking-[0.2em] text-ivory/55">
                          <span className="inline-flex items-center gap-1.5">
                            <Clock className="size-3" />
                            {formatDuration(service.duration)}
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-ivory/65 transition-colors group-hover:text-gold">
                            View details
                            <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
                          </span>
                        </div>
                      </div>

                      <div className="flex items-baseline justify-between gap-3 md:justify-end">
                        <span className="text-[10px] uppercase tracking-[0.22em] text-ivory/45 md:hidden">
                          From
                        </span>
                        <span className="font-display text-xl tracking-tight text-gold md:text-2xl">
                          {formatPKR(service.price)}
                        </span>
                      </div>
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>

              {/* Supplementary blocks — fill the right column gracefully when the
                  list is short, add useful context when it's long */}
              <motion.div
                key={`${activeGroup}-info`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.15, ease: easing }}
                className="mt-8 grid gap-4 sm:grid-cols-2 md:mt-10 md:gap-5"
              >
                <div className="border border-ivory/10 bg-noir p-6">
                  <span className="flex size-9 items-center justify-center border border-gold/30 text-gold">
                    <HandHeart className="size-4" />
                  </span>
                  <h4 className="font-display mt-5 text-base tracking-tight text-ivory">
                    Aftercare promise
                  </h4>
                  <p className="mt-2 text-[13px] leading-relaxed text-ivory-dim">
                    A digital aftercare card the day of, and a quiet check-in
                    text three days later. We want the result to last as long
                    as we worked on it.
                  </p>
                </div>

                <div className="border border-ivory/10 bg-noir p-6">
                  <span className="flex size-9 items-center justify-center border border-gold/30 text-gold">
                    <Check className="size-4" />
                  </span>
                  <h4 className="font-display mt-5 text-base tracking-tight text-ivory">
                    Reserved time, kept time
                  </h4>
                  <p className="mt-2 text-[13px] leading-relaxed text-ivory-dim">
                    Appointments are spaced so your artist can be fully present.
                    No double-booking, no rushing — your hour stays your hour.
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
