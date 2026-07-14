"use client";

import Link from "next/link";
import { FiGithub, FiMail, FiMapPin, FiLinkedin } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-light-200 dark:border-dark-200/50 bg-light-100 dark:bg-dark-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div>
            <Link href="/" className="text-2xl font-bold font-heading text-gradient">
              AS
            </Link>
            <p className="mt-4 text-light-400 dark:text-muted text-sm leading-relaxed max-w-xs">
              Software Engineer & Full Stack Developer building meaningful digital
              experiences through code & innovation.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-text-dark dark:text-text uppercase tracking-widest mb-4">
              Quick Links
            </h3>
            <div className="space-y-2">
              {[
                { name: "About", path: "/about" },
                { name: "Projects", path: "/projects" },
                { name: "Experience", path: "/experience" },
                { name: "Contact", path: "/contact" },
              ].map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className="block text-light-400 dark:text-muted hover:text-accent text-sm transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-text-dark dark:text-text uppercase tracking-widest mb-4">
              Connect
            </h3>
            <div className="space-y-3">
              <a
                href="mailto:asadalvi979@gmail.com"
                className="flex items-center gap-3 text-light-400 dark:text-muted hover:text-accent text-sm transition-colors duration-200"
              >
                <FiMail className="w-4 h-4" />
                asadalvi979@gmail.com
              </a>
              <a
                href="https://wa.me/923307495544"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-light-400 dark:text-muted hover:text-accent text-sm transition-colors duration-200"
              >
                <FaWhatsapp className="w-4 h-4" />
                +92 330 7495544
              </a>
              <a
                href="https://github.com/Asadalvi979"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-light-400 dark:text-muted hover:text-accent text-sm transition-colors duration-200"
              >
                <FiGithub className="w-4 h-4" />
                Asadalvi979
              </a>
              <div className="flex items-center gap-3 text-light-400 dark:text-muted text-sm">
                <FiMapPin className="w-4 h-4" />
                Sahiwal, Punjab, Pakistan
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-light-200 dark:border-dark-200/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-light-400 dark:text-muted text-xs">
            &copy; {year} Asadullah Sadiq. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <p className="text-light-400 dark:text-muted text-xs">
              Designed & Built with care
            </p>
            <Link
              href="/login"
              className="text-light-400/40 dark:text-muted/40 hover:text-light-400 dark:hover:text-muted text-xs transition-colors"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
