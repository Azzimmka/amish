"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Home, Paintbrush, DoorOpen, X } from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── Data ──────────────────────────────────────────────────── */
interface GarageItem {
  id: string;
  src: string;
  label: string;
  style: string;
  color: string;
  door: string;
}

const garages: GarageItem[] = [
  { id: "g1", src: "/garage_1.jpg",  label: "Tan Standard",       style: "Standard", color: "Tan",   door: "Open Bay" },
  { id: "g2", src: "/garage_2.jpg",  label: "Cream Classic",      style: "Standard", color: "Cream", door: "Open Bay" },
  { id: "g3", src: "/garage_3.jpg",  label: "Sage Green",         style: "Standard", color: "Green", door: "Panel"   },
  { id: "g4", src: "/garage_4.jpg",  label: "Storm Gray",         style: "Standard", color: "Gray",  door: "Panel"   },
  { id: "g5", src: "/garage_5.jpg",  label: "Navy Blue",          style: "Standard", color: "Blue",  door: "Panel"   },
  { id: "g6", src: "/garage_6.jpg",  label: "White Cape Cod",     style: "Cape Cod", color: "White", door: "Open Bay"},
  { id: "g7", src: "/garage_7.jpg",  label: "Beige Double-Wide",  style: "Standard", color: "Beige", door: "Panel"   },
];

const colorSwatches: Record<string, string> = {
  Tan: "#d2b48c", Cream: "#fffdd0", Green: "#8fbc8f",
  Gray: "#708090", Blue: "#4a6fa5", White: "#f0f0f0", Beige: "#d4c5a9",
};

/* ─── Filter pill ───────────────────────────────────────────── */
function Pill({
  label, active, swatch, onClick,
}: { label: string; active: boolean; swatch?: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 whitespace-nowrap",
        active
          ? "bg-forest text-cream shadow"
          : "bg-white border border-charcoal/10 text-charcoal/60 hover:border-forest/40 hover:text-forest"
      )}
    >
      {swatch && (
        <span
          className="h-2.5 w-2.5 rounded-full border border-charcoal/15 shrink-0"
          style={{ backgroundColor: swatch }}
        />
      )}
      {label}
    </button>
  );
}

