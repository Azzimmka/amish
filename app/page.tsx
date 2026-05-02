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
}
