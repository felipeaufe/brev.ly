import { DoesNotExistsError } from "@/app/errors/does-not-exists-error";
import { getLink } from "@/app/functions/get-link";
import { getLinkSchema } from "@/infra/schemas/link-schema";
import { isSuccess, unwrapEither } from "@/shared/either";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const getLinkRoute: FastifyPluginAsyncZod = async server => {
  
  server.get('/link/:code', {
    schema: {
      summary: "Get an existent link",
      params: getLinkSchema,
      response: {
        201: z.object({
          code: z.string(),
          link: z.string(),
          accessCount: z.number(),
          createdAt: z.date(),
        }),
        400: z
        .object({
          message: z.string(),
          issues: z.array(
            z.object({
              field: z.string(),
              message: z.string(),
            })
          ),
        }),
        404: z.object({ message: z.string() })
      }
    }
  }, async (request, reply) => {

    const { code } = request.params;

    const result = await getLink({ code })

    if (isSuccess(result)) {
      const { data } = unwrapEither(result)
      return reply.status(200).send(data)
    }

    const error = unwrapEither(result)
    
    if (error.constructor.name === DoesNotExistsError.name) {
        return reply.status(404).send({ message: error.message })
    }

    throw new Error("Internal server error")
  })
}