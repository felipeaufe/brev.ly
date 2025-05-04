import { DoesNotExistsError } from "@/app/errors/does-not-exists-error";
import { removeLink } from "@/app/functions/remove-link";
import { removeLinkSchema } from "@/infra/schemas/link-schema";
import { isSuccess, unwrapEither } from "@/shared/either";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const removeLinkRoute: FastifyPluginAsyncZod = async server => {
  
  server.delete('/link', {
    schema: {
      summary: "Remove an existent link",
      body: removeLinkSchema,
      response: {
        200: z.boolean(),
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
      },
    }
  }, async (request, reply) => {

    const { code } = request.body;

    const result = await removeLink({ code })

    if (isSuccess(result)) {
      return reply.status(201).send(true)
    }

    const error = unwrapEither(result)
    
    if (error.constructor.name === DoesNotExistsError.name) {
        return reply.status(404).send({ message: error.message })
    }

    throw new Error("Internal server error")
  })
}