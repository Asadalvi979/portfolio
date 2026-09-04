"use client";

import Link from "next/link";
import { FiCalendar, FiTag, FiArrowLeft } from "react-icons/fi";
import AnimatedSection from "@/components/AnimatedSection";
import PostContent from "@/components/PostContent";

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

export default function PostClient({ post, children }) {
  if (!post) {
    return (
      <div className="pt-24 section-padding text-center">
        <p className="text-muted text-lg">Article not found.</p>
        <Link href="/blog" className="text-accent mt-4 inline-block hover:underline">
          ← Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24">
      {children}
      <section className="section-padding">
        <div className="section-container max-w-3xl">
          <AnimatedSection>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-muted hover:text-accent text-sm mb-8 transition-colors"
            >
              <FiArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <article>
              <header className="mb-8">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading leading-tight text-text-dark dark:text-text">
                  {post.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-light-400 dark:text-muted">
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
              </header>

              <PostContent content={post.content} />

              {post.tags?.length > 0 && (
                <footer className="mt-12 pt-8 border-t border-light-200 dark:border-dark-200/50">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 text-xs rounded-xl bg-accent/10 text-accent border border-accent/20 font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </footer>
              )}
            </article>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
