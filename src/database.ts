import {MikroORM} from "@mikro-orm/core";
import {SqliteDriver} from "@mikro-orm/sqlite";
import config from '../mikro-orm.config';

export namespace Database {
    export const init = async () => {
        return await MikroORM.init<SqliteDriver>(config)
    }
}
