import { readData } from "@/lib/apiHelper";
import BlogClient from "./BlogClient";

// Posts live in Redis and change via the dashboard, so this page must
// render per-request instead of being frozen at build time.
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Blog — Articles & Tutorials",
  description:
    "Articles by Asadullah Sadiq on full-stack development, Django, React, Next.js, and lessons learned from building real projects.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog — Articles by Asadullah Sadiq",
    description:
      "Full-stack development articles, tutorials, and project build experiences.",
    url: "/blog",
    images: [{ url: "/og/blog-listing.png", width: 1200, height: 630, alt: "Blog — Articles by Asadullah Sadiq" }],
  },
};

export default async function Blog() {
  const posts = await readData("posts.json");
  const published = (Array.isArray(posts) ? posts : [])
    .filter((p) => p.published)
    .sort((a, b) => (b.date || "").localeCompare(a.date || ""));

  return <BlogClient posts={published} />;
}
