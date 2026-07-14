"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiCode, FiLayout, FiServer, FiGlobe, FiCloud } from "react-icons/fi";
import AnimatedSection from "./AnimatedSection";

const iconMap = { code: FiCode, layout: FiLayout, server: FiServer, globe: FiGlobe, cloud: FiCloud };

export default function ServicesSection() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("/api/services").then((r) => r.json()).then(setServices);
  }, []);

  if (services.length === 0) return null;

  return (
    <section className="section-padding">
      <div className="section-container">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading">
              What I <span className="text-gradient">Do</span>
            </h2>
            <p className="mt-4 text-light-400 dark:text-muted text-lg max-w-2xl mx-auto">
              Services I offer to help bring your digital ideas to life
            </p>
          </div>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || FiCode;
            return (
              <AnimatedSection key={i} delay={i * 0.1}>
                <motion.div
                  className="group p-6 rounded-2xl bg-white dark:bg-dark-100 border border-light-200 dark:border-dark-200/50 hover:border-accent/20 transition-all duration-500"
                  whileHover={{ y: -8 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold font-heading text-text-dark dark:text-text mb-3">
                    {service.title}
                  </h3>
                  <p className="text-light-400 dark:text-muted text-sm leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
