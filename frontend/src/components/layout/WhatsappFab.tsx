"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import { siteConfig } from "@/config/site";
import { whatsappLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

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

const TEASER_KEY = "snip-style-wa-teaser-dismissed";

export function WhatsappFab() {
  const [showTeaser, setShowTeaser] = useState(false);
  const link = whatsappLink(
    `Hi Snip & Style — I'd like to ask about an appointment.`,
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem(TEASER_KEY) === "1") return;
    const t = setTimeout(() => setShowTeaser(true), 3500);
    return () => clearTimeout(t);
  }, []);

  function dismissTeaser() {
    setShowTeaser(false);
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(TEASER_KEY, "1");
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 md:bottom-7 md:right-7">
      {/* Teaser bubble */}
      <AnimatePresence>
        {showTeaser ? (
          <motion.div
            key="teaser"
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-w-[260px] border border-ivory/12 bg-noir-soft/95 px-4 py-3 pr-9 shadow-[0_18px_40px_-20px_rgba(0,0,0,0.6)] backdrop-blur"
          >
            <button
              type="button"
              onClick={dismissTeaser}
              aria-label="Dismiss"
              className="absolute right-2 top-2 flex size-5 items-center justify-center text-ivory/55 transition-colors hover:text-ivory"
            >
              <X className="size-3.5" />
            </button>
            <p className="text-[10px] uppercase tracking-[0.22em] text-gold">
              Front desk
            </p>
            <p className="mt-1.5 text-[13px] leading-snug text-ivory">
              Need help picking a service or a slot? Message us — we usually
              reply within minutes.
            </p>
            <span className="absolute -bottom-1.5 right-7 size-3 rotate-45 border-b border-r border-ivory/12 bg-noir-soft/95" />
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* The button */}
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat on WhatsApp · ${siteConfig.contact.whatsapp}`}
        onClick={dismissTeaser}
        className="group relative"
      >
        {/* Pulsing rings */}
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 rounded-full bg-emerald-500/40",
            "motion-safe:animate-[wa-ping_2.4s_cubic-bezier(0,0,0.2,1)_infinite]",
          )}
        />
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 rounded-full bg-emerald-500/30",
            "motion-safe:animate-[wa-ping_2.4s_cubic-bezier(0,0,0.2,1)_infinite_0.6s]",
          )}
        />

        <motion.span
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex size-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-[0_14px_28px_-10px_rgba(16,185,129,0.7)] ring-1 ring-emerald-400/60 transition-colors group-hover:bg-emerald-400 md:size-16"
        >
          <WhatsAppGlyph className="size-7 md:size-8" />
        </motion.span>
      </a>

      <style jsx>{`
        @keyframes wa-ping {
          0% {
            transform: scale(1);
            opacity: 0.6;
          }
          80%,
          100% {
            transform: scale(1.8);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
