"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const icons = [
  { name: "HTML", emoji: "🟠", x: 80, y: 20, delay: 0 },
  { name: "CSS", emoji: "🔵", x: 70, y: 60, delay: 0.5 },
  { name: "JavaScript", emoji: "🟡", x: 20, y: 30, delay: 1 },
  { name: "Bootstrap", emoji: "🟣", x: 85, y: 40, delay: 1.5 },
  { name: "Django", emoji: "🟢", x: 15, y: 70, delay: 2 },
  { name: "PHP", emoji: "🔮", x: 30, y: 15, delay: 2.5 },
  { name: "MySQL", emoji: "🔷", x: 10, y: 55, delay: 3 },
  { name: "C++", emoji: "💠", x: 60, y: 10, delay: 3.5 },
];

export default function FloatingIcons() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map((icon, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl md:text-3xl opacity-20"
          style={{
            left: `${icon.x}%`,
            top: `${icon.y}%`,
          }}
          animate={{
            y: [0, -15, 0, 15, 0],
            x: [0, 10, -10, 5, 0],
            rotate: [0, 5, -5, 3, 0],
          }}
          transition={{
            duration: 8 + i * 0.5,
            repeat: Infinity,
            delay: icon.delay,
            ease: "easeInOut",
          }}
        >
          <span title={icon.name}>{icon.emoji}</span>
        </motion.div>
      ))}
    </div>
  );
}
