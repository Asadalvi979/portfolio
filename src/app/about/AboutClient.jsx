"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedSection from "@/components/AnimatedSection";
import SkillBar from "@/components/SkillBar";
import Timeline from "@/components/Timeline";
import Counter from "@/components/Counter";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutClient({ skillData, educationData, projectCount, certCount }) {
  const skillRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const skillBars = skillRef.current?.querySelectorAll(".skill-item");
      if (skillBars) {
        gsap.fromTo(
          skillBars,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            stagger: 0.1,
            scrollTrigger: {
              trigger: skillRef.current,
              start: "top 80%",
            },
          }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="section-padding">
        <div className="section-container">
          <div className="max-w-3xl">
            <AnimatedSection>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading leading-tight">
                About <span className="text-gradient">Me</span>
              </h1>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <p className="mt-6 text-lg md:text-xl text-light-400 dark:text-muted leading-relaxed">
                Asadullah is a Software Engineering student at Riphah International
                University with a strong passion for full-stack development and problem
                solving. He focuses on building practical digital solutions and
                continuously improving his technical skills through real-world projects.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding bg-dark-50/50">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { label: "Coding Hours", end: 2000, suffix: "+", icon: "💻" },
              { label: "Projects", end: projectCount, suffix: "+", icon: "🚀" },
              { label: "Technologies", end: skillData.length || 10, suffix: "+", icon: "🛠️" },
              { label: "Certifications", end: certCount, suffix: "+", icon: "📜" },
            ].map((stat, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <motion.div
                  className="p-6 md:p-8 rounded-2xl bg-white dark:bg-dark-100 border border-light-200 dark:border-dark-200/50 text-center"
                  whileHover={{ y: -5 }}
                >
                  <span className="text-3xl md:text-4xl mb-3 block">
                    {stat.icon}
                  </span>
                  <div className="text-3xl md:text-4xl font-bold font-heading text-gradient">
                    <Counter end={stat.end} suffix={stat.suffix} />
                  </div>
                  <p className="text-light-400 dark:text-muted text-sm mt-2">{stat.label}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section ref={skillRef} className="section-padding">
        <div className="section-container">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-center mb-16">
              Skills & <span className="text-gradient">Expertise</span>
            </h2>
          </AnimatedSection>
          <div className="max-w-2xl mx-auto space-y-6">
            {skillData.map((skill, i) => (
              <div key={skill.name} className="skill-item">
                <SkillBar name={skill.name} level={skill.level} delay={i * 0.1} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Timeline */}
      <section className="section-padding bg-light-100/50 dark:bg-dark-50/50">
        <div className="section-container">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-center mb-16">
              Education & <span className="text-gradient">Journey</span>
            </h2>
          </AnimatedSection>
          <div className="max-w-xl mx-auto">
            <Timeline items={educationData} />
          </div>
        </div>
      </section>
    </div>
  );
}
