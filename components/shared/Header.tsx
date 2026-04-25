"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#visualizer", label: "Build Yours" },
    { href: "#process", label: "Our Process" },
    { href: "#gallery", label: "Gallery" },
    { href: "#quote", label: "Get a Quote" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-forest/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* ── Logo ── */}
          <a href="#" className="flex items-center gap-1 group" aria-label="Home">
            <div className="flex flex-col leading-none">
              <span
                className={cn(
                  "text-xl sm:text-2xl font-extrabold tracking-wider transition-colors duration-500",
                  scrolled ? "text-cream" : "text-white"
                )}
              >
                AMISH BUILT
              </span>
              <span
                className={cn(
                  "text-[0.65rem] sm:text-xs font-semibold tracking-[0.35em] uppercase transition-colors duration-500",
                  scrolled ? "text-copper" : "text-copper"
                )}
              >
                ★ G A R A G E S ★
              </span>
            </div>
          </a>

          {/* ── Desktop Nav ── */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium tracking-wide transition-colors duration-300 hover:text-copper",
                  scrolled ? "text-cream/80" : "text-white/80"
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* ── Phone CTA ── */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`tel:${siteConfig.phone.replace(/[^\d]/g, "")}`}
              className={cn(
                "flex items-center gap-2 text-sm font-medium transition-colors duration-300",
                scrolled ? "text-cream/80" : "text-white/80"
              )}
            >
              <Phone className="h-4 w-4" />
              <span className="hidden md:inline">{siteConfig.phone}</span>
            </a>
            <a
              href="#quote"
              className="inline-flex items-center gap-2 rounded-full bg-copper px-5 py-2.5 text-sm font-bold text-cream tracking-wide transition-all duration-300 hover:bg-copper-light hover:shadow-lg hover:shadow-copper/25 active:scale-95"
            >
              Call Now
            </a>
          </div>

          {/* ── Mobile Menu Button ── */}
          <button
            type="button"
            className="lg:hidden p-2 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-forest/98 backdrop-blur-md border-t border-white/10 overflow-hidden"
          >
            <nav className="flex flex-col px-6 py-6 gap-1" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-cream/90 text-lg font-medium py-3 px-4 rounded-lg transition-colors hover:bg-white/10 hover:text-copper"
                >
                  {link.label}
                </a>
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
