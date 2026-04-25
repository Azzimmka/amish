"use client";

import { useActionState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, User, Phone, Mail, MapPin } from "lucide-react";
import { submitQuote, type QuoteFormState } from "@/actions/leads";
import { cn } from "@/lib/utils";

const initialState: QuoteFormState = {
  success: false,
  message: "",
};

export default function QuoteFormSection() {
  const [state, formAction, isPending] = useActionState(submitQuote, initialState);

  return (
    <section
      id="quote"
      className="py-20 sm:py-28 bg-forest relative overflow-hidden"
      aria-label="Get a Free Quote"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-copper blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-copper blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ── Left: Copy ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <span className="inline-block text-copper text-sm font-bold tracking-widest uppercase">
              Free Estimate
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-cream tracking-tight leading-tight">
              Ready to Build
              <br />
              <span className="text-copper">Your Dream Garage?</span>
            </h2>
            <p className="text-cream/60 text-lg leading-relaxed max-w-md">
              Fill out the form and we&apos;ll get back to you within 24 hours with a
              free, no-obligation quote. Your selected garage design will be
              included automatically.
            </p>
            <div className="flex flex-col gap-4 pt-4">
              {[
                "Free, no-obligation estimate",
                "Response within 24 hours",
                "Custom design consultation",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-copper shrink-0" />
                  <span className="text-cream/70 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Right: Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {state.success ? (
              /* Success State */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/10 backdrop-blur-sm border border-cream/10 rounded-3xl p-10 text-center"
              >
                <div className="mx-auto h-20 w-20 rounded-full bg-copper/20 flex items-center justify-center mb-6">
                  <CheckCircle2 className="h-10 w-10 text-copper" />
                </div>
                <h3 className="text-2xl font-bold text-cream mb-3">
                  Quote Submitted!
                </h3>
                <p className="text-cream/60 text-base leading-relaxed">
                  {state.message}
                </p>
              </motion.div>
            ) : (
              /* Form */
              <form
                action={formAction}
                className="bg-white/10 backdrop-blur-sm border border-cream/10 rounded-3xl p-8 sm:p-10 space-y-5"
              >
                {state.message && !state.success && (
                  <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-300">
                    {state.message}
                  </div>
                )}

                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-cream/80 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-cream/30" />
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      required
                      placeholder="John Smith"
                      className={cn(
                        "w-full rounded-xl border bg-white/5 pl-11 pr-4 py-3.5 text-cream placeholder:text-cream/30 text-sm",
                        "border-cream/10 focus:border-copper focus:ring-1 focus:ring-copper transition-colors",
                        state.errors?.fullName && "border-red-500/50"
                      )}
                    />
                  </div>
                  {state.errors?.fullName && (
                    <p className="mt-1 text-xs text-red-400">{state.errors.fullName[0]}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-cream/80 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-cream/30" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      placeholder="(312) 555-0147"
                      className={cn(
                        "w-full rounded-xl border bg-white/5 pl-11 pr-4 py-3.5 text-cream placeholder:text-cream/30 text-sm",
                        "border-cream/10 focus:border-copper focus:ring-1 focus:ring-copper transition-colors",
                        state.errors?.phone && "border-red-500/50"
                      )}
                    />
                  </div>
                  {state.errors?.phone && (
                    <p className="mt-1 text-xs text-red-400">{state.errors.phone[0]}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-cream/80 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-cream/30" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="john@example.com"
                      className={cn(
                        "w-full rounded-xl border bg-white/5 pl-11 pr-4 py-3.5 text-cream placeholder:text-cream/30 text-sm",
                        "border-cream/10 focus:border-copper focus:ring-1 focus:ring-copper transition-colors",
                        state.errors?.email && "border-red-500/50"
                      )}
                    />
                  </div>
                  {state.errors?.email && (
                    <p className="mt-1 text-xs text-red-400">{state.errors.email[0]}</p>
                  )}
                </div>

                {/* Location */}
                <div>
                  <label htmlFor="projectLocation" className="block text-sm font-medium text-cream/80 mb-2">
                    Project Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-cream/30" />
                    <input
                      type="text"
                      id="projectLocation"
                      name="projectLocation"
                      required
                      placeholder="Chicago, IL 60601"
                      className={cn(
                        "w-full rounded-xl border bg-white/5 pl-11 pr-4 py-3.5 text-cream placeholder:text-cream/30 text-sm",
                        "border-cream/10 focus:border-copper focus:ring-1 focus:ring-copper transition-colors",
                        state.errors?.projectLocation && "border-red-500/50"
                      )}
                    />
                  </div>
                  {state.errors?.projectLocation && (
                    <p className="mt-1 text-xs text-red-400">{state.errors.projectLocation[0]}</p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isPending}
                  className={cn(
                    "w-full flex items-center justify-center gap-3 rounded-xl bg-copper px-8 py-4 text-base font-bold text-cream tracking-wide",
                    "shadow-lg shadow-copper/20 transition-all duration-300",
                    "hover:bg-copper-light hover:shadow-xl hover:shadow-copper/30",
                    "active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                  )}
                >
                  {isPending ? (
                    <>
                      <div className="h-5 w-5 border-2 border-cream/30 border-t-cream rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Get My Free Quote
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-cream/30">
                  No spam. No obligation. Just a straightforward quote.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
