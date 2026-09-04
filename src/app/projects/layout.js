export const metadata = {
  title: "Projects — Full Stack & Web Applications",
  description:
    "A showcase of projects by Asadullah Sadiq: full-stack web applications including CampNect, FoodLynk, and Green Mart — built with Django, PHP, MySQL, React, and modern web technologies.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects by Asadullah Sadiq — Full Stack Developer",
    description:
      "Full-stack web applications, from university platforms to e-commerce systems.",
    url: "/projects",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Projects by Asadullah Sadiq" }],
  },
};

export default function ProjectsLayout({ children }) {
  return children;
}
