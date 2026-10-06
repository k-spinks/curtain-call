import type { Knex } from 'knex';
import 'dotenv/config';
import { configs } from './src/configs.ts';

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'postgres',
    connection: {
      host: configs.POSTGRES_HOST,
      port: Number(configs.POSTGRES_PORT),
      user: configs.POSTGRES_USER,
      password: configs.POSTGRES_PASSWORD,
      database: configs.POSTGRES_DB,
    },
  },
};

export default config;
