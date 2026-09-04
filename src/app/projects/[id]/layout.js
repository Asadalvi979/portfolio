import { readData } from "@/lib/apiHelper";

export async function generateMetadata({ params }) {
  const projects = await readData("projects.json");
  const project = projects.find((p) => p.id === Number(params.id));

  if (!project) {
    return {
      title: "Project Not Found",
      robots: { index: false, follow: false },
    };
  }

  const description =
    project.description?.slice(0, 155) ||
    `A project by Asadullah Sadiq built with ${project.technologies?.join(", ") || "modern web technologies"}.`;

  return {
    title: `${project.title} — Project`,
    description,
    alternates: { canonical: `/projects/${project.id}` },
    openGraph: {
      title: `${project.title} — Asadullah Sadiq`,
      description,
      url: `/projects/${project.id}`,
    },
  };
}

export default function ProjectDetailLayout({ children }) {
  return children;
}
