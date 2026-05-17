import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import HeroSection from "@/components/sections/HeroSection";
import VisualizerSection from "@/components/sections/VisualizerSection";
import ProcessSection from "@/components/sections/ProcessSection";
import QualitySection from "@/components/sections/QualitySection";
import TransformationSection from "@/components/sections/TransformationSection";
import QuoteFormSection from "@/components/sections/QuoteFormSection";

export default function Home() {
    return (
    <div className="h-screen w-full bg-forest flex flex-col items-center justify-center p-6 border-b-8 border-copper">
      <div className="animate-bounce mb-8 text-copper">
        {/* Coin / Dollar Icon */}
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h1 className="text-3xl md:text-5xl font-heading font-black text-cream uppercase tracking-widest text-center mb-4">
        Insert Coin To Continue :)
      </h1>
      <p className="text-copper/80 text-sm md:text-base text-center max-w-md uppercase tracking-widest leading-relaxed">
        Development is paused. Awaiting advance payment to resume construction of your premium website. 
      </p>
    </div>
  );

  /* 
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <VisualizerSection />
        <ProcessSection />
        <QualitySection />
        <TransformationSection />
        <QuoteFormSection />
      </main>
      <Footer />
    </>
  );
  */
}
