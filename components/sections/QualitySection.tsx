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
                {/* ── Top Section: Badges (OUT OF BOUNDS DESIGN) ── */}
                <div className="mb-40 lg:mb-64 overflow-hidden py-10">
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "50px" }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="mb-24 lg:mb-40 relative z-20"
                    >
                        <motion.span 
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                            className="inline-block text-copper text-sm font-bold tracking-[0.3em] uppercase mb-8"
                        >
                            The Amish Standard
                        </motion.span>
                        <h2 className="text-[12vw] md:text-8xl lg:text-[140px] font-heading font-black text-charcoal tracking-tighter leading-[0.8] uppercase whitespace-nowrap -ml-2">
                            <motion.span 
                                initial={{ opacity: 0, y: 100, rotate: 5 }}
                                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className="inline-block origin-bottom-left"
                            >
                                Built To 
                            </motion.span>
                            <br />
                            <motion.span 
                                initial={{ opacity: 0, y: 100, rotate: -5 }}
                                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                                transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className="inline-block text-copper italic font-serif normal-case font-light drop-shadow-xl ml-12 md:ml-32 origin-bottom-right"
                            >
                                Outlast.
                            </motion.span>
                        </h2>
                    </motion.div>

                    <div className="relative w-full flex flex-col gap-32 lg:gap-52">
                        {badges.map((badge, i) => {
                            const Icon = badge.icon;
                            const isEven = i % 2 === 0;

                            return (
                                <motion.div
                                    key={badge.title}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: true, margin: "50px" }}
                                    variants={{
                                        hidden: { opacity: 0 },
                                        show: { 
                                            opacity: 1, 
                                            transition: { staggerChildren: 0.1 } 
                                        }
                                    }}
                                    className={cn(
                                        "group relative w-full lg:w-3/4 flex flex-col",
                                        !isEven
                                            ? "lg:self-end lg:items-end text-left lg:text-right"
                                            : "text-left"
                                    )}
                                >
                                    {/* GIANT FLOATING ICON BLEEDING OUT OF BOUNDS */}
                                    <motion.div
                                        variants={{
                                            hidden: { opacity: 0, scale: 0.8, rotate: -15 },
                                            show: { opacity: 0.05, scale: 1, rotate: 0, transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] } }
                                        }}
                                        className={cn(
                                            "absolute top-1/2 -translate-y-1/2 z-0 pointer-events-none transition-transform duration-[2000ms] group-hover:scale-110",
                                            !isEven
                                                ? "-right-20 lg:-right-64"
                                                : "-left-20 lg:-left-64"
                                        )}
                                    >
                                        <motion.div 
                                          animate={{ y: [0, -30, 0] }} 
                                          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: i }}
                                        >
                                            <Icon
                                                className="w-[100vw] lg:w-[800px] h-[100vw] lg:h-[800px] text-charcoal"
                                                strokeWidth={0.2}
                                            />
                                        </motion.div>
                                    </motion.div>

                                    <div className="relative z-10">
                                        <div
                                            className={cn(
                                                "flex flex-col gap-4 mb-6",
                                                !isEven
                                                    ? "lg:items-end"
                                                    : "items-start"
                                            )}
                                        >
                                            <motion.span 
                                                variants={{
                                                    hidden: { opacity: 0, y: 50 },
                                                    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                                                }}
                                                className="text-copper/40 text-4xl lg:text-6xl font-black font-heading tracking-tighter transition-colors duration-500 group-hover:text-copper"
                                            >
                                                0{i + 1}
                                            </motion.span>
                                            <h3 className="text-5xl sm:text-6xl lg:text-8xl font-heading font-black text-charcoal uppercase tracking-tighter leading-[0.9] cursor-default flex flex-wrap gap-x-4">
                                                {badge.title.split(' ').map((word, wIdx) => (
                                                  <div key={wIdx} className="overflow-hidden">
                                                    <motion.span 
                                                        variants={{
                                                            hidden: { opacity: 0, y: 100 },
                                                            show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                                                        }}
                                                        className="block transition-transform duration-500 group-hover:translate-x-4"
                                                    >
                                                        {word}
                                                    </motion.span>
                                                  </div>
                                                ))}
                                            </h3>
                                        </div>
                                        <div className="overflow-hidden">
                                            <motion.p
                                                variants={{
                                                    hidden: { opacity: 0, y: 50 },
                                                    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                                                }}
                                                className={cn(
                                                    "text-xl sm:text-2xl lg:text-4xl text-charcoal/40 leading-[1.3] font-serif italic max-w-md lg:max-w-2xl transition-colors duration-500 group-hover:text-charcoal/80",
                                                    !isEven && "lg:ml-auto"
                                                )}
                                            >
                                                "{badge.description}"
                                            </motion.p>
                                        </div>
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
