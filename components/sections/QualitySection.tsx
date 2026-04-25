"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Shield, Award, BadgeCheck } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

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

const projectPhotos = [
  { src: "/garage_1.jpg", alt: "Tan standard garage with open bay" },
  { src: "/garage_2.jpg", alt: "Cream garage with side entry door" },
  { src: "/garage_3.jpg", alt: "Sage green garage with white panel door" },
  { src: "/garage_4.jpg", alt: "Dark gray garage in winter setting" },
  { src: "/garage_5.jpg", alt: "Navy blue garage with brown panel door" },
  { src: "/garage_6.jpg", alt: "White cape cod style garage" },
  { src: "/garage_7.jpg", alt: "Beige two-car garage with double doors" },
];

export default function QualitySection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  // Auto-play
  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => emblaApi.scrollNext(), 4000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <section
      id="gallery"
      className="py-20 sm:py-28 bg-cream"
      aria-label="Quality and Gallery"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Trust Badges ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-copper text-sm font-bold tracking-widest uppercase mb-3">
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-forest tracking-tight">
            Quality You Can Trust
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-20">
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
                <p className="text-sm text-charcoal/60 leading-relaxed">
                  {badge.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* ── Project Gallery Carousel ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-forest text-center mb-8">
            Completed Projects
          </h3>

          <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
            <div className="flex gap-4">
              {projectPhotos.map((photo) => (
                <div
                  key={photo.src}
                  className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {projectPhotos.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  selectedIndex === i
                    ? "w-8 bg-copper"
                    : "w-2 bg-charcoal/20 hover:bg-charcoal/40"
                )}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
