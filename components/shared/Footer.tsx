import { Phone, Mail, MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-forest text-cream/80" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Main Footer ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 py-16">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex flex-col leading-none">
              <span className="text-2xl font-extrabold tracking-wider text-cream">
                AMISH BUILT
              </span>
              <span className="text-xs font-semibold tracking-[0.35em] text-copper uppercase">
                ★ G A R A G E S ★
              </span>
            </div>
            <p className="text-sm leading-relaxed text-cream/60 max-w-xs">
              Premium Amish craftsmanship. Every garage is hand-built with
              decades of tradition and a commitment to lasting quality.
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-cream tracking-wide">
              Contact Us
            </h3>
            <div className="space-y-3">
              <a
                href={`tel:${siteConfig.phone.replace(/[^\d]/g, "")}`}
                className="flex items-center gap-3 text-sm transition-colors hover:text-copper"
              >
                <Phone className="h-4 w-4 text-copper shrink-0" />
                {siteConfig.phone}
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-3 text-sm transition-colors hover:text-copper"
              >
                <Mail className="h-4 w-4 text-copper shrink-0" />
                {siteConfig.email}
              </a>
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="h-4 w-4 text-copper shrink-0 mt-0.5" />
                <span>
                  {siteConfig.address.city}, {siteConfig.address.state}
                  <br />
                  Serving the {siteConfig.address.region}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-cream tracking-wide">
              Quick Links
            </h3>
            <nav className="flex flex-col gap-2" aria-label="Footer navigation">
              {[
                { href: "#visualizer", label: "Build Your Garage" },
                { href: "#process", label: "Our Process" },
                { href: "#gallery", label: "Project Gallery" },
                { href: "#quote", label: "Get a Free Quote" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm transition-colors hover:text-copper"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="border-t border-cream/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-cream/40">
            © {currentYear} {siteConfig.name}. {siteConfig.address.city},{" "}
            {siteConfig.address.state}. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-xs text-cream/40">
            <span>Crafted with</span>
            <span className="text-copper">♥</span>
            <span>by Amish hands</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
