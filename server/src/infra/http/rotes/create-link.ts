import { AlreadyExistsError } from "@/app/errors/already-exists-error";
import { createLink } from "@/app/functions/create-link";
import { createLinkSchema } from "@/infra/schemas/link-schema";
import { isSuccess, unwrapEither } from "@/shared/either";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const createLinkRoute: FastifyPluginAsyncZod = async server => {
  
  server.post('/link', {
    schema: {
      summary: "Create a new link",
      body: createLinkSchema,
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
        })
        .describe("Validation error"),
        409: z.object({ message: z.string() }),
      }
    }
  }, async (request, reply) => {

    const { link, code } = request.body;

    const result = await createLink({
      link,
      code
    })

    if (isSuccess(result)) {
      const { data } = unwrapEither(result)
      return reply.status(201).send(data)
    }

    const error = unwrapEither(result)
    
    if (error.constructor.name === AlreadyExistsError.name) {
        return reply.status(409).send({ message: error.message })
    }

    throw new Error("Internal server error")
  })
}