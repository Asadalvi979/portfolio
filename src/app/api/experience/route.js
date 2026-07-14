import { readData, writeData, jsonResponse } from "@/lib/apiHelper";

export async function GET() {
  const data = await readData("experience.json");
  return jsonResponse(data);
}

export async function POST(req) {
  const body = await req.json();
  const data = await readData("experience.json");
  data.push(body);
  await writeData("experience.json", data);
  return jsonResponse(body, 201);
}
