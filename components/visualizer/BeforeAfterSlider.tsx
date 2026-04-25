"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface BeforeAfterSliderProps {
  beforeSrc: string;
  beforeAlt: string;
  afterSrc: string;
  afterAlt: string;
  className?: string;
}

export default function BeforeAfterSlider({
  beforeSrc,
  beforeAlt,
  afterSrc,
  afterAlt,
  className,
}: BeforeAfterSliderProps) {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intro animation: sweep from 100 → 50 on mount
  useEffect(() => {
    let start: number | null = null;
    const from = 100;
    const to = 50;
    const duration = 1200;

    const step = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setSliderPos(from + (to - from) * eased);
      if (progress < 1) requestAnimationFrame(step);
    };

    const timer = setTimeout(() => requestAnimationFrame(step), 400);
    return () => clearTimeout(timer);
  }, [beforeSrc]); // re-run when project changes

  const calcPos = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.min(100, Math.max(0, (x / rect.width) * 100));
    setSliderPos(pct);
    if (!hasInteracted) setHasInteracted(true);
  }, [hasInteracted]);

  const startDrag = useCallback((clientX: number) => {
    setIsDragging(true);
    calcPos(clientX);
  }, [calcPos]);

  useEffect(() => {
    if (!isDragging) return;

    const onMove = (e: MouseEvent) => calcPos(e.clientX);
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      calcPos(e.touches[0].clientX);
    };
    const onEnd = () => setIsDragging(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onEnd);
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onEnd);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onEnd);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onEnd);
    };
  }, [isDragging, calcPos]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full aspect-[16/9] overflow-hidden rounded-2xl select-none shadow-2xl",
        isDragging ? "cursor-ew-resize" : "cursor-ew-resize",
        className
      )}
      onMouseDown={(e) => { e.preventDefault(); startDrag(e.clientX); }}
      onTouchStart={(e) => startDrag(e.touches[0].clientX)}
      aria-label="Before and after comparison. Drag to compare."
      role="img"
    >
      {/* ── AFTER image (base layer) ── */}
      <Image
        src={afterSrc}
        alt={afterAlt}
        fill
        className="object-cover pointer-events-none"
        draggable={false}
        sizes="(max-width: 768px) 100vw, 80vw"
        priority
      />

      {/* ── BEFORE image (clipped overlay) ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <Image
          src={beforeSrc}
          alt={beforeAlt}
          fill
          className="object-cover"
          draggable={false}
          sizes="(max-width: 768px) 100vw, 80vw"
          priority
        />
      </div>

      {/* ── BEFORE label ── */}
      <div
        className="absolute top-4 left-4 z-20 pointer-events-none transition-opacity duration-300"
        style={{ opacity: sliderPos > 8 ? 1 : 0 }}
      >
        <span className="bg-charcoal/75 backdrop-blur-sm text-cream text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full shadow-lg">
          Before
        </span>
      </div>

      {/* ── AFTER label ── */}
      <div
        className="absolute top-4 right-4 z-20 pointer-events-none transition-opacity duration-300"
        style={{ opacity: sliderPos < 92 ? 1 : 0 }}
      >
        <span className="bg-copper/90 backdrop-blur-sm text-cream text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full shadow-lg">
          After
        </span>
      </div>

      {/* ── Divider line + Handle ── */}
      <div
        className="absolute inset-y-0 z-30 pointer-events-none"
        style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}
      >
        {/* Glow line */}
        <div className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 bg-white shadow-[0_0_12px_4px_rgba(255,255,255,0.4)]" />

        {/* Handle circle */}
        <div
          className={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
            "h-14 w-14 rounded-full bg-white shadow-[0_4px_24px_rgba(0,0,0,0.35)]",
            "flex items-center justify-center pointer-events-auto cursor-ew-resize",
            "transition-transform duration-150",
            isDragging && "scale-110"
          )}
        >
          {/* Double chevron arrows */}
          <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 1L1 8L7 15" stroke="#1a2e1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M15 1L21 8L15 15" stroke="#1a2e1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* ── Drag hint (shown until first interaction) ── */}
      <AnimatePresence>
        {!hasInteracted && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ delay: 1.5, duration: 0.4 }}
            className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
          >
            <span className="inline-flex items-center gap-2 bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-4 py-2 rounded-full">
              <span>←</span>
              <span>Drag to Compare</span>
              <span>→</span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
