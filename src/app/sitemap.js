import { readData } from "@/lib/apiHelper";

const BASE_URL = "https://www.asadullahsadiq.me";

export default async function sitemap() {
  const [projects, posts] = await Promise.all([
    readData("projects.json"),
    readData("posts.json"),
  ]);

  const now = new Date();
  const staticPages = [
    { url: BASE_URL, lastModified: now, changeFrequency: "monthly", priority: 1.0 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/projects`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/experience`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/resume`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  // Real dates from data instead of deploy-time timestamps — Google ignores
  // (and distrusts) lastmod values that change on every build.
  const projectPages = (Array.isArray(projects) ? projects : [])
    .filter((p) => p.id)
    .map((project) => ({
      url: `${BASE_URL}/projects/${project.id}`,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  const postPages = (Array.isArray(posts) ? posts : [])
    .filter((p) => p.published && p.slug)
    .map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: post.date ? new Date(`${post.date}T00:00:00Z`) : now,
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  return [...staticPages, ...projectPages, ...postPages];
}
