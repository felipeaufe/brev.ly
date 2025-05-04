import { fastifyCors } from "@fastify/cors";
import { fastify } from "fastify";
import {
	hasZodFastifySchemaValidationErrors,
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
} from "fastify-type-provider-zod";
import { createLink } from "./rotes/create-link";
import fastifyMultipart from "@fastify/multipart";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

const server = fastify();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.setErrorHandler((error, request, reply) => {
	if (hasZodFastifySchemaValidationErrors(error)) {
		return reply.code(400).send({
			message: "Validation error",
			issues: error.validation,
		});
	}

	console.error(error);

	return reply.code(500).send({
		message: "Internal server error",
	});
});

server.register(fastifyCors, {
	origin: "*",
});

server.register(fastifyMultipart);
server.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Brevly Server",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform
});
server.register(fastifySwaggerUi, { routePrefix: '/docs'});

server.register(createLink);

server
	.listen({
		port: 3333,
		host: "0.0.0.0",
	})
	.then(() => {
		console.log("HTTP Server running!!");
	});
