import { Inter } from "next/font/google";
import "./globals.css";
import LayoutContent from "@/components/LayoutContent";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Asadullah Sadiq | Software Engineer & Full Stack Developer",
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
  authors: [{ name: "Asadullah Sadiq" }],
  openGraph: {
    title: "Asadullah Sadiq | Software Engineer & Full Stack Developer",
    description:
      "Building Meaningful Digital Experiences Through Code & Innovation.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <LayoutContent>{children}</LayoutContent>
      </body>
    </html>
  );
}
