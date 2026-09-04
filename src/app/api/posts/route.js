import { readData, writeData, jsonResponse } from "@/lib/apiHelper";

function slugify(title) {
  return String(title)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function GET() {
  const posts = await readData("posts.json");
  return jsonResponse(Array.isArray(posts) ? posts : []);
}

export async function POST(req) {
  const body = await req.json();
  const posts = await readData("posts.json");

  if (!body.title || !body.content) {
    return jsonResponse({ error: "Title and content are required" }, 400);
  }

  const slug =
    slugify(body.slug || body.title) || `post-${Date.now()}`;
  if (posts.some((p) => p.slug === slug)) {
    return jsonResponse({ error: "A post with this slug already exists" }, 409);
  }

  const newPost = {
    slug,
    title: body.title,
    description: body.description || "",
    content: body.content,
    tags: Array.isArray(body.tags) ? body.tags : [],
    published: body.published !== false,
    date: body.date || new Date().toISOString().slice(0, 10),
  };

  posts.push(newPost);
  await writeData("posts.json", posts);
  return jsonResponse(newPost, 201);
}
