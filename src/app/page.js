"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import HeroSection from "@/components/HeroSection";
import TechStackSection from "@/components/TechStackSection";
import AboutPreview from "@/components/AboutPreview";
import FeaturedProjects from "@/components/FeaturedProjects";
import ServicesSection from "@/components/ServicesSection";

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <>
      <HeroSection />
      <TechStackSection />
      <AboutPreview />
      <FeaturedProjects />
      <ServicesSection />
    </>
  );
}
