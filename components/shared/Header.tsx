"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#visualizer", label: "Build Yours" },
    { href: "#process",    label: "Our Process" },
    { href: "#gallery",    label: "Real Projects" },
    { href: "#quote",      label: "Get a Quote" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-700",
        scrolled
          ? "bg-forest/95 backdrop-blur-lg shadow-lg shadow-black/20"
          : "bg-transparent"
      )}
    >
      {/* Copper accent line — appears on scroll */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-copper/80 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrolled ? 1 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "flex items-center justify-between transition-all duration-500",
            scrolled ? "h-16 lg:h-20" : "h-20 lg:h-28"
          )}
        >
          {/* ── Logo ── */}
          <a href="#" className="flex items-center group" aria-label="Home">
            <div
              className={cn(
                "relative transition-all duration-500",
                scrolled
                  ? "h-10 w-16 sm:h-14 sm:w-44"
                  : "h-14 w-20 sm:h-20 sm:w-56"
              )}
            >
              <Image
                src="/logo.svg"
                alt="Amish Built Garages"
                fill
                className={cn(
                  "object-contain transition-all duration-500",
                  !scrolled && "brightness-110 drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]"
                )}
                priority
              />
            </div>
          </a>

          {/* ── Desktop Nav with sliding indicator ── */}
          <nav
            className="hidden lg:flex items-center gap-1"
            aria-label="Main navigation"
            onMouseLeave={() => setHoveredLink(null)}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onMouseEnter={() => setHoveredLink(link.href)}
                className={cn(
                  "relative px-4 py-2 text-[15px] font-bold tracking-wide transition-colors duration-200 drop-shadow-md",
                  scrolled ? "text-cream/90 hover:text-white" : "text-white hover:text-copper drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                )}
              >
                {link.label}

                {/* Sliding copper underline */}
                {hoveredLink === link.href && (
                  <motion.span
                    layoutId="navUnderline"
                    className="absolute inset-x-2 -bottom-0.5 h-[2px] bg-copper rounded-full"
                    transition={{ type: "spring", stiffness: 500, damping: 32 }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* ── Phone + CTA ── */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href={`tel:${siteConfig.phone.replace(/[^\d]/g, "")}`}
              className={cn(
                "flex items-center gap-2 text-sm font-bold transition-colors duration-300 drop-shadow-md",
                scrolled ? "text-cream/90 hover:text-white" : "text-white hover:text-copper drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              )}
            >
              <Phone className="h-4 w-4" />
              <span className="hidden md:inline">{siteConfig.phone}</span>
            </a>

            <a
              href="#quote"
              className="inline-flex items-center gap-2 rounded-full bg-copper px-6 py-2.5 text-sm font-bold text-cream tracking-wide transition-all duration-300 hover:bg-copper-light shadow-[0_4px_12px_rgba(0,0,0,0.3)] active:scale-95"
            >
              Free Quote
            </a>
          </div>

          {/* ── Mobile burger ── */}
          <button
            type="button"
            className="lg:hidden p-2 text-white drop-shadow-md"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" />}
          </button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-forest/98 backdrop-blur-lg border-t border-white/5 overflow-hidden"
          >
            <nav className="flex flex-col px-6 py-6 gap-1" aria-label="Mobile navigation">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="text-cream/90 text-lg font-medium py-3 px-4 rounded-lg transition-colors hover:bg-white/5 hover:text-copper border-l-2 border-transparent hover:border-copper"
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-3">
                <a
                  href={`tel:${siteConfig.phone.replace(/[^\d]/g, "")}`}
                  className="flex items-center gap-3 text-cream/80 text-base font-medium py-3 px-4"
                >
                  <Phone className="h-5 w-5 text-copper" />
                  {siteConfig.phone}
                </a>
                <a
                  href="#quote"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center rounded-full bg-copper px-6 py-3 text-base font-bold text-cream tracking-wide transition-all hover:bg-copper-light active:scale-95"
                >
                  Get a Free Quote
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
