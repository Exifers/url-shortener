import {FastifyRequest} from "fastify";
import {injectable} from "inversify";
import {Types} from "./types";
import {UnauthorizedError} from "./errors";

const AUTHORIZATION_HEADER = 'authorization'

@injectable()
export class Auth {
    getUser(request: FastifyRequest): Types.User {
        const user = request.headers[AUTHORIZATION_HEADER]
        if (user === undefined)
            throw new UnauthorizedError()
        return user
    }
}