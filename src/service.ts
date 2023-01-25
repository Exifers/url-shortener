import {CreateUrlDto, Types, UpdateUrlDto, UrlDto} from "./types";
import {inject, injectable} from "inversify";
import {Orm, TYPES} from "./container";
import {Token} from './entities/Token';
import {ConstraintError, ForbiddenError, NotFoundError} from "./errors";
import {Url} from "./entities/Url";
import User = Types.User;
import {UniqueConstraintViolationException} from "@mikro-orm/core";

@injectable()
export class UrlService {
    @inject(TYPES.Orm) private orm: Orm

    async resolve(token: Types.Token): Promise<string> {
        const t = await this.orm.em.findOne(Token, {value: token}, {populate: ['url']})
        if (t === null) {
            throw new NotFoundError()
        }
        t.visits++
        await this.orm.em.flush()
        return t.url.value
    }

    private async getByIdAndVerifyUser(id: Types.Id, user: Types.User): Promise<Url> {
        const u = await this.orm.em.findOne(Url, {id})
        if (u === null)
            throw new NotFoundError()
        if (u.author !== user)
            throw new ForbiddenError()
        return u
    }

    async retrieve(id: Types.Id, user: Types.User): Promise<UrlDto> {
        const u = await this.getByIdAndVerifyUser(id, user)
        return this.serialize(u)
    }

    async create(createUrlDto: CreateUrlDto, user: Types.User): Promise<UrlDto> {
        const t = new Token()
        t.value = createUrlDto.token
        this.orm.em.persist(t)

        const u = new Url()
        u.value = createUrlDto.url
        u.author = user
        u.tokens.add(t)

        this.orm.em.persist(u)

        try {
            await this.orm.em.flush()
        } catch (e) {
            if (e instanceof UniqueConstraintViolationException)
                throw new ConstraintError('This token already exists.')
            else
                throw new Error()
        }

        return this.serialize(u)
    }

    async update(updateUrlDto: UpdateUrlDto, id: Types.Id, user: User): Promise<UrlDto> {
        const u = await this.getByIdAndVerifyUser(id, user)

        const t = new Token()
        t.value = updateUrlDto.token
        u.tokens.add(t)
        this.orm.em.persist(t)
        await this.orm.em.flush()

        return this.serialize(u)
    }

    async delete(id: Types.Id, user: Types.User): Promise<void> {
        const u = await this.getByIdAndVerifyUser(id, user)
        await this.orm.em.remove(u).flush()
    }

    private serialize(url: Url): UrlDto {
        return {
            id: url.id.toString(),
            url: url.value,
            tokens: url.tokens.getItems().map(t => ({
                visits: t.visits,
                token: t.value
            }))
        }
    }
}