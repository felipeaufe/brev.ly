import { exportLinks } from "@/app/functions/export-links";
import { isSuccess, unwrapEither } from "@/shared/either";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const exportLinksRoute: FastifyPluginAsyncZod = async server => {
  
  server.get('/link/export', {
    schema: {
      summary: "Get an existent link",
      response: {
        200: z.object({
          url: z.string(),
        })
      }
    }
  }, async (_, reply) => {
    const result = await exportLinks()

    if (isSuccess(result)) {
      const { data } = unwrapEither(result)
      return reply.status(200).send(data)
    }

    throw new Error("Internal server error")
  })
}