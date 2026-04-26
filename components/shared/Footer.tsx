import Image from "next/image";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0f1a0f] text-cream/80 relative overflow-hidden" role="contentinfo">
      {/* Decorative noise/texture could go here if needed */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#1a2e1a_0%,_transparent_70%)] opacity-50 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        
        {/* ── Top Section: Call to Action & Brand ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 border-b border-white/10 pb-20">
          
          <div className="space-y-8">
            <h2 className="text-4xl sm:text-5xl font-heading font-black text-white uppercase tracking-tighter leading-[0.9]">
              Crafted for <br />
              <span className="text-copper italic font-serif normal-case tracking-normal font-light">Generations.</span>
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-cream/50 max-w-sm font-medium">
              Premium Amish craftsmanship. Every garage is hand-built with decades of tradition and a commitment to uncompromising quality.
            </p>
            <div className="flex items-center gap-6">
              <a href="#quote" className="inline-flex items-center gap-2 border-b border-copper text-copper font-bold uppercase tracking-widest text-xs pb-1 hover:text-white hover:border-white transition-colors">
                Start Your Build <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a href="#visualizer" className="inline-flex items-center gap-2 border-b border-white/30 text-white/70 font-bold uppercase tracking-widest text-xs pb-1 hover:text-white hover:border-white transition-colors">
                View Configurator <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="flex flex-col lg:items-end justify-between">
            <div className="relative h-24 w-64 lg:h-32 lg:w-80 mix-blend-plus-lighter opacity-90">
              <Image
                src="/logo.svg"
                alt="Amish Built Garages"
                fill
                className="object-contain lg:object-right object-left"
              />
            </div>
          </div>
        </div>

        {/* ── Middle Section: Links & Contact ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 py-16 border-b border-white/10">
          
          <div className="space-y-6">
            <h3 className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Contact Us</h3>
            <div className="space-y-4">
              <a href={`tel:${siteConfig.phone.replace(/[^\d]/g, "")}`} className="group flex items-center gap-4 text-sm text-cream hover:text-copper transition-colors">
                <div className="h-8 w-8 rounded-full border border-white/10 flex items-center justify-center bg-white/5 group-hover:border-copper/30 group-hover:bg-copper/10 transition-colors">
                  <Phone className="h-3.5 w-3.5" />
                </div>
                <span className="font-medium tracking-wide">{siteConfig.phone}</span>
              </a>
              <a href={`mailto:${siteConfig.email}`} className="group flex items-center gap-4 text-sm text-cream hover:text-copper transition-colors">
                <div className="h-8 w-8 rounded-full border border-white/10 flex items-center justify-center bg-white/5 group-hover:border-copper/30 group-hover:bg-copper/10 transition-colors">
                  <Mail className="h-3.5 w-3.5" />
                </div>
                <span className="font-medium tracking-wide">{siteConfig.email}</span>
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Location</h3>
            <div className="flex items-start gap-4 text-sm text-cream">
              <div className="h-8 w-8 shrink-0 rounded-full border border-white/10 flex items-center justify-center bg-white/5">
                <MapPin className="h-3.5 w-3.5 text-copper" />
              </div>
              <p className="font-medium tracking-wide pt-1.5 leading-relaxed">
                {siteConfig.address.city}, {siteConfig.address.state} <br />
                <span className="text-cream/50 text-xs">Serving the {siteConfig.address.region}</span>
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Navigation</h3>
            <nav className="flex flex-col gap-3" aria-label="Footer navigation">
              {[
                { href: "#visualizer", label: "Interactive Configurator" },
                { href: "#process", label: "Our Process" },
                { href: "#gallery", label: "Project Gallery" },
              ].map((link) => (
                <a key={link.href} href={link.href} className="text-sm font-medium text-cream/70 hover:text-copper transition-colors w-fit">
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="space-y-6">
            <h3 className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Legal</h3>
            <nav className="flex flex-col gap-3">
              <a href="#" className="text-sm font-medium text-cream/70 hover:text-white transition-colors w-fit">Privacy Policy</a>
              <a href="#" className="text-sm font-medium text-cream/70 hover:text-white transition-colors w-fit">Terms of Service</a>
              <a href="#" className="text-sm font-medium text-cream/70 hover:text-white transition-colors w-fit">Warranty Info</a>
            </nav>
          </div>

        </div>

        {/* ── Bottom Bar ── */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">
            © {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/30">
            <span>Crafted with</span>
            <span className="text-copper">♥</span>
            <span>by Amish Hands</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
