import {Container} from "inversify";
import {MikroORM} from "@mikro-orm/core";
import {SqliteDriver} from "@mikro-orm/sqlite";

export const TYPES = {
    Orm: Symbol.for('orm'),
}

export type Orm = MikroORM<SqliteDriver>

export const container = new Container()