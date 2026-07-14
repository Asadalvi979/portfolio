import { readData, writeData, jsonResponse } from "@/lib/apiHelper";

export async function GET(_, { params }) {
  const skills = await readData("skills.json");
  const idx = skills.findIndex((s) => s.name === params.name);
  if (idx === -1) return jsonResponse({ error: "Not found" }, 404);
  return jsonResponse(skills[idx]);
}

export async function PUT(req, { params }) {
  const body = await req.json();
  const skills = await readData("skills.json");
  const idx = skills.findIndex((s) => s.name === params.name);
  if (idx === -1) return jsonResponse({ error: "Not found" }, 404);
  skills[idx] = { ...skills[idx], ...body };
  await writeData("skills.json", skills);
  return jsonResponse(skills[idx]);
}

export async function DELETE(_, { params }) {
  let skills = await readData("skills.json");
  skills = skills.filter((s) => s.name !== params.name);
  await writeData("skills.json", skills);
  return jsonResponse({ success: true });
}
