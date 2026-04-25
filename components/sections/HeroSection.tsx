"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      aria-label="Hero"
    >
      {/* ── Background Image ── */}
      <Image
        src="/garage_7.jpg"
        alt="Premium Amish-built two-car garage"
        fill
        className="object-cover"
        priority
        quality={85}
        sizes="100vw"
      />

      {/* ── Overlays ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-forest/80 via-forest/60 to-forest/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-copper/40 bg-copper/10 backdrop-blur-sm px-5 py-2 text-xs sm:text-sm font-semibold text-copper tracking-wider uppercase">
              ★ Serving the {siteConfig.address.region} ★
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-cream leading-[1.1] tracking-tight"
          >
            Built by Hand.
            <br />
            <span className="text-copper">Built to Last.</span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mx-auto max-w-2xl text-lg sm:text-xl text-cream/70 font-light leading-relaxed"
          >
            Premium Amish craftsmanship for your perfect garage. Custom-built
            with decades of tradition and an unmatched 10-year warranty.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <a
              href="#visualizer"
              className="inline-flex items-center gap-2 rounded-full bg-copper px-8 py-4 text-base font-bold text-cream tracking-wide shadow-xl shadow-copper/20 transition-all duration-300 hover:bg-copper-light hover:shadow-2xl hover:shadow-copper/30 hover:-translate-y-0.5 active:scale-95"
            >
              Start Your Custom Build
              <ChevronDown className="h-5 w-5 animate-bounce" />
            </a>
            <a
              href={`tel:${siteConfig.phone.replace(/[^\d]/g, "")}`}
              className="inline-flex items-center gap-2 rounded-full border-2 border-cream/30 bg-cream/5 backdrop-blur-sm px-8 py-4 text-base font-semibold text-cream tracking-wide transition-all duration-300 hover:border-cream/60 hover:bg-cream/10 active:scale-95"
            >
              <Phone className="h-5 w-5" />
              {siteConfig.phone}
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Scroll Indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-cream/40">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="h-10 w-[1px] bg-gradient-to-b from-cream/40 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
