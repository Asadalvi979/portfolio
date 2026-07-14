"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import AnimatedSection from "./AnimatedSection";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiBootstrap,
  SiDjango,
  SiPhp,
  SiMysql,
  SiCplusplus,
  SiGithub,
  SiPython,
} from "react-icons/si";

const iconMap = {
  html: SiHtml5,
  css: SiCss3,
  javascript: SiJavascript,
  bootstrap: SiBootstrap,
  django: SiDjango,
  php: SiPhp,
  mysql: SiMysql,
  cpp: SiCplusplus,
  github: SiGithub,
  python: SiPython,
  claude: ({ className }) => (
    <span className={className}>🤖</span>
  ),
  coal: ({ className }) => (
    <span className={className}>⚙️</span>
  ),
};

const categoryLabels = {
  frontend: "Frontend",
  backend: "Backend",
  database: "Database",
  programming: "Programming",
  tools: "Tools",
};

const categoryColors = {
  frontend: "from-blue-500/20 to-cyan-500/20 border-blue-500/30",
  backend: "from-green-500/20 to-emerald-500/20 border-green-500/30",
  database: "from-orange-500/20 to-yellow-500/20 border-orange-500/30",
  programming: "from-purple-500/20 to-pink-500/20 border-purple-500/30",
  tools: "from-gray-500/20 to-slate-500/20 border-gray-500/30",
};

export default function TechStackSection() {
  const [techStackData, setTechStackData] = useState({});

  useEffect(() => {
    fetch("/api/techstack").then((r) => r.json()).then(setTechStackData);
  }, []);

  if (Object.keys(techStackData).length === 0) return null;

  return (
    <section className="section-padding bg-light-100/50 dark:bg-dark-50/50">
      <div className="section-container">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading">
              Tech <span className="text-gradient">Stack</span>
            </h2>
            <p className="mt-4 text-light-400 dark:text-muted text-lg max-w-2xl mx-auto">
              Technologies I work with to build modern web applications
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(techStackData).map(([category, items], catIndex) => (
            <AnimatedSection key={category} delay={catIndex * 0.1}>
              <motion.div
                className={`p-6 rounded-2xl bg-gradient-to-br ${categoryColors[category]} border`}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
              >
                <h3 className="text-lg font-semibold font-heading text-text-dark dark:text-text mb-4">
                  {categoryLabels[category]}
                </h3>
                <div className="space-y-3">
                  {items.map((tech, i) => {
                    const Icon = iconMap[tech.icon];
                    return (
                      <motion.div
                        key={tech.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-light-100/80 dark:bg-dark/40 backdrop-blur-sm"
                      >
                        <Icon className="w-5 h-5 text-accent" />
                        <span className="text-sm font-medium text-text-dark dark:text-text">
                          {tech.name}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
