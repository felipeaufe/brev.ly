import { z } from "zod";
import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { createLinkSchema } from "../../infra/schemas/link-schema";
import { makeError, makeSuccess } from "@/shared/either";
import { AlreadyExistsError } from "../errors/already-exists-error";

type CreateLink = z.infer<typeof createLinkSchema>

export async function createLink (data: CreateLink) {
  const { link, code } = createLinkSchema.parse(data);

  const existingLink = await db.query.links.findFirst({
    where(fields, { eq }) {
      return eq(fields.code, code)
    },
  })

  if (existingLink) {
    return makeError(
      new AlreadyExistsError()
    )
  }

  const [ result ] = await db.insert(schema.links).values({ link, code }).returning();

  return makeSuccess({ data: result })
}