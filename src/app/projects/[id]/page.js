import { readData } from "@/lib/apiHelper";
import ProjectDetailClient from "./ProjectDetailClient";

export default async function ProjectDetail({ params }) {
  const projects = await readData("projects.json");
  const project = Array.isArray(projects)
    ? projects.find((p) => p.id === Number(params.id))
    : null;

  const breadcrumbSchema = project
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.asadullahsadiq.me" },
          { "@type": "ListItem", position: 2, name: "Projects", item: "https://www.asadullahsadiq.me/projects" },
          { "@type": "ListItem", position: 3, name: project.title, item: `https://www.asadullahsadiq.me/projects/${project.id}` },
        ],
      }
    : null;

  return (
    <>
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
      <ProjectDetailClient project={project} />
    </>
  );
}
