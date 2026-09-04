import { readData } from "@/lib/apiHelper";
import ProjectDetailClient from "./ProjectDetailClient";

export default async function ProjectDetail({ params }) {
  const projects = await readData("projects.json");
  const project = Array.isArray(projects)
    ? projects.find((p) => p.id === Number(params.id))
    : null;

  return <ProjectDetailClient project={project} />;
}
