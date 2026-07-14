import { readData, writeData, jsonResponse } from "@/lib/apiHelper";

export async function GET() {
  const categories = await readData("categories.json");
  return jsonResponse(categories);
}

export async function POST(req) {
  const body = await req.json();
  const categories = await readData("categories.json");
  categories.push(body);
  await writeData("categories.json", categories);
  return jsonResponse(body, 201);
}
