"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiGithub, FiExternalLink, FiArrowLeft } from "react-icons/fi";
import AnimatedSection from "@/components/AnimatedSection";

const categoryEmojis = {
  fullstack: "🏗️",
  "mini-projects": "🧩",
  backend: "⚙️",
  mobile: "📱",
  default: "📦",
};

export default function ProjectDetail() {
  const params = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((projects) => {
        const found = projects.find((p) => p.id === Number(params.id));
        setProject(found);
        setLoading(false);
      });
  }, [params.id]);

  if (loading) {
    return (
      <div className="pt-24 section-padding">
        <div className="section-container max-w-4xl">
          <div className="space-y-4">
            <div className="h-8 w-48 rounded-lg bg-dark-100 animate-pulse" />
            <div className="h-12 w-3/4 rounded-lg bg-dark-100 animate-pulse" />
            <div className="h-24 rounded-lg bg-dark-100 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="pt-24 section-padding text-center">
        <p className="text-muted text-lg">Project not found.</p>
        <Link href="/projects" className="text-accent mt-4 inline-block hover:underline">
          ← Back to Projects
        </Link>
      </div>
    );
  }

  const hasSubProjects = project.subProjects && project.subProjects.length > 0;

  return (
    <div className="pt-24">
      <section className="section-padding">
        <div className="section-container max-w-5xl">
          <AnimatedSection>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-muted hover:text-accent text-sm mb-8 transition-colors"
            >
              <FiArrowLeft className="w-4 h-4" />
              Back to Projects
            </Link>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-3xl">
                {categoryEmojis[project.category] || categoryEmojis.default}
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-text-dark dark:text-text">
                  {project.title}
                </h1>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="text-lg text-light-400 dark:text-muted leading-relaxed mb-8">
              {project.description}
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.25}>
            <div className="flex flex-wrap gap-2 mb-8">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 text-sm rounded-xl bg-accent/10 text-accent border border-accent/20 font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <div className="flex flex-wrap gap-4 mb-12">
              {project.github && project.github !== "#" && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-dark-100 border border-dark-200 text-text-dark dark:text-text font-semibold text-sm hover:bg-dark-200 transition-all"
                >
                  <FiGithub className="w-4 h-4" />
                  View Code
                </a>
              )}
              {project.live && project.live !== "#" && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-white font-semibold text-sm hover:bg-accent-dark transition-all shadow-lg shadow-accent/25"
                >
                  <FiExternalLink className="w-4 h-4" />
                  Live Demo
                </a>
              )}
            </div>
          </AnimatedSection>

          {hasSubProjects && (
            <>
              <AnimatedSection delay={0.35}>
                <div className="border-t border-dark-200 pt-12">
                  <h2 className="text-2xl md:text-3xl font-bold font-heading text-text-dark dark:text-text mb-2">
                    Mini Projects
                  </h2>
                  <p className="text-muted mb-8">
                    {project.subProjects.length} individual projects in this collection
                  </p>
                </div>
              </AnimatedSection>

              <div className="grid sm:grid-cols-2 gap-6">
                {project.subProjects.map((sub, i) => (
                  <AnimatedSection key={i} delay={0.1 * i}>
                    <motion.div
                      className="group p-6 rounded-2xl bg-gradient-to-br from-accent/5 to-transparent border border-accent/10 hover:border-accent/30 transition-all duration-300 h-full"
                      whileHover={{ y: -5 }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-sm font-bold text-accent font-heading">
                          {String(i + 1).padStart(2, "0")}
                        </div>
                        <h3 className="text-lg font-bold font-heading text-text-dark dark:text-text">
                          {sub.title}
                        </h3>
                      </div>

                      <p className="text-light-400 dark:text-muted text-sm leading-relaxed mb-4">
                        {sub.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {sub.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 text-xs rounded-lg bg-dark/40 dark:bg-dark/40 text-light-400 dark:text-muted border border-light-300/50 dark:border-dark-300/30"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-3 pt-3 border-t border-light-300/30 dark:border-dark-300/30">
                        {sub.github && sub.github !== "#" && (
                          <a
                            href={sub.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-xs text-muted hover:text-accent transition-colors"
                          >
                            <FiGithub className="w-3.5 h-3.5" />
                            Code
                          </a>
                        )}
                        {sub.live && sub.live !== "#" && (
                          <a
                            href={sub.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-xs text-accent hover:text-accent-light transition-colors"
                          >
                            <FiExternalLink className="w-3.5 h-3.5" />
                            Live
                          </a>
                        )}
                      </div>
                    </motion.div>
                  </AnimatedSection>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
