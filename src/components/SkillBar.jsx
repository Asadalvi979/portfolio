"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function SkillBar({ name, level, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-text-dark dark:text-text">{name}</span>
        <motion.span
          className="text-sm font-mono text-accent"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: delay + 0.5 }}
        >
          {level}%
        </motion.span>
      </div>
      <div className="h-2 rounded-full bg-light-200 dark:bg-dark-200 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-accent to-accent-light"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{
            duration: 1.5,
            delay,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        />
      </div>
    </div>
  );
}
