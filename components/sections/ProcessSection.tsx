"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Trash2, Ruler, Hammer, Zap } from "lucide-react";

const steps = [
    {
        id: 1,
        icon: Trash2,
        title: "Site Demolition & Clearing",
        description:
            "We remove any existing structure and clear the site completely, preparing a flawless foundation canvas.",
    },
    {
        id: 2,
        icon: Ruler,
        title: "Precision Foundation",
        description:
            "Mathematical precision. Leveling and pouring of a rock-solid concrete foundation built to withstand generations.",
    },
    {
        id: 3,
        icon: Hammer,
        title: "Amish-Quality Construction",
        description:
            "Our skilled craftsmen hand-build your garage using premium materials, traditional joinery, and architectural framing.",
    },
    {
        id: 4,
        icon: Zap,
        title: "Electrical & Finishing",
        description:
            "Professional electrical installation, flawless exterior finishing, and a rigorous multi-point quality inspection.",
    },
];

export default function ProcessSection() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // Map scroll progress to horizontal translation.
    // We have 4 cards, so we need to move left by 3 full screen widths (-75%).
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

    return (
        <section
            id="process"
            ref={targetRef}
            className="relative h-[400vh] bg-forest"
            aria-label="Our Build Process"
        >
            {/* Sticky container that stays on screen while we scroll through the 400vh */}
            <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden bg-forest">
                {/* Global Static Background Noise */}
                <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay pointer-events-none" />

                {/* Floating section title that stays fixed while cards scroll */}
                <div className="absolute top-24 left-8 sm:left-16 lg:left-24 z-40 pointer-events-none">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-block text-copper text-xs sm:text-sm font-bold tracking-[0.3em] uppercase mb-4"
                    >
                        The Process
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-4xl sm:text-5xl lg:text-7xl font-heading font-black text-cream tracking-tighter uppercase max-w-sm"
                    >
                        How We Build.
                    </motion.h2>
                </div>

                {/* The horizontal track */}
                <motion.div style={{ x }} className="flex h-full">
                    {steps.map((step, index) => (
                        <ProcessCard
                            key={step.id}
                            step={step}
                            index={index}
                            scrollYProgress={scrollYProgress}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

function ProcessCard({
    step,
    index,
    scrollYProgress,
}: {
    step: any;
    index: number;
    scrollYProgress: any;
}) {
    const Icon = step.icon;

    // Create strictly increasing offsets that remain strictly inside [0, 1].
    // WAAPI crashes if offsets are outside [0, 1] or not monotonically increasing.
    let inputR = [0, 0.5, 1];
    let outputR = [0.3, 1, 0.3];

    const center = index * 0.3333;

    if (index === 0) {
        inputR = [0, 0.15];
        outputR = [1, 0.3];
    } else if (index === 3) {
        inputR = [0.85, 1];
        outputR = [0.3, 1];
    } else {
        inputR = [center - 0.15, center, center + 0.15];
        outputR = [0.3, 1, 0.3];
    }

    const opacity = useTransform(scrollYProgress, inputR, outputR);

    return (
        <div
            className={`w-screen h-full flex items-center justify-center flex-shrink-0 bg-transparent relative px-4 sm:px-8`}
        >
            {/* Background Number (Extremely subtle) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none overflow-hidden">
                <span className="text-[50vw] font-heading font-black leading-none text-white select-none">
                    0{step.id}
                </span>
            </div>

            <motion.div
                style={{ opacity }}
                className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center mt-20"
            >
                <div className="mb-6 sm:mb-10 inline-flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-copper/10 border border-copper/20 shadow-[0_0_40px_rgba(184,115,51,0.1)]">
                    <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-copper" />
                </div>

                <h3 className="text-4xl sm:text-5xl lg:text-7xl font-bold font-heading text-cream mb-8 uppercase tracking-tight">
                    {step.title}
                </h3>

                <p className="text-xl sm:text-2xl text-cream/70 font-sans leading-relaxed max-w-2xl mx-auto">
                    {step.description}
                </p>
            </motion.div>
        </div>
    );
}
