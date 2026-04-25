"use client";

import Image from "next/image";
import {
    motion,
    useMotionValue,
    useSpring,
    useTransform,
    animate,
} from "framer-motion";
import { ChevronRight, Phone, MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useEffect, useState } from "react";

// Smooth animated counter using Framer Motion
function Counter({
    end,
    suffix = "",
    duration = 2,
}: {
    end: number;
    suffix?: string;
    duration?: number;
}) {
    const count = useMotionValue(0);
    const [display, setDisplay] = useState("0" + suffix);

    useEffect(() => {
        const controls = animate(count, end, {
            duration,
            ease: "easeOut",
            delay: 1.2,
            onUpdate: (latest) => {
                setDisplay(Math.round(latest) + suffix);
            },
        });
        return controls.stop;
    }, [count, end, duration, suffix]);

    return <span>{display}</span>;
}

const TypewriterHeading = () => {
    const [text1, setText1] = useState("");
    const [text2, setText2] = useState("");

    useEffect(() => {
        const full1 = "Built by Hand.";
        const full2 = "Built to Last.";
        let isCancelled = false;

        const run = async () => {
            while (!isCancelled) {
                // Initial wait
                await new Promise(r => setTimeout(r, 500));
                if (isCancelled) break;

                // Type line 1
                await animate(0, full1.length, {
                    duration: 0.8,
                    ease: "linear",
                    onUpdate: v => {
                        if (!isCancelled) setText1(full1.substring(0, Math.round(v)));
                    }
                });
                if (isCancelled) break;

                // Pause before line 2
                await new Promise(r => setTimeout(r, 200));
                if (isCancelled) break;

                // Type line 2
                await animate(0, full2.length, {
                    duration: 0.8,
                    ease: "linear",
                    onUpdate: v => {
                        if (!isCancelled) setText2(full2.substring(0, Math.round(v)));
                    }
                });
                if (isCancelled) break;

                // Read time
                await new Promise(r => setTimeout(r, 4000));
                if (isCancelled) break;

                // Delete line 2
                await animate(full2.length, 0, {
                    duration: 0.4,
                    ease: "linear",
                    onUpdate: v => {
                        if (!isCancelled) setText2(full2.substring(0, Math.round(v)));
                    }
                });
                if (isCancelled) break;

                // Delete line 1
                await animate(full1.length, 0, {
                    duration: 0.4,
                    ease: "linear",
                    onUpdate: v => {
                        if (!isCancelled) setText1(full1.substring(0, Math.round(v)));
                    }
                });
            }
        };

        run();
        return () => {
            isCancelled = true;
        };
    }, []);

    return (
        <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black text-cream leading-[1.05] tracking-tighter mb-8 sm:mb-10 drop-shadow-2xl min-h-[2.2em]">
            <span className="inline-block min-h-[1em]">{text1 || "\u00A0"}</span>
            <br />
            <span className="inline-block relative min-h-[1em]">
                <span className="text-copper">{text2 || "\u00A0"}</span>
                <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                    className="absolute -right-[0.5em] bottom-[0.15em] inline-block w-[0.08em] h-[0.8em] bg-copper align-baseline"
                />
            </span>
        </h1>
    );
};

