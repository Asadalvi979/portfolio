"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiGithub, FiExternalLink, FiArrowRight } from "react-icons/fi";

const categoryEmojis = {
  fullstack: "🏗️",
  "mini-projects": "🧩",
  backend: "⚙️",
  mobile: "📱",
  default: "📦",
};

const projectColors = [
  "from-blue-500/20 to-cyan-500/20 border-blue-500/30",
  "from-green-500/20 to-emerald-500/20 border-green-500/30",
  "from-purple-500/20 to-pink-500/20 border-purple-500/30",
];

export default function ProjectCard({ project, index = 0, layout }) {
  const colorClass = projectColors[index % projectColors.length];
  const hasSubProjects = project.subProjects && project.subProjects.length > 0;

  return (
    <motion.div
      layout={layout}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className={`group relative p-6 rounded-2xl bg-gradient-to-br ${colorClass} border h-full flex flex-col`}
      whileHover={{ y: -6 }}
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

        {hasSubProjects && (
          <p className="text-accent text-xs font-medium mb-4">
            {project.subProjects.length} mini projects inside →
          </p>
        )}

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
        {project.live && project.live !== "#" && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-light-400 dark:text-muted hover:text-accent transition-all text-sm"
          >
            <FiExternalLink className="w-4 h-4" />
            Live
          </a>
        )}
      </div>
    </motion.div>
  );
}
