import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { removeLinkSchema } from "../../infra/schemas/link-schema";
import { makeError, makeSuccess } from "@/shared/either";
import { DoesNotExistsError } from "../errors/does-not-exists-error";
import { eq } from "drizzle-orm";
import { z } from "zod";

type RemoveLink = z.infer<typeof removeLinkSchema>

export async function removeLink (data: RemoveLink) {
  const { code } = removeLinkSchema.parse(data);

  const existingLink = await db.query.links.findFirst({
    where(fields, { eq }) {
      return eq(fields.code, code)
    },
  })

  if (!existingLink) {
    return makeError(
      new DoesNotExistsError()
    )
  }

  await db.delete(schema.links).where(eq(schema.links.code, code)).returning();

  return makeSuccess({ data: true })
}