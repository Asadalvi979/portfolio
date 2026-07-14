import { readFile, writeFile } from "fs/promises";
import { join } from "path";

const DATA_DIR = join(process.cwd(), "src", "data");

export async function readData(filename) {
  try {
    const filePath = join(DATA_DIR, filename);
    const raw = await readFile(filePath, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading ${filename}:`, err.message);
    return [];
  }
}

export async function writeData(filename, data) {
  try {
    const filePath = join(DATA_DIR, filename);
    await writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error(`Error writing ${filename}:`, err.message);
    return false;
  }
}

export function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
