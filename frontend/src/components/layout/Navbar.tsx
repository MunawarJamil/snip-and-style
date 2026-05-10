"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Scissors } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname() ?? "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-ivory/8 bg-noir/85 backdrop-blur-md"
          : "bg-linear-to-b from-noir/40 via-noir/10 to-transparent",
      )}
    >
      <nav className="container-narrow flex h-16 items-center justify-between md:h-20">
        <Link
          href="/"
          className="group flex items-center gap-3 text-ivory"
          aria-label="Snip & Style — home"
        >
          <span className="flex size-9 items-center justify-center rounded-full border border-ivory/20 bg-ivory/5 transition-colors group-hover:border-gold/60">
            <Scissors className="size-4 text-gold" />
          </span>
          <span className="font-display text-lg tracking-tight">
            {siteConfig.name}
          </span>
        </Link>

        <ul className="hidden items-center gap-9 md:flex">
          {siteConfig.nav.map((item) => {
            const active = isActivePath(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative py-1 text-[13px] font-medium uppercase tracking-[0.16em] transition-colors",
                    active
                      ? "text-ivory"
                      : "text-ivory/65 hover:text-ivory",
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "pointer-events-none absolute -bottom-1 left-0 h-px bg-gold transition-all duration-300",
                      active ? "w-full" : "w-0",
                    )}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-ivory/75 hover:bg-ivory/5 hover:text-ivory"
          >
            <Link href="/login">Sign in</Link>
          </Button>
          <Button
            asChild
            size="sm"
            className="rounded-none bg-gold px-5 text-noir hover:bg-ivory"
          >
            <Link href="/book">Book Now</Link>
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-ivory hover:bg-ivory/10 hover:text-ivory md:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[88vw] max-w-sm border-ivory/10 bg-noir text-ivory"
          >
            <SheetHeader>
              <SheetTitle className="font-display text-xl text-ivory">
                {siteConfig.name}
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-1 px-4 pb-6">
              {siteConfig.nav.map((item) => {
                const active = isActivePath(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-3 rounded-none border-b border-ivory/8 px-1 py-4 text-base font-medium uppercase tracking-[0.14em] transition-colors hover:text-gold",
                      active ? "text-gold" : "text-ivory/85",
                    )}
                  >
                    <span
                      className={cn(
                        "inline-block h-px transition-all",
                        active ? "w-6 bg-gold" : "w-0 bg-transparent",
                      )}
                    />
                    {item.label}
                  </Link>
                );
              })}
              <div className="mt-6 grid gap-2">
                <Button
                  asChild
                  variant="outline"
                  className="w-full rounded-none border-ivory/20 bg-transparent text-ivory hover:bg-ivory/5 hover:text-ivory"
                >
                  <Link href="/login">Sign in</Link>
                </Button>
                <Button
                  asChild
                  className="w-full rounded-none bg-gold text-noir hover:bg-ivory"
                >
                  <Link href="/book">Book Now</Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </motion.header>
  );
}
