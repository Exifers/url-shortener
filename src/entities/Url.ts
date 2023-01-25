import {Cascade, Collection, Entity, OneToMany, PrimaryKey, Property} from "@mikro-orm/core";
import {Token} from "./Token";

@Entity()
export class Url {
    // TODO: generate random values instead of incremented integers
    @PrimaryKey({autoincrement: true})
    id: string

    @Property()
    value: string

    @OneToMany(() => Token, token => token.url, {cascade: [Cascade.REMOVE], eager: true})
    tokens = new Collection<Token>(this)

    /**
     * Keep track of which user created the url.
     * In the real life it should be a foreign key to a User table.
     * Here we just put the value of the Authorization header.
     */
    @Property()
    author: string
}