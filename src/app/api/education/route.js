import { readData, writeData, jsonResponse } from "@/lib/apiHelper";

export async function GET() {
  const data = await readData("education.json");
  return jsonResponse(data);
}

export async function POST(req) {
  const body = await req.json();
  const data = await readData("education.json");
  data.push(body);
  await writeData("education.json", data);
  return jsonResponse(body, 201);
}
