import { readData, writeData, jsonResponse } from "@/lib/apiHelper";

export async function GET() {
  const techStack = await readData("techStack.json");
  return jsonResponse(techStack);
}

export async function PUT(req) {
  const body = await req.json();
  await writeData("techStack.json", body);
  return jsonResponse(body);
}
