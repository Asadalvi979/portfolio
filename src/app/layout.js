import { Inter, Poppins, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import LayoutContent from "@/components/LayoutContent";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-heading",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-code",
});

const SITE_URL = "https://www.asadullahsadiq.me";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Asadullah Sadiq | Software Engineer & Full Stack Developer",
    template: "%s | Asadullah Sadiq",
  },
  description:
    "Building Meaningful Digital Experiences Through Code & Innovation. Personal portfolio of Asadullah Sadiq, a Software Engineer and Full Stack Developer.",
  keywords: [
    "Asadullah Sadiq",
    "Software Engineer",
    "Full Stack Developer",
    "Web Developer",
    "React",
    "Next.js",
    "Django",
    "Portfolio",
  ],
  authors: [{ name: "Asadullah Sadiq", url: SITE_URL }],
  creator: "Asadullah Sadiq",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Asadullah Sadiq | Software Engineer & Full Stack Developer",
    description:
      "Building Meaningful Digital Experiences Through Code & Innovation.",
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Asadullah Sadiq — Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Asadullah Sadiq — Software Engineer & Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Asadullah Sadiq | Software Engineer & Full Stack Developer",
    description:
      "Building Meaningful Digital Experiences Through Code & Innovation.",
    creator: "@AsadullahSadiq_",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Asadullah Sadiq",
  url: SITE_URL,
  email: "mailto:asadullahsadiqalvi@gmail.com",
  jobTitle: "Software Engineer & Full Stack Developer",
  description:
    "Full Stack Developer building scalable web applications with React, Next.js, Django, and PHP.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Sahiwal",
    addressRegion: "Punjab",
    addressCountry: "PK",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Riphah International University",
  },
  knowsAbout: [
    "Full Stack Development",
    "React",
    "Next.js",
    "Django",
    "PHP",
    "MySQL",
    "C++",
  ],
  sameAs: [
    "https://github.com/Asadalvi979",
    "https://www.linkedin.com/in/asadullah-sadiq/",
    "https://x.com/AsadullahSadiq_",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Asadullah Sadiq — Portfolio",
  url: SITE_URL,
  author: { "@type": "Person", name: "Asadullah Sadiq" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${poppins.variable} ${jetbrainsMono.variable} ${inter.className}`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <LayoutContent>{children}</LayoutContent>
      </body>
    </html>
  );
}
