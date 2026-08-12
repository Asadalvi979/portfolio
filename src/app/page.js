"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import Lenis from "@studio-freight/lenis";
import HeroSection from "@/components/HeroSection";

const TechStackSection = dynamic(() => import("@/components/TechStackSection"), {
  loading: () => (
    <div className="section-padding">
      <div className="h-72 rounded-3xl bg-light-100 dark:bg-dark-100 animate-pulse" />
    </div>
  ),
});

const AboutPreview = dynamic(() => import("@/components/AboutPreview"), {
  loading: () => (
    <div className="section-padding">
      <div className="h-72 rounded-3xl bg-light-100 dark:bg-dark-100 animate-pulse" />
    </div>
  ),
});

const FeaturedProjects = dynamic(() => import("@/components/FeaturedProjects"), {
  loading: () => (
    <div className="section-padding">
      <div className="h-72 rounded-3xl bg-light-100 dark:bg-dark-100 animate-pulse" />
    </div>
  ),
});

const ServicesSection = dynamic(() => import("@/components/ServicesSection"), {
  loading: () => (
    <div className="section-padding">
      <div className="h-72 rounded-3xl bg-light-100 dark:bg-dark-100 animate-pulse" />
    </div>
  ),
});

export default function Home() {
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
      <HeroSection />
      <TechStackSection />
      <AboutPreview />
      <FeaturedProjects />
      <ServicesSection />
    </>
  );
}
