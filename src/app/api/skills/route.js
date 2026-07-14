import { readData, writeData, jsonResponse } from "@/lib/apiHelper";

export async function GET() {
  const skills = await readData("skills.json");
  return jsonResponse(skills);
}

export async function POST(req) {
  const body = await req.json();
  const skills = await readData("skills.json");
  skills.push(body);
  await writeData("skills.json", skills);
  return jsonResponse(body, 201);
}
