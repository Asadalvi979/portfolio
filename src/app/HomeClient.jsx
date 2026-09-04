"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import HeroSection from "@/components/HeroSection";
import TechStackSection from "@/components/TechStackSection";
import AboutPreview from "@/components/AboutPreview";
import FeaturedProjects from "@/components/FeaturedProjects";
import ServicesSection from "@/components/ServicesSection";

export default function HomeClient({ techStackData, services, projectsData, counts, profile }) {
  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

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
      <HeroSection projectCount={counts.projects} profile={profile} />
      <TechStackSection data={techStackData} />
      <AboutPreview counts={counts} />
      <FeaturedProjects data={projectsData} />
      <ServicesSection data={services} />
    </>
  );
}
