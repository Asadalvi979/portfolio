import { readData } from "@/lib/apiHelper";
import PostClient from "./PostClient";

const SITE_URL = "https://www.asadullahsadiq.me";

export async function generateMetadata({ params }) {
  const posts = await readData("posts.json");
  const post = (Array.isArray(posts) ? posts : []).find(
    (p) => p.slug === params.slug
  );

  if (!post || !post.published) {
    return {
      title: "Article Not Found",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: post.title,
    description: post.description || `An article by Asadullah Sadiq: ${post.title}`,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      publishedTime: post.date ? `${post.date}T00:00:00` : undefined,
      tags: post.tags,
    },
  };
}

export default async function PostPage({ params }) {
  const posts = await readData("posts.json");
  const post = (Array.isArray(posts) ? posts : []).find(
    (p) => p.slug === params.slug
  );

  const articleSchema = post
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        author: {
          "@type": "Person",
          name: "Asadullah Sadiq",
          url: SITE_URL,
        },
        publisher: {
          "@type": "Person",
          name: "Asadullah Sadiq",
          url: SITE_URL,
        },
        mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
        keywords: post.tags?.join(", "),
      }
    : null;

  return (
    <PostClient post={post && post.published ? post : null}>
      {articleSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      )}
    </PostClient>
  );
}