/* ─── Main ──────────────────────────────────────────────────── */
export default function VisualizerSection() {
  const [activeStyle, setActiveStyle] = useState("All");
  const [activeColor, setActiveColor] = useState("All");
  const [activeDoor,  setActiveDoor]  = useState("All");
  const [heroId,      setHeroId]      = useState("g1");

  const filtered = garages.filter((g) => {
    if (activeStyle !== "All" && g.style !== activeStyle) return false;
    if (activeColor !== "All" && g.color !== activeColor) return false;
    if (activeDoor  !== "All" && g.door  !== activeDoor)  return false;
    return true;
  });

  // Keep hero valid when filters change
  useEffect(() => {
    if (!filtered.find((g) => g.id === heroId)) {
      setHeroId(filtered[0]?.id ?? "g1");
    }
  }, [filtered, heroId]);

  const hero = garages.find((g) => g.id === heroId) ?? garages[0];

  const resetFilters = () => {
    setActiveStyle("All");
    setActiveColor("All");
    setActiveDoor("All");
  };

  const hasActiveFilter = activeStyle !== "All" || activeColor !== "All" || activeDoor !== "All";

  return (
    <section
      id="visualizer"
      className="py-20 sm:py-28 bg-cream"
      aria-label="Design Your Garage"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Header ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-copper text-sm font-bold tracking-widest uppercase mb-3">
            Interactive Catalog
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-forest tracking-tight">
            Design Your Dream Garage
          </h2>
          <p className="mt-4 text-base text-charcoal/50 max-w-xl mx-auto">
            Filter by style, color, and door type — click any thumbnail to preview.
          </p>
        </motion.div>

        {/* ── Two-column layout ─────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 items-start">

          {/* ── LEFT: Filters (sticky desktop) ─────────────── */}
          <motion.aside
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:sticky lg:top-28 space-y-5"
          >
            {/* Style */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-charcoal/5">
              <div className="flex items-center gap-2 mb-3">
                <Home className="h-4 w-4 text-copper" />
                <span className="text-xs font-bold text-charcoal/50 uppercase tracking-wider">Style</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {["All", "Standard", "Cape Cod"].map((s) => (
                  <Pill key={s} label={s} active={activeStyle === s} onClick={() => setActiveStyle(s)} />
                ))}
              </div>
            </div>

            {/* Color */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-charcoal/5">
              <div className="flex items-center gap-2 mb-3">
                <Paintbrush className="h-4 w-4 text-copper" />
                <span className="text-xs font-bold text-charcoal/50 uppercase tracking-wider">Wall Color</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Pill label="All" active={activeColor === "All"} onClick={() => setActiveColor("All")} />
                {Object.keys(colorSwatches).map((c) => (
                  <Pill key={c} label={c} active={activeColor === c} swatch={colorSwatches[c]} onClick={() => setActiveColor(c)} />
                ))}
              </div>
            </div>

            {/* Door */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-charcoal/5">
              <div className="flex items-center gap-2 mb-3">
                <DoorOpen className="h-4 w-4 text-copper" />
                <span className="text-xs font-bold text-charcoal/50 uppercase tracking-wider">Door Type</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {["All", "Open Bay", "Panel"].map((d) => (
                  <Pill key={d} label={d} active={activeDoor === d} onClick={() => setActiveDoor(d)} />
                ))}
              </div>
            </div>

            {/* Reset */}
            <AnimatePresence>
              {hasActiveFilter && (
                <motion.button
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  onClick={resetFilters}
                  className="flex items-center gap-2 text-xs text-charcoal/50 hover:text-forest transition-colors font-medium"
                >
                  <X className="h-3.5 w-3.5" />
                  Clear all filters
                </motion.button>
              )}
            </AnimatePresence>
          </motion.aside>

          {/* ── RIGHT: Hero + Filmstrip ──────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            {filtered.length === 0 ? (
              /* Empty state */
              <div className="aspect-[16/10] rounded-3xl bg-white border border-charcoal/5 flex flex-col items-center justify-center gap-4 shadow-sm">
                <div className="h-14 w-14 rounded-full bg-charcoal/5 flex items-center justify-center">
                  <Home className="h-7 w-7 text-charcoal/25" />
                </div>
                <p className="text-charcoal/40 text-base font-medium">No matches — try wider filters</p>
                <button onClick={resetFilters} className="text-copper text-sm font-semibold hover:underline">
                  Reset filters
                </button>
              </div>
            ) : (
              <>
                {/* ── Hero image ──────────────────────────── */}
                <div className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-xl shadow-charcoal/10">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={hero.id}
                      initial={{ opacity: 0, scale: 1.03 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={hero.src}
                        alt={hero.label}
                        fill
                        priority
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 70vw"
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent pointer-events-none" />

                  {/* Bottom info row */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7 flex items-end justify-between gap-4">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={hero.id + "-label"}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25 }}
                      >
                        <p className="text-cream/60 text-xs font-semibold tracking-widest uppercase mb-1">
                          {hero.style} · {hero.color} · {hero.door}
                        </p>
                        <h3 className="text-cream text-xl sm:text-2xl font-extrabold leading-tight">
                          {hero.label}
                        </h3>
                      </motion.div>
                    </AnimatePresence>

                    <a
                      href="#quote"
                      className="shrink-0 inline-flex items-center gap-2 rounded-full bg-copper hover:bg-copper-light text-cream text-sm font-bold px-5 py-2.5 transition-all duration-200 shadow-lg active:scale-95"
                    >
                      Quote this
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>

                  {/* Count badge */}
                  <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm text-cream text-xs font-semibold px-3 py-1.5 rounded-full">
                    {filtered.findIndex((g) => g.id === hero.id) + 1} / {filtered.length}
                  </div>
                </div>

                {/* ── Filmstrip ───────────────────────────── */}
                <div className="flex gap-3 overflow-x-auto pb-1 snap-x snap-mandatory scrollbar-none">
                  {filtered.map((garage) => {
                    const isActive = garage.id === heroId;
                    return (
                      <motion.button
                        key={garage.id}
                        layoutId={`thumb-${garage.id}`}
                        onClick={() => setHeroId(garage.id)}
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.97 }}
                        className={cn(
                          "relative flex-shrink-0 w-24 sm:w-28 aspect-[4/3] rounded-xl overflow-hidden snap-start",
                          "transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper",
                          isActive
                            ? "ring-2 ring-copper shadow-lg shadow-copper/20"
                            : "ring-1 ring-charcoal/10 opacity-60 hover:opacity-100"
                        )}
                        aria-label={`View ${garage.label}`}
                        aria-pressed={isActive}
                      >
                        <Image
                          src={garage.src}
                          alt={garage.label}
                          fill
                          className="object-cover"
                          sizes="112px"
                        />
                        {/* Active underline */}
                        {isActive && (
                          <motion.div
                            layoutId="activeThumbBar"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-copper"
                          />
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
