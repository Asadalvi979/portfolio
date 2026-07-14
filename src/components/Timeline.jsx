"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

function TimelineItem({ year, title, institution, description, index, totalItems }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="relative pl-8 pb-12 last:pb-0">
      {index < totalItems - 1 && (
        <div className="absolute left-[7px] top-3 bottom-0 w-[2px] bg-light-200 dark:bg-dark-200" />
      )}
      <motion.div
        className="absolute left-0 top-2 w-4 h-4 rounded-full border-2 border-accent bg-white dark:bg-dark"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="w-2 h-2 rounded-full bg-accent absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <span className="text-sm font-mono text-accent">{year}</span>
        <h3 className="text-lg font-semibold font-heading text-text-dark dark:text-text mt-1">
          {title}
        </h3>
        <p className="text-sm text-light-400 dark:text-muted mt-1">{institution}</p>
        {description && (
          <p className="text-sm text-light-400/70 dark:text-muted/70 mt-2 leading-relaxed">
            {description}
          </p>
        )}
      </motion.div>
    </div>
  );
}

export default function Timeline({ items }) {
  return (
    <div>
      {items.map((item, i) => (
        <TimelineItem key={i} {...item} index={i} totalItems={items.length} />
      ))}
    </div>
  );
}
