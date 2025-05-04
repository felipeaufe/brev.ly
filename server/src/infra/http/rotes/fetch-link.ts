import { geAllLink } from "@/app/functions/get-all-link";
import { isSuccess, unwrapEither } from "@/shared/either";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const getAllLinkRoute: FastifyPluginAsyncZod = async server => {
  
  server.get('/link', {
    schema: {
      summary: "Get an existent link",
      response: {
        200: z.array(z.object({
          code: z.string(),
          link: z.string(),
          accessCount: z.number(),
          createdAt: z.date(),
        })),
      }
    }
  }, async (request, reply) => {
    const result = await geAllLink()

    if (isSuccess(result)) {
      const { data } = unwrapEither(result)
      return reply.status(200).send(data)
    }
  
    throw new Error("Internal server error")
  })
}