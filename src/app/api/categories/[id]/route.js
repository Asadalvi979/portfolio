import { readData, writeData, jsonResponse } from "@/lib/apiHelper";

export async function GET(_, { params }) {
  const categories = await readData("categories.json");
  const cat = categories.find((c) => c.id === params.id);
  if (!cat) return jsonResponse({ error: "Not found" }, 404);
  return jsonResponse(cat);
}

export async function PUT(req, { params }) {
  const body = await req.json();
  const categories = await readData("categories.json");
  const idx = categories.findIndex((c) => c.id === params.id);
  if (idx === -1) return jsonResponse({ error: "Not found" }, 404);
  categories[idx] = { ...categories[idx], ...body };
  await writeData("categories.json", categories);
  return jsonResponse(categories[idx]);
}

export async function DELETE(_, { params }) {
  let categories = await readData("categories.json");
  categories = categories.filter((c) => c.id !== params.id);
  await writeData("categories.json", categories);
  return jsonResponse({ success: true });
}
