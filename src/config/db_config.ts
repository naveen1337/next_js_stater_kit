import knex from "knex";
import { Pool } from "pg";

// knex query Builder
export const qb:any = knex({
  client: "pg",
  // connection: {
  //   host: "127.0.0.1",
  //   port: 5432,
  //   user: "postgres",
  //   password: "password",  // change it on production
  //   database: "finance_ledger",
  // },
  migrations: {
    tableName: "migrations",
  },
});

export const dbConnection = new Pool({
  host: "127.0.0.1",
  port: 5432,
  user: "postgres",
  password: "password",  // change it on production
  database: "finance_ledger",
  max: 2,
  connectionTimeoutMillis:3000,
});

export default dbConnection;