"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronRight, Phone, MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useEffect, useState } from "react";

// Smooth animated counter
function Counter({ end, suffix = "", duration = 2 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      // easeOutExpo
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeOut * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    const timer = setTimeout(() => {
      window.requestAnimationFrame(step);
    }, 1200); // delay
    return () => clearTimeout(timer);
  }, [end, duration]);

  return <span>{count}{suffix}</span>;
}

export default function HeroSection() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacityFade = useTransform(scrollY, [0, 600], [1, 0]);
  const scaleImage = useTransform(scrollY, [0, 800], [1, 1.15]);

  return (
    <section id="hero" className="relative flex flex-col min-h-[100svh] bg-forest overflow-hidden selection:bg-copper selection:text-white">
      
      {/* ── Layer 1: Cinematic Background Image ── */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ scale: scaleImage }}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.5, ease: [0.33, 1, 0.68, 1] }}
      >
        <Image
          src="/garage_1.jpg"
          alt="Amish Built Garages"
          fill
          className="object-cover object-[center_30%] mix-blend-luminosity opacity-40 grayscale"
          priority
        />
        {/* Dark Vignette & Gradient Overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#1a2e1a_120%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-forest/40 via-transparent to-forest/90" />
      </motion.div>

      {/* ── Layer 2: Main Content ── */}
      <motion.div 
        className="relative z-10 flex-grow flex flex-col items-center justify-center w-full mx-auto px-4 pt-20 pb-28 sm:pt-24 sm:pb-32 text-center"
        style={{ y: y1, opacity: opacityFade }}
      >
        

        {/* Massive Architectural Typography */}
        <div className="relative w-full max-w-[1200px] mx-auto mix-blend-plus-lighter">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading font-black leading-[0.8] tracking-tighter uppercase text-cream/90 flex flex-col items-center justify-center drop-shadow-2xl"
          >
            <span className="block text-[7.5vw] sm:text-[11vw] lg:text-[10rem] drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] -ml-0 sm:-ml-12">
              Architectural
            </span>
            <span className="block text-copper italic font-serif normal-case tracking-normal font-light text-[24vw] sm:text-[12vw] lg:text-[11rem] leading-[0.6] z-10 relative ml-8 sm:ml-24 -mt-1 sm:-mt-8 drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
              Amish
            </span>
            <span className="block text-[9vw] sm:text-[11vw] lg:text-[10rem] drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] -ml-4 sm:-ml-6 mt-3 sm:mt-0">
              Strength.
            </span>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.2 }}
          className="mt-8 sm:mt-16 text-[10px] sm:text-base lg:text-lg text-cream/70 font-sans font-medium leading-relaxed max-w-xl mx-auto uppercase tracking-[0.1em] sm:tracking-[0.15em] drop-shadow-md px-2"
        >
          Premium custom garages built by hand. <br className="hidden sm:block"/>
          Designed to last generations.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-8 sm:mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-[280px] sm:max-w-none"
        >
          <a
            href="#visualizer"
            className="group relative flex items-center justify-between gap-6 bg-copper px-6 py-4 sm:px-8 sm:py-5 text-[10px] sm:text-sm font-heading font-black text-cream tracking-[0.2em] sm:tracking-[0.3em] uppercase transition-all duration-500 hover:bg-white hover:text-forest w-full sm:w-auto overflow-hidden shadow-[0_0_40px_rgba(184,115,51,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)]"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            <span className="relative z-10">Start Your Build</span>
            <ChevronRight className="relative z-10 h-4 w-4 transition-transform duration-500 group-hover:translate-x-2" />
          </a>
        </motion.div>
      </motion.div>

      {/* ── Layer 3: Stats Bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-0 left-0 w-full z-30 border-t border-white/5 bg-forest/90 backdrop-blur-xl pb-safe"
      >
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-8 py-4 sm:py-6 items-center">
            
            <div className="space-y-0.5 sm:space-y-1 text-center lg:text-left border-r border-white/5">
              <p className="text-xl sm:text-4xl font-heading font-black text-cream">
                <Counter end={10} suffix="+" duration={1.5} />
              </p>
              <p className="text-[7px] sm:text-[10px] text-copper tracking-[0.1em] sm:tracking-[0.2em] uppercase font-bold">
                Years Warranty
              </p>
            </div>

            <div className="space-y-0.5 sm:space-y-1 text-center lg:text-left border-r border-white/5">
              <p className="text-xl sm:text-4xl font-heading font-black text-cream">
                <Counter end={127} suffix="+" duration={2} />
              </p>
              <p className="text-[7px] sm:text-[10px] text-copper tracking-[0.1em] sm:tracking-[0.2em] uppercase font-bold">
                Garages Built
              </p>
            </div>

            <div className="space-y-0.5 sm:space-y-1 flex flex-col items-center lg:items-start lg:border-r border-white/5">
              <div className="flex items-center gap-1 sm:gap-2">
                <p className="text-xl sm:text-4xl font-heading font-black text-cream">
                  5.0
                </p>
                <div className="hidden sm:flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3.5 h-3.5 text-copper" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-[7px] sm:text-[10px] text-copper tracking-[0.1em] sm:tracking-[0.2em] uppercase font-bold">
                Client Rating
              </p>
            </div>

            <div className="hidden lg:flex justify-end">
              <div className="inline-flex items-center gap-3 px-5 py-3 bg-white/5 rounded-full border border-white/10">
                <MapPin className="h-4 w-4 text-copper animate-bounce" />
                <span className="text-[10px] text-cream/90 font-bold uppercase tracking-widest">
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
