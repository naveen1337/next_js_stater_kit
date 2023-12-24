import knex, { Knex } from "knex";
import { Pool } from "pg";

// knex query Builder
export const qb:Knex = knex({
  client: "pg",
  // connection: {
  //   host: "",
  //   port: 5432,
  //   user: "",
  //   password: "",
  //   database: "",
  // },
  migrations: {
    tableName: "migrations",
  },
});

export const dbConnection = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  max: 2,
  connectionTimeoutMillis:3000,
  // log:(e)=>{
  //   console.log(e)
  // }
});

export default dbConnection;