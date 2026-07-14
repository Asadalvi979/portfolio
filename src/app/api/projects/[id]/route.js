import { readData, writeData, jsonResponse } from "@/lib/apiHelper";

export async function GET(_, { params }) {
  const projects = await readData("projects.json");
  const project = projects.find((p) => p.id === Number(params.id));
  if (!project) return jsonResponse({ error: "Not found" }, 404);
  return jsonResponse(project);
}

export async function PUT(req, { params }) {
  const body = await req.json();
  const projects = await readData("projects.json");
  const idx = projects.findIndex((p) => p.id === Number(params.id));
  if (idx === -1) return jsonResponse({ error: "Not found" }, 404);
  projects[idx] = { ...projects[idx], ...body };
  await writeData("projects.json", projects);
  return jsonResponse(projects[idx]);
}

export async function DELETE(_, { params }) {
  let projects = await readData("projects.json");
  projects = projects.filter((p) => p.id !== Number(params.id));
  await writeData("projects.json", projects);
  return jsonResponse({ success: true });
}
