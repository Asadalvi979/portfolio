import { readData, writeData, jsonResponse } from "@/lib/apiHelper";

export async function GET() {
  const projects = await readData("projects.json");
  return jsonResponse(projects);
}

export async function POST(req) {
  const body = await req.json();
  const projects = await readData("projects.json");
  const newId = projects.length > 0 ? Math.max(...projects.map((p) => p.id)) + 1 : 1;
  const newProject = { id: newId, ...body };
  projects.push(newProject);
  await writeData("projects.json", projects);
  return jsonResponse(newProject, 201);
}
