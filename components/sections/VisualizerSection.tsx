"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Paintbrush, Home, DoorOpen, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface GarageItem {
  id: string;
  src: string;
  label: string;
  style: string;
  color: string;
  door: string;
}

const garages: GarageItem[] = [
  { id: "g1", src: "/garage_1.jpg", label: "Tan Standard with Open Bay", style: "Standard", color: "Tan", door: "Open Bay" },
  { id: "g2", src: "/garage_2.jpg", label: "Cream Standard with Open Bay", style: "Standard", color: "Cream", door: "Open Bay" },
  { id: "g3", src: "/garage_3.jpg", label: "Sage Green with White Panel", style: "Standard", color: "Green", door: "Panel" },
  { id: "g4", src: "/garage_4.jpg", label: "Dark Gray with White Panel", style: "Standard", color: "Gray", door: "Panel" },
  { id: "g5", src: "/garage_5.jpg", label: "Navy Blue with Brown Panel", style: "Standard", color: "Blue", door: "Panel" },
  { id: "g6", src: "/garage_6.jpg", label: "White Cape Cod with Open Bay", style: "Cape Cod", color: "White", door: "Open Bay" },
  { id: "g7", src: "/garage_7.jpg", label: "Beige Standard with Double Panel", style: "Standard", color: "Beige", door: "Panel" },
];

const filters = {
  style: ["All", "Standard", "Cape Cod"],
  color: ["All", "Tan", "Cream", "Green", "Gray", "Blue", "White", "Beige"],
  door:  ["All", "Open Bay", "Panel"],
};

const colorSwatches: Record<string, string> = {
  Tan: "#d2b48c",
  Cream: "#fffdd0",
  Green: "#8fbc8f",
  Gray: "#708090",
  Blue: "#4a6fa5",
  White: "#ffffff",
  Beige: "#d4c5a9",
};

export default function VisualizerSection() {
  const [activeStyle, setActiveStyle] = useState("All");
  const [activeColor, setActiveColor] = useState("All");
  const [activeDoor, setActiveDoor] = useState("All");
  const [selectedGarage, setSelectedGarage] = useState<GarageItem | null>(null);

  const filtered = garages.filter((g) => {
    if (activeStyle !== "All" && g.style !== activeStyle) return false;
    if (activeColor !== "All" && g.color !== activeColor) return false;
    if (activeDoor !== "All" && g.door !== activeDoor) return false;
    return true;
  });

  return (
    <section
      id="visualizer"
      className="py-20 sm:py-28 bg-cream"
      aria-label="Design Your Garage"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ── */}
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
          <p className="mt-4 text-lg text-charcoal/60 max-w-2xl mx-auto">
            Browse our collection. Filter by style, color, and door type to find your perfect match.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* ── Filters Panel ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-4 space-y-8"
          >
            {/* Style Filter */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-charcoal/5">
              <div className="flex items-center gap-2 mb-4">
                <Home className="h-5 w-5 text-copper" />
                <h3 className="font-bold text-forest text-base">Garage Style</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {filters.style.map((s) => (
                  <button
                    key={s}
                    onClick={() => setActiveStyle(s)}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                      activeStyle === s
                        ? "bg-forest text-cream shadow-md"
                        : "bg-charcoal/5 text-charcoal/70 hover:bg-charcoal/10"
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Filter */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-charcoal/5">
              <div className="flex items-center gap-2 mb-4">
                <Paintbrush className="h-5 w-5 text-copper" />
                <h3 className="font-bold text-forest text-base">Wall Color</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {filters.color.map((c) => (
                  <button
                    key={c}
                    onClick={() => setActiveColor(c)}
                    className={cn(
                      "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                      activeColor === c
                        ? "bg-forest text-cream shadow-md"
                        : "bg-charcoal/5 text-charcoal/70 hover:bg-charcoal/10"
                    )}
                  >
                    {c !== "All" && (
                      <span
                        className="h-3 w-3 rounded-full border border-charcoal/20 shrink-0"
                        style={{ backgroundColor: colorSwatches[c] }}
                      />
                    )}
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Door Filter */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-charcoal/5">
              <div className="flex items-center gap-2 mb-4">
                <DoorOpen className="h-5 w-5 text-copper" />
                <h3 className="font-bold text-forest text-base">Door Type</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {filters.door.map((d) => (
                  <button
                    key={d}
                    onClick={() => setActiveDoor(d)}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                      activeDoor === d
                        ? "bg-forest text-cream shadow-md"
                        : "bg-charcoal/5 text-charcoal/70 hover:bg-charcoal/10"
                    )}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Selection Summary */}
            {selectedGarage && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-copper/10 border border-copper/30 rounded-2xl p-6"
              >
                <p className="text-sm font-bold text-forest mb-2">Your Selection:</p>
                <p className="text-sm text-charcoal/70">{selectedGarage.label}</p>
                <a
                  href="#quote"
                  className="mt-4 inline-flex items-center gap-2 w-full justify-center rounded-full bg-copper px-6 py-3 text-sm font-bold text-cream transition-all hover:bg-copper-light active:scale-95"
                >
                  Get a Quote for This Design
                  <ArrowRight className="h-4 w-4" />
                </a>
              </motion.div>
            )}
          </motion.div>

          {/* ── Gallery Grid ── */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {filtered.length > 0 ? (
                <motion.div
                  key={`${activeStyle}-${activeColor}-${activeDoor}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  {filtered.map((garage, i) => (
                    <motion.button
                      key={garage.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                      onClick={() => setSelectedGarage(garage)}
                      className={cn(
                        "group relative aspect-[4/3] overflow-hidden rounded-2xl cursor-pointer transition-all duration-300",
                        selectedGarage?.id === garage.id
                          ? "ring-4 ring-copper shadow-xl shadow-copper/20"
                          : "ring-1 ring-charcoal/10 hover:ring-2 hover:ring-copper/50 hover:shadow-lg"
                      )}
                    >
                      <Image
                        src={garage.src}
                        alt={garage.label}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {/* Label */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <p className="text-cream text-sm font-semibold">{garage.label}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-copper text-xs">{garage.style}</span>
                          <span className="text-cream/40">•</span>
                          <span className="text-cream/60 text-xs">{garage.door}</span>
                        </div>
                      </div>
                      {/* Selected checkmark */}
                      {selectedGarage?.id === garage.id && (
                        <div className="absolute top-3 right-3 h-8 w-8 rounded-full bg-copper flex items-center justify-center">
                          <svg className="h-5 w-5 text-cream" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </motion.button>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-20 text-center"
                >
                  <div className="h-16 w-16 rounded-full bg-charcoal/5 flex items-center justify-center mb-4">
                    <Home className="h-8 w-8 text-charcoal/30" />
                  </div>
                  <p className="text-charcoal/50 text-lg font-medium">No garages match this combination</p>
                  <p className="text-charcoal/40 text-sm mt-1">Try adjusting your filters above</p>
                  <button
                    onClick={() => { setActiveStyle("All"); setActiveColor("All"); setActiveDoor("All"); }}
                    className="mt-4 text-copper font-semibold text-sm hover:underline"
                  >
                    Reset all filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
