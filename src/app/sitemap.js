import { readData } from "@/lib/apiHelper";

const BASE_URL = "https://www.asadullahsadiq.me";

export default async function sitemap() {
  const projects = await readData("projects.json");

  const staticPages = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "monthly", priority: 1.0 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/projects`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/experience`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/resume`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];

  const projectPages = projects
    .filter((p) => p.id)
    .map((project) => ({
      url: `${BASE_URL}/projects/${project.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    }));

  return [...staticPages, ...projectPages];
}
