"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const isDark = stored === "dark" || (!stored && true);
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggle = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <button
      onClick={toggle}
      className="relative w-14 h-7 rounded-full bg-light-200 dark:bg-dark-200 border border-light-300 dark:border-dark-300/50 transition-colors"
      aria-label="Toggle theme"
    >
      <motion.div
        className="absolute top-0.5 w-6 h-6 rounded-full bg-accent flex items-center justify-center"
        animate={{ x: darkMode ? 0 : 28 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        <AnimatePresence mode="wait">
          {darkMode ? (
            <motion.span
              key="moon"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              className="text-xs"
            >
              🌙
            </motion.span>
          ) : (
            <motion.span
              key="sun"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              className="text-xs"
            >
              ☀️
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </button>
  );
}
