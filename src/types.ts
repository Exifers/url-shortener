import {z} from "zod";

export namespace Types {
    export const Token = z.string().min(4)
    export type Token = z.infer<typeof Token>
    export const Url = z.string()
    export type Url = z.infer<typeof Url>
    export const Id = z.string()
    export type Id = z.infer<typeof Id>
    export const User = z.string() // see comment in Url entity for the user type
    export type User = z.infer<typeof User>
}

export const TokenParams = z.object({
    token: Types.Token,
})

export const IdParams = z.object({
    id: Types.Id,
})

export const CreateUrlDto = z.object({
    url: Types.Url,
    token: Types.Token,
})

export type CreateUrlDto = z.infer<typeof CreateUrlDto>

export const UpdateUrlDto = z.object({
    token: Types.Token,
})

export type UpdateUrlDto = z.infer<typeof UpdateUrlDto>

export const UrlDto = z.object({
    id: Types.Id,
    url: Types.Url,
    tokens: z.array(z.object({
        visits: z.number(),
        token: Types.Token,
    })),
})

export type UrlDto = z.infer<typeof UrlDto>