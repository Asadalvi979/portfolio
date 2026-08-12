"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function AnimatedSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  const directionVariants = {
    up: { y: 60 },
    down: { y: -60 },
    left: { x: 60 },
    right: { x: -60 },
  };

  const initial = {
    opacity: prefersReducedMotion ? 1 : 0,
    ...(prefersReducedMotion ? {} : directionVariants[direction]),
  };

  const animate = {
    opacity: prefersReducedMotion ? 1 : isInView ? 1 : 0,
    x: prefersReducedMotion ? 0 : isInView ? 0 : directionVariants[direction].x || 0,
    y: prefersReducedMotion ? 0 : isInView ? 0 : directionVariants[direction].y || 0,
  };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
