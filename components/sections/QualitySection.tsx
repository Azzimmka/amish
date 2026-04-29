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
        description:
            "Every structure is backed by a full decade of structural protection.",
    },
    {
        icon: Award,
        title: "Amish Quality",
        description: "Handcrafted with generations of architectural expertise.",
    },
    {
        icon: BadgeCheck,
        title: "Licensed & Insured",
        description:
            "Complete liability coverage for your total peace of mind.",
    },
];

/* ─── Projects ────────────────────────────────────────────────── */
interface Project {
    id: number;
    title: string;
    tag: string;
    before: string;
    after: string;
    available: boolean;
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
        before: "/before-after/chicago_suburb_before.png",
        after: "/before-after/chicago_suburb_after.png",
        available: true,
    },
    {
        id: 3,
        title: "Two-Car Custom",
        tag: "24×32 Double Bay",
        before: "/before-after/two_cars_before.png",
        after: "/before-after/two-cars-after.png",
        available: true,
    },
];

export default function QualitySection() {
    const [activeId, setActiveId] = useState(1);
    const active = projects.find((p) => p.id === activeId) ?? projects[0];

    return (
        <section
            className="py-32 bg-cream text-charcoal relative overflow-hidden"
            aria-label="Quality and Gallery"
        >
            {/* ── Background Elements ── */}
            <div className="absolute top-0 right-0 w-1/2 h-[800px] bg-gradient-to-bl from-copper/5 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-charcoal/10 to-transparent" />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* ── Top Section: Badges (COMPACT SINGLE-VIEWPORT) ── */}
                <div className="mb-24 lg:mb-32">
                    {/* Header Row */}
                    <motion.div 
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "50px" }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="mb-16 lg:mb-20 relative z-20 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
                    >
                        <div>
                            <motion.span 
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                                className="inline-block text-copper text-xs font-bold tracking-[0.3em] uppercase mb-4"
                            >
                                The Amish Standard
                            </motion.span>
                            <h2 className="text-6xl md:text-7xl lg:text-8xl font-heading font-black text-charcoal tracking-tighter leading-[0.85] uppercase">
                                <motion.span 
                                    initial={{ opacity: 0, y: 60 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                    className="inline-block"
                                >
                                    Built To{" "}
                                </motion.span>
                                <motion.span 
                                    initial={{ opacity: 0, y: 60 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                    className="inline-block text-copper italic font-serif normal-case font-light"
                                >
                                    Outlast.
                                </motion.span>
                            </h2>
                        </div>
                        <motion.p 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="text-charcoal/50 text-base lg:text-lg max-w-xs font-medium leading-relaxed lg:text-right"
                        >
                            Three pillars that define every structure we build.
                        </motion.p>
                    </motion.div>

                    {/* Badges Row — 3 columns, one viewport */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-charcoal/10">
                        {badges.map((badge, i) => {
                            const Icon = badge.icon;
                            return (
                                <motion.div
                                    key={badge.title}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "50px" }}
                                    transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                                    className="group relative overflow-hidden border-b md:border-b-0 md:border-r last:border-r-0 border-charcoal/10 py-12 md:py-16 px-6 md:px-10 cursor-default"
                                >
                                    {/* Grain / Noise Texture — handcrafted paper feel */}
                                    <div className="absolute inset-0 bg-noise opacity-[0.06] mix-blend-multiply pointer-events-none" />
                                    
                                    {/* Warm radial glow on hover — like sunlight on natural wood */}
                                    <div className="absolute inset-0 bg-radial-[at_30%_30%] from-copper/[0.04] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                                    {/* Bottom copper accent — grows on hover */}
                                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-copper/60 via-copper to-copper/60 scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-600 ease-out" />

                                    <div className="relative z-10">
                                        {/* Icon in refined circular container */}
                                        <motion.div
                                            animate={{ y: [0, -6, 0] }}
                                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }}
                                            className="mb-6 sm:mb-8"
                                        >
                                            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-forest/[0.04] border border-charcoal/[0.06] group-hover:bg-copper/10 group-hover:border-copper/25 group-hover:shadow-[0_0_20px_rgba(184,115,51,0.1)] transition-all duration-500">
                                                <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-charcoal/30 group-hover:text-copper transition-colors duration-500" strokeWidth={1.5} />
                                            </div>
                                        </motion.div>

                                        {/* Title */}
                                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-heading font-black text-charcoal uppercase tracking-tight leading-[1] mb-3 sm:mb-4">
                                            {badge.title.split(' ').map((word, wIdx) => (
                                                <div key={wIdx} className="overflow-hidden">
                                                    <motion.span
                                                        initial={{ y: 50, opacity: 0 }}
                                                        whileInView={{ y: 0, opacity: 1 }}
                                                        viewport={{ once: true }}
                                                        transition={{ duration: 0.6, delay: i * 0.12 + wIdx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                                                        className="block"
                                                    >
                                                        {word}
                                                    </motion.span>
                                                </div>
                                            ))}
                                        </h3>

                                        {/* Thin copper separator */}
                                        <motion.div
                                            initial={{ scaleX: 0 }}
                                            whileInView={{ scaleX: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.8, delay: i * 0.15 + 0.3, ease: [0.16, 1, 0.3, 1] }}
                                            className="w-8 sm:w-10 h-[2px] bg-copper/40 mb-4 sm:mb-5 origin-left group-hover:bg-copper transition-colors duration-500"
                                        />

                                        {/* Description */}
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.6, delay: i * 0.12 + 0.3 }}
                                            className="text-sm sm:text-base lg:text-lg text-charcoal/40 leading-relaxed font-medium max-w-[280px] transition-colors duration-500 group-hover:text-charcoal/65"
                                        >
                                            {badge.description}
                                        </motion.p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* ── Bottom Section: Full-Width Before / After Gallery ── */}
                <div
                    className="relative -mx-4 sm:-mx-6 lg:-mx-8 mt-20"
                    id="gallery"
                >
                    {/* Project Navigation Header */}
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                            <div className="max-w-xl">
                                <span className="inline-block text-copper text-xs font-bold tracking-[0.2em] uppercase mb-4">
                                    Case Studies
                                </span>
                                <h2 className="text-4xl lg:text-6xl font-heading font-black text-charcoal tracking-tighter leading-none mb-0 uppercase">
                                    Visible <br />{" "}
                                    <span className="text-copper italic font-serif normal-case font-light">
                                        Transformation
                                    </span>
                                </h2>
                            </div>

                            <div className="flex flex-wrap gap-4 md:gap-6">
                                {projects.map((project) => (
                                    <button
                                        key={project.id}
                                        onClick={() => setActiveId(project.id)}
                                        className={cn(
                                            "group flex flex-col items-start px-6 py-4 rounded-xl transition-all duration-300 border text-left cursor-pointer",
                                            activeId === project.id
                                                ? "border-copper bg-copper/5 shadow-sm ring-1 ring-copper/20"
                                                : "border-charcoal/10 bg-white hover:border-copper/40 hover:bg-copper/5 hover:shadow-md",
                                        )}
                                    >
                                        <span className="text-[10px] font-black uppercase tracking-widest text-copper mb-1">
                                            Project 0{project.id}
                                        </span>
                                        <span className="text-sm font-heading font-bold text-charcoal uppercase tracking-tight">
                                            {project.title}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Massive Slider Viewport */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="relative w-full aspect-[4/3] sm:aspect-[21/9] lg:h-[80svh] bg-transparent overflow-hidden"
                    >
                        {/* Background Texture */}
                        <div className="absolute inset-0 bg-noise opacity-20 z-10 pointer-events-none" />

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeId}
                                initial={{
                                    opacity: 0,
                                    scale: 1.1,
                                    filter: "blur(20px)",
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    filter: "blur(0px)",
                                }}
                                exit={{
                                    opacity: 0,
                                    scale: 1.1,
                                    filter: "blur(20px)",
                                }}
                                transition={{
                                    duration: 0.8,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                                className="absolute inset-0"
                            >
                                <BeforeAfterSlider
                                    beforeSrc={active.before}
                                    beforeAlt={`Before — ${active.title}`}
                                    afterSrc={active.after}
                                    afterAlt={`After — ${active.title}`}
                                />
                            </motion.div>
                        </AnimatePresence>

                        {/* Bottom Floating Info */}
                        <div className="absolute bottom-10 left-10 z-20 hidden md:block">
                            <motion.div
                                key={activeId + "-tag"}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-forest/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl"
                            >
                                <p className="text-xs font-bold text-copper uppercase tracking-widest mb-1">
                                    {active.tag}
                                </p>
                                <p className="text-xl font-heading font-bold text-white uppercase tracking-tight">
                                    Project Specifications
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
