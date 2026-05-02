"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import BeforeAfterSlider from "@/components/visualizer/BeforeAfterSlider";

const steps = [
    {
        id: 1,
        title: "Demolition",
    },
    {
        id: 2,
        title: "Preparation site for new garage",
    },
    {
        id: 3,
        title: "New garage",
    },
    {
        id: 4,
        title: "Ready garage",
    },
];

export default function TransformationSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // ── SLIDER LOGIC ──
    // Slider Opacity: Fades in precisely at the start of Step 3 (0.45)
    const sliderOpacity = useTransform(smoothProgress, [0, 0.45, 0.55, 1], [0, 0, 1, 1]);
    
    // Slider wipes from 100 (Before) to 0 (After) during Step 4 (0.75 to 1.0)
    const sliderPosValue = useTransform(smoothProgress, [0, 0.75, 1], [100, 100, 0]);
    const [pos, setPos] = useState(100);

    useEffect(() => {
        return sliderPosValue.on("change", (v) => setPos(v));
    }, [sliderPosValue]);

    return (
        <section
            ref={containerRef}
            className="relative bg-forest"
            style={{ height: "400vh" }}
            id="transformation"
        >
            <div className="sticky top-0 h-screen w-full flex flex-col lg:flex-row overflow-hidden">
                
                {/* ── Background Noise ── */}
                <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay pointer-events-none" />

                {/* ── Left Side: Vertical Timeline ── */}
                {/* Added pt-28 on mobile to clear the sticky header completely. Increased px-8 so dots don't clip. */}
                <div className="relative w-full lg:w-1/2 h-[55%] lg:h-full flex flex-col justify-center pt-28 pb-4 lg:pt-0 px-8 sm:px-12 lg:p-20 z-10 lg:pl-32">
                    {/* ml-6 ensures the dot (which is positioned -left-[31px]) has plenty of safe space on the left */}
                    <div className="relative border-l-2 lg:border-l-4 border-white/10 ml-6 lg:ml-0 pl-6 lg:pl-12 flex flex-col gap-6 sm:gap-8 lg:gap-16 w-full max-w-xl">
                        {steps.map((step, index) => (
                            <TimelineItem
                                key={step.id}
                                step={step}
                                index={index}
                                scrollYProgress={scrollYProgress}
                            />
                        ))}
                    </div>
                </div>

                {/* ── Right Side: The Image/Slider ── */}
                <div className="relative w-full lg:w-1/2 h-[45%] lg:h-full flex items-start lg:items-center justify-center px-6 pb-12 pt-4 lg:p-20 z-10">
                    <motion.div 
                        style={{ opacity: sliderOpacity }}
                        className="w-full max-w-md lg:max-w-none aspect-[4/3] relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 bg-charcoal/20 backdrop-blur-sm"
                    >
                        <BeforeAfterSlider
                            beforeSrc="/before-after/before_1.png"
                            beforeAlt="New garage framing"
                            afterSrc="/before-after/after_1.png"
                            afterAlt="Ready garage"
                            controlledPos={pos}
                            className="w-full h-full rounded-none shadow-none pointer-events-none"
                        />
                    </motion.div>
                </div>

            </div>
        </section>
    );
}

function TimelineItem({ step, index, scrollYProgress }: { step: any; index: number; scrollYProgress: any }) {
    const start = index * 0.25;
    const end = (index + 1) * 0.25;
    
    const isActive = (v: number) => {
        if (index === 3) return v >= 0.75;
        return v >= start && v < end;
    };

    const opacity = useTransform(scrollYProgress, (v: number) => (isActive(v) ? 1 : 0.25));
    const x = useTransform(scrollYProgress, (v: number) => (isActive(v) ? 12 : 0)); 
    const scale = useTransform(scrollYProgress, (v: number) => (isActive(v) ? 1.5 : 1));
    const bg = useTransform(scrollYProgress, (v: number) => (isActive(v) ? "#b87333" : "#ffffff20"));

    return (
        <motion.div
            style={{ opacity, x }}
            className="relative flex flex-col text-left origin-left transition-all duration-300"
        >
            {/* The Dot on the timeline */}
            {/* -left-[31px] matches pl-6 (24px) + half of w-3 (6px) + 1px for border-l-2 */}
            <motion.div
                style={{ scale, backgroundColor: bg }}
                className="absolute -left-[31px] lg:-left-[58px] top-1/2 -translate-y-1/2 w-3 h-3 lg:w-4 lg:h-4 rounded-full border-2 lg:border-[3px] border-forest"
            />
            
            <span className="text-copper font-black text-[10px] sm:text-xs lg:text-sm uppercase tracking-[0.3em] mb-1 lg:mb-2">
                Step 0{step.id}
            </span>
            <h3 className="text-xl sm:text-3xl lg:text-5xl font-heading font-black text-cream uppercase tracking-tighter leading-none">
                {step.title}
            </h3>
        </motion.div>
    );
}
