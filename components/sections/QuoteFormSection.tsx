"use client";

import { useActionState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Send, CheckCircle2, ArrowRight } from "lucide-react";
import { submitQuote, type QuoteFormState } from "@/actions/leads";
import { cn } from "@/lib/utils";

const initialState: QuoteFormState = {
  success: false,
  message: "",
};

export default function QuoteFormSection() {
  const [state, formAction, isPending] = useActionState(submitQuote, initialState);

  return (
    <section id="quote" className="flex flex-col lg:flex-row min-h-[100svh] w-full bg-cream" aria-label="Get a Free Quote">
      
      {/* ── Left: Architectural Imagery & Copy ── */}
      <div className="relative w-full lg:w-1/2 min-h-[50svh] lg:min-h-full flex flex-col justify-between p-8 sm:p-16 lg:p-24 bg-forest text-cream overflow-hidden">
        
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/garage_2.jpg"
            alt="Amish Built Garage"
            fill
            className="object-cover opacity-20 grayscale mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-forest/50 to-forest" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <div className="inline-flex items-center gap-2 mb-8">
            <div className="h-1 w-8 bg-copper" />
            <span className="text-[10px] font-bold text-copper tracking-[0.3em] uppercase">Project Initiation</span>
          </div>

          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-black tracking-tighter uppercase leading-[0.9] mb-8">
            Start Your <br/>
            <span className="text-copper italic font-serif normal-case font-light">Legacy.</span>
          </h2>
          
          <p className="text-cream/60 text-lg leading-relaxed max-w-md font-medium">
            Engage with our master craftsmen. Submit your details, and we will contact you within 24 hours to discuss the architecture of your new garage.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative z-10 mt-16 lg:mt-0 flex flex-col gap-6"
        >
          <div className="flex items-center gap-4 border-l border-white/10 pl-6">
            <span className="text-2xl font-heading font-black text-white">01</span>
            <p className="text-sm text-cream/50 uppercase tracking-widest font-bold">Request Quote</p>
          </div>
          <div className="flex items-center gap-4 border-l border-copper pl-6">
            <span className="text-2xl font-heading font-black text-copper">02</span>
            <p className="text-sm text-copper uppercase tracking-widest font-bold">Design Consultation</p>
          </div>
          <div className="flex items-center gap-4 border-l border-white/10 pl-6">
            <span className="text-2xl font-heading font-black text-white">03</span>
            <p className="text-sm text-cream/50 uppercase tracking-widest font-bold">Construction</p>
          </div>
        </motion.div>
      </div>

      {/* ── Right: Minimalist Form ── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-16 lg:p-24 bg-cream">
        
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {state.success ? (
              <div className="text-center space-y-6">
                <div className="mx-auto h-24 w-24 rounded-full border border-copper/30 flex items-center justify-center bg-copper/5">
                  <CheckCircle2 className="h-10 w-10 text-copper" strokeWidth={1.5} />
                </div>
                <h3 className="text-3xl font-heading font-black text-forest uppercase tracking-tight">
                  Request Received
                </h3>
                <p className="text-charcoal/60 leading-relaxed font-medium">
                  {state.message}
                </p>
              </div>
            ) : (
              <form action={formAction} className="space-y-0">
                
                <div className="mb-16">
                  <h3 className="text-4xl sm:text-5xl font-heading font-black text-forest uppercase tracking-tighter leading-none mb-4">
                    Get <br/> Quote.
                  </h3>
                  <div className="h-1 w-12 bg-copper" />
                </div>

                {state.message && !state.success && (
                  <div className="mb-10 border-l-4 border-red-500 pl-4 py-2 bg-red-50">
                    <p className="text-sm text-red-600 font-bold uppercase tracking-wider">{state.message}</p>
                  </div>
                )}

                {/* Full Name */}
                <div className="flex items-start gap-6 py-8 border-b border-charcoal/10 group focus-within:border-copper transition-colors">
                  <span className="text-xs font-black text-charcoal/20 pt-2 tracking-tighter">01.</span>
                  <div className="flex-1 space-y-2">
                    <label htmlFor="fullName" className="block text-[10px] font-black text-copper uppercase tracking-[0.2em]">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      required
                      placeholder="Enter your name"
                      className={cn(
                        "w-full bg-transparent p-0 text-2xl sm:text-3xl font-heading font-bold text-forest placeholder:text-charcoal/30 focus:ring-0 outline-none",
                        state.errors?.fullName && "text-red-500"
                      )}
                    />
                    {state.errors?.fullName && (
                      <p className="text-[10px] font-bold uppercase tracking-wider text-red-500">{state.errors.fullName[0]}</p>
                    )}
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-6 py-8 border-b border-charcoal/10 group focus-within:border-copper transition-colors">
                  <span className="text-xs font-black text-charcoal/20 pt-2 tracking-tighter">02.</span>
                  <div className="flex-1 space-y-2">
                    <label htmlFor="phone" className="block text-[10px] font-black text-copper uppercase tracking-[0.2em]">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      placeholder="+1 (000) 000-0000"
                      className={cn(
                        "w-full bg-transparent border-none p-0 text-2xl sm:text-3xl font-heading font-bold text-forest placeholder:text-charcoal/30 focus:ring-0 outline-none",
                        state.errors?.phone && "text-red-500"
                      )}
                    />
                    {state.errors?.phone && (
                      <p className="text-[10px] font-bold uppercase tracking-wider text-red-500">{state.errors.phone[0]}</p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-6 py-8 border-b border-charcoal/10 group focus-within:border-copper transition-colors">
                  <span className="text-xs font-black text-charcoal/20 pt-2 tracking-tighter">03.</span>
                  <div className="flex-1 space-y-2">
                    <label htmlFor="email" className="block text-[10px] font-black text-copper uppercase tracking-[0.2em]">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="example@mail.com"
                      className={cn(
                        "w-full bg-transparent border-none p-0 text-2xl sm:text-3xl font-heading font-bold text-forest placeholder:text-charcoal/30 focus:ring-0 outline-none",
                        state.errors?.email && "text-red-500"
                      )}
                    />
                    {state.errors?.email && (
                      <p className="text-[10px] font-bold uppercase tracking-wider text-red-500">{state.errors.email[0]}</p>
                    )}
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-6 py-8 border-b border-charcoal/10 group focus-within:border-copper transition-colors">
                  <span className="text-xs font-black text-charcoal/20 pt-2 tracking-tighter">04.</span>
                  <div className="flex-1 space-y-2">
                    <label htmlFor="projectLocation" className="block text-[10px] font-black text-copper uppercase tracking-[0.2em]">
                      Project Location
                    </label>
                    <input
                      type="text"
                      id="projectLocation"
                      name="projectLocation"
                      required
                      placeholder="City, State"
                      className={cn(
                        "w-full bg-transparent border-none p-0 text-2xl sm:text-3xl font-heading font-bold text-forest placeholder:text-charcoal/30 focus:ring-0 outline-none",
                        state.errors?.projectLocation && "text-red-500"
                      )}
                    />
                    {state.errors?.projectLocation && (
                      <p className="text-[10px] font-bold uppercase tracking-wider text-red-500">{state.errors.projectLocation[0]}</p>
                    )}
                  </div>
                </div>

                {/* Submit */}
                <div className="pt-12">
                  <button
                    type="submit"
                    disabled={isPending}
                    className={cn(
                      "group flex items-center justify-between w-full bg-forest text-cream px-10 py-6 text-xs font-heading font-black tracking-[0.4em] uppercase transition-all duration-500 hover:bg-copper",
                      "disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden relative shadow-[0_20px_40px_rgba(26,46,26,0.2)]"
                    )}
                  >
                    <span className="relative z-10">
                      {isPending ? "Sending Brief..." : "Get A Free Quote"}
                    </span>
                    {isPending ? (
                      <div className="relative z-10 h-5 w-5 border-2 border-cream/30 border-t-cream rounded-full animate-spin" />
                    ) : (
                      <div className="relative z-10 flex items-center gap-2">
                        <span className="text-[10px] opacity-50 font-sans tracking-normal lowercase italic group-hover:opacity-100 transition-opacity">secure transmission</span>
                        <ArrowRight className="h-5 w-5 transition-transform duration-500 group-hover:translate-x-2" />
                      </div>
                    )}
                  </button>
                </div>

              </form>
            )}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
