import { readData, writeData, jsonResponse } from "@/lib/apiHelper";

export async function GET(_, { params }) {
  const data = await readData("certifications.json");
  const idx = Number(params.index);
  if (idx < 0 || idx >= data.length) return jsonResponse({ error: "Not found" }, 404);
  return jsonResponse(data[idx]);
}

export async function PUT(req, { params }) {
  const body = await req.json();
  const data = await readData("certifications.json");
  const idx = Number(params.index);
  if (idx < 0 || idx >= data.length) return jsonResponse({ error: "Not found" }, 404);
  data[idx] = { ...data[idx], ...body };
  await writeData("certifications.json", data);
  return jsonResponse(data[idx]);
}

export async function DELETE(_, { params }) {
  let data = await readData("certifications.json");
  const idx = Number(params.index);
  if (idx < 0 || idx >= data.length) return jsonResponse({ error: "Not found" }, 404);
  data.splice(idx, 1);
  await writeData("certifications.json", data);
  return jsonResponse({ success: true });
}
