"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiCalendar, FiTag, FiArrowRight } from "react-icons/fi";
import AnimatedSection from "@/components/AnimatedSection";

function formatDate(date) {
  try {
    return new Date(date + "T00:00:00").toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return date;
  }
}

export default function BlogClient({ posts }) {
  return (
    <div className="pt-24">
      <section className="section-padding">
        <div className="section-container">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading leading-tight">
                My <span className="text-gradient">Blog</span>
              </h1>
              <p className="mt-4 text-lg text-light-400 dark:text-muted">
                Articles on full-stack development, project builds, and lessons
                learned along the way
              </p>
            </div>
          </AnimatedSection>

          {posts.length === 0 ? (
            <AnimatedSection delay={0.2}>
              <div className="text-center py-20 max-w-lg mx-auto">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-3xl mb-6">
                  ✍️
                </div>
                <h2 className="text-2xl font-bold font-heading text-text-dark dark:text-text">
                  Coming Soon
                </h2>
                <p className="mt-3 text-light-400 dark:text-muted leading-relaxed">
                  I&apos;m working on articles about my projects and the
                  technologies I use. Check back soon!
                </p>
              </div>
            </AnimatedSection>
          ) : (
            <div className="max-w-3xl mx-auto space-y-6">
              {posts.map((post, i) => (
                <AnimatedSection key={post.slug} delay={Math.min(i, 4) * 0.1}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="group p-6 md:p-8 rounded-2xl bg-white dark:bg-dark-100 border border-light-200 dark:border-dark-200/50 hover:border-accent/20 transition-all"
                  >
                    <div className="flex items-center gap-4 text-sm text-light-400 dark:text-muted mb-3">
                      <span className="inline-flex items-center gap-1.5">
                        <FiCalendar className="w-4 h-4" />
                        {formatDate(post.date)}
                      </span>
                      {post.tags?.length > 0 && (
                        <span className="inline-flex items-center gap-1.5">
                          <FiTag className="w-4 h-4" />
                          {post.tags.join(", ")}
                        </span>
                      )}
                    </div>
                    <h2 className="text-2xl font-bold font-heading text-text-dark dark:text-text mb-3 group-hover:text-accent transition-colors">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    {post.description && (
                      <p className="text-light-400 dark:text-muted leading-relaxed mb-4">
                        {post.description}
                      </p>
                    )}
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-accent font-medium hover:text-accent-light transition-colors text-sm"
                    >
                      Read Article
                      <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
