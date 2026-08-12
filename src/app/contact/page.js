"use client";

import { motion } from "framer-motion";
import { FiMail, FiPhone, FiGithub, FiMapPin } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import AnimatedSection from "@/components/AnimatedSection";
import ContactForm from "@/components/ContactForm";

const contactInfo = [
  {
    icon: FiMail,
    label: "Email",
    value: "asadullahsadiqalvi@gmail.com",
    href: "mailto:asadullahsadiqalvi@gmail.com",
  },
  {
    icon: FiPhone,
    label: "Phone",
    value: "+92 329 5337163",
    href: "tel:+923295337163",
  },
  {
    icon: FaWhatsapp,
    label: "WhatsApp",
    value: "+92 330 7495544",
    href: "https://wa.me/923307495544",
  },
  {
    icon: FiGithub,
    label: "GitHub",
    value: "Asadalvi979",
    href: "https://github.com/Asadalvi979",
  },
  {
    icon: FiMapPin,
    label: "Location",
    value: "Sahiwal, Punjab, Pakistan",
    href: null,
  },
];

export default function Contact() {
  return (
    <div className="pt-24">
      <section className="section-padding">
        <div className="section-container">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading leading-tight">
                Get In <span className="text-gradient">Touch</span>
              </h1>
              <p className="mt-4 text-lg text-light-400 dark:text-muted">
                Have a project in mind? Let&apos;s work together to bring your ideas to life
              </p>
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Contact Info */}
            <AnimatedSection delay={0.2}>
              <div className="space-y-6">
                <h2 className="text-2xl font-bold font-heading text-text-dark dark:text-text">
                  Contact Information
                </h2>
                <p className="text-light-400 dark:text-muted">
                  Feel free to reach out through any of the channels below. I&apos;m
                  always open to discussing new projects, creative ideas, or
                  opportunities.
                </p>

                <div className="space-y-4">
                  {contactInfo.map((info, i) => {
                    const Icon = info.icon;
                    const content = (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-dark-100 border border-light-200 dark:border-dark-200/50 group hover:border-accent/20 transition-all"
                      >
                        <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                          <Icon className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <p className="text-xs text-light-400 dark:text-muted">{info.label}</p>
                          <p className="text-sm font-medium text-text-dark dark:text-text">
                            {info.value}
                          </p>
                        </div>
                      </motion.div>
                    );

                    return info.href ? (
                      <a
                        key={i}
                        href={info.href}
                        target={info.href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                      >
                        {content}
                      </a>
                    ) : (
                      content
                    );
                  })}
                </div>
              </div>
            </AnimatedSection>

            {/* Contact Form */}
            <AnimatedSection delay={0.3}>
              <div className="p-6 md:p-8 rounded-2xl bg-white dark:bg-dark-100 border border-light-200 dark:border-dark-200/50">
                <h2 className="text-2xl font-bold font-heading text-text-dark dark:text-text mb-6">
                  Send a Message
                </h2>
                <ContactForm />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}
