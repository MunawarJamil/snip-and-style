"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Scissors, UserRound } from "lucide-react";
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

// TODO: replace with real auth state once auth is wired
const useIsSignedIn = () => false;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const pathname = usePathname() ?? "/";
  const isSignedIn = useIsSignedIn();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the sheet whenever the route changes
  useEffect(() => {
    setSheetOpen(false);
  }, [pathname]);

  // Mobile inline links — Women & Men, the categories the user wants visible
  const mobileTopNav = siteConfig.nav.filter(
    (n) => n.href === "/services/women" || n.href === "/services/men",
  );

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
      <nav className="container-narrow flex h-16 items-center gap-3 md:h-20 md:gap-4">
        {/* Logo */}
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2 text-ivory md:gap-3"
          aria-label="Snip & Style — home"
        >
          <span className="flex size-9 items-center justify-center rounded-full border border-ivory/20 bg-ivory/5 transition-colors group-hover:border-gold/60">
            <Scissors className="size-4 text-gold" />
          </span>
          <span className="font-display hidden text-lg tracking-tight sm:inline md:text-xl">
            {siteConfig.name}
          </span>
        </Link>

        {/* Mobile inline category links — Women / Men */}
        <ul className="flex flex-1 items-center justify-center gap-4 md:hidden">
          {mobileTopNav.map((item) => {
            const active = isActivePath(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative py-1 text-[11px] font-medium uppercase tracking-[0.18em] transition-colors",
                    active ? "text-ivory" : "text-ivory/65 hover:text-ivory",
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

        {/* Desktop full nav */}
        <ul className="ml-auto hidden items-center gap-9 md:flex">
          {siteConfig.nav.map((item) => {
            const active = isActivePath(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative py-1 text-[13px] font-medium uppercase tracking-[0.16em] transition-colors",
                    active ? "text-ivory" : "text-ivory/65 hover:text-ivory",
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

        {/* Right cluster — desktop sign in + book, mobile sign-in icon + hamburger */}
        <div className="ml-auto flex shrink-0 items-center gap-2 md:ml-0 md:gap-3">
          {/* Desktop CTA group */}
          <div className="hidden items-center gap-3 md:flex">
            {isSignedIn ? null : (
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="text-ivory/75 hover:bg-ivory/5 hover:text-ivory"
              >
                <Link href="/login">Sign in</Link>
              </Button>
            )}
            <Button
              asChild
              size="sm"
              className="rounded-none bg-gold px-5 text-noir hover:bg-ivory"
            >
              <Link href="/book">Book Now</Link>
            </Button>
          </div>

          {/* Mobile sign-in icon */}
          {isSignedIn ? null : (
            <Link
              href="/login"
              aria-label="Sign in"
              className="group relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gold/40 bg-noir-soft text-ivory transition-all duration-300 hover:border-gold hover:bg-gold hover:text-noir md:hidden"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-gold/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
              />
              <UserRound className="relative size-4" />
            </Link>
          )}

          {/* Mobile hamburger */}
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-9 text-ivory hover:bg-ivory/10 hover:text-ivory md:hidden"
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
                      onClick={() => setSheetOpen(false)}
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
                  {isSignedIn ? null : (
                    <Button
                      asChild
                      variant="outline"
                      className="w-full rounded-none border-ivory/20 bg-transparent text-ivory hover:bg-ivory/5 hover:text-ivory"
                    >
                      <Link
                        href="/login"
                        onClick={() => setSheetOpen(false)}
                      >
                        Sign in
                      </Link>
                    </Button>
                  )}
                  <Button
                    asChild
                    className="w-full rounded-none bg-gold text-noir hover:bg-ivory"
                  >
                    <Link href="/book" onClick={() => setSheetOpen(false)}>
                      Book Now
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </motion.header>
  );
}
