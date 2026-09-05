"use client";

import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import Counter from "./Counter";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function AboutPreview({ counts }) {
  const { projects = 0, skills = 0, certifications = 0 } = counts || {};
  return (
    <section className="section-padding">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <AnimatedSection>
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading">
                About <span className="text-gradient">Me</span>
              </h2>
              <div className="mt-6 space-y-4">
                <p className="text-light-400 dark:text-muted text-lg leading-relaxed">
                  Asadullah is a Full Stack Developer based in Sahiwal, Pakistan, and a
                  Software Engineering student at Riphah International University with a
                  strong passion for full-stack development and problem solving. He
                  focuses on building practical digital solutions and continuously
                  improving his technical skills through real-world projects.
                </p>
                <p className="text-light-400 dark:text-muted text-lg leading-relaxed">
                  With a keen eye for clean code and modern design, Asadullah strives to
                  create applications that are not only functional but also provide
                  exceptional user experiences.
                </p>
              </div>
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 mt-8 text-accent font-medium hover:text-accent-light transition-colors"
              >
                Learn more about me
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Coding Hours", end: 2000, suffix: "+", icon: "💻" },
              { label: "Projects Completed", end: counts.projects, suffix: "+", icon: "🚀" },
              { label: "Technologies Learned", end: counts.skills, suffix: "+", icon: "🛠️" },
              { label: "Certifications", end: counts.certifications, suffix: "+", icon: "📜" },
            ].map((stat, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <motion.div
                  className="p-6 rounded-2xl bg-white dark:bg-dark-100 border border-light-200 dark:border-dark-200/50 text-center hover:border-accent/20 transition-colors"
                  whileHover={{ y: -5 }}
                >
                  <span className="text-3xl mb-3 block">{stat.icon}</span>
                  <div className="text-3xl md:text-4xl font-bold font-heading text-gradient">
                    <Counter end={stat.end} suffix={stat.suffix} />
                  </div>
                  <p className="text-light-400 dark:text-muted text-sm mt-2">{stat.label}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
