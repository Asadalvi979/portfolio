"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    let rafId;
    let lastX = 0;
    let lastY = 0;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (Math.abs(mouseX - lastX) > 1 || Math.abs(mouseY - lastY) > 1) {
        lastX = mouseX;
        lastY = mouseY;
        cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      }
    };

    const animate = () => {
      followerX += (mouseX - followerX) * 0.1;
      followerY += (mouseY - followerY) * 0.1;
      follower.style.transform = `translate(${followerX}px, ${followerY}px)`;
      rafId = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMouseMove);
    rafId = requestAnimationFrame(animate);

    const handleMouseEnter = () => {
      cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) scale(1.5)`;
      cursor.style.borderColor = "#3B82F6";
      cursor.style.backgroundColor = "rgba(59, 130, 246, 0.1)";
    };

    const handleMouseLeave = () => {
      cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) scale(1)`;
      cursor.style.borderColor = "#3B82F6";
      cursor.style.backgroundColor = "transparent";
    };

    const interactiveElements = document.querySelectorAll(
      'a, button, input, textarea, [data-cursor="pointer"]'
    );

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-4 h-4 bg-accent rounded-full pointer-events-none z-[9999] mix-blend-difference hidden lg:block"
        style={{
          transform: "translate(-50%, -50%)",
          willChange: "transform",
          transition: "transform 0.1s ease, border-color 0.3s ease, background-color 0.3s ease",
          border: "2px solid #3B82F6",
        }}
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9998] border border-accent/30 hidden lg:block"
        style={{
          transform: "translate(-50%, -50%)",
          willChange: "transform",
          transition: "border-color 0.3s ease",
        }}
      />
    </>
  );
}
