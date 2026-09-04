import { readData } from "@/lib/apiHelper";

const SITE_URL = "https://www.asadullahsadiq.me";

export async function generateMetadata({ params }) {
  const projects = await readData("projects.json");
  const project = (Array.isArray(projects) ? projects : []).find(
    (p) => p.id === Number(params.id)
  );

  if (!project) {
    return {
      title: "Project Not Found",
      robots: { index: false, follow: false },
    };
  }

  const description =
    project.description?.slice(0, 155) ||
    `A project by Asadullah Sadiq built with ${project.technologies?.join(", ") || "modern web technologies"}.`;
  const ogImage = `/og/projects/${project.id}.png`;

  return {
    title: `${project.title} — Project`,
    description,
    alternates: { canonical: `/projects/${project.id}` },
    openGraph: {
      title: `${project.title} — Asadullah Sadiq`,
      description,
      url: `/projects/${project.id}`,
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${project.title} — project by Asadullah Sadiq` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Asadullah Sadiq`,
      description,
      images: [ogImage],
    },
  };
}

export default function ProjectDetailLayout({ children }) {
  return children;
}
