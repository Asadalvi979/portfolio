"use client";

import { motion } from "framer-motion";
import { FiGithub, FiExternalLink, FiArrowRight } from "react-icons/fi";
import AnimatedSection from "./AnimatedSection";
import Link from "next/link";

const projectColors = [
  "from-blue-500/20 to-cyan-500/20 border-blue-500/30",
  "from-green-500/20 to-emerald-500/20 border-green-500/30",
  "from-purple-500/20 to-pink-500/20 border-purple-500/30",
];

const categoryEmojis = {
  fullstack: "🏗️",
  "mini-projects": "🧩",
  backend: "⚙️",
  mobile: "📱",
  default: "📦",
};

export default function FeaturedProjects({ data }) {
  const projectsData = data;
  if (!projectsData || projectsData.length === 0) return null;

  const featuredProjects = projectsData.slice(0, 3);

  return (
    <section className="section-padding bg-light-100/50 dark:bg-dark-50/50">
      <div className="section-container">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading">
              Featured <span className="text-gradient">Projects</span>
            </h2>
            <p className="mt-4 text-light-400 dark:text-muted text-lg max-w-2xl mx-auto">
              A selection of my recent work and personal projects
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project, i) => (
            <AnimatedSection key={project.id} delay={i * 0.1}>
              <motion.div
                className={`group relative p-6 rounded-2xl bg-gradient-to-br ${projectColors[i]} border h-full flex flex-col`}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex-1">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-2xl mb-4">
                    {categoryEmojis[project.category] || categoryEmojis.default}
                  </div>

                  <h3 className="text-xl font-bold font-heading text-text-dark dark:text-text mb-3">
                    {project.title}
                  </h3>

                  <p className="text-light-400 dark:text-muted text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-xs rounded-lg bg-light-100/80 dark:bg-dark/40 backdrop-blur-sm text-light-400 dark:text-muted border border-light-300/50 dark:border-dark-300/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-light-300/50 dark:border-dark-300/30">
                  <Link
                    href={`/projects/${project.id}`}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-all text-sm font-medium"
                  >
                    View Details
                    <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  {project.github && project.github !== "#" && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-light-100/80 dark:bg-dark/40 backdrop-blur-sm text-light-400 dark:text-muted hover:text-accent hover:bg-accent/10 transition-all text-sm"
                    >
                      <FiGithub className="w-4 h-4" />
                      Code
                    </a>
                  )}
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.3}>
          <div className="text-center mt-12">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-light-300 dark:border-dark-300/50 text-text-dark dark:text-text font-semibold hover:bg-light-200 dark:hover:bg-dark-200 transition-all"
            >
              View All Projects
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
