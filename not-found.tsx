import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import AuroraBackground from "@/components/ui/AuroraBackground";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center justify-center overflow-hidden">
      <AuroraBackground />
      <div className="container-x relative z-10 text-center">
        <p className="font-display text-[9rem] font-bold leading-none text-aurora sm:text-[12rem]">
          404
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-frost md:text-4xl">
          This page went off-grid.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-mist">
          The page you&apos;re looking for doesn&apos;t exist — but your solar savings still do.
          Let&apos;s get you back on track.
        </p>
        <div className="mt-8 flex justify-center">
          <Button href="/">
            <FiArrowLeft className="h-4 w-4" /> Back to Home
          </Button>
        </div>
      </div>
    </section>
  );
}
