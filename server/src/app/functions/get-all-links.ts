import { db } from "@/infra/db";
import { makeSuccess } from "@/shared/either";
import { desc } from "drizzle-orm";

export async function getAllLinks () {
  const link = await db.query.links.findMany({
    orderBy: (fields) => desc(fields.createdAt),
  })

  return makeSuccess({ data: link })
}