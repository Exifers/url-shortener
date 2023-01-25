import 'reflect-metadata';
import {app} from "./src/app";
import './src/auth';
import {RequestContext} from "@mikro-orm/core";
import {Database} from "./src/database";
import './src/routes'
import {container, TYPES} from "./src/container";
import {UrlService} from "./src/service";
import {Auth} from "./src/auth";

const PORT = 8000

const start = async () => {
    try {
        const orm = await Database.init()

        app.addHook('onRequest', (request, reply, done) => {
            RequestContext.create(orm.em, done)
        })

        container.bind(TYPES.Orm).toConstantValue(orm)
        container.bind(UrlService).to(UrlService)
        container.bind(Auth).to(Auth)

        console.log(`Listening on port ${PORT}`)
        await app.listen({port: PORT})
    } catch (e) {
        console.error(e)
    }
}

start()