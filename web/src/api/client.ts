import { env } from "@/env"

const baseUrl = env.VITE_API_URL;

export async function client<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${baseUrl}/${path}`, init);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json() as T;
}