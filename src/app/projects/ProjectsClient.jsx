"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import ProjectCard from "@/components/ProjectCard";
import { FiSearch } from "react-icons/fi";

export default function ProjectsClient({ projectsData, categories }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProjects, setFilteredProjects] = useState(projectsData);

  useEffect(() => {
    let filtered = projectsData;
    if (activeCategory !== "all") {
      filtered = filtered.filter((p) => p.category === activeCategory);
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.technologies.some((t) => t.toLowerCase().includes(query))
      );
    }
    setFilteredProjects(filtered);
  }, [activeCategory, searchQuery, projectsData]);

  return (
    <div className="pt-24">
      <section className="section-padding">
        <div className="section-container">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading leading-tight">
                My <span className="text-gradient">Projects</span>
              </h1>
              <p className="mt-4 text-lg text-light-400 dark:text-muted">
                A showcase of my work, from full-stack applications to frontend
                experiments
              </p>
            </div>
          </AnimatedSection>

          {/* Search & Filter */}
          <AnimatedSection delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
              <div className="relative flex-1 w-full max-w-md">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-light-400 dark:text-muted w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white dark:bg-dark-100 border border-light-200 dark:border-dark-200/50 text-text-dark dark:text-text placeholder-light-400/50 dark:placeholder-muted/50 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30 transition-all"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.filter((c) => c.id !== "all").map((cat) => (
                  <motion.button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      activeCategory === cat.id
                        ? "bg-accent text-white shadow-lg shadow-accent/25"
                        : "bg-white dark:bg-dark-100 text-light-400 dark:text-muted border border-light-200 dark:border-dark-200/50 hover:bg-light-200 dark:hover:bg-dark-200"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {cat.label}
                  </motion.button>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Projects Grid */}
          <AnimatePresence mode="wait">
            {filteredProjects.length > 0 ? (
              <motion.div
                key={activeCategory + searchQuery}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredProjects.map((project, i) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={i}
                    layout={true}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <p className="text-light-400 dark:text-muted text-lg">
                  No projects found matching your criteria.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
