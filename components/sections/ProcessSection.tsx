"use client";

import { motion } from "framer-motion";
import { Trash2, Ruler, Hammer, Zap } from "lucide-react";

const steps = [
  {
    id: 1,
    icon: Trash2,
    title: "Demolition & Clearing",
    description:
      "We remove any existing structure and clear the site completely, preparing a clean foundation for your new garage.",
  },
  {
    id: 2,
    icon: Ruler,
    title: "Site Preparation & Foundation",
    description:
      "Precise measurements, leveling, and pouring of a rock-solid concrete foundation built to last generations.",
  },
  {
    id: 3,
    icon: Hammer,
    title: "Amish-Quality Construction",
    description:
      "Our skilled Amish craftsmen hand-build your garage using premium materials, traditional joinery, and modern techniques.",
  },
  {
    id: 4,
    icon: Zap,
    title: "Electrical & Final Touches",
    description:
      "Professional electrical installation, finishing details, and a thorough quality inspection before handover.",
  },
];

export default function ProcessSection() {
  return (
    <section
      id="process"
      className="py-20 sm:py-28 bg-forest overflow-hidden"
      aria-label="Our Build Process"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-copper text-sm font-bold tracking-widest uppercase mb-3">
            Step by Step
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-cream tracking-tight">
            How We Build Your Garage
          </h2>
          <p className="mt-4 text-lg text-cream/50 max-w-2xl mx-auto">
            From demolition to the final nail — every step is handled with
            precision and care.
          </p>
        </motion.div>

        {/* ── Timeline ── */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-copper via-copper/50 to-copper/10" />

          <div className="space-y-12 sm:space-y-16">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="relative flex gap-6 sm:gap-8"
                >
                  {/* Icon Circle */}
                  <motion.div
                    whileInView={{ scale: [0.8, 1.1, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.15 + 0.3 }}
                    className="relative z-10 flex h-12 w-12 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-full bg-copper shadow-lg shadow-copper/30"
                  >
                    <Icon className="h-5 w-5 sm:h-7 sm:w-7 text-cream" />
                  </motion.div>

                  {/* Content */}
                  <div className="pt-1 sm:pt-3">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-copper text-xs font-bold tracking-widest uppercase">
                        Step {step.id}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-cream mb-2">
                      {step.title}
                    </h3>
                    <p className="text-cream/50 text-base leading-relaxed max-w-lg">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
