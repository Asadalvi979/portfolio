"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FiGithub,
  FiMail,
  FiMapPin,
  FiLinkedin,
  FiTwitter,
  FiFacebook,
  FiInstagram,
  FiPhone,
  FiYoutube,
  FiDribbble,
} from "react-icons/fi";
import { FaWhatsapp, FaTelegramPlane } from "react-icons/fa";

const socialIcons = {
  github: FiGithub,
  linkedin: FiLinkedin,
  twitter: FiTwitter,
  facebook: FiFacebook,
  instagram: FiInstagram,
  whatsapp: FaWhatsapp,
  telegram: FaTelegramPlane,
  email: FiMail,
  phone: FiPhone,
  youtube: FiYoutube,
  dribbble: FiDribbble,
};

export default function Footer() {
  const year = new Date().getFullYear();
  const [socials, setSocials] = useState([]);
  const [profile, setProfile] = useState({ email: "asadullahsadiqalvi@gmail.com", location: "Sahiwal, Punjab, Pakistan" });

  useEffect(() => {
    fetch("/api/socials").then((r) => r.json()).then(setSocials).catch(() => {});
    fetch("/api/profile").then((r) => r.json()).then(setProfile).catch(() => {});
  }, []);

  return (
    <footer className="relative border-t border-light-200 dark:border-dark-200/50 bg-light-100 dark:bg-dark-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div>
            <Link href="/" className="text-2xl font-bold font-heading text-gradient">
              AS
            </Link>
            <p className="mt-4 text-light-400 dark:text-muted text-sm leading-relaxed max-w-xs">
              Software Engineer & Full Stack Developer in Sahiwal, Pakistan —
              building meaningful digital experiences through code & innovation.
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
                { name: "Blog", path: "/blog" },
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
            <div className="flex items-center gap-3 flex-wrap">
              {socials.map((social) => {
                const Icon = socialIcons[social.icon] || FiGithub;
                return (
                  <a
                    key={`${social.label}-${social.url}`}
                    href={social.url}
                    title={social.label}
                    aria-label={social.label}
                    target={social.url.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-white dark:bg-dark-100 border border-light-200 dark:border-dark-200/50 flex items-center justify-center text-light-400 dark:text-muted hover:text-accent hover:border-accent/30 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
            <div className="flex items-center gap-3 text-light-400 dark:text-muted text-sm mt-4">
              <FiMapPin className="w-4 h-4" />
              {profile.location}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-light-200 dark:border-dark-200/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-light-400 dark:text-muted text-xs">
            &copy; {year} Asadullah Sadiq. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-light-100 dark:text-dark-50 hover:text-light-400 dark:hover:text-muted text-xs transition-colors"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
