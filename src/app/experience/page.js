"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import Timeline from "@/components/Timeline";
import { FiBriefcase, FiBookOpen } from "react-icons/fi";

export default function Experience() {
  const [experienceData, setExperienceData] = useState([]);
  const [educationData, setEducationData] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch("/api/experience").then((r) => r.json()),
      fetch("/api/education").then((r) => r.json()),
    ]).then(([exp, edu]) => {
      setExperienceData(exp);
      setEducationData(edu);
    });
  }, []);

  return (
    <div className="pt-24">
      <section className="section-padding">
        <div className="section-container">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading leading-tight">
                <span className="text-gradient">Experience</span>
              </h1>
              <p className="mt-4 text-lg text-light-400 dark:text-muted">
                My professional journey and industry experience
              </p>
            </div>
          </AnimatedSection>

          <div className="max-w-3xl mx-auto space-y-12">
            {/* Work Experience */}
            <AnimatedSection>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <FiBriefcase className="w-5 h-5 text-accent" />
                </div>
                <h2 className="text-2xl font-bold font-heading text-text-dark dark:text-text">
                  Work Experience
                </h2>
              </div>
              {experienceData.map((exp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="p-8 rounded-2xl bg-gradient-to-br from-accent/5 to-transparent border border-accent/10"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-bold font-heading text-text-dark dark:text-text">
                        {exp.position}
                      </h3>
                      <p className="text-accent font-medium">{exp.company}</p>
                    </div>
                    <span className="px-3 py-1 rounded-lg bg-accent/10 text-accent text-sm font-mono">
                      {exp.duration}
                    </span>
                  </div>
                  <p className="text-light-400 dark:text-muted leading-relaxed">{exp.description}</p>
                </motion.div>
              ))}
            </AnimatedSection>

            {/* Education */}
            <AnimatedSection delay={0.2}>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <FiBookOpen className="w-5 h-5 text-accent" />
                </div>
                <h2 className="text-2xl font-bold font-heading text-text-dark dark:text-text">
                  Education
                </h2>
              </div>
              <Timeline items={educationData} />
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}
