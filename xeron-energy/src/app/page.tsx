import Hero from "@/components/sections/Hero";
import ServicesSection from "@/components/sections/ServicesSection";
import Benefits from "@/components/sections/Benefits";
import ProjectShowcase from "@/components/sections/ProjectShowcase";
import RoiCalculator from "@/components/sections/RoiCalculator";
import Subsidy from "@/components/sections/Subsidy";
import ProcessSection from "@/components/sections/ProcessSection";
import Partners from "@/components/sections/Partners";
import Cta from "@/components/sections/Cta";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <Benefits />
      <ProjectShowcase />
      <RoiCalculator />
      <Subsidy />
      <ProcessSection />
      <Partners />
      <Cta />
    </>
  );
}
