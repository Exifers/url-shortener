import {app} from "./app";
import {UrlService} from "./service";
import {CreateUrlDto, IdParams, TokenParams, UpdateUrlDto, UrlDto} from "./types";
import {container} from "./container";
import {Auth} from "./auth";

app.get('/r/:token', {schema: {params: TokenParams}}, async (request, reply) => {
    const {token} = request.params
    const value = await container.get(UrlService).resolve(token)
    return reply.redirect(302, value)
})

app.get('/urls/:id', {schema: {params: IdParams, response: {200: UrlDto}}},
    async (request) => {
        const {id} = request.params
        const user = container.get(Auth).getUser(request)
        return container.get(UrlService).retrieve(id, user);
    }
)

app.post('/urls', {schema: {body: CreateUrlDto, response: {201: UrlDto}}}, async (request, reply) => {
    const user = container.get(Auth).getUser(request)
    const url = await container.get(UrlService).create(request.body, user)
    reply.status(201)
    return url
})

app.patch('/urls/:id', {schema: {params: IdParams, body: UpdateUrlDto, response: {200: UrlDto}}}, async (request) => {
    const {id} = request.params
    const user = container.get(Auth).getUser(request)
    return container.get(UrlService).update(request.body, id, user)
})

app.delete('/urls/:id', {schema: {params: IdParams}}, async (request) => {
    const {id} = request.params
    const user = container.get(Auth).getUser(request)
    return container.get(UrlService).delete(id, user)
})