import { readData } from "@/lib/apiHelper";
import ProjectsClient from "./ProjectsClient";

export default async function Projects() {
  const [projects, categories] = await Promise.all([
    readData("projects.json"),
    readData("categories.json"),
  ]);

  return (
    <ProjectsClient
      projectsData={Array.isArray(projects) ? projects : []}
      categories={Array.isArray(categories) ? categories : []}
    />
  );
}
