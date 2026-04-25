"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Award, BadgeCheck, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import BeforeAfterSlider from "@/components/visualizer/BeforeAfterSlider";

/* ─── Trust Badges ─────────────────────────────────────────────── */
const badges = [
  {
    icon: Shield,
    title: "10-Year Warranty",
    description: "Every garage backed by a decade of protection",
  },
  {
    icon: Award,
    title: "Amish Quality",
    description: "Handcrafted with generations of expertise",
  },
  {
    icon: BadgeCheck,
    title: "Licensed & Insured",
    description: "Full coverage for your complete peace of mind",
  },
];

/* ─── Projects ──────────────────────────────────────────────────
   Replace placeholder paths with real images when ready.
   Pattern: /before-after/before_N.png / after_N.png
─────────────────────────────────────────────────────────────── */
interface Project {
  id: number;
  title: string;
  tag: string;
  before: string;
  after: string;
  available: boolean; // false = placeholder card (coming soon)
}

const projects: Project[] = [
  {
    id: 1,
    title: "Backyard Transformation",
    tag: "24×24 Standard Garage",
    before: "/before-after/before_1.png",
    after: "/before-after/after_1.png",
    available: true,
  },
  {
    id: 2,
    title: "Chicago Suburb Build",
    tag: "20×20 Cape Cod Style",
    before: "/before-after/before_2.png",
    after: "/before-after/after_2.png",
    available: false, // swap to true when photos arrive
  },
  {
    id: 3,
    title: "Two-Car Garage",
    tag: "24×32 Double Bay",
    before: "/before-after/before_3.png",
    after: "/before-after/after_3.png",
    available: false,
  },
  {
    id: 4,
    title: "Winter Project",
    tag: "20×24 Insulated",
    before: "/before-after/before_4.png",
    after: "/before-after/after_4.png",
    available: false,
  },
];

export default function QualitySection() {
  const [activeId, setActiveId] = useState(1);

  const active = projects.find((p) => p.id === activeId) ?? projects[0];

  return (
    <section

      className="py-20 sm:py-28 bg-cream"
      aria-label="Quality and Gallery"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-20">

        {/* ── Trust Badges ─────────────────────────────────────── */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-block text-copper text-sm font-bold tracking-widest uppercase mb-3">
              Why Choose Us
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-forest tracking-tight">
              Quality You Can Trust
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {badges.map((badge, i) => {
              const Icon = badge.icon;
              return (
                <motion.div
                  key={badge.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="group flex flex-col items-center text-center p-8 rounded-2xl bg-white border border-charcoal/5 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-copper/20 hover:-translate-y-1"
                >
                  <div className="h-16 w-16 rounded-2xl bg-copper/10 flex items-center justify-center mb-5 transition-colors group-hover:bg-copper/20">
                    <Icon className="h-8 w-8 text-copper" />
                  </div>
                  <h3 className="text-lg font-bold text-forest mb-2">{badge.title}</h3>
                  <p className="text-sm text-charcoal/60 leading-relaxed">{badge.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── Before / After ───────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          {/* Section header */}
          <div className="text-center mb-10" id="gallery">
            <span className="inline-block text-copper text-sm font-bold tracking-widest uppercase mb-3">
              Real Projects
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-forest tracking-tight">
              See the Difference
            </h2>
            <p className="mt-4 text-lg text-charcoal/60 max-w-2xl mx-auto">
              From bare frame to finished garage — drag the slider to witness the
              Amish transformation.
            </p>
          </div>

          {/* Active project info */}
          <div className="flex items-center justify-between mb-4 px-1">
            <div>
              <p className="text-xs text-copper font-bold tracking-widest uppercase">
                Project {active.id} of {projects.length}
              </p>
              <h3 className="text-xl font-bold text-forest">{active.title}</h3>
            </div>
            <span className="hidden sm:inline-block text-xs font-medium text-charcoal/50 border border-charcoal/15 rounded-full px-3 py-1">
              {active.tag}
            </span>
          </div>

          {/* Slider — animate when project changes */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              {active.available ? (
                <BeforeAfterSlider
                  beforeSrc={active.before}
                  beforeAlt={`Before — ${active.title}`}
                  afterSrc={active.after}
                  afterAlt={`After — ${active.title}`}
                />
              ) : (
                /* Placeholder card for upcoming projects */
                <div className="relative w-full aspect-[16/9] rounded-2xl bg-gradient-to-br from-forest/10 to-charcoal/10 border-2 border-dashed border-charcoal/20 flex flex-col items-center justify-center gap-4 shadow-inner">
                  <div className="h-16 w-16 rounded-full bg-charcoal/10 flex items-center justify-center">
                    <ImageIcon className="h-8 w-8 text-charcoal/30" />
                  </div>
                  <div className="text-center">
                    <p className="text-charcoal/50 font-semibold text-lg">{active.title}</p>
                    <p className="text-charcoal/35 text-sm mt-1">Photos coming soon</p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Project selector tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => project.available && setActiveId(project.id)}
                disabled={!project.available}
                className={cn(
                  "group relative text-left rounded-xl border p-4 transition-all duration-300",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper",
                  project.available
                    ? "cursor-pointer hover:-translate-y-0.5 hover:shadow-md"
                    : "cursor-not-allowed opacity-50",
                  activeId === project.id
                    ? "border-copper bg-copper/5 shadow-md shadow-copper/10"
                    : "border-charcoal/10 bg-white hover:border-copper/30"
                )}
                aria-label={`View project ${project.id}: ${project.title}`}
              >
                {/* Project number */}
                <div
                  className={cn(
                    "h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold mb-3 transition-colors",
                    activeId === project.id
                      ? "bg-copper text-cream"
                      : "bg-charcoal/10 text-charcoal/60 group-hover:bg-copper/20 group-hover:text-copper"
                  )}
                >
                  {project.id}
                </div>

                <p className={cn(
                  "text-sm font-semibold leading-tight mb-1 transition-colors",
                  activeId === project.id ? "text-forest" : "text-charcoal/70"
                )}>
                  {project.title}
                </p>
                <p className="text-xs text-charcoal/40">{project.tag}</p>

                {/* Active indicator dot */}
                {activeId === project.id && (
                  <motion.div
                    layoutId="activeProjectDot"
                    className="absolute top-3 right-3 h-2 w-2 rounded-full bg-copper"
                  />
                )}

                {/* Coming soon badge */}
                {!project.available && (
                  <span className="absolute top-2 right-2 text-[9px] font-bold tracking-wider uppercase text-charcoal/40 bg-charcoal/10 rounded-full px-2 py-0.5">
                    Soon
                  </span>
                )}
              </button>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
