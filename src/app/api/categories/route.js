import { readData, writeData, jsonResponse } from "@/lib/apiHelper";

function slugify(label) {
  return String(label)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function GET() {
  const categories = await readData("categories.json");
  return jsonResponse(categories);
}

export async function POST(req) {
  const body = await req.json();
  const categories = await readData("categories.json");

  const id = body.id || slugify(body.label || body.name || "") || `category-${Date.now()}`;
  const newCategory = { ...body, id };
  categories.push(newCategory);
  await writeData("categories.json", categories);
  return jsonResponse(newCategory, 201);
}
