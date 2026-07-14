import { readData, writeData, jsonResponse } from "@/lib/apiHelper";

export async function GET(_, { params }) {
  const data = await readData("experience.json");
  const idx = data.findIndex((_, i) => i === Number(params.index));
  if (idx === -1) return jsonResponse({ error: "Not found" }, 404);
  return jsonResponse(data[idx]);
}

export async function PUT(req, { params }) {
  const body = await req.json();
  const data = await readData("experience.json");
  const idx = Number(params.index);
  if (idx < 0 || idx >= data.length) return jsonResponse({ error: "Not found" }, 404);
  data[idx] = { ...data[idx], ...body };
  await writeData("experience.json", data);
  return jsonResponse(data[idx]);
}

export async function DELETE(_, { params }) {
  let data = await readData("experience.json");
  const idx = Number(params.index);
  if (idx < 0 || idx >= data.length) return jsonResponse({ error: "Not found" }, 404);
  data.splice(idx, 1);
  await writeData("experience.json", data);
  return jsonResponse({ success: true });
}
