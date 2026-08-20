import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import ProjectsGrid from "@/components/sections/ProjectsGrid";
import Cta from "@/components/sections/Cta";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Xeron Energy's portfolio of residential, commercial and industrial solar installations across Gujarat. Every project listed shows its actual commissioned capacity and verified annual savings.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        crumb="Projects"
        eyebrow="Portfolio"
        title={<>Installations that <span className="text-aurora">speak for themselves.</span></>}
        description="We publish a project here only after it is commissioned, and we quote only the savings the client's own electricity bills show. No stock photos, no borrowed portfolios."
      >
        <Button href="/contact">Start Your Project</Button>
      </PageHero>

      <section className="relative py-12 md:py-20">
        <div className="container-x">
          <ProjectsGrid />
        </div>
      </section>

      <Cta />
    </>
  );
}
