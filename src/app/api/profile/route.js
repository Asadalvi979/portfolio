import { readData, writeData, jsonResponse } from "@/lib/apiHelper";

export async function GET() {
  const data = await readData("profile.json");
  return jsonResponse(data);
}

export async function PUT(req) {
  const body = await req.json();
  const data = await readData("profile.json");
  const updated = { ...data, ...body };
  await writeData("profile.json", updated);
  return jsonResponse(updated);
}