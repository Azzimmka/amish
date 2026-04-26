"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Settings2, ShieldCheck, ChevronLeft, ChevronRight } from "lucide-react";
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
  // Standard Style
  { id: "g1", src: "/garage_1.jpg",  label: "Tan Standard",       style: "Standard", color: "Tan",   door: "Open Bay" },
  { id: "g2", src: "/garage_2.jpg",  label: "Cream Classic",      style: "Standard", color: "Cream", door: "Open Bay" },
  { id: "g3", src: "/garage_3.jpg",  label: "Sage Green",         style: "Standard", color: "Green", door: "Panel"   },
  { id: "g4", src: "/garage_4.jpg",  label: "Storm Gray",         style: "Standard", color: "Gray",  door: "Panel"   },
  { id: "g5", src: "/garage_5.jpg",  label: "Navy Blue",          style: "Standard", color: "Blue",  door: "Panel"   },
  { id: "g8", src: "/white_Garage.png", label: "White Standard",  style: "Standard", color: "White", door: "Panel"   },
  { id: "g7", src: "/garage_7.jpg",  label: "Beige Double-Wide",  style: "Standard", color: "Beige", door: "Panel"   },
  // Cape Cod Style
  { id: "g9", src: "/Tan-Cape-Cod-style .jpg", label: "Tan Cape Cod", style: "Cape Cod", color: "Tan", door: "Open Bay" },
  { id: "g10", src: "/CreamColorCapeCod .jpg", label: "Cream Cape Cod", style: "Cape Cod", color: "Cream", door: "Panel" },
  { id: "g11", src: "/Green-Cape .jpg", label: "Green Cape Cod", style: "Cape Cod", color: "Green", door: "Open Bay" },
  { id: "g12", src: "/Gray-Cape .jpg", label: "Gray Cape Cod", style: "Cape Cod", color: "Gray", door: "Panel" },
  { id: "g13", src: "/Blue-Cape .jpeg", label: "Blue Cape Cod", style: "Cape Cod", color: "Blue", door: "Open Bay" },
  { id: "g6", src: "/garage_6.jpg",  label: "White Cape Cod",     style: "Cape Cod", color: "White", door: "Open Bay"},
  { id: "g14", src: "/Beige-Cape .jpg", label: "Beige Cape Cod", style: "Cape Cod", color: "Beige", door: "Panel" },
];

const colorSwatches: Record<string, string> = {
  Tan: "#d2b48c", Cream: "#fffdd0", Green: "#8fbc8f",
  Gray: "#708090", Blue: "#4a6fa5", White: "#f0f0f0", Beige: "#d4c5a9",
};

