import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import FaqAccordion from "@/components/sections/FaqAccordion";
import Cta from "@/components/sections/Cta";
import Button from "@/components/ui/Button";
import { faqs } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about solar savings, the PM Surya Ghar subsidy, installation timelines, warranties, net-metering and roof suitability from Xeron Energy.",
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        crumb="FAQ"
        eyebrow="Questions, answered"
        title={<>Everything you need to <span className="text-aurora">know about solar.</span></>}
        description="Still curious after reading? Our engineers love a good question — reach out any time."
      >
        <Button href="/contact">Ask Us Directly</Button>
      </PageHero>

      <section className="relative py-12 md:py-20">
        <div className="container-x">
          <FaqAccordion items={faqs} />
        </div>
      </section>

      <Cta />
    </>
  );
}
