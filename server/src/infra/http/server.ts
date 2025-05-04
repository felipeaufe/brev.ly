import { fastifyCors } from "@fastify/cors";
import { fastify } from "fastify";
import {
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
} from "fastify-type-provider-zod";
import { createLinkRoute } from "./rotes/create-link";
import fastifyMultipart from "@fastify/multipart";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { env } from "@/env";
import { globalErrorHandler } from "./global-error-handle";
import { removeLinkRoute } from "./rotes/remove-link";
import { getLinkRoute } from "./rotes/get-link";
import { getAllLinkRoute } from "./rotes/fetch-link";

const server = fastify();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.setErrorHandler(globalErrorHandler);

server.register(fastifyCors, {
	origin: env.CORS_ORIGINS,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
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

server.register(createLinkRoute);
server.register(removeLinkRoute);
server.register(getLinkRoute);
server.register(getAllLinkRoute);

server
	.listen({
		port: 3333,
		host: "0.0.0.0",
	})
	.then(() => {
		console.log("HTTP Server running!!");
	});