/* ─── Floating Pill ─────────────────────────────────────────── */
function ConfigPill({
  label, active, swatch, onClick,
}: { label: string; active: boolean; swatch?: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative flex items-center justify-center gap-2 px-5 py-3 rounded-full text-[11px] font-bold tracking-[0.15em] uppercase transition-all duration-300 overflow-hidden",
        active
          ? "text-forest bg-cream shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          : "text-cream/70 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20"
      )}
    >
      {active && (
        <motion.div
          layoutId="activeConfigGlow"
          className="absolute inset-0 bg-cream"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
      
      {swatch && (
        <span
          className="relative z-10 h-3 w-3 rounded-full border border-charcoal/20 shadow-inner"
          style={{ backgroundColor: swatch }}
        />
      )}
      <span className="relative z-10">{label}</span>
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

  const handleNext = () => {
    const currentIndex = filtered.findIndex(g => g.id === heroId);
    if (currentIndex < filtered.length - 1) {
      setHeroId(filtered[currentIndex + 1].id);
    } else {
      setHeroId(filtered[0].id); // loop
    }
  };

  const handlePrev = () => {
    const currentIndex = filtered.findIndex(g => g.id === heroId);
    if (currentIndex > 0) {
      setHeroId(filtered[currentIndex - 1].id);
    } else {
      setHeroId(filtered[filtered.length - 1].id); // loop
    }
  };

  return (
    <section id="visualizer" className="relative bg-charcoal flex flex-col lg:block lg:min-h-[100svh]" aria-label="Garage Configurator">
      
      {/* ── Background Immersive Viewer (Sticky on Mobile, Absolute Full on Desktop) ── */}
      <div className="sticky top-0 z-0 h-[55svh] lg:absolute lg:inset-0 lg:h-full bg-black overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={hero?.id || "empty"}
            initial={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute inset-0"
          >
            {hero ? (
              <Image
                src={hero.src}
                alt={hero.label}
                fill
                priority
                className="object-cover opacity-90 lg:opacity-80 lg:mix-blend-screen"
                sizes="100vw"
              />
            ) : (
              <div className="absolute inset-0 bg-charcoal flex items-center justify-center">
                <p className="text-white/30 font-heading text-xl lg:text-2xl uppercase tracking-widest">No combinations found</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
        
        {/* Cinematic Vignettes */}
        <div className="hidden lg:block absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#050505_120%)] pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-32 lg:h-48 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-32 lg:h-64 bg-gradient-to-t from-charcoal via-charcoal/50 lg:from-black lg:via-black/80 to-transparent pointer-events-none" />
      </div>

      {/* ── UI Layer ── */}
      <div className="relative z-10 flex flex-col lg:h-screen w-full mx-auto max-w-7xl pointer-events-none">
        
        {/* Mobile Spacer (pushes header down slightly if needed, but we want header at top) */}
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center sm:items-start pointer-events-auto px-4 pt-12 sm:px-6 lg:px-8 lg:pt-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-black/40 lg:bg-white/5 backdrop-blur-md mb-4 lg:mb-6">
            <Settings2 className="w-4 h-4 text-copper" />
            <span className="text-[10px] font-bold text-cream tracking-[0.2em] uppercase">Interactive Configurator</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-heading font-black text-white tracking-tighter uppercase drop-shadow-2xl text-center sm:text-left leading-none">
            Design Your <br className="hidden sm:block" />
            <span className="text-copper italic font-serif normal-case font-light drop-shadow-[0_0_30px_rgba(184,115,51,0.5)]">Masterpiece.</span>
          </h2>
        </motion.div>

        {/* Mobile spacer to reveal image between header and controls */}
        <div className="flex-grow min-h-[15svh] lg:min-h-0 flex items-center justify-between w-full pointer-events-none my-4 lg:my-8 px-4 sm:px-6 lg:px-8">
            {/* Arrows */}
            {filtered.length > 1 && (
              <>
                <button onClick={handlePrev} className="pointer-events-auto p-3 lg:p-4 rounded-full bg-black/40 border border-white/10 text-white hover:bg-copper hover:border-copper transition-all backdrop-blur-md group shadow-lg">
                  <ChevronLeft className="w-5 h-5 lg:w-8 lg:h-8 group-hover:-translate-x-1 transition-transform" />
                </button>
                <button onClick={handleNext} className="pointer-events-auto p-3 lg:p-4 rounded-full bg-black/40 border border-white/10 text-white hover:bg-copper hover:border-copper transition-all backdrop-blur-md group shadow-lg">
                  <ChevronRight className="w-5 h-5 lg:w-8 lg:h-8 group-hover:translate-x-1 transition-transform" />
                </button>
              </>
            )}
        </div>

        {/* Floating Controls Panel */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-auto pointer-events-auto bg-charcoal lg:bg-transparent px-0 sm:px-6 lg:px-8 pb-0 lg:pb-24 rounded-t-[2.5rem] lg:rounded-none relative z-20"
        >
          {/* Mobile Handle (Optional visual cue) */}
          <div className="w-full flex justify-center pt-4 pb-2 lg:hidden">
            <div className="w-12 h-1.5 bg-white/20 rounded-full" />
          </div>

          <div className="bg-charcoal lg:bg-black/60 lg:backdrop-blur-2xl lg:border lg:border-white/10 lg:rounded-[2rem] p-6 sm:p-8 lg:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              
              {/* Left: Active Info */}
              <div className="lg:col-span-4 flex flex-col justify-end border-b lg:border-b-0 lg:border-r border-white/10 pb-6 lg:pb-0 lg:pr-8">
                <span className="text-[10px] font-bold text-copper tracking-[0.3em] uppercase mb-2 flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5" /> Amish Certified
                </span>
                <AnimatePresence mode="wait">
                  <motion.h3 
                    key={hero?.id || "none"}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="text-2xl sm:text-3xl font-heading font-black text-white uppercase tracking-wider mb-2"
                  >
                    {hero ? hero.label : "Custom Build"}
                  </motion.h3>
                </AnimatePresence>
                <p className="text-sm text-white/50 font-medium">
                  {hero ? `${hero.style} Style · ${hero.door} Door` : "Adjust filters to find matches"}
                </p>
                <div className="mt-6 lg:mt-8">
                  <a href="#quote" className="inline-flex items-center justify-center gap-3 w-full bg-copper text-cream font-bold uppercase tracking-[0.2em] text-[11px] sm:text-xs py-4 lg:py-5 px-6 rounded-full hover:bg-white hover:text-black transition-colors duration-300">
                    Get a Quote <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Right: Selectors */}
              <div className="lg:col-span-8 flex flex-col gap-6 lg:gap-8 lg:pl-4">
                
                {/* Style */}
                <div className="space-y-3">
                  <div className="text-[10px] font-bold text-white/40 tracking-[0.2em] uppercase">Architecture Style</div>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {["All", "Standard", "Cape Cod"].map((s) => (
                      <ConfigPill key={s} label={s} active={activeStyle === s} onClick={() => setActiveStyle(s)} />
                    ))}
                  </div>
                </div>

                {/* Color */}
                <div className="space-y-3">
                  <div className="text-[10px] font-bold text-white/40 tracking-[0.2em] uppercase">Exterior Color</div>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    <ConfigPill label="All" active={activeColor === "All"} onClick={() => setActiveColor("All")} />
                    {Object.keys(colorSwatches).map((c) => (
                      <ConfigPill key={c} label={c} active={activeColor === c} swatch={colorSwatches[c]} onClick={() => setActiveColor(c)} />
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
