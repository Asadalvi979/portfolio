"use client";

import { motion } from "framer-motion";
import { FiDownload, FiAward, FiBook, FiBriefcase, FiCode } from "react-icons/fi";
import AnimatedSection from "@/components/AnimatedSection";
import SkillBar from "@/components/SkillBar";

const ResumeSection = ({ icon: Icon, title, children, delay = 0 }) => (
  <AnimatedSection delay={delay}>
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
          <Icon className="w-5 h-5 text-accent" />
        </div>
        <h2 className="text-2xl font-bold font-heading text-text-dark dark:text-text">{title}</h2>
      </div>
      {children}
    </div>
  </AnimatedSection>
);

export default function ResumeClient({ skillData, educationData, experienceData, certificationData, cv }) {
  return (
    <div className="pt-24">
      <section className="section-padding">
        <div className="section-container">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading leading-tight">
                <span className="text-gradient">Resume</span>
              </h1>
              <p className="mt-4 text-lg text-light-400 dark:text-muted">
                My professional background, skills, and qualifications
              </p>
              {cv ? (
                <a
                  href={cv}
                  download={cv.startsWith("http") ? undefined : "Asadullah-CV.pdf"}
                  target={cv.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-xl text-sm font-medium hover:bg-accent-dark transition-colors"
                >
                  <FiDownload className="w-4 h-4" />
                  Download Resume PDF
                </a>
              ) : (
                <div className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-dark-100 border border-dark-200 text-muted rounded-xl text-sm cursor-not-allowed">
                  <FiDownload className="w-4 h-4" />
                  Resume PDF coming soon
                </div>
              )}
            </div>
          </AnimatedSection>

          <div className="max-w-3xl xl:max-w-4xl 2xl:max-w-6xl mx-auto">
            {/* Education */}
            <ResumeSection icon={FiBook} title="Education" delay={0.1}>
              {educationData.map((item, i) => (
                <div
                  key={i}
                  className="p-6 mb-4 rounded-2xl bg-dark-100 border border-dark-200/50"
                >
                  <span className="text-sm font-mono text-accent">{item.year}</span>
                  <h3 className="text-lg font-semibold font-heading text-text-dark dark:text-text mt-1">
                    {item.title}
                  </h3>
                  <p className="text-light-400 dark:text-muted text-sm">{item.institution}</p>
                </div>
              ))}
            </ResumeSection>

            {/* Skills */}
            <ResumeSection icon={FiCode} title="Skills" delay={0.2}>
              <div className="p-6 rounded-2xl bg-white dark:bg-dark-100 border border-light-200 dark:border-dark-200/50">
                <div className="grid sm:grid-cols-2 gap-4">
                  {skillData.map((skill, i) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      delay={i * 0.05}
                    />
                  ))}
                </div>
              </div>
            </ResumeSection>

            {/* Experience */}
            <ResumeSection icon={FiBriefcase} title="Experience" delay={0.3}>
              {experienceData.map((exp, i) => (
                <div
                  key={i}
                  className="p-6 mb-4 rounded-2xl bg-white dark:bg-dark-100 border border-light-200 dark:border-dark-200/50"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="text-lg font-semibold font-heading text-text-dark dark:text-text">
                        {exp.position}
                      </h3>
                      <p className="text-accent text-sm">{exp.company}</p>
                    </div>
                    <span className="px-3 py-1 rounded-lg bg-accent/10 text-accent text-xs font-mono">
                      {exp.duration}
                    </span>
                  </div>
                  <p className="text-light-400 dark:text-muted text-sm mt-2">{exp.description}</p>
                </div>
              ))}
            </ResumeSection>

            {/* Certifications */}
            <ResumeSection icon={FiAward} title="Certifications" delay={0.4}>
              {certificationData.map((cert, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-gradient-to-br from-accent/5 to-transparent border border-accent/10 mb-4"
                >
                  <h3 className="text-lg font-semibold font-heading text-text-dark dark:text-text">
                    {cert.title}
                  </h3>
                  <p className="text-accent text-sm mt-1">{cert.issuer}</p>
                  <span className="inline-block mt-2 px-3 py-1 rounded-lg bg-accent/10 text-accent text-xs font-mono">
                    {cert.duration}
                  </span>
                  <p className="text-light-400 dark:text-muted text-sm mt-3">{cert.description}</p>
                </div>
              ))}
            </ResumeSection>
          </div>
        </div>
      </section>
    </div>
  );
}
