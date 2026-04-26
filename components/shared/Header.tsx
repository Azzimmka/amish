"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Phone, Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#visualizer", label: "Build Yours" },
  { href: "#process",    label: "Our Process" },
  { href: "#gallery",    label: "Real Projects" },
  { href: "#quote",      label: "Get a Quote" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest <= 50) {
      setIsAtTop(true);
    } else {
      setIsAtTop(false);
      // Close mobile menu on scroll if open
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    }
  });

  return (
    <motion.header
      initial={{ y: 0, opacity: 1 }}
      className={cn(
        "fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 rounded-full transition-all duration-500",
        isAtTop
          ? "bg-transparent border-transparent py-4"
          : "bg-forest/85 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] py-2"
      )}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div
          className={cn(
            "flex items-center justify-between transition-all duration-500",
            isAtTop ? "h-16 lg:h-20" : "h-14 lg:h-16"
          )}
        >
          {/* ── Logo ── */}
          <a href="#" className="flex items-center group" aria-label="Home">
            <div
              className={cn(
                "relative transition-all duration-500",
                isAtTop
                  ? "h-14 w-20 sm:h-24 sm:w-36"
                  : "h-10 w-16 sm:h-14 sm:w-24"
              )}
            >
              <Image
                src="/logo.svg"
                alt="Amish Built Garages"
                fill
                className="object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                priority
              />
            </div>
          </a>

          {/* ── Desktop Nav ── */}
          <nav
            className="hidden lg:flex items-center gap-2 bg-white/5 px-2 py-1.5 rounded-full border border-white/5"
            aria-label="Main navigation"
            onMouseLeave={() => setHoveredLink(null)}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onMouseEnter={() => setHoveredLink(link.href)}
                className="relative px-5 py-2 text-[13px] uppercase tracking-[0.1em] font-medium text-cream/80 transition-colors hover:text-white"
              >
                <span className="relative z-10">{link.label}</span>
                {hoveredLink === link.href && (
                  <motion.div
                    layoutId="navPill"
                    className="absolute inset-0 bg-white/10 rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* ── Phone + CTA ── */}
          <div className="hidden sm:flex items-center gap-6">
            <a
              href={`tel:${siteConfig.phone.replace(/[^\d]/g, "")}`}
              className="group flex items-center gap-2 text-[14px] font-medium text-cream/90 transition-colors hover:text-copper"
            >
              <div className="bg-white/5 p-2 rounded-full border border-white/10 group-hover:border-copper/50 transition-colors">
                <Phone className="h-3.5 w-3.5" />
              </div>
              <span className="hidden md:inline">{siteConfig.phone}</span>
            </a>

            <a
              href="#quote"
              className="inline-flex items-center justify-center rounded-full bg-copper px-7 py-2.5 text-[13px] uppercase tracking-[0.1em] font-bold text-cream transition-all hover:bg-copper-light hover:shadow-[0_0_20px_rgba(184,115,51,0.4)] active:scale-95"
            >
              Free Quote
            </a>
          </div>

          {/* ── Mobile burger ── */}
          <button
            type="button"
            className="lg:hidden p-2.5 rounded-full bg-white/5 border border-white/10 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-0 right-0 mt-2 mx-auto lg:hidden bg-forest/95 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl origin-top"
          >
            <nav className="flex flex-col px-4 py-6 gap-2" aria-label="Mobile navigation">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="text-cream text-lg font-bold uppercase tracking-wider py-4 px-6 rounded-2xl transition-colors hover:bg-white/5 active:bg-white/10"
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="mt-4 pt-4 px-2 border-t border-white/10 flex flex-col gap-4">
                <a
                  href={`tel:${siteConfig.phone.replace(/[^\d]/g, "")}`}
                  className="flex items-center gap-3 text-cream/80 text-base font-medium py-3 px-4 bg-white/5 rounded-2xl"
                >
                  <div className="bg-copper/20 p-2 rounded-full">
                    <Phone className="h-5 w-5 text-copper" />
                  </div>
                  {siteConfig.phone}
                </a>
                <a
                  href="#quote"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center rounded-2xl bg-copper px-6 py-4 text-sm font-bold uppercase tracking-widest text-cream transition-all active:scale-95 shadow-[0_0_20px_rgba(184,115,51,0.3)]"
                >
                  Get a Free Quote
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
