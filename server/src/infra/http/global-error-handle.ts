import { hasZodFastifySchemaValidationErrors, isResponseSerializationError } from "fastify-type-provider-zod"
import type { FastifyError, FastifyReply, FastifyRequest } from "fastify"

export const globalErrorHandler = (error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
  
  if (hasZodFastifySchemaValidationErrors(error)) {
    
    const issues = error.validation.map(({instancePath, message}) => ({
      field: instancePath.substring(1),
      message,
    }))

    return reply.status(400).send({
      message: "Validation error.",
      issues,
    })
  }

  if (isResponseSerializationError(error)) {

    return reply.code(500).send({
      error: "Internal Server Error",
      message: "Response doesn't match the schema",
      statusCode: 500,
      details: {
        issues: error.cause.issues,
        method: error.method,
        url: error.url,
      },
    })
  }
  
  console.error(error)
  return reply.status(500).send({ message: "Internal server error." })
}