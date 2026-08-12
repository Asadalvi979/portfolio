import { Redis } from "@upstash/redis";
import { readFile, stat } from "fs/promises";
import { join } from "path";

const DATA_DIR = join(process.cwd(), "src", "data");

const CACHE_TTL = 30_000;
const cache = new Map();

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

async function getFileMtime(filename) {
  try {
    const filePath = join(DATA_DIR, filename);
    const st = await stat(filePath);
    return st.mtimeMs;
  } catch {
    return 0;
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

  const entry = cache.get(filename);
  const mtimeMs = await getFileMtime(filename);

  if (
    entry &&
    (entry.dirty ||
      (entry.mtimeMs === mtimeMs && Date.now() - entry.ts < CACHE_TTL))
  ) {
    return entry.data;
  }

  const data = await getLocalData(filename);
  cache.set(filename, { data, mtimeMs, ts: Date.now(), dirty: false });
  return data;
}

export async function writeData(filename, data) {
  if (redis) {
    const key = `data:${filename}`;
    await redis.set(key, data);
  }

  const mtimeMs = await getFileMtime(filename);
  cache.set(filename, { data, mtimeMs, ts: Date.now(), dirty: true });
  return true;
}

export function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}