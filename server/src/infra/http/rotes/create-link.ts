import { FastifyInstance } from "fastify";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

export const createLink: FastifyPluginAsyncZod = async (server: FastifyInstance) => {
  
  server.post('/create-link', {
    schema: {
      
    }
  }, async (request, reply) => {
    return "hello world"
  })

}