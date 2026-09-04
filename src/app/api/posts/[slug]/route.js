import { readData, writeData, jsonResponse } from "@/lib/apiHelper";

export async function GET(_, { params }) {
  const posts = await readData("posts.json");
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return jsonResponse({ error: "Not found" }, 404);
  return jsonResponse(post);
}

export async function PUT(req, { params }) {
  const body = await req.json();
  const posts = await readData("posts.json");
  const idx = posts.findIndex((p) => p.slug === params.slug);
  if (idx === -1) return jsonResponse({ error: "Not found" }, 404);
  posts[idx] = { ...posts[idx], ...body, slug: params.slug };
  await writeData("posts.json", posts);
  return jsonResponse(posts[idx]);
}

export async function DELETE(_, { params }) {
  let posts = await readData("posts.json");
  posts = posts.filter((p) => p.slug !== params.slug);
  await writeData("posts.json", posts);
  return jsonResponse({ success: true });
}
