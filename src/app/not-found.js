"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-light-50 dark:bg-dark px-4">
      <div className="text-center max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-8xl font-bold font-heading text-gradient">404</h1>
          <p className="text-2xl font-bold font-heading text-text-dark dark:text-text mt-4">
            Page Not Found
          </p>
          <p className="text-light-400 dark:text-muted mt-2">
            The page you are looking for does not exist or has been moved.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white rounded-xl font-semibold text-sm hover:bg-accent-dark transition-all shadow-lg shadow-accent/25"
          >
            Go Home
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-light-300 dark:border-dark-300/50 text-text-dark dark:text-text rounded-xl font-semibold text-sm hover:bg-light-200 dark:hover:bg-dark-200 transition-all"
          >
            View Projects
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
