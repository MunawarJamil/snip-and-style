"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  ChevronDown,
  Clock,
  HandHeart,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Category, CategoryContent, Service, ServiceGroup } from "@/types";
import { cn, formatDuration, formatPKR } from "@/lib/utils";
import { whatsappLink } from "@/lib/whatsapp";

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M19.05 4.91A10 10 0 0 0 12 2a10 10 0 0 0-8.66 14.96L2 22l5.2-1.36A10 10 0 1 0 19.05 4.91Zm-7.05 15.4a8.4 8.4 0 0 1-4.3-1.18l-.31-.18-3.08.81.82-3-.2-.32A8.4 8.4 0 1 1 12 20.31Zm4.6-6.3c-.25-.13-1.49-.74-1.72-.82-.23-.08-.4-.13-.57.13-.17.25-.66.82-.81.99-.15.17-.3.19-.55.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.39.11-.51.11-.11.25-.3.38-.45.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.57-1.37-.78-1.87-.21-.5-.42-.43-.57-.44h-.49c-.17 0-.44.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.57.13.17 1.76 2.69 4.27 3.77.6.26 1.06.41 1.42.53.6.19 1.14.16 1.57.1.48-.07 1.49-.61 1.7-1.2.21-.59.21-1.1.15-1.2-.06-.1-.23-.16-.48-.28Z" />
    </svg>
  );
}

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

  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Reset expansion when switching tabs
  function handleGroupChange(g: ServiceGroup) {
    setActiveGroup(g);
    setExpandedId(null);
  }

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
                  onClick={() => handleGroupChange(g.group)}
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
                {grouped.map((service, idx) => {
                  const isOpen = expandedId === service.id;
                  return (
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
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() =>
                          setExpandedId(isOpen ? null : service.id)
                        }
                        className="group grid w-full items-start gap-3 py-6 text-left transition-colors md:grid-cols-[1fr_auto] md:gap-8 md:py-7"
                      >
                        <div>
                          <div className="flex items-baseline gap-3">
                            <h3
                              className={cn(
                                "font-display text-lg tracking-tight transition-colors md:text-xl",
                                isOpen
                                  ? "text-gold"
                                  : "text-ivory group-hover:text-gold",
                              )}
                            >
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
                            <span
                              className={cn(
                                "inline-flex items-center gap-1.5 transition-colors",
                                isOpen
                                  ? "text-gold"
                                  : "text-ivory/65 group-hover:text-gold",
                              )}
                            >
                              {isOpen ? "Hide details" : "See more"}
                              <ChevronDown
                                className={cn(
                                  "size-3 transition-transform duration-300",
                                  isOpen ? "rotate-180" : "rotate-0",
                                )}
                              />
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
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen ? (
                          <motion.div
                            key="expanded"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.45, ease: easing }}
                            className="overflow-hidden"
                          >
                            <ServiceExpandedPanel service={service} />
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </motion.li>
                  );
                })}
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

function ServiceExpandedPanel({ service }: { service: Service }) {
  const message = `Hi Snip & Style — I'd like to book the "${service.name}" service.`;
  return (
    <div className="grid gap-6 border-l-2 border-gold/40 bg-noir/40 px-5 py-6 md:grid-cols-[1fr_auto] md:gap-10 md:px-7 md:py-7">
      <div>
        <span className="text-[10px] uppercase tracking-[0.28em] text-gold">
          What's included
        </span>
        <p className="mt-3 text-sm leading-relaxed text-ivory/85 md:text-[15px]">
          {service.description} Each session begins with a brief, unhurried
          consultation so your artist can tune the work to your hair, skin, and
          the week you're walking into. Premium products, finishing care, and a
          tidy goodbye coffee — all included.
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.2em] text-ivory/60">
          <span className="inline-flex items-center gap-2">
            <Sparkles className="size-3 text-gold" />
            Single artist, start to finish
          </span>
          <span className="inline-flex items-center gap-2">
            <Check className="size-3 text-gold" />
            Aftercare card on departure
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row md:flex-col md:items-stretch md:justify-center md:gap-3">
        <Button
          asChild
          size="lg"
          className="group h-11 rounded-none bg-gold px-6 text-noir hover:bg-ivory"
        >
          <Link
            href={`/book?service=${service.slug}&category=${service.categoryId}`}
            className="flex items-center justify-center"
          >
            Book now
          </Link>
        </Button>
        <Button
          asChild
          variant="ghost"
          size="lg"
          className="h-11 rounded-none border border-emerald-500/40 bg-emerald-500/10 px-6 text-emerald-300 hover:bg-emerald-500/20 hover:text-emerald-200"
        >
          <a
            href={whatsappLink(message)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2"
          >
            <WhatsAppGlyph className="size-4" />
            WhatsApp us
          </a>
        </Button>
      </div>
    </div>
  );
}