export default function HeroSection() {
    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);

    const springConfig = { damping: 40, stiffness: 100, mass: 1 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

    // Subtle parallax offsets for the dark background
    const bgX = useTransform(smoothX, [0, 1], ["2%", "-2%"]);
    const bgY = useTransform(smoothY, [0, 1], ["2%", "-2%"]);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        mouseX.set(clientX / innerWidth);
        mouseY.set(clientY / innerHeight);
    };

    return (
        <section
            id="hero"
            className="relative flex flex-col min-h-screen bg-[#050505] overflow-hidden"
            aria-label="Hero"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => {
                mouseX.set(0.5);
                mouseY.set(0.5);
            }}
        >
            {/* ── Background: Imposing dark garage scene ── */}
            <motion.div
                className="absolute inset-0 z-0 pointer-events-none origin-center"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 10, ease: "easeOut" }}
                style={{ x: bgX, y: bgY }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/90 z-10" />
                <Image
                    src="/garage_1.jpg"
                    alt=""
                    fill
                    className="object-cover grayscale opacity-40 mix-blend-overlay"
                    priority
                />
            </motion.div>

            {/* ── Main Content Container (Centered) ── */}
            <div className="relative z-20 flex-grow flex flex-col items-center justify-center w-full mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-32 lg:pt-0 pb-32 lg:pb-24 text-center">
                
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-6 flex items-center justify-center gap-4"
                >
                    <div className="h-px w-8 sm:w-16 bg-copper/70" />
                    <span className="text-[10px] sm:text-xs font-bold text-copper tracking-[0.3em] uppercase">
                        Serving {siteConfig.address.region}
                    </span>
                    <div className="h-px w-8 sm:w-16 bg-copper/70" />
                </motion.div>

                {/* Imposing Heading with Typewriter Effect */}
                <TypewriterHeading />

                {/* Sub-headline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 2.5 }}
                    className="text-lg sm:text-xl lg:text-2xl text-cream/60 font-medium leading-relaxed mb-12 max-w-3xl mx-auto drop-shadow-md"
                >
                    Premium Amish craftsmanship for your perfect garage.
                    Custom-built with decades of tradition and an unmatched
                    10-year warranty.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 2.8 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full"
                >
                    <a
                        href="#visualizer"
                        className="group relative inline-flex items-center gap-4 bg-copper px-10 py-5 sm:px-12 sm:py-6 text-sm sm:text-base font-black text-cream tracking-[0.2em] uppercase transition-all duration-300 hover:bg-copper-light hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(184,115,51,0.4)] w-full sm:w-auto justify-center"
                    >
                        Start Build
                        <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </a>
                    <a
                        href={`tel:${siteConfig.phone.replace(/[^\d]/g, "")}`}
                        className="flex items-center justify-center gap-4 text-cream/70 hover:text-white transition-colors py-4 px-6 w-full sm:w-auto group"
                    >
                        <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-full border border-white/10 flex items-center justify-center bg-white/5 backdrop-blur-sm group-hover:bg-white/10 transition-colors">
                            <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-copper" />
                        </div>
                        <span className="text-base sm:text-lg font-bold tracking-wider">
                            {siteConfig.phone}
                        </span>
                    </a>
                </motion.div>
            </div>

            {/* ── Layer 3: Stats Bar ── */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 3.2 }}
                className="absolute bottom-0 left-0 w-full z-30 border-t border-white/5 bg-black/40 backdrop-blur-xl"
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 py-6 sm:py-8 items-center">
                        <div className="space-y-1 text-center sm:text-left">
                            <p className="text-3xl sm:text-4xl font-black text-cream drop-shadow-md">
                                <Counter end={10} suffix="+" duration={1.5} />
                            </p>
                            <p className="text-[9px] sm:text-[10px] text-copper tracking-[0.2em] uppercase font-bold">
                                Years Warranty
                            </p>
                        </div>

                        <div className="space-y-1 text-center sm:text-left">
                            <p className="text-3xl sm:text-4xl font-black text-cream drop-shadow-md">
                                <Counter end={127} suffix="+" duration={2} />
                            </p>
                            <p className="text-[9px] sm:text-[10px] text-copper tracking-[0.2em] uppercase font-bold">
                                Garages Built
                            </p>
                        </div>

                        <div className="space-y-1 flex flex-col items-center sm:items-start">
                            <div className="flex items-center gap-2">
                                <p className="text-3xl sm:text-4xl font-black text-cream drop-shadow-md">
                                    5.0
                                </p>
                                <div className="hidden lg:flex gap-0.5 drop-shadow-md">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className="w-3.5 h-3.5 text-copper"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>
                            <p className="text-[9px] sm:text-[10px] text-copper tracking-[0.2em] uppercase font-bold">
                                Client Rating
                            </p>
                        </div>

                        <div className="hidden sm:flex justify-end">
                            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/5 rounded-full border border-white/10 hover:bg-white/10 transition-colors">
                                <MapPin className="h-4 w-4 text-copper" />
                                <span className="text-[10px] text-cream/70 font-bold uppercase tracking-widest">
                                    USA, Chicagoland
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
