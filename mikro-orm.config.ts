import {Token} from "./src/entities/Token";
import {Url} from "./src/entities/Url";
import {Options} from "@mikro-orm/core";

export default {
    entities: [Url, Token],
    dbName: 'url-shortener',
    type: 'sqlite',
} satisfies Options