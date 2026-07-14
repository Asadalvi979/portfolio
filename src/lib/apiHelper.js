import { Redis } from "@upstash/redis";
import { readFile } from "fs/promises";
import { join } from "path";

const DATA_DIR = join(process.cwd(), "src", "data");

const redis =
  process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN
    ? new Redis({
        url: process.env.KV_REST_API_URL,
        token: process.env.KV_REST_API_TOKEN,
      })
    : null;

async function getLocalData(filename) {
  try {
    const filePath = join(DATA_DIR, filename);
    const raw = await readFile(filePath, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function readData(filename) {
  if (redis) {
    const key = `data:${filename}`;
    const cached = await redis.get(key);
    if (cached !== null) return cached;

    const localData = await getLocalData(filename);
    if (localData && (Array.isArray(localData) ? localData.length > 0 : Object.keys(localData).length > 0)) {
      await redis.set(key, localData);
    }
    return localData;
  }

  return getLocalData(filename);
}

export async function writeData(filename, data) {
  if (redis) {
    const key = `data:${filename}`;
    await redis.set(key, data);
    return true;
  }

  return false;
}

export function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
