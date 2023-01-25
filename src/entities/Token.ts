import {Entity, ManyToOne, PrimaryKey, Property, Unique} from "@mikro-orm/core";
import {Url} from "./Url";

@Entity()
export class Token {
    @PrimaryKey({autoincrement: true})
    id: string

    @Property()
    @Unique()
    value: string

    @Property()
    visits: number = 0

    @ManyToOne(() => Url)
    url: Url
}