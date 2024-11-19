import { MikroORMOptions, Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import * as dotenv from 'dotenv';

dotenv.config();

const mikroOrmConfig: Options<PostgreSqlDriver> = {
    driver: PostgreSqlDriver,
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    dbName: process.env.DB_NAME || 'my_database',
    entities: ['./dist/entities'], // Path untuk file entitas setelah build
    entitiesTs: ['./src/entities'], // Path untuk file entitas saat pengembangan
    debug: process.env.NODE_ENV !== 'production',

}

export default mikroOrmConfig