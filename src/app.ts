import fastify from "fastify";
import {serializerCompiler, validatorCompiler, ZodTypeProvider} from "fastify-type-provider-zod";
import {ZodError} from "zod";
import {ConstraintError, ForbiddenError, NotFoundError, UnauthorizedError} from "./errors";

export const app = fastify({logger: true})
    .setValidatorCompiler(validatorCompiler)
    .setSerializerCompiler(serializerCompiler)
    .withTypeProvider<ZodTypeProvider>()

app.setErrorHandler((error, request, reply) => {
    console.error(error)
    if (error instanceof UnauthorizedError) {
        return reply.status(401).send({type: 'unauthorized'})
    }
    if (error instanceof ForbiddenError) {
        return reply.status(403).send({type: 'forbidden'})
    }
    if (error instanceof NotFoundError) {
        return reply.status(404).send({type: 'notFound', payload: error.message})
    }
    if (error instanceof ConstraintError) {
        return reply.status(409).send({type: 'conflict', payload: error.message})
    }
    if (error instanceof ZodError) {
        return reply.status(400).send({type: 'validation', payload: error.issues})
    }
    if ('statusCode' in error) {
        return reply.status(error.statusCode as number).send()
    }
    reply.status(500).send()
})
