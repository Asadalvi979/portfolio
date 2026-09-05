"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import gsap from "gsap";
import { FiArrowRight, FiDownload, FiMail } from "react-icons/fi";
import FloatingIcons from "./FloatingIcons";

export default function HeroSection({ projectCount: initialCount = 0, profile: initialProfile }) {
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const ctaRef = useRef(null);
  const [projectCount, setProjectCount] = useState(initialCount);
  const [profile, setProfile] = useState(initialProfile || { profileImage: "", cv: "", name: "Asadullah Sadiq" });

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current?.children || [],
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power4.out",
        }
      );
      gsap.fromTo(
        subheadingRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.8, ease: "power4.out" }
      );
      gsap.fromTo(
        ctaRef.current?.children || [],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          delay: 1.2,
          ease: "power4.out",
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-light-50 dark:bg-dark">
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute inset-0 bg-glow" />
      <FloatingIcons />

      <div className="relative z-10 max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center pt-20">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Available for opportunities
            </motion.div>

            <div ref={headingRef}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-heading leading-tight">
                <span className="text-text-dark dark:text-text">Hi, I&apos;m </span>
                <span className="text-gradient">Asadullah Sadiq</span>
              </h1>
              <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-heading mt-2">
                <span className="text-text-dark dark:text-text">Software Engineer &</span>
                <br />
                <span className="text-gradient">Full Stack Developer</span>
              </p>
              <p className="text-lg md:text-xl font-medium text-light-400 dark:text-muted mt-4">
                📍 Based in <span className="text-text-dark dark:text-text font-semibold">Sahiwal, Pakistan</span> — building for clients everywhere
              </p>
            </div>

            <p
              ref={subheadingRef}
              className="mt-6 text-lg md:text-xl text-light-400 dark:text-muted max-w-xl leading-relaxed"
            >
              Passionate about building scalable web applications, solving real-world
              problems, and creating impactful digital experiences through modern
              technologies.
            </p>

            <div
              ref={ctaRef}
              className="mt-10 flex flex-wrap gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/projects"
                  className="group inline-flex items-center gap-2 px-6 py-3.5 bg-accent text-white rounded-xl font-semibold text-sm hover:bg-accent-dark transition-all duration-300 shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 hover:-translate-y-0.5"
                >
                  View Projects
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {profile.cv ? (
                  <a
                    href={profile.cv}
                    download={profile.cv.startsWith("http") ? undefined : "Asadullah-CV.pdf"}
                    target={profile.cv.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 px-6 py-3.5 border border-light-300 dark:border-dark-300/50 text-text-dark dark:text-text rounded-xl font-semibold text-sm hover:bg-light-200 dark:hover:bg-dark-200 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <FiDownload className="w-4 h-4" />
                    Download Resume
                  </a>
                ) : (
                  <Link
                    href="/resume"
                    className="group inline-flex items-center gap-2 px-6 py-3.5 border border-light-300 dark:border-dark-300/50 text-text-dark dark:text-text rounded-xl font-semibold text-sm hover:bg-light-200 dark:hover:bg-dark-200 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <FiDownload className="w-4 h-4" />
                    Download Resume
                  </Link>
                )}
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 px-6 py-3.5 border border-light-300 dark:border-dark-300/50 text-text-dark dark:text-text rounded-xl font-semibold text-sm hover:bg-light-200 dark:hover:bg-dark-200 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <FiMail className="w-4 h-4" />
                  Contact Me
                </Link>
              </motion.div>
            </div>

            <div className="mt-12 flex items-center gap-6 text-light-400 dark:text-muted">
              <div className="flex -space-x-3">
                {["🟠", "🔵", "🟡", "🟣"].map((emoji, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.5 + i * 0.1 }}
                    className="w-10 h-10 rounded-full bg-light-200 dark:bg-dark-200 border-2 border-white dark:border-dark flex items-center justify-center text-lg"
                  >
                    {emoji}
                  </motion.div>
                ))}
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="text-sm text-light-400 dark:text-muted"
              >
                {projectCount > 0 ? `${projectCount}+ Projects Completed` : "Projects Completed"}
              </motion.p>
            </div>
          </div>

          <div className="hidden lg:flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              className="relative"
            >
              {/* soft animated glow */}
              <motion.div
                className="absolute -inset-8 rounded-[3rem] bg-gradient-to-tr from-accent via-accent-light to-purple-500 opacity-30 blur-3xl"
                animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.45, 0.25] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* floating main card */}
              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-96 h-96 xl:w-[26rem] xl:h-[26rem] rounded-[2.5rem] p-1.5 bg-gradient-to-br from-accent via-accent-light to-purple-500 shadow-2xl shadow-accent/30"
              >
                <motion.div
                  className="w-full h-full rounded-[calc(2.5rem-6px)] bg-white dark:bg-dark-100 relative overflow-hidden"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                      {profile.profileImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                      src={profile.profileImage}
                      alt={profile.name}
                      width={416}
                      height={416}
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-br from-accent to-accent-dark" />
                      <div className="absolute inset-0 bg-grid opacity-20" />
                      <span className="relative flex items-center justify-center h-full text-7xl font-bold font-heading text-white drop-shadow-lg">
                        AS
                      </span>
                    </>
                  )}
                </motion.div>
              </motion.div>

              {/* floating badges */}
              <motion.div
                className="absolute -top-5 -right-5 w-24 h-24 rounded-3xl bg-accent/10 border border-accent/20 backdrop-blur flex items-center justify-center text-3xl shadow-lg shadow-accent/10"
                animate={{ rotate: [0, 10, -10, 0], y: [0, -10, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                ⚡
              </motion.div>
              <motion.div
                className="absolute -bottom-6 -left-6 w-20 h-20 rounded-3xl bg-accent/10 border border-accent/20 backdrop-blur flex items-center justify-center text-2xl shadow-lg shadow-accent/10"
                animate={{ rotate: [0, -10, 10, 0], y: [0, 10, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                💻
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-light-300 dark:border-dark-300/50 flex items-start justify-center p-1.5">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-accent"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
