import { z } from "zod";
import { db } from "@/infra/db";
import { getLinkSchema } from "../../infra/schemas/link-schema";
import { makeError, makeSuccess } from "@/shared/either";
import { DoesNotExistsError } from "../errors/does-not-exists-error";

type GetLink = z.infer<typeof getLinkSchema>

export async function getLink (data: GetLink) {
  const { code } = getLinkSchema.parse(data);

  const link = await db.query.links.findFirst({
    where(fields, { eq }) {
      return eq(fields.code, code)
    },
  })

  if (!link) {
    return makeError(
      new DoesNotExistsError()
    )
  }

  return makeSuccess({ data: link })
}